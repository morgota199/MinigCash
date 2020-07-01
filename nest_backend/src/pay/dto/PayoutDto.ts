import {ApiProperty} from "@nestjs/swagger";
import {IsIP, IsMobilePhone, IsNumber} from "class-validator";

export class PayoutDto {
    @ApiProperty()
    // @IsMobilePhone('ru-RU')
    @IsMobilePhone('uk-UA')
    // @IsMobilePhone('en-US')
    number: string

    @ApiProperty()
    @IsNumber()
    money: number

    @ApiProperty()
    @IsIP()
    IP: string

    @ApiProperty()
    @IsNumber()
    exchange: number
}