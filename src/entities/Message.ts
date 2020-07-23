import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";

import Chat from './Chat';
import User from "./User";

@Entity()
class Message extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type:"text"})
    text: string;

    @ManyToOne(type => Chat, chat => chat.messages) 
    chat: Chat; 
    // 다수의 Message가 하나의 Chat을 갖고 있다! - ManyToOne

    @ManyToOne(type => User, user => user.messages)
    user: User;
    
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Message;