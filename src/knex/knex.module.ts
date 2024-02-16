import { Module } from '@nestjs/common';
import { Knex } from 'knex';
import { KnexDatabaseService } from './knex.database.service';

@Module({
  providers: [
    KnexDatabaseService,
    {
      provide: 'Knex',
      useValue: Knex, // Provide the Knex instance directly
    },
  ],
  exports: [KnexDatabaseService],
})
export class KnexModule {}
