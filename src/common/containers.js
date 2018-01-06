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

export const CenteringContainer = styled.div`
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  @media all and (min-width: 991px) {
    max-width: 65%;
  }
`;

export const TwoColumnsContainer = styled.div`
  display: flex;
`;

export const LeftColumn = styled.div`
  margin-top: 1em;
  flex-grow: 1;
`;

export const RightColumn = styled.div`
  margin-top: 1em;
  min-width: 200px;
  max-width: 300px;
  margin-left: 35px;
`;
