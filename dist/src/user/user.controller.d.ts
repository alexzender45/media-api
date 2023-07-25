import { CreateUserDto } from './dto';
export declare class UserController {
    private readonly userService;
    private readonly baseService;
    create(data: CreateUserDto): Promise<import("../base").TransformResponse>;
    login(data: any): Promise<import("../base").TransformResponse>;
    search(query: any): Promise<import("../base").TransformResponse>;
}
