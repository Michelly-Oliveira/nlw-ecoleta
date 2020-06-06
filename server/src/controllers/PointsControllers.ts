import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsControllers {
	async index(request: Request, response: Response) {
		// Filtros = cidade, uf, items (query params)
		const { city, uf, items } = request.query;
		// turn the items string into an array, remove the spaces on right/left, turn the strings into numbers: array of strings => array of numbers
		const parsedItems = String(items)
			.split(',')
			.map((item) => Number(item.trim()));

		// join tables points e point_items para selecionar os pontos que coletam determinados items
		const points = await knex('points')
			.join('point_items', 'points.id', '=', 'point_items.point_id')
			.whereIn('point_items.item_id', parsedItems)
			.where('city', String(city))
			.where('uf', String(uf))
			.distinct()
			.select('points.*');

		const serializedPoints = points.map((point) => {
			return {
				...point,
				image_url: `http://192.168.111.101:3333/uploads/${point.image}`,
			};
		});

		return response.json(serializedPoints);
	}

	async show(request: Request, response: Response) {
		// pegar o id do ponto de coleta
		const { id } = request.params;

		const point = await knex('points').where('id', id).first();

		if (!point) {
			return response.status(400).json({ message: 'Point not found.' });
		}

		const serializedPoint = {
			...point,
			image_url: `http://192.168.111.101:3333/uploads/${point.image}`,
		};

		// join tables items e point_items para mostrar os items que esse ponto coleta
		const items = await knex('items')
			.join('point_items', 'items.id', '=', 'point_items.item_id')
			.where('point_items.point_id', id)
			.select('items.title');

		return response.json({ point: serializedPoint, items });
	}

	async create(request: Request, response: Response) {
		// desestruturar o objeto request.body
		const {
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
			items,
		} = request.body;

		// usar knex.transation para que se uma query der problema, a outra também não execute
		const trx = await knex.transaction();

		const point = {
			image: request.file.filename,
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
		};

		// criar point no banco de dados, esperar a operação terminar - await
		// insert() retorna os ids dos items criados na table
		const insertedIds = await trx('points').insert(point);

		const point_id = insertedIds[0];
		// transform the items string into an array of strings, remove the spaces and convert to numbers; return an obj with ids (point and item)
		const pointItems = items
			.split(',')
			.map((item: string) => Number(item.trim()))
			.map((item_id: number) => {
				return {
					item_id,
					point_id,
				};
			});

		// conectar point com items de coleta na tabela point_items
		// relacionar duas tabelas(muitos para muitos)
		await trx('point_items').insert(pointItems);

		// fazer os inserts no banco de dados
		await trx.commit();

		return response.json({
			id: point_id,
			...point,
		});
	}
}

export default PointsControllers;
