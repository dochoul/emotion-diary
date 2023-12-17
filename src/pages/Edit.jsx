import { useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryStateContext } from "../App";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { fetchDiary } from "../apis";

function Edit() {
  const { _id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [diary, setDiary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDiary(_id);
      setDiary(res);
    };
    fetchData();
  }, []);

  return (
    <div>
      {JSON.stringify(diary)}
      {diary && <DiaryEditor isEdit={true} originDiary={diary} />}
    </div>
  );
}

export default Edit;
