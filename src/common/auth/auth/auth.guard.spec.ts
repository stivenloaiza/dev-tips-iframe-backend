import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ApiKeyGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if API key is missing', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: {} }),
        }),
      } as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if API key is invalid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: { 'x-api-key': 'invalid-key' } }),
        }),
      } as unknown as ExecutionContext;

      const errorResponse: AxiosResponse = {
        data: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(httpService, 'post').mockReturnValue(throwError(() => errorResponse));

      await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });

    it('should return true if API key is valid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: { 'x-api-key': 'valid-key' } }),
        }),
      } as unknown as ExecutionContext;

      const successResponse: AxiosResponse = {
        data: true,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(successResponse));

      await expect(guard.canActivate(context)).resolves.toBe(true);
    });

    it('should throw UnauthorizedException if there is an error during validation', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: { 'x-api-key': 'error-key' } }),
        }),
      } as unknown as ExecutionContext;

      jest.spyOn(httpService, 'post').mockReturnValue(throwError(() => new Error('Request failed')));

      await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
    });
  });
});
