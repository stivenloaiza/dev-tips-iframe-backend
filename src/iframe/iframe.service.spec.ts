import { Test, TestingModule } from '@nestjs/testing';
import { IframeService } from './iframe.service';

describe('IframeService', () => {
  let service: IframeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IframeService],
    }).compile();

    service = module.get<IframeService>(IframeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
