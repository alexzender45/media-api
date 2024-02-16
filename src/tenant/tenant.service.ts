// tenant.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { DatabaseInterface } from '../database/database.interface';
import { DATABASE_TOKEN } from 'src/database';
import { Knex } from 'knex';


@Injectable()
export class TenantService {
  constructor(@Inject(DATABASE_TOKEN.KnexConnection) private readonly knex: Knex) {}

  async createSchema(schemaName: string): Promise<void> {
    console.log('creating schema', schemaName);
     await this.knex.schema.createSchemaIfNotExists(schemaName);
     console.log('schema created')
  }

  async runMigrations(schemaName: string): Promise<void> {
    console.log('running migrations', schemaName);
    await this.knex.migrate.latest({
      schemaName,
      directory: ['./src/database/migrations'],
      extension: 'ts'
    });
    console.log('migrations ran');
  }
  
  
}



