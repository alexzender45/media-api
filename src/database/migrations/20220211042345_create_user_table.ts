import { Knex } from 'knex';
import { DatabaseSchema } from '../database.schema';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  // return knex.transaction(async (trx: Knex.Transaction) =>
  knex.schema
    .withSchema('{{schemaName}}')
    .hasTable(DatabaseTable.users)
    .then((tableExists: boolean) => {
      if (!tableExists) {
        return knex.schema.createTable(
          DatabaseTable.users,
          (tableBuilder: Knex.CreateTableBuilder) => {
            tableBuilder.string('id').unique().notNullable().primary();
            tableBuilder.string('email').notNullable().unique();
            tableBuilder.string('password');
            tableBuilder.string('role').notNullable();
            tableBuilder.timestamps(true, true);
          },
        );
      }
    })
    .catch((e) => console.error('MIGRATION_ERROR', e));
  // );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema('{{schemaName}}')
    .dropTableIfExists(DatabaseTable.users);
}
