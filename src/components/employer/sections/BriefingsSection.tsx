import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToolboxTalkLibrary } from '@/components/employer/ToolboxTalkLibrary';
import { BriefingEditor } from '@/components/employer/BriefingEditor';
import { DigitalSignOff } from '@/components/employer/DigitalSignOff';
import { BriefingViewer } from '@/components/employer/BriefingViewer';
import { downloadBriefingPDF } from '@/utils/briefing-pdf';
import {
  useBriefings,
  useBriefingStats,
  useCreateBriefing,
  useCreateBriefingFromTemplate,
  useCompleteBriefing,
  useDeleteBriefing,
  type Briefing,
  type BriefingType,
} from '@/hooks/useBriefings';
import { useBriefingAttendees } from '@/hooks/useBriefingSignatures';
import { type ToolboxTalkTemplate } from '@/hooks/useToolboxTalkTemplates';
import { useEmployees } from '@/hooks/useEmployees';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useToast } from '@/hooks/use-toast';
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
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  Eyebrow,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';
import { RefreshCw, BookOpen, Loader2 } from 'lucide-react';

const briefingTypes: BriefingType[] = [
  'Toolbox Talk',
  'Site Induction',
  'Safety Briefing',
  'Method Statement',
  'Emergency Procedures',
  'PPE Reminder',
];

function getInitials(name?: string | null) {
  if (!name) return '·';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '·';
}

function timeAgo(iso?: string | null) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffMs = Date.now() - then;
  const day = 86_400_000;
  const days = Math.round(diffMs / day);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days > 0 && days < 7) return `${days}d ago`;
  if (days < 0 && days > -7) return `in ${Math.abs(days)}d`;
  return new Date(iso).toLocaleDateString('en-GB');
}

function statusToneFor(briefing: Briefing): Tone {
  const status = briefing.status ?? 'Scheduled';
  if (status === 'Completed') {
    const total = briefing.attendee_count ?? 0;
    const signed = briefing.acknowledged_count ?? 0;
    if (total > 0 && signed >= total) return 'emerald';
    if (total > 0 && signed === 0) return 'orange';
    if (total > 0 && signed < total) return 'amber';
    return 'emerald';
  }
  if (status === 'Cancelled') return 'red';
  return 'amber';
}

function statusLabelFor(briefing: Briefing): string {
  const status = briefing.status ?? 'Scheduled';
  if (status === 'Scheduled') return 'Live';
  if (status === 'Completed') {
    const total = briefing.attendee_count ?? 0;
    const signed = briefing.acknowledged_count ?? 0;
    if (total > 0) return `${signed}/${total} signed`;
    return 'Complete';
  }
  return status;
}

type FilterTab = 'all' | 'live' | 'draft' | 'completed';

export function BriefingsSection() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [showNewBriefing, setShowNewBriefing] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [selectedBriefingId, setSelectedBriefingId] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showSignOff, setShowSignOff] = useState(false);
  const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null);

  const [title, setTitle] = useState('');
  const [briefingType, setBriefingType] = useState<BriefingType>('Toolbox Talk');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [presenter, setPresenter] = useState('');
  const [content, setContent] = useState('');

  const { data: briefings, isLoading, error, refetch } = useBriefings();
  const { data: stats } = useBriefingStats();
  const { data: employees } = useEmployees();
  const { companyProfile } = useCompanyProfile();
  const createBriefing = useCreateBriefing();
  const createFromTemplate = useCreateBriefingFromTemplate();
  const completeBriefing = useCompleteBriefing();
  const deleteBriefing = useDeleteBriefing();
  const { data: attendees } = useBriefingAttendees(selectedBriefingId || undefined);

  const list = briefings ?? [];

  const enriched = useMemo(
    () =>
      list.map((b) => {
        const total = b.attendee_count ?? 0;
        const signed = b.acknowledged_count ?? 0;
        const leader = b.presenter || 'Unassigned';
        return {
          briefing: b,
          leader,
          topic: b.title,
          signed_count: signed,
          attendee_count: total,
          time_ago: timeAgo(b.date ?? b.created_at),
        };
      }),
    [list]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return enriched.filter(({ briefing }) => {
      if (filterTab === 'live' && briefing.status !== 'Scheduled') return false;
      if (filterTab === 'completed' && briefing.status !== 'Completed') return false;
      if (filterTab === 'draft' && briefing.status !== 'Draft') return false;
      if (!q) return true;
      return (
        briefing.title.toLowerCase().includes(q) ||
        briefing.briefing_type?.toLowerCase().includes(q) ||
        briefing.location?.toLowerCase().includes(q) ||
        briefing.presenter?.toLowerCase().includes(q)
      );
    });
  }, [enriched, filterTab, searchQuery]);

  const thisWeek = useMemo(() => {
    const now = Date.now();
    const week = 7 * 86_400_000;
    return list.filter((b) => {
      if (!b.date) return false;
      const t = new Date(b.date).getTime();
      return !Number.isNaN(t) && t >= now - week && t <= now + week;
    }).length;
  }, [list]);

  const totalSigned = useMemo(
    () =>
      list.reduce(
        (sum, b) =>
          b.status === 'Completed' &&
          (b.attendee_count ?? 0) > 0 &&
          (b.acknowledged_count ?? 0) >= (b.attendee_count ?? 0)
            ? sum + 1
            : sum,
        0
      ),
    [list]
  );

  const awaitingSig = useMemo(
    () =>
      list.filter(
        (b) =>
          b.status !== 'Cancelled' &&
          (b.attendee_count ?? 0) > 0 &&
          (b.acknowledged_count ?? 0) < (b.attendee_count ?? 0)
      ).length,
    [list]
  );

  const total30d = useMemo(() => {
    const now = Date.now();
    const thirty = 30 * 86_400_000;
    return list.filter((b) => {
      if (!b.date) return false;
      const t = new Date(b.date).getTime();
      return !Number.isNaN(t) && t >= now - thirty;
    }).length;
  }, [list]);

  const tabs = useMemo(() => {
    const counts = list.reduce(
      (acc, b) => {
        acc.all += 1;
        if (b.status === 'Scheduled') acc.live += 1;
        else if (b.status === 'Completed') acc.completed += 1;
        else if (b.status === 'Draft') acc.draft += 1;
        return acc;
      },
      { all: 0, live: 0, draft: 0, completed: 0 }
    );
    return [
      { value: 'all', label: 'All', count: counts.all },
      { value: 'live', label: 'Live', count: counts.live },
      { value: 'draft', label: 'Draft', count: counts.draft },
      { value: 'completed', label: 'Completed', count: counts.completed },
    ];
  }, [list]);

  const handleCreateBriefing = async () => {
    if (!title || !date) return;
    await createBriefing.mutateAsync({
      title,
      briefing_type: briefingType,
      date,
      time: time || undefined,
      location: location || undefined,
      presenter: presenter || undefined,
      content: content || undefined,
      status: 'Scheduled',
    });
    setTitle('');
    setBriefingType('Toolbox Talk');
    setDate('');
    setTime('');
    setLocation('');
    setPresenter('');
    setContent('');
    setShowNewBriefing(false);
  };

  const handleSelectTemplate = async (template: ToolboxTalkTemplate) => {
    const today = new Date().toISOString().split('T')[0];
    await createFromTemplate.mutateAsync({ templateId: template.id, date: today });
    setShowTemplateLibrary(false);
  };

  const openDetail = (briefing: Briefing) => {
    setSelectedBriefingId(briefing.id);
    setSelectedBriefing(briefing);
    setShowViewer(true);
  };

  const handleEditBriefing = (briefing: Briefing) => {
    setSelectedBriefing(briefing);
    setShowViewer(false);
    setShowEditor(true);
  };

  const handleSignOff = (briefing: Briefing) => {
    setSelectedBriefing(briefing);
    setShowViewer(false);
    setShowSignOff(true);
  };

  const handleExportPdf = async (briefing: Briefing) => {
    try {
      await downloadBriefingPDF({
        briefing,
        attendees: attendees || [],
        companyName: companyProfile?.company_name || 'Your Company',
      });
      toast({
        title: 'PDF exported',
        description: 'Briefing document has been downloaded.',
      });
    } catch {
      toast({
        title: 'Export failed',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (error) {
    return (
      <PageFrame>
        <EmptyState
          title="Failed to load briefings"
          description="Something went wrong fetching the briefing list. Try again."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Toolbox Briefings"
        description="Toolbox talks, site meetings and QR sign-offs."
        tone="amber"
        actions={
          <>
            <PrimaryButton onClick={() => setShowNewBriefing(true)}>New briefing</PrimaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh briefings">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'This week', value: isLoading ? '–' : thisWeek, tone: 'amber' },
          { label: 'Signed', value: isLoading ? '–' : (stats?.completed ?? totalSigned), tone: 'emerald' },
          { label: 'Awaiting sig', value: isLoading ? '–' : awaitingSig, tone: 'orange' },
          { label: 'Total 30d', value: isLoading ? '–' : total30d },
        ]}
      />

      <FilterBar
        tabs={tabs}
        activeTab={filterTab}
        onTabChange={(v) => setFilterTab(v as FilterTab)}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search briefings…"
        actions={
          <SecondaryButton onClick={() => setShowTemplateLibrary(true)}>
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            Templates
          </SecondaryButton>
        }
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No matching briefings' : 'No briefings yet'}
          description={
            searchQuery
              ? 'Try a different search term or clear filters.'
              : 'Schedule your first toolbox talk or pull one from the template library.'
          }
          action="New briefing"
          onAction={() => setShowNewBriefing(true)}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Briefings"
            meta={<Pill tone="amber">{filtered.length}</Pill>}
          />
          <ListBody>
            {filtered.map(({ briefing, leader, topic, signed_count, attendee_count, time_ago }) => {
              const tone = statusToneFor(briefing);
              const label = statusLabelFor(briefing);
              const subtitleParts = [
                leader,
                attendee_count > 0 ? `${signed_count}/${attendee_count} signed` : null,
                time_ago,
              ].filter(Boolean);
              return (
                <ListRow
                  key={briefing.id}
                  lead={<Avatar initials={getInitials(leader)} />}
                  title={topic}
                  subtitle={subtitleParts.join(' · ')}
                  trailing={<Pill tone={tone}>{label}</Pill>}
                  onClick={() => openDetail(briefing)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      <Sheet open={showNewBriefing} onOpenChange={setShowNewBriefing}>
        <SheetTrigger asChild>
          <span className="hidden" aria-hidden />
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <SheetShell
            eyebrow="HR & Safety"
            title="Schedule briefing"
            description="Create a new toolbox talk or safety briefing."
            footer={
              <>
                <SecondaryButton onClick={() => setShowNewBriefing(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleCreateBriefing}
                  disabled={!title || !date || createBriefing.isPending}
                  fullWidth
                >
                  {createBriefing.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Schedule'
                  )}
                </PrimaryButton>
              </>
            }
          >
            <FormCard eyebrow="Briefing">
              <Field label="Title" required>
                <Input
                  placeholder="e.g. Weekly safety briefing…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Briefing type">
                <Select
                  value={briefingType}
                  onValueChange={(v) => setBriefingType(v as BriefingType)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {briefingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>

            <FormCard eyebrow="Schedule">
              <FormGrid cols={2}>
                <Field label="Date" required>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Time">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              <Field label="Location">
                <Input
                  placeholder="Site address or meeting point…"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Presenter">
                <Select value={presenter} onValueChange={setPresenter}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select presenter…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {employees?.map((emp) => (
                      <SelectItem key={emp.id} value={emp.name}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>

            <FormCard eyebrow="Content">
              <Field label="Content / agenda">
                <Textarea
                  placeholder="Briefing content or discussion points…"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`${textareaClass} min-h-[120px]`}
                />
              </Field>
            </FormCard>
          </SheetShell>
        </SheetContent>
      </Sheet>

      <Sheet open={showTemplateLibrary} onOpenChange={setShowTemplateLibrary}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 overflow-hidden">
          <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
            <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
              <Eyebrow>HR & Safety</Eyebrow>
              <div className="mt-1 flex items-center gap-2 text-[20px] font-semibold text-white leading-tight">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Toolbox talk templates
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <ToolboxTalkLibrary onSelectTemplate={handleSelectTemplate} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {selectedBriefingId && (
        <BriefingViewer
          open={showViewer}
          onOpenChange={(open) => {
            setShowViewer(open);
            if (!open) {
              setSelectedBriefingId(null);
              setSelectedBriefing(null);
            }
          }}
          briefingId={selectedBriefingId}
          onEdit={handleEditBriefing}
          onSignOff={handleSignOff}
          onExportPdf={handleExportPdf}
        />
      )}

      {selectedBriefing && (
        <BriefingEditor
          open={showEditor}
          onOpenChange={(open) => {
            setShowEditor(open);
            if (!open) setSelectedBriefing(null);
          }}
          briefing={selectedBriefing}
          onSaved={() => {
            refetch();
          }}
        />
      )}

      {selectedBriefing && (
        <DigitalSignOff
          open={showSignOff}
          onOpenChange={(open) => {
            setShowSignOff(open);
            if (!open) setSelectedBriefing(null);
          }}
          briefing={selectedBriefing}
          onComplete={() => {
            refetch();
          }}
        />
      )}
    </PageFrame>
  );
}
