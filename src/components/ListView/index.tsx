import * as React from "react";
import { NavLink } from "react-router-dom";
import { Item } from "../../interfaces";
import styled from "../../styled";

const Root = styled("div")({
  padding: [0, 15]
});

const ListViewTitle = styled("h2")({
  fontSize: 18,
  fontWeight: "normal"
});

const ItemStats = styled("span")({
  fontStyle: "italic"
});

const Item = styled(NavLink)({
  "& + &": {
    borderTop: "1px solid #ddd"
  },
  "&:hover": {
    background: "#e0f4ff"
  },
  // tslint:disable-next-line:object-literal-sort-keys
  "&.active-link": {
    background: "#fff59a"
  },
  [`& > ${ItemStats}`]: {
    marginLeft: "auto"
  },
  color: '#333',
  display: "flex",
  fontSize: 14,
  padding: [5, 10],
  textDecoration: "none"
});

const ListView: React.SFC<{ items: Item[] }> = ({ items }) => {
  return (
    <Root>
      <ListViewTitle>Shown {items.length} items</ListViewTitle>
      {items.map(item => (
        <Item key={item.id} to={`/${item.id}`} activeClassName="active-link">
          <b>{item.title}</b>{" "}
          <ItemStats>
            {item.stats.passed} / {item.stats.failed} / {item.stats.broken} / {item.stats.skipped}
          </ItemStats>
        </Item>
      ))}
    </Root>
  );
};

export default ListView;
