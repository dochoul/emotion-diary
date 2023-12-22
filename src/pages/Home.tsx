import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryProps } from "../types/define";
import { fetchDiaryAll } from "../apis";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryItem from "../components/DiaryItem";
import dayjs from "dayjs";

const Home = () => {
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryProps[]>([]);
  const [sort, setSort] = useState<string>("latest");
  const [emotion, setEmotion] = useState<string>("all");
  const [currentDate, setCurrentDate] = useState(dayjs());

  const year: string = `${currentDate.format("YYYY")}`;
  const month: string = `${currentDate.format("MM")}`;

  useEffect(() => {
    const getData = async () => {
      const res = await fetchDiaryAll(year, month, sort, emotion);
      setDiary(res);
    };
    getData();
  }, [year, month, sort, emotion]);

  const changeMonth = (monthOffset: number) => {
    setCurrentDate(currentDate.add(monthOffset, "month"));
  };

  return (
    <div>
      <MyHeader
        headText={`${year}년 ${month}월`}
        leftChild={<MyButton text="<" onClick={() => changeMonth(-1)} />}
        rightChild={
          <MyButton
            text=">"
            onClick={() => {
              changeMonth(1);
            }}
          />
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

// useEffect(() => {
//   const changeDiary = async () => {
//     const res = await fetchDiaryAll(sort, emotion, year, month);
//     setDiary(res);
//   };
//   changeDiary();
// }, [sort, emotion, month]);

// import dayjs from "dayjs";

// export function getYearFormat(date:Date) {
//   const noe = dayjs()
//   return date.format("YYYY")
// }
