import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/roles/entities/role.entity';
import { Specificity } from 'src/products/specificities/entities/specificity.entity';
import { Type } from 'src/products/types/entities/type.entity';
import { Tag } from 'src/products/tags/entities/tag.entity';
import { Product } from 'src/products/entities/product.entity';
import slugify from 'slugify';

export default class DbSeeder implements Seeder {
  async run(dataSource: DataSource) {
    await dataSource.dropDatabase();
    await dataSource.synchronize();

    const roleRepository = dataSource.getRepository(Role);
    const userRepository = dataSource.getRepository(User);
    const specificityRepository = dataSource.getRepository(Specificity);
    const typeRepository = dataSource.getRepository(Type);
    const tagRepository = dataSource.getRepository(Tag);
    const projectRepository = dataSource.getRepository(Product);

    const createSpecificities = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await specificityRepository.save({
            name: faker.commerce.productName()
          });
        })
      );
    };

    const createTypes = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await typeRepository.save({
            name: faker.commerce.productName()
          });
        })
      );
    };

    const createTags = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await tagRepository.save({
            name: faker.commerce.productName()
          });
        })
      );
    };

    const createProducts = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          const types = await typeRepository.find();
          const tags = await tagRepository.find();
          const specificities = await specificityRepository.find();
          const name = faker.commerce.productName();
          const slug = slugify(name, { lower: true });
          return await projectRepository.save({
            name,
            slug,
            description: faker.commerce.productDescription(),
            type: types[0],
            tags: faker.helpers.arrayElements(tags, faker.number.int({ min: 2, max: 3 })),
            specificities: faker.helpers.arrayElements(specificities, faker.number.int({ min: 2, max: 3 }))
          });
        })
      );
    };

    ['admin', 'user'].map(async (role) => {
      await roleRepository.save({ name: role });
    });

    await createTypes(20);
    await createTags(20);
    await createSpecificities(20);
    await createProducts(40);
    await userRepository.save({
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      phone_number: faker.phone.number({ style: 'human' }),
      email: 'admin@admin.com',
      verified_at: faker.date.recent(),
      password: await bcrypt.hash('admin1234', 10),
      roles: [await roleRepository.findOneByOrFail({ name: 'admin' })]
    });
  }
}
