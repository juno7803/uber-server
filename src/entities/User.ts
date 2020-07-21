import { IsEmail } from "class-validator";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int" })
  age: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  
  @Column({ type: "boolean", default: false })
  isDriving;
  @Column({ type: "boolean", default: false })
  isRiding;
  @Column({ type: "boolean", default: false })
  isTaken;
  
  
  @Column({ type: "double precision", default: 0 })
  lastLng;
  @Column({ type: "double precision", default: 0 })
  lastLat;
  @Column({ type: "double precision", default: 0 })
  lastOrientation;
  
  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
  
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
