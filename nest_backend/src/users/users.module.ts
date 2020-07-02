import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user.schemas";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";

@Module({
  imports: [
    MongooseModule.forFeature(
        [
          {name: "User", schema: UserSchema}
        ]
    ),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
