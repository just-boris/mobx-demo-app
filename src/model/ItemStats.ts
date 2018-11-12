import { observable } from "mobx";

export default class ItemStats {
  @observable
  public passed: number;
  @observable
  public failed: number;
  @observable
  public skipped: number;
  @observable
  public broken: number;

  constructor(passed: number, failed: number, skipped: number, broken: number) {
    this.passed = passed;
    this.failed = failed;
    this.skipped = skipped;
    this.broken = broken;
  }
}
