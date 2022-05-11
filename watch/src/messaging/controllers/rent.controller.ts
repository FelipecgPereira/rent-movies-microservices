
import { WatchService } from './../../http/watch/watch.service';
import { MoviesService } from './../../http/movies/movies.service';
import { ViewerService } from './../../http/viewer/viewer.service';
import { Controller } from '@nestjs/common';
import { Client, MessagePattern, Payload, EventPattern } from '@nestjs/microservices';

export interface ICustomer{
    name: string,
    login: string, 
    password: string

}

export interface IMovie{
    id: string,
    title: string
}

export interface ICreateRentPlayLoad{
    customer:ICustomer,
    movie: IMovie,
    availability: Date
}


@Controller()
export class RentController{
    constructor(
        private movieService:MoviesService,
        private viewerService: ViewerService,
        private watchService:WatchService,
       
      ) {
        
      }

    
    @EventPattern('rent.new-rent')
    async rentCreated(@Payload('value') payload ){
       
        let viewer = await this.viewerService.findOne(payload.customer.login);

        if(!viewer){
            viewer = await this.viewerService.create({
                name:payload.customer.name,
                login:payload.customer.login, 
                password:payload.customer.password})
        }

        let movie = await this.movieService.findOne(payload.movie.id);

        if(!movie){
            movie = await this.movieService.create({
                id: payload.movie.id,
                title: payload.movie.title
            })
        }

        await this.watchService.create({
            viewerId: viewer.id,
            movieId: movie.id,
            availability: payload.availability
        })

    }

}