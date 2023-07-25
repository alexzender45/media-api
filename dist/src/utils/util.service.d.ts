import { IJwtPayload } from './util.interface';
export declare class UtilService {
    hashPassword(password: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateJwtToken(data: IJwtPayload): string;
    decodeJwtToken(token: string): object | string | IJwtPayload;
    generatePassword(): Promise<string>;
}
