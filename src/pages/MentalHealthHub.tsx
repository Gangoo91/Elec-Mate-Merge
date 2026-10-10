import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  ChevronRight,
  Lock,
  MessageCircle,
  NotebookPen,
  Phone,
  Send,
  SmilePlus,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { MentalHealthProvider } from '@/contexts/MentalHealthContext';
import { WellbeingConsentGate } from '@/components/mental-health/WellbeingConsentGate';
import { useMoodData } from '@/hooks/useMentalHealthSync';
import { useAvailableSupporters } from '@/hooks/usePeerChat';
import { useWellbeingScore } from '@/hooks/useWellbeingScore';
import { useWellbeingInsights } from '@/hooks/useWellbeingInsights';
import { cn } from '@/lib/utils';

import { EmptyState, type Tone } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage, HubWorkList } from '@/components/hub/HubPrimitives';
import {
  ContactButton,
  ContactRow,
  WB_CARD,
  WB_LIST,
  WellbeingSection,
} from '@/components/mental-health/wellbeingUi';

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

/* ── Crisis card (one-tap dial / text) ─────────────────────────────── */

// One-shot haptic for crisis taps. Fails silently if the browser doesn't
// support it (desktop, older Safari) — never blocks the dial intent.
const buzz = (ms = 30) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
};

/**
 * Help now: always first on a phone. A neutral card with a red edge and three
 * full-width buttons (10 Oct: was pills on a red wash with a spaced-capitals
 * label).
 */
function CrisisCard({ onCallLogged }: { onCallLogged: (label: string) => void }) {
  return (
    <section aria-label="Need help right now" className={cn(WB_CARD, '!border-red-400/40')}>
      <p className="text-[15px] font-semibold text-red-300">Need help right now?</p>
      <p className="mt-1 text-[14px] leading-relaxed text-white">
        Free, confidential, 24/7. None of these calls leave a record on your account beyond a
        private "checking-in" reminder for you tomorrow.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3">
        <ContactButton
          urgent
          href="tel:116123"
          label="Call Samaritans 116 123"
          onClick={() => {
            buzz(40);
            onCallLogged('Samaritans 116 123');
          }}
        />
        <ContactButton
          kind="text"
          href="sms:85258?body=SHOUT"
          label="Text SHOUT to 85258"
          onClick={() => {
            buzz(40);
            onCallLogged('SHOUT 85258');
          }}
        />
        <ContactButton
          urgent
          href="tel:999"
          label="999 emergency"
          onClick={() => {
            buzz(60);
            onCallLogged('999 Emergency');
          }}
        />
      </div>
    </section>
  );
}

/* ── Mood check-in ──────────────────────────────────────────────────── */

// Words, not emoji (10 Oct: icons look designed, not generated). Five equal
// buttons; the chosen one turns white.
const moodPills: { value: number; label: string }[] = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Off' },
  { value: 3, label: 'OK' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Great' },
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

function MoodCheckCard({
  todaysMood,
  firstRun,
  flash,
  onLog,
  onOpen,
}: {
  todaysMood: number | null;
  firstRun: boolean;
  flash: boolean;
  onLog: (mood: number) => void;
  onOpen: () => void;
}) {
  const chosen = moodPills.find((p) => p.value === todaysMood);
  return (
    <section aria-label="Check in" className={WB_CARD}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold leading-snug text-white">
            {firstRun
              ? 'Take 30 seconds: how do you feel today?'
              : chosen
                ? `Today: ${chosen.label}`
                : 'How do you feel today?'}
          </h3>
          <p className="mt-1 text-[13.5px] leading-snug text-white">
            {flash
              ? 'Saved.'
              : firstRun
                ? 'One tap. The more you log, the better we can spot what helps and what drags you down.'
                : chosen
                  ? 'Tap another to change it.'
                  : 'One tap is all it takes.'}
          </p>
        </div>
        {!firstRun && (
          <button
            type="button"
            onClick={onOpen}
            className="-mr-2 -mt-2 inline-flex h-11 shrink-0 items-center px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Add a note
          </button>
        )}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2" role="group" aria-label="Your mood">
        {moodPills.map((p) => {
          const selected = todaysMood === p.value;
          return (
            <button
              key={p.value}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                buzz(20);
                onLog(p.value);
              }}
              className={cn(
                'h-12 min-w-0 rounded-xl border text-[14px] font-semibold transition-colors touch-manipulation active:scale-[0.97]',
                selected
                  ? 'border-white bg-white text-black'
                  : 'border-white/[0.14] text-white hover:border-white/[0.35]'
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ── 7-day mood strip ──────────────────────────────────────────────── */

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

  // Solid colours only (a translucent wash goes brown on this ground).
  const moodColour = (m: number | null) => {
    if (m === null) return 'border border-white/[0.14]';
    if (m <= 1) return 'bg-red-400';
    if (m <= 2) return 'bg-orange-400';
    if (m <= 3) return 'bg-amber-300';
    if (m <= 4) return 'bg-emerald-400';
    return 'bg-elec-yellow';
  };

  return (
    <button
      type="button"
      onClick={onTap}
      className={cn(WB_CARD, 'block w-[calc(100%+2rem)] text-left touch-manipulation sm:w-full')}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-semibold text-white">Last 7 days</span>
        <span className="inline-flex items-center gap-0.5 text-[13px] font-semibold text-elec-yellow">
          Mood insights
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
      </span>
      <span className="mt-3 grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <span key={d.key} className="flex flex-col items-center gap-1.5">
            <span
              className={cn('h-8 w-full rounded-lg', moodColour(d.mood))}
              aria-label={d.mood ? `Mood ${d.mood}/5 on ${d.key}` : `No log on ${d.key}`}
            />
            <span className="text-[12px] text-white">{d.label}</span>
          </span>
        ))}
      </span>
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
      title: 'Interactive tools',
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
      title: 'Support network',
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
      title: 'Wellbeing journal',
      description: 'Track thoughts, gratitude and triggers.',
      tone: 'emerald',
      number: '01',
    },
    {
      id: 'safety-plan',
      title: 'My safety plan',
      description: 'A personal plan for difficult moments.',
      tone: 'red',
      number: '02',
    },
    {
      id: 'sleep',
      title: 'Sleep tracker',
      description: 'See how rest affects your wellbeing.',
      tone: 'indigo',
      number: '03',
    },
    {
      id: 'insights',
      title: 'Mood insights',
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
  icon: LucideIcon;
}

const quickActions: QuickAction[] = [
  { id: 'breathing', label: 'Breathe', sub: 'A two-minute reset', icon: Wind },
  { id: 'mood', label: 'Check in', sub: 'How you feel, with notes', icon: SmilePlus },
  { id: 'gratitude', label: 'Journal', sub: 'One good thing', icon: NotebookPen },
  { id: 'talk', label: 'Talk', sub: 'Peer support', icon: MessageCircle },
];

/* ── Main page ─────────────────────────────────────────────────────── */

function MentalHealthHubInner() {
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
  /*
    Mates who have said they are open to being contacted — NOT who is online.

    `is_available` is a switch a supporter flips on their own profile and then
    leaves; nothing clears it and nothing measures presence. On 11 Sep 2026 all
    three were set available while none had opened the app in 5 weeks, 3 months
    and 5 months respectively, and none had ever sent a message. Calling that
    "online now" told someone reaching out at their lowest that a person was
    sitting there waiting.
  */
  const { data: availableSupporters } = useAvailableSupporters(profile?.id);
  const matesAvailable = availableSupporters?.length ?? 0;

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
        <HubPage ground="landing">
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
  const isApprentice = role === 'apprentice';

  // One status line of figures (10 Oct): bold number, plain word, hairline
  // between; a 2x2 grid on a phone. Replaces the score ring and four tiles.
  const figures: { n: string; label: string; warn?: boolean }[] =
    scoreLoading || isFirstRun
      ? []
      : [
          {
            n: String(score),
            label: `wellbeing, ${band}`,
            warn: band === 'low' || band === 'critical',
          },
          ...(streak >= 2 ? [{ n: String(streak), label: 'days in a row' }] : []),
          ...(pillars.mood.n > 0
            ? [{ n: pillars.mood.avg.toFixed(1), label: 'average mood, 7 days' }]
            : []),
          ...(pillars.sleep.n > 0
            ? [{ n: `${pillars.sleep.avgHours.toFixed(1)}h`, label: 'sleep a night' }]
            : []),
          ...(pillars.journal.n > 0
            ? [
                {
                  n: String(pillars.journal.n),
                  label: pillars.journal.n === 1 ? 'journal entry' : 'journal entries',
                },
              ]
            : []),
        ].slice(0, 4);

  const tradeSupportList = (
    <WellbeingSection
      title="Support built for the trade"
      sub="Suicide is the biggest killer of men under 50 in the UK, and in construction and the trades the risk runs almost four times the national average. That is why this page exists. Talking is the strong move."
    >
      <ul className={WB_LIST}>
        {tradeSupport.map((t) => (
          <ContactRow
            key={t.id}
            title={t.title}
            detail={t.subtitle}
            action={
              <ContactButton
                href={t.href}
                kind={t.isPhone ? 'call' : 'visit'}
                label={t.ctaLabel}
                ariaLabel={`${t.isPhone ? 'Call' : 'Visit'} ${t.title}`}
              />
            }
          />
        ))}
      </ul>
    </WellbeingSection>
  );

  return (
    <MentalHealthProvider>
      <HubPage ground="landing">
        <HubMasthead section="Wellbeing" title="Mental health" backTo={backTo} />
        <HubBody>
          <header className="min-w-0">
            <p className="text-[13px] font-semibold text-elec-yellow">Wellbeing</p>
            <h2 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
              {timeAwareGreeting(todaysMood !== null)}
            </h2>
            <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-white">
              Private to you. Check in, take a two-minute reset, or find someone to talk to.
            </p>
            {figures.length > 0 && (
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13.5px] text-white sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
                {figures.map((f, i) => (
                  <div key={f.label} className="flex min-w-0 items-baseline gap-1.5">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="mr-3.5 hidden h-3.5 w-px self-center bg-white/[0.18] sm:block"
                      />
                    )}
                    <dt
                      className={cn(
                        'text-[17px] font-semibold tabular-nums',
                        f.warn ? 'text-orange-300' : 'text-white'
                      )}
                    >
                      {f.n}
                    </dt>
                    <dd className={cn('min-w-0', f.warn && 'text-orange-300')}>{f.label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </header>

          {/* Crisis — always first on a phone; top of the right column on a desktop */}
          <div className="lg:hidden">
            <CrisisCard onCallLogged={onCallLogged} />
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
            <div className="min-w-0 space-y-6">
              <MoodCheckCard
                todaysMood={todaysMood}
                firstRun={isFirstRun}
                flash={flashSuccess}
                onLog={onLogMood}
                onOpen={() => setActiveSection('mood')}
              />
              {!isFirstRun && (
                <MoodHeatmap moodHistory={moodHistory} onTap={() => setActiveSection('insights')} />
              )}

              {/* Quick reset — four equal tiles, a line icon beside each label */}
              <WellbeingSection title="Quick reset">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4">
                  {quickActions.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setActiveSection(q.id)}
                      className="flex min-h-[76px] flex-col justify-center rounded-2xl card-surface-interactive px-4 py-3 text-left touch-manipulation active:bg-white/[0.08]"
                    >
                      <span className="flex items-center gap-2 text-[15px] font-semibold text-white">
                        <q.icon
                          className="h-[18px] w-[18px] shrink-0"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        {q.label}
                      </span>
                      <span className="mt-1 text-[13px] leading-snug text-white">
                        {q.id === 'talk' && matesAvailable > 0
                          ? `${matesAvailable} mate${matesAvailable === 1 ? '' : 's'} open to a chat`
                          : q.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </WellbeingSection>

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

              {/* Toolkit — a list on a phone, same-size cards from sm: up */}
              <WellbeingSection title="Your toolkit">
                <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.06] bg-[hsl(0_0%_12%)] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-transparent">
                  {toolkit.map((c) => (
                    <li key={c.id} className="sm:flex">
                      <button
                        type="button"
                        onClick={() => setActiveSection(c.id)}
                        className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3.5 text-left transition-colors touch-manipulation active:bg-white/[0.07] sm:min-h-[104px] sm:items-start sm:rounded-2xl sm:border sm:border-white/[0.1] sm:bg-[hsl(0_0%_15%)] sm:p-5 sm:hover:border-white/[0.16] sm:hover:bg-[hsl(0_0%_17%)]"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold text-white">
                            {c.title}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-white">
                            {c.description}
                          </span>
                        </span>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-white sm:mt-0.5"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </WellbeingSection>
            </div>

            <div className="min-w-0 space-y-8">
              <div className="hidden lg:block">
                <CrisisCard onCallLogged={onCallLogged} />
              </div>
              {tradeSupportList}
            </div>
          </div>

          {/* Privacy footer */}
          <p className="flex items-start gap-2 text-[13px] leading-relaxed text-white">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={1.5} aria-hidden />
            Your mood, journal and sleep entries are private to you. Never shared with your
            employer, never sold, never used for ads.
          </p>
        </HubBody>

        {/* Sticky crisis bar — appears once you scroll past the crisis card so
            help is always one tap away. Phones only. For an apprentice it sits
            above their bottom tab bar instead of under it. */}
        {showStickyCrisis && (
          <div
            className={cn(
              'fixed inset-x-0 z-40 border-t border-white/[0.08] bg-[hsl(0_0%_8%)]/95 px-4 py-2 backdrop-blur sm:hidden',
              isApprentice
                ? 'bottom-[calc(3.5rem+env(safe-area-inset-bottom))]'
                : 'bottom-0 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-[13px] font-semibold text-red-300">Help now</span>
              <a
                href="tel:116123"
                onClick={() => {
                  buzz(40);
                  onCallLogged('Samaritans 116 123');
                }}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-400/50 px-3 text-[13.5px] font-semibold text-red-300 touch-manipulation"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} /> 116 123
              </a>
              <a
                href="sms:85258?body=SHOUT"
                onClick={() => {
                  buzz(40);
                  recordCrisisEvent({ kind: 'text', label: 'SHOUT 85258' }).catch(() => {});
                }}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] px-3 text-[13.5px] font-semibold text-white touch-manipulation"
              >
                <Send className="h-4 w-4" strokeWidth={1.5} /> SHOUT
              </a>
            </div>
          </div>
        )}
      </HubPage>
    </MentalHealthProvider>
  );
}

/** Explicit (Art 9) consent first — see WellbeingConsentGate. ELE-1812. */
export default function MentalHealthHub() {
  return (
    <WellbeingConsentGate>
      <MentalHealthHubInner />
    </WellbeingConsentGate>
  );
}
