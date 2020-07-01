import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../schemas/user.schemas";
import {ErrorDto} from "../../dto/ErrorDto";
import {CheckerDto} from "../dto/CheckerDto";

@Injectable()
export class CheckerService {
    constructor(
        @InjectModel("User")
        private userModel: Model<User>
    ) {}

    async checker(id: string): Promise<CheckerDto | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return {
            block: user.block,
            is_admin: user.is_admin,
            money: user.money,
            power: user.power
        }
    }
}
