// Arquivo responsável pela conexão com o banco de dados

// knex is a query builder for sql db
import knex from 'knex';
import path from 'path';

// __dirname = retorna o caminho para o diretório atual - database
const connection = knex({
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, 'database.sqlite'),
	},
	useNullAsDefault: true,
});

export default connection;

// Migrations = Histórico do banco de dados
