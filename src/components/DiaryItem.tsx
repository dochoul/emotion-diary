import { useNavigate } from "react-router-dom";
import { DiaryProps } from "../types/define";
import MyButton from "./MyButton";

const DiaryItem = ({ diary }: { diary: DiaryProps }) => {
  const navigate = useNavigate();
  return (
    <div className="DiaryItem">
      <div
        className={`emotion_img_wrapper emotion_img_wrapper_${diary.emotion}`}
      >
        <img src={`assets/emotion${diary.emotion}.png`} alt="" />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">{diary.date}</div>
        <div className="diary_content_preview">{diary.content}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton
          text="수정하기"
          onClick={() => {
            navigate(`/edit/${diary._id}`);
          }}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
