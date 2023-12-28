import axios from "axios";
import { CreateDiaryProps } from "../types/define";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://tasteless-bianka-david-kim.koyeb.app/"
    : "https://tasteless-bianka-david-kim.koyeb.app/";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

//* 다이어리 모두 가져오기~
export async function fetchDiaryAll(
  year: string,
  month: string,
  sort: string = "latest",
  emotion: string = "all"
) {
  const { data } = await instance.get(
    `books?sort=${sort}&emotion=${emotion}&year=${year}&month=${month}`
  );
  return data.books;
}

//* 다이어리 아이디로 가져오기
export async function fetchDiary(_id: string | undefined) {
  const { data } = await instance.get(`books/${_id}`);
  return data.book;
}

//* 다이어리 삭제하기
export async function deleteDiary(_id: string | undefined) {
  const { data } = await instance.delete(`books/${_id}`);
  return data.message;
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

//* 다이어리 수정하기
export async function editDiary(
  _id: string | undefined,
  { date, emotion, content }: CreateDiaryProps
) {
  const response = await instance.put(`books/${_id}`, {
    date,
    emotion,
    content,
  });
  return response;
}
