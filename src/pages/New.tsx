import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { createDiary, fetchDiaryAll } from "../apis";

const New = () => {
  const now = dayjs();
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
          <div>
            <label htmlFor="emotion1" style={{ marginRight: "10px" }}>
              완전 좋음
              <input
                id="emotion1"
                type="radio"
                value={1}
                onChange={handleEmotion}
                checked={emotion === 1}
              />
            </label>
            <label htmlFor="emotion2" style={{ marginRight: "10px" }}>
              좋음
              <input
                id="emotion2"
                type="radio"
                value={2}
                onChange={handleEmotion}
                checked={emotion === 2}
              />
            </label>
            <label htmlFor="emotion3" style={{ marginRight: "10px" }}>
              그럭저럭
              <input
                id="emotion3"
                type="radio"
                value={3}
                onChange={handleEmotion}
                checked={emotion === 3}
              />
            </label>
            <label htmlFor="emotion4" style={{ marginRight: "10px" }}>
              나쁨
              <input
                id="emotion4"
                type="radio"
                value={4}
                onChange={handleEmotion}
                checked={emotion === 4}
              />
            </label>
            <label htmlFor="emotion5" style={{ marginRight: "10px" }}>
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
        <button type="submit">작성완료</button>
      </form>
    </div>
  );
};

export default New;
