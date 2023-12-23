import { Dayjs } from "dayjs";

export function formatOfYear(date: Dayjs) {
  return date.format("YYYY");
}

export function formatOfMonth(date: Dayjs) {
  return date.format("MM");
}

export function formatOfNow(date: Dayjs) {
  return date.format("YYYY-MM-DD");
}
