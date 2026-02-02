import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Clock, ChevronRight, MapPin, Plus, CloudOff, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { listAllBackups } from '@/utils/dataIntegrity';

interface RecentCertificatesCardProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

// Type for local backups
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

  // Check for local backups on mount
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

  // Create a map of report IDs that have local backups
  const backupMap = useMemo(() => {
    const map = new Map<string, LocalBackup>();
    localBackups.forEach(backup => {
      map.set(backup.reportId, backup);
    });
    return map;
  }, [localBackups]);

  // Check if a report has a local backup that's newer than cloud
  const hasNewerLocalBackup = (report: CloudReport): LocalBackup | null => {
    const backup = backupMap.get(report.report_id);
    if (!backup) return null;

    const cloudTime = new Date(report.updated_at).getTime();
    const localTime = new Date(backup.savedAt).getTime();

    // If local backup is newer, return it
    if (localTime > cloudTime) {
      return backup;
    }
    return null;
  };

  // Count reports with unsynced local changes
  const unsyncedCount = useMemo(() => {
    return reports.filter(r => hasNewerLocalBackup(r) !== null).length;
  }, [reports, backupMap]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-amber-500/15 text-amber-400';
      case 'in-progress': return 'bg-blue-500/15 text-blue-400';
      case 'completed': return 'bg-green-500/15 text-green-400';
      default: return 'bg-white/10 text-white/60';
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
      case 'minor-works': return 'MW';
      case 'eic': return 'EIC';
      case 'eicr': return 'EICR';
      default: return 'CERT';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">Recent Certificates</span>
        </div>
        <Skeleton className="h-16 w-full rounded-xl bg-black/40 mb-2" />
        <Skeleton className="h-16 w-full rounded-xl bg-black/40" />
      </div>
    );
  }

  // Empty state
  if (reports.length === 0) {
    return (
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">Recent Certificates</span>
        </div>
        <div className="text-center py-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
            <FileText className="h-6 w-6 text-elec-yellow/50" />
          </div>
          <p className="text-sm text-white/40 mb-4">No certificates yet</p>
          <Button
            onClick={() => onNavigate('minor-works')}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-10 px-5 font-semibold rounded-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Certificate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-elec-yellow">Recent Certificates</span>
          </div>
          {unsyncedCount > 0 && (
            <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400 flex items-center gap-1">
              <CloudOff className="h-3 w-3" />
              {unsyncedCount} unsynced
            </span>
          )}
        </div>
      </div>

      {/* Certificate List */}
      <div className="px-3 pb-3 space-y-2">
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
                  "relative p-3 rounded-xl cursor-pointer",
                  "bg-black/40 hover:bg-black/50 border border-white/5",
                  "active:scale-[0.98] transition-all touch-manipulation"
                )}
                onClick={() => handleOpenCertificate(report)}
              >
                {/* Top row: Type badge + Status + Time */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-md",
                    localBackup ? 'bg-amber-500/20 text-amber-400' : 'bg-elec-yellow/20 text-elec-yellow'
                  )}>
                    {getTypeLabel(report.report_type)}
                  </span>
                  <span className={cn(
                    'text-[10px] font-medium px-2 py-0.5 rounded-md',
                    localBackup ? 'bg-amber-500/15 text-amber-400' : getStatusStyle(report.status)
                  )}>
                    {localBackup ? 'Unsynced' : getStatusLabel(report.status)}
                  </span>
                  <span className="text-[10px] text-white/30 ml-auto">
                    {formatTimeAgo(localBackup?.savedAt || report.updated_at)}
                  </span>
                </div>

                {/* Client name */}
                <h4 className="text-sm font-semibold text-white truncate text-left">
                  {report.client_name || 'Untitled'}
                </h4>

                {/* Address */}
                <p className="text-xs text-white/40 truncate text-left mt-0.5">
                  {report.installation_address || 'No address'}
                </p>

                {/* Chevron */}
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {reports.length > 4 && (
        <div className="px-3 pb-3">
          <button
            className="w-full py-2 text-xs text-elec-yellow/60 hover:text-elec-yellow transition-colors"
            onClick={() => onNavigate('my-reports')}
          >
            View All ({reports.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentCertificatesCard;
