import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { Item } from "../../model";
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

interface IAppProps extends RouteComponentProps<{ itemId: string }> {
  items: Item[];
}

@observer
class App extends React.Component<IAppProps> {
  public render() {
    return (
      <>
        <Layout>
          <ListView items={this.props.items} />
          <Switch>
            <Route path="/:itemId" render={this.renderItem} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </>
    );
  }

  private renderItem = (params: RouteComponentProps<{ itemId: string }>) => {
    const foundItem = this.props.items.find(item => item.id === params.match.params.itemId);
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
    const itemIndex = this.props.items.findIndex(item => item.id === id);
    this.props.items[itemIndex] = newItem;
    this.props.history.push(`/${id}/view`);
  };
}

export default withRouter(App);
