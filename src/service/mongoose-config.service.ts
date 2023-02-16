import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const username = this.configService.get('DB_USERNAME');
    const password = this.configService.get('DB_PASSWORD');
    const host = this.configService.get('DB_HOST');
    const dbName = this.configService.get('DB_NAME');
    const connectionLimit = this.configService.get('DB_CONNECTION_LIMIT');
    const maxExecutionTime = this.configService.get('DB_MAX_EXECUTION_TIME');
    const drop = Boolean(this.configService.get('DB_DROP'));
    const sync = Boolean(this.configService.get('DB_SYNC'));
    console.log(sync);
    return {
      uri: `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`,
      //   entities: [__dirname + '/**/*.entity{.ts}'],
      // useNewUrlParser: true,
      // ssl: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // autoLoadEntities: true,
      // dropSchema: drop,
      // synchronize: sync,
      // authSource: 'admin',
      // logging: true,
      // extra: {
      //   max: +connectionLimit,
      // },
      //   logger: 'advanced-console',
      // maxQueryExecutionTime: +maxExecutionTime,
    } as MongooseModuleOptions;
  }
}
