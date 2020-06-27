import {Injectable} from '@nestjs/common';
import {User} from "../schemas/user.schemas";

@Injectable()
export class UsersService {
    constructor() {}

    async list_users(): Promise<void> {
        console.log("data")
    }

    async delete_user(id: number): Promise<void> {
        console.log(id)
    }

    async block_user(id: number): Promise<void> {
        console.log(id)
    }

    async unblock_user(id: number): Promise<void> {
        console.log(id)
    }

    async block_check(id: number): Promise<void> {
        console.log(id)
    }

    async is_admin_check(id: number): Promise<void> {
        console.log(id)
    }

    async search(data: string): Promise<void> {
        console.log(data)
    }

    async add_admin(id: number): Promise<void> {
        console.log(id)
    }

    async remove_admin(id: number): Promise<void> {
        console.log(id)
    }

    async ref(id: number): Promise<void> {
        console.log(id)
    }
}