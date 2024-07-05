import { Module } from '@nestjs/common';
import { IframeService } from './iframe.service';
import { IframeController } from './iframe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Iframe, IframeSchema } from './entities/iframe.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Iframe.name, 
        schema: IframeSchema }]),
  ],
  controllers: [IframeController],
  providers: [IframeService],
})
export class IframeModule {}
