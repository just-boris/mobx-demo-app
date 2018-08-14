import * as React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { getItems } from "../../data";
import { Item } from "../../interfaces";
import styled from "../../styled";
import ItemEdit from "../ItemEdit";
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

interface IAppState {
  items: Item[];
}

class App extends React.Component<RouteComponentProps<{itemId: string}>, IAppState> {
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
    return (
      <>
        <Route path={`${params.match.url}/view`} render={() => <ItemView item={foundItem} />} />
        <Route
          path={`${params.match.url}/edit`}
          render={() => <ItemEdit item={foundItem} onSubmit={this.onItemSave} />}
        />
      </>
    );
  };

  private onItemSave = (id: string, newItem: Item) => {
    this.setState({
      items: this.state.items.map(item => (item.id === id ? newItem : item))
    });
    this.props.history.push(`/${id}/view`)
  };
}

export default withRouter(App);
