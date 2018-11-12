import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { getItems } from "./data";

ReactDOM.render(
  <BrowserRouter>
    <App items={getItems()} />
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
);
