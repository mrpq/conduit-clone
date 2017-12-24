import styled, { css } from "styled-components";

const UniversalContainer = styled.div`
  /* max-width: 960px; */
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  @media all and (min-width: 768px) {
    max-width: 700px;
  }
  @media all and (min-width: 991px) {
    max-width: 960px;
  }
`;

export default UniversalContainer;
