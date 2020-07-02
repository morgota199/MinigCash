import {Ticket} from "../../schemas/ticket.schema";
import {ApiProperty} from "@nestjs/swagger";

export class TicketAndMessageDto {
    @ApiProperty()
    ticket: Ticket

    @ApiProperty()
    message: string
}