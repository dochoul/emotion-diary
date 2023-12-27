import styled from "styled-components";

type Props = {
  headText: string;
  leftChild?: React.ReactElement;
  rightChild?: React.ReactElement;
};

export default function MyHeader({ headText, leftChild, rightChild }: Props) {
  return (
    <Header>
      <div>{leftChild}</div>
      <ThisMonth>{headText}</ThisMonth>
      <div>{rightChild}</div>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e2e2;
  > div {
    display: flex;
  }
`;

const ThisMonth = styled.div`
  display: flex;
  font-size: 25px;
`;
