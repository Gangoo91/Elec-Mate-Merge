import { useState } from 'react';
import {
  FileText,
  Building2,
  MoreVertical,
  ExternalLink,
  Eye,
  Trash2,
  ChevronRight,
  CheckCircle2,
  Mail,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  getDeadlineUrgency,
  getDaysUntilDeadline,
} from '@/utils/notificationHelper';
import { PORTAL_LINKS } from '@/utils/portalLinks';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { openExternalUrl } from '@/utils/open-external-url';

interface NotificationCardProps {
  notification: Notification;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (notification: Notification) => void;
  onViewCertificate: (reportId: string, reportType: string) => void;
  showNiceic?: boolean;
  showNapit?: boolean;
}

const formatWorkType = (workType: string): string => {
  if (!workType) return 'Electrical Work';
  return workType
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const REPORT_TYPE_CONFIG: Record<string, { label: string; accent: string; iconColor: string; iconBg: string }> = {
  'minor-works': {
    label: 'Minor Works',
    accent: 'from-purple-500 via-violet-400 to-indigo-400',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border border-purple-500/20',
  },
  eic: {
    label: 'EIC',
    accent: 'from-blue-500 via-blue-400 to-cyan-400',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border border-blue-500/20',
  },
  eicr: {
    label: 'EICR',
    accent: 'from-emerald-500 via-green-400 to-teal-400',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border border-emerald-500/20',
  },
};

const DEFAULT_CONFIG = {
  label: 'Certificate',
  accent: 'from-elec-yellow via-amber-400 to-orange-400',
  iconColor: 'text-elec-yellow',
  iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20',
};

// Urgency-specific accent line overrides
const URGENCY_ACCENT: Record<string, string> = {
  overdue: 'from-red-500 via-red-400 to-orange-400',
  urgent: 'from-orange-500 via-amber-400 to-yellow-400',
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

  const urgency = notification.submission_deadline
    ? getDeadlineUrgency(notification.submission_deadline)
    : 'safe';
  const daysRemaining = notification.submission_deadline
    ? getDaysUntilDeadline(notification.submission_deadline)
    : null;

  const clientName = notification.reports?.client_name;
  const address = notification.reports?.installation_address;
  const certNumber = notification.reports?.certificate_number;
  const clientEmail = notification.reports?.data?.clientEmail;

  const reportType = notification.reports?.report_type || '';
  const config = REPORT_TYPE_CONFIG[reportType] || DEFAULT_CONFIG;
  const accentGradient = URGENCY_ACCENT[urgency] || config.accent;

  const handleBuildingControlSelect = (authority: string) => {
    onUpdate(notification.id, { building_control_authority: authority, local_authority_submitted: true });
  };

  const handleEmailCertificate = async () => {
    if (!clientEmail) {
      toast({ title: 'No Email Address', description: 'Client email address is not available for this certificate', variant: 'destructive' });
      return;
    }
    if (!notification.reports?.id) {
      toast({ title: 'Error', description: 'Report ID not available', variant: 'destructive' });
      return;
    }
    setIsSendingEmail(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-certificate-resend', {
        body: { reportId: notification.reports.id, recipientEmail: clientEmail },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: 'Email Sent', description: `Certificate emailed to ${clientEmail}` });
    } catch (error) {
      toast({ title: 'Email Failed', description: error instanceof Error ? error.message : 'Failed to send certificate email.', variant: 'destructive' });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const submissionCount = [
    showNiceic && notification.niceic_submitted,
    showNapit && notification.napit_submitted,
    notification.local_authority_submitted,
  ].filter(Boolean).length;
  const totalSubmissions = [showNiceic, showNapit, true].filter(Boolean).length;
  const isFullySubmitted = submissionCount === totalSubmissions;

  const isOverdue = urgency === 'overdue';
  const isUrgent = urgency === 'urgent';

  const deadlineText =
    daysRemaining !== null && daysRemaining < 0
      ? `${Math.abs(daysRemaining)}d overdue`
      : daysRemaining === 0
        ? 'Due today'
        : daysRemaining !== null
          ? `${daysRemaining}d left`
          : null;

  const deadlineHighlight = isOverdue ? 'border-red-500/30 bg-red-500/10' : isUrgent ? 'border-orange-500/30 bg-orange-500/10' : 'border-emerald-500/30 bg-emerald-500/10';
  const deadlineValueColor = isOverdue ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-emerald-400';

  return (
    <>
      <div className="group relative overflow-hidden card-surface">
        {/* Top accent line */}
        <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-80 transition-opacity', accentGradient)} />

        <div className="p-4 sm:p-5 space-y-4">
          {/* Header: Icon + Type + Status + Menu */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className={cn('p-2.5 rounded-xl flex-shrink-0', config.iconBg)}>
                <FileText className={cn('h-5 w-5', config.iconColor)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[15px] font-semibold text-white">{config.label}</span>
                  <StatusBadge status={notification.notification_status} />
                </div>
                <p className="text-[13px] text-white">{formatWorkType(notification.work_type)}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0 touch-manipulation rounded-xl hover:bg-white/10">
                  <MoreVertical className="w-5 h-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => onViewDetails(notification)} className="h-12 gap-3">
                  <Eye className="w-4 h-4" /> View Full Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPdfViewer(true)} className="h-12 gap-3">
                  <FileText className="w-4 h-4" /> Open Certificate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEmailCertificate} disabled={isSendingEmail || !clientEmail} className="h-12 gap-3">
                  {isSendingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  Email to Client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(notification.id)} className="h-12 gap-3 text-red-400 focus:text-red-400">
                  <Trash2 className="w-4 h-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Client & Address */}
          <div className="pl-[52px]">
            {clientName && <p className="text-sm font-medium text-white">{clientName}</p>}
            {address && <p className="text-[13px] text-white">{address}</p>}
            {certNumber && (
              <button onClick={() => setShowPdfViewer(true)} className="text-xs font-mono text-elec-yellow hover:underline mt-1">
                {certNumber}
              </button>
            )}
          </div>

          {/* Deadline — KPI style card */}
          {deadlineText && (
            <div className={cn('flex items-center justify-between rounded-xl border px-3 py-2 h-14', deadlineHighlight)}>
              <div>
                <span className="text-[11px] font-medium text-white leading-tight block">Submission Deadline</span>
                <span className={cn('text-sm font-bold leading-tight', deadlineValueColor)}>{deadlineText}</span>
              </div>
              <span className={cn('text-2xl font-bold', deadlineValueColor)}>
                {Math.abs(daysRemaining!)}
              </span>
            </div>
          )}

          {/* Submission Tracking */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
                Submission Tracking
              </p>
              {isFullySubmitted && (
                <span className="text-[11px] font-medium text-green-400 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Complete
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              {showNapit && (
                <div className={cn(
                  'flex items-center justify-between p-3 rounded-xl border transition-colors',
                  notification.napit_submitted ? 'bg-blue-500/8 border-blue-500/20' : 'bg-white/[0.02] border-white/[0.06]'
                )}>
                  <label className="flex items-center gap-3 flex-1 cursor-pointer touch-manipulation">
                    <Checkbox
                      checked={notification.napit_submitted}
                      onCheckedChange={(checked) => onUpdate(notification.id, { napit_submitted: checked })}
                      className="h-5 w-5 rounded border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-white block">NAPIT</span>
                      <span className="text-xs text-white">Direct Portal</span>
                    </div>
                  </label>
                  <Button variant="ghost" size="sm" onClick={() => openExternalUrl(PORTAL_LINKS.napit.url)} className="h-9 w-9 rounded-lg text-white hover:bg-white/10">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}

              {showNiceic && (
                <div className={cn(
                  'flex items-center justify-between p-3 rounded-xl border transition-colors',
                  notification.niceic_submitted ? 'bg-yellow-500/8 border-yellow-500/20' : 'bg-white/[0.02] border-white/[0.06]'
                )}>
                  <label className="flex items-center gap-3 flex-1 cursor-pointer touch-manipulation">
                    <Checkbox
                      checked={notification.niceic_submitted}
                      onCheckedChange={(checked) => onUpdate(notification.id, { niceic_submitted: checked })}
                      className="h-5 w-5 rounded border-white/40 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:text-black"
                    />
                    <div>
                      <span className="text-sm font-medium text-white block">NICEIC</span>
                      <span className="text-xs text-white">Certification Portal</span>
                    </div>
                  </label>
                  <Button variant="ghost" size="sm" onClick={() => openExternalUrl(PORTAL_LINKS.niceic.url)} className="h-9 w-9 rounded-lg text-white hover:bg-white/10">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}

              <div className={cn(
                'flex items-center justify-between p-3 rounded-xl border transition-colors',
                notification.local_authority_submitted ? 'bg-green-500/8 border-green-500/20' : 'bg-white/[0.02] border-white/[0.06]'
              )}>
                <label className="flex items-center gap-3 flex-1 cursor-pointer touch-manipulation">
                  <Checkbox
                    checked={notification.local_authority_submitted}
                    onCheckedChange={(checked) => onUpdate(notification.id, { local_authority_submitted: checked })}
                    className="h-5 w-5 rounded border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-black"
                  />
                  <div>
                    <span className="text-sm font-medium text-white block">Building Control</span>
                    <span className="text-xs text-white">{notification.building_control_authority || 'Find your council'}</span>
                  </div>
                </label>
                <Button variant="ghost" size="sm" onClick={() => setShowBuildingControlFinder(true)} className="h-9 w-9 rounded-lg text-white hover:bg-white/10">
                  <Building2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom action — matches BusinessCard pattern */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setShowPdfViewer(true)}
              className="text-[13px] font-medium text-elec-yellow hover:text-yellow-300 transition-colors touch-manipulation"
            >
              Open Certificate
            </button>
            <div className="flex items-center gap-2">
              {clientEmail && (
                <button
                  onClick={handleEmailCertificate}
                  disabled={isSendingEmail}
                  className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-all touch-manipulation disabled:opacity-40"
                >
                  {isSendingEmail ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <Mail className="w-3.5 h-3.5 text-white" />}
                </button>
              )}
              <button
                onClick={() => setShowPdfViewer(true)}
                className="w-8 h-8 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center hover:bg-elec-yellow hover:border-elec-yellow group/btn transition-all touch-manipulation"
              >
                <ChevronRight className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BuildingControlFinder
        open={showBuildingControlFinder}
        onOpenChange={setShowBuildingControlFinder}
        onSelect={handleBuildingControlSelect}
        initialAddress={notification.reports?.installation_address || ''}
      />

      <ReportPdfViewer
        reportId={notification.report_id}
        open={showPdfViewer}
        onOpenChange={setShowPdfViewer}
      />
    </>
  );
};
