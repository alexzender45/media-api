import { Model } from 'objection';
import { IBase } from './base.interface';
export declare class BaseModel extends Model implements IBase {
    id: IBase['id'];
    created_at: IBase['created_at'];
    updated_at: IBase['updated_at'];
    static BelongsToOneRelation: any;
    $beforeInsert(): void;
    $beforeUpdate(): void;
    static get modelPaths(): string[];
}
