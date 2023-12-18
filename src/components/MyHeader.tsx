import React from "react";

type Props = {
  headText: string;
  leftChild?: React.ReactElement;
  rightChild?: React.ReactElement;
};

export default function MyHeader({ headText, leftChild, rightChild }: Props) {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
}
