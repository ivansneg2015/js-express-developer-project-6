// @ts-check

export const up = (knex) => (
  knex.schema.createTable('statuses', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => knex.schema.dropTable('users');
