import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Save,
  Trash2,
  Clock,
  TrendingUp,
  Sparkles,
  Tag,
  X,
  Filter,
  Download,
  Cloud,
  CloudOff,
} from 'lucide-react';
import { useJournalData } from '@/hooks/useMentalHealthSync';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  Field,
  FormCard,
  ListCard,
  ListRow,
  EmptyState,
  inputClass,
  textareaClass,
} from '@/components/college/primitives';

interface JournalEntry {
  id?: string;
  date: string;
  time: string;
  mood: number;
  mood_label?: string;
  moodLabel?: string;
  content?: string;
  gratitude?: string[];
  triggers?: string[];
  tags?: string[];
  prompt?: string;
}

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Very Low' },
  { value: 2, emoji: '😔', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😊', label: 'Great' },
];

const journalPrompts = [
  "What's one thing that went well today?",
  'How are you feeling about work right now?',
  "What's been on your mind lately?",
  'Describe a moment today when you felt calm.',
  "What's something you're looking forward to?",
  'What challenged you today and how did you handle it?',
  'What would make tomorrow better?',
  'Who or what made you smile today?',
  "What's one thing you're proud of this week?",
  'How has your energy been today?',
  "What's one boundary you set or could set?",
  'What did you learn about yourself recently?',
  'Describe your perfect mental health day.',
  'What support do you need right now?',
  "What's one small act of self-care you did today?",
];

const commonTags = [
  'work',
  'family',
  'sleep',
  'anxiety',
  'stress',
  'achievement',
  'exercise',
  'rest',
  'social',
  'alone-time',
  'productive',
  'tired',
];

const WellbeingJournal = () => {
  const { user } = useAuth();
  const { entries, addEntry, deleteEntry: deleteJournalEntry, isLoading } = useJournalData();
  const [view, setView] = useState<'list' | 'write' | 'entry'>('list');
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({});
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [newGratitude, setNewGratitude] = useState('');
  const [newTrigger, setNewTrigger] = useState('');

  const startNewEntry = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentPrompt(randomPrompt);
    setCurrentEntry({
      mood: 3,
      moodLabel: 'Okay',
      content: '',
      gratitude: [],
      triggers: [],
      tags: [],
    });
    setView('write');
  };

  const saveEntry = async () => {
    if (!currentEntry.content?.trim() && !currentEntry.gratitude?.length) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      mood: currentEntry.mood || 3,
      mood_label: moodOptions.find((m) => m.value === currentEntry.mood)?.label || 'Okay',
      content: currentEntry.content || '',
      gratitude: currentEntry.gratitude || [],
      triggers: currentEntry.triggers || [],
      tags: currentEntry.tags || [],
      prompt: currentPrompt || undefined,
    };

    await addEntry(entry);
    setCurrentEntry({});
    setView('list');
  };

  const deleteEntry = async (id: string) => {
    await deleteJournalEntry(id);
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
      setView('list');
    }
  };

  const addGratitude = () => {
    if (!newGratitude.trim()) return;
    setCurrentEntry({
      ...currentEntry,
      gratitude: [...(currentEntry.gratitude || []), newGratitude.trim()],
    });
    setNewGratitude('');
  };

  const removeGratitude = (index: number) => {
    const updated = [...(currentEntry.gratitude || [])];
    updated.splice(index, 1);
    setCurrentEntry({ ...currentEntry, gratitude: updated });
  };

  const addTrigger = () => {
    if (!newTrigger.trim()) return;
    setCurrentEntry({
      ...currentEntry,
      triggers: [...(currentEntry.triggers || []), newTrigger.trim()],
    });
    setNewTrigger('');
  };

  const removeTrigger = (index: number) => {
    const updated = [...(currentEntry.triggers || [])];
    updated.splice(index, 1);
    setCurrentEntry({ ...currentEntry, triggers: updated });
  };

  const toggleTag = (tag: string) => {
    const tags = currentEntry.tags || [];
    if (tags.includes(tag)) {
      setCurrentEntry({ ...currentEntry, tags: tags.filter((t) => t !== tag) });
    } else {
      setCurrentEntry({ ...currentEntry, tags: [...tags, tag] });
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const content = entry.content || '';
    const gratitude = entry.gratitude || [];
    const tags = entry.tags || [];
    const matchesSearch =
      content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gratitude.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = filterMood === null || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  const getStreak = () => {
    if (entries.length === 0) return 0;
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];

      if (entries.some((e) => e.date === dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  const getAverageMood = () => {
    if (entries.length === 0) return 0;
    const last7 = entries.slice(0, 7);
    return (last7.reduce((sum, e) => sum + e.mood, 0) / last7.length).toFixed(1);
  };

  const exportEntries = () => {
    const text = entries
      .map(
        (e) =>
          `Date: ${e.date} ${e.time}\nMood: ${e.moodLabel}\n\n${e.content}\n\nGratitude:\n${e.gratitude.map((g) => `- ${g}`).join('\n')}\n\nTriggers:\n${e.triggers.map((t) => `- ${t}`).join('\n')}\n\nTags: ${e.tags.join(', ')}\n\n${'='.repeat(40)}\n`
      )
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wellbeing-journal-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  // List View
  if (view === 'list') {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center py-2">
          <Eyebrow>Mental health</Eyebrow>
          <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
            Wellbeing journal
          </h2>
          <p className="mt-1 text-[13px] text-white">Track your thoughts, feelings, and growth</p>
        </div>

        {/* Cloud Sync Status */}
        <div className="flex items-center justify-center gap-2 text-[12px]">
          {user ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <Cloud className="h-3 w-3" />
              Synced to cloud
            </span>
          ) : (
            <span className="flex items-center gap-1 text-white">
              <CloudOff className="h-3 w-3" />
              Local only — sign in to sync
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="bg-[hsl(0_0%_12%)] px-4 py-4 text-center">
            <Eyebrow>Entries</Eyebrow>
            <div className="mt-2 text-2xl font-semibold text-white tabular-nums">
              {entries.length}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_12%)] px-4 py-4 text-center">
            <Eyebrow>Day streak</Eyebrow>
            <div className="mt-2 text-2xl font-semibold text-elec-yellow tabular-nums">
              {getStreak()}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_12%)] px-4 py-4 text-center">
            <Eyebrow>Avg mood</Eyebrow>
            <div className="mt-2 text-2xl font-semibold text-white tabular-nums">
              {getAverageMood()}
            </div>
          </div>
        </div>

        {/* New Entry Button */}
        <PrimaryButton onClick={startNewEntry} size="lg" fullWidth>
          <Plus className="h-5 w-5 mr-2" />
          Write new entry
        </PrimaryButton>

        {/* Search and Filter */}
        {entries.length > 0 && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                {!searchTerm && (
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                )}
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries..."
                  className={cn(inputClass, !searchTerm && 'pl-10')}
                />
              </div>
              <IconButton
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Filter entries"
                className={showFilters ? 'bg-elec-yellow/15 border-elec-yellow/25' : ''}
              >
                <Filter className="h-4 w-4" />
              </IconButton>
              <IconButton onClick={exportEntries} aria-label="Export entries">
                <Download className="h-4 w-4" />
              </IconButton>
            </div>

            {showFilters && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setFilterMood(null)}
                  className={cn(
                    'px-4 h-10 min-w-[60px] rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                    filterMood === null
                      ? 'bg-elec-yellow text-black'
                      : 'bg-[hsl(0_0%_12%)] text-white border border-white/[0.08]'
                  )}
                >
                  All
                </button>
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setFilterMood(mood.value)}
                    className={cn(
                      'px-3 h-10 min-w-[50px] rounded-full text-[12.5px] transition-colors touch-manipulation',
                      filterMood === mood.value
                        ? 'bg-elec-yellow text-black'
                        : 'bg-[hsl(0_0%_12%)] text-white border border-white/[0.08]'
                    )}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-3">
          {filteredEntries.length > 0 ? (
            <ListCard>
              {filteredEntries.map((entry) => {
                const mood = moodOptions.find((m) => m.value === entry.mood);
                const gratitude = entry.gratitude || [];
                const tags = entry.tags || [];
                return (
                  <ListRow
                    key={entry.id}
                    onClick={() => {
                      setSelectedEntry(entry);
                      setView('entry');
                    }}
                    lead={
                      <div className="w-12 h-12 rounded-full bg-[hsl(0_0%_15%)] border border-white/[0.08] flex items-center justify-center">
                        <span className="text-2xl">{mood?.emoji}</span>
                      </div>
                    }
                    title={
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-[12.5px] text-white font-medium">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-white">
                          <Clock className="h-3 w-3" />
                          {entry.time}
                        </span>
                      </div>
                    }
                    subtitle={
                      <div>
                        <p className="text-[13px] text-white line-clamp-2">
                          {entry.content || gratitude.join(', ') || 'No content'}
                        </p>
                        {tags.length > 0 && (
                          <div className="flex gap-1.5 mt-2 flex-wrap">
                            {tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] py-0.5 px-2 rounded-full bg-white/[0.06] text-white border border-white/[0.08]"
                              >
                                {tag}
                              </span>
                            ))}
                            {tags.length > 3 && (
                              <span className="text-[10px] py-0.5 px-2 rounded-full bg-white/[0.06] text-white border border-white/[0.08]">
                                +{tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    }
                    trailing={<ChevronRight className="h-5 w-5 text-white" />}
                  />
                );
              })}
            </ListCard>
          ) : entries.length > 0 ? (
            <EmptyState
              title="No matching entries"
              description="Try adjusting your search or filters."
            />
          ) : (
            <EmptyState
              title="Start your journal"
              description="Writing regularly helps identify patterns in your mental health. Just a few minutes a day can make a difference."
              action="Write first entry"
              onAction={startNewEntry}
            />
          )}
        </div>

        {/* Insight Card */}
        {entries.length >= 3 && (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <Eyebrow>Your insight</Eyebrow>
                <p className="mt-2 text-[13px] text-white leading-relaxed">
                  {getStreak() >= 3
                    ? `Great consistency. You've journaled for ${getStreak()} days in a row. This habit builds self-awareness.`
                    : entries.length >= 7
                      ? `You've written ${entries.length} entries. Regular reflection helps identify patterns in your wellbeing.`
                      : 'Keep journaling to unlock insights about your mental health patterns.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Write View
  if (view === 'write') {
    return (
      <div className="space-y-4 pb-28 sm:pb-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06] -mx-4 px-4 py-3 mb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setView('list')}
              className="inline-flex items-center gap-1 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <span className="text-[13px] text-white font-medium">
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </span>
            <div className="w-20"></div>
          </div>
        </div>

        {/* Mood Selection */}
        <FormCard eyebrow="How are you feeling?">
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() =>
                  setCurrentEntry({ ...currentEntry, mood: mood.value, moodLabel: mood.label })
                }
                className={cn(
                  'flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all min-h-[72px]',
                  'touch-manipulation active:scale-[0.95]',
                  currentEntry.mood === mood.value
                    ? 'bg-elec-yellow/15 border border-elec-yellow/40'
                    : 'bg-[hsl(0_0%_9%)] border border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
                )}
              >
                <span className="text-2xl sm:text-3xl mb-1">{mood.emoji}</span>
                <span className="text-[10px] sm:text-[11px] text-white font-medium">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </FormCard>

        {/* Journal Prompt */}
        {currentPrompt && (
          <div className="bg-[hsl(0_0%_12%)] border border-elec-yellow/20 rounded-2xl p-5">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <Eyebrow>Today's prompt</Eyebrow>
                <p className="mt-1.5 text-[13px] text-white">{currentPrompt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <FormCard eyebrow="What's on your mind?">
          <textarea
            value={currentEntry.content || ''}
            onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
            placeholder="Write your thoughts, feelings, reflections..."
            className={`${textareaClass} min-h-[150px]`}
          />
        </FormCard>

        {/* Gratitude Section */}
        <FormCard eyebrow="Gratitude">
          <p className="text-[12px] text-white">What are you grateful for today?</p>
          <div className="flex gap-2">
            <input
              value={newGratitude}
              onChange={(e) => setNewGratitude(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addGratitude()}
              placeholder="Add something you're grateful for..."
              className={`${inputClass} flex-1`}
            />
            <button
              onClick={addGratitude}
              aria-label="Add gratitude"
              className="h-11 w-11 rounded-full bg-elec-yellow text-black flex items-center justify-center hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {currentEntry.gratitude && currentEntry.gratitude.length > 0 && (
            <div className="space-y-2">
              {currentEntry.gratitude.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]"
                >
                  <span className="text-emerald-400 font-semibold">+</span>
                  <span className="text-[13px] text-white flex-1">{item}</span>
                  <button
                    onClick={() => removeGratitude(index)}
                    aria-label="Remove gratitude"
                    className="text-white hover:text-white touch-manipulation p-1 active:scale-95 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormCard>

        {/* Triggers Section */}
        <FormCard eyebrow="Triggers or challenges">
          <p className="text-[12px] text-white">Any stressors affecting you? (optional)</p>
          <div className="flex gap-2">
            <input
              value={newTrigger}
              onChange={(e) => setNewTrigger(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTrigger()}
              placeholder="Add a trigger or challenge..."
              className={`${inputClass} flex-1`}
            />
            <button
              onClick={addTrigger}
              aria-label="Add trigger"
              className="h-11 w-11 rounded-full bg-elec-yellow text-black flex items-center justify-center hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {currentEntry.triggers && currentEntry.triggers.length > 0 && (
            <div className="space-y-2">
              {currentEntry.triggers.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]"
                >
                  <span className="text-orange-400 font-semibold">!</span>
                  <span className="text-[13px] text-white flex-1">{item}</span>
                  <button
                    onClick={() => removeTrigger(index)}
                    aria-label="Remove trigger"
                    className="text-white hover:text-white touch-manipulation p-1 active:scale-95 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormCard>

        {/* Tags */}
        <FormCard eyebrow="Tags">
          <div className="flex items-center gap-2 text-white">
            <Tag className="h-4 w-4" />
            <span className="text-[12px]">Choose all that apply</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  'px-4 py-2.5 rounded-full text-[13px] transition-all min-h-[40px] touch-manipulation active:scale-[0.95]',
                  currentEntry.tags?.includes(tag)
                    ? 'bg-elec-yellow text-black font-semibold'
                    : 'bg-[hsl(0_0%_9%)] text-white border border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </FormCard>

        {/* Sticky Save Button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.06] sm:static sm:bg-transparent sm:border-none sm:p-0">
          <PrimaryButton
            onClick={saveEntry}
            disabled={!currentEntry.content?.trim() && !currentEntry.gratitude?.length}
            size="lg"
            fullWidth
          >
            <Save className="mr-2 h-5 w-5" />
            Save journal entry
          </PrimaryButton>
        </div>
      </div>
    );
  }

  // Entry View
  if (view === 'entry' && selectedEntry) {
    const mood = moodOptions.find((m) => m.value === selectedEntry.mood);
    return (
      <div className="space-y-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06] -mx-4 px-4 py-3 mb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedEntry(null);
                setView('list');
              }}
              className="inline-flex items-center gap-1 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <button
              onClick={() => deleteEntry(selectedEntry.id)}
              aria-label="Delete entry"
              className="h-11 w-11 rounded-full text-red-400 hover:bg-red-500/10 flex items-center justify-center touch-manipulation"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Entry Header */}
        <FormCard>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08] flex items-center justify-center">
              <span className="text-3xl">{mood?.emoji}</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{mood?.label}</div>
              <div className="flex items-center gap-2 text-[13px] text-white">
                <Calendar className="h-4 w-4" />
                {new Date(selectedEntry.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white">
                <Clock className="h-3 w-3" />
                {selectedEntry.time}
              </div>
            </div>
          </div>
        </FormCard>

        {/* Prompt */}
        {selectedEntry.prompt && (
          <div className="bg-[hsl(0_0%_12%)] border border-elec-yellow/20 rounded-2xl p-5">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <Eyebrow>Prompt</Eyebrow>
                <p className="mt-1.5 text-[13px] text-white">{selectedEntry.prompt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {selectedEntry.content && (
          <FormCard>
            <p className="text-[13px] text-white whitespace-pre-wrap leading-relaxed">
              {selectedEntry.content}
            </p>
          </FormCard>
        )}

        {/* Gratitude */}
        {(selectedEntry.gratitude?.length || 0) > 0 && (
          <FormCard eyebrow="Gratitude">
            <div className="space-y-2">
              {(selectedEntry.gratitude || []).map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">+</span>
                  <span className="text-[13px] text-white">{item}</span>
                </div>
              ))}
            </div>
          </FormCard>
        )}

        {/* Triggers */}
        {(selectedEntry.triggers?.length || 0) > 0 && (
          <FormCard eyebrow="Triggers">
            <div className="space-y-2">
              {(selectedEntry.triggers || []).map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">!</span>
                  <span className="text-[13px] text-white">{item}</span>
                </div>
              ))}
            </div>
          </FormCard>
        )}

        {/* Tags */}
        {(selectedEntry.tags?.length || 0) > 0 && (
          <div className="flex flex-wrap gap-2">
            {(selectedEntry.tags || []).map((tag) => (
              <span
                key={tag}
                className="text-[11px] py-0.5 px-2 rounded-full bg-white/[0.06] text-white border border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default WellbeingJournal;
