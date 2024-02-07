import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.span`
  position: absolute;
  top: calc(50% - 24px);
  left: calc(50% - 24px);
  width: 48px;
  height: 48px;
  border: 5px solid #64c964;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 0.5s linear infinite;
`;

export default function Loading() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}
