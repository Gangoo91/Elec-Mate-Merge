import { useState } from 'react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SchemeCertificateAttachment from './SchemeCertificateAttachment';
import { BuildingControlFinder } from './BuildingControlFinder';
import { MarkSubmittedSheet } from './MarkSubmittedSheet';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import type { Notification, SubmissionRoute } from '@/hooks/useNotifications';
import {
  getDaysUntilDeadline,
  formatDeadlineStatus,
  certificateSaysNotifiable,
  buildPortalDetails,
  completionDateOf,
  REPORT_TYPE_LABELS,
} from '@/utils/notificationHelper';
import { PORTAL_LINKS } from '@/utils/portalLinks';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { supabase } from '@/integrations/supabase/client';
import { openExternalUrl } from '@/utils/open-external-url';

/**
 * One notifiable job. Four states, each with exactly the controls it needs:
 *
 *   needs answer — the certificate never said whether the work was notifiable
 *                  (older rows). Yes / No, nothing else, no deadline shouting.
 *   to submit    — deadline, portal, copy-for-portal, Mark as submitted.
 *   submitted    — how and when, the reference, the scheme's returned PDF.
 *   not required — closed, one tap to undo.
 */

export interface NotificationCardProps {
  notification: Notification;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (notification: Notification) => void;
  onMarkSubmitted: (n: Notification, route: SubmissionRoute) => Promise<void>;
  onMarkNotRequired: (n: Notification) => Promise<void>;
  onReopen: (n: Notification) => Promise<void>;
  onSaveReference: (n: Notification, reference: string) => Promise<void>;
  onNotifyClient: (n: Notification) => Promise<{ ok: true; to: string }>;
  /** Schemes from the company profile — drives the portal button and the preselected route. */
  schemes: Array<'napit' | 'niceic'>;
  otherSchemeName?: string | null;
}

const btnSecondary =
  'inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/[0.14] bg-white/[0.05] px-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.09] active:scale-[0.98] touch-manipulation';
const btnPrimary =
  'inline-flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-transform hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation';
const menuItem = 'h-11 text-white focus:text-white focus:bg-white/10';

export const NotificationCard = ({
  notification: n,
  onUpdate,
  onDelete,
  onViewDetails,
  onMarkSubmitted,
  onMarkNotRequired,
  onReopen,
  onSaveReference,
  onNotifyClient,
  schemes,
  otherSchemeName,
}: NotificationCardProps) => {
  const [showFinder, setShowFinder] = useState(false);
  const [refDraft, setRefDraft] = useState('');
  const [emailing, setEmailing] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const { toast } = useToast();
  const haptic = useHaptic();

  const r = n.reports;
  const clientName = r?.client_name;
  const address = r?.installation_address;
  const certNumber = r?.certificate_number;
  const clientEmail = r?.data?.clientEmail;
  const typeLabel = REPORT_TYPE_LABELS[r?.report_type || ''] || 'Certificate';
  const completed = r?.data ? completionDateOf(r.data) : null;

  const status = n.notification_status;
  const isSubmitted = status === 'submitted';
  const isNotRequired = status === 'not_required' || status === 'cancelled';
  const isOpen = !isSubmitted && !isNotRequired;
  const verdict = r ? certificateSaysNotifiable(r.report_type, r.data || {}) : 'yes';
  const needsAnswer = isOpen && verdict === 'unknown';

  const days = n.submission_deadline ? getDaysUntilDeadline(n.submission_deadline) : null;
  const isOverdue = isOpen && !needsAnswer && days !== null && days < 0;
  const isSoon = isOpen && !needsAnswer && days !== null && days >= 0 && days <= 7;
  const edge = isOverdue ? 'bg-red-400' : isSoon ? 'bg-amber-400' : null;
  const deadlineColour = isOverdue ? 'text-red-300' : isSoon ? 'text-amber-300' : 'text-white';

  const schemeLabel =
    schemes.length > 0
      ? schemes.map((s) => (s === 'napit' ? 'NAPIT' : 'NICEIC')).join(' / ')
      : otherSchemeName || null;

  const submittedVia = n.napit_submitted
    ? 'NAPIT'
    : n.niceic_submitted
      ? 'NICEIC'
      : n.local_authority_submitted
        ? n.building_control_authority || 'Building Control'
        : schemeLabel || 'your scheme';

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(buildPortalDetails(n));
      haptic.light();
      toast({
        title: 'Details copied',
        description: 'Client, address, postcode, certificate and dates — in the order the portal asks.',
      });
    } catch {
      toast({ title: "Couldn't copy", description: 'Copy the details from the card instead.', variant: 'destructive' });
    }
  };

  const emailCertificate = async () => {
    if (!clientEmail || !r?.id) {
      toast({ title: 'No client email', description: 'This certificate has no client email address.', variant: 'destructive' });
      return;
    }
    setSendingEmail(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-certificate-resend', {
        body: { reportId: r.id, recipientEmail: clientEmail },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: 'Email sent', description: `Certificate emailed to ${clientEmail}` });
    } catch (error) {
      toast({
        title: 'Email failed',
        description: error instanceof Error ? error.message : 'Could not send the certificate.',
        variant: 'destructive',
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const markNotRequired = () =>
    run(async () => {
      await onMarkNotRequired(n);
      haptic.success();
      toast({
        title: 'Marked not required',
        description: `${certNumber || 'The certificate'} now records the work as not notifiable.`,
      });
    });

  const confirmNotifiable = () =>
    run(async () => {
      // The row already exists; the certificate just needs its answer.
      await onReopen(n);
      haptic.light();
      toast({ title: 'Recorded as notifiable', description: 'Submit it and mark it done below.' });
    });

  const reopen = () =>
    run(async () => {
      await onReopen(n);
      toast({ title: 'Back to "to submit"' });
    });

  const saveReference = () =>
    run(async () => {
      const ref = refDraft.trim();
      if (!ref) return;
      await onSaveReference(n, ref);
      setRefDraft('');
      haptic.success();
      toast({ title: 'Reference saved', description: `${ref} is on the tracker and the certificate.` });
    });

  const emailClient = async () => {
    setEmailing(true);
    try {
      const res = await onNotifyClient(n);
      haptic.success();
      toast({ title: 'Client emailed', description: `Sent to ${res.to}.` });
    } catch (e) {
      toast({
        title: 'Email not sent',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setEmailing(false);
    }
  };

  return (
    <>
      <article
        className={cn(
          'relative -mx-4 overflow-hidden border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03]',
          'sm:mx-0 sm:rounded-2xl sm:border-x',
          busy && 'opacity-70'
        )}
      >
        {edge && <div className={cn('absolute inset-y-0 left-0 w-[3px]', edge)} aria-hidden />}

        <div className="space-y-4 p-4 sm:p-5">
          {/* ── Identity ── */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                <span>{typeLabel}</span>
                {certNumber && (
                  <>
                    <span aria-hidden>·</span>
                    <button
                      type="button"
                      onClick={() => setShowPdf(true)}
                      className="font-mono normal-case tracking-normal text-elec-yellow hover:underline touch-manipulation"
                    >
                      {certNumber}
                    </button>
                  </>
                )}
              </div>
              <h3 className="mt-1 text-[16px] font-semibold leading-tight tracking-tight text-white">
                {clientName || 'No client name'}
              </h3>
              {address && <p className="mt-0.5 text-[13px] leading-snug text-white">{address}</p>}
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                {n.work_type.charAt(0).toUpperCase() + n.work_type.slice(1)}
                {completed && <> · completed {format(completed, 'd MMM yyyy')}</>}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 shrink-0 items-center rounded-lg px-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/[0.06] touch-manipulation"
                >
                  More
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-white/10 bg-[hsl(240_5.9%_12%)]">
                <DropdownMenuItem onClick={() => setShowPdf(true)} className={menuItem}>
                  Open certificate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewDetails(n)} className={menuItem}>
                  Edit details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={copyDetails} className={menuItem}>
                  Copy details for portal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={emailCertificate} disabled={sendingEmail || !clientEmail} className={menuItem}>
                  {sendingEmail ? 'Sending…' : 'Email certificate to client'}
                </DropdownMenuItem>
                {isSubmitted && (
                  <DropdownMenuItem onClick={emailClient} disabled={emailing || !clientEmail} className={menuItem}>
                    {emailing ? 'Sending…' : 'Tell the client it was notified'}
                  </DropdownMenuItem>
                )}
                {isOpen && !needsAnswer && (
                  <DropdownMenuItem onClick={markNotRequired} className={menuItem}>
                    Mark not required
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={() => onDelete(n.id)}
                  className="h-11 text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  Remove from tracker
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ── State ── */}
          {needsAnswer && (
            <div className="space-y-3 border-t border-white/[0.1] pt-3">
              <div>
                <p className="text-[14px] font-semibold text-white">Was this work notifiable?</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                  The certificate didn't say. A new circuit, a consumer unit change, or work in a bathroom
                  zone is; most other domestic work isn't.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={confirmNotifiable} disabled={busy} className={btnSecondary}>
                  Yes — notifiable
                </button>
                <button type="button" onClick={markNotRequired} disabled={busy} className={btnSecondary}>
                  No — not required
                </button>
              </div>
            </div>
          )}

          {isOpen && !needsAnswer && (
            <div className="space-y-3 border-t border-white/[0.1] pt-3">
              {n.submission_deadline && (
                <div className="flex items-baseline justify-between gap-3">
                  <p className={cn('text-[14px] font-semibold leading-tight', deadlineColour)}>
                    {formatDeadlineStatus(n.submission_deadline)}
                  </p>
                  <p className="shrink-0 text-[12px] text-white">
                    Notify by {format(new Date(n.submission_deadline), 'd MMM')}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {schemes.length > 0 ? (
                  schemes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => openExternalUrl(PORTAL_LINKS[s].url)}
                      className={btnSecondary}
                    >
                      Open {s === 'napit' ? 'NAPIT' : 'NICEIC'} portal
                    </button>
                  ))
                ) : (
                  <button type="button" onClick={() => setShowFinder(true)} className={btnSecondary}>
                    Find your council
                  </button>
                )}
                <button type="button" onClick={copyDetails} className={btnSecondary}>
                  Copy for portal
                </button>
              </div>

              <button type="button" onClick={() => setShowSubmit(true)} disabled={busy} className={btnPrimary}>
                Mark as submitted
              </button>
            </div>
          )}

          {isSubmitted && (
            <div className="space-y-3 border-t border-white/[0.1] pt-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold leading-tight text-emerald-300">Submitted</p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                    via {submittedVia}
                    {n.submitted_at && <> · {format(new Date(n.submitted_at), 'd MMM yyyy')}</>}
                    {n.scheme_certificate_ref && <> · ref {n.scheme_certificate_ref}</>}
                  </p>
                </div>
                <button type="button" onClick={reopen} disabled={busy} className={cn(btnSecondary, 'flex-none px-3.5')}>
                  Undo
                </button>
              </div>
              {/* The reference arrives after the portal visit — ask for it here, once, until it's in. */}
              {!n.scheme_certificate_ref && (
                <div className="flex items-end gap-2">
                  <div className="min-w-0 flex-1">
                    <label htmlFor={`ref-${n.id}`} className="mb-1 block text-[12px] font-medium text-white">
                      {n.local_authority_submitted ? 'Building Control reference' : 'Notification number from the portal'}
                    </label>
                    <input
                      id={`ref-${n.id}`}
                      value={refDraft}
                      onChange={(e) => setRefDraft(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveReference()}
                      placeholder="Prints on the certificate"
                      autoComplete="off"
                      className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={saveReference}
                    disabled={busy || !refDraft.trim()}
                    className={cn(btnSecondary, 'flex-none px-4 disabled:opacity-50')}
                  >
                    Save
                  </button>
                </div>
              )}

              {/* The client hears it's done — once, and the card remembers. */}
              {n.client_notified_at ? (
                <p className="text-[12.5px] leading-snug text-white">
                  Client emailed {format(new Date(n.client_notified_at), 'd MMM yyyy')}
                  {n.client_notified_to && <> · {n.client_notified_to}</>}
                </p>
              ) : clientEmail ? (
                <button type="button" onClick={emailClient} disabled={emailing} className={cn(btnSecondary, 'w-full')}>
                  {emailing ? 'Sending…' : `Tell the client it's notified`}
                </button>
              ) : null}

              {/* ELE-1616 — the scheme's returned certificate lives with the submission. */}
              <SchemeCertificateAttachment
                notificationId={n.id}
                reportId={n.report_id}
                schemeLabel={
                  n.napit_submitted
                    ? 'NAPIT'
                    : n.niceic_submitted
                      ? 'NICEIC'
                      : schemeLabel || 'Building Control'
                }
                url={n.scheme_certificate_url}
                name={n.scheme_certificate_name}
                reference={n.scheme_certificate_ref}
                uploadedAt={n.scheme_certificate_uploaded_at}
                onUpdate={onUpdate}
              />
            </div>
          )}

          {isNotRequired && (
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.1] pt-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-tight text-white">
                  {status === 'cancelled' ? 'Cancelled' : 'Not required'}
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                  {status === 'cancelled'
                    ? 'Nothing to submit.'
                    : 'The certificate records the work as not notifiable.'}
                </p>
              </div>
              <button type="button" onClick={reopen} disabled={busy} className={cn(btnSecondary, 'flex-none px-3.5')}>
                Undo
              </button>
            </div>
          )}
        </div>
      </article>

      <MarkSubmittedSheet
        notification={n}
        open={showSubmit}
        onOpenChange={setShowSubmit}
        schemes={schemes}
        otherSchemeName={otherSchemeName}
        clientEmail={clientEmail || null}
        onConfirm={async (route, { emailClient: sendToClient }) => {
          await onMarkSubmitted(n, route);
          toast({
            title: 'Marked as submitted',
            description: `${certNumber || 'The certificate'} now records how Building Control was told.`,
          });
          if (sendToClient) await emailClient();
        }}
      />

      <BuildingControlFinder
        open={showFinder}
        onOpenChange={setShowFinder}
        onSelect={(authority) => onUpdate(n.id, { building_control_authority: authority })}
        initialAddress={address || ''}
      />

      <ReportPdfViewer reportId={n.report_id} open={showPdf} onOpenChange={setShowPdf} />
    </>
  );
};
