import { Test, TestingModule } from '@nestjs/testing';
import { IframeController } from './iframe.controller';
import { IframeService } from './iframe.service';
import { CreateIframeDto } from './dto/create-iframe.dto';

describe('IframeController', () => {
  let controller: IframeController;
  let mockIframeService: any;

  beforeEach(async () => {
    mockIframeService = {
      createCodeIframe: jest.fn(),
      iframeforTheFront: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IframeController],
      providers: [
        {
          provide: IframeService,
          useValue: mockIframeService,
        },
      ],
    }).compile();

    controller = module.get<IframeController>(IframeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call createCodeIframe and return the result', async () => {
      const createIframeDto: CreateIframeDto = {
        apikey: 'testApiKey',
        technology: 'testTech',
        seniority: 'senior',
        lang: 'en',
        domain: '',
      };
      const result = { iframe: '<iframe></iframe>' };

      mockIframeService.createCodeIframe.mockResolvedValue(result);

      const response = await controller.create(createIframeDto);

      expect(mockIframeService.createCodeIframe).toHaveBeenCalledWith(
        createIframeDto,
      );
      expect(response).toEqual(result);
    });
  });

  describe('iframeForTheFront', () => {
    it('should call iframeforTheFront and return the result', async () => {
      const apiKeyUser = 'testApiKey';
      const result = { tips: ['tip1', 'tip2'] };

      mockIframeService.iframeforTheFront.mockResolvedValue(result);

      const response = await controller.iframeForTheFront(apiKeyUser);

      expect(mockIframeService.iframeforTheFront).toHaveBeenCalledWith(
        apiKeyUser,
      );
      expect(response).toEqual(result);
    });
  });
});
