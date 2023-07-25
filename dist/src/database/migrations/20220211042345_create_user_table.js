"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const database_schema_1 = require("../database.schema");
const database_tables_1 = require("../database.tables");
async function up(knex) {
    knex.schema
        .hasTable(database_tables_1.DatabaseTable.users)
        .then((tableExists) => {
        if (!tableExists) {
            return knex.schema.createTable(database_tables_1.DatabaseTable.users, (tableBuilder) => {
                tableBuilder.string('id').unique().notNullable().primary();
                tableBuilder.string('email').notNullable().unique();
                tableBuilder.string('password');
                tableBuilder.string('role').notNullable();
                tableBuilder.timestamps(true, true);
            });
        }
    })
        .catch((e) => console.error('MIGRATION_ERROR', e));
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .withSchema(database_schema_1.DatabaseSchema.userService)
        .dropTableIfExists(database_tables_1.DatabaseTable.users);
}
exports.down = down;
//# sourceMappingURL=20220211042345_create_user_table.js.map