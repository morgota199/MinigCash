import {ApiProperty} from "@nestjs/swagger";

export class PowerDto {
    @ApiProperty()
    litecoin: number

    @ApiProperty()
    ethereum: number

    @ApiProperty()
    bitcoin: number

    @ApiProperty()
    usd: number
}