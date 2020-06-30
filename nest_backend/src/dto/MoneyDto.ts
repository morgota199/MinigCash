import {ApiProperty} from "@nestjs/swagger";

export class MoneyDto {
    @ApiProperty()
    ghs: number

    @ApiProperty()
    litecoin: number

    @ApiProperty()
    ethereum: number

    @ApiProperty()
    bitcoin: number

    @ApiProperty()
    usd: number

    @ApiProperty()
    ref_money: number

}