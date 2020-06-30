import { Module } from '@nestjs/common';
import {AuthService} from "./service/auth.service";
import {AuthController} from "./controller/auth.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schemas";
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "./constants";
import {MiningService} from "../mining/service/mining.service";
import {JwtStrategy} from "./strategy/jwt.strategy";


@Module({
    imports: [MongooseModule.forFeature(
        [
            {
                name: "User",
                schema: UserSchema
            }
        ]
    ),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        })
    ],
    providers: [AuthService, MiningService, JwtStrategy],
    controllers: [AuthController]
})

export class AuthModule {}