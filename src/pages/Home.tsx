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
  const [sort, setSort] = useState<string>("latest");
  const [emotion, setEmotion] = useState<string>("all");

  useEffect(() => {
    const getData = async () => {
      const res = await fetchDiaryAll();
      setDiary(res);
    };
    getData();
  }, []);

  useEffect(() => {
    const changeDiary = async () => {
      const res = await fetchDiaryAll(sort, emotion);
      setDiary(res);
    };
    changeDiary();
  }, [sort, emotion]);

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
            <select
              className="ControlMenu"
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
            </select>
            <select
              className="ControlMenu"
              onChange={(e) => {
                setEmotion(e.target.value);
              }}
            >
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
      </div>
    </div>
  );
};

export default Home;
