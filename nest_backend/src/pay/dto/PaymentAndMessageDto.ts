import {ApiProperty} from "@nestjs/swagger";
import {Payment} from "../../schemas/payment.shemas";

export class PaymentAndMessageDto {
    @ApiProperty()
    payment: Payment

    @ApiProperty()
    message: string
}