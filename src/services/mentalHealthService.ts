import { supabase } from "@/integrations/supabase/client";

// Types
export interface MoodEntry {
  id?: string;
  user_id?: string;
  date: string;
  mood: number;
  notes?: string;
  factors?: string[];
}

export interface JournalEntry {
  id?: string;
  user_id?: string;
  date: string;
  time: string;
  mood: number;
  mood_label?: string;
  content?: string;
  gratitude?: string[];
  triggers?: string[];
  tags?: string[];
  prompt?: string;
}

export interface SleepEntry {
  id?: string;
  user_id?: string;
  date: string;
  bed_time: string;
  wake_time: string;
  hours: number;
  quality: number;
  notes?: string[];
}

export interface SafetyPlan {
  id?: string;
  user_id?: string;
  warning_signs: string[];
  coping_strategies: string[];
  distractions: string[];
  support_people: { name: string; phone: string }[];
  professionals: { name: string; phone: string; role: string }[];
  safe_environment: string[];
  reasons_for_living: string[];
}

export interface GroundingProgress {
  id?: string;
  user_id?: string;
  date: string;
  exercises_completed: string[];
}

// =====================================================
// MOOD ENTRIES
// =====================================================
export const moodService = {
  async getAll(): Promise<MoodEntry[]> {
    const { data, error } = await supabase
      .from('mental_health_mood_entries')
      .select('*')
      .order('date', { ascending: false })
      .limit(90);

    if (error) throw error;
    return data || [];
  },

  async upsert(entry: MoodEntry): Promise<MoodEntry> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('mental_health_mood_entries')
      .upsert({
        user_id: user.id,
        date: entry.date,
        mood: entry.mood,
        notes: entry.notes,
        factors: entry.factors || []
      }, { onConflict: 'user_id,date' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(date: string): Promise<void> {
    const { error } = await supabase
      .from('mental_health_mood_entries')
      .delete()
      .eq('date', date);

    if (error) throw error;
  }
};

// =====================================================
// JOURNAL ENTRIES
// =====================================================
export const journalService = {
  async getAll(): Promise<JournalEntry[]> {
    const { data, error } = await supabase
      .from('mental_health_journal_entries')
      .select('*')
      .order('date', { ascending: false })
      .order('time', { ascending: false })
      .limit(100);

    if (error) {
      console.error('[journalService.getAll] Error:', error);
      throw error;
    }
    return data || [];
  },

  async create(entry: JournalEntry): Promise<JournalEntry> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('[journalService.create] Auth error:', authError);
      throw new Error(`Authentication failed: ${authError.message}`);
    }

    if (!user) {
      console.error('[journalService.create] No user found');
      throw new Error('Not authenticated');
    }

    console.log('[journalService.create] Creating entry for user:', user.id);
    console.log('[journalService.create] Entry data:', { date: entry.date, time: entry.time, mood: entry.mood });

    const { data, error } = await supabase
      .from('mental_health_journal_entries')
      .insert({
        user_id: user.id,
        date: entry.date,
        time: entry.time,
        mood: entry.mood,
        mood_label: entry.mood_label,
        content: entry.content,
        gratitude: entry.gratitude || [],
        triggers: entry.triggers || [],
        tags: entry.tags || [],
        prompt: entry.prompt
      })
      .select()
      .single();

    if (error) {
      console.error('[journalService.create] Insert error:', error);
      console.error('[journalService.create] Error code:', error.code);
      console.error('[journalService.create] Error details:', error.details);
      throw error;
    }

    console.log('[journalService.create] Successfully created entry:', data?.id);
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('mental_health_journal_entries')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// =====================================================
// SLEEP ENTRIES
// =====================================================
export const sleepService = {
  async getAll(): Promise<SleepEntry[]> {
    const { data, error } = await supabase
      .from('mental_health_sleep_entries')
      .select('*')
      .order('date', { ascending: false })
      .limit(90);

    if (error) throw error;
    return data || [];
  },

  async upsert(entry: SleepEntry): Promise<SleepEntry> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('mental_health_sleep_entries')
      .upsert({
        user_id: user.id,
        date: entry.date,
        bed_time: entry.bed_time,
        wake_time: entry.wake_time,
        hours: entry.hours,
        quality: entry.quality,
        notes: entry.notes || []
      }, { onConflict: 'user_id,date' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(date: string): Promise<void> {
    const { error } = await supabase
      .from('mental_health_sleep_entries')
      .delete()
      .eq('date', date);

    if (error) throw error;
  }
};

// =====================================================
// SAFETY PLAN
// =====================================================
export const safetyPlanService = {
  async get(): Promise<SafetyPlan | null> {
    const { data, error } = await supabase
      .from('mental_health_safety_plans')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('[safetyPlanService.get] Error:', error);
      throw error;
    }
    return data;
  },

  async upsert(plan: SafetyPlan): Promise<SafetyPlan> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('[safetyPlanService.upsert] Auth error:', authError);
      throw new Error(`Authentication failed: ${authError.message}`);
    }

    if (!user) {
      console.error('[safetyPlanService.upsert] No user found');
      throw new Error('Not authenticated');
    }

    console.log('[safetyPlanService.upsert] Saving plan for user:', user.id);

    const { data, error } = await supabase
      .from('mental_health_safety_plans')
      .upsert({
        user_id: user.id,
        warning_signs: plan.warning_signs || [],
        coping_strategies: plan.coping_strategies || [],
        distractions: plan.distractions || [],
        support_people: plan.support_people || [],
        professionals: plan.professionals || [],
        safe_environment: plan.safe_environment || [],
        reasons_for_living: plan.reasons_for_living || []
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error('[safetyPlanService.upsert] Upsert error:', error);
      console.error('[safetyPlanService.upsert] Error code:', error.code);
      console.error('[safetyPlanService.upsert] Error details:', error.details);
      throw error;
    }

    console.log('[safetyPlanService.upsert] Successfully saved plan:', data?.id);
    return data;
  }
};

// =====================================================
// GROUNDING PROGRESS
// =====================================================
export const groundingService = {
  async getTodayProgress(): Promise<GroundingProgress | null> {
    const today = new Date().toISOString().split('T')[0];

    try {
      const { data, error } = await supabase
        .from('mental_health_grounding_progress')
        .select('*')
        .eq('date', today)
        .single();

      // PGRST116 = no rows found, which is fine
      // 406 = schema cache not refreshed (happens with new tables)
      if (error && error.code !== 'PGRST116') {
        // If it's a 406 error, return null and log it - table exists but cache not refreshed
        if (error.message?.includes('406') || error.code === '406') {
          console.warn('Grounding progress: Schema cache not refreshed yet');
          return null;
        }
        throw error;
      }
      return data;
    } catch (err) {
      // Gracefully handle 406 errors
      console.warn('Grounding progress fetch error:', err);
      return null;
    }
  },

  async markComplete(exerciseId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const today = new Date().toISOString().split('T')[0];

    try {
      // Get current progress
      const current = await this.getTodayProgress();
      const exercises = current?.exercises_completed || [];

      if (!exercises.includes(exerciseId)) {
        exercises.push(exerciseId);
      }

      const { error } = await supabase
        .from('mental_health_grounding_progress')
        .upsert({
          user_id: user.id,
          date: today,
          exercises_completed: exercises
        }, { onConflict: 'user_id,date' });

      // Gracefully handle 406 schema cache errors
      if (error && !error.message?.includes('406')) {
        throw error;
      }
    } catch (err) {
      console.warn('Grounding progress save error:', err);
      // Don't throw - let the UI continue working
    }
  }
};

// =====================================================
// SYNC UTILITY - Migrate localStorage to cloud
// =====================================================
export const syncFromLocalStorage = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    // Sync mood history
    const moodHistory = localStorage.getItem('elec-mate-mood-history');
    if (moodHistory) {
      const entries = JSON.parse(moodHistory);
      for (const entry of entries) {
        await moodService.upsert({
          date: entry.date,
          mood: entry.mood,
          notes: entry.notes
        });
      }
    }

    // Sync journal entries
    const journalEntries = localStorage.getItem('wellbeing-journal');
    if (journalEntries) {
      const entries = JSON.parse(journalEntries);
      for (const entry of entries) {
        await journalService.create({
          date: entry.date,
          time: entry.time,
          mood: entry.mood,
          mood_label: entry.moodLabel,
          content: entry.content,
          gratitude: entry.gratitude,
          triggers: entry.triggers,
          tags: entry.tags,
          prompt: entry.prompt
        });
      }
    }

    // Sync sleep entries
    const sleepEntries = localStorage.getItem('sleep-tracker');
    if (sleepEntries) {
      const entries = JSON.parse(sleepEntries);
      for (const entry of entries) {
        await sleepService.upsert({
          date: entry.date,
          bed_time: entry.bedTime,
          wake_time: entry.wakeTime,
          hours: entry.hours,
          quality: entry.quality,
          notes: entry.notes
        });
      }
    }

    // Sync safety plan
    const safetyPlan = localStorage.getItem('personal-safety-plan');
    if (safetyPlan) {
      const plan = JSON.parse(safetyPlan);
      await safetyPlanService.upsert({
        warning_signs: plan.warningSigns || [],
        coping_strategies: plan.copingStrategies || [],
        distractions: plan.distractions || [],
        support_people: plan.supportPeople || [],
        professionals: plan.professionals || [],
        safe_environment: plan.safeEnvironment || [],
        reasons_for_living: plan.reasonsForLiving || []
      });
    }

    console.log('Mental health data synced to cloud successfully');
  } catch (error) {
    console.error('Error syncing mental health data:', error);
    throw error;
  }
};
