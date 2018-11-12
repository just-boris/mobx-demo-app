import { observable } from "mobx";
import ItemStats from "./ItemStats";

export { ItemStats };

export class Item {
  public static fromItem(item: Item): Item {
    return new Item(
      item.id,
      item.title,
      new ItemStats(item.stats.passed, item.stats.failed, item.stats.skipped, item.stats.broken)
    );
  }

  @observable
  public id: string;
  @observable
  public title: string;
  @observable
  public stats: ItemStats;

  constructor(id: string, title: string, stats: ItemStats) {
    this.id = id;
    this.title = title;
    this.stats = stats;
  }
}
