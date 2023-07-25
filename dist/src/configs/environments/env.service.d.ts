import { EnvironmentVariables } from './env.interface';
export declare class EnvironmentService {
    static getAll(): EnvironmentVariables;
    static getValue(key: string): string;
}
