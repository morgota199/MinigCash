import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, Length} from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({message: "Имя не может быть пустым"})
    username: string

    @ApiProperty()
    @IsEmail({}, {message: "Не корректный Email"})
    email: string

    @ApiProperty()
    @Length(8, 30, {message: "Длина пароля от 8 до 30 символов"})
    password: string

    @ApiProperty({required: false})
    reference: string
}