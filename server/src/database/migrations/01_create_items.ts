// Primeira letra maiúscula para referir ao tipo da variável, não à variável em si
import Knex from 'knex';

export async function up(knex: Knex) {
	// Criar tabela
	return knex.schema.createTable('items', (table) => {
		// .increments = incrementa o valor para cada item
		table.increments('id').primary();
		table.string('image').notNullable();
		table.string('title').notNullable();
	});
}

export async function down(knex: Knex) {
	// Deletar a tabela
	return knex.schema.dropTable('items');
}

// down() sempre faz o oposto de up()
