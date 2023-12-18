type Props = {
  text: string;
  type: string;
  onClick: () => void;
};

export default function MyButton({ text, type, onClick }: Props) {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button className={`MyButton MyButton_${btnType}`} onClick={onClick}>
      {text}
    </button>
  );
}

MyButton.defaultProps = {
  type: "default",
};
