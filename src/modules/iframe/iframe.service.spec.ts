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
    const iframeModelInstance = {
      save: jest.fn().mockResolvedValue({}),
    };

    // Mock del modelo de Iframe como un constructor que devuelve la instancia del mock
    mockIframeModel = jest.fn().mockImplementation(() => iframeModelInstance);

    // Mock del servicio HttpService
    mockHttpService = {
      get: jest.fn(),
    };

    // Configuración del módulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IframeService,
        {
          provide: getModelToken(Iframe.name), // Inyecta el mock del modelo
          useValue: mockIframeModel,
        },
        {
          provide: HttpService, // Inyecta el mock del servicio HTTP
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<IframeService>(IframeService); // Obtiene la instancia del servicio
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Verifica que el servicio esté definido
  });

  describe('createCodeIframe', () => {
    it('should create an iframe and save it to the database', async () => {
      const createIframeDto: CreateIframeDto = {
        apikey: 'testApiKey',
        technology: 'testTech',
        seniority: 'senior',
        lang: 'en',
        domain: '',
      };

      const createdIframeMock = new mockIframeModel();
      createdIframeMock.save.mockResolvedValue(createdIframeMock); // Simula la respuesta del método save

      const result = await service.createCodeIframe(createIframeDto); // Llama al método

      expect(createdIframeMock.save).toHaveBeenCalled(); // Verifica que se haya llamado a save
      expect(result).toEqual(createdIframeMock); // Verifica que el resultado sea el esperado
    });

    it('should throw an HttpException on error', async () => {
      const createIframeDto: CreateIframeDto = {
        apikey: 'testApiKey',
        technology: 'testTech',
        seniority: 'senior',
        lang: 'en',
        domain: '',
      };

      const createdIframeMock = new mockIframeModel();
      createdIframeMock.save.mockRejectedValue(new Error('Database error')); // Simula un error en save

      await expect(service.createCodeIframe(createIframeDto)).rejects.toThrow(
        HttpException, // Verifica que se lance una excepción
      );
    });
  });

  describe('iframeforTheFront', () => {
    it('should fetch data for the front', async () => {
      const apiKey = 'testApiKey';
      const mockUserResponse = {
        data: { level: 'senior', lang: 'en', technology: 'testTech' },
      };
      const mockTipsResponse = { data: ['tip1', 'tip2'] };

      // Simula las respuestas del servicio HTTP
      mockHttpService.get.mockReturnValueOnce(of(mockUserResponse));
      mockHttpService.get.mockReturnValueOnce(of(mockTipsResponse));

      const result = await service.iframeforTheFront(apiKey); // Llama al método

      expect(mockHttpService.get).toHaveBeenCalledTimes(2); // Verifica que se hayan hecho dos llamadas
      expect(result).toEqual(mockTipsResponse.data); // Verifica que el resultado sea el esperado
    });

    it('should throw an HttpException if user data is invalid', async () => {
      const apiKey = 'invalidApiKey';
      mockHttpService.get.mockReturnValueOnce(
        throwError(new Error('Invalid API key')), // Simula un error en la respuesta
      );

      await expect(service.iframeforTheFront(apiKey)).rejects.toThrow(
        HttpException, // Verifica que se lance una excepción
      );
    });
  });
});
