import { Product } from 'src/products/entities/product.entity';
import { BaseEntity } from 'src/shared/utils/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Specificity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.specificities)
  products: Product[];
}
