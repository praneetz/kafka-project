import { Event } from 'src/event-management/entities/event-management.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Joinee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @ManyToOne(() => Event, (event) => event.joinee)
  @JoinColumn({ name: 'eventId' })
  event: string;
}
