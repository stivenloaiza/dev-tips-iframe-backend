import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
        const url = process.env.API_KEY 

        const response: AxiosResponse<any> = await lastValueFrom(
          this.httpService.post(
            url, 
            { apiKey: apiKey }, 
            { headers: { 'Content-Type': 'application/json' } } 
          )
        );
        return response.data.isValid;
      } catch (error) {
      return false;
    }
  }
}
