import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import "normalize.css";
import "./App.css";

import Login from "./Login";
import Home from "./Home/";
import Editor from "./Editor";
import Article from "./Article";

import configureStore, { history } from "./configureStore";

class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:slug" component={Article} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
