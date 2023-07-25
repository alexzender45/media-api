import { IUser } from '../database';
import { UserService } from '../user';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: any): Promise<any>;
    getUserPayload(payload: any): Promise<IUser>;
}
export {};
