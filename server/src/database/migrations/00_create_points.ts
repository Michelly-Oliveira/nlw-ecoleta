// Primeira letra maiúscula para referir ao tipo da variável, não à variável em si
import Knex from 'knex';

export async function up(knex: Knex) {
	// Criar tabela
	return knex.schema.createTable('points', (table) => {
		// .increments = incrementa o valor para cada item
		table.increments('id').primary();
		table.string('image').notNullable();
		table.string('name').notNullable();
		table.string('email').notNullable();
		table.string('whatsapp').notNullable();
		table.decimal('latitude').notNullable();
		table.decimal('longitude').notNullable();
		table.string('city').notNullable();
		table.string('uf', 2).notNullable();
	});
}

export async function down(knex: Knex) {
	// Deletar a tabela
	return knex.schema.dropTable('points');
}

// down() sempre faz o oposto de up()
