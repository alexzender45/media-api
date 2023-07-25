import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerMessage(): string {
    return 'Teesas Service is up and running!';
  }
}
