import React from "react";
import styled from "styled-components";

const ErrorList = styled.ul`
  color: #b85c5c;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Errors = ({ errors }) => {
  return (
    <ErrorList>
      {Object.keys(errors).reduce((acc, errorName, i) => {
        return acc.concat(
          errors[errorName].map((error, j) => {
            return <li key={`${i}${j}`}>{`${errorName} ${error}`}</li>;
          })
        );
        // <li key={error}>{`${error} ${errors[error].join(" ")}`}</li>
      }, [])}
    </ErrorList>
  );
};

export default Errors;
