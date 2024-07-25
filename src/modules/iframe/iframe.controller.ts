import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IframeService } from './iframe.service';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { ApiKeyGuard } from 'src/common/auth/auth/auth.guard';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Iframe } from './entities/iframe.entity';
@ApiTags('iframe')
@Controller('iframe')
export class IframeController {
  constructor(private readonly iframeService: IframeService) {}

  @UseGuards(ApiKeyGuard)
  @Post('getIframe')
  @ApiOperation({ summary: "Create a new Iframe"})
  @ApiResponse({
    status: 201,
    description: "The Iframe has been successfully created",
    type: Iframe,
  })
  @ApiBody({ type:CreateIframeDto})
  @ApiBadRequestResponse({
    description: "Invalid data or Iframe already exists with the same api-key"
  })
  create(@Body() createIframeDto: CreateIframeDto) {
    return this.iframeService.createCodeIframe(createIframeDto);
  }
  @UseGuards(ApiKeyGuard)
  @Get('iframeForFront/:apikeyUser')
  @ApiOperation({ summary: 'Get IFrame for Frontend' })
  @ApiParam({
    name: 'apikeyUser',
    description: 'User API Key',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, description: 'IFrame successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'IFrame not found.' })
  @ApiBadRequestResponse({
    description: "Invalid data or Iframe"
  })
  iframeForTheFront(@Param('apikeyUser') apiKeyUser: string) {
    return this.iframeService.iframeforTheFront(apiKeyUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get all IFrames' })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
    description: 'Search term for filtering IFrames by name or description',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of IFrames successfully retrieved.',
    type: [Iframe],
  })
  @ApiResponse({ status: 404, description: 'No IFrames found.' })
  @ApiBadRequestResponse({
    description: "Invalid data or Iframe"
  })
  findAll() {
    return this.iframeService.findAll();
  }

}
