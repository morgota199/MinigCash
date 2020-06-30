import {Controller, Delete, Get, Param, Patch} from '@nestjs/common';
import {UsersService} from "../service/users.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("/")
    list_users(): any {
        return this.usersService.list_users()
    }

    @Delete("/:id")
    delete_user(@Param("id") id: number): any {
        return this.usersService.delete_user(id)
    }

    @Get("/:id/block")
    block_check(@Param("id") id: number): any {
        return this.usersService.block_check(id)
    }

    @Patch("/:id/block")
    block_user(@Param("id") id: number): any {
        return this.usersService.block_user(id)
    }

    @Patch("/:id/unblock")
    unblock_user(@Param("id") id: number): any {
        return this.usersService.block_user(id)
    }

    @Get("/:id/admin")
    is_admin_check(@Param("id") id: number): any {
        return this.usersService.is_admin_check(id)
    }

    @Patch("/:id/add_admin")
    add_admin(@Param("id") id: number): any {
        return this.usersService.add_admin(id)
    }

    @Patch("/:id/remove_admin")
    remove_admin(@Param("id") id: number): any {
        return this.usersService.remove_admin(id)
    }

    @Get("/:id/ref")
    ref(@Param("id") id: number): any {
        return this.usersService.ref(id)
    }

    @Get("/search/:param")
    search(@Param("param") param: string): any {
        return this.usersService.search(param)
    }
}
