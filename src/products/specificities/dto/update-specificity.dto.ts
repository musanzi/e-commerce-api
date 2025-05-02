import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecificityDto } from './create-specificity.dto';

export class UpdateSpecificityDto extends PartialType(CreateSpecificityDto) {}
