import { Module } from '@nestjs/common';
import { BalanceService } from './service/balance.service';
import { BalanceController } from './controller/balance.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schemas";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
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
  providers: [BalanceService, AuthModule],
  controllers: [BalanceController]
})
export class BalanceModule {}
