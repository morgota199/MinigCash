import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Payouts} from "../../schemas/payouts.schemas";
import {User} from "../../schemas/user.schemas";
import {Model} from "mongoose";
import {ErrorDto} from "../../dto/ErrorDto";
import {Payment} from "../../schemas/payment.shemas";
import {TransactionDto} from "../dto/TransactionDto";
import {PayDto} from "../dto/PayDto";
import {UserAndMessageDto} from "../dto/UserAndMessageDto";
import {PayoutAndMessageDto} from "../dto/PayoutAndMessageDto";

@Injectable()
export class PayService {
    constructor(
        @InjectModel("User")
        private userModel: Model<User>,

        @InjectModel("Payouts")
        private payoutModel: Model<Payouts>,

        @InjectModel("Payment")
        private paymentModel: Model<Payment>
    ) {}

    async list_pay(): Promise<Payouts[]> {
        return this.payoutModel.find()
    }

    async list_pay_user(id: string): Promise<Payouts[] | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return this.payoutModel.find({username: user.username, email: user.email});
    }

    async search_pay(param: string): Promise<Payouts[]> {
        const search_data = await this.payoutModel.find({
            $or: [
                {username: param},
                {email: param}
            ]
        })

        if(search_data.length !== 0)
            return search_data

        const id_search_data = await this.payoutModel.findById(param)

        return [id_search_data]
    }

    async transaction(): Promise<TransactionDto> {
        const payouts = await this.payoutModel.find({confirmation: "Подтверждено"}).sort({date: -1}).limit(9),
            payment = await this.paymentModel.find({}).sort({date: -1}).limit(9);

        return {
            payouts: payouts,
            payment: payment
        }
    }

    async exchange(id: string, type: string, pay: PayDto): Promise<UserAndMessageDto | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        user.money[type] -= pay.money
        user.money.ghs += pay.ghs

        await user.save()

        return {
            user: user,
            message: 'Обменяно'
        }
    }

    async approve(id: string): Promise<PayoutAndMessageDto | ErrorDto> {
        const pay = await this.payoutModel.findById(id)

        if(!pay)
            return new ErrorDto(
                400,
                ["Платеж не найден"],
                "Bad request"
            )


        if(pay.confirmation !== "В обработке")
            return new ErrorDto(
                400,
                ["Платеж уже был обработан"],
                "Bad request"
            )


        const user = await this.userModel.findOne(
            {
                username: pay.username,
                email: pay.email
            }
        )

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        const type = pay.system.toLowerCase()


        if(user.money[type] - pay.money >= 0){
            user.money[type] -= pay.money;
            pay.confirmation = "Подтверждено";
        } else {
            pay.confirmation = "Отклонено";
        }


        await user.save()
        await pay.save()

        return {
            payouts: pay,
            message: pay.confirmation
        }
    }

    async reject(id: string): Promise<PayoutAndMessageDto | ErrorDto> {
        const pay = await this.payoutModel.findById(id)

        if(!pay)
            return new ErrorDto(
                400,
                ["Платеж не найден"],
                "Bad request"
            )


        if(pay.confirmation !== "В обработке")
            return new ErrorDto(
                400,
                ["Платеж уже был обработан"],
                "Bad request"
            )

        pay.confirmation = "Отклонено";

        await pay.save()

        return {
            payouts: pay,
            message: pay.confirmation
        }
    }
}
