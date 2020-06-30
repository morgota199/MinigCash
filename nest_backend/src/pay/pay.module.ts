import { Module } from '@nestjs/common';
import { PayController } from './controller/pay.controller';
import { PayService } from './service/pay.service';
import {MongooseModule} from "@nestjs/mongoose";
import {PaySchema} from "../schemas/pay.schemas";

@Module({
  imports: [MongooseModule.forFeature([{name: "Pay", schema: PaySchema}])],
  controllers: [PayController],
  providers: [PayService]
})

export class PayModule {}
