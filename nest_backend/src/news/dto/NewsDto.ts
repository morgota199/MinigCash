import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class NewsDto {
    @ApiProperty()
    @IsNotEmpty({message: "Название не может быть пустым"})
    title: string


    @ApiProperty()
    @IsNotEmpty({message: "Cодержание не может быть пустым"})
    text: string
}