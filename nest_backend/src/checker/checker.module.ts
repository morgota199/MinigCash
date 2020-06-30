import { Module } from '@nestjs/common';
import { CheckerController } from './controller/checker.controller';
import { CheckerService } from './service/checker.service';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "../auth/constants";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schemas";
import {AuthModule} from "../auth/auth.module";

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
    controllers: [CheckerController],
    providers: [CheckerService, AuthModule]
})
export class CheckerModule {}
