"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentService = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class EnvironmentService {
    static getAll() {
        return {
            db_host: process.env.DB_HOST,
            db_name: process.env.DB_NAME,
            db_password: process.env.DB_PASSWORD,
            db_port: Number(process.env.DB_PORT),
            db_user: process.env.DB_USER,
            jwt_secret: process.env.JWT_SECRETE_KEY,
            jwt_expires_in: process.env.JWT_EXPIRES_IN,
            node_env: process.env.NODE_ENV,
            port: Number(process.env.PORT),
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            musixmatch_api_key: process.env.MUSIXMATCH_API_KEY,
        };
    }
    static getValue(key) {
        return EnvironmentService.getAll()[key.toLocaleLowerCase()];
    }
}
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=env.service.js.map