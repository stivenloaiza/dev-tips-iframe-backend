import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { ApiKeyAuthGuard } from './auth.guard';

@Module({
  imports: [HttpModule, ApiKeyAuthGuard],
  providers: [AuthService, ApiKeyAuthGuard],
  controllers: [],
})
export class SecureModule {}
