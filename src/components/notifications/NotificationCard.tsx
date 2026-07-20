import { useState } from 'react';
import {
  MoreVertical,
  Copy,
  Check,
  ArrowUpRight,
  FileText,
  Undo2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  // A single flat urgency edge — shown only when there's something to chase,
  // not a decorative rainbow bar on every card.
  const urgencyBar =
    urgency === 'overdue' ? 'bg-red-400/70' : urgency === 'urgent' ? 'bg-amber-400/70' : null;

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

  // The scheme(s) this electrician is registered with — their one submission
  // route. A scheme portal notifies Building Control on their behalf, so we
  // don't make them tick a separate council box.
  const schemes = [
    showNapit && { name: 'NAPIT', url: PORTAL_LINKS.napit.url, field: 'napit_submitted' as const },
    showNiceic && { name: 'NICEIC', url: PORTAL_LINKS.niceic.url, field: 'niceic_submitted' as const },
  ].filter(Boolean) as { name: string; url: string; field: 'napit_submitted' | 'niceic_submitted' }[];
  const isSchemeMember = schemes.length > 0;

  const isSubmitted =
    notification.notification_status === 'submitted' ||
    notification.local_authority_submitted ||
    notification.napit_submitted ||
    notification.niceic_submitted;

  const isOverdue = urgency === 'overdue';
  const isUrgent = urgency === 'urgent';

  const deadlineText =
    daysRemaining !== null && daysRemaining < 0
      ? `${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? 'day' : 'days'} overdue`
      : daysRemaining === 0
        ? 'Due today'
        : daysRemaining !== null
          ? `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} left to notify`
          : null;

  const deadlineHighlight = isOverdue ? 'border-red-500/40 bg-red-500/10' : isUrgent ? 'border-orange-500/40 bg-orange-500/10' : 'border-emerald-500/40 bg-emerald-500/10';
  const deadlineValueColor = isOverdue ? 'text-red-300' : isUrgent ? 'text-orange-300' : 'text-emerald-300';

  // Effortless #1 — copy the job details so they paste (not retype) into the
  // scheme / Building Control form.
  const handleCopyDetails = async () => {
    const block = [clientName, address, certNumber, formatWorkType(notification.work_type)]
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(block);
      toast({ title: 'Details copied', description: 'Paste them into your scheme or Building Control form.' });
    } catch {
      toast({ title: "Couldn't copy", description: 'Copy the details manually from the card.', variant: 'destructive' });
    }
  };

  // Effortless #2 — one tap clears the whole item: mark the scheme (or council)
  // submitted and flip the status so it leaves the pending list.
  const handleMarkSubmitted = () => {
    const updates: Record<string, unknown> = {
      notification_status: 'submitted',
      local_authority_submitted: true, // scheme notifies BC for members; direct for non-members
    };
    schemes.forEach((s) => { updates[s.field] = true; });
    onUpdate(notification.id, updates);
    navigator.vibrate?.(10);
    toast({ title: 'Marked as submitted', description: "Nice — that one's compliant." });
  };

  const handleUndoSubmitted = () => {
    onUpdate(notification.id, {
      notification_status: 'pending',
      local_authority_submitted: false,
      napit_submitted: false,
      niceic_submitted: false,
    });
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-white/[0.015]">
        {/* Flat urgency edge — only when overdue or due soon */}
        {urgencyBar && <div className={cn('absolute left-0 inset-y-0 w-[3px]', urgencyBar)} />}

        <div className="relative z-10 p-4 space-y-3.5">
          {/* Header — badges + client, menu */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-white/[0.08] text-white">{config.label}</span>
                <StatusBadge status={notification.notification_status} />
              </div>
              {clientName && <h3 className="text-[16px] font-semibold tracking-tight text-white leading-tight">{clientName}</h3>}
              {address && <p className="text-[13px] text-white/90 mt-0.5 leading-snug">{address}</p>}
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-white/70">
                <span>{formatWorkType(notification.work_type)}</span>
                {certNumber && (
                  <>
                    <span className="text-white/30">·</span>
                    <button onClick={() => setShowPdfViewer(true)} className="font-mono text-elec-yellow hover:underline">
                      {certNumber}
                    </button>
                  </>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98] transition-colors flex-shrink-0">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-[hsl(240_5.9%_12%)] border-white/10">
                <DropdownMenuItem onClick={() => onViewDetails(notification)} className="h-11 text-white focus:text-white focus:bg-white/10">
                  View full details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPdfViewer(true)} className="h-11 text-white focus:text-white focus:bg-white/10">
                  Open certificate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyDetails} className="h-11 text-white focus:text-white focus:bg-white/10">
                  Copy job details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEmailCertificate} disabled={isSendingEmail || !clientEmail} className="h-11 text-white focus:text-white focus:bg-white/10">
                  {isSendingEmail ? 'Sending…' : 'Email to client'}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => onDelete(notification.id)} className="h-11 text-red-400 focus:text-red-400 focus:bg-red-500/10">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isSubmitted ? (
            /* Submitted — done state, one tap to undo if wrong */
            <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-white leading-tight">Submitted</p>
                  <p className="text-[12px] text-white/70 leading-tight">
                    {isSchemeMember ? `Notified via ${schemes.map((s) => s.name).join(' / ')}` : 'Notified to Building Control'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleUndoSubmitted}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.06] text-[12px] font-medium text-white/90 hover:bg-white/[0.1] touch-manipulation active:scale-[0.98] shrink-0"
              >
                <Undo2 className="h-3.5 w-3.5" /> Undo
              </button>
            </div>
          ) : (
            <>
              {/* Deadline — number chip + plain-English label */}
              {deadlineText && (
                <div className={cn('flex items-center gap-3 rounded-xl border px-3 py-2.5', deadlineHighlight)}>
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center h-12 w-12 shrink-0 rounded-xl',
                      isOverdue ? 'bg-red-500/15' : isUrgent ? 'bg-orange-500/15' : 'bg-emerald-500/15'
                    )}
                  >
                    <span className={cn('text-[20px] font-bold tabular-nums leading-none', deadlineValueColor)}>
                      {Math.abs(daysRemaining!)}
                    </span>
                    <span className={cn('text-[8px] font-bold uppercase tracking-wider mt-0.5', deadlineValueColor)}>
                      {isOverdue ? 'over' : daysRemaining === 0 ? 'today' : 'days'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className={cn('text-[14px] font-semibold leading-tight', deadlineValueColor)}>{deadlineText}</p>
                    <p className="text-[11.5px] text-white/70 leading-tight mt-0.5">30-day Building Regs deadline</p>
                  </div>
                </div>
              )}

              {/* Effortless submit — portal + copy, then one-tap done */}
              <div className="space-y-2 pt-1 border-t border-white/[0.07]">
                <p className="pt-2 text-[12.5px] font-medium text-white">
                  {isSchemeMember ? 'Submit through your scheme — it notifies Building Control for you' : 'Notify your local Building Control'}
                </p>

                <div className="flex flex-wrap gap-2">
                  {isSchemeMember ? (
                    schemes.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => openExternalUrl(s.url)}
                        className="group inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white touch-manipulation transition-colors hover:border-elec-yellow/40 hover:bg-elec-yellow/[0.06] active:scale-[0.98]"
                      >
                        Open {s.name} portal
                        <ArrowUpRight className="h-3.5 w-3.5 text-elec-yellow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => setShowBuildingControlFinder(true)}
                      className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white touch-manipulation transition-colors hover:border-elec-yellow/40 hover:bg-elec-yellow/[0.06] active:scale-[0.98]"
                    >
                      Find your council
                    </button>
                  )}

                  <button
                    onClick={handleCopyDetails}
                    className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-white touch-manipulation transition-colors hover:bg-white/[0.08] active:scale-[0.98]"
                  >
                    <Copy className="h-3.5 w-3.5 text-white/80" /> Copy details
                  </button>
                </div>

                <button
                  onClick={handleMarkSubmitted}
                  className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold touch-manipulation transition-transform active:scale-[0.99]"
                >
                  <Check className="h-4 w-4" /> Mark as submitted
                </button>

                <button
                  onClick={() => setShowPdfViewer(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 h-9 text-[12.5px] font-medium text-white/80 touch-manipulation hover:text-white"
                >
                  <FileText className="h-3.5 w-3.5" /> View certificate
                </button>
              </div>
            </>
          )}
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
