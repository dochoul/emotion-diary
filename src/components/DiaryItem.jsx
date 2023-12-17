import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

function DiaryItem({ _id, date, emotion, content }) {
  const navigate = useNavigate();
  return (
    <div className="DiaryItem">
      <div
        className={[`emotion_img_wrapper emotion_img_wrapper_${emotion}`]}
        onClick={() => {
          navigate(`/detail/${id}`);
        }}
      >
        <img src={`/assets/emotion${emotion}.png`} alt="" />
      </div>
      <div
        className="info_wrapper"
        onClick={() => {
          navigate(`/detail/${_id}`);
        }}
      >
        <div className="diary_date">{date}</div>
        <div className="diary_content_preview">{content}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton
          text={"수정하기"}
          onClick={() => {
            navigate(`/edit/${_id}`);
          }}
        />
      </div>
    </div>
  );
}

export default DiaryItem;
