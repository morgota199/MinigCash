import {ApiProperty} from "@nestjs/swagger";
import {MoneyDto} from "../../dto/MoneyDto";
import {PowerDto} from "../../dto/PowerDto";

export class CheckerDto {
    @ApiProperty()
    block: boolean

    @ApiProperty()
    is_admin: boolean

    @ApiProperty({
        type: MoneyDto
    })
    money: MoneyDto

    @ApiProperty({
        type: PowerDto
    })
    power: PowerDto
}