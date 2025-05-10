
import { LucideIcon } from "lucide-react";

export interface CultureExample {
  situation: string;
  rightApproach: string;
  wrongApproach: string;
}

export interface CultureResource {
  title: string;
  type: "audio" | "document" | "video";
  description: string;
  url?: string; // Optional URL field for UK-specific resources
  isUKResource?: boolean; // Flag for UK-specific resources
}

export interface CultureQuestion {
  question: string;
  answer: string;
}

export interface CultureModuleContent {
  overview: string;
  keyPoints: string[];
  examples: CultureExample[];
  checklist?: string[];
  resources?: CultureResource[];
  questions?: CultureQuestion[];
}

export interface CultureModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  content: CultureModuleContent;
}
