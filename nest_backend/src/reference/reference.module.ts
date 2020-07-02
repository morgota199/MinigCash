import { Module } from '@nestjs/common';
import { ReferenceController } from './controller/reference.controller';
import { ReferenceService } from './service/reference.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schemas";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {PaymentSchema} from "../schemas/payment.shemas";

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name: "User", schema: UserSchema},
            {name: "Payment", schema: PaymentSchema}
        ]
    ),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        })],
    controllers: [ReferenceController],
    providers: [ReferenceService]
})
export class ReferenceModule {}
