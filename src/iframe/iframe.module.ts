import { Module } from '@nestjs/common';
import { IframeService } from './iframe.service';
import { IframeController } from './iframe.controller';

@Module({
  controllers: [IframeController],
  providers: [IframeService],
})
export class IframeModule {}
