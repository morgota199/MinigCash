import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../dto/create_user_dto";
import {User} from "../../schemas/user.schemas";
import {Model} from "mongoose";
import {hash, compare} from "bcrypt";
import {InjectModel} from "@nestjs/mongoose";
import {ErrorDto} from "../dto/error_dto";
import {JwtService} from "@nestjs/jwt";
import {TokenDto} from "../dto/token_dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User")
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async register(user: CreateUserDto): Promise<User | ErrorDto> {
        const check_username = await this.userModel.findOne({username: user.username})

        if(check_username)
            return new ErrorDto(
                400, ["Данное имя занято"], "Bad Request");

        const check_email = await this.userModel.findOne({email: user.email})

        if(check_email)
            return new ErrorDto(
                400, ["Данное имя занято"], "Bad Request")

        const hashPassword = await hash(user.password, 12)

        const person = new this.userModel({
            username: user.username,
            email: user.email,
            password: hashPassword,
            is_admin: false,
            forRef: null,
            block: false,
            power: {
                litecoin: 0,
                ethereum: 0,
                bitcoin: 0,
                usd: 0
            },
            money: {
                ghs: 1,
                litecoin: 0,
                ethereum: 0,
                bitcoin: 0,
                ref_money: 0,
                usd: 0
            },
            ref: {
                ref_show: 0,
                ref_register: []
            }
        })

        return person.save()
    }

    async login(user: CreateUserDto): Promise<TokenDto | ErrorDto> {
        const person = await this.userModel.findOne({
            username: user.username,
            email: user.email
        })

        if(!person)
            return new ErrorDto(
                401,
                ["Такого пользователя не существует"],
                "Bad Request"
            )


        const is_password = await compare(user.password, person.password)

        if(!is_password)
            return new ErrorDto(
                401,
                ["Пароли не совпадают"],
                "Bad Request"
            )

        const payload = { username: person.username, sub: person._id };

        return {
            access_token: this.jwtService.sign(payload),
            user: person
        };
    }
}