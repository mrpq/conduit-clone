import styled from "styled-components";
import { COLORS } from "./constatnts";

export const LargeInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem 2rem;
  border: 1px solid ${COLORS.silver};
  border-radius: 0.3rem;
  font-size: 1.25em;
  line-height: 1.25;
  color: ${COLORS.abbey};
`;
export const SmallInput = LargeInput.extend`
  padding: 0.5rem 0.75rem;
  font-size: 1em;
`;
export const Textarea = SmallInput.extend`
  resize: vertical;
`.withComponent("textarea");

export const SubmitButton = styled.button`
  margin-left: auto;
  padding: 0.75rem 1.5rem;
  font-size: 1.25em;
  border-radius: 0.3rem;
  color: ${COLORS.white};
  background-color: ${COLORS.fern};
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.apple};
  }
`;

export const SmallSubmitButton = SubmitButton.extend`
  padding: 0.25rem 0.5rem;
  font-size: 0.875em;
  font-weight: 700;
  border-radius: 0.2rem;
`;
