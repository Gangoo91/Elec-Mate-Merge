import { useState } from 'react';
import {
  FileText,
  Calendar,
  Building2,
  Clock,
  MoreVertical,
  MapPin,
  Zap,
  Award,
  ExternalLink,
  AlertTriangle,
  User,
  Eye,
  Trash2,
  ChevronRight,
  CalendarClock,
  CheckCircle2,
  Mail,
  Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from './StatusBadge';
import { BuildingControlFinder } from './BuildingControlFinder';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import { Notification } from '@/hooks/useNotifications';
import { formatDeadlineStatus, getDeadlineUrgency, getDaysUntilDeadline } from '@/utils/notificationHelper';
import { PORTAL_LINKS } from '@/utils/portalLinks';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NotificationCardProps {
  notification: Notification;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (notification: Notification) => void;
  onViewCertificate: (reportId: string, reportType: string) => void;
  showNiceic?: boolean;
  showNapit?: boolean;
}

// Format work type to be more readable
const formatWorkType = (workType: string): string => {
  if (!workType) return 'Electrical Work';
  return workType
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Get report type badge info
const getReportTypeBadge = (reportType?: string) => {
  switch (reportType) {
    case 'minor-works':
      return { label: 'Minor Works', short: 'MW', color: 'bg-purple-500', textColor: 'text-purple-400', borderColor: 'border-purple-500/30' };
    case 'eic':
      return { label: 'EIC', short: 'EIC', color: 'bg-blue-500', textColor: 'text-blue-400', borderColor: 'border-blue-500/30' };
    case 'eicr':
      return { label: 'EICR', short: 'EICR', color: 'bg-green-500', textColor: 'text-green-400', borderColor: 'border-green-500/30' };
    default:
      return { label: 'Certificate', short: 'CERT', color: 'bg-gray-500', textColor: 'text-gray-400', borderColor: 'border-gray-500/30' };
  }
};

export const NotificationCard = ({
  notification,
  onUpdate,
  onDelete,
  onViewDetails,
  onViewCertificate,
  showNiceic = true,
  showNapit = true,
}: NotificationCardProps) => {
  const [showBuildingControlFinder, setShowBuildingControlFinder] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { toast } = useToast();
  const urgency = notification.submission_deadline ? getDeadlineUrgency(notification.submission_deadline) : 'safe';
  const daysRemaining = notification.submission_deadline ? getDaysUntilDeadline(notification.submission_deadline) : null;

  const reportBadge = getReportTypeBadge(notification.reports?.report_type);
  const clientName = notification.reports?.client_name;
  const address = notification.reports?.installation_address;
  const certNumber = notification.reports?.certificate_number;

  const handleBuildingControlSelect = (authority: string) => {
    onUpdate(notification.id, {
      building_control_authority: authority,
      local_authority_submitted: true,
    });
  };

  const clientEmail = notification.reports?.data?.clientEmail;

  const handleEmailCertificate = async () => {
    if (!clientEmail) {
      toast({
        title: 'No Email Address',
        description: 'Client email address is not available for this certificate',
        variant: 'destructive',
      });
      return;
    }

    if (!notification.reports?.id) {
      toast({
        title: 'Error',
        description: 'Report ID not available',
        variant: 'destructive',
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-certificate-resend', {
        body: {
          reportId: notification.reports.id,
          recipientEmail: clientEmail,
        }
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: 'Email Sent',
        description: `Certificate emailed to ${clientEmail}`,
      });
    } catch (error) {
      console.error('Error sending certificate email:', error);
      toast({
        title: 'Email Failed',
        description: error instanceof Error ? error.message : 'Failed to send certificate email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Calculate submission progress
  const submissionCount = [
    showNiceic && notification.niceic_submitted,
    showNapit && notification.napit_submitted,
    notification.local_authority_submitted
  ].filter(Boolean).length;
  const totalSubmissions = [showNiceic, showNapit, true].filter(Boolean).length;
  const isFullySubmitted = submissionCount === totalSubmissions;

  // Urgency-based styling
  const urgencyStyles = {
    safe: {
      card: 'border-green-500/30 bg-gradient-to-br from-card to-green-500/5',
      header: 'bg-green-500/10',
      badge: 'bg-green-500/20 text-green-400 border-green-500/30',
      deadline: 'bg-green-500/20 text-green-400',
      icon: 'text-green-500',
      glow: 'shadow-green-500/5'
    },
    warning: {
      card: 'border-amber-500/30 bg-gradient-to-br from-card to-amber-500/5',
      header: 'bg-amber-500/10',
      badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      deadline: 'bg-amber-500/20 text-amber-400',
      icon: 'text-amber-500',
      glow: 'shadow-amber-500/5'
    },
    urgent: {
      card: 'border-orange-500/40 bg-gradient-to-br from-card to-orange-500/10',
      header: 'bg-orange-500/20',
      badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      deadline: 'bg-orange-500/20 text-orange-400',
      icon: 'text-orange-500',
      glow: 'shadow-orange-500/10'
    },
    overdue: {
      card: 'border-red-500/50 bg-gradient-to-br from-card to-red-500/15',
      header: 'bg-red-500/20',
      badge: 'bg-red-500/20 text-red-400 border-red-500/30',
      deadline: 'bg-red-500/30 text-red-400',
      icon: 'text-red-500',
      glow: 'shadow-red-500/15'
    }
  };

  const styles = urgencyStyles[urgency];

  return (
    <>
      <Card className={cn(
        'overflow-hidden shadow-lg transition-all',
        styles.card,
        styles.glow
      )}>
        {/* Urgency Banner */}
        {(urgency === 'overdue' || urgency === 'urgent') && (
          <div className={cn('px-4 py-2.5 flex items-center gap-2', styles.header)}>
            <AlertTriangle className={cn('w-4 h-4', styles.icon, urgency === 'overdue' && 'animate-pulse')} />
            <span className={cn('text-xs font-bold uppercase tracking-wide', styles.icon)}>
              {urgency === 'overdue' ? 'Overdue - Action Required' : 'Urgent - Deadline Soon'}
            </span>
          </div>
        )}

        <div className="p-4 space-y-4">
          {/* Header: Report Type, Status, Menu */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Report Type Badge */}
              <div className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0',
                reportBadge.color
              )}>
                <FileText className="w-6 h-6 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-base text-foreground">{reportBadge.label}</span>
                  <StatusBadge status={notification.notification_status} />
                </div>
                <p className="text-sm font-medium text-foreground truncate">
                  {formatWorkType(notification.work_type)}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0 touch-manipulation rounded-xl">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => onViewDetails(notification)} className="h-12 gap-3">
                  <Eye className="w-4 h-4" />
                  View Full Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowPdfViewer(true)}
                  className="h-12 gap-3"
                >
                  <FileText className="w-4 h-4" />
                  Open Certificate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleEmailCertificate}
                  disabled={isSendingEmail || !clientEmail}
                  className="h-12 gap-3"
                >
                  {isSendingEmail ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  Email to Client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(notification.id)} className="h-12 gap-3 text-red-400 focus:text-red-400">
                  <Trash2 className="w-4 h-4" />
                  Delete Notification
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Client & Address Info */}
          <div className="p-3 rounded-xl bg-card/50 border border-border/30 space-y-2">
            {clientName && (
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{clientName}</span>
              </div>
            )}
            {address && (
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground leading-tight">{address}</span>
              </div>
            )}
            <div className="flex items-center gap-2.5 pt-1 border-t border-border/30 mt-2">
              <FileText className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <button
                onClick={() => setShowPdfViewer(true)}
                className="text-xs font-mono text-primary hover:underline"
              >
                {certNumber || notification.report_id?.substring(0, 16)}
              </button>
            </div>
          </div>

          {/* Deadline Countdown - Prominent */}
          {daysRemaining !== null && (
            <div className={cn('p-4 rounded-2xl flex items-center justify-between', styles.deadline)}>
              <div className="flex items-center gap-3">
                {urgency === 'overdue' || urgency === 'urgent' ? (
                  <AlertTriangle className={cn('w-6 h-6', styles.icon, urgency === 'overdue' && 'animate-pulse')} />
                ) : (
                  <CalendarClock className={cn('w-6 h-6', styles.icon)} />
                )}
                <div>
                  <p className="text-xs font-medium opacity-80">Submission Deadline</p>
                  <p className="font-semibold">
                    {daysRemaining < 0 ? 'Overdue' : daysRemaining === 0 ? 'Due Today!' : `${daysRemaining} Days Left`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={cn('text-3xl font-bold', styles.icon)}>{Math.abs(daysRemaining)}</span>
                <span className="text-xs block opacity-70">{daysRemaining < 0 ? 'days late' : 'days'}</span>
              </div>
            </div>
          )}

          {/* Submission Tracking */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Submission Tracking</h4>
              {isFullySubmitted && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Complete
                </Badge>
              )}
            </div>

            <div className="grid gap-2">
              {/* NICEIC */}
              {showNiceic && (
                <div className={cn(
                  'flex items-center justify-between p-3.5 rounded-xl border-2 transition-all touch-manipulation',
                  notification.niceic_submitted
                    ? 'bg-gradient-to-r from-yellow-500/15 to-yellow-500/5 border-yellow-500/40'
                    : 'bg-card/30 border-border/30 hover:border-yellow-500/30'
                )}>
                  <label className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Checkbox
                      checked={notification.niceic_submitted}
                      onCheckedChange={(checked) => onUpdate(notification.id, { niceic_submitted: checked })}
                      className="h-6 w-6 rounded-lg border-2 border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:text-black"
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <span className="font-semibold text-sm block">NICEIC</span>
                        <span className="text-[10px] text-muted-foreground">Certification Portal</span>
                      </div>
                    </div>
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(PORTAL_LINKS.niceic.url, '_blank')}
                    className="h-10 w-10 rounded-xl text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* NAPIT */}
              {showNapit && (
                <div className={cn(
                  'flex items-center justify-between p-3.5 rounded-xl border-2 transition-all touch-manipulation',
                  notification.napit_submitted
                    ? 'bg-gradient-to-r from-blue-500/15 to-blue-500/5 border-blue-500/40'
                    : 'bg-card/30 border-border/30 hover:border-blue-500/30'
                )}>
                  <label className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Checkbox
                      checked={notification.napit_submitted}
                      onCheckedChange={(checked) => onUpdate(notification.id, { napit_submitted: checked })}
                      className="h-6 w-6 rounded-lg border-2 border-blue-500/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-sm block">NAPIT</span>
                        <span className="text-[10px] text-muted-foreground">Direct Portal</span>
                      </div>
                    </div>
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(PORTAL_LINKS.napit.url, '_blank')}
                    className="h-10 w-10 rounded-xl text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Local Authority */}
              <div className={cn(
                'flex items-center justify-between p-3.5 rounded-xl border-2 transition-all touch-manipulation',
                notification.local_authority_submitted
                  ? 'bg-gradient-to-r from-green-500/15 to-green-500/5 border-green-500/40'
                  : 'bg-card/30 border-border/30 hover:border-green-500/30'
              )}>
                <label className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Checkbox
                    checked={notification.local_authority_submitted}
                    onCheckedChange={(checked) => onUpdate(notification.id, { local_authority_submitted: checked })}
                    className="h-6 w-6 rounded-lg border-2 border-green-500/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-black"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-sm block">Building Control</span>
                      <span className="text-[10px] text-muted-foreground">
                        {notification.building_control_authority || 'Find your council'}
                      </span>
                    </div>
                  </div>
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBuildingControlFinder(true)}
                  className="h-10 w-10 rounded-xl text-green-400 hover:text-green-300 hover:bg-green-500/20"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl font-semibold border-primary/30 hover:bg-primary/10 hover:border-primary/50 touch-manipulation"
              onClick={() => setShowPdfViewer(true)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Open Certificate
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button
              variant="outline"
              className="h-12 w-12 rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 touch-manipulation"
              onClick={handleEmailCertificate}
              disabled={isSendingEmail || !clientEmail}
              title={clientEmail ? `Email to ${clientEmail}` : 'No client email available'}
            >
              {isSendingEmail ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Building Control Finder Dialog */}
      <BuildingControlFinder
        open={showBuildingControlFinder}
        onOpenChange={setShowBuildingControlFinder}
        onSelect={handleBuildingControlSelect}
        initialAddress={notification.reports?.installation_address || ''}
      />

      {/* PDF Viewer Dialog */}
      <ReportPdfViewer
        reportId={notification.reports?.id || notification.report_id}
        open={showPdfViewer}
        onOpenChange={setShowPdfViewer}
      />
    </>
  );
};
