import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Iframe extends Document {

  @Prop({ required: true })
  user_id: number;
  
  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  seniority: string;

  @Prop({ required: true })
  language:string;

  @Prop()
  color:string;

  @Prop()
  typography:string;
  
}

export const IframeSchema = SchemaFactory.createForClass(Iframe);