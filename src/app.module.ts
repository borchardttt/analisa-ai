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

@Module({
  imports: [
    CoreModule,
    SharedModule,
    TeamsModule,
    PlayersModule,
    PlayersModule,
  ],
  controllers: [AppController, PlayersController],
  providers: [AppService, PlayersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
