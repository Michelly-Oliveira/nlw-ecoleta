import Knex from 'knex';

// Seeds servem para preencher a base de dados com dados padrões da aplicação

// Create default items from the app on the table
export async function seed(knex: Knex) {
	await knex('items').insert([
		{ title: 'Lâmpadas', image: 'lampadas.svg' },
		{ title: 'Pilhas e Baterias', image: 'baterias.svg' },
		{ title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
		{ title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
		{ title: 'Resíduos Orgânicos', image: 'organicos.svg' },
		{ title: 'Óleo de Cozinha', image: 'oleo.svg' },
	]);
}
