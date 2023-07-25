import { JSONSchema } from 'objection';
import { BaseModel } from '../base';
import { IUser } from './user.interface';
export declare class UserModel extends BaseModel implements IUser {
    id: IUser['id'];
    email: IUser['email'];
    role: IUser['role'];
    created_at: IUser['created_at'];
    updated_at: IUser['updated_at'];
    password: IUser['password'];
    static get tableName(): string;
    static get jsonSchema(): JSONSchema;
}
