import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IframeService } from './iframe.service';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { ApiKeyGuard } from 'src/common/auth/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('iframe')
@Controller('iframe')
export class IframeController {
  constructor(private readonly iframeService: IframeService) {}

  @UseGuards(ApiKeyGuard)
  @Post('getIframe')
  create(@Body() createIframeDto: CreateIframeDto) {
    return this.iframeService.createCodeIframe(createIframeDto);
  }
  @UseGuards(ApiKeyGuard)
  @Get('iframeForFront/:apikeyUser')
  iframeForTheFront(@Param('apikeyUser') apiKeyUser: string) {
    return this.iframeService.iframeforTheFront(apiKeyUser);
  }



}
