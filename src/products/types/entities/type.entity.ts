import { Product } from 'src/products/entities/product.entity';
import { BaseEntity } from 'src/shared/utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Type extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.type)
  products: Product[];
}
