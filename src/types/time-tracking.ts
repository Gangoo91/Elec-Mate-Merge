
export type TimeEntry = {
  id: string;
  date: string;
  duration: number;
  activity: string;
  notes: string;
  isAutomatic?: boolean;
  isQuiz?: boolean;
  score?: number;
  totalQuestions?: number;
};
