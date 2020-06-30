import {ApiProperty} from "@nestjs/swagger";

export class OnePowerDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    value: number
}