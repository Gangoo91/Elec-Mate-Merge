import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

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
  accentColor: string;
  comingSoon?: boolean;
  href?: string;
}

const noticesAndPermits: DocDef[] = [
  {
    id: 'danger-notice',
    title: 'Danger Notice',
    description: 'C1 danger — issue on the spot',
    badge: 'BS 7671',
    accentColor: 'from-red-500 via-rose-400 to-pink-400',
    href: '/electrician/inspection-testing/danger-notice',
  },
  {
    id: 'isolation-certificate',
    title: 'Isolation Certificate',
    description: 'Safe isolation record',
    badge: 'GS 38',
    accentColor: 'from-amber-500 via-amber-400 to-yellow-400',
    href: '/electrician/inspection-testing/isolation-certificate',
  },
  {
    id: 'permit-to-work',
    title: 'Permit to Work',
    description: 'Work authorisation',
    badge: 'HSE',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',
    href: '/electrician/inspection-testing/permit-to-work',
  },
  {
    id: 'limitation-notice',
    title: 'Limitation Notice',
    description: 'Record limitations on inspection',
    badge: 'BS 7671',
    accentColor: 'from-blue-500 via-blue-400 to-cyan-400',
    href: '/electrician/inspection-testing/limitation-notice',
  },
  {
    id: 'non-compliance-notice',
    title: 'Non-Compliance Notice',
    description: 'Fire alarm non-compliance',
    badge: 'BS 5839',
    accentColor: 'from-red-500 via-orange-400 to-amber-400',
    href: '/electrician/inspection-testing/non-compliance-notice',
  },
  {
    id: 'completion-notice',
    title: 'Completion Notice',
    description: 'Work completion confirmation',
    badge: 'General',
    accentColor: 'from-emerald-500 via-emerald-400 to-green-400',
    href: '/electrician/inspection-testing/completion-notice',
  },
];

const printables: DocDef[] = [
  {
    id: 'warning-labels',
    title: 'Warning Labels',
    description: 'Printable BS 7671 labels',
    badge: 'BS 7671',
    accentColor: 'from-yellow-500 via-amber-400 to-orange-400',
    href: '/electrician/inspection-testing/warning-labels',
  },
  {
    id: 'board-schedule',
    title: 'Board Schedule',
    description: 'CU door label & A4 schedule',
    badge: 'Printable',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',
    href: '/electrician/inspection-testing/board-schedule',
  },
];

const siteRecords: DocDef[] = [
  {
    id: 'safe-isolation',
    title: 'Safe Isolation',
    description: 'GS 38 isolation checklist',
    badge: 'GS 38',
    accentColor: 'from-emerald-500 via-emerald-400 to-green-400',
    href: '/electrician/inspection-testing/safe-isolation',
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'AI-generated risk assessment',
    badge: 'AI-Powered',
    accentColor: 'from-blue-500 via-blue-400 to-cyan-400',
    href: '/electrician/health-safety',
  },
];

const clientHandouts: DocDef[] = [
  {
    id: 'client-handouts',
    title: 'Client Handouts',
    description: 'Branded guides for clients',
    badge: '9 Templates',
    accentColor: 'from-emerald-500 via-green-400 to-teal-400',
    href: '/electrician/inspection-testing/client-handouts',
  },
];

interface DocCardProps {
  doc: DocDef;
  onClick?: () => void;
}

// Editorial tiled card — sits inside a HubSection grid with hairline seams.
const DocCard = ({ doc, onClick }: DocCardProps) => {
  const navigate = useNavigate();
  const disabled = !!doc.comingSoon && !doc.href;
  // Derive a solid accent dot from the gradient's "from-" token.
  const dot = doc.accentColor.split(' ')[0].replace('from-', 'bg-');

  const handleClick = () => {
    if (doc.href) navigate(doc.href);
    else if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'group relative flex flex-col text-left min-h-[112px] p-4 bg-[hsl(0_0%_11%)] transition-colors touch-manipulation',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50',
        disabled ? 'opacity-50' : 'hover:bg-elec-yellow/[0.05] active:bg-white/[0.05]'
      )}
    >
      {/* accent dot + standard badge */}
      <div className="flex items-start justify-between gap-2">
        <span className={cn('mt-1 w-2 h-2 rounded-full shrink-0', dot)} aria-hidden />
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 border border-white/[0.12] rounded px-1.5 py-0.5 shrink-0">
          {doc.badge}
        </span>
      </div>

      <h3 className="mt-3 text-[16.5px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
        {doc.title}
      </h3>
      <p className="mt-1.5 text-[12px] leading-relaxed text-white/55 line-clamp-2">
        {doc.description}
      </p>

      <div className="flex-grow min-h-[10px]" />

      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-elec-yellow">
        {disabled ? 'Coming soon' : 'Open'}
        {!disabled && (
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        )}
      </span>
    </button>
  );
};

// Editorial section: micro-label header + tiled card grid (hairline seams,
// gold top hairline) — mirrors EditorialHubGrid.
const HubSection = ({ title, docs }: { title: string; docs: DocDef[] }) => (
  <motion.section variants={itemVariants} className="space-y-2.5">
    <div className="flex items-end justify-between gap-3 px-0.5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">{title}</h2>
      <span className="text-[10.5px] text-white/30 tabular-nums">{docs.length}</span>
    </div>
    <div
      className={cn(
        'relative grid gap-[1.5px] bg-white/[0.14] border border-white/[0.14] rounded-2xl overflow-hidden',
        docs.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
      {docs.map((doc) => (
        <DocCard key={doc.id} doc={doc} />
      ))}
    </div>
  </motion.section>
);

interface LabelsWarningsSectionProps {
  onBack: () => void;
}

const DOC_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  'danger-notice': { label: 'DN', color: 'bg-red-500/15 text-red-400' },
  'isolation-cert': { label: 'ISO', color: 'bg-amber-500/15 text-amber-400' },
  'permit-to-work': { label: 'PTW', color: 'bg-orange-500/15 text-orange-400' },
  'warning-labels': { label: 'LABELS', color: 'bg-yellow-500/15 text-yellow-400' },
  'safe-isolation': { label: 'SIP', color: 'bg-emerald-500/15 text-emerald-400' },
  'limitation-notice': { label: 'LIM', color: 'bg-blue-500/15 text-blue-400' },
  'non-compliance-notice': { label: 'NCN', color: 'bg-red-500/15 text-red-400' },
  'completion-notice': { label: 'COMP', color: 'bg-emerald-500/15 text-emerald-400' },
};

const DOC_TYPE_ROUTES: Record<string, string> = {
  'danger-notice': 'danger-notice',
  'isolation-cert': 'isolation-certificate',
  'permit-to-work': 'permit-to-work',
  'safe-isolation': 'safe-isolation',
  'limitation-notice': 'limitation-notice',
  'non-compliance-notice': 'non-compliance-notice',
  'completion-notice': 'completion-notice',
};

const LabelsWarningsSection = ({ onBack }: LabelsWarningsSectionProps) => {
  const navigate = useNavigate();
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
        .in('report_type', ['danger-notice', 'isolation-cert', 'permit-to-work', 'warning-labels', 'safe-isolation', 'limitation-notice', 'non-compliance-notice', 'completion-notice'])
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
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">Labels & Warnings</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        <HubSection title="Client Documents" docs={clientHandouts} />
        <HubSection title="Notices & Permits" docs={noticesAndPermits} />
        <HubSection title="Site Records" docs={siteRecords} />
        <HubSection title="Printables" docs={printables} />

        {/* Recent Documents — editorial list, hairline-separated to match the grids above */}
        {savedDocs && savedDocs.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-2.5">
            <div className="flex items-end justify-between gap-3 px-0.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Recent Documents
              </h2>
              <span className="text-[10.5px] text-white/30 tabular-nums">{savedDocs.length}</span>
            </div>
            <div className="relative border border-white/[0.14] rounded-2xl overflow-hidden divide-y divide-white/[0.14]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
              {savedDocs.map((doc) => {
                const typeInfo =
                  DOC_TYPE_LABELS[doc.report_type] || { label: 'DOC', color: 'bg-white/[0.06] text-white' };
                const route = DOC_TYPE_ROUTES[doc.report_type];
                const title = doc.client_name || doc.installation_address || 'Untitled';

                return (
                  <button
                    key={doc.report_id}
                    onClick={() =>
                      route && navigate(`/electrician/inspection-testing/${route}/${doc.report_id}`)
                    }
                    className="group w-full flex items-center gap-3 p-3.5 bg-[hsl(0_0%_11%)] hover:bg-elec-yellow/[0.05] active:bg-white/[0.05] transition-colors text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50"
                  >
                    {/* type tile */}
                    <div
                      className={cn(
                        'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.08]',
                        typeInfo.color
                      )}
                    >
                      <span className="text-[9px] font-bold leading-none">{typeInfo.label}</span>
                    </div>

                    {/* title + address */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-[15px] leading-tight truncate group-hover:text-elec-yellow transition-colors">
                        {title}
                      </h3>
                      <div
                        className={cn(
                          'mt-1 flex items-center gap-1 text-[11.5px] leading-snug min-w-0',
                          doc.installation_address ? 'text-white/45' : 'text-white/30'
                        )}
                      >
                        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                        <span className={cn('truncate', !doc.installation_address && 'italic')}>
                          {doc.installation_address || 'No address'}
                        </span>
                      </div>
                    </div>

                    {/* status + date + chevron */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] rounded-md px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400">
                          Issued
                        </span>
                        <span className="text-[10.5px] text-white/40 tabular-nums">
                          {formatTimeAgo(doc.updated_at)}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/25 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
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
