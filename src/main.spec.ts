import { Test } from '@nestjs/testing';
import { ApiKeyGuard } from './common/auth/auth/auth.guard';
import { HttpService } from '@nestjs/axios';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let mockHttpService: any;

  beforeEach(async () => {
    mockHttpService = {
      post: jest.fn(),
    };

    await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    guard = new ApiKeyGuard(mockHttpService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
