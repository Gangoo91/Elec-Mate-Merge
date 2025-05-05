
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

export type TrainingEvidenceItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  files: string[];
};
