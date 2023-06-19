import { Module } from '@nestjs/common';
import { JoineeService } from './joinee.service';
import { JoineeController } from './joinee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joinee } from './entities/joinee.entity';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports:[TypeOrmModule.forFeature([Joinee]),SocketModule],
  controllers: [JoineeController],
  providers: [JoineeService]
})
export class JoineeModule {}
