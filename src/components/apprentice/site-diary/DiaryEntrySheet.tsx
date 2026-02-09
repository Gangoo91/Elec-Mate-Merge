/**
 * DiaryEntrySheet
 *
 * Bottom sheet for creating or editing a diary entry. 85vh, matching app sheet pattern.
 * Supports edit mode via optional existingEntry prop.
 * Includes issues/questions field, quick-task suggestions, and rapid task entry.
 */

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  MapPin,
  Save,
  X,
  AlertTriangle,
  Camera,
  Upload,
  ImageIcon,
  Wrench,
  BookOpen,
  Plus,
  Check,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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

export function DiaryEntrySheet({
  open,
  onOpenChange,
  onSave,
  recentSites,
  existingEntry,
}: DiaryEntrySheetProps) {
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
  const [photos, setPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_PHOTOS = 5;

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
    return recentTasks.filter((t) => !tasks.includes(t)).slice(0, 5);
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
      setPhotos(existingEntry.photos || []);
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
      setPhotos([]);
    }
  }, [existingEntry, open]);

  const addTask = useCallback(() => {
    const trimmed = taskInput.trim();
    if (trimmed && !tasks.includes(trimmed)) {
      setTasks((prev) => [...prev, trimmed]);
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
    setTasks((prev) => prev.filter((t) => t !== task));
  };

  const handlePhotoUpload = useCallback(
    async (file: File) => {
      if (photos.length >= MAX_PHOTOS) {
        toast.error(`Maximum ${MAX_PHOTOS} photos allowed`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        toast.error('Image must be less than 20MB');
        return;
      }
      setIsUploading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('You must be logged in to upload photos');
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/diary/${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('visual-uploads')
          .upload(fileName, file, { cacheControl: '3600', upsert: false });
        if (error) throw error;
        const {
          data: { publicUrl },
        } = supabase.storage.from('visual-uploads').getPublicUrl(data.path);
        setPhotos((prev) => [...prev, publicUrl]);
        toast.success(`Photo ${photos.length + 1}/${MAX_PHOTOS} uploaded`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to upload photo');
      } finally {
        setIsUploading(false);
      }
    },
    [photos]
  );

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    toast.success('Photo removed');
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
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
      photos,
      linked_portfolio_id: existingEntry?.linked_portfolio_id || null,
    };

    await onSave(entry);
    onOpenChange(false);
    setIsSaving(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden [&>button.absolute]:hidden sm:max-w-[640px] sm:mx-auto sm:rounded-t-2xl"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-lg font-bold text-white">
                  {isEditing ? 'Edit Entry' : 'Log Today'}
                </SheetTitle>
                <p className="text-xs text-white/70 mt-0.5">
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="h-11 w-11 flex items-center justify-center rounded-full bg-white/[0.06] active:bg-white/15 touch-manipulation"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </SheetHeader>
          <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent" />

          {/* Scrollable form */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* === SECTION: When & Where === */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  When &amp; Where
                </span>
              </div>

              {/* Date */}
              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                <label className="text-[11px] text-white/80 mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Date
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow/20"
                />
              </div>

              {/* Site name */}
              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                <label className="text-[11px] text-white/80 mb-1 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> Site
                </label>
                <Input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Where did you work today?"
                  className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow/20"
                />
                {recentSites.length > 0 && !siteName && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {recentSites.map((site) => (
                      <button
                        key={site}
                        onClick={() => setSiteName(site)}
                        className="px-3.5 min-h-[36px] text-xs rounded-full bg-white/[0.06] border border-white/10 text-white touch-manipulation active:bg-white/10"
                      >
                        <MapPin className="h-3 w-3 inline mr-1 opacity-50" />
                        {site}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Supervisor */}
              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                <label className="text-[11px] text-white/80 mb-1 block">
                  Supervisor (optional)
                </label>
                <Input
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                  placeholder="Who supervised you?"
                  className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow/20"
                />
              </div>
            </div>

            {/* === SECTION: What You Did === */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  What You Did
                </span>
              </div>

              {/* Tasks */}
              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                <label className="text-[11px] text-white/80 mb-1 flex items-center gap-1.5">
                  <Wrench className="h-3 w-3" /> Tasks completed
                </label>
                <div className="flex gap-2">
                  <Input
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTask();
                      }
                    }}
                    placeholder="What did you do?"
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow/20"
                  />
                  <button
                    onClick={addTask}
                    className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow touch-manipulation active:bg-elec-yellow/25"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {/* Quick-task suggestions */}
                {taskSuggestions.length > 0 && !taskInput && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {taskSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setTasks((prev) => [...prev, suggestion])}
                        className="px-3 min-h-[36px] text-[11px] rounded-full bg-white/[0.04] border border-dashed border-white/15 text-white touch-manipulation active:bg-white/10"
                      >
                        <Plus className="h-3 w-3 inline mr-0.5 opacity-60" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {tasks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {tasks.map((task) => (
                      <span
                        key={task}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/25 text-elec-yellow text-xs font-medium"
                      >
                        {task}
                        <button
                          onClick={() => removeTask(task)}
                          className="h-5 w-5 flex items-center justify-center rounded-full bg-elec-yellow/20 active:bg-elec-yellow/40 touch-manipulation"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                <label className="text-[11px] text-white/80 mb-2 block">Skills practised</label>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`inline-flex items-center gap-1.5 px-3.5 min-h-[40px] text-xs font-medium rounded-xl border touch-manipulation transition-all active:scale-[0.97] ${
                        selectedSkills.includes(skill)
                          ? 'bg-elec-yellow/15 border-elec-yellow/40 text-elec-yellow shadow-[0_0_12px_-3px] shadow-elec-yellow/20'
                          : 'bg-white/[0.03] border-white/[0.08] text-white active:bg-white/[0.08]'
                      }`}
                    >
                      {selectedSkills.includes(skill) && <Check className="h-3.5 w-3.5" />}
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* === SECTION: Reflections === */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Reflections
                </span>
              </div>

              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                <label className="text-[11px] text-white/80 mb-1 flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3" /> What I learned
                </label>
                <Textarea
                  value={whatILearned}
                  onChange={(e) => setWhatILearned(e.target.value)}
                  placeholder="Any key takeaways from today?"
                  className="touch-manipulation text-base min-h-[80px] bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow/20"
                />
              </div>

              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                <label className="text-[11px] text-white/80 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3" /> Issues or questions (optional)
                </label>
                <Textarea
                  value={issuesOrQuestions}
                  onChange={(e) => setIssuesOrQuestions(e.target.value)}
                  placeholder="Any problems to follow up?"
                  className="touch-manipulation text-base min-h-[60px] bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow/20"
                />
              </div>
            </div>

            {/* === SECTION: Evidence === */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Evidence
                </span>
                <span className="text-[10px] text-white/60 ml-auto">
                  {photos.length}/{MAX_PHOTOS}
                </span>
              </div>

              <div className="px-4 py-2.5 border-t border-white/[0.04]">
                {/* Photo gallery */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {photos.map((url, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]"
                      >
                        <img
                          src={url}
                          alt={`Photo ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1.5 right-1.5 h-7 w-7 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-full active:bg-red-500/90 transition-colors touch-manipulation"
                        >
                          <X className="h-3.5 w-3.5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload buttons */}
                {photos.length < MAX_PHOTOS && (
                  <div className="flex gap-2">
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handlePhotoUpload(f);
                        e.target.value = '';
                      }}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handlePhotoUpload(f);
                        e.target.value = '';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium touch-manipulation active:bg-white/[0.08] disabled:opacity-50"
                    >
                      <Camera className="h-4 w-4" />
                      {isUploading ? 'Uploading...' : 'Camera'}
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium touch-manipulation active:bg-white/[0.08] disabled:opacity-50"
                    >
                      <Upload className="h-4 w-4" />
                      Gallery
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* === SECTION: Mood === */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  How Was Your Day?
                </span>
              </div>

              <div className="px-4 py-3 border-t border-white/[0.04]">
                <div className="flex gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setMoodRating(moodRating === mood.value ? null : mood.value)}
                      className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 touch-manipulation transition-all active:scale-[0.95] ${
                        moodRating === mood.value
                          ? 'bg-elec-yellow/10 border-elec-yellow/50 scale-105'
                          : 'bg-white/[0.02] border-transparent active:bg-white/[0.06]'
                      }`}
                    >
                      <span
                        className={`text-2xl transition-transform ${moodRating === mood.value ? 'scale-110' : ''}`}
                      >
                        {mood.emoji}
                      </span>
                      <span
                        className={`text-[11px] font-medium ${moodRating === mood.value ? 'text-elec-yellow' : 'text-white/80'}`}
                      >
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom spacer for safe area */}
            <div className="h-2" />
          </div>

          {/* Save button */}
          <div className="px-4 py-4 border-t border-white/[0.06] bg-background/95 backdrop-blur-sm">
            <Button
              onClick={handleSave}
              disabled={!siteName.trim() || isSaving}
              className="w-full h-13 text-base font-bold rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation disabled:opacity-40 shadow-lg shadow-elec-yellow/20"
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
