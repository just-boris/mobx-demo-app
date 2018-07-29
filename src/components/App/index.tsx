import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { getItems } from "../../data";
import styled from "../../styled";
import ItemView from "../ItemView";
import ListView from "../ListView";

const Layout = styled("div")({
  "& > *": {
    flex: 1,
    overflow: "auto"
  },
  display: "flex",
  height: "100vh"
});

const NoMatchStyled = styled("div")({
  alignSelf: "center",
  fontSize: 18,
  textAlign: "center"
});

function NoMatch() {
  return <NoMatchStyled>Select an item</NoMatchStyled>;
}

class App extends React.Component {
  public state = {
    items: getItems()
  };

  public render() {
    return (
      <>
        <Layout>
          <ListView items={this.state.items} />
          <Switch>
            <Route path="/:itemId" render={this.renderItem} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </>
    );
  }

  private renderItem = (params: RouteComponentProps<{ itemId: string }>) => {
    const foundItem = this.state.items.find(item => item.id === params.match.params.itemId);
    if (!foundItem) {
      return <NoMatch />;
    }
    return <ItemView item={foundItem} />;
  };
}

export default App;
