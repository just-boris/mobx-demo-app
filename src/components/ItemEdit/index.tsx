import setWith from "lodash/setWith";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-jss";
import { Item } from "../../model";
import Panel from "../Panel";

function sum(stats: object) {
  return Object.keys(stats)
    .map(key => stats[key])
    .reduce((a, b) => a + b);
}

const Input = styled("input")({
  fontSize: 16,
  padding: [5, 10],
  width: "100%"
});

const ActionBar = styled("div")({
  "& > * + *": {
    marginLeft: 5
  },
  display: "flex",
  justifyContent: "flex-end"
});

interface ItemEditProps {
  item: Item;
  onSubmit: (id: string, item: Item) => void;
}

@observer
export default class ItemEdit extends React.Component<ItemEditProps> {
  @observable
  private editItem: Item | null = null;

  public render() {
    if (!this.editItem) {
      return null;
    }
    const item = this.editItem;
    return (
      <Panel>
        <form onSubmit={this.onSubmit}>
          <h2>
            <Input type="text" name="title" value={item.title} onChange={this.handleTextChange} />
          </h2>
          <b>Stats</b>
          <p>
            Passed:{" "}
            <input
              type="number"
              name="stats.passed"
              value={item.stats.passed.toString()}
              onChange={this.handleNumberChange}
            />
          </p>
          <p>
            Failed:{" "}
            <input
              type="number"
              name="stats.failed"
              value={item.stats.failed.toString()}
              onChange={this.handleNumberChange}
            />
          </p>
          <p>
            Broken:{" "}
            <input
              type="number"
              name="stats.broken"
              value={item.stats.broken.toString()}
              onChange={this.handleNumberChange}
            />
          </p>
          <p>
            Skipped:{" "}
            <input
              type="number"
              name="stats.skipped"
              value={item.stats.skipped.toString()}
              onChange={this.handleNumberChange}
            />
          </p>
          <p>Total: {sum(item.stats)}</p>
          <ActionBar>
            <Link to="view">Cancel</Link>
            <button type="submit">Save</button>
          </ActionBar>
        </form>
      </Panel>
    );
  }

  public componentDidMount() {
    if (!this.editItem || this.editItem.id !== this.props.item.id) {
      this.editItem = Item.fromItem(this.props.item);
    }
  }

  private updateItem(name: string, value: any) {
    if (this.editItem) {
      setWith(this.editItem, name, value);
    }
  }

  private handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.updateItem(name, value);
  };

  private handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numValue: number = +value;
    if (numValue >= 0) {
      this.updateItem(name, numValue);
    }
  };

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (this.editItem) {
      this.props.onSubmit(this.editItem.id, this.editItem);
    }
  };
}
