import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIframeDto {
  @IsString()
  @ApiProperty()
  apikey: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  domain: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  seniority: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  programmingLanguage: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  language: string;
}
