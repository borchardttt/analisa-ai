import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { PlayersModule } from './players/players.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth.module';
@Module({
  imports: [
    CoreModule,
    SharedModule,
    TeamsModule,
    PlayersModule,
    PrismaModule,
    PlayersModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, PlayersController],
  providers: [AppService, PlayersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
