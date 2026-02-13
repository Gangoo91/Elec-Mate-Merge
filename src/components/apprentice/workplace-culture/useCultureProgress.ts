import { useState, useCallback } from 'react';

const PREFIX = 'workplace-culture-';

interface QuizResult {
  score: number;
  total: number;
  date: string;
}

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(PREFIX + key, JSON.stringify([...set]));
}

function loadArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveArray(key: string, arr: string[]) {
  localStorage.setItem(PREFIX + key, JSON.stringify(arr));
}

function loadQuizResult(): QuizResult | null {
  try {
    const raw = localStorage.getItem(PREFIX + 'quiz-result');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useCultureProgress() {
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
    localStorage.setItem(PREFIX + 'quiz-result', JSON.stringify(result));
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

export type CultureProgress = ReturnType<typeof useCultureProgress>;
