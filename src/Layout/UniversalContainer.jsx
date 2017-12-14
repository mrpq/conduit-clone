import styled, { css } from "styled-components";

const UniversalContainer = styled.div`
  /* max-width: 960px; */
  margin-left: auto;
  margin-right: auto;
  @media all and (max-width: 991px) {
    max-width: 960px;
  }
  @media all and (max-width: 768px) {
    max-width: 700px;
  }
  @media all and (max-width: 480px) {
    max-width: 400px;
  }
  max-width: 960px;
`;

export default UniversalContainer;
