import React, { Component } from "react";
import { connect } from "react-redux";
import Feed from "./Feed";

import { getIsAuthenticated, getUsername } from "../reducers";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalFeed: false
    };
  }

  setGlobalFeed = value => () => {
    this.setState(prevState => {
      return { globalFeed: value };
    });
  };

  renderFeed() {
    if (this.state.globalFeed) {
      return <Feed />;
    }
    const { username } = this.props;
    return <Feed forUser={username} />;
  }

  render() {
    const { isAuthenticated, username } = this.props;
    return (
      <div>
        <ul>
          {isAuthenticated ? (
            <button onClick={this.setGlobalFeed(false)}>Your Feed</button>
          ) : null}
          <button onClick={this.setGlobalFeed(true)}>Global Feed</button>
        </ul>
        <hr />
        {this.renderFeed()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    username: getUsername(state)
  };
};

Articles = connect(mapStateToProps)(Articles);

export default Articles;
