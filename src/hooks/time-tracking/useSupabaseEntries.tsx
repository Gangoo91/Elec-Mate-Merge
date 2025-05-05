
import { useState, useEffect } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseEntries = (userId: string | null) => {
  // Fetch manual entries from Supabase
  const fetchManualEntries = async (): Promise<TimeEntry[]> => {
    if (!userId) return [];
    
    try {
      const { data: manualData, error: manualError } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', userId)
        .eq('is_automatic', false)
        .order('date', { ascending: false });
          
      if (!manualError && manualData) {
        return (manualData as any[]).map((entry: any) => ({
          id: entry.id,
          date: entry.date,
          duration: entry.duration,
          activity: entry.activity,
          notes: entry.notes,
          isAutomatic: entry.is_automatic
        }));
      }
    } catch (e) {
      console.error("Error fetching manual entries:", e);
    }
    
    return [];
  };
  
  // Fetch study session entries from Supabase
  const fetchStudyEntries = async (): Promise<TimeEntry[]> => {
    if (!userId) return [];
    
    try {
      const { data: studyData, error: studyError } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
          
      if (!studyError && studyData) {
        return (studyData as any[]).map((entry: any) => ({
          id: entry.id,
          date: new Date(entry.created_at).toISOString().split('T')[0],
          duration: Math.ceil(entry.duration / 60), // convert seconds to minutes
          activity: entry.activity,
          notes: entry.notes || "Automatically tracked from the learning portal",
          isAutomatic: true
        }));
      }
    } catch (e) {
      console.error("Error fetching study sessions:", e);
    }
    
    return [];
  };
  
  // Fetch quiz entries from Supabase
  const fetchQuizEntries = async (): Promise<TimeEntry[]> => {
    if (!userId) return [];
    
    try {
      const { data: quizData, error: quizError } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
          
      if (!quizError && quizData) {
        return (quizData as any[]).map((entry: any) => ({
          id: entry.id,
          date: new Date(entry.created_at).toISOString().split('T')[0],
          duration: Math.ceil(entry.time_taken / 60), // convert seconds to minutes
          activity: `Quiz: Unit ${entry.unit_code}`,
          notes: `Assessment Score: ${entry.score}/${entry.total_questions} (${entry.percentage}%)`,
          isAutomatic: true,
          isQuiz: true,
          score: entry.score,
          totalQuestions: entry.total_questions
        }));
      }
    } catch (e) {
      console.error("Error fetching quiz attempts:", e);
    }
    
    return [];
  };

  return {
    fetchManualEntries,
    fetchStudyEntries,
    fetchQuizEntries
  };
};
