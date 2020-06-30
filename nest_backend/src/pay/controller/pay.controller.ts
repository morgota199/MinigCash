import {Controller, Get} from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Pay} from "../../schemas/pay.schemas";

@ApiTags("Pay")
@Controller('pay')
export class PayController {

    @Get("/")
    @ApiResponse({type: [Pay]})
    list_pay() {

    }
}
