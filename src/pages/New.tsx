import { useRef, useState } from "react";
import dayjs from "dayjs";
import { createDiary } from "../apis";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../data/emotionList";

const New = () => {
  const now = dayjs();
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(now.format("YYYY-MM-DD"));
  const [emotion, setEmotion] = useState<number>(3);
  const [content, setContent] = useState<string>("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleEmotion = (id: number) => {
    setEmotion(id);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = { date, emotion, content };

    if (!content && contentRef.current) {
      contentRef.current.focus();
      return;
    }

    try {
      if (window.confirm("새로운 일기를 작성하시겠습니까?")) {
        await createDiary(newData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText="새 일기쓰기"
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate("/")} />}
      />
      <form onSubmit={handleSubmit}>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              type="date"
              value={date}
              className="input_date"
              onChange={handleDate}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item, index) => (
              <div
                key={item.id}
                className={[
                  "EmotionItem",
                  item.id === emotion
                    ? `EmotionItem_on_${emotion}`
                    : "EmotionItem_off",
                ].join(" ")}
                onClick={() => {
                  handleEmotion(item.id);
                }}
              >
                <img src={item.src} alt="" />
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              placeholder="오늘은 어땠나요"
              value={content}
              onChange={handleContent}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <button
              className="MyButton MyButton_default"
              onClick={() => {
                navigate("/");
              }}
            >
              취소하기
            </button>
            <button type="submit" className="MyButton MyButton_positive">
              작성완료
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default New;
