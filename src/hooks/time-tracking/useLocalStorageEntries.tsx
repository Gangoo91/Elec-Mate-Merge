import { TimeEntry } from '@/types/time-tracking';
import { storageGetSync, storageGetJSONSync, storageKeysSync } from '@/utils/storage';

export const useLocalStorageEntries = () => {
  // Load course time entries from storage.
  // storageKeysSync() rather than Object.keys(localStorage): the raw call
  // throws where storage is blocked (Android WebView with site data off), and
  // it returned nothing on native — these entries never loaded there at all.
  const loadCourseEntriesFromLocalStorage = (): TimeEntry[] => {
    const loadedCourseEntries: TimeEntry[] = [];

    storageKeysSync().forEach((key) => {
      if (key.startsWith('course_') && key.endsWith('_todayTime')) {
        const courseName = key.replace('course_', '').replace('_todayTime', '');
        const formattedCourseName = courseName
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const timeValue = parseInt(storageGetSync(key) || '0');
        if (timeValue > 0) {
          loadedCourseEntries.push({
            id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            date: new Date().toISOString().split('T')[0],
            duration: Math.round(timeValue / 60), // convert seconds to minutes
            activity: `Online Learning: ${formattedCourseName}`,
            notes: 'Automatically tracked from the learning portal',
            isAutomatic: true,
          });
        }
      }
    });

    return loadedCourseEntries;
  };

  // Load quiz attempts from storage
  const loadQuizEntriesFromLocalStorage = (): TimeEntry[] => {
    const loadedQuizEntries: TimeEntry[] = [];

    storageKeysSync().forEach((key) => {
      if (key.includes('_quiz_attempts')) {
        const unitCode = key.split('_quiz_attempts')[0].replace('unit_', '');
        const attempts = storageGetJSONSync<any[]>(key, []);

        attempts.forEach((attempt: any, index: number) => {
          loadedQuizEntries.push({
            id: `quiz-${unitCode}-${index}`,
            date: new Date(attempt.date).toISOString().split('T')[0],
            duration: Math.ceil(attempt.timeTaken / 60), // convert seconds to minutes
            activity: `Quiz: Unit ${unitCode}`,
            notes: `Assessment Score: ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage}%)`,
            isAutomatic: true,
            isQuiz: true,
            score: attempt.score,
            totalQuestions: attempt.totalQuestions,
          });
        });
      }
    });

    return loadedQuizEntries;
  };

  return { loadCourseEntriesFromLocalStorage, loadQuizEntriesFromLocalStorage };
};
