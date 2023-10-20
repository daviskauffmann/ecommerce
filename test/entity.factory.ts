import { faker } from '@faker-js/faker';
import { Product } from './../src/product/product.entity';
import { Example } from './example.entity';

export class EntityFactory {
  static example(overrides?: Partial<Example>) {
    const example = new Example();
    example.id = faker.number.int();
    example.string = faker.word.sample();
    Object.assign(example, overrides);
    return example;
  }

  static product(overrides?: Partial<Product>) {
    const product = new Product();
    product.id = faker.number.int();
    product.name = faker.word.sample();
    product.description = faker.word.words();
    product.categories = [faker.word.sample(), faker.word.sample()];
    Object.assign(product, overrides);
    return product;
  }
}
