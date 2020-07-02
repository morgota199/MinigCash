import {Body, Controller, Delete, Get, Headers, Param, Patch, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "../service/users.service";
import {ApiBody, ApiHeaders, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../../schemas/user.schemas";
import {ErrorDto} from "../../dto/ErrorDto";
import {JwtAuthGuard} from "../../auth/strategy/JWT-guard";
import {SelectPasswordDto} from "../dto/SelectPasswordDto";
import {JwtService} from "@nestjs/jwt";
import {UserAndMessageDto} from "../../pay/dto/UserAndMessageDto";

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}


    @Get("/")
    @ApiResponse({status: 200, type: [User]})
    list_users(): Promise<User[]> {
        return this.usersService.list_users()
    }

    @Get("/:id")
    @ApiResponse({status:200, type: User})
    get_user(@Param("id") id: string): Promise<User> {
        return this.usersService.get_user(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    delete_user(@Param("id") id: string) {
        return this.usersService.delete_user(id)
    }

    @Get("/:id/block")
    @ApiResponse({status: 200, type: Boolean})
    @ApiResponse({status: 400, type: ErrorDto})
    block_check(@Param("id") id: string): Promise<boolean | ErrorDto> {
        return this.usersService.block_check(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:id/block")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: Boolean})
    @ApiResponse({status: 400, type: ErrorDto})
    block_user(@Param("id") id: string): Promise<boolean | ErrorDto> {
        return this.usersService.block_user(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:id/unblock")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: Boolean})
    @ApiResponse({status: 400, type: ErrorDto})
    unblock_user(@Param("id") id: string): Promise<boolean | ErrorDto> {
        return this.usersService.block_user(id)
    }

    @Get("/:id/admin")
    @ApiResponse({status: 200, type: Boolean})
    @ApiResponse({status: 400, type: ErrorDto})
    is_admin_check(@Param("id") id: string): Promise<boolean | ErrorDto> {
        return this.usersService.is_admin_check(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:id/add_admin")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: Boolean})
    @ApiResponse({status: 400, type: ErrorDto})
    add_admin(@Param("id") id: string): Promise<boolean | ErrorDto> {
        return this.usersService.add_admin(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:id/remove_admin")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: Boolean})
    @ApiResponse({status: 400, type: ErrorDto})
    remove_admin(@Param("id") id: string): Promise<boolean | ErrorDto> {
        return this.usersService.remove_admin(id)
    }

    @Get("/search/:param")
    @ApiResponse({status: 200, type: [User]})
    search(@Param("param") param: string): Promise<User[]> {
        return this.usersService.search(param)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/select_password')
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiBody({type: SelectPasswordDto})
    @ApiResponse({status: 200, type: UserAndMessageDto})
    @ApiResponse({status: 400, type: ErrorDto})
    select_password(
        @Headers() headers,
        @Body() selectPassword: SelectPasswordDto
    ): Promise<UserAndMessageDto | ErrorDto> {
        const user = this.jwtService.decode(headers.authorization.split("Bearer ").pop())

        return this.usersService.select_password(user.sub, selectPassword)
    }
}
