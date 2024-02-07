import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryProps } from "../types/define";
import { fetchDiaryAll } from "../apis";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryItem from "../components/DiaryItem";
import dayjs, { Dayjs } from "dayjs";
import { formatOfMonth, formatOfYear } from "../data/dateFormat";
import Tooltip from "../components/ui/Tooltip";

const Home = () => {
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryProps[]>([]);
  const [sort, setSort] = useState<string>("latest");
  const [emotion, setEmotion] = useState<string>("all");
  const [date, setDate] = useState<Dayjs>(dayjs());

  const year: string = formatOfYear(date); //* 현재 년도
  const month: string = formatOfMonth(date); //* 현재 월

  useEffect(() => {
    const getData = async () => {
      const res = await fetchDiaryAll(year, month, sort, emotion);
      setDiary(res);
    };
    getData();
    //* 새일기쓰기
    const htmlTitle = document.querySelector("title");
    if (htmlTitle instanceof HTMLElement) {
      htmlTitle.innerHTML = "감정일기";
    }
  }, [year, month, sort, emotion]);

  const changeMonth = (monthOffset: number) => {
    setDate(date.add(monthOffset, "month"));
  };

  return (
    <div>
      <MyHeader
        headText={`${year}년 ${month}월`}
        leftChild={
          <Tooltip label="이전 달" position="bottom" fontSize={20}>
            <MyButton text="<" onClick={() => changeMonth(-1)} />
          </Tooltip>
        }
        rightChild={
          <Tooltip label="다음 달" position="bottom" fontSize={20}>
            <MyButton
              text=">"
              onClick={() => {
                changeMonth(1);
              }}
            />
          </Tooltip>
        }
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
