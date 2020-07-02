import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../../schemas/user.schemas";
import {Model, Types} from "mongoose";
import {MessageDto} from "../../dto/MessageDto";
import {ReferenceDto} from "../../dto/ReferenceDto";
import {ErrorDto} from "../../dto/ErrorDto";
import {Payment} from "../../schemas/payment.shemas";

@Injectable()
export class ReferenceService {
    constructor(
        @InjectModel("User")
        private usersModel: Model<User>,
        
        @InjectModel("Payment")
        private paymentModel: Model<Payment>
    ) {}

    async new_reference(id: string): Promise<MessageDto> {
        const linkRef = await this.usersModel.findById(id);

        linkRef.ref.ref_show += 1;

        await linkRef.save();

        return {message: "Реферал добавлен"}
    }


    async get_me_ref(id: string) {
        const user = await this.usersModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return user.ref
    }


    async get_me_ref_users(id: string): Promise<User[] | ErrorDto> {
        const user = await this.usersModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return this.usersModel.find({
            '_id' : {
                $in : user.ref.ref_register
            }
        });
    }


    async get_pay_ref_for_id(id: string): Promise<Payment[]> {
        return this.paymentModel.find({userId: id})
    }

    async get_reference_ref (data: string[]): Promise<User[]> {
        return this.usersModel.find({
            '_id' : {
                $in : data
            }
        });
    }
}
