import { HttpException } from '@nestjs/common';
import { TransformResponse } from './base.interface';
export declare class Exception extends HttpException {
    responseObject: TransformResponse;
    constructor(responseObject: TransformResponse);
    conflict(): Promise<HttpException>;
}
export declare class BaseService {
    transformResponse(message: string, data?: any, statusCode?: number): TransformResponse;
    handleException(status: string, message: string): Promise<unknown>;
}
