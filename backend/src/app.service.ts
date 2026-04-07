import { Injectable } from '@nestjs/common';
import { name, version } from '../package.json';

@Injectable()
export class AppService {
  getServiceHealthCheck(): any {
    return {
      app_name: name,
      version: version,
      health: 'ok'
    };
  }
}
