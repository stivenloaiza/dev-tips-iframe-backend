import { Test, TestingModule } from '@nestjs/testing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './main'; 

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      enableCors: jest.fn(),
      listen: jest.fn(),
      setGlobalPrefix: jest.fn(),
    }),
  },
}));

describe('Main', () => {
  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();

    app = await NestFactory.create(AppModule);
  });

  it('should bootstrap the application', async () => {
    await bootstrap();

    expect(app.enableCors).toHaveBeenCalledWith({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    expect(app.setGlobalPrefix).toHaveBeenCalledWith('/v1/api');
    expect(app.listen).toHaveBeenCalled();
  });
});
