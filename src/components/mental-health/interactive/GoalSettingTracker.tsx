import { useState } from 'react';
import { Target, Plus, Check, Trash2 } from 'lucide-react';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  status: 'active' | 'completed';
}

const categories = [
  { value: 'wellbeing', label: 'Wellbeing', color: 'text-pink-400 bg-pink-500/15' },
  { value: 'work', label: 'Work', color: 'text-amber-400 bg-amber-500/15' },
  { value: 'learning', label: 'Learning', color: 'text-blue-400 bg-blue-500/15' },
  { value: 'personal', label: 'Personal', color: 'text-emerald-400 bg-emerald-500/15' },
];

const GoalSettingTracker = () => {
  const { goals = [], addGoal, updateGoal, deleteGoal } = useMentalHealth() as any;
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('wellbeing');

  const handleAdd = () => {
    if (!title.trim()) return;
    const goal: Goal = { id: crypto.randomUUID(), title: title.trim(), category, progress: 0, status: 'active' };
    if (addGoal) addGoal(goal);
    setTitle('');
    setShowAdd(false);
  };

  const handleProgress = (goal: Goal) => {
    const newProgress = Math.min(100, goal.progress + 25);
    if (updateGoal) updateGoal(goal.id, { progress: newProgress, status: newProgress >= 100 ? 'completed' : 'active' });
  };

  const activeGoals = (goals || []).filter((g: Goal) => g.status === 'active');
  const completedGoals = (goals || []).filter((g: Goal) => g.status === 'completed');

  return (
    <div className="space-y-4 pt-3">
      {/* Active goals */}
      {activeGoals.length > 0 && (
        <div className="space-y-2">
          {activeGoals.map((goal: Goal) => {
            const cat = categories.find((c) => c.value === goal.category);
            return (
              <div key={goal.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <button onClick={() => handleProgress(goal)} className="touch-manipulation active:scale-[0.95]">
                  <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0 relative">
                    <span className="text-[10px] font-bold text-green-400">{goal.progress}%</span>
                  </div>
                </button>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{goal.title}</h4>
                  {cat && <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block', cat.color)}>{cat.label}</span>}
                </div>
                <button onClick={() => deleteGoal?.(goal.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/15 touch-manipulation">
                  <Trash2 className="h-3.5 w-3.5 text-white/60 hover:text-red-400" />
                </button>
              </div>
            );
          })}
          <p className="text-[10px] text-white/70 text-center">Tap the percentage to add progress</p>
        </div>
      )}

      {/* Completed */}
      {completedGoals.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Completed</p>
          {completedGoals.slice(0, 3).map((goal: Goal) => (
            <div key={goal.id} className="flex items-center gap-2 py-2">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span className="text-xs text-white/80 line-through truncate">{goal.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add goal */}
      {showAdd ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your goal?"
            className="w-full h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/60 focus:border-white/20 focus:outline-none touch-manipulation"
            style={{ fontSize: '16px' }}
            autoFocus
          />
          <div className="flex gap-1.5">
            {categories.map((c) => (
              <button key={c.value} onClick={() => setCategory(c.value)} className={cn('flex-1 h-9 rounded-lg text-[10px] font-semibold touch-manipulation active:scale-[0.97] transition-all',
                category === c.value ? c.color + ' border border-current/20' : 'bg-white/[0.03] border border-white/[0.06] text-white/70'
              )}>{c.label}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={!title.trim()} className="flex-1 h-11 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-30">Save Goal</button>
            <button onClick={() => setShowAdd(false)} className="h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 text-xs touch-manipulation active:scale-[0.98]">Cancel</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full h-11 rounded-xl border-2 border-dashed border-white/[0.1] text-white/70 text-xs font-medium touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" /> Add a Goal
        </button>
      )}

      {activeGoals.length === 0 && completedGoals.length === 0 && !showAdd && (
        <p className="text-xs text-white/70 text-center py-2">Set small, achievable goals for your wellbeing</p>
      )}
    </div>
  );
};

export default GoalSettingTracker;
