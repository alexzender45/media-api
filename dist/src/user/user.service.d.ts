import { CreateUserDto } from './dto';
export declare class UserService {
    private readonly userRepo;
    private readonly utilService;
    create(data: CreateUserDto): Promise<{
        user: any;
        auth_token: any;
    }>;
    throwIfUserExists(data: CreateUserDto): Promise<void>;
    rollbackUserAccount(user: any): Promise<void>;
    login(loginData: any): Promise<any>;
    findById(id: string): Promise<any>;
    private getToken;
    searchTrack(query: string): Promise<any[]>;
}
