import React, { Component } from "react";
import styled from "styled-components";

const ErrorList = styled.ul`
  color: #b85c5c;
  font-weight: 700;
  margin-bottom: 16px;
`;

class Errors extends Component {
  render() {
    const { errors } = this.props;
    return (
      <ErrorList>
        {Object.keys(errors).map((error, i) => (
          <li key={error}>{`${error} ${errors[error].join(" ")}`}</li>
        ))}
      </ErrorList>
    );
  }
}

export default Errors;
