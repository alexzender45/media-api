import { Module } from '@nestjs/common';
import { UtilModule } from '../utils';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth';


@Module({
  imports: [
    UtilModule,
    AuthModule,  
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
