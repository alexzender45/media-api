import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { ConfigsModule } from './configs';
import { UserModule } from './user';
import { BaseModule } from './base';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigsModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
