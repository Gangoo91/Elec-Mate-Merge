import { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import MoodTracker from '@/components/mental-health/interactive/MoodTracker';
import SelfCareReminders from '@/components/mental-health/interactive/SelfCareReminders';
import StressManagementTools from '@/components/mental-health/interactive/StressManagementTools';
import GoalSettingTracker from '@/components/mental-health/interactive/GoalSettingTracker';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { gratitudeService } from '@/services/mentalHealthService';
import {
  PrimaryButton,
  SecondaryButton,
  inputClass,
  type Tone,
} from '@/components/college/primitives';
import { WB_LIST, WellbeingIntro } from '@/components/mental-health/wellbeingUi';

// ── Inline tools ──────────────────────────────────────────────────────

const BodyScanTool = () => {
  const parts = [
    'Feet & toes',
    'Lower legs',
    'Upper legs & hips',
    'Abdomen',
    'Chest & back',
    'Hands & arms',
    'Shoulders & neck',
    'Face & head',
  ];
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(20);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(
      () =>
        setTime((t) => {
          if (t <= 1) {
            if (step < parts.length - 1) {
              setStep((s) => s + 1);
              return 20;
            }
            setActive(false);
            return 0;
          }
          return t - 1;
        }),
      1000
    );
    return () => clearInterval(i);
  }, [active, step, parts.length]);
  return (
    <div className="space-y-4 pt-4 text-center">
      <p className="text-[13px] font-medium text-white">Focus on: {parts[step]}</p>
      <p className="text-3xl font-semibold tabular-nums text-white">{time}s</p>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400/80 rounded-full transition-all"
          style={{ width: `${((step * 20 + (20 - time)) / (parts.length * 20)) * 100}%` }}
        />
      </div>
      <p className="text-[13px] text-white">
        Step {step + 1} of {parts.length}
      </p>
      <div className="flex gap-2">
        <PrimaryButton
          fullWidth
          disabled={active}
          onClick={() => {
            setStep(0);
            setTime(20);
            setActive(true);
          }}
        >
          {active ? 'Running...' : 'Start'}
        </PrimaryButton>
        <SecondaryButton
          fullWidth
          onClick={() => {
            setActive(false);
            setStep(0);
            setTime(20);
          }}
        >
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
    const i = setInterval(
      () =>
        setTime((t) => {
          if (t <= 1) {
            setActive(false);
            return 0;
          }
          return t - 1;
        }),
      1000
    );
    return () => clearInterval(i);
  }, [active, time]);
  const m = Math.floor(time / 60);
  const s = time % 60;
  return (
    <div className="space-y-4 pt-4 text-center">
      <p className="text-4xl font-semibold tabular-nums text-white">
        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </p>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-400/80 rounded-full transition-all"
          style={{ width: `${((900 - time) / 900) * 100}%` }}
        />
      </div>
      <p className="text-[13px] text-white">
        {!active && time === 900
          ? '15 minutes to process your worries'
          : active
            ? 'Let it out — write, think, pace'
            : "Time's up — let go now"}
      </p>
      <div className="flex gap-2">
        <PrimaryButton
          fullWidth
          onClick={() => {
            if (time === 0) setTime(900);
            setActive(!active);
          }}
        >
          {active ? 'Pause' : time === 900 ? 'Start' : 'Resume'}
        </PrimaryButton>
        <SecondaryButton
          fullWidth
          onClick={() => {
            setActive(false);
            setTime(900);
          }}
        >
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
    // Same store as GratitudeJournal: one entry per day, newest first, cap 30.
    const existing = storageGetJSONSync<{ date: string; items: string[] }[]>(
      'elec-mate-gratitude',
      []
    );
    const today = new Date().toISOString().split('T')[0];
    const todays = existing.find((e) => e.date === today);
    const merged = { date: today, items: [...(todays?.items ?? []), ...valid] };
    storageSetJSONSync(
      'elec-mate-gratitude',
      [merged, ...existing.filter((e) => e.date !== today)].slice(0, 30)
    );
    gratitudeService.syncDay(today, merged.items).catch(() => {});
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setItems(['', '', '']);
    }, 2000);
  };
  return (
    <div className="space-y-3 pt-4">
      {items.map((g, i) => (
        <input
          key={i}
          value={g}
          onChange={(e) => {
            const n = [...items];
            n[i] = e.target.value;
            setItems(n);
          }}
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
    { id: 'low', label: 'Low' },
    { id: 'medium', label: 'Medium' },
    { id: 'high', label: 'High' },
  ];
  const save = () => {
    if (!sel) return;
    const existing = storageGetJSONSync<any[]>('energyLogs', []);
    storageSetJSONSync('energyLogs', [...existing, { date: new Date().toISOString(), level: sel }]);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setSel(null);
    }, 2000);
  };
  return (
    <div className="space-y-3 pt-4">
      {/* A choice of three: one joined toggle, the chosen one white. */}
      <div
        className="flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5"
        role="group"
        aria-label="Energy"
      >
        {levels.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={sel === l.id}
            onClick={() => setSel(l.id)}
            className={cn(
              'inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-[10px] text-[14px] font-semibold transition-colors touch-manipulation',
              sel === l.id ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]'
            )}
          >
            {l.label}
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
  const list = [
    'I am worthy of love and respect',
    'I choose to focus on what I can control',
    'I am growing every day',
    'My feelings are valid',
    'I have strength to overcome challenges',
    'I am enough just as I am',
    'I deserve happiness and peace',
    "I'm proud of how far I've come",
    'I trust myself to make good decisions',
    'I am capable of amazing things',
    'I choose to be kind to myself today',
    'My best is good enough',
    'I am resilient and brave',
    'I release what I cannot change',
    'I celebrate progress, not perfection',
  ];
  const [text, setText] = useState(list[Math.floor(Math.random() * list.length)]);
  return (
    <div className="space-y-3 pt-4">
      <div className="rounded-2xl card-surface p-5">
        <p className="text-[16px] font-medium leading-relaxed text-white">“{text}”</p>
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
    {
      id: 'mood',
      title: 'Mood tracker',
      sub: hasMoodToday ? "Today's mood logged" : 'How are you feeling?',
      tone: 'red',
      badge: hasMoodToday ? undefined : 'Check in',
      component: <MoodTracker />,
    },
    {
      id: 'stress',
      title: 'Stress relief',
      sub: 'Breathing and relaxation exercises',
      tone: 'blue',
      component: <StressManagementTools />,
    },
    {
      id: 'bodyscan',
      title: 'Body scan',
      sub: 'Guided body relaxation journey',
      tone: 'cyan',
      badge: '3 min',
      component: <BodyScanTool />,
    },
    {
      id: 'worry',
      title: 'Worry time',
      sub: '15-min scheduled worry window',
      tone: 'orange',
      badge: '15 min',
      component: <WorryTimeTool />,
    },
    {
      id: 'gratitude',
      title: 'Gratitude',
      sub: "3 things you're grateful for",
      tone: 'emerald',
      component: <GratitudeTool />,
    },
    {
      id: 'energy',
      title: 'Energy check',
      sub: 'Quick energy assessment',
      tone: 'indigo',
      component: <EnergyTool />,
    },
    {
      id: 'affirmation',
      title: 'Affirmations',
      sub: 'Uplifting messages for you',
      tone: 'purple',
      component: <AffirmationTool />,
    },
    {
      id: 'goals',
      title: 'Goal setting',
      sub: 'Track your wellbeing goals',
      tone: 'green',
      component: <GoalSettingTracker />,
    },
    {
      id: 'selfcare',
      title: 'Self-care',
      sub: 'Daily wellness prompts',
      tone: 'amber',
      component: <SelfCareReminders />,
    },
  ];

  const avgMood =
    moodHistory.length > 0
      ? (moodHistory.reduce((s, e) => s + e.mood, 0) / moodHistory.length).toFixed(1)
      : '0';
  const todayWord = hasMoodToday
    ? ['', 'Struggling', 'Low', 'Okay', 'Good', 'Great'][
        moodHistory.find((e) => e.date === today)?.mood || 0
      ]
    : 'Not yet';

  return (
    <div className="space-y-6 sm:space-y-8">
      <WellbeingIntro
        label="Tools"
        title="Interactive wellbeing"
        description="Quick exercises and check-ins. Tap one to open it here."
      />

      {/* One status line of figures (10 Oct): bold number, plain word. */}
      {moodHistory.length > 0 && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13.5px] text-white sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
          {[
            {
              n: String(moodHistory.length),
              label: moodHistory.length === 1 ? 'day tracked' : 'days tracked',
            },
            { n: avgMood, label: 'average mood out of 5' },
            { n: todayWord, label: 'today' },
          ].map((f, i) => (
            <div key={f.label} className="flex min-w-0 items-baseline gap-1.5">
              {i > 0 && (
                <span
                  aria-hidden
                  className="mr-3.5 hidden h-3.5 w-px self-center bg-white/[0.18] sm:block"
                />
              )}
              <dt className="text-[17px] font-semibold tabular-nums text-white">{f.n}</dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className={WB_LIST}>
        {tools.map((t) => {
          const isOpen = expanded === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : t.id)}
                className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[15px] font-semibold text-white">{t.title}</span>
                    {t.badge && (
                      <span className="text-[13px] font-medium text-elec-yellow">{t.badge}</span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[13px] leading-snug text-white">{t.sub}</div>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-white transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                  strokeWidth={1.75}
                />
              </button>
              {isOpen && <div className="px-5 pb-5 sm:px-6">{t.component}</div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InteractiveToolsTab;
