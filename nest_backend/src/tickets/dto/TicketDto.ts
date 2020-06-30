import {ApiProperty} from "@nestjs/swagger";

export class TicketDto {
    @ApiProperty()
    username: string

    @ApiProperty()
    email: string

    @ApiProperty()
    question: string

    @ApiProperty()
    theme: string

    @ApiProperty()
    answer: string

    @ApiProperty()
    state: string

    @ApiProperty()
    date: string
}