import express from 'express';
import multer from 'multer';
// validation
import { celebrate, Joi } from 'celebrate';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsControllers';
import ItemsController from './controllers/ItemsController';

// desacoplar as rotas do main file do servidor
// routes funciona da mesma forma que app on tserver.ts
const routes = express.Router();
// uploading images when point is created
const uploads = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// index(listar todos), show(listar 1), create, update, delete

// Listar os items
routes.get('/items', itemsController.index);

// Listar pontos de coleta
routes.get('/points', pointsController.index);

// Listar um ponto de coleta
routes.get('/points/:id', pointsController.show);

// Criar ponto de coleta
routes.post(
	'/points',
	uploads.single('image'),
	celebrate(
		{
			body: Joi.object().keys({
				name: Joi.string().required(),
				email: Joi.string().required().email(),
				whatsapp: Joi.number().required(),
				latitude: Joi.number().required(),
				longitude: Joi.number().required(),
				city: Joi.string().required(),
				uf: Joi.string().required().max(2),
				items: Joi.string().required(),
			}),
		},
		{
			abortEarly: false,
		}
	),
	pointsController.create
);

export default routes;
