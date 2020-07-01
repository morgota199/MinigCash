import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {IsIP, IsMobilePhone} from "class-validator";

@Schema()
export class Payouts extends Document {
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
    @IsMobilePhone('ru-RU')
    @IsMobilePhone('uk-UA')
    @IsMobilePhone('en-US')
    number: string

    @Prop()
    @ApiProperty()
    @IsIP()
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

export const PayoutsSchema = SchemaFactory.createForClass(Payouts);