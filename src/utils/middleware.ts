import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//import * as Knex from 'knex';
import { validate } from 'class-validator';
import { TenantDto } from '../tenant/tenant.dto';
import { UserModel } from '../database/models';
import * as KnexFile from '../../knexfile';
import { Knex as kex } from 'knex';
import Knex from 'knex';

@Injectable()
export class KnexMiddleware implements NestMiddleware {
private knexCache = new Map<string, kex>();

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantDto = new TenantDto();
    tenantDto.tenantId = req.query.tenantId as string;

    const errors = await validate(tenantDto);
    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    const knex = this.getKnexForRequest(tenantDto.tenantId);

    // Bind knex instances to the request
    req['models'] = {
      User: UserModel.bindKnex(knex),
    };

    next();
  }

  private getKnexForRequest(tenantId: string): kex {
    let knex = this.knexCache.get(tenantId);
    if (!knex) {
      knex = Knex(this.knexConfigForTenant(tenantId));
      this.knexCache.set(tenantId, knex);
      //console.log('knex', knex);
    }
  
    return knex!;
  }

  private knexConfigForTenant(tenantId: string) {
    console.log('tenantId', tenantId);
    return {
      ...KnexFile,// or 'production' based on your environment
        searchPath: tenantId,
    };
  }
}


