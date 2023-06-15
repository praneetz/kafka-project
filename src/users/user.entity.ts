import { ApiProperty } from '@nestjs/swagger';
import bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Role, Gender } from 'src/core/enum';
import { Event } from 'src/event-management/entities/event-management.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @ApiProperty()
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @ApiProperty()
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  fullName: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  @ApiProperty()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @ApiProperty()
  password: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
  })
  @ApiProperty()
  tokenVersion: number;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
    default: Role.User,
  })
  @ApiProperty()
  role: Role;

  @OneToMany(() => Event, (event) => event.eventOrganizer)
  events: Event[];

  @BeforeInsert()
  @BeforeUpdate()
  concate() {
    this.fullName = this.firstName + ' ' + this.lastName;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hash(this.password, 10);
    }
  }
}
