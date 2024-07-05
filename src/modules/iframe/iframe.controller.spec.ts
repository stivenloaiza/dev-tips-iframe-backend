import { Test, TestingModule } from '@nestjs/testing';
import { IframeController } from './iframe.controller';
import { IframeService } from './iframe.service';

describe('IframeController', () => {
  let controller: IframeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IframeController],
      providers: [IframeService],
    }).compile();

    controller = module.get<IframeController>(IframeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
