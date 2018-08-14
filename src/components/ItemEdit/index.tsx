import clone from "lodash/clone";
import cloneDeep from "lodash/cloneDeep";
import setWith from "lodash/setWith";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-jss";
import { Item } from "../../interfaces";
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
interface ItemEditState {
  item?: Item;
}

export default class ItemEdit extends React.Component<ItemEditProps, ItemEditState> {
  public static getDerivedStateFromProps(props: ItemEditProps, state: ItemEditState) {
    if (state.item && state.item.id === props.item.id) {
      return null;
    }
    return {
      item: cloneDeep(props.item)
    };
  }

  public state: ItemEditState = {};

  public render() {
    const { item } = this.state;
    if (!item) {
      return;
    }
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

  private updateItem(name: string, value: any) {
    if (this.state.item) {
      const newItem = setWith(clone(this.state.item), name, value, obj => clone(obj));
      this.setState({
        item: newItem
      });
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
    const { item } = this.state;
    if (item) {
      this.props.onSubmit(item.id, item);
    }
  };
}
