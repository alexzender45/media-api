// tenant.dto.ts
import { IsString } from 'class-validator';

export class TenantDto {
  @IsString()
  tenantId: string;
}
