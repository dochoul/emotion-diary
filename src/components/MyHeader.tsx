import styled from "styled-components";

type Props = {
  headText: string;
  leftChild?: React.ReactElement;
  rightChild?: React.ReactElement;
};

export default function MyHeader({ headText, leftChild, rightChild }: Props) {
  return (
    <Header>
      <LeftChild>{leftChild}</LeftChild>
      <ThisMonth>{headText}</ThisMonth>
      <RightChild>{rightChild}</RightChild>
    </Header>
  );
}

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e2e2;
`;

const ThisMonth = styled.div`
  font-size: 25px;
`;

const LeftChild = styled.div`
  position: absolute;
  left: 0;
`;
const RightChild = styled.div`
  position: absolute;
  right: 0;
`;
