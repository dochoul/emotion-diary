import { useParams } from 'react-router-dom';
import DiaryEditor from '../components/DiaryEditor';
import { DiaryStateContext } from '../App';
import { useContext, useState } from 'react';
import { useEffect } from 'react';

function Edit() {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    const thisDiary = diaryList.find((item) => item.id === parseInt(id));
    if (thisDiary) {
      setData(thisDiary);
    }
  }, [data, id, diaryList]);

  return (
    <div>
      {JSON.stringify(data)}
      {data && <DiaryEditor isEdit={true} originDiary={data} />}
    </div>
  );
}

export default Edit;
