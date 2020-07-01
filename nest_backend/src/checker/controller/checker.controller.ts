import {Controller, Get, Headers, Request, UseGuards} from '@nestjs/common';
import {ApiHeaders, ApiProperty, ApiRequestTimeoutResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CheckerService} from "../service/checker.service";
import {JwtAuthGuard} from "../../auth/strategy/JWT-guard";
import {JwtService} from "@nestjs/jwt";
import {CheckerDto} from "../dto/CheckerDto";
import {ErrorDto} from "../../dto/ErrorDto";

@ApiTags("Checker")
@Controller('checker')
export class CheckerController {
    constructor(
        private checkerService: CheckerService,
        private jwtService: JwtService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get("/")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: CheckerDto})
    @ApiResponse({status: 400, type: ErrorDto})
    checker(@Headers() headers): Promise<CheckerDto | ErrorDto> {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.checkerService.checker(user.sub)
    }
}
