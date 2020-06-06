import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
	async index(request: Request, response: Response) {
		// quey no banco de dados; pode demorar, por isso usar await
		const items = await knex('items').select('*');
		// serialização de dados = transformar os dados wm um formato mais acessivel para quem está requisitando
		const serializedItems = items.map((item) => {
			return {
				id: item.id,
				title: item.title,
				image_url: `http://192.168.111.101:3333/uploads/${item.image}`,
			};
		});

		return response.json(serializedItems);
	}
}

export default ItemsController;
