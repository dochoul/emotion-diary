import { useEffect, useRef, useState, useContext } from 'react';
import { emotionList } from '../util/emotion';
import { getStringDate } from '../util/date';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';

const DiaryEditor = ({ isEdit, originDiary }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [selectedEmotion, setSelectedEmotion] = useState(3);
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const contentRef = useRef();
  const { onCreate } = useContext(DiaryDispatchContext);

  useEffect(() => {
    console.log(isEdit, originDiary);
    if (isEdit) setSelectedEmotion(originDiary.selectedEmotion);
  }, []);

  const $_clickEmotion = (seletedEmotionId) => {
    setSelectedEmotion(seletedEmotionId);
  };

  const $_onSubmit = () => {
    if (!content) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm('새로운 일기를 작성하시겠습니까?')) {
      onCreate({
        date,
        selectedEmotion,
        content,
      });
    }
    navigate('/');
  };

  return (
    <div className="DiaryEditor">
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={isEdit ? originDiary.date : date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_wrapper">
            {emotionList.map((item) => (
              <div
                key={item.emotion_id}
                className={[
                  'EmotionItem',
                  item.emotion_id === selectedEmotion
                    ? `EmotionItem_on_${selectedEmotion}`
                    : 'EmotionItem_off',
                ].join(' ')}
                onClick={() => $_clickEmotion(item.emotion_id)}
              >
                <img src={item.emotion_img} alt="" />
                <span>{item.emotion_description}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              placeholder="오늘은 어땠나요?"
              value={isEdit ? originDiary.content : content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton
              text={'취소하기'}
              onClick={() => {
                navigate('/');
              }}
            />
            <MyButton text={'작성완료'} type={'positive'} onClick={$_onSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
