import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IframeModule } from './iframe/iframe.module';

@Module({
  imports: [IframeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
