
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
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
  CloudOff
} from "lucide-react";
import { useJournalData } from "@/hooks/useMentalHealthSync";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

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
  { value: 1, emoji: "😢", label: "Very Low", color: "bg-red-500" },
  { value: 2, emoji: "😔", label: "Low", color: "bg-orange-500" },
  { value: 3, emoji: "😐", label: "Okay", color: "bg-yellow-500" },
  { value: 4, emoji: "🙂", label: "Good", color: "bg-lime-500" },
  { value: 5, emoji: "😊", label: "Great", color: "bg-green-500" }
];

const journalPrompts = [
  "What's one thing that went well today?",
  "How are you feeling about work right now?",
  "What's been on your mind lately?",
  "Describe a moment today when you felt calm.",
  "What's something you're looking forward to?",
  "What challenged you today and how did you handle it?",
  "What would make tomorrow better?",
  "Who or what made you smile today?",
  "What's one thing you're proud of this week?",
  "How has your energy been today?",
  "What's one boundary you set or could set?",
  "What did you learn about yourself recently?",
  "Describe your perfect mental health day.",
  "What support do you need right now?",
  "What's one small act of self-care you did today?"
];

const commonTags = [
  "work", "family", "sleep", "anxiety", "stress", "achievement",
  "exercise", "rest", "social", "alone-time", "productive", "tired"
];

const WellbeingJournal = () => {
  const { user } = useAuth();
  const { entries, addEntry, deleteEntry: deleteJournalEntry, isLoading } = useJournalData();
  const [view, setView] = useState<'list' | 'write' | 'entry'>('list');
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({});
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [newGratitude, setNewGratitude] = useState("");
  const [newTrigger, setNewTrigger] = useState("");

  const startNewEntry = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentPrompt(randomPrompt);
    setCurrentEntry({
      mood: 3,
      moodLabel: "Okay",
      content: "",
      gratitude: [],
      triggers: [],
      tags: []
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
      mood_label: moodOptions.find(m => m.value === currentEntry.mood)?.label || "Okay",
      content: currentEntry.content || "",
      gratitude: currentEntry.gratitude || [],
      triggers: currentEntry.triggers || [],
      tags: currentEntry.tags || [],
      prompt: currentPrompt || undefined
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
      gratitude: [...(currentEntry.gratitude || []), newGratitude.trim()]
    });
    setNewGratitude("");
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
      triggers: [...(currentEntry.triggers || []), newTrigger.trim()]
    });
    setNewTrigger("");
  };

  const removeTrigger = (index: number) => {
    const updated = [...(currentEntry.triggers || [])];
    updated.splice(index, 1);
    setCurrentEntry({ ...currentEntry, triggers: updated });
  };

  const toggleTag = (tag: string) => {
    const tags = currentEntry.tags || [];
    if (tags.includes(tag)) {
      setCurrentEntry({ ...currentEntry, tags: tags.filter(t => t !== tag) });
    } else {
      setCurrentEntry({ ...currentEntry, tags: [...tags, tag] });
    }
  };

  const filteredEntries = entries.filter(entry => {
    const content = entry.content || '';
    const gratitude = entry.gratitude || [];
    const tags = entry.tags || [];
    const matchesSearch = content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          gratitude.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
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

      if (entries.some(e => e.date === dateStr)) {
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
    const text = entries.map(e =>
      `Date: ${e.date} ${e.time}\nMood: ${e.moodLabel}\n\n${e.content}\n\nGratitude:\n${e.gratitude.map(g => `- ${g}`).join('\n')}\n\nTriggers:\n${e.triggers.map(t => `- ${t}`).join('\n')}\n\nTags: ${e.tags.join(', ')}\n\n${'='.repeat(40)}\n`
    ).join('\n');

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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3">
            <BookOpen className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Wellbeing Journal</h2>
          <p className="text-sm text-white">
            Track your thoughts, feelings, and growth
          </p>
        </div>

        {/* Cloud Sync Status */}
        <div className="flex items-center justify-center gap-2 text-xs">
          {user ? (
            <span className="flex items-center gap-1 text-green-400">
              <Cloud className="h-3 w-3" />
              Synced to cloud
            </span>
          ) : (
            <span className="flex items-center gap-1 text-white">
              <CloudOff className="h-3 w-3" />
              Local only - sign in to sync
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">{entries.length}</div>
              <div className="text-[10px] text-white">Entries</div>
            </CardContent>
          </Card>
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-orange-400">{getStreak()}</div>
              <div className="text-[10px] text-white">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{getAverageMood()}</div>
              <div className="text-[10px] text-white">Avg Mood</div>
            </CardContent>
          </Card>
        </div>

        {/* New Entry Button */}
        <Button
          onClick={startNewEntry}
          className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 mr-2" />
          Write New Entry
        </Button>

        {/* Search and Filter */}
        {entries.length > 0 && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries..."
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl touch-manipulation"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "h-12 w-12 touch-manipulation active:scale-95 transition-all",
                  showFilters ? "bg-purple-500/20 border-purple-500/30" : "border-white/10"
                )}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={exportEntries}
                className="h-12 w-12 border-white/10 touch-manipulation active:scale-95 transition-all"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>

            {showFilters && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  size="sm"
                  variant={filterMood === null ? "default" : "outline"}
                  onClick={() => setFilterMood(null)}
                  className="text-xs h-10 min-w-[60px]"
                >
                  All
                </Button>
                {moodOptions.map(mood => (
                  <Button
                    key={mood.value}
                    size="sm"
                    variant={filterMood === mood.value ? "default" : "outline"}
                    onClick={() => setFilterMood(mood.value)}
                    className="text-xs h-10 min-w-[50px]"
                  >
                    {mood.emoji}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-3">
          {filteredEntries.length > 0 ? (
            filteredEntries.map(entry => {
              const mood = moodOptions.find(m => m.value === entry.mood);
              const gratitude = entry.gratitude || [];
              const tags = entry.tags || [];
              return (
                <Card
                  key={entry.id}
                  className="border-white/10 bg-white/5 cursor-pointer touch-manipulation active:scale-[0.98] transition-all"
                  onClick={() => { setSelectedEntry(entry); setView('entry'); }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Mood indicator circle */}
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                        mood?.color
                      )}>
                        <span className="text-2xl">{mood?.emoji}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Date and time on right */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 text-xs text-white font-medium">
                            <Calendar className="h-3 w-3" />
                            {new Date(entry.date).toLocaleDateString('en-GB', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-white">
                            <Clock className="h-3 w-3" />
                            {entry.time}
                          </div>
                        </div>

                        {/* Content preview with line-clamp-2 */}
                        <p className="text-sm text-white line-clamp-2 mb-2">
                          {entry.content || gratitude.join(', ') || 'No content'}
                        </p>

                        {/* Tags as small badges */}
                        {tags.length > 0 && (
                          <div className="flex gap-1.5 mt-2 flex-wrap">
                            {tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-[10px] py-0 px-2 text-white border-white/20">
                                {tag}
                              </Badge>
                            ))}
                            {tags.length > 3 && (
                              <Badge variant="outline" className="text-[10px] py-0 px-2 text-white border-white/20">
                                +{tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <ChevronRight className="h-5 w-5 text-white flex-shrink-0 mt-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : entries.length > 0 ? (
            <Card className="border-white/10 bg-white/5">
              <CardContent className="text-center py-8">
                <Search className="h-10 w-10 text-white mx-auto mb-3" />
                <p className="text-sm text-white">No matching entries found</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
              <CardContent className="text-center py-8">
                <Sparkles className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <h3 className="font-medium text-white mb-2">Start Your Journal</h3>
                <p className="text-sm text-white mb-4">
                  Writing regularly helps identify patterns in your mental health.
                  Just a few minutes a day can make a difference.
                </p>
                <Button onClick={startNewEntry} className="bg-purple-500 hover:bg-purple-600 h-12">
                  <Plus className="h-4 w-4 mr-2" />
                  Write First Entry
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Insight Card */}
        {entries.length >= 3 && (
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-400 text-sm mb-1">Your Insight</h4>
                  <p className="text-sm text-white">
                    {getStreak() >= 3
                      ? `Great consistency! You've journaled for ${getStreak()} days in a row. This habit builds self-awareness.`
                      : entries.length >= 7
                        ? `You've written ${entries.length} entries. Regular reflection helps identify patterns in your wellbeing.`
                        : "Keep journaling to unlock insights about your mental health patterns."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Write View
  if (view === 'write') {
    return (
      <div className="space-y-4 pb-28 sm:pb-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10 -mx-4 px-4 py-3 mb-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setView('list')}
              className="h-11 touch-manipulation active:scale-[0.98] transition-all"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <span className="text-sm text-white font-medium">
              {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
            <div className="w-20"></div>
          </div>
        </div>

        {/* Mood Selection - Larger for mobile */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white mb-3">How are you feeling?</h3>
            <div className="grid grid-cols-5 gap-1 sm:gap-2">
              {moodOptions.map(mood => (
                <button
                  key={mood.value}
                  onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.value, moodLabel: mood.label })}
                  className={cn(
                    "flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all min-h-[72px]",
                    "border-2 touch-manipulation active:scale-[0.95]",
                    currentEntry.mood === mood.value
                      ? "bg-white/10 border-white/30 scale-105"
                      : "border-transparent hover:bg-white/5"
                  )}
                >
                  <span className="text-2xl sm:text-3xl mb-1">{mood.emoji}</span>
                  <span className="text-[10px] sm:text-xs text-white font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Journal Prompt */}
        {currentPrompt && (
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-purple-400 font-medium">Today's Prompt</span>
                  <p className="text-sm text-white mt-0.5">{currentPrompt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white mb-3">What's on your mind?</h3>
            <Textarea
              value={currentEntry.content || ""}
              onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
              placeholder="Write your thoughts, feelings, reflections..."
              className="min-h-[150px] resize-none text-base touch-manipulation bg-white/5 border-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl"
            />
          </CardContent>
        </Card>

        {/* Gratitude Section */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-green-400 mb-2">Gratitude</h3>
            <p className="text-xs text-white/70 mb-3">What are you grateful for today?</p>

            <div className="flex gap-2 mb-3">
              <Input
                value={newGratitude}
                onChange={(e) => setNewGratitude(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGratitude()}
                placeholder="Add something you're grateful for..."
                className="flex-1 h-12 bg-white/5 border-white/10 focus:border-green-500/30 focus:ring-1 focus:ring-green-500/20 rounded-xl touch-manipulation"
              />
              <Button
                size="sm"
                onClick={addGratitude}
                className="h-12 w-12 bg-green-500 hover:bg-green-600 touch-manipulation active:scale-95 transition-all"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {currentEntry.gratitude && currentEntry.gratitude.length > 0 && (
              <div className="space-y-2">
                {currentEntry.gratitude.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-green-400 font-semibold">✓</span>
                    <span className="text-sm text-white flex-1">{item}</span>
                    <button
                      onClick={() => removeGratitude(index)}
                      className="text-white/60 hover:text-white touch-manipulation p-1 active:scale-95 transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Triggers Section */}
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-orange-400 mb-2">Triggers or Challenges</h3>
            <p className="text-xs text-white/70 mb-3">Any stressors affecting you? (optional)</p>

            <div className="flex gap-2 mb-3">
              <Input
                value={newTrigger}
                onChange={(e) => setNewTrigger(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTrigger()}
                placeholder="Add a trigger or challenge..."
                className="flex-1 h-12 bg-white/5 border-white/10 focus:border-orange-500/30 focus:ring-1 focus:ring-orange-500/20 rounded-xl touch-manipulation"
              />
              <Button
                size="sm"
                onClick={addTrigger}
                className="h-12 w-12 bg-orange-500 hover:bg-orange-600 touch-manipulation active:scale-95 transition-all"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {currentEntry.triggers && currentEntry.triggers.length > 0 && (
              <div className="space-y-2">
                {currentEntry.triggers.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <span className="text-orange-400 font-semibold">!</span>
                    <span className="text-sm text-white flex-1">{item}</span>
                    <button
                      onClick={() => removeTrigger(index)}
                      className="text-white/60 hover:text-white touch-manipulation p-1 active:scale-95 transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {commonTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-sm transition-all min-h-[40px] touch-manipulation active:scale-[0.95]",
                    currentEntry.tags?.includes(tag)
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sticky Save Button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-background/95 backdrop-blur-xl border-t border-white/10 sm:static sm:bg-transparent sm:border-none sm:p-0">
          <Button
            onClick={saveEntry}
            disabled={!currentEntry.content?.trim() && !currentEntry.gratitude?.length}
            className="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-500
                       hover:from-pink-600 hover:to-purple-600
                       text-white font-semibold text-lg
                       rounded-xl shadow-lg shadow-pink-500/25
                       transition-all duration-200
                       touch-manipulation active:scale-[0.98]"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Journal Entry
          </Button>
        </div>
      </div>
    );
  }

  // Entry View
  if (view === 'entry' && selectedEntry) {
    const mood = moodOptions.find(m => m.value === selectedEntry.mood);
    return (
      <div className="space-y-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10 -mx-4 px-4 py-3 mb-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => { setSelectedEntry(null); setView('list'); }}
              className="h-11 touch-manipulation active:scale-[0.98] transition-all"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            <Button
              variant="ghost"
              onClick={() => deleteEntry(selectedEntry.id)}
              className="h-11 w-11 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation active:scale-[0.98] transition-all"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Entry Header */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", mood?.color)}>
                <span className="text-3xl">{mood?.emoji}</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{mood?.label}</div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedEntry.date).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2 text-xs text-white">
                  <Clock className="h-3 w-3" />
                  {selectedEntry.time}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompt */}
        {selectedEntry.prompt && (
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-purple-400 font-medium">Prompt</span>
                  <p className="text-sm text-white mt-0.5">{selectedEntry.prompt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {selectedEntry.content && (
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-4">
              <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">
                {selectedEntry.content}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Gratitude */}
        {(selectedEntry.gratitude?.length || 0) > 0 && (
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-green-400 mb-3">Gratitude</h3>
              <div className="space-y-2">
                {(selectedEntry.gratitude || []).map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-sm text-white">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Triggers */}
        {(selectedEntry.triggers?.length || 0) > 0 && (
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-orange-400 mb-3">Triggers</h3>
              <div className="space-y-2">
                {(selectedEntry.triggers || []).map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">!</span>
                    <span className="text-sm text-white">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        {(selectedEntry.tags?.length || 0) > 0 && (
          <div className="flex flex-wrap gap-2">
            {(selectedEntry.tags || []).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs text-white border-white/20">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default WellbeingJournal;
