import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../schemas/user.schemas";
import {MoneyDto} from "../../dto/MoneyDto";
import {ErrorDto} from "../../dto/error_dto";
import {PowerDto} from "../../dto/PowerDto";
import {OnePowerDto} from "../dto/OnePowerDto";


@Injectable()
export class BalanceService {
    constructor(
        @InjectModel("User")
        private userModel: Model<User>
    ) {}

    async money(id: string): Promise<MoneyDto | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return user.money
    }

    async power(id: string): Promise<PowerDto | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return user.power
    }

    async set_power(id: string, power: OnePowerDto): Promise<User | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        user.power[power.name.toLowerCase()] = power.value

        return user.save()
    }
}
