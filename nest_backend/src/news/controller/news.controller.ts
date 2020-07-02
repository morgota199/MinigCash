import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {NewsService} from "../service/news.service";
import {ApiBody, ApiHeaders, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {NewsDto} from "../dto/NewsDto";
import {ErrorDto} from "../../dto/ErrorDto";
import {JwtAuthGuard} from "../../auth/strategy/JWT-guard";

@ApiTags("News")
@Controller('news')
export class NewsController {
    constructor(
        private newsService: NewsService
    ) {}

    @Get()
    @ApiResponse({status: 200, type: [NewsDto]})
    list_news(): Promise<NewsDto[]> {
        return this.newsService.list_news()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiBody({type: NewsDto})
    create_news(@Body() news: NewsDto): Promise<NewsDto | ErrorDto> {
        return this.newsService.create_news(news)
    }

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    @ApiBody({type: NewsDto})
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    @ApiResponse({status: 200, type: NewsDto})
    update_news(@Param("id") id: string, @Body() news: NewsDto): Promise<NewsDto> {
        return this.newsService.update_news(id, news)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    @ApiHeaders([{name: "Authorization", description: "Bearer TOKEN"}])
    delete_news(@Param("id") id: string) {
        return this.newsService.delete_news(id)
    }
}
