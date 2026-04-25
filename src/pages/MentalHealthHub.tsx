import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Flame, Lock, Phone, RefreshCw, Send } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { MentalHealthProvider } from '@/contexts/MentalHealthContext';
import { useMoodData } from '@/hooks/useMentalHealthSync';
import { useWellbeingScore } from '@/hooks/useWellbeingScore';
import { useWellbeingInsights } from '@/hooks/useWellbeingInsights';
import { cn } from '@/lib/utils';

import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListRow,
  HubGrid,
  HubCard,
  Pill,
  Eyebrow,
  EmptyState,
  type Tone,
} from '@/components/college/primitives';

import BreathingExercise from '@/components/mental-health/BreathingExercise';
import QuickMoodCheck from '@/components/mental-health/QuickMoodCheck';
import GratitudeJournal from '@/components/mental-health/GratitudeJournal';
import WellbeingJournal from '@/components/mental-health/journal/WellbeingJournal';
import GroundingExercises from '@/components/mental-health/exercises/GroundingExercises';
import QuickCopingToolkit from '@/components/mental-health/QuickCopingToolkit';
import SleepTracker from '@/components/mental-health/SleepTracker';
import MoodInsights from '@/components/mental-health/MoodInsights';
import PersonalSafetyPlan from '@/components/mental-health/safety/PersonalSafetyPlan';
import { PeerSupportHub } from '@/components/mental-health/peer-support';
import ResourcesLibraryTab from '@/components/mental-health/tabs/ResourcesLibraryTab';
import InteractiveToolsTab from '@/components/mental-health/tabs/InteractiveToolsTab';
import SupportNetworkTab from '@/components/mental-health/tabs/SupportNetworkTab';
import CrisisResourcesTab from '@/components/mental-health/tabs/CrisisResourcesTab';
import PodcastsTab from '@/components/mental-health/podcasts/PodcastsTab';
import DailyAffirmation from '@/components/mental-health/DailyAffirmation';
import { recordCrisisEvent } from '@/services/mentalHealthService';

/* ── Wellbeing ring (re-uses the ComplianceRing pattern) ───────────── */

function WellbeingRing({
  score,
  band,
  size = 56,
}: {
  score: number;
  band: 'critical' | 'low' | 'fair' | 'good' | 'great';
  size?: number;
}) {
  const stroke =
    band === 'great'
      ? 'hsl(var(--elec-yellow))'
      : band === 'good'
        ? '#34d399'
        : band === 'fair'
          ? '#fbbf24'
          : band === 'low'
            ? '#fb923c'
            : '#f87171';
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} className="shrink-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill={stroke}
          fontSize={size * 0.3}
          fontWeight="700"
        >
          {score}
        </text>
      </svg>
      <div className="flex flex-col items-start">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Wellbeing
        </span>
        <span className="text-[12px] text-white capitalize">{band}</span>
      </div>
    </div>
  );
}

/* ── Crisis card (sticky-able, one-tap dial/text) ──────────────────── */

// One-shot haptic for crisis taps. Fails silently if the browser doesn't
// support it (desktop, older Safari) — never blocks the dial intent.
const buzz = (ms = 30) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
};

function CrisisCard({ onCallLogged }: { onCallLogged: (label: string) => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-500/[0.08] via-rose-500/[0.04] to-transparent p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red-500/70 via-rose-400/70 to-red-500/70 opacity-70" />
      <div className="flex items-center gap-2 mb-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <Eyebrow>Need help right now?</Eyebrow>
      </div>
      <p className="text-[13px] sm:text-sm text-white leading-relaxed mb-4 max-w-2xl">
        Free, confidential, 24/7. None of these calls leave a record on your account beyond a
        private "checking-in" reminder for you tomorrow.
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href="tel:116123"
          onClick={() => {
            buzz(40);
            onCallLogged('Samaritans 116 123');
          }}
          className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-red-500/20 border border-red-500/35 text-red-300 text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
        >
          <Phone className="h-3.5 w-3.5" /> Call 116 123
        </a>
        <a
          href="sms:85258?body=SHOUT"
          onClick={() => {
            buzz(40);
            onCallLogged('SHOUT 85258');
          }}
          className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[13px] font-medium touch-manipulation active:scale-[0.98]"
        >
          <Send className="h-3.5 w-3.5" /> Text SHOUT to 85258
        </a>
        <a
          href="tel:999"
          onClick={() => {
            buzz(60);
            onCallLogged('999 Emergency');
          }}
          className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-white/[0.04] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation active:scale-[0.98]"
        >
          <Phone className="h-3.5 w-3.5" /> 999 emergency
        </a>
      </div>
    </div>
  );
}

/* ── Today's mood quick-pill row ───────────────────────────────────── */

const moodPills: { value: number; emoji: string; label: string; tone: Tone }[] = [
  { value: 1, emoji: '😞', label: 'Low', tone: 'red' },
  { value: 2, emoji: '😕', label: 'Off', tone: 'orange' },
  { value: 3, emoji: '😐', label: 'OK', tone: 'amber' },
  { value: 4, emoji: '🙂', label: 'Good', tone: 'emerald' },
  { value: 5, emoji: '😄', label: 'Great', tone: 'yellow' },
];

function timeAwareGreeting(hasLoggedToday: boolean) {
  const h = new Date().getHours();
  if (hasLoggedToday) {
    if (h < 12) return 'How is the morning going?';
    if (h < 17) return 'How is the day landing?';
    if (h < 22) return 'How is the evening so far?';
    return 'How is the night?';
  }
  if (h < 12) return 'Morning. How are you starting today?';
  if (h < 17) return 'Afternoon. How are you doing?';
  if (h < 22) return 'Evening. How is the day landing?';
  return 'Late night. How are you holding up?';
}

function TodayMoodRow({
  todaysMood,
  onLog,
  onOpen,
}: {
  todaysMood: number | null;
  onLog: (mood: number) => void;
  onOpen: () => void;
}) {
  return (
    <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <Eyebrow>Today</Eyebrow>
          <div className="mt-1 text-[18px] sm:text-[20px] font-semibold text-white leading-snug">
            {timeAwareGreeting(todaysMood !== null)}
          </div>
        </div>
        <button
          onClick={onOpen}
          className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation shrink-0"
        >
          Notes →
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {moodPills.map((p) => {
          const selected = todaysMood === p.value;
          return (
            <button
              key={p.value}
              onClick={() => {
                buzz(20);
                onLog(p.value);
              }}
              className={cn(
                'group flex flex-col items-center gap-1 py-3 rounded-xl border transition-all touch-manipulation active:scale-[0.94]',
                selected
                  ? 'bg-elec-yellow/15 border-elec-yellow/40'
                  : 'bg-[hsl(0_0%_9%)] border-white/[0.08] hover:bg-[hsl(0_0%_11%)]'
              )}
            >
              <span className="text-[22px] leading-none">{p.emoji}</span>
              <span className="text-[10.5px] font-medium text-white">{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── 7-day mood heatmap (small editorial strip) ───────────────────── */

function MoodHeatmap({
  moodHistory,
  onTap,
}: {
  moodHistory: { date: string; mood: number }[];
  onTap: () => void;
}) {
  const days = useMemo(() => {
    const out: { key: string; label: string; mood: number | null }[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const found = moodHistory.find((m) => m.date === key);
      out.push({
        key,
        label: d.toLocaleDateString('en-GB', { weekday: 'narrow' }),
        mood: found?.mood ?? null,
      });
    }
    return out;
  }, [moodHistory]);

  const moodColour = (m: number | null) => {
    if (m === null) return 'bg-white/[0.04] border-white/[0.06]';
    if (m <= 1) return 'bg-red-500/30 border-red-500/40';
    if (m <= 2) return 'bg-orange-500/30 border-orange-500/40';
    if (m <= 3) return 'bg-amber-500/30 border-amber-500/40';
    if (m <= 4) return 'bg-emerald-500/30 border-emerald-500/40';
    return 'bg-elec-yellow/40 border-elec-yellow/50';
  };

  return (
    <button
      onClick={onTap}
      className="w-full rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4 sm:p-5 text-left touch-manipulation hover:bg-[hsl(0_0%_14%)] transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <Eyebrow>Last 7 days</Eyebrow>
        <span className="text-[11px] text-white">Tap for insights →</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <div key={d.key} className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                'h-9 w-full rounded-lg border transition-colors',
                moodColour(d.mood)
              )}
              aria-label={d.mood ? `Mood ${d.mood}/5 on ${d.key}` : `No log on ${d.key}`}
            />
            <span className="text-[10px] text-white">{d.label}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

/* ── Streak pill (consecutive days with any check-in) ─────────────── */

function calcStreak(moodHistory: { date: string }[]): number {
  if (moodHistory.length === 0) return 0;
  const dates = new Set(moodHistory.map((m) => m.date));
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    if (dates.has(key)) streak += 1;
    else if (streak > 0) break;
    else if (i > 0) break;
  }
  return streak;
}

/* ── Toolkit cards — role-aware ───────────────────────────────────── */

interface ToolCard {
  id: string;
  title: string;
  description: string;
  meta?: string;
  tone: Tone;
  number: string;
}

const buildToolkit = (role: string | null | undefined): ToolCard[] => {
  const isApprentice = role === 'apprentice';
  const cards: ToolCard[] = [
    {
      id: 'tools',
      title: 'Interactive Tools',
      description: 'Breathing, grounding and focus tools.',
      tone: 'yellow',
      number: '01',
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Trusted guides and self-help links.',
      tone: 'blue',
      number: '02',
    },
    {
      id: 'support',
      title: 'Support Network',
      description: 'Charities, peer groups and helplines.',
      tone: 'purple',
      number: '03',
    },
    {
      id: 'podcasts',
      title: 'Podcasts',
      description: 'Long-form support from people in the trade.',
      tone: 'orange',
      number: '04',
    },
  ];

  if (isApprentice) {
    cards.unshift(
      {
        id: 'journal',
        title: 'Wellbeing Journal',
        description: 'Track thoughts, gratitude and triggers.',
        tone: 'emerald',
        number: '01',
      },
      {
        id: 'safety-plan',
        title: 'My Safety Plan',
        description: 'A personal plan for difficult moments.',
        tone: 'red',
        number: '02',
      },
      {
        id: 'sleep',
        title: 'Sleep Tracker',
        description: 'See how rest affects your wellbeing.',
        tone: 'indigo',
        number: '03',
      },
      {
        id: 'insights',
        title: 'Mood Insights',
        description: 'Spot patterns early.',
        tone: 'cyan',
        number: '04',
      }
    );
    // renumber
    cards.forEach((c, i) => (c.number = String(i + 1).padStart(2, '0')));
  }

  return cards;
};

/* ── Trade-specific support (role-aware ranker) ───────────────────── */

interface TradeSupport {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  ctaLabel: string;
  isPhone: boolean;
  audiences: ('apprentice' | 'electrician' | 'employer' | 'all')[];
}

const ALL_TRADE_SUPPORT: TradeSupport[] = [
  {
    id: 'eic',
    title: 'Electrical Industries Charity',
    subtitle:
      'Free, confidential support for everyone in the electrical industry — including financial assistance.',
    href: 'tel:08006521618',
    ctaLabel: '0800 652 1618',
    isPhone: true,
    audiences: ['electrician', 'apprentice', 'employer', 'all'],
  },
  {
    id: 'lighthouse',
    title: 'Lighthouse Construction Industry Charity',
    subtitle: '24/7 helpline for construction and trades. Mental health, financial, legal.',
    href: 'tel:03456051956',
    ctaLabel: '0345 605 1956',
    isPhone: true,
    audiences: ['electrician', 'apprentice', 'employer', 'all'],
  },
  {
    id: 'mates-in-mind',
    title: 'Mates in Mind',
    subtitle: 'Workplace mental health for construction. Training and resources for crews.',
    href: 'https://www.matesinmind.org/',
    ctaLabel: 'Visit',
    isPhone: false,
    audiences: ['employer', 'electrician', 'all'],
  },
  {
    id: 'youngminds',
    title: 'YoungMinds',
    subtitle: 'Free, confidential mental health support for young people.',
    href: 'tel:08004541111',
    ctaLabel: '0800 454 1111',
    isPhone: true,
    audiences: ['apprentice'],
  },
  {
    id: 'andys-man-club',
    title: "Andy's Man Club",
    subtitle: 'Free peer-to-peer talking groups for men. Meets every Monday 7pm.',
    href: 'https://andysmanclub.co.uk/',
    ctaLabel: 'Visit',
    isPhone: false,
    audiences: ['electrician', 'apprentice', 'employer', 'all'],
  },
];

const rankTradeSupport = (role: string | null | undefined): TradeSupport[] => {
  const r = role ?? 'all';
  const order: Record<string, string[]> = {
    apprentice: ['youngminds', 'eic', 'lighthouse', 'andys-man-club', 'mates-in-mind'],
    employer: ['mates-in-mind', 'lighthouse', 'eic', 'andys-man-club'],
    electrician: ['eic', 'lighthouse', 'andys-man-club', 'mates-in-mind'],
    all: ['eic', 'lighthouse', 'mates-in-mind', 'andys-man-club'],
  };
  const ids = order[r] ?? order.all;
  return ids
    .map((id) => ALL_TRADE_SUPPORT.find((t) => t.id === id))
    .filter((t): t is TradeSupport => Boolean(t))
    .filter((t) => t.audiences.includes(r as TradeSupport['audiences'][number]) || t.audiences.includes('all'));
};

/* ── Quick reset row ───────────────────────────────────────────────── */

interface QuickAction {
  id: string;
  label: string;
  sub: string;
  tone: Tone;
}

const quickActions: QuickAction[] = [
  { id: 'breathing', label: 'Breathe', sub: '2-min reset', tone: 'blue' },
  { id: 'mood', label: 'Check in', sub: 'How you feel', tone: 'emerald' },
  { id: 'gratitude', label: 'Journal', sub: 'One good thing', tone: 'amber' },
  { id: 'talk', label: 'Talk', sub: 'Peer support', tone: 'purple' },
];

/* ── Main page ─────────────────────────────────────────────────────── */

export default function MentalHealthHub() {
  const { profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('section') || null;

  const role = profile?.role ?? null;

  const setActiveSection = (section: string | null) => {
    if (section) setSearchParams({ section }, { replace: false });
    else {
      searchParams.delete('section');
      setSearchParams(searchParams, { replace: false });
    }
  };

  const { moodHistory, addMoodEntry, refreshMoodData } = useMoodData();
  const { score, band, pillars, isLoading: scoreLoading } = useWellbeingScore();
  const { insights } = useWellbeingInsights();

  const todayKey = new Date().toISOString().split('T')[0];
  const todaysMood = useMemo(() => {
    const t = moodHistory.find((m) => m.date === todayKey);
    return t?.mood ?? null;
  }, [moodHistory, todayKey]);

  const streak = useMemo(() => calcStreak(moodHistory), [moodHistory]);
  // Trade-support ranking — must be a top-level hook (was sitting after the
  // section-active early return below, which violated the rules-of-hooks
  // and intermittently crashed with "rendered fewer hooks than expected").
  const tradeSupport = useMemo(() => rankTradeSupport(role), [role]);
  const isFirstRun = !scoreLoading && moodHistory.length === 0;

  // Brief success flash after a mood is logged. Renders a tiny checkmark over
  // the mood row so the user feels the action completed without a toast.
  const [flashSuccess, setFlashSuccess] = useState(false);

  const onLogMood = async (mood: number) => {
    await addMoodEntry({
      date: todayKey,
      mood,
    });
    setFlashSuccess(true);
    setTimeout(() => setFlashSuccess(false), 700);
  };

  const onCallLogged = (label: string) => {
    recordCrisisEvent({ kind: 'call', label }).catch(() => {
      /* private follow-up is best-effort; failure must never disrupt the call */
    });
  };

  // Sticky bottom crisis bar appears once user scrolls past the crisis card.
  const [showStickyCrisis, setShowStickyCrisis] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowStickyCrisis(window.scrollY > 360);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section renderer ───────────────────────────────────── */

  if (activeSection) {
    const BackBtn = () => (
      <button
        onClick={() => setActiveSection(null)}
        className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Back to hub
      </button>
    );

    let body: React.ReactNode = null;
    switch (activeSection) {
      case 'breathing':
        body = <BreathingExercise onClose={() => setActiveSection(null)} />;
        break;
      case 'mood':
        body = (
          <QuickMoodCheck
            onClose={() => setActiveSection(null)}
            onOpenSupport={() => setActiveSection('talk')}
            onOpenCrisis={() => setActiveSection('crisis')}
          />
        );
        break;
      case 'gratitude':
        body = <GratitudeJournal onClose={() => setActiveSection(null)} />;
        break;
      case 'talk':
        body = <PeerSupportHub onClose={() => setActiveSection(null)} />;
        break;
      case 'journal':
        body = (
          <>
            <BackBtn />
            <WellbeingJournal />
          </>
        );
        break;
      case 'grounding':
        body = (
          <>
            <BackBtn />
            <GroundingExercises />
          </>
        );
        break;
      case 'coping':
        body = (
          <>
            <BackBtn />
            <QuickCopingToolkit />
          </>
        );
        break;
      case 'sleep':
        body = (
          <>
            <BackBtn />
            <SleepTracker />
          </>
        );
        break;
      case 'insights':
        body = (
          <>
            <BackBtn />
            <MoodInsights />
          </>
        );
        break;
      case 'safety-plan':
        body = (
          <>
            <BackBtn />
            <PersonalSafetyPlan />
          </>
        );
        break;
      case 'tools':
        body = (
          <>
            <BackBtn />
            <InteractiveToolsTab />
          </>
        );
        break;
      case 'resources':
        body = (
          <>
            <BackBtn />
            <ResourcesLibraryTab />
          </>
        );
        break;
      case 'support':
        body = (
          <>
            <BackBtn />
            <SupportNetworkTab />
          </>
        );
        break;
      case 'crisis':
        body = (
          <>
            <BackBtn />
            <CrisisResourcesTab />
          </>
        );
        break;
      case 'podcasts':
        body = (
          <>
            <BackBtn />
            <PodcastsTab />
          </>
        );
        break;
      default:
        body = (
          <EmptyState title="Section not found" action="Back to hub" onAction={() => setActiveSection(null)} />
        );
    }

    return (
      <MentalHealthProvider>
        <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white px-4 sm:px-6 lg:px-8 py-4 pb-24">
          {body}
        </div>
      </MentalHealthProvider>
    );
  }

  /* ── Hub landing ───────────────────────────────────────────────── */

  const toolkit = buildToolkit(role);

  return (
    <MentalHealthProvider>
      <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
          <PageFrame>
            <PageHero
              eyebrow="Wellbeing"
              title="Mental health"
              description="A private space — for resets, real talk, and patterns over time."
              tone="purple"
              actions={
                <>
                  {!scoreLoading && <WellbeingRing score={score} band={band} />}
                  {streak >= 2 && (
                    <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-elec-yellow/10 border border-elec-yellow/25 text-elec-yellow text-[12px] font-semibold">
                      <Flame className="h-3.5 w-3.5" />
                      {streak}-day streak
                    </span>
                  )}
                  <button
                    onClick={() => refreshMoodData()}
                    aria-label="Refresh"
                    className="h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </>
              }
            />

            {/* Crisis — always visible */}
            <CrisisCard onCallLogged={onCallLogged} />

            {/* First-run hero — overrides the today/heatmap rows when no data */}
            {isFirstRun ? (
              <div className="rounded-2xl bg-gradient-to-br from-elec-yellow/[0.08] via-purple-500/[0.04] to-transparent border border-elec-yellow/20 p-6 sm:p-8 text-center">
                <Eyebrow>Start here</Eyebrow>
                <div className="mt-2 text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                  Take 30 seconds — log how you feel today
                </div>
                <p className="mt-2 text-[13px] sm:text-sm text-white max-w-md mx-auto leading-relaxed">
                  One tap is all it takes. The more you log, the better we can spot what helps and
                  what drags you down.
                </p>
                <div className="mt-6 grid grid-cols-5 gap-2 max-w-sm mx-auto">
                  {moodPills.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => {
                        buzz(20);
                        onLogMood(p.value);
                      }}
                      className="flex flex-col items-center gap-1 py-3 rounded-xl border bg-[hsl(0_0%_9%)] border-white/[0.08] hover:bg-[hsl(0_0%_11%)] active:scale-[0.94] transition-all touch-manipulation"
                    >
                      <span className="text-[26px] leading-none">{p.emoji}</span>
                      <span className="text-[10.5px] font-medium text-white">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Today mood pill row */}
                <div className="relative">
                  <TodayMoodRow
                    todaysMood={todaysMood}
                    onLog={onLogMood}
                    onOpen={() => setActiveSection('mood')}
                  />
                  {flashSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="h-14 w-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-in zoom-in duration-200">
                        <span className="text-[28px] leading-none font-semibold text-emerald-400">
                          ✓
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 7-day mood heatmap */}
                <MoodHeatmap
                  moodHistory={moodHistory}
                  onTap={() => setActiveSection('insights')}
                />
              </>
            )}

            {/* Smart insights — only when something to say */}
            {insights.length > 0 && (
              <ListCard>
                <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-indigo-400/70 opacity-70" />
                  <div className="text-[13px] font-semibold text-white">Patterns we've noticed</div>
                </div>
                <div>
                  {insights.map((i) => (
                    <ListRow
                      key={i.id}
                      lead={
                        <span
                          className={cn(
                            'h-2 w-2 rounded-full block shrink-0',
                            i.tone === 'red' && 'bg-red-400',
                            i.tone === 'orange' && 'bg-orange-400',
                            i.tone === 'amber' && 'bg-amber-400',
                            i.tone === 'blue' && 'bg-blue-400',
                            i.tone === 'emerald' && 'bg-emerald-400',
                            i.tone === 'purple' && 'bg-purple-400'
                          )}
                        />
                      }
                      title={i.title}
                      subtitle={i.body}
                      trailing={
                        i.cta ? (
                          <span className="text-[12px] font-medium text-elec-yellow">
                            {i.cta.label} →
                          </span>
                        ) : undefined
                      }
                      onClick={i.cta ? () => setActiveSection(i.cta!.sectionId) : undefined}
                    />
                  ))}
                </div>
              </ListCard>
            )}

            {/* Quick reset row */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <Eyebrow>Quick reset</Eyebrow>
                <span className="text-[10.5px] text-white">No data needed — just tap one</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl overflow-hidden">
                {quickActions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveSection(q.id)}
                    className="bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-colors px-4 py-5 text-left touch-manipulation"
                  >
                    <div className="text-[14px] font-semibold text-white">{q.label}</div>
                    <div className="mt-0.5 text-[11.5px] text-white">{q.sub}</div>
                    <div
                      className={cn(
                        'mt-3 text-[12px] font-medium',
                        q.tone === 'blue' && 'text-blue-400',
                        q.tone === 'emerald' && 'text-emerald-400',
                        q.tone === 'amber' && 'text-amber-400',
                        q.tone === 'purple' && 'text-purple-400'
                      )}
                    >
                      Open →
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily affirmation */}
            <DailyAffirmation />

            {/* Stat strip — wellbeing pillars */}
            {!scoreLoading && (pillars.mood.n > 0 || pillars.sleep.n > 0 || pillars.journal.n > 0) && (
              <StatStrip
                columns={4}
                stats={[
                  {
                    label: 'Mood 7d',
                    value: pillars.mood.n > 0 ? pillars.mood.avg.toFixed(1) : '—',
                    sub: pillars.mood.n > 0 ? `${pillars.mood.n} check-ins` : 'Log to track',
                  },
                  {
                    label: 'Sleep 7d',
                    value: pillars.sleep.n > 0 ? `${pillars.sleep.avgHours.toFixed(1)}h` : '—',
                    sub: pillars.sleep.n > 0 ? `${pillars.sleep.n} nights` : 'Open tracker',
                  },
                  {
                    label: 'Journal 7d',
                    value: pillars.journal.n,
                    sub: pillars.journal.n > 0 ? 'entries' : 'Try one prompt',
                  },
                  {
                    label: 'Consistency',
                    value: `${pillars.consistency.score}%`,
                    sub: `${pillars.consistency.days}/7 days`,
                  },
                ]}
              />
            )}

            {/* Toolkit */}
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <Eyebrow>Your toolkit</Eyebrow>
                  <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Go deeper
                  </h2>
                </div>
              </div>
              <HubGrid columns={2}>
                {toolkit.map((c) => (
                  <HubCard
                    key={c.id}
                    number={c.number}
                    eyebrow={c.title.toUpperCase()}
                    title={c.title}
                    description={c.description}
                    meta={c.meta}
                    tone={c.tone}
                    cta="Open"
                    onClick={() => setActiveSection(c.id)}
                  />
                ))}
              </HubGrid>
            </div>

            {/* Trade support — ranked by role so the most-relevant org leads */}
            <ListCard>
              <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-500/70 via-amber-400/70 to-yellow-400/70 opacity-70" />
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-semibold text-white">Trade-specific support</div>
                  <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-amber-300">
                    For you
                  </span>
                </div>
              </div>
              <div>
                {tradeSupport.map((t) => (
                  <ListRow
                    key={t.id}
                    title={t.title}
                    subtitle={t.subtitle}
                    trailing={
                      t.isPhone ? (
                        <a
                          href={t.href}
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 text-[12px] font-semibold touch-manipulation"
                        >
                          <Phone className="h-3 w-3" /> {t.ctaLabel}
                        </a>
                      ) : (
                        <a
                          href={t.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 text-[12px] font-semibold touch-manipulation"
                        >
                          {t.ctaLabel} →
                        </a>
                      )
                    }
                  />
                ))}
              </div>
            </ListCard>

            {/* Privacy footer */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-center">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[12px] text-white">
                Your mood, journal and sleep entries are private to you. Never shared with your
                employer, never sold, never used for ads.
              </span>
              <Pill tone="emerald">Private to you</Pill>
            </div>
          </PageFrame>
        </div>

        {/* Sticky bottom crisis bar — appears once user scrolls past the
            top crisis card so help is always one tap away. Mobile-only. */}
        {showStickyCrisis && (
          <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden bg-[hsl(0_0%_8%)]/95 backdrop-blur border-t border-white/[0.08] px-3 py-2.5 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-red-400 shrink-0 pl-1">
                Crisis
              </span>
              <a
                href="tel:116123"
                onClick={() => {
                  buzz(40);
                  onCallLogged('Samaritans 116 123');
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-full bg-red-500/20 border border-red-500/35 text-red-300 text-[12.5px] font-semibold touch-manipulation"
              >
                <Phone className="h-3.5 w-3.5" /> 116 123
              </a>
              <a
                href="sms:85258?body=SHOUT"
                onClick={() => {
                  buzz(40);
                  recordCrisisEvent({ kind: 'text', label: 'SHOUT 85258' }).catch(() => {});
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[12.5px] font-medium touch-manipulation"
              >
                <Send className="h-3.5 w-3.5" /> SHOUT
              </a>
            </div>
          </div>
        )}
      </div>
    </MentalHealthProvider>
  );
}
