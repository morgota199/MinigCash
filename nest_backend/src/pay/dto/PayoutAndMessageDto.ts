import {Payouts} from "../../schemas/payouts.schemas";
import {ApiProperty} from "@nestjs/swagger";

export class PayoutAndMessageDto {
    @ApiProperty()
    payouts: Payouts

    @ApiProperty()
    message: string
}