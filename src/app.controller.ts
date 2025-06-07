import { Controller, Get, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
