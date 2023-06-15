import { Joinee } from 'src/joinee/entities/joinee.entity';
import { Users } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column()
  eventDate: Date;

  @Column()
  eventTime: string;

  @Column()
  eventLocation: string;

  @Column()
  eventDescription: string;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'eventOrganizer' })
  eventOrganizer: string;

  @OneToMany(() => Joinee, (joinee) => joinee.event)
  joinee: Joinee[];
}
