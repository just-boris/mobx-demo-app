import * as React from "react";
import { Item } from "../../interfaces";
import styled from "../../styled";

const Title = styled("h2")({
  borderBottom: "1px solid #ddd",
  paddingBottom: "3px"
});

const ItemView: React.SFC<{ item: Item }> = ({ item }) => {
  return (
    <div>
      <Title>{item.title}</Title>
      <b>Stats</b>
      <ul>
        <li>Passed: {item.stats.passed}</li>
        <li>Failed: {item.stats.failed}</li>
        <li>Broken: {item.stats.broken}</li>
        <li>Skipped: {item.stats.skipped}</li>
      </ul>
    </div>
  );
};

export default ItemView;
