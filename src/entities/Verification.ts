import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne, 
    UpdateDateColumn,
} from "typeorm";
import { verificationTarget } from "src/types/types";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity{
    @PrimaryGeneratedColumn() id: number

    @Column({type: "text", enum: [PHONE,EMAIL]})
    target: verificationTarget;
    // 직접 type을 정의하여 verificationTarget을 import한 모습

    @Column({type:"text"})
    payload:string;

    @Column({type:"text"})
    key:string;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

    @BeforeInsert()
    createKey(): void{
        if(this.target === PHONE){
            this.key = Math.floor(Math.random()*100000).toString();
        }else if(this.target === EMAIL){
            this.key = Math.random()
                .toString(36)
                .substr(2);
        }
    }
}

export default Verification;