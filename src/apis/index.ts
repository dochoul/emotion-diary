import axios from "axios";

const instance = axios.create({
  baseURL: "https://tasteless-bianka-david-kim.koyeb.app/",
  headers: {
    "Content-type": "application/json",
  },
});

// interface PostProps {
//   _id: string;
//   content: string;
//   createdAt: string;
//   date: string;
//   updatedAt: string;
// }

export async function fetchDiaryAll() {
  const response = await instance.get("books");
  return response;
}

export async function fetchPost(id: number) {
  const response = await instance.get(`posts/${id}`);
  return response;
}

interface CreateDiaryProps {
  date: string;
  emotion: number;
  content: string;
}
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
