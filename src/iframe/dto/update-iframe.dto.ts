import { PartialType } from '@nestjs/mapped-types';
import { CreateIframeDto } from './create-iframe.dto';

export class UpdateIframeDto extends PartialType(CreateIframeDto) {}
