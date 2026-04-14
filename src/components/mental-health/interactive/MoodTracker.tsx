import { useState, useEffect } from 'react';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Struggling', message: "That's brave to say. You're not alone.", color: 'bg-red-500/15 border-red-500/20' },
  { value: 2, emoji: '😔', label: 'Low', message: "Tough days happen. Let's get through this.", color: 'bg-orange-500/15 border-orange-500/20' },
  { value: 3, emoji: '😐', label: 'Okay', message: "Okay is okay. Take it easy today.", color: 'bg-yellow-500/15 border-yellow-500/20' },
  { value: 4, emoji: '🙂', label: 'Good', message: "Good to hear. Keep that going.", color: 'bg-lime-500/15 border-lime-500/20' },
  { value: 5, emoji: '😊', label: 'Great', message: "Brilliant. Remember this feeling.", color: 'bg-emerald-500/15 border-emerald-500/20' },
];

const MoodTracker = () => {
  const { moodHistory, addMoodEntry } = useMentalHealth();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = moodHistory.find((e) => e.date === today);

  useEffect(() => {
    if (todayEntry) {
      setSelectedMood(todayEntry.mood);
      setNotes(todayEntry.notes || '');
      setSaved(true);
    }
  }, [todayEntry]);

  const handleSave = () => {
    if (selectedMood === null) return;
    addMoodEntry({ date: today, mood: selectedMood, notes: notes.trim() || undefined });
    setSaved(true);
  };

  const selectedOption = moodOptions.find((m) => m.value === selectedMood);

  return (
    <div className="space-y-5 pt-4">
      {/* Mood selection */}
      <div>
        <p className="text-sm text-white/70 mb-4">How are you feeling right now?</p>
        <div className="flex justify-between px-1">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => { setSelectedMood(mood.value); setSaved(false); }}
              className={cn(
                'flex flex-col items-center gap-2 p-2 rounded-2xl touch-manipulation active:scale-[0.92] transition-all duration-200',
                selectedMood === mood.value ? mood.color + ' border scale-110' : 'opacity-60 hover:opacity-80'
              )}
            >
              <span className={cn('text-3xl transition-all', selectedMood === mood.value ? '' : 'grayscale-[0.2]')}>{mood.emoji}</span>
              <span className={cn('text-[10px] font-medium', selectedMood === mood.value ? 'text-white' : 'text-white/70')}>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Response message */}
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={cn('p-4 rounded-2xl border text-center', selectedOption.color)}
          >
            <p className="text-sm text-white font-medium">{selectedOption.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes */}
      {selectedMood !== null && (
        <div>
          <p className="text-xs text-white/80 mb-2">Want to add a note? (optional)</p>
          <textarea
            value={notes}
            onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
            placeholder="What's on your mind..."
            className="w-full min-h-[80px] p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/60 focus:border-white/20 focus:outline-none resize-none touch-manipulation"
            style={{ fontSize: '16px' }}
          />
        </div>
      )}

      {/* Save button */}
      {selectedMood !== null && !saved && (
        <button
          onClick={handleSave}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/25 text-pink-300 text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
        >
          Save How I Feel
        </button>
      )}

      {/* Saved confirmation */}
      {saved && selectedMood !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-2">
          <p className="text-xs text-emerald-400 font-medium">Logged for today</p>
        </motion.div>
      )}

      {/* Weekly bar chart */}
      {moodHistory.length >= 2 && (
        <div className="pt-2">
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-3">Last 7 Days</p>
          <div className="flex items-end gap-1.5 h-16">
            {Array.from({ length: 7 }).map((_, i) => {
              const d = new Date(); d.setDate(d.getDate() - (6 - i));
              const dateStr = d.toISOString().split('T')[0];
              const entry = moodHistory.find((e) => e.date === dateStr);
              const mood = entry?.mood || 0;
              const barColors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400', 'bg-emerald-400'];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center" style={{ height: '44px' }}>
                    <div
                      className={cn('w-full max-w-[18px] rounded-t-md transition-all', mood > 0 ? barColors[mood] : 'bg-white/[0.06]')}
                      style={{ height: mood > 0 ? `${(mood / 5) * 100}%` : '4px' }}
                    />
                  </div>
                  <span className="text-[8px] text-white/60">{['S','M','T','W','T','F','S'][d.getDay()]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
