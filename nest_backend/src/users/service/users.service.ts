import {Injectable} from '@nestjs/common';
import {User} from "../../schemas/user.schemas";
import {hash, compare} from "bcrypt";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ErrorDto} from "../../dto/ErrorDto";
import {SelectPasswordDto} from "../dto/SelectPasswordDto";
import {UserAndMessageDto} from "../../pay/dto/UserAndMessageDto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel("User")
        private userModel: Model<User>
    ) {}

    async list_users(): Promise<User[]> {
        return this.userModel.find()
    }

    async get_user(id: string): Promise<User> {
        return this.userModel.findById(id)
    }

    async delete_user(id: string) {
        return this.userModel.deleteOne({_id: id})
    }

    async block_user(id: string): Promise<boolean | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        if(user.block)
            return new ErrorDto(
                400,
                ["Пользователь блокирован"],
                "Bad request"
            )

        user.block = true

        user.save()

        return user.block
    }

    async unblock_user(id: string): Promise<boolean | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        if(!user.block)
            return new ErrorDto(
                400,
                ["Пользователь не блокирован"],
                "Bad request"
            )

        user.block = false

        user.save()

        return user.block
    }

    async block_check(id: string): Promise<boolean | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return user.block
    }

    async is_admin_check(id: string): Promise<boolean | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        return user.is_admin
    }

    async search(data: string): Promise<User[]> {
        const search_data = await this.userModel.find({
            $or: [
                { username: data },
                { email: data }
            ]
        });

        if (search_data.length !== 0)
            return search_data;

        const id_search_data = await this.userModel.findById(data);

        return [id_search_data];
    }

    async add_admin(id: string): Promise<boolean | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        if(user.is_admin)
            return new ErrorDto(
                400,
                ["Пользователь администратор"],
                "Bad request"
            )

        user.is_admin = true

        user.save()

        return user.is_admin
    }

    async remove_admin(id: string): Promise<boolean | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        if(!user.is_admin)
            return new ErrorDto(
                400,
                ["Пользователь не администратор"],
                "Bad request"
            )

        user.is_admin = false

        user.save()

        return user.is_admin
    }

    async select_password(id: string, selectPassword: SelectPasswordDto): Promise<UserAndMessageDto | ErrorDto> {
        const user = await this.userModel.findById(id)

        if(!user)
            return new ErrorDto(
                400,
                ["Пользователь не найден"],
                "Bad request"
            )

        const isMatch = await compare(selectPassword.oldPassword, user.password);

        if(!isMatch)
            return new ErrorDto(
                400,
                ["Неверный пароль"],
                "Bad request"
            )


        user.password = await hash(selectPassword.newPassword, 12);

        await user.save();

        return {
            user: user,
            message: "Пароль сменен"
        }
    }
}