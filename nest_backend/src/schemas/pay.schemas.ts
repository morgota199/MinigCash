import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

@Schema()
export class Pay extends Document {
    @Prop()
    @ApiProperty()
    username: string

    @Prop()
    @ApiProperty()
    email: string

    @Prop()
    @ApiProperty()
    system: string

    @Prop()
    @ApiProperty()
    number: string

    @Prop()
    @ApiProperty()
    ip: string

    @Prop()
    @ApiProperty()
    money: number

    @Prop()
    @ApiProperty()
    confirmation: string

    @Prop()
    @ApiProperty()
    date: string
}

export const PaySchema = SchemaFactory.createForClass(Pay);