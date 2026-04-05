import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, ChevronRight } from 'lucide-react';
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
];

const warningLabels: DocDef[] = [
  {
    id: 'warning-labels',
    title: 'Warning Labels',
    description: 'Printable BS 7671 labels',
    badge: 'BS 7671',
    accentColor: 'from-yellow-500 via-amber-400 to-orange-400',
    href: '/electrician/inspection-testing/warning-labels',
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

interface DocCardProps {
  doc: DocDef;
  onClick?: () => void;
}

const DocCard = ({ doc, onClick }: DocCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (doc.href) {
      navigate(doc.href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div variants={itemVariants} className="h-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={doc.comingSoon && !doc.href}
        className={cn(
          'block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation',
          doc.comingSoon && !doc.href && 'opacity-60'
        )}
      >
        <div
          className={cn(
            'group relative overflow-hidden h-full',
            'card-surface-interactive',
            'active:scale-[0.98] transition-all duration-200'
          )}
        >
          {/* Top accent line */}
          <div
            className={cn(
              'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200',
              doc.accentColor
            )}
          />

          {/* Coming Soon pill */}
          {doc.comingSoon && !doc.href && (
            <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-elec-yellow text-black rounded-full z-20">
              Soon
            </span>
          )}

          <div className="relative z-10 flex flex-col h-full p-4">
            {/* Badge */}
            <div className="flex items-center justify-end mb-3">
              <span className="text-[10px] font-bold text-white bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded">
                {doc.badge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
              {doc.title}
            </h3>

            {/* Description */}
            <p className="mt-1 text-[12px] text-white leading-tight line-clamp-2">
              {doc.description}
            </p>

            <div className="flex-grow min-h-[12px]" />

            {/* Bottom action */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-elec-yellow">
                {doc.comingSoon && !doc.href ? 'Coming Soon' : 'Open'}
              </span>
              {(!doc.comingSoon || doc.href) && (
                <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                  <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

interface LabelsWarningsSectionProps {
  onBack: () => void;
}

const DOC_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  'danger-notice': { label: 'DN', color: 'bg-red-500/15 text-red-400' },
  'isolation-cert': { label: 'ISO', color: 'bg-amber-500/15 text-amber-400' },
  'permit-to-work': { label: 'PTW', color: 'bg-orange-500/15 text-orange-400' },
  'warning-labels': { label: 'LABELS', color: 'bg-yellow-500/15 text-yellow-400' },
  'safe-isolation': { label: 'SIP', color: 'bg-emerald-500/15 text-emerald-400' },
};

const DOC_TYPE_ROUTES: Record<string, string> = {
  'danger-notice': 'danger-notice',
  'isolation-cert': 'isolation-certificate',
  'permit-to-work': 'permit-to-work',
  'safe-isolation': 'safe-isolation',
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
        .in('report_type', ['danger-notice', 'isolation-cert', 'permit-to-work', 'warning-labels', 'safe-isolation'])
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
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
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
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Zap className="h-4 w-4 text-elec-yellow" />
              </div>
              <h1 className="text-base font-semibold text-white">Labels & Warnings</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {/* Recent Documents */}
        {savedDocs && savedDocs.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
              Recent Documents
            </h2>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {savedDocs.map((doc, index) => {
                  const typeInfo = DOC_TYPE_LABELS[doc.report_type] || { label: 'DOC', color: 'bg-white/[0.06] text-white' };
                  const route = DOC_TYPE_ROUTES[doc.report_type];

                  return (
                    <motion.div
                      key={doc.report_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] active:scale-[0.98] transition-all touch-manipulation"
                      onClick={() => route && navigate(`/electrician/inspection-testing/${route}/${doc.report_id}`)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', typeInfo.color)}>
                            {typeInfo.label}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Issued
                          </span>
                          <span className="text-[11px] text-white ml-auto flex-shrink-0">
                            {formatTimeAgo(doc.updated_at)}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white truncate text-left">
                          {doc.client_name || doc.installation_address || 'Untitled'}
                        </h4>
                        {doc.installation_address && doc.client_name && (
                          <p className="text-sm text-white truncate mt-0.5 text-left">
                            {doc.installation_address}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* Notices & Permits */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Notices & Permits
          </h2>
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {noticesAndPermits.map((doc) => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        </motion.section>

        {/* Warning Labels */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Warning Labels
          </h2>
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {warningLabels.map((doc) => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        </motion.section>

        {/* Site Records */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Site Records
          </h2>
          <div className="grid grid-cols-2 gap-3 auto-rows-fr">
            {siteRecords.map((doc) => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default LabelsWarningsSection;
