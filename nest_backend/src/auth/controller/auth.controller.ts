import {Body, Controller, Post} from '@nestjs/common';
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../dto/create_user_dto";
import {AuthService} from "../service/auth.service";
import {User} from "../../schemas/user.schemas";
import {ErrorDto} from "../../dto/ErrorDto";
import {TokenDto} from "../dto/token_dto";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/register")
    @ApiBody({type: CreateUserDto})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 400, type: ErrorDto})
    register(@Body() user: CreateUserDto): Promise<User | ErrorDto> {
        return this.authService.register(user)
    }

    @Post("/login")
    @ApiBody({type: CreateUserDto})
    @ApiResponse({status: 200, type: TokenDto})
    @ApiResponse({status: 401, type: ErrorDto})
    login(@Body() user: CreateUserDto): Promise<TokenDto | ErrorDto> {
        return this.authService.login(user)
    }
}
