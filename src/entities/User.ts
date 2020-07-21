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
} from "typeorm";

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

  
  @BeforeInsert()
  @BeforeUpdate()
  // @BeforeInsert와 @BeforeUpdate는 우리가 save 하거나 update 하기 전에 호출되는 메소드
  async savePassword() :Promise<void>{
      if(this.password){
          const hashedPassword = await this.hashPassword(this.password);
          // string으로 저장한 pw를 hashPassword 함수를 await 함으로써 해싱하여 저장한다.
          this.password = hashedPassword;
          // 여기서 entity에 저장할 password를 해싱한 버전으로 바꾼다.
        }
    }
    
    private hashPassword(password:string):Promise<string> {
        // :Promise<string> 이 Promise는 결국 string을 줄 것 이라는 뜻
        return bcrypt.hash(password, BCRYPT_ROUND);
    }
}

export default User;