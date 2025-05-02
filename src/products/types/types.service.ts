import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>
  ) {}

  async create(dto: CreateTypeDto): Promise<Type> {
    try {
      return await this.typeRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Type[]> {
    return await this.typeRepository.find({
      order: { updated_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Type> {
    try {
      return await this.typeRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateTypeDto): Promise<Type> {
    try {
      const type = await this.findOne(id);
      return await this.typeRepository.save({ ...type, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.typeRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
