import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecificityDto } from './dto/create-specificity.dto';
import { UpdateSpecificityDto } from './dto/update-specificity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specificity } from './entities/specificity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecificitiesService {
  constructor(
    @InjectRepository(Specificity)
    private specificityRepository: Repository<Specificity>
  ) {}

  async create(dto: CreateSpecificityDto): Promise<Specificity> {
    try {
      return await this.specificityRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Specificity[]> {
    return await this.specificityRepository.find({
      order: { updated_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Specificity> {
    try {
      const specificity = await this.specificityRepository.findOneOrFail({
        where: { id }
      });
      return specificity;
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateSpecificityDto): Promise<Specificity> {
    try {
      const specificity = await this.findOne(id);
      return await this.specificityRepository.save({
        ...specificity,
        ...dto
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.specificityRepository.delete(id);
    } catch {
      throw new NotFoundException();
    }
  }
}
