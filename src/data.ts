import * as faker from "faker";
import { Item, ItemStats } from "./model";

faker.seed(12412);

export function getItems(): Item[] {
  return Array.from(
    { length: 25 },
    () =>
      new Item(
        faker.random.uuid(),
        faker.company.bs(),
        new ItemStats(
          +faker.random.number(10),
          +faker.random.number(4),
          +faker.random.number(3),
          +faker.random.number(3)
        )
      )
  );
}
