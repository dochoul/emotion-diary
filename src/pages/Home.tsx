import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryProps } from "../types/define";
import { fetchDiaryAll } from "../apis";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryItem from "../components/DiaryItem";
import dayjs from "dayjs";

const Home = () => {
  const now = dayjs();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchDiaryAll();
      console.log(res);
      setDiary(res);
    };
    getData();
  }, []);

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
        {diary.map((item) => (
          <DiaryItem diary={item} key={item._id} />
        ))}
        <div className="DiaryItem"></div>
      </div>
    </div>
  );
};

export default Home;
