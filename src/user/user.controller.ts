import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Inject,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { BaseService } from '../base';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { JwtAuthGuard } from '../auth';
import { TenantService } from 'src/tenant/tenant.service';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(TenantService)
  private readonly tenantService: TenantService;
  @Inject(BaseService)
  private readonly baseService: BaseService;

  @Post('/signup')
  public async create(@Body() data: CreateUserDto, @Req() req: any

  ) {
    console.log(req.query.tenantId);
     await this.tenantService.createSchema(req.query.tenantId);
    const migrate = await this.tenantService.runMigrations(req.query.tenantId); 
    console.log('migrate', migrate);
    const newUser = await this.userService.create(data);

    // create schema for user;

    return this.baseService.transformResponse(
      'User created successfully',
      newUser,
      HttpStatus.CREATED,
    );
  }

  @Post('/login')
  public async login(@Body() data: any) {
    const user = await this.userService.login(data);

    return this.baseService.transformResponse(
      'User logged in successfully',
      user,
      HttpStatus.OK,
    );
  }

  // search for track
  @Get('/search')
  @UseGuards(JwtAuthGuard)
  public async search(@Query() query: any) {
    const data = await this.userService.searchTrack(query.query);

    return this.baseService.transformResponse(
      'User search successful',
      data,
      HttpStatus.OK,
    );
  }
}
