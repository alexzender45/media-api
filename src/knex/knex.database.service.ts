import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInterface } from '../database/database.interface';
import { DATABASE_TOKEN } from 'src/database';

@Injectable()
export class KnexDatabaseService implements DatabaseInterface {
  constructor(@Inject(DATABASE_TOKEN.KnexConnection) private readonly knex: Knex) {}

  async createSchema(schemaName: string): Promise<void> {
    const schema = await this.knex.schema.withSchema(schemaName).hasTable('users');
    console.log('schema', schema);
    if (!schema[0]) {
      const work = await this.knex.schema.createSchema(schemaName);
      console.log('work', work);
    }
  }

  async runMigrations(schemaName: string): Promise<void> {
    await this.knex.migrate.latest({
      directory: './src/database/migrations',
      schemaName: schemaName,
    });
  }
}
