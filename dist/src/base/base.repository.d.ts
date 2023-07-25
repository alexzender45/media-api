import { Model, ModelClass, RelationExpression } from 'objection';
import { DbAccess } from './base.interface';
export declare abstract class BaseRepository implements DbAccess {
    private readonly model;
    protected constructor(model: ModelClass<Model>);
    create<T = any>(data: T): Promise<any>;
    createMany<T = any>(data: T[]): Promise<any>;
    findAll<T = any>(params?: T): Promise<any[]>;
    findManyWithGraphOrder<T = any>(obj: T, relationPath: RelationExpression<Model>, modifiers?: any): Promise<any[]>;
    findManyWithGraph<T = any>(obj: T, relationPath: RelationExpression<Model>): Promise<any[]>;
    findOne<T = any>(obj: T): Promise<any>;
    findOneWithGraph<T = any>(obj: T, relationPath: RelationExpression<Model>): Promise<any>;
    findMany<T = any>(obj: T): Promise<any[]>;
    findById(id: string): Promise<any>;
    update<T = any>(id: string, data: T): Promise<any>;
    updateWithJersey<T = any>(id: string): Promise<any>;
    updateWithGraphFetched<T = any>(id: string, data: T, relationPath: RelationExpression<Model>): Promise<any>;
    delete(id: string): Promise<any>;
    findManyByArray(obj: any, ids: any, field: any, relationPath: RelationExpression<Model>): Promise<any>;
}
