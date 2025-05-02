import { Module } from '@nestjs/common';
import { SpecificitiesService } from './specificities.service';
import { SpecificitiesController } from './specificities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specificity } from './entities/specificity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specificity])],
  controllers: [SpecificitiesController],
  providers: [SpecificitiesService]
})
export class SpecificitiesModule {}
