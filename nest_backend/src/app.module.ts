import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import {UserSchema} from "./schemas/user.schemas";
import {MiningService} from "./mining/service/mining.service";
import { PayModule } from './pay/pay.module';
import { CheckerModule } from './checker/checker.module';
import { BalanceModule } from './balance/balance.module';
import { TicketsModule} from "./tickets/tickets.module"

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NewsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mining_cash'),
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
    PayModule,
    CheckerModule,
    BalanceModule,
    TicketsModule],
  controllers: [AppController],
  providers: [AppService, MiningService],
})
export class AppModule {}
