import {Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiBody, ApiHeaders, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TicketsService} from "../service/tickets.service";
import {Ticket} from "../../schemas/ticket.schema";
import {JwtAuthGuard} from "../../auth/strategy/JWT-guard";
import {JwtService} from "@nestjs/jwt";
import {ErrorDto} from "../../dto/ErrorDto";
import {ThemeAndQuestionDto} from "../dto/ThemeAndQuestionDto";
import {TicketDto} from "../dto/TicketDto";
import {TicketAndMessageDto} from "../dto/TicketAndMessageDto";

@ApiTags("Tickets")
@Controller('tickets')
export class TicketsController {
    constructor(
        private ticketsService: TicketsService,
        private jwtService: JwtService,
    ) {}

    @Get()
    @ApiResponse({status: 200, type: [Ticket]})
    list_tickets_all(): Promise<Ticket[]> {
        return this.ticketsService.list_tickets_all()
    }

    @UseGuards(JwtAuthGuard)
    @Get("/user")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: [Ticket]})
    @ApiResponse({status: 400, type: ErrorDto})
    list_tickets_user(@Headers() headers): Promise<Ticket[] | ErrorDto> {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.ticketsService.list_tickets_user(user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiBody({type: ThemeAndQuestionDto})
    @ApiResponse({status: 200, type: TicketAndMessageDto})
    @ApiResponse({status: 400, type: ErrorDto})
    new_ticket(@Headers() headers, @Body() data: ThemeAndQuestionDto):  Promise<TicketAndMessageDto | ErrorDto> {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.ticketsService.new_ticket(user.sub, data)
    }


    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiBody({type: Ticket})
    @ApiResponse({status: 200, type: TicketDto})
    update_ticket(
        @Param("id")
            id: string,
        @Body()
            ticket: TicketDto
    ): Promise<Ticket> {
        return this.ticketsService.update_ticket(id, ticket)
    }


    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    remove_ticket(@Param("id") id: string) {
        return this.ticketsService.remove_ticket(id)
    }
}
