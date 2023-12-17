import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";
import { fetchDiary } from "../apis";

function Detail() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDiary(_id);
      setDiary(res);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (diaryList.length > 1) {
  //     const thisDiary = diaryList.find((item) => item.id === parseInt(_id));
  //     if (thisDiary) {
  //       setData(thisDiary);
  //     } else {
  //       alert("없는 일기 입니다.");
  //       navigate("/", { require: true });
  //     }
  //   }
  // }, [diaryList]);

  const emotion_desc = emotionList.find(
    (emo) => emo.emotion_id === parseInt(diary?.emotion)
  );

  return (
    <div className="DiaryPage">
      <MyHeader
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate("/")} />
        }
        rightChild={<MyButton text={"수정하기"} />}
        headText={diary?.date}
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={[
              `diary_img_wrapper diary_img_wrapper_${diary?.emotion}`,
            ]}
          >
            <img
              src={`/assets/emotion${diary?.emotion}.png`}
              alt=""
              srcSet=""
            />
            <div className="emotion_descript">
              {emotion_desc?.emotion_description}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{diary?.contents}</p>
          </div>
        </section>
      </article>
    </div>
  );
}

export default Detail;
