import { Injectable } from '@nestjs/common';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Iframe } from './entities/iframe.entity';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class IframeService {
  constructor(
    @InjectModel(Iframe.name) private iframeModel: Model<Iframe>,
    private readonly httpService: HttpService,
  ) {}
  async createCodeIframe(createIframeDto: CreateIframeDto) {
   
    const {api_key_user, programmingLanguage} = createIframeDto

    const htmlIframe = `<iframe id="inlineFrameExample" title="Inline Frame Example" width="3" height="200"
    src="http://localhost:5173/${api_key_user}/${programmingLanguage}"> </iframe>`

    const iframe = {
      api_key_user: api_key_user, 
      iframe: htmlIframe,
    }

    const createdIframe = new this.iframeModel( iframe );

    await createdIframe.save(); 

    return createdIframe;
  }

  findAll() {
    return `This action returns all iframe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iframe`;
  }

  update(id: number, updateIframeDto: UpdateIframeDto) {
    return `This action updates a #${id} iframe`;
  }

  remove(id: number) {
    return `This action removes a #${id} iframe`;
  }
}
