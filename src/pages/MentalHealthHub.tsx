import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Lock, Phone, Send } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { MentalHealthProvider } from '@/contexts/MentalHealthContext';
import { useMoodData } from '@/hooks/useMentalHealthSync';
import { useAvailableSupporters } from '@/hooks/usePeerChat';
import { useWellbeingScore } from '@/hooks/useWellbeingScore';
import { useWellbeingInsights } from '@/hooks/useWellbeingInsights';
import { cn } from '@/lib/utils';

import { Eyebrow, EmptyState, type Tone } from '@/components/college/primitives';
import {
  HubBody,
  HubKpi,
  HubKpiRow,
  HubMasthead,
  HubPage,
  HubQuickStart,
  HubSectionHeading,
  HubToolGrid,
  HubWorkList,
} from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';

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
    <div className={cn('rounded-2xl border border-elec-yellow/35 p-5', CARD_SURFACE)}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <Eyebrow>Today</Eyebrow>
          <div className="mt-1 text-[18px] sm:text-[20px] font-semibold text-white leading-snug">
            {timeAwareGreeting(todaysMood !== null)}
          </div>
        </div>
        <button
          onClick={onOpen}
          className="h-11 shrink-0 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
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
                  ? 'border-elec-yellow bg-elec-yellow'
                  : 'border-white/[0.12] bg-white/[0.06]'
              )}
            >
              <span className="text-[22px] leading-none">{p.emoji}</span>
              <span
                className={cn('text-[10.5px] font-medium', selected ? 'text-black' : 'text-white')}
              >
                {p.label}
              </span>
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
    return 'bg-elec-yellow border-elec-yellow';
  };

  return (
    <button onClick={onTap} className={cn(CARD_BASE, CARD_NEUTRAL, 'w-full p-4 sm:p-5')}>
      <div className="flex items-center justify-between mb-3">
        <Eyebrow>Last 7 days</Eyebrow>
        <span className="text-[11px] text-white">Tap for insights →</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <div key={d.key} className="flex flex-col items-center gap-1.5">
            <div
              className={cn('h-9 w-full rounded-lg border transition-colors', moodColour(d.mood))}
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

const buildToolkit = (): ToolCard[] => {
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
    id: 'calm',
    title: 'CALM — Campaign Against Living Miserably',
    subtitle:
      'Leading the movement against suicide. For anyone who is down or in crisis — 5pm to midnight, every day.',
    href: 'tel:0800585858',
    ctaLabel: '0800 58 58 58',
    isPhone: true,
    audiences: ['electrician', 'apprentice', 'employer', 'all'],
  },
  {
    id: 'papyrus',
    title: 'Papyrus HOPELINE247',
    subtitle:
      'Suicide prevention advisers for anyone under 35. Free, confidential, 24/7 — call, text or WhatsApp.',
    href: 'tel:08000684141',
    ctaLabel: '0800 068 4141',
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
    apprentice: ['papyrus', 'calm', 'eic', 'lighthouse', 'andys-man-club'],
    employer: ['calm', 'mates-in-mind', 'lighthouse', 'eic', 'andys-man-club'],
    electrician: ['calm', 'eic', 'lighthouse', 'andys-man-club', 'mates-in-mind'],
    all: ['calm', 'eic', 'lighthouse', 'mates-in-mind', 'andys-man-club'],
  };
  const ids = order[r] ?? order.all;
  return ids
    .map((id) => ALL_TRADE_SUPPORT.find((t) => t.id === id))
    .filter((t): t is TradeSupport => Boolean(t))
    .filter(
      (t) =>
        t.audiences.includes(r as TradeSupport['audiences'][number]) || t.audiences.includes('all')
    );
};

/* ── Section titles for the masthead ──────────────────────────────── */

const SECTION_TITLES: Record<string, string> = {
  breathing: 'Breathe',
  mood: 'Check in',
  gratitude: 'Journal',
  talk: 'Talk',
  journal: 'Wellbeing journal',
  grounding: 'Grounding',
  coping: 'Coping toolkit',
  sleep: 'Sleep tracker',
  insights: 'Mood insights',
  'safety-plan': 'My safety plan',
  tools: 'Interactive tools',
  resources: 'Resources',
  support: 'Support network',
  crisis: 'Crisis resources',
  podcasts: 'Podcasts',
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
  const location = useLocation();
  // Shared between the apprentice and electrician hubs — Back goes to
  // whichever one you came in from.
  const backTo = location.pathname.startsWith('/apprentice') ? '/apprentice' : '/dashboard';
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

  const { moodHistory, addMoodEntry } = useMoodData();
  const { score, band, pillars, isLoading: scoreLoading } = useWellbeingScore();
  const { insights } = useWellbeingInsights();
  // Live count of Mental Health Mates online — a real person being available
  // right now is the strongest nudge to actually talk.
  const { data: availableSupporters } = useAvailableSupporters(profile?.id);
  const matesOnline = availableSupporters?.length ?? 0;

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

  // Sections share one route (?section=), so the app's route-change scroll
  // reset never fires — without this, a section opens at whatever depth you
  // tapped from and you land mid-page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  /* ── Active section renderer ───────────────────────────────────── */

  if (activeSection) {
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
            <WellbeingJournal />
          </>
        );
        break;
      case 'grounding':
        body = (
          <>
            <GroundingExercises />
          </>
        );
        break;
      case 'coping':
        body = (
          <>
            <QuickCopingToolkit />
          </>
        );
        break;
      case 'sleep':
        body = (
          <>
            <SleepTracker />
          </>
        );
        break;
      case 'insights':
        body = (
          <>
            <MoodInsights />
          </>
        );
        break;
      case 'safety-plan':
        body = (
          <>
            <PersonalSafetyPlan />
          </>
        );
        break;
      case 'tools':
        body = (
          <>
            <InteractiveToolsTab />
          </>
        );
        break;
      case 'resources':
        body = (
          <>
            <ResourcesLibraryTab />
          </>
        );
        break;
      case 'support':
        body = (
          <>
            <SupportNetworkTab />
          </>
        );
        break;
      case 'crisis':
        body = (
          <>
            <CrisisResourcesTab />
          </>
        );
        break;
      case 'podcasts':
        body = (
          <>
            <PodcastsTab />
          </>
        );
        break;
      default:
        body = (
          <EmptyState
            title="Section not found"
            action="Back to hub"
            onAction={() => setActiveSection(null)}
          />
        );
    }

    return (
      <MentalHealthProvider>
        <HubPage>
          <HubMasthead
            section="Wellbeing"
            title={SECTION_TITLES[activeSection] ?? 'Mental health'}
            onBack={() => setActiveSection(null)}
          />
          <HubBody>{body}</HubBody>
        </HubPage>
      </MentalHealthProvider>
    );
  }

  /* ── Hub landing ───────────────────────────────────────────────── */

  const toolkit = buildToolkit();

  return (
    <MentalHealthProvider>
      <HubPage>
        <HubMasthead section="Wellbeing" title="Mental health" backTo={backTo} />
        <HubBody>
          {/* Crisis — always visible, always first */}
          <CrisisCard onCallLogged={onCallLogged} />

          {/* Score + streak — the one row of figures */}
          {!scoreLoading && !isFirstRun && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <WellbeingRing score={score} band={band} />
              {streak >= 2 && (
                <span className="inline-flex h-11 items-center rounded-full border border-elec-yellow/50 px-3.5 text-[12.5px] font-semibold tabular-nums text-elec-yellow">
                  {streak}-day streak
                </span>
              )}
            </div>
          )}

          {/* First-run — overrides the today/heatmap rows when no data */}
          {isFirstRun ? (
            <div
              className={cn(
                'rounded-2xl border border-elec-yellow/35 p-6 text-center sm:p-8',
                CARD_SURFACE
              )}
            >
              <Eyebrow>Start here</Eyebrow>
              <div className="mt-2 text-[22px] font-semibold tracking-tight text-white sm:text-[26px]">
                Take 30 seconds — log how you feel today
              </div>
              <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-white sm:text-sm">
                One tap is all it takes. The more you log, the better we can spot what helps and
                what drags you down.
              </p>
              <div className="mx-auto mt-6 grid max-w-sm grid-cols-5 gap-2">
                {moodPills.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => {
                      buzz(20);
                      onLogMood(p.value);
                    }}
                    className="flex flex-col items-center gap-1 rounded-xl border border-white/[0.12] bg-white/[0.06] py-3 transition-all active:scale-[0.94] touch-manipulation"
                  >
                    <span className="text-[26px] leading-none">{p.emoji}</span>
                    <span className="text-[10.5px] font-medium text-white">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="relative">
                <TodayMoodRow
                  todaysMood={todaysMood}
                  onLog={onLogMood}
                  onOpen={() => setActiveSection('mood')}
                />
                {flashSuccess && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-elec-yellow bg-elec-yellow animate-in zoom-in duration-200">
                      <span className="text-[28px] font-semibold leading-none text-black">✓</span>
                    </div>
                  </div>
                )}
              </div>
              <MoodHeatmap moodHistory={moodHistory} onTap={() => setActiveSection('insights')} />
            </>
          )}

          {/* Quick reset — four actions, the check-in is the one solid card */}
          <HubQuickStart
            label="Quick reset"
            items={quickActions.map((q) => ({
              title: q.label,
              description:
                q.id === 'talk' && matesOnline > 0
                  ? `${matesOnline} mate${matesOnline === 1 ? '' : 's'} online now`
                  : q.sub,
              onClick: () => setActiveSection(q.id),
              primary: q.id === 'mood',
            }))}
          />

          {/* Smart insights — only when there is something to say */}
          {insights.length > 0 && (
            <HubWorkList
              label="Patterns we've noticed"
              unit="pattern"
              items={insights.map((i) => ({
                id: i.id,
                title: i.title,
                reason: i.body,
                trailing: i.cta?.label,
                urgent: i.tone === 'red' || i.tone === 'orange',
                onClick: i.cta ? () => setActiveSection(i.cta!.sectionId) : undefined,
              }))}
            />
          )}

          <DailyAffirmation />

          {/* Wellbeing pillars */}
          {!scoreLoading &&
            (pillars.mood.n > 0 || pillars.sleep.n > 0 || pillars.journal.n > 0) && (
              <HubKpiRow>
                <HubKpi
                  label="Mood · 7 days"
                  value={pillars.mood.n > 0 ? pillars.mood.avg.toFixed(1) : '—'}
                  context={pillars.mood.n > 0 ? `${pillars.mood.n} check-ins` : 'Log to track'}
                  accent
                />
                <HubKpi
                  label="Sleep · 7 days"
                  value={pillars.sleep.n > 0 ? `${pillars.sleep.avgHours.toFixed(1)}h` : '—'}
                  context={pillars.sleep.n > 0 ? `${pillars.sleep.n} nights` : 'Open the tracker'}
                />
                <HubKpi
                  label="Journal · 7 days"
                  value={`${pillars.journal.n}`}
                  context={pillars.journal.n > 0 ? 'entries' : 'Try one prompt'}
                />
                <HubKpi
                  label="Consistency"
                  value={`${pillars.consistency.score}%`}
                  context={`${pillars.consistency.days} of 7 days`}
                />
              </HubKpiRow>
            )}

          {/* Toolkit */}
          <HubToolGrid
            label="Your toolkit"
            columns="four"
            cards={toolkit.map((c) => ({
              id: c.id,
              title: c.title,
              description: c.description,
              meta: c.meta,
              onClick: () => setActiveSection(c.id),
            }))}
          />

          {/* Trade support — ranked by role so the most-relevant org leads */}
          <section className="space-y-3">
            <HubSectionHeading>Support built for the trade</HubSectionHeading>
            <p className="max-w-2xl text-[13px] leading-relaxed text-white">
              Suicide is the biggest killer of men under 50 in the UK, and in construction and the
              trades the risk runs almost four times the national average. That is why this page
              exists. Talking is the strong move.
            </p>
            <ul
              className={cn(
                '-mx-4 divide-y divide-white/[0.10] overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
                CARD_SURFACE
              )}
            >
              {tradeSupport.map((t) => (
                <li key={t.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium text-white">{t.title}</div>
                    <div className="mt-0.5 text-[12px] leading-snug text-white">{t.subtitle}</div>
                  </div>
                  <a
                    href={t.href}
                    {...(t.isPhone ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className={cn(
                      buttonSecondaryCn,
                      'inline-flex h-11 shrink-0 items-center gap-1.5 px-3.5 text-[12.5px] font-semibold text-elec-yellow'
                    )}
                  >
                    {t.isPhone && <Phone className="h-3.5 w-3.5" />}
                    {t.ctaLabel}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Privacy footer */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-center">
            <Lock className="h-3.5 w-3.5 text-elec-yellow" />
            <span className="text-[12px] text-white">
              Your mood, journal and sleep entries are private to you. Never shared with your
              employer, never sold, never used for ads.
            </span>
          </div>
        </HubBody>

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
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-12 px-3 rounded-full bg-red-500/20 border border-red-500/35 text-red-300 text-[12.5px] font-semibold touch-manipulation"
              >
                <Phone className="h-3.5 w-3.5" /> 116 123
              </a>
              <a
                href="sms:85258?body=SHOUT"
                onClick={() => {
                  buzz(40);
                  recordCrisisEvent({ kind: 'text', label: 'SHOUT 85258' }).catch(() => {});
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-12 px-3 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[12.5px] font-medium touch-manipulation"
              >
                <Send className="h-3.5 w-3.5" /> SHOUT
              </a>
            </div>
          </div>
        )}
      </HubPage>
    </MentalHealthProvider>
  );
}
