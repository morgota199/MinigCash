import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./schemas/user.schemas";
import {MiningService} from "./mining/service/mining.service";

@Injectable()
export class AppService {

    constructor(
        @InjectModel("User")
        private userModel: Model<User>,
        private miningService: MiningService
    ) {
        this.start_mining().then()
    }

    async start_mining(): Promise<void> {
        const allUsers = await this.userModel.find();

        for(let user of allUsers){
            await this.miningService.mining(user.id);
        }
    }
}
