"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../base");
const user_service_1 = require("./user.service");
const dto_1 = require("./dto");
const auth_1 = require("../auth");
const tenant_service_1 = require("../tenant/tenant.service");
let UserController = class UserController {
    async create(data, req) {
        console.log(req.query.tenantId);
        await this.tenantService.createSchema(req.query.tenantId);
        const migrate = await this.tenantService.runMigrations(req.query.tenantId);
        console.log('migrate', migrate);
        const newUser = await this.userService.create(data);
        return this.baseService.transformResponse('User created successfully', newUser, common_1.HttpStatus.CREATED);
    }
    async login(data) {
        const user = await this.userService.login(data);
        return this.baseService.transformResponse('User logged in successfully', user, common_1.HttpStatus.OK);
    }
    async search(query) {
        const data = await this.userService.searchTrack(query.query);
        return this.baseService.transformResponse('User search successful', data, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    (0, common_1.Inject)(tenant_service_1.TenantService),
    __metadata("design:type", tenant_service_1.TenantService)
], UserController.prototype, "tenantService", void 0);
__decorate([
    (0, common_1.Inject)(base_1.BaseService),
    __metadata("design:type", base_1.BaseService)
], UserController.prototype, "baseService", void 0);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "search", null);
UserController = __decorate([
    (0, common_1.Controller)('users')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map