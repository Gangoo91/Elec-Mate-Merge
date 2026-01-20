import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Clock, ChevronRight, MapPin, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { cn } from '@/lib/utils';

interface RecentCertificatesCardProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

// Status-based styling system
const statusStyles = {
  draft: {
    card: 'border-amber-500/20 bg-gradient-to-br from-white/[0.02] to-amber-500/5',
    badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    icon: 'from-amber-500 to-yellow-500',
    text: 'text-amber-400',
    dot: 'bg-amber-400'
  },
  'in-progress': {
    card: 'border-blue-500/20 bg-gradient-to-br from-white/[0.02] to-blue-500/5',
    badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    icon: 'from-blue-500 to-indigo-600',
    text: 'text-blue-400',
    dot: 'bg-blue-400'
  },
  completed: {
    card: 'border-green-500/20 bg-gradient-to-br from-white/[0.02] to-green-500/5',
    badge: 'bg-green-500/20 text-green-400 border border-green-500/30',
    icon: 'from-green-500 to-emerald-600',
    text: 'text-green-400',
    dot: 'bg-green-400'
  }
};

// Certificate type configuration
const typeConfig: Record<string, { color: string; label: string; fullLabel: string }> = {
  'minor-works': { color: 'from-purple-500 to-indigo-600', label: 'MW', fullLabel: 'Minor Works' },
  'eic': { color: 'from-blue-500 to-cyan-500', label: 'EIC', fullLabel: 'EIC' },
  'eicr': { color: 'from-green-500 to-teal-500', label: 'EICR', fullLabel: 'EICR' }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const emptyStateVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  }
};

const RecentCertificatesCard = ({ onNavigate }: RecentCertificatesCardProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 2) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleOpenCertificate = (report: CloudReport) => {
    const section = report.report_type;
    onNavigate(section, report.report_id, report.report_type);
  };

  const getTypeInfo = (type: string) => {
    return typeConfig[type] || { color: 'from-gray-500 to-gray-600', label: 'CERT', fullLabel: type };
  };

  const getStatusStyle = (status: string) => {
    return statusStyles[status as keyof typeof statusStyles] || statusStyles.draft;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 md:p-5 lg:p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-base md:text-lg font-semibold">Recent Certificates</span>
          </div>
        </div>
        <div className="p-4 md:p-5 lg:p-6">
          <LoadingSkeleton type="list" count={3} />
        </div>
      </div>
    );
  }

  // Empty state
  if (reports.length === 0) {
    return (
      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 md:p-5 lg:p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-base md:text-lg font-semibold">Recent Certificates</span>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-5 lg:p-6">
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="show"
            className="text-center py-8 md:py-10"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FileText className="h-10 w-10 text-white/40" />
            </motion.div>
            <p className="text-base font-medium text-foreground mb-1">No certificates yet</p>
            <p className="text-sm text-muted-foreground mb-5">Create your first certificate to get started</p>
            <Button
              onClick={() => onNavigate('minor-works')}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold rounded-xl h-11 px-5 touch-manipulation"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Certificate
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 lg:p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-base md:text-lg font-semibold">Recent Certificates</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('my-reports')}
            className="rounded-full px-4 h-9 bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium touch-manipulation"
          >
            View All <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Certificate Cards */}
      <motion.div
        className="p-4 md:p-5 lg:p-6 space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {reports.map((report) => {
            const typeInfo = getTypeInfo(report.report_type);
            const style = getStatusStyle(report.status);

            return (
              <motion.div
                key={report.report_id}
                variants={cardVariants}
                layout
                className={cn(
                  'p-4 rounded-2xl border cursor-pointer group transition-all touch-manipulation active:scale-[0.98]',
                  'hover:shadow-lg',
                  style.card,
                  `hover:border-opacity-40 hover:shadow-${report.status === 'completed' ? 'green' : report.status === 'in-progress' ? 'blue' : 'amber'}-500/5`
                )}
                onClick={() => handleOpenCertificate(report)}
              >
                <div className="flex items-center gap-3">
                  {/* Type Icon Badge */}
                  <div className={cn(
                    'w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0',
                    typeInfo.color
                  )}>
                    <span className="text-white font-bold text-sm">{typeInfo.label}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Type and Status Row */}
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="text-sm font-semibold text-foreground">{typeInfo.fullLabel}</span>
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
                        style.badge
                      )}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} />
                        {getStatusLabel(report.status)}
                      </span>
                    </div>

                    {/* Client Name */}
                    <p className="font-medium text-sm text-foreground truncate mb-1">
                      {report.client_name || 'Untitled'}
                    </p>

                    {/* Address */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{report.installation_address || 'No address'}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{formatTimeAgo(report.updated_at)}</span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RecentCertificatesCard;
