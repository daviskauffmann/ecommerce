import { faker } from '@faker-js/faker';
import { Product } from './../src/product/product.entity';
import { Example } from './example.entity';

export class EntityFactory {
  static example(overrides?: Partial<Example>) {
    const example = new Example();
    example.id = faker.datatype.number();
    example.string = faker.random.word();
    Object.assign(example, overrides);
    return example;
  }

  static product(overrides?: Partial<Product>) {
    const product: Product = new Product();
    product.id = faker.datatype.number();
    product.name = faker.random.word();
    product.description = faker.random.words();
    product.categories = [faker.random.word(), faker.random.word()];
    Object.assign(product, overrides);
    return product;
  }
}
