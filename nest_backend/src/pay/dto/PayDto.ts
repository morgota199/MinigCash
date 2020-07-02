import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class PayDto {
    @ApiProperty()
    @IsNumber()
    money: number

    @ApiProperty()
    @IsNumber()
    ghs: number
}