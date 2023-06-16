import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { Users } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventManagementModule } from './event-management/event-management.module';
import { Event } from './event-management/entities/event-management.entity';
import { JoineeModule } from './joinee/joinee.module';
import { Joinee } from './joinee/entities/joinee.entity';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'eventManager',
      entities: [Users, Event, Joinee],
      synchronize: true,
    }),
    SocketModule,
    AuthModule,
    UsersModule,
    EventManagementModule,
    JoineeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
