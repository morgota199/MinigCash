import {Payment} from "../../schemas/payment.shemas";
import {ApiProperty} from "@nestjs/swagger";
import {Payouts} from "../../schemas/payouts.schemas";

export class TransactionDto {
    @ApiProperty({type: [Payment]})
    payment: Payment[]

    @ApiProperty({type: [Payouts]})
    payouts: Payouts[]
}