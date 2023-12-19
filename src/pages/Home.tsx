import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import dayjs from "dayjs";

const Home = () => {
  const now = dayjs();
  const navigate = useNavigate();
  return (
    <div>
      <MyHeader
        headText={`${now.format("YYYY")}년 ${now.format("MM")}월`}
        leftChild={<MyButton text="<" onClick={() => navigate("/")} />}
        rightChild={<MyButton text=">" onClick={() => navigate("/")} />}
      />
      <div className="DiaryList">
        <div className="menu_wrapper">
          <div className="left_col">
            <select className="ControlMenu">
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
            </select>
            <select className="ControlMenu">
              <option value="all">전부다</option>
              <option value="good">좋은 감정만</option>
              <option value="bad">안좋은 감정만</option>
            </select>
          </div>
          <div className="right_col">
            <MyButton
              text="새 일기쓰기"
              type="positive"
              onClick={() => {
                navigate("/new");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
