import { Module } from '@nestjs/common';
import { IframeModule } from './modules/iframe/iframe.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './common/persistence/db-config';
import { PersistenceModule } from './common/persistence';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    IframeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
