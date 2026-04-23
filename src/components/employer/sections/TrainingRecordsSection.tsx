import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  fieldLabelClass,
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
import { useEmployees } from '@/hooks/useEmployees';
import { RefreshCw, Loader2, CheckCircle2, Trash2 } from 'lucide-react';

const trainingTypes: TrainingType[] = [
  'Induction',
  'Safety',
  'CPD',
  'Apprenticeship',
  'Certification',
  'Refresher',
];

function getInitials(name?: string | null) {
  if (!name) return 'GN';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase() || 'GN';
}

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
      if (expiry <= thirty)
        return { status: 'expiring', tone: 'orange', label: 'Expiring' };
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
  const [expiryDate, setExpiryDate] = useState('');

  const { data: trainingRecords, isLoading, error, refetch } = useTrainingRecords();
  const { data: stats } = useTrainingStats();
  const { data: employees } = useEmployees();
  const createTraining = useCreateTrainingRecord();
  const updateStatus = useUpdateTrainingStatus();
  const deleteTraining = useDeleteTrainingRecord();

  const cpdHoursYtd = useMemo(() => {
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
    await createTraining.mutateAsync({
      training_name: trainingName,
      training_type: trainingType,
      provider: provider || undefined,
      employee_id: selectedEmployee || undefined,
      start_date: startDate || undefined,
      expiry_date: expiryDate || undefined,
      status: 'Pending',
    });
    setTrainingName('');
    setTrainingType('Safety');
    setProvider('');
    setSelectedEmployee('');
    setStartDate('');
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
      <PageFrame>
        <EmptyState
          title="Couldn't load training records"
          description="There was a problem fetching your training matrix. Try again in a moment."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const totalRecords = stats?.total ?? trainingRecords?.length ?? 0;

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Training Records"
        description="CPD log and certification expiry tracking."
        tone="emerald"
        actions={
          <>
            <PrimaryButton onClick={() => setShowNewTraining(true)}>Log training</PrimaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Records', value: totalRecords, tone: 'emerald' },
          { label: 'Expiring 30d', value: stats?.expiringsSoon ?? 0, tone: 'orange' },
          { label: 'Expired', value: stats?.expired ?? 0, tone: 'red' },
          { label: 'CPD hours YTD', value: cpdHoursYtd, accent: true },
        ]}
      />

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
        searchPlaceholder="Search course, employee or provider…"
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : filteredRecords.length === 0 ? (
        <EmptyState
          title="No training records"
          description={
            searchQuery || filter !== 'all'
              ? 'No records match the current filter. Try clearing search or switching tabs.'
              : 'Log your first training entry to start tracking CPD and certification expiry.'
          }
          action="Log training"
          onAction={() => setShowNewTraining(true)}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="emerald"
            title="Training"
            meta={<Pill tone="emerald">{filteredRecords.length}</Pill>}
          />
          <ListBody>
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
                <ListRow
                  key={record.id}
                  lead={<Avatar initials={getInitials(employeeName)} />}
                  title={record.training_name}
                  subtitle={`${employeeName} · ${completed} · ${expires}`}
                  trailing={<Pill tone={lifecycle.tone}>{lifecycle.label}</Pill>}
                  onClick={() => setActiveRecord(record)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      {/* New training sheet */}
      <Sheet open={showNewTraining} onOpenChange={setShowNewTraining}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
              <SheetTitle className="text-white text-[15px] font-semibold">
                Log training
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
              <FormCard eyebrow="Course">
                <Field label="Training name" required>
                  <Input
                    placeholder="e.g. 18th Edition, Working at Heights…"
                    value={trainingName}
                    onChange={(e) => setTrainingName(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Training type">
                  <Select
                    value={trainingType}
                    onValueChange={(v) => setTrainingType(v as TrainingType)}
                  >
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
              </FormCard>

              <FormCard eyebrow="Assignee & dates">
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
                  <Field label="Expiry date">
                    <Input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </FormGrid>
              </FormCard>
            </div>

            <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3">
              <SecondaryButton onClick={() => setShowNewTraining(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleCreateTraining}
                disabled={!trainingName || createTraining.isPending}
                fullWidth
              >
                {createTraining.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Log training'
                )}
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Detail sheet */}
      <Sheet open={!!activeRecord} onOpenChange={(open) => !open && setActiveRecord(null)}>
        <SheetContent
          side="bottom"
          className="h-[80vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {activeRecord && (
            <div className="flex flex-col h-full">
              <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
                <SheetTitle className="text-white text-[15px] font-semibold">
                  {activeRecord.training_name}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
                <StatStrip
                  columns={2}
                  stats={[
                    {
                      label: 'Status',
                      value: getLifecycle(activeRecord).label,
                      tone: getLifecycle(activeRecord).tone,
                    },
                    {
                      label: 'Type',
                      value: activeRecord.training_type ?? '—',
                      accent: true,
                    },
                  ]}
                />

                <ListCard>
                  <ListCardHeader tone="emerald" title="Details" />
                  <ListBody>
                    <ListRow
                      title="Employee"
                      subtitle={activeRecord.employee?.name ?? 'General / all'}
                    />
                    <ListRow
                      title="Provider"
                      subtitle={activeRecord.provider ?? '—'}
                    />
                    <ListRow
                      title="Start date"
                      subtitle={formatDate(activeRecord.start_date)}
                    />
                    <ListRow
                      title="Completed"
                      subtitle={formatDate(activeRecord.completed_date)}
                    />
                    <ListRow
                      title="Expires"
                      subtitle={formatDate(activeRecord.expiry_date)}
                    />
                    {activeRecord.certificate_number && (
                      <ListRow
                        title="Certificate no."
                        subtitle={activeRecord.certificate_number}
                      />
                    )}
                    {activeRecord.notes && (
                      <ListRow title="Notes" subtitle={activeRecord.notes} />
                    )}
                  </ListBody>
                </ListCard>
              </div>

              <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3">
                <DestructiveButton
                  onClick={() => handleDelete(activeRecord.id)}
                  disabled={deleteTraining.isPending}
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
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
}
