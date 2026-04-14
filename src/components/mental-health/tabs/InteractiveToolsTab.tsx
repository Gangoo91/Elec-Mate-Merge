import { useState, useEffect, useRef } from 'react';
import {
  Heart, Wind, Brain, Target, Bell, ChevronRight, Scan, Clock,
  Smile, Battery, Sparkles, PenLine, Moon, TrendingUp, ChevronDown, RefreshCw,
} from 'lucide-react';
import MoodTracker from '@/components/mental-health/interactive/MoodTracker';
import SelfCareReminders from '@/components/mental-health/interactive/SelfCareReminders';
import StressManagementTools from '@/components/mental-health/interactive/StressManagementTools';
import GoalSettingTracker from '@/components/mental-health/interactive/GoalSettingTracker';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

// ── Inline tools ──────────────────────────────────────────────────────

const BodyScanTool = () => {
  const parts = ['Feet & toes', 'Lower legs', 'Upper legs & hips', 'Abdomen', 'Chest & back', 'Hands & arms', 'Shoulders & neck', 'Face & head'];
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(20);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setTime((t) => {
      if (t <= 1) { if (step < parts.length - 1) { setStep((s) => s + 1); return 20; } setActive(false); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(i);
  }, [active, step, parts.length]);
  return (
    <div className="space-y-4 pt-3 text-center">
      <p className="text-sm font-medium text-white">Focus on: {parts[step]}</p>
      <p className="text-3xl font-bold text-cyan-400">{time}s</p>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"><div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${((step * 20 + (20 - time)) / (parts.length * 20)) * 100}%` }} /></div>
      <p className="text-[11px] text-white/70">Step {step + 1} of {parts.length}</p>
      <div className="flex gap-2">
        <button onClick={() => { setStep(0); setTime(20); setActive(true); }} disabled={active} className="flex-1 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-70">{active ? 'Running...' : 'Start'}</button>
        <button onClick={() => { setActive(false); setStep(0); setTime(20); }} className="flex-1 h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs touch-manipulation active:scale-[0.98]">Reset</button>
      </div>
    </div>
  );
};

const WorryTimeTool = () => {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(900);
  useEffect(() => {
    if (!active || time <= 0) return;
    const i = setInterval(() => setTime((t) => { if (t <= 1) { setActive(false); return 0; } return t - 1; }), 1000);
    return () => clearInterval(i);
  }, [active, time]);
  const m = Math.floor(time / 60); const s = time % 60;
  return (
    <div className="space-y-4 pt-3 text-center">
      <p className="text-4xl font-bold text-orange-400">{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}</p>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"><div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${((900 - time) / 900) * 100}%` }} /></div>
      <p className="text-xs text-white/70">{!active && time === 900 ? '15 minutes to process your worries' : active ? 'Let it out — write, think, pace' : "Time's up — let go now"}</p>
      <div className="flex gap-2">
        <button onClick={() => { if (time === 0) setTime(900); setActive(!active); }} className="flex-1 h-11 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold touch-manipulation active:scale-[0.98]">{active ? 'Pause' : time === 900 ? 'Start' : 'Resume'}</button>
        <button onClick={() => { setActive(false); setTime(900); }} className="flex-1 h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs touch-manipulation active:scale-[0.98]">Reset</button>
      </div>
    </div>
  );
};

const GratitudeTool = () => {
  const [items, setItems] = useState(['', '', '']);
  const [saved, setSaved] = useState(false);
  const save = () => {
    const valid = items.filter((g) => g.trim());
    if (valid.length === 0) return;
    const existing = storageGetJSONSync<any[]>('gratitudes', []);
    storageSetJSONSync('gratitudes', [...existing, { date: new Date().toISOString().split('T')[0], items: valid }]);
    setSaved(true);
    setTimeout(() => { setSaved(false); setItems(['', '', '']); }, 2000);
  };
  return (
    <div className="space-y-3 pt-3">
      {items.map((g, i) => (
        <input key={i} value={g} onChange={(e) => { const n = [...items]; n[i] = e.target.value; setItems(n); }}
          placeholder={`I'm grateful for...`} className="w-full h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/60 focus:border-emerald-500/60 focus:outline-none touch-manipulation" style={{ fontSize: '16px' }} />
      ))}
      <button onClick={save} disabled={items.every((g) => !g.trim())} className="w-full h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-70">{saved ? 'Saved' : 'Save Gratitudes'}</button>
    </div>
  );
};

const EnergyTool = () => {
  const [sel, setSel] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const levels = [{ id: 'low', emoji: '🪫', label: 'Low' }, { id: 'medium', emoji: '🔋', label: 'Medium' }, { id: 'high', emoji: '⚡', label: 'High' }];
  const save = () => {
    if (!sel) return;
    const existing = storageGetJSONSync<any[]>('energyLogs', []);
    storageSetJSONSync('energyLogs', [...existing, { date: new Date().toISOString(), level: sel }]);
    setSaved(true); setTimeout(() => { setSaved(false); setSel(null); }, 2000);
  };
  return (
    <div className="space-y-3 pt-3">
      <div className="grid grid-cols-3 gap-2">
        {levels.map((l) => (
          <button key={l.id} onClick={() => setSel(l.id)} className={cn('p-3 rounded-xl border text-center touch-manipulation active:scale-[0.97] transition-all', sel === l.id ? 'bg-violet-500/20 border-violet-500/30 scale-105' : 'bg-white/[0.03] border-white/[0.06]')}>
            <div className="text-2xl mb-1">{l.emoji}</div>
            <div className="text-[11px] text-white font-medium">{l.label}</div>
          </button>
        ))}
      </div>
      <button onClick={save} disabled={!sel} className="w-full h-11 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-70">{saved ? 'Logged' : 'Log Energy'}</button>
    </div>
  );
};

const AffirmationTool = () => {
  const list = ['I am worthy of love and respect', 'I choose to focus on what I can control', 'I am growing every day', 'My feelings are valid', 'I have strength to overcome challenges', 'I am enough just as I am', 'I deserve happiness and peace', "I'm proud of how far I've come", 'I trust myself to make good decisions', 'I am capable of amazing things', 'I choose to be kind to myself today', 'My best is good enough', 'I am resilient and brave', 'I release what I cannot change', 'I celebrate progress, not perfection'];
  const [text, setText] = useState(list[Math.floor(Math.random() * list.length)]);
  return (
    <div className="space-y-3 pt-3">
      <div className="p-5 rounded-xl bg-purple-500/[0.08] border border-purple-500/15 text-center">
        <p className="text-base font-medium text-white leading-relaxed">"{text}"</p>
      </div>
      <button onClick={() => setText(list[Math.floor(Math.random() * list.length)])} className="w-full h-11 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2">
        <RefreshCw className="h-3.5 w-3.5" /> New Affirmation
      </button>
    </div>
  );
};

const InteractiveToolsTab = () => {
  const [expanded, setExpanded] = useState<string | null>('mood');
  const { moodHistory } = useMentalHealth();
  const today = new Date().toISOString().split('T')[0];
  const hasMoodToday = moodHistory.some((e) => e.date === today);

  const tools = [
    { id: 'mood', title: 'Mood Tracker', sub: hasMoodToday ? "Today's mood logged" : 'How are you feeling?', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/15', badge: hasMoodToday ? undefined : 'Check in', component: <MoodTracker /> },
    { id: 'stress', title: 'Stress Relief', sub: 'Breathing and relaxation exercises', icon: Brain, color: 'text-blue-400', bg: 'bg-blue-500/15', component: <StressManagementTools /> },
    { id: 'bodyscan', title: 'Body Scan', sub: 'Guided body relaxation journey', icon: Scan, color: 'text-cyan-400', bg: 'bg-cyan-500/15', badge: '3 min', component: <BodyScanTool /> },
    { id: 'worry', title: 'Worry Time', sub: '15-min scheduled worry window', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/15', badge: '15 min', component: <WorryTimeTool /> },
    { id: 'gratitude', title: 'Gratitude', sub: "3 things you're grateful for", icon: Smile, color: 'text-emerald-400', bg: 'bg-emerald-500/15', component: <GratitudeTool /> },
    { id: 'energy', title: 'Energy Check', sub: 'Quick energy assessment', icon: Battery, color: 'text-violet-400', bg: 'bg-violet-500/15', component: <EnergyTool /> },
    { id: 'affirmation', title: 'Affirmations', sub: 'Uplifting messages for you', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/15', component: <AffirmationTool /> },
    { id: 'goals', title: 'Goal Setting', sub: 'Track your wellbeing goals', icon: Target, color: 'text-green-400', bg: 'bg-green-500/15', component: <GoalSettingTracker /> },
    { id: 'selfcare', title: 'Self-Care', sub: 'Daily wellness prompts', icon: Bell, color: 'text-amber-400', bg: 'bg-amber-500/15', component: <SelfCareReminders /> },
  ];

  return (
    <div className="space-y-3">
      {/* Quick stats */}
      {moodHistory.length > 0 && (
        <div className="flex items-center gap-0 rounded-2xl bg-white/[0.03] border border-white/[0.06] divide-x divide-white/[0.06]">
          <div className="flex-1 text-center py-3">
            <p className="text-lg font-bold text-white">{moodHistory.length}</p>
            <p className="text-[9px] text-white/70 uppercase">Days Tracked</p>
          </div>
          <div className="flex-1 text-center py-3">
            <p className="text-lg font-bold text-white">{(moodHistory.reduce((s, e) => s + e.mood, 0) / moodHistory.length).toFixed(1)}</p>
            <p className="text-[9px] text-white/70 uppercase">Avg Mood</p>
          </div>
          {hasMoodToday && (
            <div className="flex-1 text-center py-3">
              <p className="text-lg">{['', '😢', '😔', '😐', '🙂', '😊'][moodHistory.find((e) => e.date === today)?.mood || 0]}</p>
              <p className="text-[9px] text-white/70 uppercase">Today</p>
            </div>
          )}
        </div>
      )}

      {/* Tool cards — expandable */}
      {tools.map((t) => {
        const isOpen = expanded === t.id;
        return (
          <div key={t.id} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            <button
              onClick={() => setExpanded(isOpen ? null : t.id)}
              className="w-full flex items-center gap-3 p-3.5 touch-manipulation active:scale-[0.99] transition-all text-left"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', t.bg)}>
                <t.icon className={cn('h-5 w-5', t.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">{t.title}</h3>
                  {t.badge && <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded', t.bg, t.color)}>{t.badge}</span>}
                </div>
                <p className="text-[11px] text-white/80 mt-0.5">{t.sub}</p>
              </div>
              <ChevronDown className={cn('h-4 w-4 text-white/70 transition-transform duration-200 flex-shrink-0', isOpen && 'rotate-180')} />
            </button>
            {isOpen && (
              <div className="px-3.5 pb-4 border-t border-white/[0.04]">
                {t.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveToolsTab;
