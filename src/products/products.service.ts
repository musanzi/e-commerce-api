import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save({
        ...dto,
        type: { id: dto.type },
        tags: dto.tags.map((tag) => ({ id: tag })),
        specificities: dto.specificities.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      order: { updated_at: 'DESC' },
      relations: ['type', 'tags', 'specificities', 'images']
    });
  }

  async findOne(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({
        where: { id },
        relations: ['type', 'tags', 'specificities', 'images']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.findOne(id);
      return await this.productRepository.save({
        ...product,
        ...dto,
        type: { id: dto.type },
        tags: dto.tags.map((tag) => ({ id: tag })),
        specificities: dto.specificities.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.productRepository.delete(id);
    } catch {
      throw new NotFoundException();
    }
  }
}
