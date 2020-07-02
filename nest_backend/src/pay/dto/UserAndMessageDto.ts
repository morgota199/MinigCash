import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../schemas/user.schemas";

export class UserAndMessageDto {
    @ApiProperty()
    user: User

    @ApiProperty()
    message: string
}