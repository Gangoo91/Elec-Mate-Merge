import { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import MoodTracker from '@/components/mental-health/interactive/MoodTracker';
import SelfCareReminders from '@/components/mental-health/interactive/SelfCareReminders';
import StressManagementTools from '@/components/mental-health/interactive/StressManagementTools';
import GoalSettingTracker from '@/components/mental-health/interactive/GoalSettingTracker';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import {
  PageHero,
  StatStrip,
  PrimaryButton,
  SecondaryButton,
  Pill,
  Eyebrow,
  inputClass,
  type Tone,
} from '@/components/college/primitives';

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
    <div className="space-y-4 pt-4 text-center">
      <p className="text-[13px] font-medium text-white">Focus on: {parts[step]}</p>
      <p className="text-3xl font-semibold tabular-nums text-cyan-400">{time}s</p>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${((step * 20 + (20 - time)) / (parts.length * 20)) * 100}%` }} />
      </div>
      <p className="text-[11px] text-white">Step {step + 1} of {parts.length}</p>
      <div className="flex gap-2">
        <PrimaryButton fullWidth disabled={active} onClick={() => { setStep(0); setTime(20); setActive(true); }}>
          {active ? 'Running...' : 'Start'}
        </PrimaryButton>
        <SecondaryButton fullWidth onClick={() => { setActive(false); setStep(0); setTime(20); }}>
          Reset
        </SecondaryButton>
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
  const m = Math.floor(time / 60);
  const s = time % 60;
  return (
    <div className="space-y-4 pt-4 text-center">
      <p className="text-4xl font-semibold tabular-nums text-orange-400">
        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </p>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${((900 - time) / 900) * 100}%` }} />
      </div>
      <p className="text-[12px] text-white">
        {!active && time === 900 ? '15 minutes to process your worries' : active ? 'Let it out — write, think, pace' : "Time's up — let go now"}
      </p>
      <div className="flex gap-2">
        <PrimaryButton fullWidth onClick={() => { if (time === 0) setTime(900); setActive(!active); }}>
          {active ? 'Pause' : time === 900 ? 'Start' : 'Resume'}
        </PrimaryButton>
        <SecondaryButton fullWidth onClick={() => { setActive(false); setTime(900); }}>
          Reset
        </SecondaryButton>
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
    <div className="space-y-3 pt-4">
      {items.map((g, i) => (
        <input
          key={i}
          value={g}
          onChange={(e) => { const n = [...items]; n[i] = e.target.value; setItems(n); }}
          placeholder={`I'm grateful for...`}
          className={inputClass}
          style={{ fontSize: '16px' }}
        />
      ))}
      <PrimaryButton fullWidth disabled={items.every((g) => !g.trim())} onClick={save}>
        {saved ? 'Saved' : 'Save gratitudes'}
      </PrimaryButton>
    </div>
  );
};

const EnergyTool = () => {
  const [sel, setSel] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const levels = [
    { id: 'low', emoji: '🪫', label: 'Low' },
    { id: 'medium', emoji: '🔋', label: 'Medium' },
    { id: 'high', emoji: '⚡', label: 'High' },
  ];
  const save = () => {
    if (!sel) return;
    const existing = storageGetJSONSync<any[]>('energyLogs', []);
    storageSetJSONSync('energyLogs', [...existing, { date: new Date().toISOString(), level: sel }]);
    setSaved(true);
    setTimeout(() => { setSaved(false); setSel(null); }, 2000);
  };
  return (
    <div className="space-y-3 pt-4">
      <div className="grid grid-cols-3 gap-2">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => setSel(l.id)}
            className={cn(
              'p-3 rounded-2xl border text-center touch-manipulation active:scale-[0.97] transition-all',
              sel === l.id
                ? 'bg-elec-yellow/10 border-elec-yellow/30'
                : 'bg-[hsl(0_0%_12%)] border-white/[0.08]'
            )}
          >
            <div className="text-2xl mb-1">{l.emoji}</div>
            <div className="text-[12px] text-white font-medium">{l.label}</div>
          </button>
        ))}
      </div>
      <PrimaryButton fullWidth disabled={!sel} onClick={save}>
        {saved ? 'Logged' : 'Log energy'}
      </PrimaryButton>
    </div>
  );
};

const AffirmationTool = () => {
  const list = ['I am worthy of love and respect', 'I choose to focus on what I can control', 'I am growing every day', 'My feelings are valid', 'I have strength to overcome challenges', 'I am enough just as I am', 'I deserve happiness and peace', "I'm proud of how far I've come", 'I trust myself to make good decisions', 'I am capable of amazing things', 'I choose to be kind to myself today', 'My best is good enough', 'I am resilient and brave', 'I release what I cannot change', 'I celebrate progress, not perfection'];
  const [text, setText] = useState(list[Math.floor(Math.random() * list.length)]);
  return (
    <div className="space-y-3 pt-4">
      <div className="p-5 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-center">
        <p className="text-[15px] font-medium text-white leading-relaxed">"{text}"</p>
      </div>
      <SecondaryButton
        fullWidth
        onClick={() => setText(list[Math.floor(Math.random() * list.length)])}
      >
        <RefreshCw className="h-3.5 w-3.5 mr-2" /> New affirmation
      </SecondaryButton>
    </div>
  );
};

const InteractiveToolsTab = () => {
  const [expanded, setExpanded] = useState<string | null>('mood');
  const { moodHistory } = useMentalHealth();
  const today = new Date().toISOString().split('T')[0];
  const hasMoodToday = moodHistory.some((e) => e.date === today);

  type Tool = {
    id: string;
    title: string;
    sub: string;
    tone: Tone;
    badge?: string;
    component: JSX.Element;
  };

  const tools: Tool[] = [
    { id: 'mood', title: 'Mood tracker', sub: hasMoodToday ? "Today's mood logged" : 'How are you feeling?', tone: 'red', badge: hasMoodToday ? undefined : 'Check in', component: <MoodTracker /> },
    { id: 'stress', title: 'Stress relief', sub: 'Breathing and relaxation exercises', tone: 'blue', component: <StressManagementTools /> },
    { id: 'bodyscan', title: 'Body scan', sub: 'Guided body relaxation journey', tone: 'cyan', badge: '3 min', component: <BodyScanTool /> },
    { id: 'worry', title: 'Worry time', sub: '15-min scheduled worry window', tone: 'orange', badge: '15 min', component: <WorryTimeTool /> },
    { id: 'gratitude', title: 'Gratitude', sub: "3 things you're grateful for", tone: 'emerald', component: <GratitudeTool /> },
    { id: 'energy', title: 'Energy check', sub: 'Quick energy assessment', tone: 'indigo', component: <EnergyTool /> },
    { id: 'affirmation', title: 'Affirmations', sub: 'Uplifting messages for you', tone: 'purple', component: <AffirmationTool /> },
    { id: 'goals', title: 'Goal setting', sub: 'Track your wellbeing goals', tone: 'green', component: <GoalSettingTracker /> },
    { id: 'selfcare', title: 'Self-care', sub: 'Daily wellness prompts', tone: 'amber', component: <SelfCareReminders /> },
  ];

  const avgMood =
    moodHistory.length > 0
      ? (moodHistory.reduce((s, e) => s + e.mood, 0) / moodHistory.length).toFixed(1)
      : '0';
  const todayEmoji = hasMoodToday
    ? ['', '😢', '😔', '😐', '🙂', '😊'][moodHistory.find((e) => e.date === today)?.mood || 0]
    : '–';

  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHero
        eyebrow="Tools"
        title="Interactive wellbeing"
        description="Quick exercises and check-ins. Tap any card to expand and use it inline."
        tone="purple"
      />

      {moodHistory.length > 0 && (
        <StatStrip
          columns={3}
          stats={[
            { label: 'Days tracked', value: moodHistory.length },
            { label: 'Avg mood', value: avgMood },
            { label: 'Today', value: todayEmoji },
          ]}
        />
      )}

      <div className="space-y-3">
        <Eyebrow>{tools.length} tools</Eyebrow>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
          {tools.map((t) => {
            const isOpen = expanded === t.id;
            return (
              <div key={t.id}>
                <button
                  onClick={() => setExpanded(isOpen ? null : t.id)}
                  className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'w-[3px] h-10 rounded-full shrink-0',
                      t.tone === 'red' && 'bg-red-400',
                      t.tone === 'blue' && 'bg-blue-400',
                      t.tone === 'cyan' && 'bg-cyan-400',
                      t.tone === 'orange' && 'bg-orange-400',
                      t.tone === 'emerald' && 'bg-emerald-400',
                      t.tone === 'indigo' && 'bg-indigo-400',
                      t.tone === 'purple' && 'bg-purple-400',
                      t.tone === 'green' && 'bg-green-400',
                      t.tone === 'amber' && 'bg-amber-400'
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-[15px] font-medium text-white truncate">
                        {t.title}
                      </span>
                      {t.badge && <Pill tone={t.tone}>{t.badge}</Pill>}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-white truncate">{t.sub}</div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 border-t border-white/[0.04]">
                    {t.component}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteractiveToolsTab;
