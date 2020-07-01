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
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Pay")
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
    controllers: [PaymentController, PayoutsController],
    providers: [PayoutsService, PaymentService]
})
export class PayModule {}
