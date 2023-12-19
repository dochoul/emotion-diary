export interface DiaryProps {
  readonly _id: string;
  date: string;
  emotion: number;
  content: string;
}

export interface CreateDiaryProps {
  date: string;
  emotion: number;
  content: string;
}
