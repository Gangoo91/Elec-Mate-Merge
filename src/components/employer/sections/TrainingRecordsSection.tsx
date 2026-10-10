import { openPrintRegister } from '@/utils/printRegister';
import { toast } from '@/hooks/use-toast';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  HeroActions,
  Initials,
  KeyValue,
  PlainEmpty,
  Row,
  Tag,
  colClass,
  filterStack,
  heroBtn,
  frameClass,
  rowBtnSecondary,
  rowsClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Field,
  FormGrid,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  useTrainingRecords,
  useTrainingStats,
  useCreateTrainingRecord,
  useUpdateTrainingStatus,
  useDeleteTrainingRecord,
  type TrainingRecord,
  type TrainingType,
} from '@/hooks/useTrainingRecords';
import { verificationLabel } from '@/services/credentialsService';
import { useEmployees } from '@/hooks/useEmployees';
import { RefreshCw, Loader2, CheckCircle2, Trash2, Plus, Printer } from 'lucide-react';

const trainingTypes: TrainingType[] = [
  'Induction',
  'Safety',
  'CPD',
  'Apprenticeship',
  'Certification',
  'Refresher',
];

function formatDate(value?: string | null) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString('en-GB');
  } catch {
    return value;
  }
}

type LifecycleStatus = 'valid' | 'expiring' | 'expired';

function getLifecycle(record: TrainingRecord): {
  status: LifecycleStatus | 'pending';
  tone: Tone;
  label: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirty = new Date(today);
  thirty.setDate(thirty.getDate() + 30);

  if (record.status === 'Expired') {
    return { status: 'expired', tone: 'red', label: 'Expired' };
  }

  if (record.expiry_date) {
    const expiry = new Date(record.expiry_date);
    if (!Number.isNaN(expiry.getTime())) {
      if (expiry < today) return { status: 'expired', tone: 'red', label: 'Expired' };
      if (expiry <= thirty) return { status: 'expiring', tone: 'orange', label: 'Expiring' };
    }
  }

  if (record.status === 'Completed') {
    return { status: 'valid', tone: 'emerald', label: 'Valid' };
  }
  if (record.status === 'In Progress') {
    return { status: 'pending', tone: 'blue', label: 'In progress' };
  }
  if (record.status === 'Failed') {
    return { status: 'pending', tone: 'red', label: 'Failed' };
  }
  return { status: 'pending', tone: 'amber', label: 'Pending' };
}

export function TrainingRecordsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | LifecycleStatus>('all');
  const [showNewTraining, setShowNewTraining] = useState(false);
  const [activeRecord, setActiveRecord] = useState<TrainingRecord | null>(null);

  const [trainingName, setTrainingName] = useState('');
  const [trainingType, setTrainingType] = useState<TrainingType>('Safety');
  const [provider, setProvider] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const { data: trainingRecords, isLoading, error, refetch } = useTrainingRecords();
  const { data: stats } = useTrainingStats();
  const { data: employees } = useEmployees();
  const createTraining = useCreateTrainingRecord();
  const updateStatus = useUpdateTrainingStatus();
  const deleteTraining = useDeleteTrainingRecord();

  // Count of completed CPD-type records this year. training_records has no
  // hours column, so never present this as "hours".
  const cpdCoursesYtd = useMemo(() => {
    if (!trainingRecords) return 0;
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    return trainingRecords.filter((r) => {
      if (r.training_type !== 'CPD' || r.status !== 'Completed') return false;
      const ref = r.completed_date || r.start_date;
      if (!ref) return false;
      const d = new Date(ref);
      return !Number.isNaN(d.getTime()) && d >= startOfYear;
    }).length;
  }, [trainingRecords]);

  const enriched = useMemo(() => {
    return (trainingRecords ?? []).map((r) => ({ record: r, lifecycle: getLifecycle(r) }));
  }, [trainingRecords]);

  const tabCounts = useMemo(() => {
    const counts = { all: enriched.length, valid: 0, expiring: 0, expired: 0 };
    enriched.forEach((e) => {
      if (e.lifecycle.status === 'valid') counts.valid += 1;
      if (e.lifecycle.status === 'expiring') counts.expiring += 1;
      if (e.lifecycle.status === 'expired') counts.expired += 1;
    });
    return counts;
  }, [enriched]);

  const filteredRecords = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return enriched.filter(({ record, lifecycle }) => {
      if (filter !== 'all' && lifecycle.status !== filter) return false;
      if (!q) return true;
      return (
        record.training_name.toLowerCase().includes(q) ||
        record.employee?.name?.toLowerCase().includes(q) ||
        record.provider?.toLowerCase().includes(q)
      );
    });
  }, [enriched, filter, searchQuery]);

  const handleCreateTraining = async () => {
    if (!trainingName) return;
    // Historical training can be logged truthfully: a completed date creates
    // the record as Completed on that date rather than Pending.
    await createTraining.mutateAsync({
      training_name: trainingName,
      training_type: trainingType,
      provider: provider || undefined,
      employee_id: selectedEmployee || undefined,
      start_date: startDate || undefined,
      completed_date: completedDate || undefined,
      expiry_date: expiryDate || undefined,
      status: completedDate ? 'Completed' : 'Pending',
    });
    setTrainingName('');
    setTrainingType('Safety');
    setProvider('');
    setSelectedEmployee('');
    setStartDate('');
    setCompletedDate('');
    setExpiryDate('');
    setShowNewTraining(false);
  };

  const handleMarkComplete = async (record: TrainingRecord) => {
    await updateStatus.mutateAsync({ id: record.id, status: 'Completed' });
    setActiveRecord(null);
  };

  const handleDelete = async (id: string) => {
    await deleteTraining.mutateAsync(id);
    setActiveRecord(null);
  };

  if (error) {
    return (
      <PageFrame className={frameClass}>
        <PageHero
          title="Training records"
          description="CPD log and certification expiry tracking."
        />
        <div className={panel}>
          <PlainEmpty
            bare
            text="Training records didn't load. Check your connection and try again."
            action={
              <button type="button" onClick={() => refetch()} className={rowBtnSecondary}>
                Retry
              </button>
            }
          />
        </div>
      </PageFrame>
    );
  }

  const totalRecords = stats?.total ?? trainingRecords?.length ?? 0;
  const expiringCount = stats?.expiringsSoon ?? 0;
  const expiredCount = stats?.expired ?? 0;

  // Where training stands, in one line.
  const heroLine = (() => {
    if (isLoading) return 'CPD log and certification expiry tracking.';
    if (totalRecords === 0)
      return 'No training logged yet. Log a course to track CPD and when tickets expire.';
    const bits: string[] = [];
    if (expiringCount > 0) bits.push(`${expiringCount} expiring in the next 30 days`);
    if (expiredCount > 0) bits.push(`${expiredCount} expired`);
    if (bits.length === 0)
      return `Nothing expiring in the next 30 days. ${totalRecords} ${totalRecords === 1 ? 'record' : 'records'} on file.`;
    const s = bits.join(', ');
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}.`;
  })();

  // Expired first, then soonest to expire: what to book next.
  const comingUp = enriched
    .filter((e) => e.lifecycle.status === 'expired' || e.lifecycle.status === 'expiring')
    .sort((a, b) => (a.record.expiry_date ?? '').localeCompare(b.record.expiry_date ?? ''))
    .slice(0, 6);

  const tagFor = (l: ReturnType<typeof getLifecycle>) =>
    l.label === 'Expired' || l.label === 'Failed' ? (
      <Tag tone="red">{l.label}</Tag>
    ) : l.label === 'Expiring' ? (
      <Tag tone="yellow">{l.label}</Tag>
    ) : l.label === 'Valid' ? (
      <Tag tone="done">{l.label}</Tag>
    ) : (
      <Tag tone="outline">{l.label}</Tag>
    );

  const exportMatrix = async () => {
    const ok = await openPrintRegister({
      title: 'Training Matrix',
      subtitle: 'Training, certifications and expiry register',
      columns: ['Team member', 'Training', 'Provider', 'Completed', 'Expires', 'Status'],
      rows: (trainingRecords || []).map((r) => [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r as any).employee?.name || 'Unassigned',
        r.training_name,
        r.provider,
        r.completed_date,
        r.expiry_date,
        r.status,
      ]),
    });
    if (!ok) toast({ title: 'Pop-up blocked', variant: 'destructive' });
  };

  const boxed = 'overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]';

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Training records"
        description={heroLine}
        actions={
          <HeroActions stretchFirst>
            <PrimaryButton onClick={() => setShowNewTraining(true)} className={heroBtn}>
              <Plus className="h-4 w-4 mr-1.5" />
              Log training
            </PrimaryButton>
            <SecondaryButton
              onClick={exportMatrix}
              aria-label="Export matrix"
              className={cn(
                heroBtn,
                'w-11 shrink-0 px-0 sm:w-auto sm:px-5 border-white/[0.18] font-semibold'
              )}
            >
              <Printer className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Export matrix</span>
            </SecondaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh" className="shrink-0">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </HeroActions>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Records', value: totalRecords, sub: 'On file' },
          {
            label: 'Expiring in 30 days',
            value: expiringCount,
            tone: expiringCount > 0 ? 'yellow' : undefined,
            sub: expiringCount > 0 ? 'Book the refresher' : 'Nothing due',
            onClick: expiringCount > 0 ? () => setFilter('expiring') : undefined,
          },
          {
            label: 'Expired',
            value: expiredCount,
            tone: expiredCount > 0 ? 'red' : undefined,
            sub: expiredCount > 0 ? 'Out of date now' : 'None',
            onClick: expiredCount > 0 ? () => setFilter('expired') : undefined,
          },
          { label: 'CPD courses this year', value: cpdCoursesYtd, sub: 'Completed' },
        ]}
      />

      <div className={twoColClass}>
        <div className={colClass}>
          <div className={filterStack}>
            <FilterBar
              tabs={[
                { value: 'all', label: 'All', count: tabCounts.all },
                { value: 'valid', label: 'Valid', count: tabCounts.valid },
                { value: 'expiring', label: 'Expiring', count: tabCounts.expiring },
                { value: 'expired', label: 'Expired', count: tabCounts.expired },
              ]}
              activeTab={filter}
              onTabChange={(v) => setFilter(v as 'all' | LifecycleStatus)}
              search={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search course, person or provider…"
            />
          </div>

          {isLoading ? (
            <LoadingBlocks />
          ) : filteredRecords.length === 0 ? (
            <div className={panel}>
              <PlainEmpty
                bare
                text={
                  searchQuery || filter !== 'all'
                    ? 'Nothing matches. Clear the search or pick another tab.'
                    : 'Courses, tickets and CPD you log show here, with when each one expires.'
                }
                action={
                  searchQuery || filter !== 'all' ? undefined : (
                    <button
                      type="button"
                      onClick={() => setShowNewTraining(true)}
                      className={rowBtnSecondary}
                    >
                      Log training
                    </button>
                  )
                }
              />
            </div>
          ) : (
            <section>
              <PanelTitle title="Training" meta={filteredRecords.length} />
              <div className={cn(panel, rowsClass)}>
                {filteredRecords.map(({ record, lifecycle }) => {
                  const employeeName = record.employee?.name ?? 'General';
                  const completed = record.completed_date
                    ? `completed ${formatDate(record.completed_date)}`
                    : record.start_date
                      ? `started ${formatDate(record.start_date)}`
                      : 'not started';
                  const expires = record.expiry_date
                    ? `expires ${formatDate(record.expiry_date)}`
                    : 'no expiry';
                  return (
                    <Row
                      key={record.id}
                      lead={<Initials name={employeeName} />}
                      title={record.training_name}
                      detail={`${employeeName} · ${completed} · ${expires}`}
                      trailing={tagFor(lifecycle)}
                      onClick={() => setActiveRecord(record)}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <div className={colClass}>
          <section>
            <PanelTitle title="Coming up" meta="Expired and due in 30 days" />
            <div className={cn(panel, comingUp.length > 0 && rowsClass)}>
              {comingUp.length === 0 ? (
                <PlainEmpty bare text="Nothing expires in the next 30 days." />
              ) : (
                comingUp.map(({ record, lifecycle }) => (
                  <Row
                    key={`up-${record.id}`}
                    title={record.training_name}
                    detail={`${record.employee?.name ?? 'General'} · ${formatDate(record.expiry_date)}`}
                    trailing={tagFor(lifecycle)}
                    onClick={() => setActiveRecord(record)}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* New training sheet */}
      <FormSheet
        open={showNewTraining}
        onOpenChange={setShowNewTraining}
        title="Log training"
        description="A course, ticket or CPD for one person or the whole firm. Add a completed date for training already done."
        width="wide"
        bodyClassName="grid gap-6 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
        footer={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => setShowNewTraining(false)} fullWidth size="lg">
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleCreateTraining}
              disabled={!trainingName || createTraining.isPending}
              fullWidth
              size="lg"
            >
              {createTraining.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Log training'
              )}
            </PrimaryButton>
          </div>
        }
      >
        <div className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Course</h3>
          <Field label="Training name" required>
            <Input
              placeholder="e.g. 18th Edition, Working at Heights…"
              value={trainingName}
              onChange={(e) => setTrainingName(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Training type">
            <Select value={trainingType} onValueChange={(v) => setTrainingType(v as TrainingType)}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {trainingTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Provider">
            <Input
              placeholder="Training provider…"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Who and when</h3>
          <Field label="Employee">
            <Select
              value={selectedEmployee || 'all'}
              onValueChange={(v) => setSelectedEmployee(v === 'all' ? '' : v)}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select employee…" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="all">All employees / general</SelectItem>
                {employees?.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <FormGrid cols={2}>
            <Field label="Start date">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Completed date (if already done)">
              <Input
                type="date"
                value={completedDate}
                onChange={(e) => setCompletedDate(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormGrid>
          <Field label="Expiry date">
            <Input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </FormSheet>

      {/* Detail sheet */}
      <FormSheet
        open={!!activeRecord}
        onOpenChange={(open) => !open && setActiveRecord(null)}
        title={activeRecord?.training_name ?? 'Training'}
        description={
          activeRecord
            ? `${activeRecord.training_type ?? 'Training'} · ${activeRecord.employee?.name ?? 'General / all'}`
            : undefined
        }
        headerTrailing={activeRecord ? tagFor(getLifecycle(activeRecord)) : undefined}
        width="wide"
        bodyClassName="grid gap-6 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
        footer={
          activeRecord && activeRecord.recorded_by_firm !== false ? (
            <div className="flex gap-2">
              <DestructiveButton
                onClick={() => handleDelete(activeRecord.id)}
                disabled={deleteTraining.isPending}
                size="lg"
                aria-label="Delete record"
              >
                {deleteTraining.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </DestructiveButton>
              {activeRecord.status !== 'Completed' && (
                <PrimaryButton
                  onClick={() => handleMarkComplete(activeRecord)}
                  disabled={updateStatus.isPending}
                  fullWidth
                  size="lg"
                >
                  {updateStatus.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark complete
                    </>
                  )}
                </PrimaryButton>
              )}
            </div>
          ) : undefined
        }
      >
        {activeRecord && (
          <>
            <div className={boxed}>
              <div className={rowsClass}>
                <KeyValue label="Employee" value={activeRecord.employee?.name ?? 'General / all'} />
                <KeyValue label="Provider" value={activeRecord.provider ?? '—'} />
                <KeyValue label="Start date" value={formatDate(activeRecord.start_date)} />
                <KeyValue label="Completed" value={formatDate(activeRecord.completed_date)} />
                <KeyValue
                  label="Expires"
                  value={formatDate(activeRecord.expiry_date)}
                  tone={getLifecycle(activeRecord).status === 'expired' ? 'red' : undefined}
                />
                {activeRecord.certificate_number && (
                  <KeyValue label="Certificate no." value={activeRecord.certificate_number} />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className={boxed}>
                <div className={rowsClass}>
                  <KeyValue
                    label="Checked"
                    value={verificationLabel(activeRecord.verification_level)}
                  />
                  {activeRecord.notes && (
                    <div className="px-4 py-3 sm:px-5">
                      <div className="text-[14px] text-white">Notes</div>
                      <p className="mt-0.5 whitespace-pre-wrap text-[14px] text-white">
                        {activeRecord.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Training lives on the person's Elec-ID (ELE-1950): the office can
                  change only what it recorded; the rest is the worker's own */}
              {activeRecord.recorded_by_firm === false && (
                <p className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[13px] text-white">
                  Added by {activeRecord.employee?.name ?? 'the worker'} on their own Elec-ID. They
                  keep it up to date; record how you checked it from Elec-ID.
                </p>
              )}
            </div>
          </>
        )}
      </FormSheet>
    </PageFrame>
  );
}
