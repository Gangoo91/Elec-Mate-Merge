
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

export type TimeEntryTotal = {
  hours: number;
  minutes: number;
};

export type TrainingEvidenceItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  files: string[];
};

// Re-export the Certificate type for backward compatibility
export type { Certificate } from "./certificates";
