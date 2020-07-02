import {Body, Controller, Get, Headers, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiBody, ApiHeaders, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PayService} from "../service/pay.service";
import {Payouts} from "../../schemas/payouts.schemas";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "../../auth/strategy/JWT-guard";
import {ErrorDto} from "../../dto/ErrorDto";
import {TransactionDto} from "../dto/TransactionDto";
import {type} from "os";
import {PayDto} from "../dto/PayDto";
import {UserAndMessageDto} from "../dto/UserAndMessageDto";
import {PayoutAndMessageDto} from "../dto/PayoutAndMessageDto";

@ApiTags("Pay")
@Controller('pay')
export class PayController {
    constructor(
        private payService: PayService,
        private jwtService: JwtService
    ) {}

    @Get()
    @ApiResponse({status: 200, type: [Payouts]})
    list_pay(): Promise<Payouts[]> {
       return this.payService.list_pay()
    }

    @UseGuards(JwtAuthGuard)
    @Get("/user")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: [Payouts]})
    @ApiResponse({status: 400, type: ErrorDto})
    list_pay_user(@Headers() headers): Promise<Payouts[] | ErrorDto> {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.payService.list_pay_user(user.sub)
    }

    @Get("/transaction")
    @ApiResponse({status: 200, type: TransactionDto})
    transaction(): Promise<TransactionDto> {
        return this.payService.transaction()
    }


    @Get("/search/:param")
    @ApiResponse({status: 200, type: [Payouts]})
    search_pay(@Param("param") param: string): Promise<Payouts[]> {
        return this.payService.search_pay(param)
    }


    @UseGuards(JwtAuthGuard)
    @Post("/exchange/:type")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiBody({type: PayDto})
    @ApiResponse({status: 200, type: UserAndMessageDto})
    @ApiResponse({status: 400, type: ErrorDto})
    exchange(
        @Param("type") type: string,
        @Headers() headers,
        @Body() pay: PayDto
    ): Promise<UserAndMessageDto | ErrorDto> {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.payService.exchange(user.sub, type, pay)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id/approve')
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: PayoutAndMessageDto})
    @ApiResponse({status: 400, type: ErrorDto})
    approve(@Param("id") id: string): Promise<PayoutAndMessageDto | ErrorDto> {
        return this.payService.approve(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id/reject')
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: PayoutAndMessageDto})
    @ApiResponse({status: 400, type: ErrorDto})
    reject(@Param("id") id: string): Promise<PayoutAndMessageDto | ErrorDto> {
        return this.payService.reject(id)
    }
}
