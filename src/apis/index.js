import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://tasteless-bianka-david-kim.koyeb.app/"
    : "http://localhost:9000/";

console.log(process.env.NODE_ENV);

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export async function fetchDiarys() {
  const { data } = await instance.get("books");
  return data.books;
}

export async function fetchDiary(id) {
  const { data } = await instance.get(`books/${id}`);
  return data.book;
}

// interface DiaryProps {
//   "_id": number,
//   "name": string,
//   "author": string,
//   "description": string,
//   "price": number,
//   "available": boolean,
//   "image": string,
//   "today": Date,
//   "emotion": number,
//   "contents": string,
//   "__v": number
// }
