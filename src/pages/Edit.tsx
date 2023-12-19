import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { deleteDiary } from "../apis";

const Edit = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const 삭제하기 = async () => {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await deleteDiary(_id);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <MyHeader
        headText="일기 수정하기"
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate("/")} />}
        rightChild={
          <MyButton
            text="삭제하기"
            type="negative"
            onClick={() => {
              삭제하기();
            }}
          />
        }
      />
    </div>
  );
};

export default Edit;
