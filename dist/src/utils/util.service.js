"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs_1 = require("../configs");
const nanoid_1 = require("nanoid");
let UtilService = class UtilService {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    generateJwtToken(data) {
        common_1.Logger.log('Running UtilService.generateJwtToken');
        try {
            const { id } = data;
            delete data.id;
            return jwt.sign(data, configs_1.EnvironmentService.getValue('jwt_secret'), {
                audience: id,
            });
        }
        catch (e) {
            if (typeof e.code === 'string' || !e.code) {
                e.code = 500;
            }
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
    decodeJwtToken(token) {
        common_1.Logger.log('Running UtilService.decodeJwtToken');
        try {
            return jwt.verify(token, configs_1.EnvironmentService.getValue('jwt_secret'));
        }
        catch (e) {
            if (typeof e.code === 'string' || !e.code) {
                e.code = 500;
            }
            throw new common_1.InternalServerErrorException(e.message, e.code);
        }
    }
    async generatePassword() {
        return (0, nanoid_1.nanoid)(8);
    }
};
UtilService = __decorate([
    (0, common_1.Injectable)()
], UtilService);
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map