import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Clock, ChevronRight, MapPin, Plus, CloudOff, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { cn } from '@/lib/utils';
import { listAllBackups } from '@/utils/dataIntegrity';

interface RecentCertificatesCardProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  }
};

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
      <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
        <div className="p-3 border-b border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Recent Certificates</span>
          </div>
        </div>
        <div className="p-3">
          <LoadingSkeleton type="list" count={3} />
        </div>
      </div>
    );
  }

  // Empty state
  if (reports.length === 0) {
    return (
      <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
        <div className="p-3 border-b border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Recent Certificates</span>
          </div>
        </div>
        <div className="p-3">
          <div className="py-6 text-center">
            <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
              <FileText className="h-5 w-5 text-elec-yellow/50" />
            </div>
            <p className="text-sm font-medium text-white/70 mb-1">No certificates yet</p>
            <p className="text-xs text-white/40 mb-3">Create your first certificate to get started</p>
            <Button
              onClick={() => onNavigate('minor-works')}
              className="bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/25 font-medium rounded-lg h-9 px-4 touch-manipulation"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Certificate
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
      {/* Unsynced Changes Banner */}
      {unsyncedCount > 0 && (
        <div className="px-3 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2">
          <CloudOff className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] text-amber-400">
            {unsyncedCount} certificate{unsyncedCount > 1 ? 's have' : ' has'} unsynced local changes
          </span>
        </div>
      )}

      {/* Header */}
      <div className="p-3 border-b border-elec-yellow/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Recent Certificates</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('my-reports')}
            className="text-elec-yellow/60 hover:text-elec-yellow hover:bg-elec-yellow/10 h-7 px-2 text-xs font-medium touch-manipulation"
          >
            View All <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Certificate Cards */}
      <motion.div
        className="p-2 space-y-1.5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {reports.map((report) => {
            const localBackup = hasNewerLocalBackup(report);
            return (
              <motion.button
                key={report.report_id}
                variants={cardVariants}
                layout
                className={cn(
                  'w-full rounded-lg border bg-elec-yellow/5',
                  'cursor-pointer transition-all touch-manipulation',
                  'active:scale-[0.98]',
                  'p-2.5 text-left',
                  localBackup
                    ? 'border-amber-500/30 hover:border-amber-500/50'
                    : 'border-elec-yellow/10 hover:border-elec-yellow/30'
                )}
                onClick={() => handleOpenCertificate(report)}
              >
                <div className="flex items-center gap-2.5">
                  {/* Type Badge */}
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 relative',
                    localBackup ? 'bg-amber-500/15' : 'bg-elec-yellow/15'
                  )}>
                    <span className={cn(
                      'text-[10px] font-bold',
                      localBackup ? 'text-amber-400' : 'text-elec-yellow'
                    )}>
                      {getTypeLabel(report.report_type)}
                    </span>
                    {/* Local backup indicator dot */}
                    {localBackup && (
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border border-card" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name and Status */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-white truncate">
                        {report.client_name || 'Untitled'}
                      </span>
                      {localBackup ? (
                        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 bg-amber-500/15 text-amber-400 flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5" />
                          Unsynced
                        </span>
                      ) : (
                        <span className={cn(
                          'text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0',
                          getStatusStyle(report.status)
                        )}>
                          {getStatusLabel(report.status)}
                        </span>
                      )}
                    </div>

                    {/* Address & Time */}
                    <div className="flex items-center gap-2 text-[10px] text-white/40">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">{report.installation_address || 'No address'}</span>
                      </span>
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-2.5 h-2.5" />
                        {localBackup
                          ? `Local: ${formatTimeAgo(localBackup.savedAt)}`
                          : formatTimeAgo(report.updated_at)
                        }
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className={cn(
                    'w-4 h-4 flex-shrink-0',
                    localBackup ? 'text-amber-400/50' : 'text-elec-yellow/30'
                  )} />
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RecentCertificatesCard;
