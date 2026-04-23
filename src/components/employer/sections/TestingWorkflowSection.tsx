import { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  RefreshCw,
  CheckCircle,
  Loader2,
  Plus,
  Trash2,
  XCircle,
  ClipboardCheck,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import {
  useJobTests,
  useJobTestStats,
  useCreateJobTest,
  useRecordTestResult,
  useVerifyJobTest,
  useDeleteJobTest,
  type JobTest,
  type CreateJobTestInput,
  type TestType,
  type TestResult,
  TEST_TYPE_CONFIG,
} from '@/hooks/useJobTests';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';

import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { SwipeableRow } from '@/components/ui/swipeable-row';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  IconButton,
  EmptyState,
  LoadingBlocks,
  GroupHeader,
  Divider,
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  SheetShell,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';

const resultTone: Record<TestResult, Tone> = {
  Pending: 'amber',
  Pass: 'emerald',
  Fail: 'red',
  'N/A': 'blue',
  Limited: 'orange',
};

function getInitials(name?: string | null) {
  if (!name) return 'JT';
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function TestingWorkflowSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<TestResult | 'all'>('all');
  const [selectedTest, setSelectedTest] = useState<JobTest | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showRecordSheet, setShowRecordSheet] = useState(false);
  const [recordTestId, setRecordTestId] = useState<string | null>(null);
  const [recordReading, setRecordReading] = useState('');
  const [recordResult, setRecordResult] = useState<TestResult>('Pass');
  const [recordNotes, setRecordNotes] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [openJobs, setOpenJobs] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<Partial<CreateJobTestInput>>({
    job_id: '',
    test_type: 'Continuity',
    circuit_ref: '',
    circuit_description: '',
    result: 'Pending',
    photos: [],
  });

  const { data: tests = [], isLoading, error, refetch } = useJobTests();
  const { data: stats } = useJobTestStats();
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();
  const createJobTest = useCreateJobTest();
  const recordTestResult = useRecordTestResult();
  const verifyJobTest = useVerifyJobTest();
  const deleteJobTest = useDeleteJobTest();

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: 'Tests refreshed' });
  }, [refetch]);

  const handleRecord = (testId: string) => {
    const test = tests.find((t) => t.id === testId);
    if (test) {
      setRecordTestId(testId);
      setRecordReading(test.reading || '');
      setRecordResult('Pass');
      setRecordNotes(test.notes || '');
      setShowRecordSheet(true);
    }
  };

  const handleConfirmRecord = async () => {
    if (recordTestId) {
      await recordTestResult.mutateAsync({
        id: recordTestId,
        result: recordResult,
        reading: recordReading,
        notes: recordNotes,
      });
      setShowRecordSheet(false);
      setRecordTestId(null);
      setRecordReading('');
      setRecordNotes('');
    }
  };

  const handleVerify = async (testId: string) => {
    await verifyJobTest.mutateAsync(testId);
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.test_type) {
      toast({
        title: 'Error',
        description: 'Please fill in required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createJobTest.mutateAsync(formData as CreateJobTestInput);
      setShowCreateSheet(false);
      resetForm();
    } catch (error) {
      // handled by hook
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteJobTest.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      job_id: '',
      test_type: 'Continuity',
      circuit_ref: '',
      circuit_description: '',
      result: 'Pending',
      photos: [],
    });
  };

  const filteredTests = useMemo(
    () =>
      tests.filter((test) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          test.circuit_ref?.toLowerCase().includes(q) ||
          test.circuit_description?.toLowerCase().includes(q) ||
          test.job?.title?.toLowerCase().includes(q) ||
          test.test_type.toLowerCase().includes(q);
        const matchesResult = resultFilter === 'all' ? true : test.result === resultFilter;
        return matchesSearch && matchesResult;
      }),
    [tests, searchQuery, resultFilter]
  );

  const testsByJob = useMemo(
    () =>
      filteredTests.reduce(
        (acc, test) => {
          const jobId = test.job_id;
          if (!acc[jobId]) {
            acc[jobId] = { job: test.job, tests: [] };
          }
          acc[jobId].tests.push(test);
          return acc;
        },
        {} as Record<string, { job: JobTest['job']; tests: JobTest[] }>
      ),
    [filteredTests]
  );

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Testing Workflow"
          description="Drive EICR and EIC test sequences job-by-job."
          tone="orange"
        />
        <EmptyState
          title="Failed to load tests"
          description={error.message}
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const passCount = stats?.pass || 0;
  const failCount = stats?.fail || 0;
  const pendingCount = stats?.pending || 0;
  const passRate = stats?.passRate || 0;

  const content = (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Testing Workflow"
        description="Drive EICR and EIC test sequences job-by-job."
        tone="orange"
        actions={
          <div className="flex items-center gap-2">
            <IconButton onClick={handleRefresh} aria-label="Refresh tests">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
            <PrimaryButton onClick={() => setShowCreateSheet(true)}>
              <Plus className="h-4 w-4 mr-1.5" />
              New test
            </PrimaryButton>
          </div>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Pending',
            value: pendingCount,
            tone: 'orange',
            onClick: () => setResultFilter(resultFilter === 'Pending' ? 'all' : 'Pending'),
          },
          {
            label: 'In progress',
            value: failCount,
            tone: 'blue',
            sub: 'Failed — needs rework',
            onClick: () => setResultFilter(resultFilter === 'Fail' ? 'all' : 'Fail'),
          },
          {
            label: 'Awaiting sign-off',
            value: passCount,
            tone: 'amber',
            sub: 'Verify to close',
            onClick: () => setResultFilter(resultFilter === 'Pass' ? 'all' : 'Pass'),
          },
          {
            label: 'Pass rate 30d',
            value: `${passRate}%`,
            tone: 'emerald',
            accent: true,
          },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'all', label: 'All', count: tests.length },
          { value: 'Pending', label: 'Pending', count: pendingCount },
          { value: 'Pass', label: 'Passed', count: passCount },
          { value: 'Fail', label: 'Failed', count: failCount },
        ]}
        activeTab={resultFilter}
        onTabChange={(v) => setResultFilter(v as TestResult | 'all')}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search circuits, jobs, types…"
      />

      {filteredTests.length === 0 ? (
        <EmptyState
          title="No test results yet"
          description={
            resultFilter === 'all'
              ? 'Start recording electrical test results for your live jobs.'
              : `No ${String(resultFilter).toLowerCase()} tests right now.`
          }
          action="Record first test"
          onAction={() => setShowCreateSheet(true)}
        />
      ) : (
        <div className="space-y-6">
          {Object.entries(testsByJob).map(([jobId, { job, tests: jobTests }]) => {
            const jobPass = jobTests.filter((t) => t.result === 'Pass').length;
            const jobFail = jobTests.filter((t) => t.result === 'Fail').length;
            const jobPending = jobTests.filter((t) => t.result === 'Pending').length;
            const isOpen = openJobs[jobId] !== false;

            return (
              <ListCard key={jobId}>
                <ListCardHeader
                  tone="orange"
                  title={
                    <span className="flex items-center gap-2">
                      <span className="truncate">{job?.title || 'Unknown job'}</span>
                      {job?.client && (
                        <span className="text-white font-normal text-[12px] truncate">
                          · {job.client}
                        </span>
                      )}
                    </span>
                  }
                  meta={
                    <div className="flex items-center gap-1.5">
                      {jobPending > 0 && <Pill tone="amber">{jobPending} pending</Pill>}
                      <Pill tone="emerald">{jobPass} pass</Pill>
                      {jobFail > 0 && <Pill tone="red">{jobFail} fail</Pill>}
                    </div>
                  }
                />
                <GroupHeader
                  tone="orange"
                  label="Test sequence"
                  count={jobTests.length}
                  open={isOpen}
                  onClick={() => setOpenJobs((s) => ({ ...s, [jobId]: !isOpen }))}
                />
                {isOpen && (
                  <ListBody>
                    {jobTests.map((test) => {
                      const config = TEST_TYPE_CONFIG[test.test_type];
                      const inspectorName = test.tester?.name || 'Unassigned';
                      const subtitleParts = [
                        inspectorName,
                        test.circuit_ref ? `Circuit ${test.circuit_ref}` : null,
                        test.reading ? `${test.reading}${config?.unit ?? ''}` : null,
                        test.test_date ? format(new Date(test.test_date), 'dd MMM') : null,
                      ].filter(Boolean) as string[];

                      const row = (
                        <ListRow
                          key={test.id}
                          accent={resultTone[test.result]}
                          lead={<Avatar initials={getInitials(inspectorName)} />}
                          title={
                            <span className="flex items-center gap-2 flex-wrap">
                              <span className="truncate">
                                {test.test_type} — {test.circuit_description || 'Untitled circuit'}
                              </span>
                              {test.verified_at && (
                                <Pill tone="emerald" className="shrink-0">
                                  Verified
                                </Pill>
                              )}
                            </span>
                          }
                          subtitle={subtitleParts.join(' · ')}
                          trailing={
                            <div className="flex items-center gap-2">
                              <Pill tone={resultTone[test.result]}>{test.result}</Pill>
                              {test.result === 'Pending' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRecord(test.id);
                                  }}
                                  className="hidden sm:inline-flex h-8 px-3 rounded-full bg-elec-yellow text-black text-[11.5px] font-semibold items-center touch-manipulation hover:bg-elec-yellow/90 transition-colors"
                                >
                                  Record
                                </button>
                              )}
                            </div>
                          }
                          onClick={() => setSelectedTest(test)}
                        />
                      );

                      if (isMobile && test.result === 'Pending') {
                        return (
                          <SwipeableRow
                            key={test.id}
                            rightAction={{
                              icon: <CheckCircle className="h-6 w-6" />,
                              label: 'Pass',
                              onClick: () =>
                                recordTestResult.mutate({ id: test.id, result: 'Pass' }),
                              variant: 'success',
                            }}
                            leftAction={{
                              icon: <XCircle className="h-6 w-6" />,
                              label: 'Fail',
                              onClick: () =>
                                recordTestResult.mutate({ id: test.id, result: 'Fail' }),
                              variant: 'destructive',
                            }}
                          >
                            {row}
                          </SwipeableRow>
                        );
                      }
                      return row;
                    })}
                  </ListBody>
                )}
              </ListCard>
            );
          })}
        </div>
      )}

      {/* Create Test Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
        >
          <SheetShell
            eyebrow="Operations"
            title="New test record"
            description="Capture a fresh electrical test for a live job."
            footer={
              <PrimaryButton onClick={handleCreate} disabled={createJobTest.isPending} fullWidth size="lg">
                {createJobTest.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                Create test record
              </PrimaryButton>
            }
          >
            <FormCard eyebrow="Context">
              <Field label="Job" required>
                <Select
                  value={formData.job_id}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, job_id: v }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} — {job.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Test type" required>
                <Select
                  value={formData.test_type}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, test_type: v as TestType }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {Object.keys(TEST_TYPE_CONFIG).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>

            <FormCard eyebrow="Circuit">
              <FormGrid cols={2}>
                <Field label="Circuit ref">
                  <Input
                    value={formData.circuit_ref || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, circuit_ref: e.target.value }))
                    }
                    placeholder="C1, DB1-1"
                    className={inputClass}
                  />
                </Field>
                <Field label="Test date">
                  <Input
                    type="date"
                    value={formData.test_date || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, test_date: e.target.value }))
                    }
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              <Field label="Circuit description">
                <Input
                  value={formData.circuit_description || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, circuit_description: e.target.value }))
                  }
                  placeholder="Kitchen ring, Lighting circuit"
                  className={inputClass}
                />
              </Field>

              <Field label="Tested by">
                <Select
                  value={formData.tested_by || ''}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, tested_by: v || undefined }))
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select inspector" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>

            <FormCard eyebrow="Instrument">
              <FormGrid cols={2}>
                <Field label="Instrument used">
                  <Input
                    value={formData.instrument_used || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, instrument_used: e.target.value }))
                    }
                    placeholder="Megger MFT1741"
                    className={inputClass}
                  />
                </Field>
                <Field label="Serial number">
                  <Input
                    value={formData.instrument_serial || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, instrument_serial: e.target.value }))
                    }
                    placeholder="Serial #"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Notes">
              <Field label="Notes">
                <Textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes…"
                  className={`${textareaClass} min-h-[120px]`}
                />
              </Field>
            </FormCard>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* Record Result Sheet */}
      <Sheet open={showRecordSheet} onOpenChange={setShowRecordSheet}>
        <SheetContent
          side="bottom"
          className="h-[60vh] p-0 rounded-t-2xl overflow-hidden"
        >
          <SheetShell
            eyebrow="Operations"
            title="Record test result"
            description="Log the outcome of this test."
            footer={
              <PrimaryButton
                onClick={handleConfirmRecord}
                disabled={recordTestResult.isPending}
                fullWidth
                size="lg"
              >
                {recordTestResult.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-2" />
                )}
                Record as {recordResult}
              </PrimaryButton>
            }
          >
            <FormCard eyebrow="Result">
              <Field label="Result" required>
                <div className="grid grid-cols-2 gap-2">
                  {(['Pass', 'Fail', 'N/A', 'Limited'] as TestResult[]).map((result) => {
                    const active = recordResult === result;
                    return (
                      <button
                        key={result}
                        onClick={() => setRecordResult(result)}
                        className={cn(
                          'h-12 rounded-xl text-[13px] font-semibold border touch-manipulation transition-colors flex items-center justify-center gap-2',
                          active
                            ? 'bg-elec-yellow text-black border-elec-yellow'
                            : 'bg-[hsl(0_0%_9%)] border-white/[0.08] text-white hover:bg-white/[0.08]'
                        )}
                      >
                        {result === 'Pass' && <CheckCircle className="h-4 w-4" />}
                        {result === 'Fail' && <XCircle className="h-4 w-4" />}
                        {result}
                      </button>
                    );
                  })}
                </div>
              </Field>
            </FormCard>

            <FormCard eyebrow="Reading & notes">
              <Field label="Reading">
                <Input
                  value={recordReading}
                  onChange={(e) => setRecordReading(e.target.value)}
                  placeholder="Enter test reading…"
                  className={inputClass}
                />
              </Field>

              <Field label="Notes">
                <Textarea
                  value={recordNotes}
                  onChange={(e) => setRecordNotes(e.target.value)}
                  placeholder="Observations…"
                  className={`${textareaClass} min-h-[120px]`}
                />
              </Field>
            </FormCard>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* View Test Details Sheet */}
      <Sheet open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
        >
          {selectedTest && (
            <SheetShell
              eyebrow="Operations"
              title={
                <span className="flex items-center justify-between gap-3">
                  <span className="truncate">{selectedTest.test_type}</span>
                  <Pill tone={resultTone[selectedTest.result]}>{selectedTest.result}</Pill>
                </span>
              }
              description={selectedTest.circuit_description || undefined}
              footer={
                <div className="flex flex-col gap-2 w-full">
                  {selectedTest.result === 'Pending' && (
                    <PrimaryButton
                      onClick={() => {
                        const id = selectedTest.id;
                        setSelectedTest(null);
                        handleRecord(id);
                      }}
                      fullWidth
                      size="lg"
                    >
                      <ClipboardCheck className="h-5 w-5 mr-2" />
                      Record result
                    </PrimaryButton>
                  )}
                  {selectedTest.result !== 'Pending' && !selectedTest.verified_at && (
                    <PrimaryButton
                      onClick={() => handleVerify(selectedTest.id)}
                      disabled={verifyJobTest.isPending}
                      fullWidth
                      size="lg"
                    >
                      {verifyJobTest.isPending ? (
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <Award className="h-5 w-5 mr-2" />
                      )}
                      Verify result
                    </PrimaryButton>
                  )}
                  <DestructiveButton
                    onClick={() => {
                      setDeleteConfirmId(selectedTest.id);
                      setSelectedTest(null);
                    }}
                    fullWidth
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Delete test
                  </DestructiveButton>
                </div>
              }
            >
              <ListCard>
                <ListCardHeader
                  tone="orange"
                  title="Job"
                  meta={
                    selectedTest.job?.client ? (
                      <Pill tone="blue">{selectedTest.job.client}</Pill>
                    ) : undefined
                  }
                />
                <ListBody>
                  <ListRow
                    lead={<Avatar initials={getInitials(selectedTest.job?.title)} />}
                    title={selectedTest.job?.title || 'Unknown job'}
                    subtitle={selectedTest.job?.client}
                  />
                </ListBody>
              </ListCard>

              <StatStrip
                columns={2}
                stats={[
                  {
                    label: 'Reading',
                    value: selectedTest.reading
                      ? `${selectedTest.reading}${TEST_TYPE_CONFIG[selectedTest.test_type]?.unit ?? ''}`
                      : '—',
                  },
                  {
                    label: 'Circuit ref',
                    value: selectedTest.circuit_ref || '—',
                  },
                  {
                    label: 'Test date',
                    value: selectedTest.test_date
                      ? format(new Date(selectedTest.test_date), 'dd MMM yy')
                      : '—',
                  },
                  {
                    label: 'Inspector',
                    value: selectedTest.tester?.name || '—',
                  },
                ]}
              />

              {(selectedTest.instrument_used || selectedTest.instrument_serial) && (
                <ListCard>
                  <ListCardHeader tone="orange" title="Instrument" />
                  <ListBody>
                    {selectedTest.instrument_used && (
                      <ListRow
                        title="Instrument used"
                        subtitle={selectedTest.instrument_used}
                      />
                    )}
                    {selectedTest.instrument_serial && (
                      <ListRow
                        title="Serial number"
                        subtitle={selectedTest.instrument_serial}
                      />
                    )}
                  </ListBody>
                </ListCard>
              )}

              {selectedTest.notes && (
                <div>
                  <Divider label="Notes" />
                  <p className="mt-3 text-[13px] text-white leading-relaxed bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
                    {selectedTest.notes}
                  </p>
                </div>
              )}

              {selectedTest.verified_at && (
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3">
                  <Award className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-white">Verified</div>
                    <div className="text-[11.5px] text-white">
                      {format(new Date(selectedTest.verified_at), "dd MMM yyyy 'at' HH:mm")}
                    </div>
                  </div>
                </div>
              )}
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_12%)] border border-white/[0.06]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete test record?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This action cannot be undone. This will permanently delete the test record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <SecondaryButton>Cancel</SecondaryButton>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <DestructiveButton onClick={handleDelete}>
                {deleteJobTest.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Delete
              </DestructiveButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
