import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IframeService } from './iframe.service';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';

@Controller('iframe')
export class IframeController {
  constructor(private readonly iframeService: IframeService) {}

  @Post()
  create(@Body() createIframeDto: CreateIframeDto) {
    return this.iframeService.create(createIframeDto);
  }

  @Get()
  findAll() {
    return this.iframeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iframeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIframeDto: UpdateIframeDto) {
    return this.iframeService.update(+id, updateIframeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iframeService.remove(+id);
  }
}
