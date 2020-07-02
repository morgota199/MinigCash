import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Ticket} from "../../schemas/ticket.schema";
import {Model} from "mongoose";
import {UsernameAndEmailDto} from "../dto/UsernameAndEmailDto";
import {ErrorDto} from "../../dto/ErrorDto";
import {ThemeAndQuestionDto} from "../dto/ThemeAndQuestionDto";
import {User} from "../../schemas/user.schemas";
import {TicketDto} from "../dto/TicketDto";
import {TicketAndMessageDto} from "../dto/TicketAndMessageDto";

@Injectable()
export class TicketsService {
    constructor(
        @InjectModel("Tickets")
        private ticketModel: Model<Ticket>,
        @InjectModel("User")
        private userModel: Model<User>
    ) {}

    async list_tickets_all(): Promise<Ticket[]> {
        return this.ticketModel.find()
    }

    async list_tickets_user(id: string): Promise<Ticket[] | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return this.ticketModel.find({username: user.username, email: user.email})
    }

    async new_ticket(id: string, data: ThemeAndQuestionDto): Promise<TicketAndMessageDto | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        const ticketData = {
            username: user.username,
            email: user.email,
            theme: data.theme,
            question: data.question,
            answer: "",
            state: "В обработке",
            date: Date.now()
        }

        const ticket = new this.ticketModel(ticketData)

        await ticket.save()

        return {
            ticket: ticket,
            message: "Отправлено"
        }
    }

    async remove_ticket(id) {
        return this.ticketModel.deleteOne({_id: id})
    }

    async update_ticket(id: string, data: TicketDto): Promise<Ticket> {
        const ticket = await this.ticketModel.findById(id)

        ticket.answer = data.answer;
        ticket.state = "Обработано";

        if(data.answer === ""){
            ticket.state = "В обработке";
        }

        ticket.save();

        return this.ticketModel.findById(id)
    }
}
