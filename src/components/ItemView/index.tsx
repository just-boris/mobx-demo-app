import * as React from "react";
import { Link } from "react-router-dom";
import { Item } from "../../interfaces";
import styled from "../../styled";
import Panel from "../Panel";

const EditLink = styled(Link)({});

const Title = styled("h2")({
  borderBottom: "1px solid #ddd",
  display: "flex",
  paddingBottom: "3px",
  [`& > ${EditLink}`]: {
    marginLeft: "auto"
  }
});

const ItemView: React.SFC<{ item: Item }> = ({ item }) => {
  return (
    <Panel>
      <Title>
        {item.title} <EditLink to="./edit">Edit</EditLink>
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
