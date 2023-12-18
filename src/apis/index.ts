import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://tasteless-bianka-david-kim.koyeb.app/"
    : "http://localhost:9000/";

const instance = axios.create({
  baseURL: baseURL,
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
  const { data } = await instance.get("books");
  return data.books;
}

export async function fetchDiary(id: number) {
  const response = await instance.get(`books/${id}`);
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
