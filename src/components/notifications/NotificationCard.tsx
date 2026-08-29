import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from './StatusBadge';
import SchemeCertificateAttachment from './SchemeCertificateAttachment';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const REPORT_TYPE_LABELS: Record<string, string> = {
  'minor-works': 'Minor Works',
  eic: 'EIC',
  eicr: 'EICR',
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
  const typeLabel = REPORT_TYPE_LABELS[reportType] || 'Certificate';
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
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03]">
        {/* Flat urgency edge — only when overdue or due soon */}
        {urgencyBar && <div className={cn('absolute left-0 inset-y-0 w-[3px]', urgencyBar)} />}

        <div className="relative z-10 p-4 space-y-3.5">
          {/* Header — badges + client, menu */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.08] text-white/75">{typeLabel}</span>
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
                <button className="flex h-9 shrink-0 items-center rounded-lg px-2.5 text-[12.5px] font-semibold text-white/60 transition-colors hover:text-white touch-manipulation">
                  More
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
            <>
            {/* Submitted — done state, one tap to undo if wrong */}
            <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold leading-tight text-emerald-400">Submitted</p>
                  <p className="text-[12px] text-white/70 leading-tight">
                    {isSchemeMember ? `Notified via ${schemes.map((s) => s.name).join(' / ')}` : 'Notified to Building Control'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleUndoSubmitted}
                className="inline-flex h-9 shrink-0 items-center rounded-lg bg-white/[0.06] px-3.5 text-[12.5px] font-medium text-white/90 hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
              >
                Undo
              </button>
            </div>
            {/*
              ELE-1616. Directly under "Submitted" because that is the moment
              the file exists — he has just come back from the portal with it.
            */}
            <SchemeCertificateAttachment
              notificationId={notification.id}
              reportId={notification.report_id}
              schemeLabel={isSchemeMember ? schemes.map((s) => s.name).join(' / ') : 'Building Control'}
              url={notification.scheme_certificate_url}
              name={notification.scheme_certificate_name}
              reference={notification.scheme_certificate_ref}
              uploadedAt={notification.scheme_certificate_uploaded_at}
              onUpdate={onUpdate}
            />
            </>
          ) : (
            <>
              {/* Deadline — one clean line, colour carries the urgency */}
              {deadlineText && (
                <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.07] pt-3">
                  <p className={cn('text-[14px] font-semibold leading-tight', deadlineValueColor)}>
                    {deadlineText}
                  </p>
                  <p className="shrink-0 text-[11.5px] text-white/45">30-day Building Regs</p>
                </div>
              )}

              {/* Effortless submit — portal + copy, then one-tap done */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {isSchemeMember ? (
                    schemes.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => openExternalUrl(s.url)}
                        className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-semibold text-white touch-manipulation transition-colors hover:border-white/[0.25] hover:bg-white/[0.07] active:scale-[0.98]"
                      >
                        Open {s.name} portal
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => setShowBuildingControlFinder(true)}
                      className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-semibold text-white touch-manipulation transition-colors hover:border-white/[0.25] hover:bg-white/[0.07] active:scale-[0.98]"
                    >
                      Find your council
                    </button>
                  )}

                  <button
                    onClick={handleCopyDetails}
                    className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-white touch-manipulation transition-colors hover:bg-white/[0.08] active:scale-[0.98]"
                  >
                    Copy details
                  </button>
                </div>

                <button
                  onClick={handleMarkSubmitted}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation transition-transform hover:bg-elec-yellow/90 active:scale-[0.99]"
                >
                  Mark as submitted
                </button>

                <p className="text-center text-[11.5px] leading-relaxed text-white/40">
                  {isSchemeMember
                    ? 'Your scheme notifies Building Control for you.'
                    : 'Submit directly to your local Building Control.'}
                </p>
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
