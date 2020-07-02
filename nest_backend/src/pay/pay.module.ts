import { Module } from '@nestjs/common';
import { PaymentController } from "./controller/payment/payment.controller";
import { PaymentService } from "./service/payment/payment.service";
import { PayoutsController } from "./controller/payouts/payouts.controller";
import { PayoutsService } from "./service/payouts/payouts.service";
import {MongooseModule} from "@nestjs/mongoose";
import {PayoutsSchema} from "../schemas/payouts.schemas";
import {PaymentSchema} from "../schemas/payment.shemas";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {UserSchema} from "../schemas/user.schemas";
import { PayController } from './controller/pay.controller';
import { PayService } from './service/pay.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "Payment", schema: PaymentSchema},
            {name: "Payouts", schema: PayoutsSchema},
            {name: "User", schema: UserSchema}
        ]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        })],
    controllers: [PaymentController, PayoutsController, PayController],
    providers: [PayoutsService, PaymentService, PayService]
})
export class PayModule {}
