import { Controller } from '@nestjs/common';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller()
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
  }

  @SubscribeMessage("create_event")
  createEvent(){

  }
  @SubscribeMessage("update_event")
  updateEvent(){
    
  }
  @SubscribeMessage("delete_event")
  deleteEvent(){
    
  }

  @SubscribeMessage("join_event")
  joinEvent(){
    
  }
  @SubscribeMessage("remove_from_event")
  removFromEvent(){
    
  }

  @SubscribeMessage("login")
  login(){
    
  }
}
