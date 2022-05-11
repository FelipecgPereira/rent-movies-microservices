import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  ClientKafka } from '@nestjs/microservices';


@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: 'watch',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
      consumer: {
        groupId: 'watch-consumer'
      }
     
    });
  }

  async onModuleInit() {
    this.subscribeToResponseOf('rent.new-rent')
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}