import * as React from "react";
import { Link } from "react-router-dom";
import { Item } from "../../interfaces";
import styled from "../../styled";
import Panel from "../Panel";

const Title = styled("h2")({
  borderBottom: "1px solid #ddd",
  display: "flex",
  paddingBottom: "3px"
});

const ItemView: React.SFC<{ item: Item }> = ({ item }) => {
  return (
    <Panel>
      <Title>
        {item.title} <Link to="./edit">Edit</Link>
      </Title>
      <b>Stats</b>
      <ul>
        <li>Passed: {item.stats.passed}</li>
        <li>Failed: {item.stats.failed}</li>
        <li>Broken: {item.stats.broken}</li>
        <li>Skipped: {item.stats.skipped}</li>
      </ul>
    </Panel>
  );
};

export default ItemView;
