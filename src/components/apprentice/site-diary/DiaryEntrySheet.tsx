/**
 * DiaryEntrySheet
 *
 * Bottom sheet for creating or editing a diary entry. 85vh, matching app sheet pattern.
 * Supports edit mode via optional existingEntry prop.
 * Includes issues/questions field, quick-task suggestions, and rapid task entry.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin, Save, X, AlertTriangle } from 'lucide-react';
import type { NewDiaryEntry, SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';

const TASK_CACHE_KEY = 'elec-mate-diary-recent-tasks';

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Struggling' },
  { value: 2, emoji: '😔', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😊', label: 'Great' },
];

const skillCategories = [
  'Practical Skills',
  'Health & Safety',
  'Testing & Inspection',
  'Wiring & Containment',
  'Regulations',
  'Tools & Equipment',
  'Communication',
  'Problem Solving',
];

interface DiaryEntrySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entry: NewDiaryEntry) => Promise<unknown>;
  recentSites: string[];
  existingEntry?: SiteDiaryEntry | null;
}

export function DiaryEntrySheet({ open, onOpenChange, onSave, recentSites, existingEntry }: DiaryEntrySheetProps) {
  const isEditing = !!existingEntry;
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [siteName, setSiteName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [whatILearned, setWhatILearned] = useState('');
  const [issuesOrQuestions, setIssuesOrQuestions] = useState('');
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load recent tasks from cache for suggestions
  const recentTasks = useMemo(() => {
    try {
      const stored = localStorage.getItem(TASK_CACHE_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  }, []);

  // Quick-task suggestions: recent tasks not already added
  const taskSuggestions = useMemo(() => {
    return recentTasks.filter(t => !tasks.includes(t)).slice(0, 5);
  }, [recentTasks, tasks]);

  // Pre-fill form when editing
  useEffect(() => {
    if (existingEntry && open) {
      setDate(existingEntry.date);
      setSiteName(existingEntry.site_name);
      setSupervisor(existingEntry.supervisor || '');
      setTasks(existingEntry.tasks_completed);
      setSelectedSkills(existingEntry.skills_practised);
      setWhatILearned(existingEntry.what_i_learned || '');
      setIssuesOrQuestions(existingEntry.issues_or_questions || '');
      setMoodRating(existingEntry.mood_rating);
    } else if (!existingEntry && open) {
      // Reset for new entry
      setDate(new Date().toISOString().split('T')[0]);
      setSiteName('');
      setSupervisor('');
      setTaskInput('');
      setTasks([]);
      setSelectedSkills([]);
      setWhatILearned('');
      setIssuesOrQuestions('');
      setMoodRating(null);
    }
  }, [existingEntry, open]);

  const addTask = useCallback(() => {
    const trimmed = taskInput.trim();
    if (trimmed && !tasks.includes(trimmed)) {
      setTasks(prev => [...prev, trimmed]);
      setTaskInput('');

      // Cache the task for future suggestions
      try {
        const stored = localStorage.getItem(TASK_CACHE_KEY);
        const cached: string[] = stored ? JSON.parse(stored) : [];
        if (!cached.includes(trimmed)) {
          const updated = [trimmed, ...cached].slice(0, 20);
          localStorage.setItem(TASK_CACHE_KEY, JSON.stringify(updated));
        }
      } catch {
        // Ignore cache errors
      }
    }
  }, [taskInput, tasks]);

  const removeTask = (task: string) => {
    setTasks(prev => prev.filter(t => t !== task));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = async () => {
    if (!siteName.trim()) return;
    setIsSaving(true);

    const entry: NewDiaryEntry = {
      date,
      site_name: siteName.trim(),
      supervisor: supervisor.trim() || null,
      tasks_completed: tasks,
      skills_practised: selectedSkills,
      what_i_learned: whatILearned.trim() || null,
      issues_or_questions: issuesOrQuestions.trim() || null,
      mood_rating: moodRating,
      photos: existingEntry?.photos || [],
      linked_portfolio_id: existingEntry?.linked_portfolio_id || null,
    };

    await onSave(entry);
    onOpenChange(false);
    setIsSaving(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden [&>button.absolute]:hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/10">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-white">
                {isEditing ? 'Edit Entry' : 'Log Today'}
              </SheetTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/15 touch-manipulation"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </SheetHeader>

          {/* Scrollable form */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {/* Date */}
            <div>
              <label className="text-xs text-white mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            {/* Site name */}
            <div>
              <label className="text-xs text-white mb-1.5 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Site name
              </label>
              <Input
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Where did you work today?"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
              {recentSites.length > 0 && !siteName && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {recentSites.map(site => (
                    <button
                      key={site}
                      onClick={() => setSiteName(site)}
                      className="px-4 min-h-[44px] text-xs rounded-full bg-white/[0.06] border border-white/10 text-white/80 touch-manipulation active:bg-white/10"
                    >
                      {site}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Supervisor */}
            <div>
              <label className="text-xs text-white mb-1.5 block">Supervisor (optional)</label>
              <Input
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                placeholder="Who supervised you?"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            {/* Tasks completed */}
            <div>
              <label className="text-xs text-white mb-1.5 block">Tasks completed</label>
              <div className="flex gap-2">
                <Input
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTask();
                      // Keep focus in input for rapid entry
                    }
                  }}
                  placeholder="Add a task..."
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
                <Button
                  onClick={addTask}
                  variant="outline"
                  className="h-11 px-4 touch-manipulation border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  Add
                </Button>
              </div>

              {/* Quick-task suggestions */}
              {taskSuggestions.length > 0 && !taskInput && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {taskSuggestions.map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => setTasks(prev => [...prev, suggestion])}
                      className="px-3 min-h-[36px] text-[11px] rounded-full bg-white/[0.04] border border-dashed border-white/15 text-white/60 touch-manipulation active:bg-white/10"
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {tasks.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tasks.map(task => (
                    <span
                      key={task}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-xs"
                    >
                      {task}
                      <button
                        onClick={() => removeTask(task)}
                        className="h-5 w-5 flex items-center justify-center rounded-full active:bg-white/20 touch-manipulation"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Skills practised */}
            <div>
              <label className="text-xs text-white mb-1.5 block">Skills practised</label>
              <div className="flex flex-wrap gap-2">
                {skillCategories.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 min-h-[44px] text-xs rounded-full border touch-manipulation transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
                        : 'bg-white/[0.04] border-white/10 text-white/80 active:bg-white/10'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* What I learned */}
            <div>
              <label className="text-xs text-white mb-1.5 block">What I learned</label>
              <Textarea
                value={whatILearned}
                onChange={(e) => setWhatILearned(e.target.value)}
                placeholder="Any key takeaways from today?"
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
            </div>

            {/* Issues or questions */}
            <div>
              <label className="text-xs text-white mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" /> Issues or questions (optional)
              </label>
              <Textarea
                value={issuesOrQuestions}
                onChange={(e) => setIssuesOrQuestions(e.target.value)}
                placeholder="Any problems or questions to follow up?"
                className="touch-manipulation text-base min-h-[60px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
            </div>

            {/* Mood */}
            <div>
              <label className="text-xs text-white mb-2 block">How was your day?</label>
              <div className="flex justify-between gap-2">
                {moodOptions.map(mood => (
                  <button
                    key={mood.value}
                    onClick={() => setMoodRating(moodRating === mood.value ? null : mood.value)}
                    className={`flex-1 flex flex-col items-center gap-1 min-h-[56px] py-2 rounded-xl border touch-manipulation transition-all ${
                      moodRating === mood.value
                        ? 'bg-elec-yellow/15 border-elec-yellow/40 scale-110'
                        : 'bg-white/[0.03] border-white/10 active:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-[10px] text-white">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="px-5 py-4 border-t border-white/10">
            <Button
              onClick={handleSave}
              disabled={!siteName.trim() || isSaving}
              className="w-full h-12 text-base font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {isSaving ? 'Saving...' : isEditing ? 'Update Entry' : 'Save Entry'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
