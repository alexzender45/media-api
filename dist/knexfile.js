"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./src/configs");
class KnexFile {
    static getConnection() {
        const { db_host, db_password, db_user, db_name, db_port } = configs_1.EnvironmentService.getAll();
        return {
            host: db_host,
            user: db_user,
            password: db_password,
            database: db_name,
            port: db_port,
        };
    }
    static getConfig() {
        return {
            client: 'postgres',
            connection: KnexFile.getConnection(),
            pool: {
                min: 2,
                max: 50,
            },
            migrations: {
                directory: './src/database/migrations',
                tableName: 'knex_migration',
                extension: 'ts',
            },
            seeds: {
                directory: './src/database/seeds',
                extension: 'ts',
            },
        };
    }
    static getConfigEnvironments() {
        const config = KnexFile.getConfig();
        const { node_env: nodeEnv } = configs_1.EnvironmentService.getAll();
        return {
            development: config,
            staging: config,
            production: config,
            test: Object.assign(Object.assign({}, config), { debug: true }),
        }[nodeEnv];
    }
}
module.exports = KnexFile.getConfigEnvironments();
//# sourceMappingURL=knexfile.js.map