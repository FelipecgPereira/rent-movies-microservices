import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }), HttpModule, MessagingModule]

})
export class AppModule {}
