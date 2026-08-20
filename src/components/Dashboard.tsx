/**
 * Inspection & Testing hub.
 *
 * Masthead → certs. Nothing sits between them unless something is genuinely
 * overdue, in which case one compact alert line does. The four-stat board that
 * used to occupy the first screen is gone: every number it held already lives
 * on the card it describes, so it was repeating the page back to itself before
 * letting anyone start work.
 *
 * Volt appears in three places and nowhere else: the EICR launcher (the cert
 * started most often), a card's meta count when it needs action, and the
 * "Open" affordance. Everything else is graphite and white, so volt always
 * reads as "this one".
 *
 * Every card shares CARD_BASE — one press treatment, Capacitor haptics for
 * iOS/Android, no tap-flash.
 */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import RecoverUnsavedWork from './dashboard/RecoverUnsavedWork';
import HelpPanel from './HelpPanel';
import { useNotifications } from '@/hooks/useNotifications';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { filterByTimeRange, getExpiryUrgency } from '@/utils/expiryHelper';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud } from '@/utils/reportCloud';
import { useDesignedCircuits } from '@/hooks/useDesignedCircuits';
import { useQsTeamContext } from '@/hooks/useQsReview';
import { useQsPendingCount } from '@/hooks/useQsReviewQueue';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_BASE, CARD_PRIMARY, CARD_NEUTRAL } from '@/components/ui/card-recipe';

// ─────────────────────────────────────────────────────────────────────────
// Editorial helpers
// ─────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────
// Sticky masthead — College pattern
// ─────────────────────────────────────────────────────────────────────────

const PageMasthead = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center h-12 gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate('/electrician')}
            className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
              Electrician
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Inspection &amp; Testing
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────

/**
 * Alert line — the one thing that can legitimately delay someone from starting
 * a cert: work that is actually overdue.
 *
 * Absent when everything is clear, so the default page is masthead → certs.
 * The whole row is the tap target and it lands on the action list.
 */
const AlertLine = ({ text, onClick }: { text: string; onClick: () => void }) => {
  const haptic = useHaptic();
  return (
    <motion.button
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      type="button"
      onClick={() => {
        haptic.light();
        onClick();
      }}
      // The standard graphite card surface, with volt reserved for the WORDS.
      // A translucent volt wash (bg-elec-yellow/[0.12]) goes muddy brown on
      // this ground — volt is only ever solid-with-black-text, or plain text.
      // A neutral surface also stops this competing with the solid volt EICR
      // card directly beneath it.
      className={cn(
        CARD_BASE,
        CARD_NEUTRAL,
        'min-h-11 w-full flex-row items-center justify-between gap-3 px-4 py-3'
      )}
    >
      <span className="min-w-0 text-[13px] font-semibold leading-snug text-elec-yellow">
        {text}
      </span>
      <span className="shrink-0 text-[12px] font-bold text-elec-yellow">View</span>
    </motion.button>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// QuickStart strip — hairline 4-cell mini-grid for one-tap cert launch.
// First cell is the primary/yellow accent (typically EICR), the rest are
// neutral. Same hairline DNA as the rest of the page so it doesn't read as
// a different visual system.
// ─────────────────────────────────────────────────────────────────────────

interface QuickLaunch {
  title: string;
  description: string;
  onClick: () => void;
  /** The most-reached-for cert gets the solid volt card. */
  primary?: boolean;
}

const QuickStartStrip = ({ label, items }: { label: string; items: QuickLaunch[] }) => {
  const haptic = useHaptic();
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.h2
        variants={itemVariants}
        className="text-[15px] font-semibold tracking-tight text-white"
      >
        {label}
      </motion.h2>

      {/* Two-up on phones. The old layout stacked one full-width row per type,
          each ~250px tall, so reaching Minor Works meant scrolling past two
          screens of cards for a four-item list. */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4"
      >
        {items.map((q) => (
          <button
            key={q.title}
            type="button"
            onClick={() => {
              // Capacitor Haptics — the Taptic Engine on iOS and the vibrator
              // on Android. navigator.vibrate (used elsewhere on this page
              // before) does nothing at all on iOS, native app included.
              haptic.light();
              q.onClick();
            }}
            className={cn(CARD_BASE, q.primary ? CARD_PRIMARY : CARD_NEUTRAL, 'p-4')}
          >
            {/* No "BS 7671" eyebrow: it was identical on three of the four
                cards, so it separated nothing and just added a line of type. */}
            <span
              className={cn(
                'text-[16px] font-bold leading-tight tracking-tight transition-colors sm:text-[17px]',
                q.primary ? 'text-black' : 'text-white group-hover:text-elec-yellow'
              )}
            >
              {q.title}
            </span>
            <span
              className={cn(
                'mt-1 text-[11.5px] leading-snug',
                q.primary ? 'text-black/70' : 'text-white'
              )}
            >
              {q.description}
            </span>
            {/* No "Start →" link — the whole card is the button, and a tiny
                text link inside a tappable card is a smaller target for the
                same job. */}
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// EditorialToolGrid — same DNA as Business Hub. Cards trigger either an
// `onClick` (for in-app section nav) or `to` (for router navigation).
// ─────────────────────────────────────────────────────────────────────────

interface ToolCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
  meta?: string;
  alert?: boolean;
}

const EditorialToolGrid = ({
  label,
  cards,
  columns = 'three',
}: {
  label: string;
  cards: ToolCard[];
  columns?: 'two' | 'three';
}) => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  if (cards.length === 0) return null;

  // 2-up on phones. These were a single column of 220px-tall cards, so the
  // Compliance group alone was five full screens of scrolling.
  const colClass = columns === 'two' ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.h2
        variants={itemVariants}
        className="text-[15px] font-semibold tracking-tight text-white"
      >
        {label}
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className={cn('grid grid-cols-2 gap-2.5 sm:gap-3', colClass)}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              haptic.light();
              if (card.onClick) card.onClick();
              else if (card.to) navigate(card.to);
            }}
            className={cn(CARD_BASE, CARD_NEUTRAL, 'p-3.5 sm:p-4')}
          >
            <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              {card.eyebrow}
            </span>

            <span className="mt-1.5 text-[15px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow sm:text-[17px]">
              {card.title}
            </span>
            <span className="mt-1 text-[11.5px] leading-snug text-white sm:text-[12.5px]">
              {card.description}
            </span>

            <span className="flex-grow" />

            {/* The live number for this area. This is where the deleted status
                strip's data went — a count next to the thing it counts beats a
                scoreboard at the top of the page. Volt when it needs action. */}
            <span className="mt-3 flex items-baseline justify-between gap-2 border-t border-white/[0.10] pt-2.5">
              <span
                className={cn(
                  'min-w-0 truncate text-[11px] tabular-nums',
                  card.alert ? 'font-semibold text-elec-yellow' : 'text-white'
                )}
              >
                {card.meta ?? ''}
              </span>
              <span className="shrink-0 text-[12px] font-bold text-elec-yellow">Open</span>
            </span>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Continue card — full-width single hairline cell when there's a draft.
// ─────────────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'fire-alarm': 'Fire alarm · G1',
  'fire-alarm-commissioning': 'Fire alarm · G2',
  'fire-alarm-inspection': 'Fire alarm · G7',
  'fire-alarm-modification': 'Fire alarm · G4',
  'ev-charging': 'EV charging',
  'emergency-lighting': 'Emergency lighting',
  'pat-testing': 'PAT testing',
  'solar-pv': 'Solar PV',
  bess: 'BESS',
  'lightning-protection': 'Lightning protection',
  'g98-commissioning': 'G98',
  'g99-commissioning': 'G99',
  'smoke-co-alarm': 'Smoke / CO',
};

const ContinueRow = ({
  reportType,
  clientName,
  address,
  onClick,
}: {
  reportType: string;
  clientName: string;
  address: string;
  onClick: () => void;
}) => {
  const haptic = useHaptic();
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.h2
        variants={itemVariants}
        className="text-[15px] font-semibold tracking-tight text-white"
      >
        Continue
      </motion.h2>

      {/*
        One wide row rather than a five-row stack. This card describes a single
        draft, and it was spending ~190px of height on it: eyebrow, title,
        address, a rule, then "Pick up where you left off" next to "Resume" —
        a helper line that said exactly what the button already said. Laid out
        across the width instead, it's ~72px and reads in one glance.
      */}
      <motion.button
        variants={itemVariants}
        type="button"
        onClick={() => {
          haptic.light();
          onClick();
        }}
        className={cn(CARD_BASE, CARD_NEUTRAL, 'w-full flex-row items-center gap-3 px-4 py-3')}
      >
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
            <span className="text-elec-yellow">Draft</span>
            <span className="min-w-0 truncate text-white">
              · {TYPE_LABELS[reportType] ?? reportType.toUpperCase()}
            </span>
          </span>
          <span className="mt-1 block truncate text-[16px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow">
            {clientName || 'Untitled'}
          </span>
          {address && (
            <span className="mt-0.5 block truncate text-[11.5px] leading-snug text-white">
              {address}
            </span>
          )}
        </span>
        <span className="shrink-0 text-[13px] font-bold text-elec-yellow">Resume</span>
      </motion.button>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────

const Dashboard = ({
  onNavigate,
}: {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const { notifications = [] } = useNotifications();
  const { reminders = [] } = useExpiryReminders();
  const { data: designedCircuits } = useDesignedCircuits();

  // QS Review bench entry point — only shown to a Qualifying Supervisor (am_i_qs).
  const { data: qsTeam } = useQsTeamContext();
  const qsPendingCount = useQsPendingCount();
  const isQs = qsTeam?.am_i_qs === true;

  const { data: reportsData } = useQuery({
    queryKey: ['recent-certificates', user?.id],
    queryFn: async () => {
      if (!user) return { reports: [], totalCount: 0, hasMore: false };
      return await reportCloud.getUserReports(user.id, { limit: 50 });
    },
    enabled: !!user,
    staleTime: 10 * 1000,
  });

  const reports = reportsData?.reports ?? [];
  const inProgressCount = reports.filter(
    (r) => r.status === 'in-progress' || r.status === 'draft'
  ).length;
  const completedCount = reports.filter((r) => r.status === 'completed').length;
  const totalCount = reportsData?.totalCount ?? reports.length;

  const partPPending = notifications.filter(
    (n) => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled'
  );
  const partPDueCount = partPPending.length;
  const overduePartP = partPPending.some(
    (n) => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0
  );
  const partPOverdueCount = partPPending.filter(
    (n) => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0
  ).length;

  const expiringReminders = filterByTimeRange(reminders, '90');
  const expiringCount = expiringReminders.length;
  // Beyond the 90-day window the tile still points at the forward pipeline.
  const nextDueDate = useMemo(() => {
    const next = [...(reminders ?? [])]
      .filter((r) => new Date(r.expiry_date).getTime() > Date.now())
      .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime())[0];
    return next
      ? new Date(next.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      : null;
  }, [reminders]);
  const expiredCertsCount = reminders.filter(
    (r) => getExpiryUrgency(r.expiry_date) === 'expired'
  ).length;

  const pendingDesigns = (designedCircuits || []).filter(
    (d) => d.status === 'pending' || d.status === 'in-progress'
  ).length;

  const recentDraft = reports.find((r) => r.status === 'in-progress' || r.status === 'draft');

  const handleContinue = () => {
    if (recentDraft) {
      onNavigate(recentDraft.report_type, recentDraft.report_id, recentDraft.report_type);
    }
  };

  // ── Hero state ───────────────────────────────────────────────────────
  /**
   * Only a genuine problem earns space above the certs. Counts of healthy work
   * ("46 on file") live on the cards that own them, so there's nothing to say
   * when everything is clear — and the page opens straight onto the certs.
   */
  const alert = useMemo(() => {
    if (!overduePartP && expiredCertsCount === 0) return null;
    const bits: string[] = [];
    if (partPOverdueCount > 0)
      bits.push(
        `${partPOverdueCount} building ${partPOverdueCount === 1 ? 'notification' : 'notifications'} overdue`
      );
    if (expiredCertsCount > 0)
      bits.push(
        `${expiredCertsCount} ${expiredCertsCount === 1 ? 'certificate has' : 'certificates have'} expired`
      );
    return {
      text: bits.join(' · '),
      onClick: () => onNavigate(partPOverdueCount > 0 ? 'notifications' : 'my-reports'),
    };
  }, [overduePartP, expiredCertsCount, partPOverdueCount, onNavigate]);

  // ── Tool grids ───────────────────────────────────────────────────────
  const coreTools: ToolCard[] = [
    {
      id: 'certificates',
      eyebrow: 'BS 7671',
      title: 'Certificates',
      description: 'EICR, EIC and Minor Works.',
      onClick: () => onNavigate('certificates'),
      meta:
        inProgressCount > 0 ? `${inProgressCount} in progress` : '4 core types',
    },
    {
      /*
       * ELE-1581 — was third and called "My Reports".
       *
       * A user asked "Can you view all Certificates in one place, or do you
       * have to go into a job to find the certificate?" — while this card was
       * on the dashboard the whole time. Two reasons they missed it: it was
       * called Reports, not Certificates, so it did not match the word they
       * were looking for; and it sat below the two cards for CREATING certs,
       * when finding an existing one is the far more frequent errand.
       *
       * Named to MATCH the destination exactly — the screen's own heading is
       * already "My Certificates". The entry point saying Reports while the
       * page said Certificates is what made it unfindable.
       */
      id: 'my-reports',
      eyebrow: 'Library',
      title: 'My Certificates',
      description: 'Every certificate you have ever issued, in one place.',
      onClick: () => onNavigate('my-reports'),
      meta: totalCount > 0 ? `${totalCount} on file` : 'Empty',
    },
    {
      id: 'specialist',
      eyebrow: 'Specialist',
      title: 'Specialist',
      description: 'Fire, EV, solar, BESS, lightning, PAT and more.',
      onClick: () => onNavigate('specialist'),
      meta: '14 cert types',
    },
    {
      id: 'labels-warnings',
      eyebrow: 'Notices',
      title: 'Notices & Labels',
      description: 'Danger, isolation, permit, warning and handout PDFs.',
      onClick: () => onNavigate('labels-warnings'),
      meta: '11 documents',
    },
  ];

  const complianceTools: ToolCard[] = [
    ...(isQs
      ? [
          {
            id: 'qs-review',
            eyebrow: 'Compliance',
            title: 'QS Review',
            description: 'Review and countersign certificates awaiting your sign-off.',
            onClick: () => onNavigate('qs-reviews'),
            meta: qsPendingCount > 0 ? `${qsPendingCount} awaiting sign-off` : 'Nothing waiting',
            alert: qsPendingCount > 0,
          } as ToolCard,
        ]
      : []),
    {
      id: 'expiring',
      eyebrow: 'Expiry',
      title: 'Expiring Certs',
      description: 'Customer certs heading toward review or renewal.',
      to: '/certificate-expiry',
      meta:
        expiredCertsCount > 0
          ? `${expiredCertsCount} expired`
          : expiringCount > 0
            ? `${expiringCount} expiring`
            : 'All clear',
      alert: expiredCertsCount > 0,
    },
    {
      id: 'customers',
      eyebrow: 'Clients',
      title: 'Customers',
      description: 'Properties, history and contact details.',
      to: '/customers',
      meta: 'Open list',
    },
    {
      id: 'part-p',
      eyebrow: 'Part P',
      title: 'Building Notifications',
      description: 'Self-certify Part P notifiable work.',
      onClick: () => onNavigate('notifications'),
      meta:
        partPOverdueCount > 0
          ? `${partPOverdueCount} overdue`
          : partPDueCount > 0
            ? `${partPDueCount} pending`
            : 'All clear',
      alert: partPOverdueCount > 0,
    },
    {
      id: 'circuit-designer',
      eyebrow: 'Design',
      title: 'Circuit Designer',
      description: 'AI-led BS 7671 circuit design and discrimination.',
      to: '/electrician/circuit-designer',
      meta: pendingDesigns > 0 ? `${pendingDesigns} pending` : 'Start a design',
    },
    {
      id: 'learning-hub',
      eyebrow: 'Learning',
      title: 'I&T Hub',
      description: 'BS 7671 guidance, model forms and how-tos.',
      onClick: () => onNavigate('learning-hub'),
      meta: 'Browse hub',
    },
  ];

  return (
    <>
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
        <PageMasthead />

        {/* Tighter rhythm than the old space-y-12/16 — that spacing existed to
            give a full-screen hero room to breathe, and without it the gaps
            just pushed the tools further down. */}
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-4 sm:space-y-10 lg:px-8">
          {/* Certs first. The four-stat strip that used to sit here is gone —
              every number it held already lives on the card it describes
              ("4 in progress" on Certificates, "1 overdue" on Building
              Notifications, "136 on file" on My Reports), so a separate board
              was repeating the page back to itself before letting anyone
              start work. Only a genuine problem earns space above the certs. */}
          {alert && <AlertLine text={alert.text} onClick={alert.onClick} />}

          <QuickStartStrip
            label="Start a cert"
            items={[
              {
                title: 'EICR',
                description: 'Periodic inspection of an existing installation.',
                onClick: () => onNavigate('eicr'),
                primary: true,
              },
              {
                title: 'EIC',
                description: 'Initial verification of a new install.',
                onClick: () => onNavigate('eic'),
              },
              {
                title: 'Minor Works',
                description: 'Additions and alterations to a circuit.',
                onClick: () => onNavigate('minor-works'),
              },
              {
                title: 'All cert types',
                description: 'Fire, EV, solar, BESS, lightning, PAT and more.',
                onClick: () => onNavigate('specialist'),
              },
            ]}
          />

          {recentDraft && (
            <ContinueRow
              reportType={recentDraft.report_type}
              clientName={recentDraft.client_name}
              address={recentDraft.installation_address}
              onClick={handleContinue}
            />
          )}

          <RecoverUnsavedWork onNavigate={onNavigate} />

          <EditorialToolGrid
            label="Core"
            cards={coreTools}
            columns="three"
          />

          <EditorialToolGrid label="Compliance" cards={complianceTools} columns="three" />
        </div>
      </div>

      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
