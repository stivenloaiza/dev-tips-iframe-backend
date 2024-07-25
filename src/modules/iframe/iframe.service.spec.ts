import { Test, TestingModule } from '@nestjs/testing';
import { IframeService } from './iframe.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { Iframe } from './entities/iframe.entity';
import { HttpException } from '@nestjs/common';

describe('IframeService', () => {
  let service: IframeService;
  let mockIframeModel: any;
  let mockHttpService: any;

  beforeEach(async () => {
    mockIframeModel = {
      save: jest.fn(),
    };

    mockHttpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IframeService,
        {
          provide: getModelToken(Iframe.name),
          useValue: mockIframeModel,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<IframeService>(IframeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCodeIframe', () => {
    it('should create an iframe and save it to the database', async () => {
      const createIframeDto: CreateIframeDto = {
        apikey: 'testApiKey',
        technology: 'testTech',
        seniority: 'senior',
        lang: 'en',
        domain: ''
      };

      mockIframeModel.save.mockResolvedValue(mockIframeModel);

      const result = await service.createCodeIframe(createIframeDto);

      expect(mockIframeModel.save).toHaveBeenCalled();
      expect(result).toEqual(mockIframeModel);
    });

    it('should throw an HttpException on error', async () => {
      const createIframeDto: CreateIframeDto = {
        apikey: 'testApiKey',
        technology: 'testTech',
        seniority: 'senior',
        lang: 'en',
        domain: ''
      };

      mockIframeModel.save.mockRejectedValue(new Error('Database error'));

      await expect(service.createCodeIframe(createIframeDto)).rejects.toThrow(HttpException);
    });
  });

  describe('iframeforTheFront', () => {
    it('should fetch data for the front', async () => {
      const apiKey = 'testApiKey';
      const mockUserResponse = { data: { level: 'senior', lang: 'en', technology: 'testTech' } };
      const mockTipsResponse = { data: ['tip1', 'tip2'] };

      mockHttpService.get.mockReturnValueOnce(of(mockUserResponse));
      mockHttpService.get.mockReturnValueOnce(of(mockTipsResponse));

      const result = await service.iframeforTheFront(apiKey);

      expect(mockHttpService.get).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockTipsResponse.data);
    });

    it('should throw an HttpException if user data is invalid', async () => {
      const apiKey = 'invalidApiKey';
      mockHttpService.get.mockReturnValueOnce(throwError(new Error('Invalid API key')));

      await expect(service.iframeforTheFront(apiKey)).rejects.toThrow(HttpException);
    });
  });
});