import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/image.entity';
import * as fs from 'fs-extra';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private imageRepository: Repository<ProductImage>
  ) {}

  async create(id: string, file: Express.Multer.File): Promise<ProductImage> {
    try {
      return await this.imageRepository.save({
        product: { id },
        url: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const img = await this.imageRepository.findOneOrFail({
        where: { id }
      });
      await fs.unlink(`./uploads/products/${img.url}`);
      await this.imageRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
