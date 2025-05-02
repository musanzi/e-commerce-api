import { Product } from 'src/products/entities/product.entity';
import { BaseEntity } from 'src/shared/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProductImage extends BaseEntity {
  @Column({ unique: true })
  url: string;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn()
  product: Product;
}
