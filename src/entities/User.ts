import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Verification from "./Verification";
import Ride from "./Ride";

const BCRYPT_ROUND = 10;
// 우리가 설치한 bcrypt를 몇번 수행할 것인가에 대한 상수 설정

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
  isDriving: boolean;
  @Column({ type: "boolean", default: false })
  isRiding: boolean;
  @Column({ type: "boolean", default: false })
  isTaken: boolean;
  
  @Column({ type: "double precision", default: 0 })
  lastLng: number;
  @Column({ type: "double precision", default: 0 })
  lastLat: number;
  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @ManyToOne(type => Chat, chat => chat.participants) 
  chat: Chat; 

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @OneToMany(type => Verification, verification => verification.user)
  verifications: Verification[];

  @OneToMany(type => Ride, ride => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  ridesAsDriver: Ride[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
  
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword(password: string):Promise<boolean>{
    return bcrypt.compare(password,this.password);
  }
  
  @BeforeInsert()
  @BeforeUpdate()
  // @BeforeInsert와 @BeforeUpdate는 우리가 save 하거나 update 하기 전에 호출되는 메소드
  async savePassword() :Promise<void>{
      if(this.password){
          const hashedPassword = await this.hashPassword(this.password);
          this.password = hashedPassword;
        }
    }
    
    private hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUND);
    }
}

export default User;