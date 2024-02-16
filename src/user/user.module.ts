import { Module } from '@nestjs/common';
import { UtilModule } from '../utils';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [
    UtilModule,
    AuthModule, 
    TenantModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
