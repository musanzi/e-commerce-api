import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecificitiesService } from './specificities.service';
import { CreateSpecificityDto } from './dto/create-specificity.dto';
import { UpdateSpecificityDto } from './dto/update-specificity.dto';
import { Specificity } from './entities/specificity.entity';
import { Auth } from 'src/shared/decorators/auth.decorators';
import { RoleEnum } from 'src/shared/enums/roles.enum';

@Controller('specificities')
@Auth(RoleEnum.Admin)
export class SpecificitiesController {
  constructor(private specificitiesService: SpecificitiesService) {}

  @Post()
  create(@Body() createSpecificityDto: CreateSpecificityDto): Promise<Specificity> {
    return this.specificitiesService.create(createSpecificityDto);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Specificity[]> {
    return this.specificitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Specificity> {
    return this.specificitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSpecificityDto): Promise<Specificity> {
    return this.specificitiesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.specificitiesService.remove(id);
  }
}
