import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Pay} from "../../schemas/pay.schemas";


@Injectable()
export class PayService {
    constructor(
        @InjectModel("Pay")
        private payModel: Model<Pay>
    ) {}


}
