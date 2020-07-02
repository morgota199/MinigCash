import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class PaymentDto {
    @ApiProperty()
    number: string

    @ApiProperty()
    @IsNumber()
    money: number

    @ApiProperty()
    @IsNumber()
    ghs: number

    @ApiProperty()
    comment: string
}