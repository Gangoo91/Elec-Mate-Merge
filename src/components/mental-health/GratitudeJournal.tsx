
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Plus, Check, Calendar, Heart } from "lucide-react";

interface GratitudeEntry {
  date: string;
  items: string[];
}

interface GratitudeJournalProps {
  onClose: () => void;
}

const GratitudeJournal = ({ onClose }: GratitudeJournalProps) => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [currentItems, setCurrentItems] = useState<string[]>(['', '', '']);
  const [step, setStep] = useState<'write' | 'complete'>('write');
  const [todayEntry, setTodayEntry] = useState<GratitudeEntry | null>(null);

  const prompts = [
    "Something that made you smile today...",
    "A person you're thankful for...",
    "A small win or achievement..."
  ];

  useEffect(() => {
    // Load entries from localStorage
    const stored = localStorage.getItem('elec-mate-gratitude');
    if (stored) {
      const parsed = JSON.parse(stored);
      setEntries(parsed);

      // Check if we have an entry for today
      const today = new Date().toISOString().split('T')[0];
      const existing = parsed.find((e: GratitudeEntry) => e.date === today);
      if (existing) {
        setTodayEntry(existing);
        setCurrentItems(existing.items);
      }
    }
  }, []);

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...currentItems];
    newItems[index] = value;
    setCurrentItems(newItems);
  };

  const handleSave = () => {
    const filledItems = currentItems.filter(item => item.trim() !== '');
    if (filledItems.length === 0) return;

    const today = new Date().toISOString().split('T')[0];
    const newEntry: GratitudeEntry = {
      date: today,
      items: filledItems
    };

    const updatedEntries = [newEntry, ...entries.filter(e => e.date !== today)].slice(0, 30);
    setEntries(updatedEntries);
    localStorage.setItem('elec-mate-gratitude', JSON.stringify(updatedEntries));

    setTodayEntry(newEntry);
    setStep('complete');
  };

  const getStreak = () => {
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < entries.length; i++) {
      const entryDate = new Date(entries[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (entryDate.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const filledCount = currentItems.filter(item => item.trim() !== '').length;

  return (
    <div className="min-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col px-4">
        {step === 'write' && (
          <div className="space-y-6 animate-fade-in">
            {/* Title */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 mb-4">
                <Sparkles className="h-8 w-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Gratitude Journal</h2>
              <p className="text-white/80 text-sm">
                {todayEntry ? "Edit your gratitude list" : "What are you grateful for today?"}
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              {currentItems.map((item, index) => (
                <div key={index} className="space-y-1">
                  <label className="text-xs text-white/80">
                    {prompts[index]}
                  </label>
                  <div className="relative">
                    <Input
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      placeholder={`Gratitude ${index + 1}`}
                      className="pl-10 h-12"
                    />
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                      ${item.trim() ? 'bg-amber-500 text-foreground' : 'bg-white/10 text-foreground/40'}`}>
                      {item.trim() ? <Check className="h-3 w-3" /> : index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add More */}
            {currentItems.length < 5 && (
              <Button
                variant="ghost"
                onClick={() => setCurrentItems([...currentItems, ''])}
                className="w-full text-white/80"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another
              </Button>
            )}

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={filledCount === 0}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-foreground"
              size="lg"
            >
              Save Gratitude ({filledCount}/3)
            </Button>

            {/* Recent Entries Preview */}
            {entries.length > 0 && !todayEntry && (
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                    <Calendar className="h-4 w-4" />
                    Yesterday's gratitude
                  </div>
                  <ul className="space-y-1">
                    {entries[0]?.items.slice(0, 2).map((item, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                        <Heart className="h-3 w-3 text-amber-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step === 'complete' && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400">
              <Check className="h-12 w-12 text-foreground" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Gratitude Saved!</h2>
              <p className="text-white/80">
                Practicing gratitude rewires your brain for positivity.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400">{getStreak()}</div>
                  <div className="text-xs text-white/80">Day Streak</div>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400">{entries.length}</div>
                  <div className="text-xs text-white/80">Total Days</div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Items */}
            <Card className="w-full max-w-sm border-white/10 bg-white/5">
              <CardContent className="p-4">
                <div className="text-xs text-white/80 mb-3">Today's Gratitude</div>
                <ul className="space-y-2">
                  {todayEntry?.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button onClick={onClose} className="w-full max-w-sm" size="lg">
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
