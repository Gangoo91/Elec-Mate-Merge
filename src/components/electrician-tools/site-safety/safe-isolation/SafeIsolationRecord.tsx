import { useEffect, useState } from 'react';
import type { SafetyToolLaunch } from '@/utils/safety-launch';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useFieldValidation } from '@/hooks/useFieldValidation';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useShowMore } from '@/hooks/useShowMore';
import {
  useSafeIsolationRecords,
  useCreateIsolationRecord,
  useUpdateIsolationRecord,
  useIsolationExpiryCheck,
  getIsolationDuration,
  readingsConfirmDead,
  ISOLATION_TIMEOUT_HOURS,
} from '@/hooks/useSafeIsolationRecords';
import type { SafeIsolationRecord as SafeIsolationRecordType } from '@/hooks/useSafeIsolationRecords';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  SheetShell,
  PrimaryButton,
  type Tone,
} from '@/components/college/primitives';
import { safetyInputCn } from '../common/SafetyDocField';

import { SafetyModuleShell, SafetyMasthead } from '../common/SafetyModuleShell';
import { SignatureField } from '../common/SignatureField';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { PermitSelector } from '../common/PermitSelector';
import { JobLinkField } from '../common/JobLinkField';
import { FirmRecordBar } from '../common/FirmRecordBar';
import { useFirmRecordAccess } from '../common/SafetyScope';
import { DraftRecoveryBanner } from '../common/DraftRecoveryBanner';
import { DraftSaveIndicator } from '../common/DraftSaveIndicator';
import { LoadMoreButton } from '../common/LoadMoreButton';
import { IsolationStepCard, type StepCompletionData } from './IsolationStepCard';
import { IsolationSummary } from './IsolationSummary';
import { SafetyListCard, SafetyListRow } from '../common/SafetyList';
import { SafetyPageHeader } from '../common/SafetyPageHeader';

type IsoStatus = SafeIsolationRecordType['status'];

const STATUS_LABEL: Record<IsoStatus, string> = {
  in_progress: 'In progress',
  isolated: 'Isolated',
  re_energised: 'Re-energised',
  cancelled: 'Cancelled',
};

// One colour dimension = status. Isolated = live isolation in place (red/danger),
// in progress = amber, re-energised = done (blue), cancelled = neutral.
function statusTone(status: IsoStatus): Tone | undefined {
  if (status === 'isolated') return 'red';
  if (status === 'in_progress') return 'amber';
  if (status === 're_energised') return 'blue';
  return undefined;
}

const STATUS_PILL: Record<'amber' | 'red' | 'blue' | 'neutral', string> = {
  // Neutral surface, coloured text — same as Permit to Work. Blue was not in
  // the palette at all; re-energised now reads as plain white, which is what
  // "finished, nothing live" should look like.
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  red: 'bg-white/[0.05] text-red-400 border-white/10',
  blue: 'bg-white/[0.05] text-white border-white/10',
  neutral: 'bg-white/[0.05] text-white border-white/10',
};

function StatusPill({ status }: { status: IsoStatus }) {
  const key = (statusTone(status) as 'amber' | 'red' | 'blue') ?? 'neutral';
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        STATUS_PILL[key]
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

const fmtDate = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

// ─── New record form (rendered inside a SheetShell) ───

interface NewRecordPayload {
  site_address: string;
  circuit_description: string;
  distribution_board?: string;
  voltage_detector_serial?: string;
  voltage_detector_calibration_date?: string;
  photos?: string[];
  isolator_name?: string;
  isolator_signature?: string;
  verifier_name?: string;
  verifier_signature?: string;
  permit_id?: string;
  job_id?: string;
  /** Firm job (employer_jobs) — shares the isolation with the firm. */
  employer_job_id?: string;
}

function NewRecordForm({
  onSubmit,
  isSubmitting,
  initialJobId = null,
  initialEmployerJobId = null,
  initialSiteAddress = '',
}: {
  onSubmit: (data: NewRecordPayload) => void;
  isSubmitting: boolean;
  initialJobId?: string | null;
  initialEmployerJobId?: string | null;
  initialSiteAddress?: string;
}) {
  const [isolatorName, setIsolatorName] = useState('');
  const [isolatorSig, setIsolatorSig] = useState('');
  const [verifierName, setVerifierName] = useState('');
  const [verifierSig, setVerifierSig] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [selectedPermitId, setSelectedPermitId] = useState<string | null>(null);
  const [linkedJobId, setLinkedJobId] = useState<string | null>(initialJobId);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(null);
  // Firm job (employer_jobs): set in the Employer Hub, or by a worker sharing
  // the isolation with their firm.
  const [employerJobId, setEmployerJobId] = useState<string | null>(initialEmployerJobId);
  const [employerJobTitle, setEmployerJobTitle] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const validation = useFieldValidation({
    site_address: { required: true, message: 'Site address is required' },
    circuit_description: { required: true, message: 'Circuit description is required' },
    distribution_board: {},
    voltage_detector_serial: {},
    voltage_detector_calibration_date: {},
  });

  // Started from a job: its address is the site. Set once; the user can edit.
  useEffect(() => {
    if (initialSiteAddress) validation.setValue('site_address', initialSiteAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'safe-isolation',
    data: {
      site_address: validation.fields.site_address?.value ?? '',
      circuit_description: validation.fields.circuit_description?.value ?? '',
      distribution_board: validation.fields.distribution_board?.value ?? '',
      voltage_detector_serial: validation.fields.voltage_detector_serial?.value ?? '',
      voltage_detector_calibration_date:
        validation.fields.voltage_detector_calibration_date?.value ?? '',
    },
    enabled: true,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    (
      [
        'site_address',
        'circuit_description',
        'distribution_board',
        'voltage_detector_serial',
        'voltage_detector_calibration_date',
      ] as const
    ).forEach((k) => {
      if (recoveredDraft[k]) validation.setValue(k, recoveredDraft[k]);
    });
    dismissDraft();
  };

  const f = validation.fields;
  // Open the optional section by itself whenever it already holds something
  // (a restored draft, a photo), so nothing entered is ever hidden.
  const moreOpen =
    showMore ||
    !!f.voltage_detector_serial?.value ||
    !!f.voltage_detector_calibration_date?.value ||
    photoUrls.length > 0 ||
    !!isolatorSig ||
    !!isolatorName ||
    !!verifierSig ||
    !!verifierName;
  const missing = [
    !f.circuit_description?.value?.trim() && 'a circuit description',
    !f.site_address?.value?.trim() && 'the site address',
  ].filter(Boolean) as string[];
  const submit = () => {
    if (!validation.validateAll()) return;
    const payload: NewRecordPayload = {
      site_address: f.site_address.value.trim(),
      circuit_description: f.circuit_description.value.trim(),
      ...(f.distribution_board.value.trim()
        ? { distribution_board: f.distribution_board.value.trim() }
        : {}),
      ...(f.voltage_detector_serial.value.trim()
        ? { voltage_detector_serial: f.voltage_detector_serial.value.trim() }
        : {}),
      ...(f.voltage_detector_calibration_date.value
        ? { voltage_detector_calibration_date: f.voltage_detector_calibration_date.value }
        : {}),
      ...(photoUrls.length > 0 ? { photos: photoUrls } : {}),
      ...(isolatorName.trim() ? { isolator_name: isolatorName.trim() } : {}),
      ...(isolatorSig ? { isolator_signature: isolatorSig } : {}),
      ...(verifierName.trim() ? { verifier_name: verifierName.trim() } : {}),
      ...(verifierSig ? { verifier_signature: verifierSig } : {}),
      ...(selectedPermitId ? { permit_id: selectedPermitId } : {}),
      ...(linkedJobId ? { job_id: linkedJobId } : {}),
      ...(employerJobId ? { employer_job_id: employerJobId } : {}),
    };
    clearDraft();
    onSubmit(payload);
  };

  return (
    <SheetShell
      eyebrow="GS38 safe isolation"
      title="New isolation record"
      description={<DraftSaveIndicator status={draftStatus} />}
      footer={
        <div className="space-y-2">
          {missing.length > 0 && (
            <p className="text-center text-[12px] text-white">
              Add {missing.join(' and ')} to start.
            </p>
          )}
          <PrimaryButton fullWidth disabled={!validation.isValid || isSubmitting} onClick={submit}>
            {isSubmitting ? 'Creating…' : 'Start GS38 procedure'}
          </PrimaryButton>
        </div>
      }
    >
      <AnimatePresence>
        {recoveredDraft && (
          <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
        )}
      </AnimatePresence>

      {/* The two things needed to start, first. Everything else can be
          added now or later from the record. */}
      <Field label="Circuit description" required>
        <input
          value={f.circuit_description?.value ?? ''}
          onChange={(e) => validation.setValue('circuit_description', e.target.value)}
          onBlur={() => validation.setTouched('circuit_description')}
          className={safetyInputCn}
          placeholder="e.g. Ring final circuit — kitchen"
        />
        {f.circuit_description?.touched && f.circuit_description?.error && (
          <p className="text-[11px] text-red-400 mt-1">{f.circuit_description.error}</p>
        )}
      </Field>

      <div ref={validation.registerRef('site_address')}>
        <LocationAutoFill
          value={f.site_address?.value ?? ''}
          onChange={(v) => {
            validation.setValue('site_address', v);
            validation.setTouched('site_address');
          }}
          label="Site address"
          placeholder="e.g. 42 High Street, Manchester"
        />
        {f.site_address?.touched && f.site_address?.error && (
          <p className="text-[11px] text-red-400 mt-1">{f.site_address.error}</p>
        )}
      </div>

      <Field label="Distribution board">
        <input
          value={f.distribution_board?.value ?? ''}
          onChange={(e) => validation.setValue('distribution_board', e.target.value)}
          className={safetyInputCn}
          placeholder="e.g. DB1 — Main Board"
        />
      </Field>

      <JobLinkField
        jobId={linkedJobId}
        jobTitle={linkedJobTitle}
        onSelect={(id, title) => {
          setLinkedJobId(id);
          setLinkedJobTitle(title);
        }}
        employerJobId={employerJobId}
        employerJobTitle={employerJobTitle}
        onSelectEmployerJob={(id, title) => {
          setEmployerJobId(id);
          setEmployerJobTitle(title);
        }}
      />

      <PermitSelector
        permitTypes={['electrical-isolation']}
        selectedPermitId={selectedPermitId}
        onSelect={(id, permit) => {
          setSelectedPermitId(id);
          if (permit?.location && !f.site_address?.value)
            validation.setValue('site_address', permit.location);
        }}
        label="Link to isolation permit (optional)"
      />

      <div className="border-t border-white/[0.1] pt-2">
        <button
          type="button"
          aria-expanded={moreOpen}
          onClick={() => setShowMore((v) => !v)}
          className="flex h-11 w-full items-center justify-between text-left touch-manipulation"
        >
          <span>
            <span className="block text-sm font-semibold text-white">
              Tester, photos and signatures
            </span>
            <span className="block text-[11.5px] text-white">
              Optional now — you can add signatures on the record later
            </span>
          </span>
          <span aria-hidden className="text-[15px] text-white">
            {moreOpen ? '−' : '+'}
          </span>
        </button>
      </div>

      {moreOpen && (
        <>
          <Field
            label="Voltage detector serial no."
            hint="GS38 — proving instrument must be in calibration."
          >
            <input
              value={f.voltage_detector_serial?.value ?? ''}
              onChange={(e) => validation.setValue('voltage_detector_serial', e.target.value)}
              className={safetyInputCn}
              placeholder="e.g. FLK-T150 / SN: 12345"
            />
          </Field>

          <Field label="Voltage detector calibration date">
            <input
              type="date"
              value={f.voltage_detector_calibration_date?.value ?? ''}
              onChange={(e) =>
                validation.setValue('voltage_detector_calibration_date', e.target.value)
              }
              className={cn(safetyInputCn, '[color-scheme:dark]')}
            />
          </Field>

          <div>
            <Eyebrow className="mb-2">Evidence photos</Eyebrow>
            <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} label="" />
          </div>

          <SignatureField
            label="Isolator signature"
            value={isolatorSig}
            onChange={setIsolatorSig}
          />
          <Field label="Isolator name">
            <input
              value={isolatorName}
              onChange={(e) => setIsolatorName(e.target.value)}
              className={safetyInputCn}
              placeholder="Person carrying out isolation"
            />
          </Field>

          <SignatureField
            label="Verifier signature"
            value={verifierSig}
            onChange={setVerifierSig}
          />
          <Field label="Verifier name">
            <input
              value={verifierName}
              onChange={(e) => setVerifierName(e.target.value)}
              className={safetyInputCn}
              placeholder="Second competent person (optional)"
            />
          </Field>
        </>
      )}
    </SheetShell>
  );
}

// ─── GS38 step workflow ───

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

function StepWorkflow({ record, onBack }: { record: SafeIsolationRecordType; onBack: () => void }) {
  const updateMutation = useUpdateIsolationRecord();
  // Employer Hub: a worker's shared isolation is read and countersigned, not changed.
  const access = useFirmRecordAccess(record);
  const allCompleted = record.steps.every((s) => s.completed);

  const handleCompleteStep = async (stepNumber: number, data?: StepCompletionData) => {
    // Prove dead is the only step that can fail. When it does, the readings are
    // still written — they are the record that the isolation did not hold — but
    // the step stays open, so `allDone` below can never flip a live circuit to
    // status 'isolated'.
    const failed = data?.proveDeadFailed === true;

    const updatedSteps = record.steps.map((s) =>
      s.stepNumber === stepNumber
        ? {
            ...s,
            completed: !failed,
            completedAt: failed ? undefined : new Date().toISOString(),
            ...(data?.voltageReadings ? { voltageReadings: data.voltageReadings } : {}),
            ...(data?.lockOffNumber ? { lockOffNumber: data.lockOffNumber } : {}),
            ...(data?.provingUnitSerial ? { provingUnitSerial: data.provingUnitSerial } : {}),
            ...(data?.instrumentModel ? { instrumentModel: data.instrumentModel } : {}),
            ...(data?.instrumentSerial ? { instrumentSerial: data.instrumentSerial } : {}),
            ...(data?.testerProvedOk ? { testerProvedOk: true } : {}),
          }
        : s
    );
    // Two independent conditions, deliberately. Every step complete is the
    // procedural test; the readings actually reading dead is the physical one.
    // A record reaches 'isolated' only if both hold — this is the transition
    // that tells someone it is safe to put their hands in.
    const proveDead = updatedSteps.find((s) => s.stepNumber === 6);
    const allDone =
      updatedSteps.every((s) => s.completed) && readingsConfirmDead(proveDead?.voltageReadings);
    const topLevelUpdates: Record<string, unknown> = {};
    if (data?.lockOffNumber) topLevelUpdates.lock_off_number = data.lockOffNumber;
    if (data?.provingUnitSerial) topLevelUpdates.proving_unit_used = true;

    // A failed save must be visible: the step would otherwise look done on
    // screen while the record in the cloud still shows it open. The hook's
    // onError tells the user; catching here stops an unhandled rejection.
    try {
      await updateMutation.mutateAsync({
        id: record.id,
        steps: updatedSteps,
        ...topLevelUpdates,
        ...(allDone
          ? { status: 'isolated' as const, isolation_completed_at: new Date().toISOString() }
          : {}),
      });
    } catch {
      /* surfaced by useUpdateIsolationRecord's onError toast */
    }
  };

  const activeStep = record.steps.find((s) => !s.completed);
  const activeStepNumber = activeStep?.stepNumber ?? -1;
  const done = record.steps.filter((s) => s.completed).length;

  if (allCompleted || record.status === 'isolated' || record.status === 're_energised') {
    // Same sticky bar as the step view, so the summary is not a page with its
    // own home-made back row that scrolls away.
    return (
      <div className="bg-[hsl(0_0%_7%)] min-h-screen pb-24">
        <SafetyMasthead
          onBack={onBack}
          backLabel="Records"
          moduleName={record.circuit_description}
          subtitle={record.site_address}
        />
        <div className="mx-auto max-w-5xl px-4 py-5">
          <IsolationSummary record={record} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[hsl(0_0%_7%)] min-h-screen pb-24">
      <SafetyMasthead
        onBack={onBack}
        backLabel="Records"
        moduleName={record.circuit_description}
        subtitle={record.site_address}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-4 py-5 space-y-4"
      >
        <FirmRecordBar
          table="safe_isolation_records"
          row={record}
          invalidate={[['safe-isolation-records']]}
        />

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[15px] font-semibold tracking-tight text-white">
              {activeStep
                ? `Step ${activeStep.stepNumber} of ${record.steps.length}`
                : 'All steps done'}
            </p>
            <p className="text-[12px] text-white tabular-nums">
              {record.steps.length - done} to go
            </p>
          </div>
          <div className="mt-2 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-elec-yellow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(done / record.steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-2 text-[12px] text-white">
            Record each step as you carry it out. The app keeps the record; it does not isolate or
            prove anything for you.
          </p>
        </div>

        <div className="space-y-2.5">
          {record.steps.map((step) => (
            <motion.div key={step.stepNumber} variants={itemVariants}>
              <IsolationStepCard
                step={step}
                stepNumber={step.stepNumber}
                isActive={access.canEdit && step.stepNumber === activeStepNumber}
                onComplete={(data) => handleCompleteStep(step.stepNumber, data)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main ───

export function SafeIsolationRecord({
  onBack,
  launch,
}: {
  onBack: () => void;
  launch?: SafetyToolLaunch;
}) {
  const { data: records, isLoading } = useSafeIsolationRecords();
  const createMutation = useCreateIsolationRecord();
  useIsolationExpiryCheck();

  const [showForm, setShowForm] = useState(!!launch?.startNew);
  const [selectedRecord, setSelectedRecord] = useState<SafeIsolationRecordType | null>(null);
  const [filterStatus, setFilterStatus] = useState<IsoStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const all = records ?? [];
  const activeRecord = selectedRecord
    ? (all.find((r) => r.id === selectedRecord.id) ?? selectedRecord)
    : null;

  const handleCreate = async (data: NewRecordPayload) => {
    const result = await createMutation.mutateAsync(data);
    setShowForm(false);
    setSelectedRecord(result);
  };

  const counts: Record<IsoStatus, number> = {
    in_progress: all.filter((r) => r.status === 'in_progress').length,
    isolated: all.filter((r) => r.status === 'isolated').length,
    re_energised: all.filter((r) => r.status === 're_energised').length,
    cancelled: all.filter((r) => r.status === 'cancelled').length,
  };

  const filtered = all.filter((r) => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (
      searchQuery &&
      !r.circuit_description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.site_address.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Live (isolated/in-progress) first.
  const rank = (r: SafeIsolationRecordType) =>
    r.status === 'isolated' ? 0 : r.status === 'in_progress' ? 1 : 2;
  const sorted = [...filtered].sort((a, b) => {
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const { visible, hasMore, remaining, loadMore } = useShowMore(sorted);
  const liveVisible = visible.filter((r) => rank(r) < 2);
  const doneVisible = visible.filter((r) => rank(r) === 2);

  const renderRow = (record: SafeIsolationRecordType) => {
    const completed = record.steps.filter((s) => s.completed).length;
    const dur = getIsolationDuration(record);
    return (
      <SafetyListRow
        key={record.id}
        onClick={() => setSelectedRecord(record)}
        accent={statusTone(record.status)}
        title={record.circuit_description}
        subtitle={`${record.distribution_board || record.site_address}${record.distribution_board ? ` · ${record.site_address}` : ''}`}
        trailing={
          <div className="flex flex-col items-end gap-1">
            <StatusPill status={record.status} />
            <span
              className={cn(
                'text-[11px] tabular-nums',
                record.status === 'isolated' && dur.isExpired
                  ? 'text-red-400 font-semibold'
                  : record.status === 'isolated' && dur.isExpiring
                    ? 'text-amber-400 font-semibold'
                    : 'text-white'
              )}
            >
              {record.status === 'isolated' && dur.label
                ? dur.isExpired
                  ? 'Past timeout'
                  : dur.isExpiring
                    ? `${Math.max(1, Math.round((ISOLATION_TIMEOUT_HOURS - dur.hoursElapsed) * 60))} min left`
                    : dur.label
                : record.status === 'in_progress'
                  ? `Step ${Math.min(completed + 1, record.steps.length)} of ${record.steps.length}`
                  : `${completed}/${record.steps.length} steps`}
            </span>
          </div>
        }
      />
    );
  };

  // Selected record → GS38 step workflow / summary (full view). After all hooks.
  if (activeRecord) {
    return <StepWorkflow record={activeRecord} onBack={() => setSelectedRecord(null)} />;
  }

  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Safe Isolation"
      hero={
        <SafetyPageHeader
          eyebrow="Safe Isolation · GS38"
          title="Prove dead, lock off, record it"
          description="Record each step as you carry it out: readings, lock-off, sign-off and re-energisation. The app keeps the record; it does not isolate or prove anything for you."
          tone="red"
          actions={<PrimaryButton onClick={() => setShowForm(true)}>New isolation</PrimaryButton>}
        />
      }
      filter={
        all.length > 0 ? (
          <FilterBar
            touch
            tabs={[
              { value: 'all', label: 'All', count: all.length },
              { value: 'in_progress', label: 'In progress', count: counts.in_progress },
              { value: 'isolated', label: 'Isolated', count: counts.isolated },
              { value: 're_energised', label: 'Re-energised', count: counts.re_energised },
            ]}
            activeTab={filterStatus}
            onTabChange={(v) => setFilterStatus(v as IsoStatus | 'all')}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search isolations…"
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : all.length === 0 ? (
        <EmptyState
          touch
          title="No isolation records yet"
          description="Start a GS38 safe isolation — record your steps, prove-dead readings, lock-off and re-energisation. GS38 is HSE guidance on test equipment; the legal duty sits in the Electricity at Work Regulations 1989."
          action="New isolation"
          onAction={() => setShowForm(true)}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          touch
          title="No isolations match your filter"
          description="Try a different status tab or clear your search."
        />
      ) : (
        <div className="space-y-3">
          {liveVisible.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Live now · {liveVisible.length}
              </h2>
              <p className="-mt-1 text-[12px] text-white">
                Isolated or part-way through. Tap to carry on or re-energise.
              </p>
              <SafetyListCard>{liveVisible.map(renderRow)}</SafetyListCard>
            </div>
          )}
          {doneVisible.length > 0 && (
            <div className="space-y-2">
              {liveVisible.length > 0 && (
                <h2 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
                  Finished
                </h2>
              )}
              <SafetyListCard>{doneVisible.map(renderRow)}</SafetyListCard>
            </div>
          )}
          {hasMore && <LoadMoreButton onLoadMore={loadMore} remaining={remaining} />}
        </div>
      )}

      {/* New record sheet */}
      <Sheet open={showForm} onOpenChange={setShowForm}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
        >
          <NewRecordForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
            initialJobId={launch?.jobId ?? null}
            initialEmployerJobId={launch?.employerJobId ?? null}
            initialSiteAddress={launch?.siteAddress ?? ''}
          />
        </SheetContent>
      </Sheet>
    </SafetyModuleShell>
  );
}

export default SafeIsolationRecord;
