export interface ItemStats {
  passed: number;
  failed: number;
  skipped: number;
  broken: number;
}

export interface Item {
  id: string;
  title: string;
  stats: ItemStats;
}
