import cloneDeep from "lodash/cloneDeep";
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
}
interface ItemEditState {
  item?: Item;
}

export default class ItemEdit extends React.Component<ItemEditProps, ItemEditState> {
  public static getDerivedStateFromProps(props: ItemEditProps, state: ItemEditState) {
    if (state.item && state.item.id === props.item.id) {
      return;
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
            <Input type="text" name="title" defaultValue={item.title} />
          </h2>
          <b>Stats</b>
          <p>
            Passed: <input type="number" name="stats.passed" defaultValue={item.stats.passed.toString()} />
          </p>
          <p>
            Failed: <input type="number" name="stats.passed" defaultValue={item.stats.failed.toString()} />
          </p>
          <p>
            Broken: <input type="number" name="stats.passed" defaultValue={item.stats.broken.toString()} />
          </p>
          <p>
            Skipped: <input type="number" name="stats.passed" defaultValue={item.stats.skipped.toString()} />
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

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(new FormData(event.target as HTMLFormElement));
  };
}
