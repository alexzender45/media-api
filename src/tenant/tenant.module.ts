// tenant.module.ts
import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { DatabaseModule } from 'src/database';
import { KnexDatabaseService } from '../knex/knex.database.service';
import { KnexModule } from 'src/knex/knex.module';
import { AuthModule } from 'src/auth';

@Module({
    imports:[DatabaseModule],
    providers: [TenantService],
    exports: [TenantService],
})
export class TenantModule {}

