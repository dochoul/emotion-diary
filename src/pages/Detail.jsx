import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import { emotionList } from '../util/emotion';

function Detail() {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (diaryList.length > 1) {
      const thisDiary = diaryList.find((item) => item.id === parseInt(id));
      if (thisDiary) {
        setData(thisDiary);
      } else {
        alert('없는 일기 입니다.');
        navigate('/', { require: true });
      }
    }
  }, [diaryList]);

  const emotion_desc = emotionList.find(
    (emo) => emo.emotion_id === parseInt(data?.selectedEmotion)
  );

  return (
    <div className="DiaryPage">
      <MyHeader
        leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigate('/')} />}
        rightChild={<MyButton text={'수정하기'} />}
        headText={data?.date}
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div className={[`diary_img_wrapper diary_img_wrapper_${data?.selectedEmotion}`]}>
            <img src={`/assets/emotion${data?.selectedEmotion}.png`} alt="" srcSet="" />
            <div className="emotion_descript">{emotion_desc?.emotion_description}</div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data?.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
}

export default Detail;
