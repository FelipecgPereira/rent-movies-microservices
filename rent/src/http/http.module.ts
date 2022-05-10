import { RentService } from './rent/rent.service';
import { RentController } from './rent/rent.controller';
import { JwtStrategy } from './account/strategy/jwt.strategy';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesController } from './movies/movies.controller';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';





@Module({
  imports: [DatabaseModule,JwtModule.register({})],
  controllers: [AccountController, CustomerController, MoviesController,RentController],
  providers: [AccountService,CustomerService, MoviesService,JwtStrategy,RentService]
})
export class HttpModule {}
