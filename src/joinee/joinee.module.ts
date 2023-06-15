import { Module } from '@nestjs/common';
import { JoineeService } from './joinee.service';
import { JoineeController } from './joinee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joinee } from './entities/joinee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Joinee])],
  controllers: [JoineeController],
  providers: [JoineeService]
})
export class JoineeModule {}
