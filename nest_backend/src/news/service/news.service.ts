import {Injectable} from '@nestjs/common';
import {NewsDto} from "../dto/NewsDto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {News} from "../../schemas/news.schemas";

@Injectable()
export class NewsService {
    constructor(
        @InjectModel("News")
        private newsModel: Model<News>
    ) {}


    async list_news(): Promise<NewsDto[]> {
        return this.newsModel.find({})
    }

    async create_news(news: NewsDto): Promise<NewsDto> {
        const new_news = new this.newsModel(news)
        return new_news.save()
    }

    async delete_news(id: string) {
        return this.newsModel.deleteOne({_id: id})
    }

    async update_news(id: string, news: NewsDto): Promise<NewsDto> {
        await this.newsModel.updateOne({_id: id}, {title: news.title, text: news.text})
        return this.newsModel.findById(id)
    }
}
