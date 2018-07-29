import * as faker from "faker";
import { Item } from "./interfaces";

faker.seed(12412);

export function getItems(): Item[] {
  return Array.from({ length: 25 }, () => ({
    id: faker.random.uuid(),
    stats: {
      broken: +faker.random.number(3),
      failed: +faker.random.number(4),
      passed: +faker.random.number(10),
      skipped: +faker.random.number(3)
    },
    title: faker.company.bs()
  }));
}
