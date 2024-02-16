import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { ConfigsModule } from './configs';
import { UserModule } from './user';
import { BaseModule } from './base';
import { KnexMiddleware } from './utils/middleware';
import { KnexDatabaseService } from './knex/knex.database.service';
import { KnexModule } from './knex/knex.module';
//import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigsModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(KnexMiddleware).forRoutes('*');
  }
}
