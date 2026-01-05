import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface LearningMetric {
  category: string;
  progress: number;
  trend: 'up' | 'stable' | 'slow';
  aiInsight: string;
  timeSpent: string;
  performance: 'excellent' | 'good' | 'average' | 'needs-improvement';
  totalMinutes: number;
}

interface OJTAnalytics {
  totalHours: number;
  totalEntries: number;
  thisWeekHours: number;
  lastWeekHours: number;
  weeklyTarget: number;
  completionPercentage: number;
  learningMetrics: LearningMetric[];
  isLoading: boolean;
  error: string | null;
}

// Category mapping for activities
const ACTIVITY_CATEGORIES: Record<string, string> = {
  'Installation Work': 'Practical Skills',
  'Maintenance': 'Practical Skills',
  'Testing': 'Testing & Inspection',
  'Fault Finding': 'Testing & Inspection',
  'Health & Safety Training': 'Health & Safety',
  'Site Induction': 'Health & Safety',
  'Risk Assessment': 'Health & Safety',
  'Theory Study': 'Electrical Theory',
  'College Work': 'Electrical Theory',
  'Regulations Study': 'Regulations',
  'BS 7671': 'Regulations',
  'Documentation': 'Professional Development',
  'Other': 'General'
};

const categorizeActivity = (activity: string): string => {
  const lowerActivity = activity.toLowerCase();
  for (const [key, category] of Object.entries(ACTIVITY_CATEGORIES)) {
    if (lowerActivity.includes(key.toLowerCase())) {
      return category;
    }
  }
  // Default categorization based on keywords
  if (lowerActivity.includes('install') || lowerActivity.includes('wire') || lowerActivity.includes('cable')) {
    return 'Practical Skills';
  }
  if (lowerActivity.includes('test') || lowerActivity.includes('inspect')) {
    return 'Testing & Inspection';
  }
  if (lowerActivity.includes('safe') || lowerActivity.includes('risk')) {
    return 'Health & Safety';
  }
  if (lowerActivity.includes('theory') || lowerActivity.includes('study') || lowerActivity.includes('learn')) {
    return 'Electrical Theory';
  }
  if (lowerActivity.includes('reg') || lowerActivity.includes('7671') || lowerActivity.includes('compliance')) {
    return 'Regulations';
  }
  return 'General';
};

const formatTimeSpent = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const getPerformance = (progress: number): 'excellent' | 'good' | 'average' | 'needs-improvement' => {
  if (progress >= 85) return 'excellent';
  if (progress >= 70) return 'good';
  if (progress >= 50) return 'average';
  return 'needs-improvement';
};

const getTrend = (thisWeek: number, lastWeek: number): 'up' | 'stable' | 'slow' => {
  if (thisWeek > lastWeek * 1.1) return 'up';
  if (thisWeek < lastWeek * 0.9) return 'slow';
  return 'stable';
};

const generateAIInsight = (category: string, progress: number, trend: string): string => {
  const insights: Record<string, Record<string, string>> = {
    'Practical Skills': {
      excellent: 'Strong hands-on development - ready for advanced installations',
      good: 'Good progress - focus on cable management techniques',
      average: 'Solid foundation - increase hands-on practice time',
      'needs-improvement': 'More practical experience needed - seek additional site work'
    },
    'Testing & Inspection': {
      excellent: 'Excellent testing proficiency - consider certification pathways',
      good: 'Good testing skills - practice more complex fault finding',
      average: 'Continue developing test procedures - review test sequences',
      'needs-improvement': 'Focus on testing fundamentals - recommend supervised practice'
    },
    'Health & Safety': {
      excellent: 'Exemplary safety awareness - potential safety champion',
      good: 'Good safety compliance - maintain current standards',
      average: 'Review safety procedures regularly',
      'needs-improvement': 'Safety training priority - complete required modules'
    },
    'Electrical Theory': {
      excellent: 'Strong theoretical foundation - explore advanced topics',
      good: 'Good understanding - practice calculations',
      average: 'Continue theory study - focus on weak areas',
      'needs-improvement': 'Theory needs attention - recommend structured study plan'
    },
    'Regulations': {
      excellent: 'Excellent regulatory knowledge - staying current',
      good: 'Good compliance understanding - review recent amendments',
      average: 'Focus on BS 7671 study - use reference materials',
      'needs-improvement': 'Regulations gap identified - recommend focused study sessions'
    }
  };

  const performance = getPerformance(progress);
  return insights[category]?.[performance] || 'Continue developing skills in this area';
};

export const useOJTAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<OJTAnalytics>({
    totalHours: 0,
    totalEntries: 0,
    thisWeekHours: 0,
    lastWeekHours: 0,
    weeklyTarget: 7.5,
    completionPercentage: 0,
    learningMetrics: [],
    isLoading: true,
    error: null
  });

  const fetchAnalytics = useCallback(async () => {
    if (!user?.id) {
      setAnalytics(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      // Get all time entries for user
      const { data: timeEntries, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      const entries = timeEntries || [];

      // Calculate totals
      const totalMinutes = entries.reduce((sum, e) => sum + (e.duration || 0), 0);
      const totalHours = totalMinutes / 60;

      // Calculate this week and last week hours
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const startOfLastWeek = new Date(startOfWeek);
      startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

      const thisWeekMinutes = entries
        .filter(e => new Date(e.date) >= startOfWeek)
        .reduce((sum, e) => sum + (e.duration || 0), 0);

      const lastWeekMinutes = entries
        .filter(e => {
          const date = new Date(e.date);
          return date >= startOfLastWeek && date < startOfWeek;
        })
        .reduce((sum, e) => sum + (e.duration || 0), 0);

      // Group by category and calculate metrics
      const categoryMap = new Map<string, { totalMinutes: number; thisWeek: number; lastWeek: number; count: number }>();

      entries.forEach(entry => {
        const category = categorizeActivity(entry.activity || 'Other');
        const current = categoryMap.get(category) || { totalMinutes: 0, thisWeek: 0, lastWeek: 0, count: 0 };
        const entryDate = new Date(entry.date);

        current.totalMinutes += entry.duration || 0;
        current.count += 1;

        if (entryDate >= startOfWeek) {
          current.thisWeek += entry.duration || 0;
        } else if (entryDate >= startOfLastWeek && entryDate < startOfWeek) {
          current.lastWeek += entry.duration || 0;
        }

        categoryMap.set(category, current);
      });

      // Create learning metrics with realistic progress calculation
      const targetHours = 200; // Target hours per category for completion
      const learningMetrics: LearningMetric[] = Array.from(categoryMap.entries())
        .map(([category, data]) => {
          const progress = Math.min(Math.round((data.totalMinutes / 60 / targetHours) * 100), 100);
          const trend = getTrend(data.thisWeek, data.lastWeek);
          const performance = getPerformance(progress);

          return {
            category,
            progress,
            trend,
            aiInsight: generateAIInsight(category, progress, trend),
            timeSpent: formatTimeSpent(data.totalMinutes),
            performance,
            totalMinutes: data.totalMinutes
          };
        })
        .sort((a, b) => b.totalMinutes - a.totalMinutes)
        .slice(0, 5);

      // Calculate overall completion (based on 1000 total OJT hours target)
      const totalTargetHours = 1000;
      const completionPercentage = Math.min(Math.round((totalHours / totalTargetHours) * 100), 100);

      setAnalytics({
        totalHours: Math.round(totalHours * 10) / 10,
        totalEntries: entries.length,
        thisWeekHours: Math.round((thisWeekMinutes / 60) * 10) / 10,
        lastWeekHours: Math.round((lastWeekMinutes / 60) * 10) / 10,
        weeklyTarget: 7.5,
        completionPercentage,
        learningMetrics,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      console.error('Error fetching OJT analytics:', error);
      setAnalytics(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to load analytics'
      }));
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    ...analytics,
    refresh: fetchAnalytics
  };
};

export default useOJTAnalytics;
