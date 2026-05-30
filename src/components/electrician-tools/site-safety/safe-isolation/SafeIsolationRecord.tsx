import { useState } from 'react';
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
} from '@/hooks/useSafeIsolationRecords';
import type { SafeIsolationRecord as SafeIsolationRecordType } from '@/hooks/useSafeIsolationRecords';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  SheetShell,
  ListCard,
  ListRow,
  PrimaryButton,
  inputClass,
  type Tone,
} from '@/components/college/primitives';

import { SafetyModuleShell, SafetyMasthead } from '../common/SafetyModuleShell';
import { SignatureField } from '../common/SignatureField';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { PermitSelector } from '../common/PermitSelector';
import { DraftRecoveryBanner } from '../common/DraftRecoveryBanner';
import { DraftSaveIndicator } from '../common/DraftSaveIndicator';
import { LoadMoreButton } from '../common/LoadMoreButton';
import { IsolationStepCard, type StepCompletionData } from './IsolationStepCard';
import { IsolationSummary } from './IsolationSummary';

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
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
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
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

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
}

function NewRecordForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: NewRecordPayload) => void;
  isSubmitting: boolean;
}) {
  const [isolatorName, setIsolatorName] = useState('');
  const [isolatorSig, setIsolatorSig] = useState('');
  const [verifierName, setVerifierName] = useState('');
  const [verifierSig, setVerifierSig] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [selectedPermitId, setSelectedPermitId] = useState<string | null>(null);

  const validation = useFieldValidation({
    site_address: { required: true, message: 'Site address is required' },
    circuit_description: { required: true, message: 'Circuit description is required' },
    distribution_board: {},
    voltage_detector_serial: {},
    voltage_detector_calibration_date: {},
  });

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
      voltage_detector_calibration_date: validation.fields.voltage_detector_calibration_date?.value ?? '',
    },
    enabled: true,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    (['site_address', 'circuit_description', 'distribution_board', 'voltage_detector_serial', 'voltage_detector_calibration_date'] as const).forEach(
      (k) => {
        if (recoveredDraft[k]) validation.setValue(k, recoveredDraft[k]);
      }
    );
    dismissDraft();
  };

  const f = validation.fields;
  const submit = () => {
    if (!validation.validateAll()) return;
    const payload: NewRecordPayload = {
      site_address: f.site_address.value.trim(),
      circuit_description: f.circuit_description.value.trim(),
      ...(f.distribution_board.value.trim() ? { distribution_board: f.distribution_board.value.trim() } : {}),
      ...(f.voltage_detector_serial.value.trim() ? { voltage_detector_serial: f.voltage_detector_serial.value.trim() } : {}),
      ...(f.voltage_detector_calibration_date.value ? { voltage_detector_calibration_date: f.voltage_detector_calibration_date.value } : {}),
      ...(photoUrls.length > 0 ? { photos: photoUrls } : {}),
      ...(isolatorName.trim() ? { isolator_name: isolatorName.trim() } : {}),
      ...(isolatorSig ? { isolator_signature: isolatorSig } : {}),
      ...(verifierName.trim() ? { verifier_name: verifierName.trim() } : {}),
      ...(verifierSig ? { verifier_signature: verifierSig } : {}),
      ...(selectedPermitId ? { permit_id: selectedPermitId } : {}),
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
        <PrimaryButton fullWidth disabled={!validation.isValid || isSubmitting} onClick={submit}>
          {isSubmitting ? 'Creating…' : 'Start GS38 procedure'}
        </PrimaryButton>
      }
    >
      <AnimatePresence>
        {recoveredDraft && <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />}
      </AnimatePresence>

      <PermitSelector
        permitTypes={['electrical-isolation']}
        selectedPermitId={selectedPermitId}
        onSelect={(id, permit) => {
          setSelectedPermitId(id);
          if (permit?.location && !f.site_address?.value) validation.setValue('site_address', permit.location);
        }}
        label="Link to isolation permit (optional)"
      />

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

      <Field label="Circuit description" required>
        <input
          value={f.circuit_description?.value ?? ''}
          onChange={(e) => validation.setValue('circuit_description', e.target.value)}
          onBlur={() => validation.setTouched('circuit_description')}
          className={inputClass}
          placeholder="e.g. Ring final circuit — kitchen"
        />
        {f.circuit_description?.touched && f.circuit_description?.error && (
          <p className="text-[11px] text-red-400 mt-1">{f.circuit_description.error}</p>
        )}
      </Field>

      <Field label="Distribution board">
        <input
          value={f.distribution_board?.value ?? ''}
          onChange={(e) => validation.setValue('distribution_board', e.target.value)}
          className={inputClass}
          placeholder="e.g. DB1 — Main Board"
        />
      </Field>

      <Field label="Voltage detector serial no." hint="GS38 — proving instrument must be in calibration.">
        <input
          value={f.voltage_detector_serial?.value ?? ''}
          onChange={(e) => validation.setValue('voltage_detector_serial', e.target.value)}
          className={inputClass}
          placeholder="e.g. FLK-T150 / SN: 12345"
        />
      </Field>

      <Field label="Voltage detector calibration date">
        <input
          type="date"
          value={f.voltage_detector_calibration_date?.value ?? ''}
          onChange={(e) => validation.setValue('voltage_detector_calibration_date', e.target.value)}
          className={cn(inputClass, '[color-scheme:dark]')}
        />
      </Field>

      <div>
        <Eyebrow className="mb-2">Evidence photos</Eyebrow>
        <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} label="" />
      </div>

      <SignatureField label="Isolator signature" value={isolatorSig} onChange={setIsolatorSig} />
      <Field label="Isolator name">
        <input value={isolatorName} onChange={(e) => setIsolatorName(e.target.value)} className={inputClass} placeholder="Person carrying out isolation" />
      </Field>

      <SignatureField label="Verifier signature" value={verifierSig} onChange={setVerifierSig} />
      <Field label="Verifier name">
        <input value={verifierName} onChange={(e) => setVerifierName(e.target.value)} className={inputClass} placeholder="Second competent person (optional)" />
      </Field>
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
  const allCompleted = record.steps.every((s) => s.completed);

  const handleCompleteStep = async (stepNumber: number, data?: StepCompletionData) => {
    const updatedSteps = record.steps.map((s) =>
      s.stepNumber === stepNumber
        ? {
            ...s,
            completed: true,
            completedAt: new Date().toISOString(),
            ...(data?.voltageReadings ? { voltageReadings: data.voltageReadings } : {}),
            ...(data?.lockOffNumber ? { lockOffNumber: data.lockOffNumber } : {}),
            ...(data?.provingUnitSerial ? { provingUnitSerial: data.provingUnitSerial } : {}),
            ...(data?.instrumentModel ? { instrumentModel: data.instrumentModel } : {}),
            ...(data?.instrumentSerial ? { instrumentSerial: data.instrumentSerial } : {}),
          }
        : s
    );
    const allDone = updatedSteps.every((s) => s.completed);
    const topLevelUpdates: Record<string, unknown> = {};
    if (data?.lockOffNumber) topLevelUpdates.lock_off_number = data.lockOffNumber;
    if (data?.provingUnitSerial) topLevelUpdates.proving_unit_used = true;

    await updateMutation.mutateAsync({
      id: record.id,
      steps: updatedSteps,
      ...topLevelUpdates,
      ...(allDone ? { status: 'isolated' as const, isolation_completed_at: new Date().toISOString() } : {}),
    });
  };

  const activeStepNumber = record.steps.find((s) => !s.completed)?.stepNumber ?? -1;
  const done = record.steps.filter((s) => s.completed).length;

  if (allCompleted || record.status === 'isolated' || record.status === 're_energised') {
    return <IsolationSummary record={record} onBack={onBack} />;
  }

  return (
    <div className="bg-elec-dark min-h-screen pb-24">
      <SafetyMasthead onBack={onBack} backLabel="Records" moduleName={record.circuit_description} />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-5xl px-4 py-5 space-y-4">
        <div>
          <Eyebrow>GS38 procedure · {record.site_address}</Eyebrow>
          <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-elec-yellow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(done / record.steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-2 text-[12px] text-white/55 tabular-nums">
            Step {done} of {record.steps.length} completed
          </p>
        </div>

        <div className="space-y-2.5">
          {record.steps.map((step) => (
            <motion.div key={step.stepNumber} variants={itemVariants}>
              <IsolationStepCard
                step={step}
                stepNumber={step.stepNumber}
                isActive={step.stepNumber === activeStepNumber}
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

export function SafeIsolationRecord({ onBack }: { onBack: () => void }) {
  const { data: records, isLoading } = useSafeIsolationRecords();
  const createMutation = useCreateIsolationRecord();
  useIsolationExpiryCheck();

  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SafeIsolationRecordType | null>(null);
  const [filterStatus, setFilterStatus] = useState<IsoStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const all = records ?? [];
  const activeRecord = selectedRecord ? (all.find((r) => r.id === selectedRecord.id) ?? selectedRecord) : null;

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
  const liveCount = counts.in_progress + counts.isolated;

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

  // Selected record → GS38 step workflow / summary (full view). After all hooks.
  if (activeRecord) {
    return <StepWorkflow record={activeRecord} onBack={() => setSelectedRecord(null)} />;
  }

  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Safe Isolation"
      trailing={liveCount > 0 ? <StatusPill status="isolated" /> : undefined}
      hero={
        <PageHero
          eyebrow="Safe Isolation · GS38"
          title="Prove dead, lock off, record it"
          description="Step-by-step GS38 isolation with voltage readings, lock-off, dual sign-off and re-energisation — a defensible record every time."
          tone="red"
          actions={<PrimaryButton onClick={() => setShowForm(true)}>New isolation</PrimaryButton>}
        />
      }
      stats={
        all.length > 0 ? (
          <StatStrip
            stats={[
              { value: liveCount, label: 'Live', sub: 'isolated / in progress', accent: true, onClick: () => setFilterStatus('isolated') },
              { value: counts.in_progress, label: 'In progress', onClick: () => setFilterStatus('in_progress') },
              { value: counts.re_energised, label: 'Re-energised', onClick: () => setFilterStatus('re_energised') },
              { value: all.length, label: 'Total', onClick: () => setFilterStatus('all') },
            ]}
          />
        ) : undefined
      }
      filter={
        all.length > 0 ? (
          <FilterBar
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
          title="No isolation records yet"
          description="Start a GS38 safe isolation — record your steps, prove-dead readings, lock-off and re-energisation. GS38 is a legal requirement for electrical work."
          action="New isolation"
          onAction={() => setShowForm(true)}
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No isolations match your filter" description="Try a different status tab or clear your search." />
      ) : (
        <div className="space-y-3">
          <ListCard>
            {visible.map((record) => {
              const completed = record.steps.filter((s) => s.completed).length;
              const dur = getIsolationDuration(record);
              return (
                <ListRow
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  accent={statusTone(record.status)}
                  title={record.circuit_description}
                  subtitle={`${record.distribution_board || record.site_address}${record.distribution_board ? ` · ${record.site_address}` : ''}`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <StatusPill status={record.status} />
                      <span className="text-[11px] text-white/45 tabular-nums">
                        {record.status === 'isolated' && dur.label
                          ? dur.label
                          : `${completed}/${record.steps.length} steps`}
                      </span>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
          {hasMore && <LoadMoreButton onLoadMore={loadMore} remaining={remaining} />}
        </div>
      )}

      {/* New record sheet */}
      <Sheet open={showForm} onOpenChange={setShowForm}>
        <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <NewRecordForm onSubmit={handleCreate} isSubmitting={createMutation.isPending} />
        </SheetContent>
      </Sheet>
    </SafetyModuleShell>
  );
}

export default SafeIsolationRecord;
