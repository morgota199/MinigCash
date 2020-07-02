import {ApiProperty} from "@nestjs/swagger";
import {Length} from "class-validator";

export class SelectPasswordDto {
    @ApiProperty()
    @Length(8, 30, {message: "Длина пароля от 8 до 30 символов"})
    oldPassword: string

    @ApiProperty()
    @Length(8, 30, {message: "Длина пароля от 8 до 30 символов"})
    newPassword: string
}