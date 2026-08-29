import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_BASE, CARD_NEUTRAL, CARD_DISABLED } from '@/components/ui/card-recipe';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface DocDef {
  id: string;
  title: string;
  description: string;
  badge: string;
  comingSoon?: boolean;
  href?: string;
}

const noticesAndPermits: DocDef[] = [
  {
    /*
     * ELE-1262. Visual inspection only — for an existing installation where a
     * full EICR is not what was asked for, and where a Minor Works Certificate
     * is the wrong instrument because the work is neither an addition nor an
     * alteration. Badge is deliberately NOT "BS 7671": there is no BS 7671
     * model form for this, and the card must not imply one.
     */
    id: 'visual-condition',
    title: 'Visual Condition Report',
    description: 'Visual inspection only — no testing',
    badge: 'VISUAL',
    href: '/electrician/inspection-testing/visual-condition',
  },
  {
    id: 'danger-notice',
    title: 'Danger Notice',
    description: 'C1 danger — issue on the spot',
    badge: 'BS 7671',
    href: '/electrician/inspection-testing/danger-notice',
  },
  {
    id: 'isolation-certificate',
    title: 'Isolation Certificate',
    description: 'Safe isolation record',
    badge: 'GS 38',
    href: '/electrician/inspection-testing/isolation-certificate',
  },
  {
    id: 'permit-to-work',
    title: 'Permit to Work',
    description: 'Work authorisation',
    badge: 'HSE',
    href: '/electrician/inspection-testing/permit-to-work',
  },
  {
    id: 'limitation-notice',
    title: 'Limitation Notice',
    description: 'Record limitations on inspection',
    badge: 'BS 7671',
    href: '/electrician/inspection-testing/limitation-notice',
  },
  {
    id: 'non-compliance-notice',
    title: 'Non-Compliance Notice',
    description: 'Fire alarm non-compliance',
    badge: 'BS 5839',
    href: '/electrician/inspection-testing/non-compliance-notice',
  },
  {
    id: 'completion-notice',
    title: 'Completion Notice',
    description: 'Work completion confirmation',
    badge: 'General',
    href: '/electrician/inspection-testing/completion-notice',
  },
];

const printables: DocDef[] = [
  {
    id: 'warning-labels',
    title: 'Warning Labels',
    description: 'Printable BS 7671 labels',
    badge: 'BS 7671',
    href: '/electrician/inspection-testing/warning-labels',
  },
  {
    id: 'board-schedule',
    title: 'Board Schedule',
    description: 'CU door label & A4 schedule',
    badge: 'Printable',
    href: '/electrician/inspection-testing/board-schedule',
  },
];

const siteRecords: DocDef[] = [
  {
    id: 'safe-isolation',
    title: 'Safe Isolation',
    description: 'GS 38 isolation checklist',
    badge: 'GS 38',
    href: '/electrician/inspection-testing/safe-isolation',
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'AI-generated risk assessment',
    badge: 'AI-Powered',
    href: '/electrician/health-safety',
  },
];

const clientHandouts: DocDef[] = [
  {
    id: 'client-handouts',
    title: 'Client Handouts',
    description: 'Branded guides for clients',
    badge: '9 Templates',
    href: '/electrician/inspection-testing/client-handouts',
  },
];

/**
 * Doc card — the same recipe as the Inspection & Testing hub cards, imported
 * rather than retyped so the two can't drift apart again.
 *
 * Two changes from the old version. The badge was floating alone in a row of
 * its own at the top-RIGHT with the whole width empty beside it; it's now a
 * plain eyebrow at the top-left where every other card in the app puts it.
 * And the solid volt "Open" BUTTON is gone — one per card meant six volt
 * blocks stacked down a phone screen, which stops volt meaning anything. The
 * whole card is the button, and "Open" is the text affordance.
 */
const DocCard = ({ doc }: { doc: DocDef }) => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  const disabled = !!doc.comingSoon && !doc.href;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!doc.href) return;
        haptic.light();
        navigate(doc.href);
      }}
      className={cn(
        CARD_BASE,
        disabled ? CARD_DISABLED + ' active:scale-100' : CARD_NEUTRAL,
        'p-3.5 sm:p-4'
      )}
    >
      <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
        {doc.badge}
      </span>

      <span className="mt-1.5 text-[15px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow sm:text-[17px]">
        {doc.title}
      </span>
      <span className="mt-1 text-[11.5px] leading-snug text-white sm:text-[12.5px]">
        {doc.description}
      </span>

      <span className="flex-grow" />

      <span className="mt-3 flex items-baseline justify-between gap-2 border-t border-white/[0.10] pt-2.5">
        <span className="min-w-0 truncate text-[11px] text-white">
          {disabled ? 'Coming soon' : ''}
        </span>
        {!disabled && (
          <span className="shrink-0 text-[12px] font-bold text-elec-yellow">Open</span>
        )}
      </span>
    </button>
  );
};

// Section: plain-text group label + responsive card grid.
const HubSection = ({ title, docs }: { title: string; docs: DocDef[] }) => (
  <motion.section variants={itemVariants} className="space-y-3">
    <div className="flex items-baseline gap-2.5 px-0.5">
      <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
      <span className="text-[12px] text-white tabular-nums">{docs.length}</span>
    </div>
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-3">
      {docs.map((doc) => (
        <DocCard key={doc.id} doc={doc} />
      ))}
    </div>
  </motion.section>
);

interface LabelsWarningsSectionProps {
  onBack: () => void;
}

const DOC_TYPE_LABELS: Record<string, { label: string }> = {
  'danger-notice': { label: 'DN' },
  'isolation-cert': { label: 'ISO' },
  'permit-to-work': { label: 'PTW' },
  'warning-labels': { label: 'LABELS' },
  'safe-isolation': { label: 'SIP' },
  'limitation-notice': { label: 'LIM' },
  'visual-condition': { label: 'VCR' },
  'non-compliance-notice': { label: 'NCN' },
  'completion-notice': { label: 'COMP' },
};

const DOC_TYPE_ROUTES: Record<string, string> = {
  'danger-notice': 'danger-notice',
  'isolation-cert': 'isolation-certificate',
  'permit-to-work': 'permit-to-work',
  'safe-isolation': 'safe-isolation',
  'limitation-notice': 'limitation-notice',
  'visual-condition': 'visual-condition',
  'non-compliance-notice': 'non-compliance-notice',
  'completion-notice': 'completion-notice',
};

const LabelsWarningsSection = ({ onBack }: LabelsWarningsSectionProps) => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const { data: savedDocs } = useQuery({
    queryKey: ['labels-warnings-docs', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('reports')
        .select('report_id, report_type, client_name, installation_address, updated_at, status')
        .eq('user_id', user.id)
        .in('report_type', ['danger-notice', 'isolation-cert', 'permit-to-work', 'warning-labels', 'safe-isolation', 'limitation-notice', 'non-compliance-notice', 'completion-notice', 'visual-condition'])
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(10);
      return (data || []) as Array<{
        report_id: string;
        report_type: string;
        client_name: string | null;
        installation_address: string | null;
        updated_at: string;
        status: string;
      }>;
    },
    enabled: !!user,
    staleTime: 10 * 1000,
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header — quiet, no rules or eyebrows; the cards carry the page */}
      <div className="px-4 lg:px-8 pt-3 pb-1">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97]"
        >
          Back
        </button>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
            Notices & Labels
          </h1>
          <span className="text-[13px] text-white">Danger, isolation, permits and handouts</span>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 lg:px-8 space-y-7 lg:max-w-[1600px]"
      >
        <HubSection title="Notices & Permits" docs={noticesAndPermits} />
        <HubSection title="Site Records" docs={siteRecords} />
        <HubSection title="Printables" docs={printables} />
        <HubSection title="Client Documents" docs={clientHandouts} />

        {/* Recent documents — same card recipe, compact */}
        {savedDocs && savedDocs.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-baseline gap-2.5 px-0.5">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Recent documents
              </h2>
              <span className="text-[12px] text-white tabular-nums">{savedDocs.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-3">
              {savedDocs.map((doc) => {
                const typeInfo = DOC_TYPE_LABELS[doc.report_type] || { label: 'DOC' };
                const route = DOC_TYPE_ROUTES[doc.report_type];
                const title = doc.client_name || doc.installation_address || 'Untitled';

                return (
                  <button
                    key={doc.report_id}
                    type="button"
                    onClick={() => {
                      if (!route) return;
                      haptic.light();
                      navigate(`/electrician/inspection-testing/${route}/${doc.report_id}`);
                    }}
                    className={cn(CARD_BASE, CARD_NEUTRAL, 'p-3.5 sm:p-4')}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        {typeInfo.label}
                      </span>
                      <span className="ml-auto shrink-0 text-[11px] tabular-nums text-white">
                        {formatTimeAgo(doc.updated_at)}
                      </span>
                    </span>

                    <span
                      title={title}
                      className="mt-1.5 block truncate text-[15px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow sm:text-[17px]"
                    >
                      {title}
                    </span>
                    {doc.installation_address && (
                      <span
                        title={doc.installation_address}
                        className="mt-1 block truncate text-[11.5px] leading-snug text-white sm:text-[12.5px]"
                      >
                        {doc.installation_address}
                      </span>
                    )}

                    <span className="flex-grow" />

                    <span className="mt-3 flex items-baseline justify-between gap-2 border-t border-white/[0.10] pt-2.5">
                      <span className="text-[11px] font-semibold text-emerald-300">Issued</span>
                      <span className="shrink-0 text-[12px] font-bold text-elec-yellow">Open</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}
      </motion.main>
    </div>
  );
};

export default LabelsWarningsSection;
