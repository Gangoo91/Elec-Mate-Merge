import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Eyebrow,
  Field,
  FormCard,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  inputClass,
  type Tone,
} from '@/components/college/primitives';
import type { SafeIsolationRecord } from '@/hooks/useSafeIsolationRecords';
import {
  getIsolationDuration,
  hasRequiredSignatures,
  useIsolationExpiryCheck,
  useUpdateIsolationRecord,
  ISOLATION_TIMEOUT_HOURS,
} from '@/hooks/useSafeIsolationRecords';
import { AuditTimeline } from '../common/AuditTimeline';
import { ApprovalBadge, ApprovalInfoCard } from '../common/ApprovalBadge';
import { ApprovalSheet } from '../common/ApprovalSheet';
import { SignatureField } from '../common/SignatureField';
import { RemoteSignShareSheet } from '../common/RemoteSignShareSheet';
import { createSafetySignToken, buildSignUrl, useRecordSignatures } from '@/hooks/useRemoteSignToken';
import { useRequestApproval } from '@/hooks/useSupervisorApproval';
import { ReEnergisationSheet } from './ReEnergisationSheet';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';

// ─── Status Config ───

type IsoStatus = SafeIsolationRecord['status'];

const STATUS_LABEL: Record<IsoStatus, string> = {
  in_progress: 'In progress',
  isolated: 'Isolated — live danger',
  re_energised: 'Re-energised',
  cancelled: 'Cancelled',
};

// One colour dimension = status. Isolated = live isolation in place (red),
// in progress = amber, re-energised = emerald, cancelled = neutral.
function statusTone(status: IsoStatus): 'amber' | 'red' | 'emerald' | 'neutral' {
  if (status === 'isolated') return 'red';
  if (status === 'in_progress') return 'amber';
  if (status === 're_energised') return 'emerald';
  return 'neutral';
}

const STATUS_PILL: Record<'amber' | 'red' | 'emerald' | 'neutral', string> = {
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
};

const STATUS_DOT: Record<'amber' | 'red' | 'emerald' | 'neutral', string> = {
  amber: 'bg-amber-400',
  red: 'bg-red-400',
  emerald: 'bg-emerald-400',
  neutral: 'bg-white/15',
};

function StatusPill({ status, className }: { status: IsoStatus; className?: string }) {
  const tone = statusTone(status);
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        STATUS_PILL[tone],
        className
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

// ─── Animation Variants ───

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
};

// ─── Component ───

interface IsolationSummaryProps {
  record: SafeIsolationRecord;
  onBack?: () => void;
}

export function IsolationSummary({ record, onBack }: IsolationSummaryProps) {
  const [showReEnergise, setShowReEnergise] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const requestApproval = useRequestApproval();
  const updateRecord = useUpdateIsolationRecord();

  // Inline signature capture state
  const [isolatorName, setIsolatorName] = useState(record.isolator_name || '');
  const [isolatorSigDataUrl, setIsolatorSigDataUrl] = useState(record.isolator_signature || '');
  const [verifierName, setVerifierName] = useState(record.verifier_name || '');
  const [verifierSigDataUrl, setVerifierSigDataUrl] = useState(record.verifier_signature || '');
  const [isSavingSigs, setIsSavingSigs] = useState(false);

  // Remote verifier sign-off (generic engine). The verifier signs on their own
  // device; their signature flows into the verifier field below for save.
  const [showSignShare, setShowSignShare] = useState(false);
  const [signUrl, setSignUrl] = useState('');
  const [signLoading, setSignLoading] = useState(false);
  const { data: remoteSignatures = [] } = useRecordSignatures('safe-isolation', record.id);
  const remoteVerifier = remoteSignatures.find((s) => s.role === 'verifier' && s.signed_signature);

  // Pull a completed remote verifier signature into the verifier field once.
  useEffect(() => {
    if (remoteVerifier?.signed_signature && !verifierSigDataUrl) {
      setVerifierSigDataUrl(remoteVerifier.signed_signature);
      if (remoteVerifier.signed_name && !verifierName) setVerifierName(remoteVerifier.signed_name);
    }
  }, [remoteVerifier, verifierSigDataUrl, verifierName]);

  const requestVerifierSignOff = async () => {
    setSignLoading(true);
    try {
      const token = await createSafetySignToken({
        documentType: 'safe-isolation',
        recordId: record.id,
        role: 'verifier',
        summary: {
          title: 'Safe Isolation — Verifier Sign-off',
          subtitle: record.circuit_description || record.site_address || undefined,
          lines: [
            { label: 'Site', value: record.site_address || '—' },
            { label: 'Circuit', value: record.circuit_description || '—' },
            { label: 'Distribution board', value: record.distribution_board || '—' },
            { label: 'Isolated by', value: record.isolator_name || '—' },
          ].filter((l) => l.value !== '—' || ['Site', 'Circuit'].includes(l.label)),
          statement:
            'By signing you confirm, as the second competent person, that you have witnessed and verified this safe isolation in accordance with GS38.',
        },
      });
      if (!token) {
        setSignLoading(false);
        return;
      }
      setSignUrl(buildSignUrl(token));
      setShowSignShare(true);
    } finally {
      setSignLoading(false);
    }
  };

  // GS38 compliance hooks
  useIsolationExpiryCheck();
  const duration = getIsolationDuration(record);
  const signaturesPresent = hasRequiredSignatures(record);

  // Check if inline sigs satisfy the requirement (live check)
  const inlineSignaturesValid =
    isolatorName.trim().length > 0 &&
    isolatorSigDataUrl.length > 0 &&
    verifierName.trim().length > 0 &&
    verifierSigDataUrl.length > 0;

  const handleSaveSignatures = async () => {
    if (!inlineSignaturesValid) return;
    setIsSavingSigs(true);
    try {
      await updateRecord.mutateAsync({
        id: record.id,
        isolator_name: isolatorName.trim(),
        isolator_signature: isolatorSigDataUrl,
        verifier_name: verifierName.trim(),
        verifier_signature: verifierSigDataUrl,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    } finally {
      setIsSavingSigs(false);
    }
  };

  const completedCount = record.steps.filter((s) => s.completed).length;
  const isExportingThis = isExporting && exportingId === record.id;

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Header */}
        {onBack && (
          <div className="flex items-center gap-3 mb-2">
            <IconButton aria-label="Back" onClick={onBack}>
              <span aria-hidden className="text-[18px] leading-none text-white">←</span>
            </IconButton>
            <div className="flex-1 min-w-0">
              <Eyebrow>GS38 safe isolation</Eyebrow>
              <h2 className="text-base font-semibold text-white truncate">Isolation summary</h2>
            </div>
          </div>
        )}

        {/* Status banner */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden p-4"
        >
          <span
            aria-hidden
            className={cn('absolute inset-y-0 left-0 w-[3px]', STATUS_DOT[statusTone(record.status)])}
          />
          <div className="flex items-center gap-3 pl-2">
            <div className="flex-1 min-w-0">
              <StatusPill status={record.status} />
              <div className="flex items-center gap-2 mt-1.5">
                <p className="text-xs text-white/70 tabular-nums">
                  {completedCount} of {record.steps.length} steps completed
                </p>
                <ApprovalBadge status={record.approval_status} approvedBy={record.approved_by} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Isolation expiry timer */}
        {record.status === 'isolated' && duration.label && (
          <motion.div
            variants={itemVariants}
            className={cn(
              'relative rounded-2xl border bg-[hsl(0_0%_12%)] overflow-hidden p-4',
              duration.isExpired
                ? 'border-red-500/25 animate-pulse'
                : duration.isExpiring
                  ? 'border-amber-500/25'
                  : 'border-white/[0.06]'
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute inset-y-0 left-0 w-[3px]',
                duration.isExpired ? 'bg-red-400' : duration.isExpiring ? 'bg-amber-400' : 'bg-white/15'
              )}
            />
            <div className="pl-2">
              <p
                className={cn(
                  'text-sm font-semibold',
                  duration.isExpired
                    ? 'text-red-400'
                    : duration.isExpiring
                      ? 'text-amber-400'
                      : 'text-white'
                )}
              >
                {duration.label}
              </p>
              <p className="text-[10px] text-white/55 mt-0.5">
                {ISOLATION_TIMEOUT_HOURS}h isolation timeout (GS38)
              </p>
            </div>
          </motion.div>
        )}

        {/* Signature enforcement warning + inline capture */}
        {record.status === 'isolated' && !signaturesPresent && (
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 space-y-1">
              <Eyebrow className="text-amber-300/90">Signatures required</Eyebrow>
              <p className="text-xs text-white/70 leading-relaxed">
                Both isolator and verifier signatures are required before re-energisation. Sign
                below to proceed.
              </p>
            </div>

            <FormCard eyebrow="Isolator signature">
              <SignatureField
                label="Signature"
                value={isolatorSigDataUrl}
                onChange={setIsolatorSigDataUrl}
              />
              <Field label="Isolator name" required>
                <input
                  value={isolatorName}
                  onChange={(e) => setIsolatorName(e.target.value)}
                  className={inputClass}
                  placeholder="Person carrying out isolation"
                />
              </Field>
            </FormCard>

            <FormCard eyebrow="Verifier signature">
              {remoteVerifier?.signed_signature && (
                <div className="rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 px-3 py-2">
                  <p className="text-[11.5px] text-emerald-400">
                    Verified remotely by {remoteVerifier.signed_name || 'verifier'}
                    {remoteVerifier.signed_at ? ` · ${new Date(remoteVerifier.signed_at).toLocaleDateString('en-GB')}` : ''} — confirm and save below.
                  </p>
                </div>
              )}
              <SignatureField
                label="Signature"
                value={verifierSigDataUrl}
                onChange={setVerifierSigDataUrl}
              />
              <Field label="Verifier name" required>
                <input
                  value={verifierName}
                  onChange={(e) => setVerifierName(e.target.value)}
                  className={inputClass}
                  placeholder="Second competent person"
                />
              </Field>
              {!remoteVerifier?.signed_signature && (
                <SecondaryButton fullWidth disabled={signLoading} onClick={requestVerifierSignOff}>
                  {signLoading ? 'Preparing link…' : 'Get verifier to sign on their phone'}
                </SecondaryButton>
              )}
            </FormCard>

            <PrimaryButton
              fullWidth
              size="lg"
              onClick={handleSaveSignatures}
              disabled={!inlineSignaturesValid || isSavingSigs}
            >
              {isSavingSigs ? 'Saving signatures…' : 'Save signatures'}
            </PrimaryButton>
          </motion.div>
        )}

        {/* Circuit details */}
        <motion.div variants={itemVariants}>
          <FormCard eyebrow="Circuit details">
            <div className="space-y-1.5">
              <p className="text-sm text-white">{record.site_address}</p>
              <p className="text-sm text-white/70">{record.circuit_description}</p>
              {record.distribution_board && (
                <p className="text-sm text-white/70">Board: {record.distribution_board}</p>
              )}
              {record.created_at && (
                <p className="text-[12px] text-white/55 tabular-nums">
                  Started:{' '}
                  {new Date(record.created_at).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>
          </FormCard>
        </motion.div>

        {/* Test instrument details */}
        {(() => {
          const step3 = record.steps.find((s) => s.stepNumber === 3);
          const step6 = record.steps.find((s) => s.stepNumber === 6);
          const hasInstrument =
            step3?.instrumentModel || step3?.instrumentSerial || record.voltage_detector_serial;
          const hasReadings = step6?.voltageReadings;

          if (!hasInstrument && !record.voltage_detector_calibration_date && !hasReadings)
            return null;

          const readingsDead =
            !!hasReadings &&
            step6!.voltageReadings!.ln !== null &&
            step6!.voltageReadings!.le !== null &&
            step6!.voltageReadings!.ne !== null &&
            step6!.voltageReadings!.ln < 50 &&
            step6!.voltageReadings!.le < 50 &&
            step6!.voltageReadings!.ne < 50;

          return (
            <motion.div variants={itemVariants}>
              <FormCard eyebrow="Test instrument & readings">
                {/* Instrument details */}
                <div className="space-y-1">
                  {step3?.instrumentModel && (
                    <p className="text-sm text-white/70">Make/Model: {step3.instrumentModel}</p>
                  )}
                  {(step3?.instrumentSerial || record.voltage_detector_serial) && (
                    <p className="text-sm text-white/70">
                      Serial: {step3?.instrumentSerial || record.voltage_detector_serial}
                    </p>
                  )}
                  {record.voltage_detector_calibration_date && (
                    <p className="text-sm text-white/70">
                      Calibration:{' '}
                      {new Date(record.voltage_detector_calibration_date).toLocaleDateString('en-GB')}
                    </p>
                  )}
                  {step3?.provingUnitSerial && (
                    <p className="text-sm text-white/70">Proving unit: {step3.provingUnitSerial}</p>
                  )}
                </div>

                {/* Dead test log */}
                {hasReadings && (
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-white uppercase tracking-[0.12em]">
                        Dead test log
                      </span>
                      {step6!.voltageReadings!.testedAt && (
                        <span className="text-[10px] text-white/55 tabular-nums">
                          {new Date(step6!.voltageReadings!.testedAt).toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-[10px] text-white/55">L-N</p>
                        <p className="text-sm font-bold text-white tabular-nums">
                          {step6!.voltageReadings!.ln ?? '-'}V
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/55">L-E</p>
                        <p className="text-sm font-bold text-white tabular-nums">
                          {step6!.voltageReadings!.le ?? '-'}V
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/55">N-E</p>
                        <p className="text-sm font-bold text-white tabular-nums">
                          {step6!.voltageReadings!.ne ?? '-'}V
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center">
                      <span
                        className={cn(
                          'text-[10px] font-semibold uppercase tracking-[0.12em]',
                          readingsDead ? 'text-emerald-400' : 'text-red-400'
                        )}
                      >
                        {readingsDead ? 'Confirmed dead' : 'Live detected'}
                      </span>
                    </div>
                  </div>
                )}
              </FormCard>
            </motion.div>
          );
        })()}

        {/* Steps */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Eyebrow className="px-1">GS38 steps</Eyebrow>
          <ListCard>
            {record.steps.map((step) => {
              const tone: Tone | undefined = step.completed ? 'emerald' : undefined;
              return (
                <ListRow
                  key={step.stepNumber}
                  accent={tone}
                  lead={
                    <span
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold tabular-nums',
                        step.completed ? 'bg-emerald-500 text-black' : 'bg-white/[0.08] text-white/70'
                      )}
                    >
                      {step.completed ? '✓' : step.stepNumber}
                    </span>
                  }
                  title={step.title}
                  subtitle={
                    step.completedAt
                      ? `${step.description} · Completed ${new Date(step.completedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
                      : step.description
                  }
                  trailing={
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
                        step.completed ? STATUS_PILL.emerald : STATUS_PILL.neutral
                      )}
                    >
                      {step.completed ? 'Done' : 'Pending'}
                    </span>
                  }
                />
              );
            })}
          </ListCard>
        </motion.div>

        {/* Signatures */}
        {(record.isolator_name || record.verifier_name) && (
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            {record.isolator_name && (
              <FormCard eyebrow="Isolator">
                <p className="text-sm text-white font-medium">{record.isolator_name}</p>
                {record.isolator_signature && (
                  <img
                    src={record.isolator_signature}
                    alt="Isolator signature"
                    className="h-12 mt-1 opacity-80"
                  />
                )}
              </FormCard>
            )}
            {record.verifier_name && (
              <FormCard eyebrow="Verifier">
                <p className="text-sm text-white font-medium">{record.verifier_name}</p>
                {record.verifier_signature && (
                  <img
                    src={record.verifier_signature}
                    alt="Verifier signature"
                    className="h-12 mt-1 opacity-80"
                  />
                )}
              </FormCard>
            )}
          </motion.div>
        )}

        {/* Approval status / actions */}
        {record.approval_status !== 'not_required' && (
          <motion.div variants={itemVariants}>
            <ApprovalInfoCard
              status={record.approval_status}
              approvedBy={record.approved_by}
              approvedAt={record.approved_at}
              comments={record.approval_comments}
              approvalSignature={record.approval_signature}
            />
          </motion.div>
        )}

        {record.status === 'isolated' && record.approval_status === 'not_required' && (
          <motion.div variants={itemVariants}>
            <SecondaryButton
              fullWidth
              onClick={() =>
                requestApproval.mutate({
                  table: 'safe_isolation_records',
                  recordId: record.id,
                })
              }
              disabled={requestApproval.isPending}
            >
              Request supervisor approval
            </SecondaryButton>
          </motion.div>
        )}

        {record.approval_status === 'pending' && (
          <motion.div variants={itemVariants}>
            <SecondaryButton fullWidth onClick={() => setShowApproval(true)}>
              Review and approve
            </SecondaryButton>
          </motion.div>
        )}

        {/* Re-energisation info */}
        {record.status === 're_energised' && record.re_energisation_at && (
          <motion.div variants={itemVariants}>
            <FormCard eyebrow="Re-energised" className="border-emerald-500/20">
              <p className="text-sm text-white">By: {record.re_energisation_by ?? 'Unknown'}</p>
              <p className="text-[12px] text-white/55 tabular-nums">
                {new Date(record.re_energisation_at).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </FormCard>
          </motion.div>
        )}

        {/* Audit trail */}
        <AuditTimeline recordType="safe_isolation" recordId={record.id} />

        {/* GS38 reference */}
        <motion.div variants={itemVariants}>
          <FormCard eyebrow="GS38">
            <p className="text-xs text-white/70 leading-relaxed">
              Electrical test equipment for use on low voltage electrical systems. HSE Guidance
              Sheet 38, 4th edition.
            </p>
            <p className="text-[10px] text-white/55">
              Isolation timeout: {ISOLATION_TIMEOUT_HOURS}h. Both isolator and verifier signatures
              required.
            </p>
          </FormCard>
        </motion.div>

        {/* Export & Share */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2">
          <SecondaryButton
            fullWidth
            onClick={() => exportPDF('safe-isolation', record.id)}
            disabled={isExportingThis}
          >
            {isExportingThis ? 'Exporting…' : 'Export PDF'}
          </SecondaryButton>
          <SecondaryButton fullWidth onClick={() => setShowShare(true)}>
            Share
          </SecondaryButton>
        </motion.div>

        {/* Re-energise button */}
        {record.status === 'isolated' && (
          <motion.div
            variants={itemVariants}
            className="pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            {!signaturesPresent && !inlineSignaturesValid && (
              <p className="text-xs text-amber-400 text-center mb-2">
                Both isolator and verifier signatures are required before re-energisation
              </p>
            )}
            <PrimaryButton
              fullWidth
              size="lg"
              onClick={() => setShowReEnergise(true)}
              disabled={!signaturesPresent}
            >
              Re-energise circuit
            </PrimaryButton>
          </motion.div>
        )}
      </motion.div>

      {/* Re-energisation bottom sheet */}
      <ReEnergisationSheet
        recordId={record.id}
        open={showReEnergise}
        onComplete={() => setShowReEnergise(false)}
        onOpenChange={setShowReEnergise}
      />

      {/* Supervisor approval bottom sheet */}
      <ApprovalSheet
        open={showApproval}
        onOpenChange={setShowApproval}
        table="safe_isolation_records"
        recordId={record.id}
        recordTitle={record.circuit_description}
      />

      {/* Share sheet */}
      <SafetyDocumentShare
        open={showShare}
        onClose={() => setShowShare(false)}
        pdfType="safe-isolation"
        recordId={record.id}
        documentTitle={`Safe Isolation — ${record.circuit_description}`}
      />

      <RemoteSignShareSheet
        open={showSignShare}
        onOpenChange={setShowSignShare}
        url={signUrl}
        roleLabel="verifier sign-off"
      />
    </>
  );
}

export default IsolationSummary;
