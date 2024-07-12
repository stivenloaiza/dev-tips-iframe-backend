import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateIframeDto {
  
    @IsString()
    @ApiProperty()
    api_key_user: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    domain: string;
  
    // @IsString()
    // @ApiProperty()
    // seniority: string;

    @IsString()
    @ApiProperty()
    programmingLanguage: string;
  
    // @IsString()
    // @ApiProperty()
    // language: string;

    // @IsString()
    // @ApiProperty()
    // @ApiProperty()
    // color: string;
  
    // @IsString()
    // @ApiProperty()
    // @ApiProperty()
    // typography: string;
}