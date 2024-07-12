import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Iframe extends Document {

  @Prop({ required: true })
  api_key_user: string;

   @Prop({ required: true })
   iframe: string;

}

export const IframeSchema = SchemaFactory.createForClass(Iframe);
