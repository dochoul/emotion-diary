import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { createDiary, fetchDiaryAll } from "../apis";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";

const New = () => {
  const now = dayjs();
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(now.format("YYYY-MM-DD"));
  const [emotion, setEmotion] = useState<number>(3);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const res = await fetchDiaryAll();
      console.log(res);
    };
    getData();
  }, []);

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleEmotion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmotion(Number(e.target.value));
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    const newData = { date, emotion, content };
    e.preventDefault();
    try {
      const res = await createDiary(newData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText="새 일기쓰기"
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />}
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
            <div className="EmotionItem EmotionItem_off">
              <label htmlFor="emotion1">
                완전 좋음
                <input
                  id="emotion1"
                  type="radio"
                  value={1}
                  onChange={handleEmotion}
                  checked={emotion === 1}
                />
              </label>
            </div>
            <div className="EmotionItem EmotionItem_off">
              <label htmlFor="emotion2">
                좋음
                <input
                  id="emotion2"
                  type="radio"
                  value={2}
                  onChange={handleEmotion}
                  checked={emotion === 2}
                />
              </label>
            </div>
            <div className="EmotionItem EmotionItem_off">
              <label htmlFor="emotion3">
                그럭저럭
                <input
                  id="emotion3"
                  type="radio"
                  value={3}
                  onChange={handleEmotion}
                  checked={emotion === 3}
                />
              </label>
            </div>
            <div className="EmotionItem EmotionItem_off">
              <label htmlFor="emotion4">
                나쁨
                <input
                  id="emotion4"
                  type="radio"
                  value={4}
                  onChange={handleEmotion}
                  checked={emotion === 4}
                />
              </label>
            </div>
            <div className="EmotionItem EmotionItem_off">
              <label htmlFor="emotion5">
                끔찍함
                <input
                  id="emotion5"
                  type="radio"
                  value={5}
                  onChange={handleEmotion}
                  checked={emotion === 5}
                />
              </label>
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
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
