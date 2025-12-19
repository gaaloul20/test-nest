import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusResponseInterceptor } from './interceptors/status-response.interceptor';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/testmontaha',
      entities: [Post],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: StatusResponseInterceptor,
    },
  ],
})
export class AppModule {}
