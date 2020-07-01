import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {PowerDto} from "../dto/PowerDto";
import {MoneyDto} from "../dto/MoneyDto";
import {ReferenceDto} from "../dto/ReferenceDto";

@Schema()
export class User extends Document {
    @Prop()
    @ApiProperty()
    username: string

    @Prop()
    @ApiProperty()
    email: string

    @Prop()
    @ApiProperty()
    password: string

    @Prop()
    @ApiProperty()
    is_admin: boolean

    @Prop()
    @ApiProperty()
    forRef: string

    @Prop()
    @ApiProperty()
    block: boolean

    @Prop(raw({
        litecoin: {type: Number},
        ethereum: {type: Number},
        bitcoin: {type: Number},
        usd: {type: Number}
    }))
    @ApiProperty({type: PowerDto})
    power: {
        litecoin: number,
        ethereum: number,
        bitcoin: number
        usd: number,
    }

    @Prop(raw({
        ghs: {type: Number},
        litecoin: {type: Number},
        ethereum: {type: Number},
        bitcoin: {type: Number},
        ref_money: {type: Number},
        usd: {type: Number}
    }))
    @ApiProperty({type: MoneyDto})
    money: {
        ghs: number,
        litecoin: number,
        ethereum: number,
        bitcoin: number,
        ref_money: number,
        usd: number
    }

    @Prop(raw({
        ref_register: {type: [String]},
        ref_show: {type: Number}
    }))
    @ApiProperty({type: ReferenceDto})
    ref: {
        ref_register: string[],
        ref_show: number
    }
}

export const UserSchema = SchemaFactory.createForClass(User);