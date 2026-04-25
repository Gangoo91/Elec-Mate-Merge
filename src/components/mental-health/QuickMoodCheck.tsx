import { useState } from 'react';
import { ArrowLeft, Check, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/college/primitives';

interface QuickMoodCheckProps {
  onClose: () => void;
  onOpenSupport?: () => void;
  onOpenCrisis?: () => void;
}

const QuickMoodCheck = ({ onClose, onOpenSupport, onOpenCrisis }: QuickMoodCheckProps) => {
  const { moodHistory, addMoodEntry } = useMentalHealth();
  const [step, setStep] = useState<'select' | 'note' | 'complete'>('select');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');

  const moods = [
    {
      value: 1,
      emoji: '😢',
      label: 'Struggling',
      desc: 'Finding things difficult right now',
    },
    {
      value: 2,
      emoji: '😔',
      label: 'Low',
      desc: 'Not my best, but managing',
    },
    {
      value: 3,
      emoji: '😐',
      label: 'Okay',
      desc: 'Neither good nor bad',
    },
    {
      value: 4,
      emoji: '🙂',
      label: 'Good',
      desc: 'Feeling positive today',
    },
    {
      value: 5,
      emoji: '😊',
      label: 'Great',
      desc: 'Feeling really good!',
    },
  ];

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    setStep('note');
  };

  const handleSave = () => {
    if (selectedMood === null) return;

    const today = new Date().toISOString().split('T')[0];
    addMoodEntry({
      date: today,
      mood: selectedMood,
      notes: note.trim() || undefined,
    });
    setStep('complete');
  };

  const handleSkipNote = () => {
    if (selectedMood === null) return;

    const today = new Date().toISOString().split('T')[0];
    addMoodEntry({
      date: today,
      mood: selectedMood,
    });
    setStep('complete');
  };

  const getTrend = () => {
    if (moodHistory.length < 3) return null;
    const recent = moodHistory.slice(0, 3);
    const avg = recent.reduce((sum, e) => sum + e.mood, 0) / recent.length;
    const older = moodHistory.slice(3, 6);
    if (older.length === 0) return null;
    const oldAvg = older.reduce((sum, e) => sum + e.mood, 0) / older.length;

    if (avg > oldAvg + 0.3) return 'up';
    if (avg < oldAvg - 0.3) return 'down';
    return 'stable';
  };

  const selectedMoodData = moods.find((m) => m.value === selectedMood);

  return (
    <div className="min-h-[70vh] flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 -mx-4 mb-4">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24 sm:pb-4">
        {step === 'select' && (
          <div className="w-full max-w-sm space-y-6 animate-fade-in">
            <div className="text-center">
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                How are you feeling?
              </h2>
              <p className="mt-2 text-white text-[13px]">
                Take a moment to check in with yourself
              </p>
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className="w-full min-h-[72px] px-5 py-4 flex items-center gap-4 text-left
                    hover:bg-[hsl(0_0%_15%)] active:scale-[0.98] transition-all touch-manipulation"
                >
                  <span className="text-4xl shrink-0">{mood.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-white">{mood.label}</div>
                    <div className="mt-0.5 text-[12px] text-white">{mood.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'note' && selectedMoodData && (
          <>
            <div className="w-full max-w-sm space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.06] mb-4">
                  <span className="text-5xl">{selectedMoodData.emoji}</span>
                </div>
                <Eyebrow>Mental health</Eyebrow>
                <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
                  Feeling {selectedMoodData.label.toLowerCase()}
                </h2>
                <p className="mt-2 text-white text-[13px]">Want to add a note? (optional)</p>
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? What influenced your mood today?"
                className={`${textareaClass} min-h-[120px]`}
                autoFocus
              />
            </div>

            {/* Sticky Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.06] sm:static sm:bg-transparent sm:border-none sm:p-0 sm:mt-6">
              <div className="max-w-sm mx-auto space-y-2">
                <PrimaryButton onClick={handleSave} size="lg" fullWidth>
                  Save check-in
                </PrimaryButton>
                <SecondaryButton onClick={handleSkipNote} fullWidth>
                  Skip note
                </SecondaryButton>
              </div>
            </div>
          </>
        )}

        {step === 'complete' && selectedMoodData && (
          <div className="w-full max-w-sm space-y-6 animate-fade-in text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400">
              <Check className="h-12 w-12 text-emerald-400" />
            </div>

            <div>
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                Check-in saved
              </h2>
              <p className="mt-2 text-white text-[13px]">
                Thanks for taking a moment to check in.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
                <Eyebrow>Days tracked</Eyebrow>
                <div className="mt-3 text-3xl font-semibold text-white tabular-nums">
                  {moodHistory.length}
                </div>
              </div>
              <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
                <Eyebrow>Trend</Eyebrow>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {getTrend() === 'up' && (
                    <>
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                      <span className="text-lg font-semibold text-emerald-400">Up</span>
                    </>
                  )}
                  {getTrend() === 'down' && (
                    <>
                      <TrendingDown className="h-5 w-5 text-red-400" />
                      <span className="text-lg font-semibold text-red-400">Down</span>
                    </>
                  )}
                  {getTrend() === 'stable' && (
                    <>
                      <Minus className="h-5 w-5 text-elec-yellow" />
                      <span className="text-lg font-semibold text-elec-yellow">Stable</span>
                    </>
                  )}
                  {!getTrend() && (
                    <span className="text-[13px] text-white">Keep tracking</span>
                  )}
                </div>
              </div>
            </div>

            {/* Supportive Message */}
            {selectedMood && selectedMood <= 2 && (
              <div className="bg-[hsl(0_0%_12%)] border border-amber-500/25 rounded-2xl p-5 space-y-4 text-left">
                <div>
                  <Eyebrow className="text-amber-400">Support</Eyebrow>
                  <p className="mt-2 text-[14px] font-medium text-white">
                    You do not need to sit with this alone.
                  </p>
                  <p className="mt-2 text-[13px] text-white leading-relaxed">
                    If today feels heavy, the next best step is to talk to someone or open your
                    support options now.
                  </p>
                </div>
                <div className="grid gap-2">
                  {onOpenSupport && (
                    <SecondaryButton onClick={onOpenSupport} fullWidth>
                      Talk to someone
                    </SecondaryButton>
                  )}
                  {onOpenCrisis && (
                    <button
                      onClick={onOpenCrisis}
                      className="inline-flex items-center justify-center h-11 px-5 rounded-full text-[13px] font-semibold bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/20 active:scale-[0.98] transition-all touch-manipulation"
                    >
                      Open crisis help
                    </button>
                  )}
                </div>
              </div>
            )}

            <PrimaryButton onClick={onClose} size="lg" fullWidth>
              Done
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickMoodCheck;
