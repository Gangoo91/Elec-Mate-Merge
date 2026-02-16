import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Zap,
  CheckCircle2,
  Circle,
  Shield,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  Power,
  User,
  ClipboardCheck,
  Download,
  Loader2,
  Timer,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';
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
import { SignaturePad } from '../common/SignaturePad';
import { useRequestApproval } from '@/hooks/useSupervisorApproval';
import { ReEnergisationSheet } from './ReEnergisationSheet';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';

// ─── Status Config ───

const STATUS_BADGES: Record<
  SafeIsolationRecord['status'],
  { label: string; colour: string; bg: string; icon: React.ElementType }
> = {
  in_progress: {
    label: 'In Progress',
    colour: 'text-amber-400',
    bg: 'bg-amber-500/15 border-amber-500/20',
    icon: Clock,
  },
  isolated: {
    label: 'Isolated — LIVE DANGER',
    colour: 'text-red-400',
    bg: 'bg-red-500/15 border-red-500/20',
    icon: Shield,
  },
  re_energised: {
    label: 'Re-energised',
    colour: 'text-green-400',
    bg: 'bg-green-500/15 border-green-500/20',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    colour: 'text-white',
    bg: 'bg-white/10 border-white/10',
    icon: AlertTriangle,
  },
};

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
    transition: { duration: 0.2, ease: 'easeOut' },
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
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const requestApproval = useRequestApproval();
  const updateRecord = useUpdateIsolationRecord();

  // Inline signature capture state
  const [isolatorName, setIsolatorName] = useState(record.isolator_name || '');
  const [isolatorDate, setIsolatorDate] = useState(
    record.created_at ? new Date(record.created_at).toISOString().split('T')[0] : ''
  );
  const [isolatorSigDataUrl, setIsolatorSigDataUrl] = useState(record.isolator_signature || '');
  const [verifierName, setVerifierName] = useState(record.verifier_name || '');
  const [verifierDate, setVerifierDate] = useState('');
  const [verifierSigDataUrl, setVerifierSigDataUrl] = useState(record.verifier_signature || '');
  const [isSavingSigs, setIsSavingSigs] = useState(false);

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
      } as any);
    } finally {
      setIsSavingSigs(false);
    }
  };

  const statusConf = STATUS_BADGES[record.status];
  const StatusIcon = statusConf.icon;
  const completedCount = record.steps.filter((s) => s.completed).length;

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
            <button
              onClick={onBack}
              className="h-11 w-11 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white truncate">Isolation Summary</h2>
            </div>
          </div>
        )}

        {/* Status banner */}
        <motion.div variants={itemVariants} className={`rounded-xl border p-4 ${statusConf.bg}`}>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                record.status === 'isolated'
                  ? 'bg-red-500/20'
                  : record.status === 're_energised'
                    ? 'bg-green-500/20'
                    : 'bg-amber-500/20'
              }`}
            >
              <StatusIcon className={`h-5 w-5 ${statusConf.colour}`} />
            </div>
            <div className="flex-1">
              <Badge
                className={`${statusConf.bg} ${statusConf.colour} border-none text-xs font-bold`}
              >
                {statusConf.label}
              </Badge>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-white">
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
            className={`rounded-xl border p-3 flex items-center gap-3 ${
              duration.isExpired
                ? 'border-red-500/30 bg-red-500/10 animate-pulse'
                : duration.isExpiring
                  ? 'border-amber-500/30 bg-amber-500/10'
                  : 'border-blue-500/20 bg-blue-500/[0.06]'
            }`}
          >
            <Timer
              className={`h-5 w-5 flex-shrink-0 ${
                duration.isExpired
                  ? 'text-red-400'
                  : duration.isExpiring
                    ? 'text-amber-400'
                    : 'text-blue-400'
              }`}
            />
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${
                  duration.isExpired
                    ? 'text-red-400'
                    : duration.isExpiring
                      ? 'text-amber-400'
                      : 'text-white'
                }`}
              >
                {duration.label}
              </p>
              <p className="text-[10px] text-white mt-0.5">
                {ISOLATION_TIMEOUT_HOURS}h isolation timeout (GS38)
              </p>
            </div>
          </motion.div>
        )}

        {/* Signature enforcement warning + inline capture */}
        {record.status === 'isolated' && !signaturesPresent && (
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-400">Signatures Required</p>
                <p className="text-xs text-white mt-0.5 leading-relaxed">
                  Both isolator and verifier signatures are required before re-energisation. Sign
                  below to proceed.
                </p>
              </div>
            </div>

            {/* Inline Isolator Signature */}
            <SignaturePad
              label="Isolator Signature"
              name={isolatorName}
              date={isolatorDate}
              signatureDataUrl={isolatorSigDataUrl}
              onSignatureChange={setIsolatorSigDataUrl}
              onNameChange={setIsolatorName}
              onDateChange={setIsolatorDate}
            />

            {/* Inline Verifier Signature */}
            <SignaturePad
              label="Verifier Signature"
              name={verifierName}
              date={verifierDate}
              signatureDataUrl={verifierSigDataUrl}
              onSignatureChange={setVerifierSigDataUrl}
              onNameChange={setVerifierName}
              onDateChange={setVerifierDate}
            />

            {/* Save signatures button */}
            <Button
              onClick={handleSaveSignatures}
              disabled={!inlineSignaturesValid || isSavingSigs}
              className="w-full h-11 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {isSavingSigs ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving Signatures...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Save Signatures
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Circuit details */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3"
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-elec-yellow" />
            Circuit Details
          </h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-white flex-shrink-0" />
              <span className="text-white">{record.site_address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-white flex-shrink-0" />
              <span className="text-white">{record.circuit_description}</span>
            </div>
            {record.distribution_board && (
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-white flex-shrink-0" />
                <span className="text-white">{record.distribution_board}</span>
              </div>
            )}
            {record.created_at && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-white flex-shrink-0" />
                <span className="text-white">
                  Started:{' '}
                  {new Date(record.created_at).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Test instrument details */}
        {(() => {
          const step3 = record.steps.find((s) => s.stepNumber === 3);
          const step6 = record.steps.find((s) => s.stepNumber === 6);
          const hasInstrument = step3?.instrumentModel || step3?.instrumentSerial || record.voltage_detector_serial;
          const hasReadings = step6?.voltageReadings;

          if (!hasInstrument && !record.voltage_detector_calibration_date && !hasReadings) return null;

          return (
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3"
            >
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                Test Instrument &amp; Readings
              </h3>

              {/* Instrument details */}
              <div className="space-y-1.5">
                {step3?.instrumentModel && (
                  <p className="text-sm text-white">Make/Model: {step3.instrumentModel}</p>
                )}
                {(step3?.instrumentSerial || record.voltage_detector_serial) && (
                  <p className="text-sm text-white">
                    Serial: {step3?.instrumentSerial || record.voltage_detector_serial}
                  </p>
                )}
                {record.voltage_detector_calibration_date && (
                  <p className="text-sm text-white">
                    Calibration:{' '}
                    {new Date(record.voltage_detector_calibration_date).toLocaleDateString('en-GB')}
                  </p>
                )}
                {step3?.provingUnitSerial && (
                  <p className="text-sm text-white">Proving unit: {step3.provingUnitSerial}</p>
                )}
              </div>

              {/* Dead test log */}
              {hasReadings && (
                <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">Dead Test Log</span>
                    {step6.voltageReadings!.testedAt && (
                      <span className="text-[10px] text-white">
                        {new Date(step6.voltageReadings!.testedAt).toLocaleString('en-GB', {
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
                      <p className="text-[10px] text-white">L-N</p>
                      <p className="text-sm font-bold text-white">
                        {step6.voltageReadings!.ln ?? '-'}V
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white">L-E</p>
                      <p className="text-sm font-bold text-white">
                        {step6.voltageReadings!.le ?? '-'}V
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white">N-E</p>
                      <p className="text-sm font-bold text-white">
                        {step6.voltageReadings!.ne ?? '-'}V
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    {step6.voltageReadings!.ln !== null &&
                    step6.voltageReadings!.le !== null &&
                    step6.voltageReadings!.ne !== null &&
                    step6.voltageReadings!.ln < 50 &&
                    step6.voltageReadings!.le < 50 &&
                    step6.voltageReadings!.ne < 50 ? (
                      <span className="text-xs font-bold text-green-400">CONFIRMED DEAD</span>
                    ) : (
                      <span className="text-xs font-bold text-red-400">LIVE DETECTED</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })()}

        {/* Steps */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h3 className="text-sm font-bold text-white px-1">GS38 Steps</h3>
          {record.steps.map((step) => (
            <div
              key={step.stepNumber}
              className={`flex items-start gap-3 p-3 rounded-xl border ${
                step.completed
                  ? 'border-green-500/20 bg-green-500/[0.04]'
                  : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  step.completed ? 'bg-green-500 text-white' : 'bg-white/[0.08] text-white'
                }`}
              >
                {step.completed ? <CheckCircle2 className="h-4 w-4" /> : step.stepNumber}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-sm font-semibold ${
                    step.completed ? 'text-green-400' : 'text-white'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-xs text-white">{step.description}</p>
                {step.completedAt && (
                  <p className="text-[10px] text-white mt-1">
                    Completed:{' '}
                    {new Date(step.completedAt).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
              {!step.completed && <Circle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />}
            </div>
          ))}
        </motion.div>

        {/* Signatures */}
        {(record.isolator_name || record.verifier_name) && (
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            {record.isolator_name && (
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[10px] text-white mb-1 font-semibold">ISOLATOR</p>
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-white" />
                  <p className="text-sm text-white font-medium">{record.isolator_name}</p>
                </div>
                {record.isolator_signature && (
                  <img
                    src={record.isolator_signature}
                    alt="Isolator signature"
                    className="h-12 mt-2 opacity-80"
                  />
                )}
              </div>
            )}
            {record.verifier_name && (
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[10px] text-white mb-1 font-semibold">VERIFIER</p>
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-white" />
                  <p className="text-sm text-white font-medium">{record.verifier_name}</p>
                </div>
                {record.verifier_signature && (
                  <img
                    src={record.verifier_signature}
                    alt="Verifier signature"
                    className="h-12 mt-2 opacity-80"
                  />
                )}
              </div>
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
            <button
              onClick={() =>
                requestApproval.mutate({
                  table: 'safe_isolation_records',
                  recordId: record.id,
                })
              }
              disabled={requestApproval.isPending}
              className="w-full h-11 px-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <ShieldAlert className="h-4 w-4" />
              Request Supervisor Approval
            </button>
          </motion.div>
        )}

        {record.approval_status === 'pending' && (
          <motion.div variants={itemVariants}>
            <button
              onClick={() => setShowApproval(true)}
              className="w-full h-11 px-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all"
            >
              <ShieldAlert className="h-4 w-4" />
              Review and Approve
            </button>
          </motion.div>
        )}

        {/* Re-energisation info */}
        {record.status === 're_energised' && record.re_energisation_at && (
          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-green-500/20 bg-green-500/[0.06] p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Power className="h-4 w-4 text-green-400" />
              <h3 className="text-sm font-bold text-green-400">Re-energised</h3>
            </div>
            <p className="text-sm text-white">By: {record.re_energisation_by ?? 'Unknown'}</p>
            <p className="text-xs text-white mt-1">
              {new Date(record.re_energisation_at).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </motion.div>
        )}

        {/* Audit trail */}
        <AuditTimeline recordType="safe_isolation" recordId={record.id} />

        {/* GS38 reference */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 flex items-start gap-3"
        >
          <BookOpen className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-white leading-relaxed">
              <span className="font-bold">GS38</span> — Electrical test equipment for use on low
              voltage electrical systems. HSE Guidance Sheet 38, 4th edition.
            </p>
            <p className="text-[10px] text-white mt-1">
              Isolation timeout: {ISOLATION_TIMEOUT_HOURS}h. Both isolator and verifier signatures
              required.
            </p>
          </div>
        </motion.div>

        {/* Export PDF */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => exportPDF('safe-isolation', record.id)}
            disabled={isExporting && exportingId === record.id}
            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isExporting && exportingId === record.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Export PDF
          </button>
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
            <Button
              onClick={() => setShowReEnergise(true)}
              disabled={!signaturesPresent}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              <Power className="h-5 w-5 mr-2" />
              Re-energise Circuit
            </Button>
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
    </>
  );
}

export default IsolationSummary;
