import {ApiProperty} from "@nestjs/swagger";
import {IsIP, IsNumber} from "class-validator";

export class PayoutDto {
    @ApiProperty()
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