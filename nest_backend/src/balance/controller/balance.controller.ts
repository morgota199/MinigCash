import {Body, Controller, Get, Headers, Put, UseGuards} from '@nestjs/common';
import {ApiBody, ApiHeaders, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtService} from "@nestjs/jwt";
import {BalanceService} from "../service/balance.service";
import {JwtAuthGuard} from "../../auth/strategy/JWT-guard";
import {ErrorDto} from "../../dto/error_dto";
import {MoneyDto} from "../../dto/MoneyDto";
import {PowerDto} from "../../dto/PowerDto";
import {User} from "../../schemas/user.schemas";
import {OnePowerDto} from "../dto/OnePowerDto";

@ApiTags("Balance")
@Controller('balance')
export class BalanceController {
    constructor(
        private balanceService: BalanceService,
        private jwtService: JwtService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get("/money")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: MoneyDto})
    @ApiResponse({status: 400, type: ErrorDto})
    money(@Headers() headers){
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.balanceService.money(user.sub)
    }


    @UseGuards(JwtAuthGuard)
    @Get("/power")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: PowerDto})
    @ApiResponse({status: 400, type: ErrorDto})
    power(@Headers() headers){
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.balanceService.power(user.sub)
    }


    @UseGuards(JwtAuthGuard)
    @Put("/power")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiBody({type: OnePowerDto})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 400, type: ErrorDto})
    set_power(@Headers() headers, @Body() power: OnePowerDto): Promise<User | ErrorDto>{
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.balanceService.set_power(user.sub, power)
    }
}
