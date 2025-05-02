import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  async create(dto: CreateTagDto): Promise<Tag> {
    try {
      return await this.tagRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find({
      order: { updated_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Tag> {
    try {
      return await this.tagRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateTagDto): Promise<Tag> {
    try {
      const tag = await this.findOne(id);
      return await this.tagRepository.save({ ...tag, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.tagRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
