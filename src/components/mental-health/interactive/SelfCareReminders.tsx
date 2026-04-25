import { useState } from 'react';
import { Check } from 'lucide-react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { cn } from '@/lib/utils';

const dailyPrompts = [
  { id: 'water', text: 'Drink a glass of water', emoji: '💧' },
  { id: 'stretch', text: 'Stand up and stretch', emoji: '🧘' },
  { id: 'fresh-air', text: 'Step outside for fresh air', emoji: '🌿' },
  { id: 'break', text: 'Take a proper break', emoji: '☕' },
  { id: 'eat', text: 'Eat something nutritious', emoji: '🍎' },
  { id: 'move', text: 'Move your body for 10 minutes', emoji: '🚶' },
  { id: 'connect', text: 'Message someone you care about', emoji: '💬' },
  { id: 'breathe', text: 'Take 5 slow, deep breaths', emoji: '🫁' },
  { id: 'tidy', text: 'Tidy one small space around you', emoji: '✨' },
  { id: 'limit', text: 'Put your phone down for 20 mins', emoji: '📵' },
];

const SelfCareReminders = () => {
  const today = new Date().toISOString().split('T')[0];
  const [completed, setCompleted] = useState<string[]>(() => {
    const stored = storageGetJSONSync<Record<string, string[]>>('selfcare-log', {});
    return stored[today] || [];
  });

  // Pick 5 consistent prompts for today based on date seed
  const todaysPrompts = (() => {
    const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0);
    const shuffled = [...dailyPrompts].sort((a, b) => {
      const ha = (seed * 31 + a.id.charCodeAt(0)) % 100;
      const hb = (seed * 31 + b.id.charCodeAt(0)) % 100;
      return ha - hb;
    });
    return shuffled.slice(0, 5);
  })();

  const toggle = (id: string) => {
    const updated = completed.includes(id) ? completed.filter((c) => c !== id) : [...completed, id];
    setCompleted(updated);
    const stored = storageGetJSONSync<Record<string, string[]>>('selfcare-log', {});
    stored[today] = updated;
    storageSetJSONSync('selfcare-log', stored);
  };

  const done = completed.length;
  const total = todaysPrompts.length;

  return (
    <div className="space-y-4 pt-3">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${(done / total) * 100}%` }} />
        </div>
        <span className="text-xs text-white font-medium">{done}/{total}</span>
      </div>

      {/* Prompts */}
      <div className="space-y-2">
        {todaysPrompts.map((prompt) => {
          const isDone = completed.includes(prompt.id);
          return (
            <button
              key={prompt.id}
              onClick={() => toggle(prompt.id)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl touch-manipulation active:scale-[0.98] transition-all text-left',
                isDone ? 'bg-emerald-500/[0.08] border border-emerald-500/15' : 'bg-white/[0.02] border border-white/[0.06]'
              )}
            >
              <span className="text-xl flex-shrink-0">{prompt.emoji}</span>
              <span className={cn('text-sm flex-1', isDone ? 'text-white line-through' : 'text-white')}>{prompt.text}</span>
              <div className={cn('w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                isDone ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
              )}>
                {isDone && <Check className="h-3 w-3 text-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {done === total && (
        <p className="text-center text-xs text-emerald-400 font-medium py-2">All done today. Well played.</p>
      )}
    </div>
  );
};

export default SelfCareReminders;
