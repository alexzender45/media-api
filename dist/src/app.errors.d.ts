import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
export interface ExceptionResponse {
    statusCode: number;
    message: string | string[] | object;
    error: string;
}
