import { Module } from '@nestjs/common';
import { IframeModule } from './modules/iframe/iframe.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './common/persistence/db-config';
import { PersistenceModule } from './common/persistence';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './common/auth/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyAuthGuard } from './common/auth/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    IframeModule,
    HttpModule
  ],
  controllers: [],
  providers: [ AuthService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },],
})
export class AppModule {}