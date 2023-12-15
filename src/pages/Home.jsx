import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import DiaryItem from "../components/DiaryItem";
import MyHeader from "../components/MyHeader";
import { fetchDiarys } from "../apis/index";
const Home = () => {
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDiarys();
      console.log(res);
    };

    fetchData();
  }, []);

  const decreseMonth = () => {
    console.log("decreseMonth");
  };

  return (
    <>
      <MyHeader
        headText={new Date().toISOString().slice(0, 10)}
        leftChild={<MyButton text={"<"} onClick={decreseMonth} />}
        rightChild={<MyButton text={">"} />}
      />
      <div className="DiaryList">
        <div className="menu_wrapper">
          <div className="left_col"></div>
          <div className="right_col">
            <MyButton
              type={"positive"}
              text={"새 일기"}
              onClick={() => navigate("/new")}
            />
          </div>
        </div>
        {diaryList.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Home;
