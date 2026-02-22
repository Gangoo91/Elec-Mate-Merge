import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight, CloudOff } from 'lucide-react';
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'minor-works':
        return 'MW';
      case 'eic':
        return 'EIC';
      case 'eicr':
        return 'EICR';
      case 'ev-charging':
        return 'EV';
      case 'fire-alarm':
        return 'FIRE';
      case 'emergency-lighting':
        return 'EM LTG';
      case 'pat-testing':
        return 'PAT';
      case 'solar-pv':
        return 'SOLAR';
      default:
        return type.toUpperCase().slice(0, 5);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <FileText className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-semibold text-white">Recent Certificates</span>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <FileText className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-semibold text-white">Recent Certificates</span>
        </div>
        <button
          onClick={() => onNavigate('minor-works')}
          className="group w-full flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.09] active:scale-[0.98] transition-all touch-manipulation text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-elec-yellow/12 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">No certificates yet</p>
            <p className="text-sm text-white mt-0.5">Tap to create your first</p>
          </div>
          <ChevronRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <FileText className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-semibold text-white">Recent Certificates</span>
          {unsyncedCount > 0 && (
            <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-amber-500/15 text-amber-400 flex items-center gap-1">
              <CloudOff className="h-3 w-3" />
              {unsyncedCount} unsynced
            </span>
          )}
        </div>
        {reports.length > 4 && (
          <button
            className="text-sm font-medium text-elec-yellow hover:underline touch-manipulation h-11 flex items-center"
            onClick={() => onNavigate('my-reports')}
          >
            View All
          </button>
        )}
      </div>

      {/* Certificate List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {reports.slice(0, 4).map((report, index) => {
            const localBackup = hasNewerLocalBackup(report);
            return (
              <motion.div
                key={report.report_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  'flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer',
                  'bg-white/[0.06] border border-white/[0.08]',
                  'hover:bg-white/[0.09] active:scale-[0.98] transition-all touch-manipulation'
                )}
                onClick={() => handleOpenCertificate(report)}
              >
                <div className="flex-1 min-w-0">
                  {/* Badges row */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded',
                        localBackup
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-elec-yellow/15 text-elec-yellow'
                      )}
                    >
                      {getTypeLabel(report.report_type)}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded',
                        localBackup ? 'bg-amber-500/15 text-amber-400' : getStatusStyle(report.status)
                      )}
                    >
                      {localBackup ? 'Unsynced' : getStatusLabel(report.status)}
                    </span>
                    <span className="text-xs text-white ml-auto">
                      {formatTimeAgo(localBackup?.savedAt || report.updated_at)}
                    </span>
                  </div>
                  {/* Client name */}
                  <h4 className="text-sm font-semibold text-white truncate text-left">
                    {report.client_name || 'Untitled'}
                  </h4>
                  {/* Address */}
                  <p className="text-sm text-white truncate mt-0.5 text-left">
                    {report.installation_address || 'No address'}
                  </p>
                </div>

                <ChevronRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentCertificatesCard;
