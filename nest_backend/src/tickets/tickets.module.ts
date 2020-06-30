import { Module } from '@nestjs/common';
import { TicketsController } from './controller/tickets.controller';
import { TicketsService } from './service/tickets.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TicketSchema} from "../schemas/ticket.schema";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {AuthModule} from "../auth/auth.module";
import {UserSchema} from "../schemas/user.schemas";

@Module({
    imports: [MongooseModule.forFeature(
        [
            {
                name: "Tickets",
                schema: TicketSchema
            },
            {
                name: "User",
                schema: UserSchema
            }
        ]
    ),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        })],
    controllers: [TicketsController],
    providers: [TicketsService, AuthModule]
})
export class TicketsModule {}
