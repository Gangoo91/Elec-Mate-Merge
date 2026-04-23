import { useState, useMemo } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ErrorState } from '@/components/employer/ErrorState';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  RefreshCw,
  Plus,
  MapPin,
  Calendar,
  Download,
  Copy,
  Sparkles,
} from 'lucide-react';
import {
  useRAMSDocuments,
  useRAMSDocumentStats,
  useCreateRAMSDocument,
  useUpdateRAMSStatus,
  useDeleteRAMSDocument,
  type RAMSDocument,
  type RAMSStatus,
} from '@/hooks/useRAMSDocuments';
import { format, formatDistanceToNow } from 'date-fns';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  FormCard,
  FormGrid,
  Field,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

interface RAMSSectionProps {
  onNavigate?: (section: Section) => void;
}

const STATUS_OPTIONS: { value: RAMSStatus; label: string; tone: Tone }[] = [
  { value: 'draft', label: 'Draft', tone: 'amber' },
  { value: 'submitted', label: 'Submitted', tone: 'orange' },
  { value: 'approved', label: 'Approved', tone: 'emerald' },
  { value: 'rejected', label: 'Rejected', tone: 'red' },
];

const statusToneFor = (status: RAMSStatus): Tone =>
  STATUS_OPTIONS.find((s) => s.value === status)?.tone ?? 'amber';

const statusLabelFor = (status: RAMSStatus): string =>
  STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;

export function RAMSSection({ onNavigate }: RAMSSectionProps) {
  const { data: ramsDocuments = [], isLoading, error, refetch } = useRAMSDocuments();
  const { data: stats } = useRAMSDocumentStats();
  const createRAMS = useCreateRAMSDocument();
  const updateStatus = useUpdateRAMSStatus();
  const deleteRAMS = useDeleteRAMSDocument();

  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [selectedRAMS, setSelectedRAMS] = useState<RAMSDocument | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    project_name: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    assessor: '',
    contractor: '',
    supervisor: '',
    activities: [] as string[],
    risks: [] as {
      id: string;
      hazard: string;
      risk_level: 'low' | 'medium' | 'high';
      control_measures: string[];
      residual_risk: 'low' | 'medium' | 'high';
    }[],
    required_ppe: [] as string[],
    job_scale: '',
  });
  const [activityInput, setActivityInput] = useState('');

  const approvedCount = stats?.approved ?? 0;
  const submittedCount = stats?.submitted ?? 0;
  const totalCount = stats?.total ?? ramsDocuments.length;
  const draftCount = ramsDocuments.filter((d) => d.status === 'draft').length;
  const activeCount = ramsDocuments.filter(
    (d) => d.status === 'approved' || d.status === 'submitted',
  ).length;

  const approved30dCount = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return ramsDocuments.filter(
      (d) => d.status === 'approved' && new Date(d.updated_at).getTime() >= cutoff,
    ).length;
  }, [ramsDocuments]);

  const filteredDocuments = ramsDocuments.filter((doc) => {
    const matchesSearch =
      searchQuery === '' ||
      doc.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.assessor.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;
    if (filterStatus === 'templates') return false;
    if (filterStatus === 'active') {
      return doc.status === 'approved' || doc.status === 'submitted';
    }
    if (filterStatus === 'draft') return doc.status === 'draft';
    if (filterStatus === 'approved') return doc.status === 'approved';
    return doc.status === filterStatus;
  });

  const handleCreateRAMS = async () => {
    await createRAMS.mutateAsync({
      ...formData,
      status: 'draft',
    });
    setShowCreateSheet(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      project_name: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      assessor: '',
      contractor: '',
      supervisor: '',
      activities: [],
      risks: [],
      required_ppe: [],
      job_scale: '',
    });
    setActivityInput('');
  };

  const handleStatusChange = async (id: string, status: RAMSStatus) => {
    await updateStatus.mutateAsync({ id, status });
  };

  const openRAMSDetail = (doc: RAMSDocument) => {
    setSelectedRAMS(doc);
    setShowDetailSheet(true);
  };

  const addActivity = () => {
    if (activityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        activities: [...prev.activities, activityInput.trim()],
      }));
      setActivityInput('');
    }
  };

  const removeActivity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

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
        <ErrorState message="Failed to load RAMS documents" onRetry={refetch} />
      </PageFrame>
    );
  }

  const filterTabs = [
    { value: 'all', label: 'All', count: totalCount },
    { value: 'active', label: 'Active', count: activeCount },
    { value: 'draft', label: 'Draft', count: draftCount },
    { value: 'approved', label: 'Approved', count: approvedCount },
    { value: 'templates', label: 'Templates', count: 0 },
  ];

  const listTitle =
    filterStatus === 'all'
      ? 'All RAMS'
      : filterStatus === 'active'
        ? 'Active RAMS'
        : filterStatus === 'draft'
          ? 'Drafts'
          : filterStatus === 'approved'
            ? 'Approved'
            : filterStatus === 'templates'
              ? 'Templates'
              : 'RAMS';

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="RAMS"
        description="Risk assessments and method statements — write yourself or generate with AI."
        tone="orange"
        actions={
          <>
            <PrimaryButton onClick={() => setShowCreateSheet(true)}>New RAMS</PrimaryButton>
            <SecondaryButton onClick={() => onNavigate?.('airams')}>
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Generate AI
            </SecondaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Active RAMS', value: activeCount, tone: 'orange' },
          { label: 'Awaiting approval', value: submittedCount, tone: 'amber' },
          { label: 'Approved 30d', value: approved30dCount, tone: 'emerald' },
          { label: 'Templates', value: 0, tone: 'blue' },
        ]}
      />

      <FilterBar
        tabs={filterTabs}
        activeTab={filterStatus}
        onTabChange={setFilterStatus}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search RAMS…"
      />

      {filteredDocuments.length === 0 ? (
        <EmptyState
          title={
            filterStatus === 'templates'
              ? 'No templates yet'
              : 'No RAMS documents found'
          }
          description={
            filterStatus === 'templates'
              ? 'Save an existing RAMS as a template to reuse it across jobs.'
              : 'Create your first risk assessment from scratch or generate one with AI.'
          }
          action="Create RAMS"
          onAction={() => setShowCreateSheet(true)}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="orange"
            title="RAMS"
            meta={<Pill tone="orange">{filteredDocuments.length}</Pill>}
          />
          <ListBody>
            {filteredDocuments.map((doc) => {
              const status = doc.status as RAMSStatus;
              const tone = statusToneFor(status);
              const timeAgo = formatDistanceToNow(new Date(doc.updated_at), {
                addSuffix: true,
              });
              return (
                <ListRow
                  key={doc.id}
                  title={doc.project_name}
                  subtitle={`${doc.location} · ${doc.assessor} · ${timeAgo}`}
                  trailing={<Pill tone={tone}>{statusLabelFor(status)}</Pill>}
                  onClick={() => openRAMSDetail(doc)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      <ListCard>
        <ListCardHeader title={listTitle} />
        <ListBody>
          <ListRow
            title="Browse by status"
            subtitle={`${approvedCount} approved · ${submittedCount} awaiting · ${draftCount} draft`}
            trailing={<Pill tone="orange">{totalCount}</Pill>}
          />
        </ListBody>
      </ListCard>

      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Create RAMS document</SheetTitle>
            <SheetDescription className="text-white">
              Create a new risk assessment and method statement.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <FormCard eyebrow="Project">
              <Field label="Project name" required>
                <Input
                  value={formData.project_name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, project_name: e.target.value }))
                  }
                  placeholder="e.g. Office Rewire — ABC Corp"
                  className={inputClass}
                />
              </Field>

              <FormGrid cols={2}>
                <Field label="Location" required>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, location: e.target.value }))
                      }
                      placeholder="Site address"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
                <Field label="Assessment date">
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="People">
              <FormGrid cols={2}>
                <Field label="Assessor" required>
                  <Input
                    value={formData.assessor}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, assessor: e.target.value }))
                    }
                    placeholder="Your name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Job scale">
                  <Select
                    value={formData.job_scale}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, job_scale: v }))
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select scale" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="small">Small (1-2 days)</SelectItem>
                      <SelectItem value="medium">Medium (3-5 days)</SelectItem>
                      <SelectItem value="large">Large (1-2 weeks)</SelectItem>
                      <SelectItem value="major">Major (2+ weeks)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>

              <FormGrid cols={2}>
                <Field label="Contractor (optional)">
                  <Input
                    value={formData.contractor}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, contractor: e.target.value }))
                    }
                    placeholder="Main contractor"
                    className={inputClass}
                  />
                </Field>
                <Field label="Supervisor (optional)">
                  <Input
                    value={formData.supervisor}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, supervisor: e.target.value }))
                    }
                    placeholder="Site supervisor"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>

            <FormCard eyebrow="Activities">
              <Field label="Work activities">
                <div className="flex gap-2">
                  <Input
                    value={activityInput}
                    onChange={(e) => setActivityInput(e.target.value)}
                    placeholder="Add activity"
                    className={inputClass}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addActivity())
                    }
                  />
                  <SecondaryButton onClick={addActivity}>
                    <Plus className="h-4 w-4" />
                  </SecondaryButton>
                </div>
              </Field>
              {formData.activities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.activities.map((activity, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => removeActivity(index)}
                      className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.1] bg-white/[0.06] text-white touch-manipulation hover:bg-white/[0.1] transition-colors"
                    >
                      {activity} <span className="ml-1.5 text-white">×</span>
                    </button>
                  ))}
                </div>
              )}
            </FormCard>

            <div className="flex gap-3 pt-2">
              <SecondaryButton
                fullWidth
                onClick={() => {
                  setShowCreateSheet(false);
                  resetForm();
                }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleCreateRAMS}
                disabled={
                  !formData.project_name ||
                  !formData.location ||
                  !formData.assessor ||
                  createRAMS.isPending
                }
              >
                {createRAMS.isPending ? 'Creating…' : 'Create RAMS'}
              </PrimaryButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selectedRAMS && (
            <>
              <SheetHeader>
                <SheetTitle className="text-white">{selectedRAMS.project_name}</SheetTitle>
                <SheetDescription className="text-white">
                  Version {selectedRAMS.version} · {selectedRAMS.assessor}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                <StatStrip
                  columns={3}
                  stats={[
                    {
                      label: 'Status',
                      value: statusLabelFor(selectedRAMS.status as RAMSStatus),
                      tone: statusToneFor(selectedRAMS.status as RAMSStatus),
                    },
                    {
                      label: 'Hazards',
                      value: selectedRAMS.risks?.length ?? 0,
                      tone: 'orange',
                    },
                    {
                      label: 'Activities',
                      value: selectedRAMS.activities?.length ?? 0,
                      tone: 'blue',
                    },
                  ]}
                />

                <ListCard>
                  <ListCardHeader tone="orange" title="Project details" />
                  <ListBody>
                    <ListRow
                      lead={<MapPin className="h-4 w-4 text-white" />}
                      title="Location"
                      subtitle={selectedRAMS.location}
                    />
                    <ListRow
                      lead={<Calendar className="h-4 w-4 text-white" />}
                      title="Assessment date"
                      subtitle={format(new Date(selectedRAMS.date), 'dd MMM yyyy')}
                    />
                    {selectedRAMS.contractor && (
                      <ListRow
                        title="Contractor"
                        subtitle={selectedRAMS.contractor}
                      />
                    )}
                    {selectedRAMS.supervisor && (
                      <ListRow
                        title="Supervisor"
                        subtitle={selectedRAMS.supervisor}
                      />
                    )}
                    {selectedRAMS.job_scale && (
                      <ListRow
                        title="Job scale"
                        subtitle={selectedRAMS.job_scale}
                        trailing={<Pill tone="amber">{selectedRAMS.job_scale}</Pill>}
                      />
                    )}
                  </ListBody>
                </ListCard>

                {selectedRAMS.activities && selectedRAMS.activities.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="blue"
                      title="Work activities"
                      meta={<Pill tone="blue">{selectedRAMS.activities.length}</Pill>}
                    />
                    <ListBody>
                      {selectedRAMS.activities.map((activity, index) => (
                        <ListRow key={index} title={activity} />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {selectedRAMS.risks && selectedRAMS.risks.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="orange"
                      title="Risk assessment"
                      meta={<Pill tone="orange">{selectedRAMS.risks.length}</Pill>}
                    />
                    <ListBody>
                      {selectedRAMS.risks.slice(0, 5).map((risk, index) => {
                        const riskTone: Tone =
                          risk.risk_level === 'high'
                            ? 'red'
                            : risk.risk_level === 'medium'
                              ? 'amber'
                              : 'emerald';
                        return (
                          <ListRow
                            key={index}
                            title={risk.hazard}
                            subtitle={
                              risk.control_measures?.length
                                ? `${risk.control_measures.length} control measure${risk.control_measures.length === 1 ? '' : 's'}`
                                : undefined
                            }
                            trailing={<Pill tone={riskTone}>{risk.risk_level}</Pill>}
                          />
                        );
                      })}
                      {selectedRAMS.risks.length > 5 && (
                        <ListRow
                          title={`+ ${selectedRAMS.risks.length - 5} more hazards`}
                        />
                      )}
                    </ListBody>
                  </ListCard>
                )}

                {selectedRAMS.required_ppe && selectedRAMS.required_ppe.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="emerald"
                      title="Required PPE"
                      meta={<Pill tone="emerald">{selectedRAMS.required_ppe.length}</Pill>}
                    />
                    <ListBody>
                      {selectedRAMS.required_ppe.map((ppe, index) => (
                        <ListRow key={index} title={ppe} />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                <ListCard>
                  <ListCardHeader title="Update status" />
                  <div className="px-5 sm:px-6 py-4 flex flex-wrap gap-2">
                    {STATUS_OPTIONS.filter(
                      (s) => s.value !== selectedRAMS.status,
                    ).map((option) => (
                      <SecondaryButton
                        key={option.value}
                        onClick={() =>
                          handleStatusChange(selectedRAMS.id, option.value)
                        }
                        disabled={updateStatus.isPending}
                      >
                        Mark {option.label}
                      </SecondaryButton>
                    ))}
                  </div>
                </ListCard>

                <div className="flex gap-2 pt-2">
                  {selectedRAMS.pdf_url && (
                    <a
                      href={selectedRAMS.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                  )}
                  <SecondaryButton
                    fullWidth
                    onClick={async () => {
                      await copyToClipboard(window.location.href);
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy link
                  </SecondaryButton>
                  <DestructiveButton
                    onClick={async () => {
                      if (
                        confirm(
                          `Delete RAMS "${selectedRAMS.project_name}"? This cannot be undone.`,
                        )
                      ) {
                        await deleteRAMS.mutateAsync(selectedRAMS.id);
                        setShowDetailSheet(false);
                      }
                    }}
                    disabled={deleteRAMS.isPending}
                  >
                    Delete
                  </DestructiveButton>
                </div>

                <PrimaryButton fullWidth onClick={() => setShowDetailSheet(false)}>
                  Close
                </PrimaryButton>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
}
