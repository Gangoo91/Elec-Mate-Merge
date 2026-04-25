import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Plus, Check, Calendar, Heart } from 'lucide-react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  Field,
  inputClass,
} from '@/components/college/primitives';

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
    'Something that made you smile today...',
    "A person you're thankful for...",
    'A small win or achievement...',
  ];

  useEffect(() => {
    // Load entries from storage
    const parsed = storageGetJSONSync<GratitudeEntry[]>('elec-mate-gratitude', []);
    if (parsed.length > 0) {
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
    const filledItems = currentItems.filter((item) => item.trim() !== '');
    if (filledItems.length === 0) return;

    const today = new Date().toISOString().split('T')[0];
    const newEntry: GratitudeEntry = {
      date: today,
      items: filledItems,
    };

    const updatedEntries = [newEntry, ...entries.filter((e) => e.date !== today)].slice(0, 30);
    setEntries(updatedEntries);
    storageSetJSONSync('elec-mate-gratitude', updatedEntries);

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

  const filledCount = currentItems.filter((item) => item.trim() !== '').length;

  return (
    <div className="min-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col px-4">
        {step === 'write' && (
          <div className="space-y-6 animate-fade-in">
            {/* Title */}
            <div className="text-center">
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                Gratitude journal
              </h2>
              <p className="mt-2 text-white text-[13px]">
                {todayEntry ? 'Edit your gratitude list' : 'What are you grateful for today?'}
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              {currentItems.map((item, index) => (
                <Field key={index} label={prompts[index]}>
                  <div className="relative">
                    <input
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      placeholder={`Gratitude ${index + 1}`}
                      className={`${inputClass} pl-10`}
                    />
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                      ${item.trim() ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white border border-white/[0.08]'}`}
                    >
                      {item.trim() ? <Check className="h-3 w-3" /> : index + 1}
                    </div>
                  </div>
                </Field>
              ))}
            </div>

            {/* Add More */}
            {currentItems.length < 5 && (
              <SecondaryButton
                onClick={() => setCurrentItems([...currentItems, ''])}
                fullWidth
              >
                <Plus className="h-4 w-4 mr-2" />
                Add another
              </SecondaryButton>
            )}

            {/* Save Button */}
            <PrimaryButton
              onClick={handleSave}
              disabled={filledCount === 0}
              size="lg"
              fullWidth
            >
              Save gratitude ({filledCount}/3)
            </PrimaryButton>

            {/* Recent Entries Preview */}
            {entries.length > 0 && !todayEntry && (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[12px] text-white mb-2">
                  <Calendar className="h-4 w-4" />
                  Yesterday's gratitude
                </div>
                <ul className="space-y-1">
                  {entries[0]?.items.slice(0, 2).map((item, i) => (
                    <li key={i} className="text-[13px] text-white flex items-start gap-2">
                      <Heart className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {step === 'complete' && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400">
              <Check className="h-12 w-12 text-emerald-400" />
            </div>

            <div className="text-center">
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                Gratitude saved
              </h2>
              <p className="mt-2 text-white text-[13px]">
                Practicing gratitude rewires your brain for positivity.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden w-full max-w-xs">
              <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
                <Eyebrow>Day streak</Eyebrow>
                <div className="mt-3 text-3xl font-semibold text-elec-yellow tabular-nums">
                  {getStreak()}
                </div>
              </div>
              <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
                <Eyebrow>Total days</Eyebrow>
                <div className="mt-3 text-3xl font-semibold text-white tabular-nums">
                  {entries.length}
                </div>
              </div>
            </div>

            {/* Today's Items */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 w-full max-w-sm">
              <Eyebrow>Today's gratitude</Eyebrow>
              <ul className="mt-3 space-y-2">
                {todayEntry?.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-[13px] text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <PrimaryButton onClick={onClose} size="lg" className="w-full max-w-sm">
              Done
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
