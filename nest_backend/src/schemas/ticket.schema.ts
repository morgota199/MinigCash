import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

@Schema()
export class Ticket extends Document {
    @Prop()
    @ApiProperty()
    username: string

    @Prop()
    @ApiProperty()
    email: string

    @Prop()
    @ApiProperty()
    theme: string

    @Prop()
    @ApiProperty()
    question: string

    @Prop()
    @ApiProperty()
    answer: string

    @Prop()
    @ApiProperty()
    state: string

    @Prop()
    @ApiProperty()
    date: string
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);