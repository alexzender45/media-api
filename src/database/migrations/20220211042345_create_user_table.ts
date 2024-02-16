//const  {DatabaseSchema} = require('../database.schema');
const Knex  = require('knex');
const { DatabaseTable } = require('../database.tables');
//import { DATABASE_TOKEN } from '../database.token';
//import { TenantService } from '../../tenant/tenant.service';


module.exports = async function up(knex) {
  console.log();
  knex.schema
    .hasTable(DatabaseTable.users)
        .then((tableExists) => {
          if (!tableExists) {
            return knex.schema.createTable(
              DatabaseTable.users,
              (tableBuilder) => {
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

module.exports = async function down(knex) {
  return knex
    .dropTableIfExists(DatabaseTable.users);
}
