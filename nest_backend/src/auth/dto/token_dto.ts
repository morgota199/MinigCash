import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../schemas/user.schemas";

export class TokenDto {
    @ApiProperty()
    access_token: string

    @ApiProperty()
    user: User
}