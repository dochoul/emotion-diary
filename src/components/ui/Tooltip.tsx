import { ReactNode } from "react";
import "./tooltip.scss";
import { MakeCaret } from "./MakeCaret";

interface Props {
  label: string;
  position?: string;
  color?: string;
  fontSize?: string | number;
  background?: string;
  offset?: number;
  children: ReactNode;
}

export default function Tooltip({
  label = "",
  position = "top",
  color = "#fff",
  fontSize = "14",
  background = "#585858",
  offset = 10,
  children,
}: Props) {
  const makeTT = (
    event: React.MouseEvent<HTMLSpanElement> | React.FocusEvent<HTMLSpanElement>
  ) => {
    const ttBtn = event.currentTarget;

    //* 툴팁 Division 생성
    const tt = document.createElement("div");
    tt.classList.add("gt-tooltip");
    tt.innerHTML = label;
    if (document.querySelector(".gt-tooltip")) {
      document.body.removeChild(document.querySelector(".gt-tooltip")!);
    }

    //* 툴팁 Append
    document.body.appendChild(tt);
    tt.classList.add("gt-tooltip-show"); //* 애니메이션을 위한 class name

    //* Caret(꼬다리) Division 생성하고 툴팁에 자식으로 붙인다.
    const caret = MakeCaret("gt-tooltip-caret", position, background);
    tt.appendChild(caret);

    //* 옵션 초기화
    tt.style.color = color; //* 툴팁 폰트 컬러 변경
    tt.style.background = background; //* 툴팁 배경 컬러 변경
    tt.style.fontSize = `${fontSize}px`; //* 툴팁 폰트 크기 변경

    // 툴팁 위치 설정
    setPosition(ttBtn, tt, caret);
  };

  /* 방향에 따라 툴팁 위치 변경 */
  const setPosition = (
    ttBtn: HTMLElement,
    tt: HTMLDivElement,
    caret: HTMLDivElement
  ) => {
    let ttBtnW;
    let ttBtnH;
    let ttBtnL;
    let ttBtnT;
    let ttW;
    let ttH;
    let caretW;
    let caretH;

    // 툴팁 요소: 너비, 높이, 좌표
    ttBtnW = Math.ceil(ttBtn.offsetWidth);
    ttBtnH = Math.ceil(ttBtn.offsetHeight);
    ttBtnL = Math.ceil(ttBtn.getBoundingClientRect().left);
    ttBtnT = Math.ceil(window.pageYOffset + ttBtn.getBoundingClientRect().top);
    ttW = Math.ceil(tt.offsetWidth);
    ttH = Math.ceil(tt.offsetHeight);
    caretW = Math.ceil(caret.offsetWidth);
    caretH = Math.ceil(caret.offsetHeight);

    // 방향에 따른 툴팁 위치 조정
    switch (position) {
      //* 완쪽 방향 툴팁들
      case "left":
        tt.style.left = ttBtnL - ttW - offset + "px";
        tt.style.top = ttBtnT + (ttBtnH - ttH) / 2 + "px";
        caret.style.left = ttW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-right"); // The transform-origin CSS property sets the origin for an element's transformations.(https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
        break;

      case "left-start":
        tt.style.left = ttBtnL - ttW - offset + "px";
        tt.style.top = ttBtnT + "px";
        caret.style.left = ttW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-right");
        break;

      case "left-end":
        tt.style.left = ttBtnL - ttW - offset + "px";
        tt.style.top = ttBtnT + (ttBtnH - ttH) + "px";
        caret.style.left = ttW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-right");
        break;
      //* (END)완쪽 방향 툴팁들

      //* 오른쪽 방향 툴팁들
      case "right":
        tt.style.left = ttBtnL + ttBtnW + offset + "px";
        tt.style.top = ttBtnT + (ttBtnH - ttH) / 2 + "px";
        caret.style.left = -caretW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-left");
        break;

      case "right-start":
        tt.style.left = ttBtnL + ttBtnW + offset + "px";
        tt.style.top = ttBtnT + "px";
        caret.style.left = -caretW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-left");
        break;

      case "right-end":
        tt.style.left = ttBtnL + ttBtnW + offset + "px";
        tt.style.top = ttBtnT + (ttBtnH - ttH) + "px";
        caret.style.left = -caretW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-left");
        break;

      //* 아래쪽 방향 툴팁들
      case "bottom":
        tt.style.left = ttBtnL + (ttBtnW - ttW) / 2 + "px";
        tt.style.top = ttBtnT + ttBtnH + offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = -caretH + "px";
        tt.classList.add("gt-transform-origin-top-center");
        break;

      case "bottom-start":
        tt.style.left = ttBtnL + "px";
        tt.style.top = ttBtnT + ttBtnH + offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = -caretH + "px";
        tt.classList.add("gt-transform-origin-top-center");
        break;

      case "bottom-end":
        tt.style.left = ttBtnL + Math.abs(ttBtnW - ttW) + "px";
        tt.style.top = ttBtnT + ttBtnH + offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = -caretH + "px";
        tt.classList.add("gt-transform-origin-top-center");
        break;
      //* (END)아래쪽 방향 툴팁들

      //* 위쪽 방향 툴팁들
      case "top":
        tt.style.left = ttBtnL + (ttBtnW - ttW) / 2 + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = `${ttH - 0.5}px`;
        tt.classList.add("gt-transform-origin-bottom-center");
        break;

      case "top-start":
        tt.style.left = ttBtnL + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = `${ttH - 0.5}px`;
        tt.classList.add("gt-transform-origin-bottom-center");
        break;

      case "top-end":
        tt.style.left = ttBtnL + Math.abs(ttBtnW - ttW) + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = `${ttH - 0.5}px`;
        tt.classList.add("gt-transform-origin-bottom-center");
        break;
      //* (END)위쪽 방향 툴팁들

      default:
        tt.style.left = ttBtnL + (ttBtnW - ttW) / 2 + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = ttH + "px";
        tt.classList.add("gt-transform-origin-bottom-center");
        break;
    }
  };

  //* 툴팁 삭제 *//
  const removeTT = () => {
    if (document.querySelector(".gt-tooltip")) {
      let tt: HTMLDivElement = document.body.querySelector(".gt-tooltip")!;
      tt.classList.add("gt-tooltip-hide");
      tt.addEventListener("animationend", () => {
        document.body.removeChild(document.body.querySelector(".gt-tooltip")!);
      });
    }
  };

  return (
    <span
      style={{ display: "inline-flex", cursor: "pointer" }}
      onMouseOver={makeTT}
      onMouseLeave={removeTT}
    >
      {children}
    </span>
  );
}
