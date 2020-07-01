import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {IsMobilePhone, IsMongoId} from "class-validator";

@Schema()
export class Payment extends Document {

    @Prop()
    @ApiProperty()
    @IsMongoId()
    userId: string

    @Prop()
    @ApiProperty()
    userName: string

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
    money: number

    @Prop()
    @ApiProperty()
    usd: number

    @Prop()
    @ApiProperty()
    date: string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);