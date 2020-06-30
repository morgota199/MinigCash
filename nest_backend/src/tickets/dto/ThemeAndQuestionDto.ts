import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class ThemeAndQuestionDto {

    @ApiProperty()
    @IsNotEmpty({message: "Тема обязательна"})
    theme: string

    @ApiProperty()
    @IsNotEmpty({message: "Вопрос обязателен"})
    question: string
}