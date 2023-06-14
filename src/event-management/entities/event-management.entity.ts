import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column()
  eventOrganizer: string;
}
