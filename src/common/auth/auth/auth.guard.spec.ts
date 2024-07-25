import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuard } from './auth.guard';
import { HttpService } from '@nestjs/axios';
import { ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let mockHttpService: any;

  beforeEach(async () => {
    mockHttpService = {
      post: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if API key is valid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              'x-api-key': 'validApiKey',
            },
          }),
        }),
      } as ExecutionContext;

      mockHttpService.post.mockReturnValue(of({ data: true }));

      const result = await guard.canActivate(context);

      expect(mockHttpService.post).toHaveBeenCalledWith(
        'https://dev-tips-auth-backend.onrender.com/api-keys/validate',
        { key: 'validApiKey' },
        { headers: { 'x-api-key': 'validApiKey' } },
      );
      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException if API key is missing', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
          }),
        }),
      } as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrowError(
        'API key is missing',
      );
    });

    it('should throw UnauthorizedException if API key is invalid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              'x-api-key': 'invalidApiKey',
            },
          }),
        }),
      } as ExecutionContext;

      mockHttpService.post.mockReturnValue(of({ data: false }));

      await expect(guard.canActivate(context)).rejects.toThrowError(
        'Invalid API key format',
      );
    });

    it('should throw UnauthorizedException on error', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              'x-api-key': 'invalidApiKey',
            },
          }),
        }),
      } as ExecutionContext;

      mockHttpService.post.mockReturnValue(throwError(new Error('API error')));

      await expect(guard.canActivate(context)).rejects.toThrowError(
        'Error validating API key',
      );
    });
  });
});
