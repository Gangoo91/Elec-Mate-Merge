import { questionsPart1 } from "./questions-part1";
import { questionsPart2 } from "./questions-part2";
import type { StandardMockQuestion } from "@/types/standardMockExam";

export const functionalSkillsQuestionBank: StandardMockQuestion[] = [
  ...questionsPart1,
  ...questionsPart2,
];
