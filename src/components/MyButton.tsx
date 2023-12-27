import styled from "styled-components";

type Props = {
  text: string;
  type: string;
  onClick: () => void;
};

export default function MyButton({ text, type, onClick }: Props) {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <Button className={`MyButton_${btnType}`} onClick={onClick}>
      {text}
    </Button>
  );
}

MyButton.defaultProps = {
  type: "default",
};

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 18px;
  white-space: nowrap;
  font-family: "Nanum Pen Script";
  transition: background-color 0.15s ease-in-out;
  &.MyButton_default {
    background-color: #ececec;
    color: black;
  }
  &.MyButton_default:hover {
    background-color: #c9c9c9;
  }
  &.MyButton_positive {
    background-color: #64c964;
    color: white;
  }
  &.MyButton_positive:hover {
    background-color: #47a147;
  }
  &.MyButton_negative {
    background-color: #fd565f;
    color: white;
  }
  &.MyButton_negative:hover {
    background-color: #de1620;
  }
`;
