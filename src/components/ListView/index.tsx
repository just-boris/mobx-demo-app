import * as React from "react";
import { Link, LinkProps, Route } from "react-router-dom";
import { Item } from "../../interfaces";
import styled from "../../styled";
import Panel from "../Panel";

const ListViewTitle = styled("h2")({
  fontSize: 18,
  fontWeight: "normal"
});

const ItemStats = styled("span")({
  fontStyle: "italic"
});

const ItemLink: React.SFC<{ id: string }> = ({ id, children }) => {
  return (
    <Route
      path="/:itemId"
      children={({ match }) => {
        return (
          <ItemLinkStyled to={`/${id}/view`} active={match.params.itemId === id}>
            {children}
          </ItemLinkStyled>
        );
      }}
    />
  );
};

interface ItemLinkStyledProps extends LinkProps {
  active: boolean;
}

const ItemLinkStyled = styled<LinkProps, ItemLinkStyledProps>(Link)({
  "& + &": {
    borderTop: "1px solid #ddd"
  },
  "&:hover": {
    background: "#e0f4ff"
  },
  [`& > ${ItemStats}`]: {
    marginLeft: "auto"
  },
  background: (props: ItemLinkStyledProps) => props.active && "#fff59a",
  color: "#333",
  display: "flex",
  fontSize: 14,
  padding: [5, 10],
  textDecoration: "none"
});

const ListView: React.SFC<{ items: Item[] }> = ({ items }) => {
  return (
    <Panel>
      <ListViewTitle>Shown {items.length} items</ListViewTitle>
      {items.map(item => (
        <ItemLink key={item.id} id={item.id}>
          <b>{item.title}</b>{" "}
          <ItemStats>
            {item.stats.passed} / {item.stats.failed} / {item.stats.broken} / {item.stats.skipped}
          </ItemStats>
        </ItemLink>
      ))}
    </Panel>
  );
};

export default ListView;
