import styled from "styled-components";

export const MainContainer = styled.div`
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
