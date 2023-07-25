"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const _ = require("lodash");
const objection_1 = require("objection");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let httpStatus;
        let responseBody;
        if (exception instanceof objection_1.ValidationError) {
            switch (exception.type) {
                case 'ModelValidation':
                    responseBody = {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: exception.message,
                        type: 'ModelValidationError',
                        data: exception.data,
                        modelClass: exception.modelClass,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    };
                    httpStatus = common_1.HttpStatus.BAD_REQUEST;
                    break;
                case 'RelationExpression':
                    responseBody = {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: exception.message,
                        type: 'RelationExpressionError',
                        data: {},
                        modelClass: exception.modelClass,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    };
                    httpStatus = common_1.HttpStatus.BAD_REQUEST;
                    break;
                case 'UnallowedRelation':
                    responseBody = {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: exception.message,
                        type: 'UnallowedRelationError',
                        data: {},
                        modelClass: exception.modelClass,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    };
                    httpStatus = common_1.HttpStatus.BAD_REQUEST;
                    break;
                case 'InvalidGraph':
                    responseBody = {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: exception.message,
                        type: 'InvalidGraphError',
                        data: {},
                        modelClass: exception.modelClass,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    };
                    httpStatus = common_1.HttpStatus.BAD_REQUEST;
                    break;
                default:
                    responseBody = {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: exception.message,
                        type: 'UnknownValidationError',
                        data: {},
                        modelClass: exception.modelClass,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    };
                    httpStatus = common_1.HttpStatus.BAD_REQUEST;
                    break;
            }
        }
        else if (exception instanceof objection_1.NotFoundError) {
            responseBody = {
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: exception.message,
                type: 'NotFoundError',
                data: {},
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.NOT_FOUND;
        }
        else if (exception instanceof objection_1.UniqueViolationError) {
            responseBody = {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: exception.message,
                type: 'UniqueViolationError',
                data: {
                    columns: exception.columns,
                    table: exception.table,
                    constraint: exception.constraint,
                },
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.CONFLICT;
        }
        else if (exception instanceof objection_1.NotNullViolationError) {
            responseBody = {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: exception.message,
                type: 'NotNullViolationError',
                data: {
                    column: exception.column,
                    table: exception.table,
                },
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.BAD_REQUEST;
        }
        else if (exception instanceof objection_1.ForeignKeyViolationError) {
            responseBody = {
                statusCode: common_1.HttpStatus.CONFLICT,
                message: `Can not delete or update data because of a foreign key constraint violation on table: ${exception.table}`,
                type: 'ForeignKeyViolationError',
                data: {},
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.CONFLICT;
        }
        else if (exception instanceof objection_1.CheckViolationError) {
            responseBody = {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: exception.message,
                type: 'CheckViolation',
                data: {
                    table: exception.table,
                    constraint: exception.constraint,
                },
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.BAD_REQUEST;
        }
        else if (exception instanceof objection_1.DataError) {
            responseBody = {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: exception.message,
                type: 'InvalidData',
                data: {},
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.BAD_REQUEST;
        }
        else if (exception instanceof objection_1.DBError) {
            responseBody = {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception.message,
                type: 'UnknownDatabaseError',
                data: {},
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else if (exception instanceof common_1.HttpException) {
            const errorResponse = exception.getResponse();
            responseBody = {
                statusCode: exception.getStatus(),
                message: _.isArray(errorResponse.message)
                    ? errorResponse.message[0]
                    : errorResponse.message,
                type: 'HttpException',
                data: {},
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = exception.getStatus();
        }
        else {
            responseBody = {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception.message,
                type: 'UnknownError',
                data: {},
                timestamp: new Date().toISOString(),
                path: request.url,
            };
            httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        response.status(httpStatus).json(responseBody);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=app.errors.js.map