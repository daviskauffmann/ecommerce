import { faker } from '@faker-js/faker';
import { Product } from './../src/product/product.entity';
import { Example } from './example.entity';

export class EntityFactory {
  static example(overrides?: Partial<Example>) {
    const testEntity = new Example();
    testEntity.id = faker.datatype.number();
    testEntity.string = faker.random.word();
    Object.assign(testEntity, overrides);
    return testEntity;
  }

  static product(overrides?: Partial<Product>) {
    const product: Product = new Product();
    product.id = faker.datatype.number();
    product.name = faker.random.word();
    product.description = faker.random.words();
    Object.assign(product, overrides);
    return product;
  }
}
