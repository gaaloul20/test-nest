/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

export interface PostsSummary {
  posts: Post[];
  total: number;
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: MongoRepository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postRepo.create({
      ...createPostDto,
      statut: true,
    });
    return await this.postRepo.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepo.find();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepo.findOneBy({
      _id: new ObjectId(id),
    } as unknown as Partial<Post>);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postRepo.save(post);
  }

  async remove(id: string): Promise<void> {
    const result = await this.postRepo.delete({
      _id: new ObjectId(id),
    } as unknown as Partial<Post>);
    if (!result.affected) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async getSummary(): Promise<PostsSummary> {
    const posts = await this.findAll();
    return {
      posts,
      total: posts.length,
    };
  }
}
