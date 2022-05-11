
import { WatchService } from './watch/watch.service';
import { WatchController } from './watch/watch.controller';

import { JwtStrategy } from './account/strategy/jwt.strategy';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesController } from './movies/movies.controller';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ViewerController } from './viewer/viewer.controller';
import { ViewerService } from './viewer/viewer.service';

@Module({
  imports: [DatabaseModule,JwtModule.register({})],
  controllers: [AccountController, MoviesController,WatchController,ViewerController],
  providers: [AccountService, MoviesService,JwtStrategy,WatchService,ViewerService]
})
export class HttpModule {}
