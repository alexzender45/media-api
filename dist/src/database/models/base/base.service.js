"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
class BaseModel extends objection_1.Model {
    $beforeInsert() {
        this.id = (0, uuid_1.v4)();
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    $beforeUpdate() {
        this.updated_at = new Date();
    }
    static get modelPaths() {
        return [__dirname];
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=base.service.js.map