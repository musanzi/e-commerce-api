import { BaseEntity } from 'src/shared/utils/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Specificity } from '../specificities/entities/specificity.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Type } from '../types/entities/type.entity';
import { ProductImage } from '../images/entities/image.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @ManyToOne(() => Type, (type) => type.products)
  @JoinColumn()
  type: Type;

  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => Specificity, (specificity) => specificity.products)
  @JoinTable()
  specificities: Specificity[];
}
