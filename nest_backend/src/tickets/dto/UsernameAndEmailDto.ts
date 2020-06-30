import {ApiProperty} from "@nestjs/swagger";
import {IsEmail} from "class-validator";

export class UsernameAndEmailDto {

    @ApiProperty()
    username: string

    @ApiProperty()
    @IsEmail({}, {message: "Не корректный Email"})
    email: string
}