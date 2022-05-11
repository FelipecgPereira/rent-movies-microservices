import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
  }))
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'watch',
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'watch-consumer'
      }

    },
  });

  app.startAllMicroservices().then(() => {
    console.log('[Watch] Microservice running!');
  });
  
  await app.listen(3300);
}
bootstrap();
