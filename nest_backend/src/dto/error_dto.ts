import {ApiProperty} from "@nestjs/swagger";

export class ErrorDto {
    @ApiProperty()
    statusCode: number

    @ApiProperty()
    message: string[]

    @ApiProperty()
    error: string

    constructor(code: number, message: string[], error: string) {
        this.statusCode = code
        this.message = message
        this.error = error
    }
}