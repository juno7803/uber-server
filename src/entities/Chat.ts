import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

import Message from './Message';
import User from "./User";

@Entity()
class Chat extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];
    // 하나의 Chat이 다수의 Message를 갖고 있다! - OneToMany

    @OneToMany(type => User, user=> user.chat)
    participants: User[];
    
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Chat;