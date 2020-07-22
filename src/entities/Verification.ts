import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn, 
} from "typeorm";
import { verificationTarget } from "src/types/types";

@Entity()
class Verification extends BaseEntity{
    @PrimaryGeneratedColumn() id: number

    @Column({type: "text", enum: ["PHONE","EMAIL"]})
    target: verificationTarget;
    // 직접 type을 정의하여 verificationTarget을 import한 모습

    @Column({type:"text"})
    payload:string;

    @Column({type:"text"})
    key:string;

    @Column({type:"boolean", default: false})
    used: boolean;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Verification;