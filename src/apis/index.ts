import axios from "axios";
import { CreateDiaryProps } from "../types/define";

// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://tasteless-bianka-david-kim.koyeb.app/"
//     : "http://localhost:9000/";

const baseURL = "https://tasteless-bianka-david-kim.koyeb.app/";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

//* 다이어리 모두 가져오기
export async function fetchDiaryAll() {
  const { data } = await instance.get("books");
  return data.books;
}

//* 다이어리 아이디로 가져오기
export async function fetchDiary(_id: string | undefined) {
  const response = await instance.get(`books/${_id}`);
  return response;
}

//* 다이어리 삭제하기
export async function deleteDiary(_id: string | undefined) {
  const { data } = await instance.delete(`books/${_id}`);
  return data.message;
}

//* 좋은 감정의 다이러리만
export async function fetchGoodEmtion() {
  const { data } = await instance.get("books/good-emotion");
  return data.books;
}

//* 다이어리 쓰기
export async function createDiary({
  date,
  emotion,
  content,
}: CreateDiaryProps) {
  const response = await instance.post("books", {
    date,
    emotion,
    content,
  });
  return response;
}
