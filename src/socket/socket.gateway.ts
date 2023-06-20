import { Controller, Logger } from '@nestjs/common';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

// @Controller()
@WebSocketGateway({
  allowEIO3: true,
  cors: {
    options: "*",
    origin:'*'
  },
  transports: ["websocket", "polling"],
})
export class SocketGateway implements OnGatewayConnection {
  constructor( ){}
  @WebSocketServer() server: Server;



  afterInit(server: Server) {
    console.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    console.log(payload)
    this.server.emit('receiveMessage', `${payload} from server`);
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
