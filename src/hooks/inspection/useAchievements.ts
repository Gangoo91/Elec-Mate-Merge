import { useState, useEffect } from 'react';
import { Achievement, AchievementProgress } from '@/types/achievements';
import { ACHIEVEMENTS } from '@/data/achievements';
import { useQuizResults } from './useQuizResults';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement[]>([]);
  
  const { results, getOverallStats, getPerformanceByCategory } = useQuizResults();

  const checkAchievements = () => {
    if (!results || results.length === 0) return;

    const overallStats = getOverallStats();
    const performanceByCategory = getPerformanceByCategory();
    const newlyUnlocked: Achievement[] = [];

    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.condition.type) {
        case 'total_quizzes':
          const { count, averageScore } = achievement.condition.params;
          if (overallStats.totalQuizzes >= count) {
            if (averageScore) {
              shouldUnlock = overallStats.averageScore >= averageScore;
            } else {
              shouldUnlock = true;
            }
          }
          break;

        case 'perfect_score':
          shouldUnlock = results.some(result => result.percentage >= 100);
          break;

        case 'quiz_completed':
          const { minScore, count: requiredCount, hasRegulation } = achievement.condition.params;
          let qualifyingQuizzes = results.filter(result => result.percentage >= minScore);
          
          if (hasRegulation) {
            // This would need assessment data to check regulation field
            // For now, assume some results have regulation data
            qualifyingQuizzes = qualifyingQuizzes.slice(0, Math.floor(qualifyingQuizzes.length / 2));
          }
          
          shouldUnlock = qualifyingQuizzes.length >= requiredCount;
          break;

        case 'speed':
          const { maxTimeMinutes } = achievement.condition.params;
          const maxTimeMs = maxTimeMinutes * 60 * 1000;
          shouldUnlock = results.some(result => result.time_spent <= maxTimeMs);
          break;

        case 'category_mastery':
          const { 
            category, 
            minScore: categoryMinScore, 
            count: categoryCount, 
            uniqueCategories,
            allCategories 
          } = achievement.condition.params;

          if (uniqueCategories) {
            shouldUnlock = performanceByCategory.length >= uniqueCategories;
          } else if (allCategories) {
            const allCategoryNames = [
              'Visual Inspection', 'Continuity Testing', 'Insulation Resistance',
              'Polarity Testing', 'Earth Fault Loop Impedance', 'RCD Testing',
              'Prospective Fault Current', 'Functional Testing'
            ];
            const qualifyingCategories = performanceByCategory.filter(cat => 
              cat.score >= categoryMinScore
            );
            shouldUnlock = qualifyingCategories.length >= allCategoryNames.length;
          } else if (category) {
            const categoryResults = results.filter(result => 
              result.category_breakdown[category] && 
              (result.category_breakdown[category].correct / result.category_breakdown[category].total) * 100 >= categoryMinScore
            );
            shouldUnlock = categoryResults.length >= (categoryCount || 1);
          }
          break;

        case 'streak':
          const { minScore: streakMinScore, streakLength } = achievement.condition.params;
          // Check for consecutive results meeting the score requirement
          let currentStreak = 0;
          let maxStreak = 0;
          
          const sortedResults = [...results].sort((a, b) => 
            new Date(a.completed_at || 0).getTime() - new Date(b.completed_at || 0).getTime()
          );
          
          for (const result of sortedResults) {
            if (result.percentage >= streakMinScore) {
              currentStreak++;
              maxStreak = Math.max(maxStreak, currentStreak);
            } else {
              currentStreak = 0;
            }
          }
          
          shouldUnlock = maxStreak >= streakLength;
          break;

        case 'difficulty_cleared':
          const { difficulty, minScore: difficultyMinScore, allCategories: allDifficultyCategories } = achievement.condition.params;
          // This would need assessment data to check difficulty
          // For now, simulate based on advanced categories
          if (allDifficultyCategories && difficulty === 'Advanced') {
            const advancedCategories = ['Earth Fault Loop Impedance', 'RCD Testing'];
            const qualifyingResults = performanceByCategory.filter(cat => 
              advancedCategories.includes(cat.subject) && cat.score >= difficultyMinScore
            );
            shouldUnlock = qualifyingResults.length >= advancedCategories.length;
          }
          break;

        case 'regulation_focus':
          const { regulation, averageScore: regAverageScore, totalQuizzes: regTotalQuizzes } = achievement.condition.params;
          // This would need more detailed tracking of regulation-specific quizzes
          // For now, use overall stats as approximation
          shouldUnlock = overallStats.totalQuizzes >= regTotalQuizzes && 
                        overallStats.averageScore >= regAverageScore;
          break;
      }

      if (shouldUnlock && !achievement.unlocked) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
        newlyUnlocked.push(unlockedAchievement);
        return unlockedAchievement;
      }

      return achievement;
    });

    setAchievements(updatedAchievements);
    setUnlockedAchievements(updatedAchievements.filter(a => a.unlocked));
    
    if (newlyUnlocked.length > 0) {
      setRecentlyUnlocked(newlyUnlocked);
      // Clear recently unlocked after 5 seconds
      setTimeout(() => setRecentlyUnlocked([]), 5000);
    }
  };

  const getAchievementProgress = (achievement: Achievement): AchievementProgress | null => {
    if (achievement.unlocked || !results) return null;

    const overallStats = getOverallStats();
    let currentValue = 0;
    let targetValue = 0;

    switch (achievement.condition.type) {
      case 'total_quizzes':
        currentValue = overallStats.totalQuizzes;
        targetValue = achievement.condition.params.count;
        break;
      case 'quiz_completed':
        const { minScore, count } = achievement.condition.params;
        currentValue = results.filter(r => r.percentage >= minScore).length;
        targetValue = count;
        break;
      // Add more progress tracking for other types as needed
    }

    if (targetValue === 0) return null;

    return {
      achievementId: achievement.id,
      currentValue,
      targetValue,
      percentage: Math.min((currentValue / targetValue) * 100, 100)
    };
  };

  const getAchievementsByCategory = (category: Achievement['category']) => {
    return achievements.filter(a => a.category === category);
  };

  const getAchievementStats = () => {
    const totalAchievements = achievements.length;
    const unlockedCount = unlockedAchievements.length;
    const progressPercentage = (unlockedCount / totalAchievements) * 100;

    return {
      totalAchievements,
      unlockedCount,
      progressPercentage,
      remainingCount: totalAchievements - unlockedCount
    };
  };

  useEffect(() => {
    checkAchievements();
  }, [results]);

  return {
    achievements,
    unlockedAchievements,
    recentlyUnlocked,
    getAchievementProgress,
    getAchievementsByCategory,
    getAchievementStats,
    checkAchievements
  };
};