import { Module } from '@nestjs/common';
import { SocketGateway } from './chat.gateway';

@Module({
  providers: [SocketGateway],
  exports:[SocketGateway]
})
export class SocketModule {}
