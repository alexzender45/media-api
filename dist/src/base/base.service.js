"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = exports.Exception = void 0;
const common_1 = require("@nestjs/common");
class Exception extends common_1.HttpException {
    constructor(responseObject) {
        super(responseObject, common_1.HttpStatus[responseObject.status]);
        this.responseObject = responseObject;
    }
    conflict() {
        return Promise.reject({
            error: 'err',
            message: 'Conflict',
        });
    }
}
exports.Exception = Exception;
let BaseService = class BaseService {
    transformResponse(message, data = {}, statusCode = common_1.HttpStatus.OK) {
        return {
            status: common_1.HttpStatus[statusCode],
            message,
            data,
        };
    }
    handleException(status, message) {
        return Promise.reject(new Exception({
            status,
            message,
        }));
    }
};
BaseService = __decorate([
    (0, common_1.Injectable)()
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map