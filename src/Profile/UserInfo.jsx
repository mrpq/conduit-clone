import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { UniversalContainer } from "../Layout/";
import { followProfile } from "../actions/";
import { getIsCurrProfileFetching } from "../reducers/";

const InfoContainer = styled.div`
  background-color: #f3f3f3;
  padding: 32px 0 16px 0;
  text-align: center;
`;
const Avatar = styled.img`
margin-bottom: 16px
width: 100px;
height: 100px;
border-radius: 50%;
`;
const Username = styled.h4`
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: bold;
`;
const ButtonDiv = styled.div`
  text-align: right;
`;
const Button = styled.button`
  padding: 4px 8px;
  font-size: 14px;
  color: #999;
  border: 1px solid #999;
  border-radius: 3px;
  background-color: ${props => (props.following ? "#fff" : "#f3f3f3")};
  cursor: ${props => (props.disabled ? "wait" : "pointer")};
`;
const FollowButton = ({ onButtonClick, children, disabled }) => {
  return (
    <ButtonDiv>
      <Button disabled={disabled} onClick={onButtonClick}>
        {children}
      </Button>
    </ButtonDiv>
  );
};

let FollowBlock = ({ profile, dispatch, isFetching }) => {
  const { username, following } = profile;
  const self = JSON.parse(localStorage.getItem("user"));
  if (self && self.username === username) {
    return (
      <FollowButton onButtonClick={() => dispatch(push("/settings"))}>
        Edit profile settings
      </FollowButton>
    );
  }
  return (
    <FollowButton
      disabled={isFetching}
      onButtonClick={() => {
        dispatch(followProfile(username, !following));
      }}
    >
      {following ? "Unollow" : "Follow"} {username}
    </FollowButton>
  );
};
const mapStateToProps = state => {
  return {
    isFetching: getIsCurrProfileFetching(state)
  };
};
FollowBlock = connect(mapStateToProps)(FollowBlock);

class UserInfo extends Component {
  render() {
    const { profile } = this.props;
    if (isEmpty(profile)) return null;
    return (
      <InfoContainer>
        <UniversalContainer>
          <Avatar
            src={
              profile.image ||
              "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
          />
          <Username>{profile.username}</Username>
          <FollowBlock profile={profile} />
        </UniversalContainer>
      </InfoContainer>
    );
  }
}

export default UserInfo;
