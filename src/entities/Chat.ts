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

@Entity()
class Chat extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];
    // 하나의 Chat이 다수의 Message를 갖고 있다! - OneToMany
    
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Chat;