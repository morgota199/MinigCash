import {Controller, Get, Headers, Param, UseGuards} from '@nestjs/common';
import {ApiHeaders, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ReferenceService} from "../service/reference.service";
import {MessageDto} from "../../dto/MessageDto";
import {JwtAuthGuard} from "../../auth/strategy/JWT-guard";
import {ErrorDto} from "../../dto/ErrorDto";
import {ReferenceDto} from "../../dto/ReferenceDto";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../schemas/user.schemas";

@ApiTags("Reference")
@Controller('reference')
export class ReferenceController {
    constructor(
        private referenceService: ReferenceService,
        private jwtService: JwtService
    ) {}


    @Get("/:id")
    new_reference(@Param("id") id: string): Promise<MessageDto> {
        return this.referenceService.new_reference(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/me")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: ReferenceDto})
    @ApiResponse({status: 400, type: ErrorDto})
    get_me_ref(@Headers() headers): Promise<ReferenceDto | ErrorDto> {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.referenceService.get_me_ref(user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/me/users")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: [User]})
    @ApiResponse({status: 400, type: ErrorDto})
    get_me_ref_users(@Headers() headers) {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.referenceService.get_me_ref_users(user.sub)
    }

    @Get("/pay/:id")
    get_pay_ref_for_id(@Param("id") id: string) {

    }


}
