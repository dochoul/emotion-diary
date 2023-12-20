import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDiary } from "../apis";
import { DiaryProps } from "../types/define";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryProps>(Object);

  useEffect(() => {
    const getData = async () => {
      const res: DiaryProps = await fetchDiary(_id);
      console.log(res);
      setDiary(res);
    };
    getData();
  }, [_id]);

  return (
    <div className="DiaryPage">
      <MyHeader
        headText={`${diary?.date}기록`}
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate("/")} />}
        rightChild={<MyButton text="수정하기" onClick={() => navigate("/")} />}
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={`diary_img_wrapper diary_img_wrapper_${diary.emotion}`}
          >
            <img src={`/assets/emotion${diary.emotion}.png`} alt="" />
            <div className="emotion_descript">그럭저럭</div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{diary.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Diary;
