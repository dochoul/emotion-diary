import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDiary } from "../apis";
import { DiaryProps } from "../types/define";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import Loading from "../components/ui/Loading";

const Diary = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryProps>(Object);
  const [date, setDate] = useState<string>("2017-05-31");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //* 가져오기
  useEffect(() => {
    const getData = async () => {
      const res: DiaryProps = await fetchDiary(_id);
      setDiary(res);
      setDate(res.date.slice(0, 10));
      setIsLoading(false);
    };
    getData();
    //* 오늘의기록
    const htmlTitle = document.querySelector("title");
    if (htmlTitle instanceof HTMLElement) {
      htmlTitle.innerHTML = "오늘의 기록";
    }
  }, [_id]);

  const emotionDescription = (emotion: number) => {
    switch (emotion) {
      case 1:
        return "완전 좋음";
      case 2:
        return "좋음";
      case 3:
        return "그럭 저럭";
      case 4:
        return "나쁨";
      case 5:
        return "끔찍함";
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="DiaryPage">
        <MyHeader
          headText={`${date} 기록`}
          leftChild={
            <MyButton text="< 뒤로가기" onClick={() => navigate("/")} />
          }
          rightChild={
            <MyButton
              text="수정하기"
              onClick={() => navigate(`/edit/${diary._id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={`diary_img_wrapper diary_img_wrapper_${diary.emotion}`}
            >
              <img src={`/assets/emotion${diary.emotion}.png`} alt="" />
              <div className="emotion_descript">
                {emotionDescription(diary.emotion)}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              {/* <p>{diary.content}</p> */}
              <p dangerouslySetInnerHTML={{ __html: diary.content }}></p>
            </div>
          </section>
        </article>
      </div>
    </>
  );
};

export default Diary;
