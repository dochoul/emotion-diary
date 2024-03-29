import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { deleteDiary, editDiary, fetchDiary } from "../apis";
import { useEffect, useRef, useState } from "react";
import { DiaryProps } from "../types/define";
import { emotionList } from "../data/emotionList";
import dayjs from "dayjs";
import { formatOfNow } from "../data/dateFormat";
import Loading from "../components/ui/Loading";

const Edit = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [date, setDate] = useState<string>(formatOfNow(dayjs()));
  const [emotion, setEmotion] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //* 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        const res: DiaryProps = await fetchDiary(_id);
        setDate(res.date.slice(0, 10));
        setEmotion(res.emotion);
        setContent(res.content);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    };
    getData();
    //* 타이틀 설정하기
    const htmlTitle = document.querySelector("title");
    if (htmlTitle instanceof HTMLElement) {
      htmlTitle.innerHTML = "수정하기";
    }
  }, [_id]);

  const 삭제하기 = async () => {
    try {
      if (window.confirm("일기를 수정하시겠습니까?")) {
        await deleteDiary(_id);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      if (window.confirm("일기를 수정하시겠습니까?")) {
        await editDiary(_id, newData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="DiaryEditor">
        <MyHeader
          headText="일기 수정하기"
          leftChild={
            <MyButton text="< 뒤로가기" onClick={() => navigate("/")} />
          }
          rightChild={
            <MyButton
              text="삭제하기"
              type="negative"
              onClick={() => {
                삭제하기();
              }}
            />
          }
        />
        <form onSubmit={handleSubmit}>
          <section>
            <h4>오늘은 언제인가요?</h4>
            <div className="input_box">
              <input
                type="date"
                className="input_date"
                value={date}
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
              <MyButton
                text="취소하기"
                onClick={() => {
                  navigate("/");
                }}
              />
              <MyButton text="작성완료" type="positive" onClick={() => {}} />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Edit;
