import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

// usar cors para definir quais urls podem acessar a api
app.use(cors());
// Fazer o express entender o corpo da requisição em json
app.use(express.json());
// Usar as rotas criadas no routes.ts file
app.use(routes);

// Criar rota para acessar as imagens
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// deal with validation errors
app.use(errors());

// server listen on port 3333
app.listen(3333);

// Rota = endereço completo da requisição, the path of the url(localhost:3333/users)
// Recurso = qual recurso/entidade está sendo acessado (/users)
// browser não consegue acessar uma rota se não usar o método GET; o browser sempre manda uma requisição com o método GET

// Request Params = Parâmetros que vem na própria rota que identificam um recurso, parâmetros obrigatórios, usa /
// Query Param = Parâmetros que vem na própria rota geralmente opcionais para filtros, paginação, usa ?
// Request Body = Parâmetros para criação/atualização

// const users = ['Sam', 'Dean', 'Cass', 'Bobby'];

// // request = obter dados da requisição
// // response = devolver uma resposta para o cliente
// app.get('/users', (request, response) => {
// 	// converter parâmetros para string, útil se for um array
// 	const search = String(request.query.search);

// 	const filteredUsers = search
// 		? users.filter((user) => user.includes(search))
// 		: users;

// 	// return json from server
// 	return response.json(filteredUsers);
// });

// // Passing a parameter to the get request - id
// app.get('/users/:id', (request, response) => {
// 	// converter a string que representa o index para número
// 	const id = Number(request.params.id);
// 	const user = users[id];

// 	return response.json(user);
// });

// app.post('/users', (request, response) => {
// 	const data = request.body;

// 	const user = {
// 		name: data.name,
// 		email: data.email,
// 	};

// 	return response.json(user);
// });
