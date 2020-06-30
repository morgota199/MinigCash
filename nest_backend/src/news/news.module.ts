import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {NewsSchema} from "../schemas/news.schemas";
import {NewsService} from "./service/news.service";
import {NewsController} from "./controller/news.controller";

@Module({
    imports: [MongooseModule.forFeature(
        [
            {
                name: "News",
                schema: NewsSchema
            }
        ]
    )],
    providers: [NewsService],
    controllers: [NewsController]
})
export class NewsModule {}
