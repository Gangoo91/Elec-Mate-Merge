import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface RecentCertificatesCardProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

const RecentCertificatesCard = ({ onNavigate }: RecentCertificatesCardProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const { data: reportsData = { recent: [], completed: [] }, isLoading } = useQuery({
    queryKey: ['recent-certificates', user?.id],
    queryFn: async () => {
      if (!user) return { recent: [], completed: [] };

      // Get 5 most recent (any status) for activity feed
      const recentData = await reportCloud.getUserReports(user.id, { limit: 5 });

      // Get 3 recently completed certificates separately
      const { data: completedData } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(3);

      return {
        recent: recentData.reports,
        completed: (completedData || []).map(r => ({
          report_id: r.report_id,
          report_type: r.report_type,
          status: r.status,
          client_name: r.client_name,
          installation_address: r.installation_address,
          updated_at: r.updated_at,
          created_at: r.created_at,
        })) as CloudReport[]
      };
    },
    enabled: !!user,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: true,
  });

  const recentReports = reportsData.recent;
  // Filter completed from recent to avoid duplicates in the completed section
  const completedReports = reportsData.completed.filter(
    c => !recentReports.some(r => r.report_id === c.report_id)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs whitespace-nowrap"
          >
            Draft
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs whitespace-nowrap"
          >
            In Progress
          </Badge>
        );
      case 'completed':
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20 text-xs whitespace-nowrap"
          >
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCertificateTypeLabel = (type: string) => {
    switch (type) {
      case 'eicr':
        return 'EICR';
      case 'eic':
        return 'EIC';
      case 'minor-works':
        return 'Minor Works';
      default:
        return type;
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

  if (isLoading) {
    return (
      <Card className="bg-card border border-elec-yellow/30">
        <CardHeader className="px-3 md:px-4 lg:px-6 pb-2 md:pb-3 lg:pb-4">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
            <span className="text-sm md:text-base lg:text-lg">Recent Certificates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-4 lg:px-6">
          <LoadingSkeleton type="list" count={3} />
        </CardContent>
      </Card>
    );
  }

  if (recentReports.length === 0 && completedReports.length === 0) {
    return (
      <Card className="bg-card border border-elec-yellow/30">
        <CardHeader className="px-3 md:px-4 lg:px-6 pb-2 md:pb-3 lg:pb-4">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
            <span className="text-sm md:text-base lg:text-lg">Recent Certificates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-4 lg:px-6">
          <div className="text-center py-6 md:py-8 lg:py-10">
            <div className="p-3 md:p-4 rounded-full bg-elec-yellow/10 inline-flex mb-3 md:mb-4">
              <FileText className="h-10 w-10 md:h-12 md:w-12 text-elec-yellow/60" />
            </div>
            <p className="text-base md:text-sm font-medium text-muted-foreground mb-1">No certificates yet</p>
            <p className="text-sm md:text-xs text-muted-foreground">Create your first certificate to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Helper to render a certificate card
  const renderCertificateCard = (report: CloudReport) => (
    <div
      key={report.report_id}
      className="p-3 md:p-4 rounded-lg border border-elec-yellow/30 hover:border-elec-yellow/50 bg-background/50 hover:bg-background transition-all cursor-pointer group active:scale-[0.98] touch-manipulation"
      onClick={() => handleOpenCertificate(report)}
    >
      <div className="flex items-start justify-between gap-2 md:gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1 md:gap-1.5 mb-1.5 md:mb-2">
            <Badge variant="outline" className="text-xs whitespace-nowrap">
              {getCertificateTypeLabel(report.report_type)}
            </Badge>
            {getStatusBadge(report.status)}
          </div>
          <p className="font-medium text-sm md:text-base truncate mb-0.5">
            {report.client_name || 'Untitled'}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground truncate line-clamp-1 mb-1 md:mb-1.5">
            {report.installation_address || 'No address'}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span>{formatTimeAgo(report.updated_at)}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="hidden sm:flex flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenCertificate(report);
          }}
        >
          Open <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="bg-card border border-elec-yellow/30">
      <CardHeader className="pb-2 md:pb-3 lg:pb-4 px-3 md:px-4 lg:px-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow flex-shrink-0" />
            <span className="text-sm md:text-base lg:text-lg">Recent Certificates</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('my-reports')}
            className="text-elec-yellow hover:text-elec-yellow/80 self-start sm:self-auto text-sm"
          >
            View All <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-3 md:px-4 lg:px-6 pb-3 md:pb-4 lg:pb-6">
        {/* Recently Completed Section */}
        {completedReports.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-green-400 uppercase tracking-wide flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Recently Completed
            </h4>
            <div className="space-y-2 md:space-y-3">
              {completedReports.map(renderCertificateCard)}
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        {recentReports.length > 0 && (
          <div className="space-y-2">
            {completedReports.length > 0 && (
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                Recent Activity
              </h4>
            )}
            <div className="space-y-2 md:space-y-3">
              {recentReports.map(renderCertificateCard)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCertificatesCard;
