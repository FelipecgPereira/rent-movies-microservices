import { DatabaseModule } from './../database/database.module';
import { WatchService } from './../http/watch/watch.service';
import { MoviesService } from './../http/movies/movies.service';
import { ViewerService } from './../http/viewer/viewer.service';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RentController } from './controllers/rent.controller';


@Module({
    imports: [DatabaseModule,ConfigModule.forRoot()],
    controllers: [RentController],
    providers: [ViewerService,MoviesService,WatchService],
   
  })
export class MessagingModule {}
