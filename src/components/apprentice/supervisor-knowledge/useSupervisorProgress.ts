import { useState, useCallback } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const PREFIX = 'supervisor-knowledge-';

interface QuizResult {
  score: number;
  total: number;
  date: string;
}

function loadSet(key: string): Set<string> {
  const arr = storageGetJSONSync<string[]>(PREFIX + key, []);
  return new Set(arr);
}

function saveSet(key: string, set: Set<string>) {
  storageSetJSONSync(PREFIX + key, [...set]);
}

function loadArray(key: string): string[] {
  return storageGetJSONSync<string[]>(PREFIX + key, []);
}

function saveArray(key: string, arr: string[]) {
  storageSetJSONSync(PREFIX + key, arr);
}

function loadQuizResult(): QuizResult | null {
  return storageGetJSONSync<QuizResult | null>(PREFIX + 'quiz-result', null);
}

export function useSupervisorProgress() {
  const [readQuestions, setReadQuestions] = useState<Set<string>>(() => loadSet('read'));
  const [bookmarks, setBookmarks] = useState<string[]>(() => loadArray('bookmarks'));
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => loadQuizResult());

  const markRead = useCallback((questionId: string) => {
    setReadQuestions((prev) => {
      if (prev.has(questionId)) return prev;
      const next = new Set(prev);
      next.add(questionId);
      saveSet('read', next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId];
      saveArray('bookmarks', next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (questionId: string) => bookmarks.includes(questionId),
    [bookmarks]
  );

  const isRead = useCallback(
    (questionId: string) => readQuestions.has(questionId),
    [readQuestions]
  );

  const getSectionProgress = useCallback(
    (sectionQuestionIds: string[]) => {
      const read = sectionQuestionIds.filter((id) => readQuestions.has(id)).length;
      return { read, total: sectionQuestionIds.length };
    },
    [readQuestions]
  );

  const getOverallProgress = useCallback(
    (totalQuestions: number) => {
      const read = readQuestions.size;
      return {
        read,
        total: totalQuestions,
        percentage: totalQuestions > 0 ? Math.round((read / totalQuestions) * 100) : 0,
      };
    },
    [readQuestions]
  );

  const saveQuizResult = useCallback((score: number, total: number) => {
    const result: QuizResult = { score, total, date: new Date().toISOString() };
    storageSetJSONSync(PREFIX + 'quiz-result', result);
    setQuizResult(result);
  }, []);

  return {
    readQuestions,
    bookmarks,
    quizResult,
    markRead,
    toggleBookmark,
    isBookmarked,
    isRead,
    getSectionProgress,
    getOverallProgress,
    saveQuizResult,
  };
}

export type SupervisorProgress = ReturnType<typeof useSupervisorProgress>;
