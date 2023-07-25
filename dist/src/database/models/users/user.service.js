"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_schema_1 = require("../../database.schema");
const database_tables_1 = require("../../database.tables");
const base_1 = require("../base");
const user_validation_1 = require("./user.validation");
class UserModel extends base_1.BaseModel {
    static get tableName() {
        return `${database_schema_1.DatabaseSchema.userService}.${database_tables_1.DatabaseTable.users}`;
    }
    static get jsonSchema() {
        return user_validation_1.UserValidation;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.service.js.map