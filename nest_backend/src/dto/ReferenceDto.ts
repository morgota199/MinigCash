import {ApiProperty} from "@nestjs/swagger";

export class ReferenceDto {
    @ApiProperty({ type: [String] })
    ref_register: string[]

    @ApiProperty({type: Number})
    ref_show: number
}