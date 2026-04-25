import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CloudOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { listAllBackups } from '@/utils/dataIntegrity';

interface RecentCertificatesCardProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

interface LocalBackup {
  reportType: string;
  reportId: string;
  savedAt: string;
  fieldCount: number;
}

/** Map report_type to a short badge label */
const getTypeLabel = (type: string, data?: Record<string, unknown>) => {
  switch (type) {
    case 'minor-works':
      return 'MW';
    case 'eic':
      return 'EIC';
    case 'eicr':
      return 'EICR';
    case 'ev-charging':
      return 'EV';
    case 'fire-alarm': {
      const cat = data?.systemCategory as string | undefined;
      return cat ? `FA G1 ${cat}` : 'FA G1';
    }
    case 'fire-alarm-commissioning':
      return 'FA G2';
    case 'fire-alarm-inspection':
      return 'FA G7';
    case 'fire-alarm-modification':
      return 'FA G4';
    case 'emergency-lighting':
      return 'EM LTG';
    case 'pat-testing':
      return 'PAT';
    case 'solar-pv':
      return 'SOLAR PV';
    case 'danger-notice':
      return 'DANGER';
    case 'isolation-cert':
      return 'ISOLATION';
    case 'permit-to-work':
      return 'PERMIT';
    case 'safe-isolation':
      return 'SAFE ISO';
    case 'limitation-notice':
      return 'LIMITATION';
    case 'non-compliance-notice':
      return 'NON-COMP';
    case 'completion-notice':
      return 'COMPLETION';
    case 'bess':
      return 'BESS';
    case 'lightning-protection':
      return 'LPS';
    case 'g98-commissioning':
      return 'G98';
    case 'g99-commissioning':
      return 'G99';
    case 'smoke-co-alarm':
      return 'SMOKE/CO';
    default:
      return type.toUpperCase().replace(/-/g, ' ').slice(0, 8);
  }
};

/** Gradient accent colour for the card top line based on cert family */
const getTypeAccent = (type: string) => {
  if (type.startsWith('fire-alarm')) return 'from-red-500 via-rose-400 to-pink-400';
  if (type === 'eicr') return 'from-blue-500 via-blue-400 to-cyan-400';
  if (type === 'eic') return 'from-emerald-500 via-emerald-400 to-green-400';
  if (type === 'minor-works') return 'from-orange-500 via-amber-400 to-yellow-400';
  if (type === 'ev-charging') return 'from-cyan-500 via-cyan-400 to-blue-400';
  if (type === 'emergency-lighting') return 'from-violet-500 via-purple-400 to-indigo-400';
  if (type === 'pat-testing') return 'from-amber-500 via-amber-400 to-yellow-400';
  if (type === 'solar-pv') return 'from-yellow-500 via-yellow-400 to-orange-400';
  return 'from-elec-yellow via-amber-400 to-orange-400';
};

/** Badge colour for the type label */
const getTypeBadgeStyle = (type: string) => {
  if (type.startsWith('fire-alarm')) return 'bg-red-500/15 text-red-400';
  if (type === 'eicr') return 'bg-blue-500/15 text-blue-400';
  if (type === 'eic') return 'bg-emerald-500/15 text-emerald-400';
  if (type === 'minor-works') return 'bg-orange-500/15 text-orange-400';
  if (type === 'ev-charging') return 'bg-cyan-500/15 text-cyan-400';
  if (type === 'emergency-lighting') return 'bg-violet-500/15 text-violet-400';
  if (type === 'pat-testing') return 'bg-amber-500/15 text-amber-400';
  if (type === 'solar-pv') return 'bg-yellow-500/15 text-yellow-400';
  return 'bg-elec-yellow/15 text-elec-yellow';
};

const RecentCertificatesCard = ({ onNavigate }: RecentCertificatesCardProps) => {
  const [user, setUser] = useState<any>(null);
  const [localBackups, setLocalBackups] = useState<LocalBackup[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  useEffect(() => {
    const backups = listAllBackups();
    setLocalBackups(backups);
  }, []);

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ['recent-certificates', user?.id],
    queryFn: async () => {
      if (!user) return { reports: [], totalCount: 0, hasMore: false };
      return await reportCloud.getUserReports(user.id, { limit: 5 });
    },
    enabled: !!user,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: true,
  });

  const reports = reportsData?.reports ?? [];

  const backupMap = useMemo(() => {
    const map = new Map<string, LocalBackup>();
    localBackups.forEach((backup) => {
      map.set(backup.reportId, backup);
    });
    return map;
  }, [localBackups]);

  const hasNewerLocalBackup = (report: CloudReport): LocalBackup | null => {
    const backup = backupMap.get(report.report_id);
    if (!backup) return null;
    const cloudTime = new Date(report.updated_at).getTime();
    const localTime = new Date(backup.savedAt).getTime();
    if (localTime > cloudTime) return backup;
    return null;
  };

  const unsyncedCount = useMemo(() => {
    return reports.filter((r) => hasNewerLocalBackup(r) !== null).length;
  }, [reports, backupMap]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-amber-500/15 text-amber-400';
      case 'in-progress':
        return 'bg-blue-500/15 text-blue-400';
      case 'completed':
        return 'bg-green-500/15 text-green-400';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 2) return '1h ago';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const handleOpenCertificate = (report: CloudReport) => {
    onNavigate(report.report_type, report.report_id, report.report_type);
  };

  if (isLoading) {
    return (
      <div>
        <div className="border-b border-white/[0.06] pb-1 mb-4">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">Recent Certificates</h2>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-24 w-full rounded-2xl bg-white/[0.03]" />
          <Skeleton className="h-24 w-full rounded-2xl bg-white/[0.03]" />
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div>
        <div className="border-b border-white/[0.06] pb-1 mb-4">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">Recent Certificates</h2>
        </div>
        <button
          onClick={() => onNavigate('minor-works')}
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
        >
          <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />
            <div className="relative z-10 flex flex-col p-4">
              <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                No certificates yet
              </h3>
              <p className="mt-1 text-[12px] text-white leading-tight">Tap to create your first</p>
              <div className="flex-grow min-h-[8px]" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-medium text-elec-yellow">Create</span>
                <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                  <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="border-b border-white/[0.06] pb-1 flex-1">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <div className="flex items-center gap-2.5">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Recent Certificates</h2>
            {unsyncedCount > 0 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 flex items-center gap-1">
                <CloudOff className="h-3 w-3" />
                {unsyncedCount} unsynced
              </span>
            )}
          </div>
        </div>
        {reports.length > 0 && (
          <button
            className="text-xs font-medium text-elec-yellow hover:underline touch-manipulation h-11 flex items-center ml-3"
            onClick={() => onNavigate('my-reports')}
          >
            View All
          </button>
        )}
      </div>

      {/* Certificate List — HubCard style */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {reports.slice(0, 5).map((report, index) => {
            const localBackup = hasNewerLocalBackup(report);
            return (
              <motion.div
                key={report.report_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  onClick={() => handleOpenCertificate(report)}
                  className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
                >
                  <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
                    {/* Gradient accent line — colour matches cert type */}
                    <div
                      className={cn(
                        'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200',
                        localBackup ? 'from-amber-500 via-amber-400 to-yellow-400' : getTypeAccent(report.report_type)
                      )}
                    />
                    <div className="relative z-10 p-4">
                      {/* Top row: badges + time */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <span
                          className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded',
                            localBackup
                              ? 'bg-amber-500/20 text-amber-400'
                              : getTypeBadgeStyle(report.report_type)
                          )}
                        >
                          {getTypeLabel(report.report_type, report.data)}
                        </span>
                        <span
                          className={cn(
                            'text-[10px] font-semibold px-2 py-0.5 rounded',
                            localBackup ? 'bg-amber-500/15 text-amber-400' : getStatusStyle(report.status)
                          )}
                        >
                          {localBackup ? 'Unsynced' : getStatusLabel(report.status)}
                        </span>
                        <span className="text-[11px] text-white ml-auto">
                          {formatTimeAgo(localBackup?.savedAt || report.updated_at)}
                        </span>
                      </div>

                      {/* Client name */}
                      <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors truncate">
                        {report.client_name || 'Untitled'}
                      </h3>
                      {/* Address */}
                      <p className="mt-0.5 text-[12px] text-white leading-tight truncate">
                        {report.installation_address || 'No address'}
                      </p>

                      {/* Bottom row: Open + chevron */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[11px] font-medium text-elec-yellow">
                          {report.status === 'completed' ? 'View' : 'Continue'}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                          <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentCertificatesCard;
