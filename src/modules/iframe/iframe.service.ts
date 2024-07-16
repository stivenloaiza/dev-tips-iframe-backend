import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    const { apikey, programmingLanguage, seniority, language } = createIframeDto;
    try {
      let srcUrl = `http://localhost:5173/${apikey}`;
      if (programmingLanguage) {
        srcUrl += `/${programmingLanguage}`;
      }
      if (seniority) {
        srcUrl += `/${seniority}`;
      }
      if (language) {
        srcUrl += `/${language}`;
      }
    
      const htmlIframe = `<iframe id="inlineFrameExample" title="Inline Frame Example" width="300" height="200" src="${srcUrl}"></iframe>`;
    
      const iframe = {
        apikey: apikey, 
        iframe: htmlIframe,
      }
  
      const createdIframe = new this.iframeModel( iframe );
  
      await createdIframe.save(); 
  
      return createdIframe;
    } catch (error) {
      throw new HttpException(
        `Error: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async iframeforTheFront(apiKeyUser: string): Promise<any[]> {
    try {
      const dataForTip = {
        level: '',
        language: '',
        programmingLanguage: '',
      };

      const dataForResponse = [];

      // TODO: cambiar URL

      const userDataByApyKey = this.httpService
        .post(
          'http://localhost:3000',
          { apikeyUser: apiKeyUser },
          {
            headers: {
              'x-api-key': process.env.API_KEY_IFRAME,
            },
          },
        )
        .subscribe((response) => {
          const data = response.data;
          dataForTip.level = data.level;
          dataForTip.language = data.language;
          dataForTip.programmingLanguage = data.programmingLanguage;
        });

      if (!userDataByApyKey)
        throw new HttpException('Invalid API key provided', 400);

      // TODO: cambiar URL

      const tips = this.httpService
        .get(
          `http://localhost:3000/?level=${dataForTip.level}&?lang=${dataForTip.language}&?technology=${dataForTip.programmingLanguage}`,
          {
            headers: {
              'x-api-key': process.env.API_KEY_IFRAME,
            },
          },
        )
        .subscribe((response) => {
          dataForResponse.push(response.data);
        });

      if (!tips) throw new HttpException('Data of tips invalid', 400);

      return dataForResponse;
    } catch (err) {
      throw new HttpException(
        `Error: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return [];
  }

  findAll() {
    return `This action returns all iframe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iframe`;
  }

  update(id: number, updateIframeDto: UpdateIframeDto) {
    console.log(updateIframeDto);
    return `This action updates a #${id} iframe`;
  }

  remove(id: number) {
    return `This action removes a #${id} iframe`;
  }
}
