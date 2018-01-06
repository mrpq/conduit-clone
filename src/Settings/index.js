import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import omitBy from "lodash/omitBy";

import Heading from "../Heading/";
import {
  LargeInput,
  SmallInput,
  Textarea,
  SubmitButton
} from "../common/inputs";
import { MainContainer, CenteringContainer } from "../common/containers";
import { updateUser } from "../actions/";
// email, username, password, image, bio
class Settings extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      image: user.image,
      bio: user.bio,
      password: "",
      username: user.username,
      email: user.email
    };
  }

  handleChange = e => {
    const { target: { value, name } } = e;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const user = omitBy(this.state, field => field === "");
    dispatch(updateUser(user));
  };

  render() {
    return (
      <Fragment>
        <Heading />
        <MainContainer>
          <CenteringContainer>
            <form>
              <SmallInput
                type="text"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
                placeholder="URL of profile picture"
              />
              <LargeInput
                type="text"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <Textarea
                name="bio"
                value={this.state.bio}
                onChange={this.handleChange}
                placeholder="Short bio about you"
                rows="8"
              />
              <LargeInput
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <LargeInput
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <div style={{ textAlign: "right" }}>
                <SubmitButton onClick={this.handleSubmit}>
                  Update Settings
                </SubmitButton>
              </div>
            </form>
          </CenteringContainer>
        </MainContainer>
      </Fragment>
    );
  }
}

Settings = connect()(Settings);

export default Settings;
