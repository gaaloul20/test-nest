import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService, type PostsSummary } from './app.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SetStatusTruePipe } from './pipes/set-status-true.pipe';

@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body(new SetStatusTruePipe()) createPostDto: CreatePostDto) {
    return this.appService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get('summary')
  async getSummary(): Promise<PostsSummary> {
    return this.appService.getSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.appService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(id);
  }
}
