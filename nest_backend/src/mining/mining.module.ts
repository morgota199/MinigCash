import { Module } from '@nestjs/common';
import { MiningService } from './service/mining.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schemas";

@Module({
  imports: [MongooseModule.forFeature(
      [
        {
          name: "User",
          schema: UserSchema
        }
      ]
  )],
  providers: [MiningService]
})
export class MiningModule {}
