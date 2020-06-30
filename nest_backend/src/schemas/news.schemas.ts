import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

@Schema()
export class News extends Document {
    @Prop()
    @ApiProperty()
    title: string

    @Prop()
    @ApiProperty()
    text: string
}

export const NewsSchema = SchemaFactory.createForClass(News);