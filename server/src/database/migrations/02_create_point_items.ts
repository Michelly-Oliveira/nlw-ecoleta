// Primeira letra maiúscula para referir ao tipo da variável, não à variável em si
import Knex from 'knex';

export async function up(knex: Knex) {
	// Criar tabela
	return knex.schema.createTable('point_items', (table) => {
		// .increments = incrementa o valor para cada item
		table.increments('id').primary();

		// relacionar a table points com a table items
		table.integer('point_id').notNullable().references('id').inTable('points');

		table.integer('item_id').notNullable().references('id').inTable('items');
	});
}

export async function down(knex: Knex) {
	// Deletar a tabela
	return knex.schema.dropTable('point_items');
}

// down() sempre faz o oposto de up()
