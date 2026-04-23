import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
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
  Pill,
  Avatar,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Divider,
  PrimaryButton,
  SecondaryButton,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

import { ConversationList } from '@/components/employer/vacancies/ConversationList';
import { ChatView } from '@/components/employer/messaging/ChatView';
import { VacancyFormWizard } from '@/components/employer/vacancy-form/VacancyFormWizard';
import { BulkActionBar } from '@/components/employer/vacancies/BulkActionBar';

import { useVacancies, useToggleVacancyStatus } from '@/hooks/useVacancies';
import {
  useVacancyApplications,
  useUpdateApplicationStatus,
  useBulkUpdateApplicationStatus,
} from '@/hooks/useVacancyApplications';
import { useConversations } from '@/hooks/useConversations';
import { useEmployer } from '@/contexts/EmployerContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

import { Vacancy, VacancyApplication } from '@/services/vacancyService';
import type { Conversation } from '@/services/conversationService';

type StatusFilter =
  | 'all'
  | 'New'
  | 'Reviewing'
  | 'Shortlisted'
  | 'Interviewed'
  | 'Offered'
  | 'Hired'
  | 'Rejected';
type TierFilter = 'all' | 'basic' | 'verified' | 'premium';
type SortOption = 'date-desc' | 'date-asc' | 'name';
type TopTab = 'vacancies' | 'applications' | 'conversations';
type VacancyTab = 'live' | 'draft' | 'closed';

const vacancyStatusTone: Record<string, Tone> = {
  Open: 'emerald',
  Closed: 'red',
  Draft: 'amber',
};

const candidateStatusTone: Record<string, Tone> = {
  New: 'cyan',
  Reviewing: 'blue',
  Shortlisted: 'yellow',
  Interviewed: 'purple',
  Offered: 'amber',
  Hired: 'emerald',
  Rejected: 'red',
};

const tierTone: Record<string, Tone> = {
  basic: 'blue',
  verified: 'cyan',
  premium: 'yellow',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatRate(min?: number | null, max?: number | null, period?: string | null) {
  if (!min && !max) return 'Rate negotiable';
  const range = min && max && min !== max ? `${min.toLocaleString()}–${max.toLocaleString()}` : `${(min ?? max ?? 0).toLocaleString()}`;
  const suffix = period ? ` / ${period.replace('per ', '')}` : '';
  return `£${range}${suffix}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function JobVacanciesSection() {
  const queryClient = useQueryClient();
  const { data: vacancies = [], isLoading: vacanciesLoading } = useVacancies();
  const { data: applications = [], isLoading: applicationsLoading } = useVacancyApplications();
  const {
    data: conversations = [],
    isLoading: conversationsLoading,
    totalUnread,
  } = useConversations();
  const toggleVacancyStatus = useToggleVacancyStatus();
  const updateApplicationStatus = useUpdateApplicationStatus();
  const bulkUpdateStatus = useBulkUpdateApplicationStatus();
  const { employer } = useEmployer();

  const [topTab, setTopTab] = useState<TopTab>('vacancies');
  const [vacancyTab, setVacancyTab] = useState<VacancyTab>('live');
  const [vacancySearch, setVacancySearch] = useState('');

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [duplicatingVacancy, setDuplicatingVacancy] = useState<Vacancy | null>(null);
  const [viewingVacancy, setViewingVacancy] = useState<Vacancy | null>(null);
  const [viewingApplication, setViewingApplication] = useState<VacancyApplication | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [vacancyFilter, setVacancyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  const totalApplicants = applications.length;
  const newApplicants = applications.filter((a) => a.status === 'New').length;
  const openVacancies = vacancies.filter((v) => v.status === 'Open').length;
  const draftVacancies = vacancies.filter((v) => v.status === 'Draft').length;
  const closedVacancies = vacancies.filter((v) => v.status === 'Closed').length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const hiredCount = applications.filter((a) => a.status === 'Hired').length;

  const hiredLast30 = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return applications.filter(
      (a) => a.status === 'Hired' && new Date(a.applied_at).getTime() >= cutoff
    ).length;
  }, [applications]);

  const filteredVacancies = useMemo(() => {
    const statusFor: Record<VacancyTab, string> = {
      live: 'Open',
      draft: 'Draft',
      closed: 'Closed',
    };
    let rows = vacancies.filter((v) => v.status === statusFor[vacancyTab]);
    if (vacancySearch) {
      const q = vacancySearch.toLowerCase();
      rows = rows.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.location?.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [vacancies, vacancyTab, vacancySearch]);

  const filteredApplications = useMemo(() => {
    let filtered = [...applications];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    if (tierFilter !== 'all') {
      filtered = filtered.filter((a) => {
        const tier = a.elec_id_profile?.verification_tier;
        return tier === tierFilter;
      });
    }

    if (vacancyFilter !== 'all') {
      filtered = filtered.filter((a) => a.vacancy_id === vacancyFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.applicant_name.toLowerCase().includes(query) ||
          a.applicant_email?.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime();
        case 'date-asc':
          return new Date(a.applied_at).getTime() - new Date(b.applied_at).getTime();
        case 'name':
          return a.applicant_name.localeCompare(b.applicant_name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, statusFilter, tierFilter, vacancyFilter, sortBy, searchQuery]);

  const getApplicationsForVacancy = (vacancyId: string) =>
    applications.filter((a) => a.vacancy_id === vacancyId);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['vacancies'] });
    queryClient.invalidateQueries({ queryKey: ['vacancy-applications'] });
    queryClient.invalidateQueries({ queryKey: ['conversations'] });
    toast({ title: 'Refreshed', description: 'Vacancy data is up to date.' });
  };

  const handleUpdateStatus = async (
    appId: string,
    status: VacancyApplication['status'],
    name: string
  ) => {
    try {
      await updateApplicationStatus.mutateAsync({ id: appId, status });
      toast({
        title: 'Status updated',
        description: `${name} has been marked as ${status}.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update application status.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleVacancy = async (vacancy: Vacancy) => {
    try {
      await toggleVacancyStatus.mutateAsync({ id: vacancy.id, currentStatus: vacancy.status });
      toast({
        title: vacancy.status === 'Open' ? 'Vacancy closed' : 'Vacancy reopened',
        description: `${vacancy.title} is now ${vacancy.status === 'Open' ? 'closed' : 'open'}.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update vacancy status.',
        variant: 'destructive',
      });
    }
  };

  const handleWizardClose = () => {
    setIsWizardOpen(false);
    setEditingVacancy(null);
    setDuplicatingVacancy(null);
  };

  const handleEditVacancy = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setIsWizardOpen(true);
  };

  const handleDuplicateVacancy = (vacancy: Vacancy) => {
    setDuplicatingVacancy(vacancy);
    setIsWizardOpen(true);
  };

  const handleViewApplicants = (vacancyId: string) => {
    setVacancyFilter(vacancyId);
    setTopTab('applications');
    setViewingVacancy(null);
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedApplicants(new Set());
    }
  };

  const handleSelectionChange = (appId: string, selected: boolean) => {
    setSelectedApplicants((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(appId);
      } else {
        next.delete(appId);
      }
      return next;
    });
  };

  const handleBulkShortlist = async () => {
    const ids = Array.from(selectedApplicants);
    try {
      await bulkUpdateStatus.mutateAsync({ ids, status: 'Shortlisted' });
      toast({
        title: 'Candidates shortlisted',
        description: `${ids.length} candidate${ids.length !== 1 ? 's' : ''} have been shortlisted.`,
      });
      setSelectedApplicants(new Set());
      setSelectionMode(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update candidate statuses.',
        variant: 'destructive',
      });
    }
  };

  const handleBulkReject = async () => {
    const ids = Array.from(selectedApplicants);
    try {
      await bulkUpdateStatus.mutateAsync({ ids, status: 'Rejected' });
      toast({
        title: 'Candidates rejected',
        description: `${ids.length} candidate${ids.length !== 1 ? 's' : ''} have been rejected.`,
      });
      setSelectedApplicants(new Set());
      setSelectionMode(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update candidate statuses.',
        variant: 'destructive',
      });
    }
  };

  const clearSelection = () => {
    setSelectedApplicants(new Set());
  };

  const isLoading = vacanciesLoading || applicationsLoading;

  const heroActions = (
    <>
      <PrimaryButton onClick={() => setIsWizardOpen(true)}>Post vacancy</PrimaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  const topTabs = [
    { value: 'vacancies', label: 'Vacancies', count: vacancies.length },
    { value: 'applications', label: 'Candidates', count: totalApplicants },
    { value: 'conversations', label: 'Messages', count: totalUnread },
  ];

  const vacancyTabs: { value: VacancyTab; label: string; count: number }[] = [
    { value: 'live', label: 'Live', count: openVacancies },
    { value: 'draft', label: 'Draft', count: draftVacancies },
    { value: 'closed', label: 'Closed', count: closedVacancies },
  ];

  const candidateStatusTabs = [
    { value: 'all', label: 'All', count: applications.length },
    { value: 'New', label: 'New', count: newApplicants },
    {
      value: 'Reviewing',
      label: 'Reviewing',
      count: applications.filter((a) => a.status === 'Reviewing').length,
    },
    { value: 'Shortlisted', label: 'Shortlisted', count: shortlistedCount },
    {
      value: 'Interviewed',
      label: 'Interview',
      count: applications.filter((a) => a.status === 'Interviewed').length,
    },
    {
      value: 'Offered',
      label: 'Offered',
      count: applications.filter((a) => a.status === 'Offered').length,
    },
    {
      value: 'Rejected',
      label: 'Rejected',
      count: applications.filter((a) => a.status === 'Rejected').length,
    },
  ];

  return (
    <PageFrame>
      <PageHero
        eyebrow="Hiring"
        title="Job Vacancies"
        description="Post roles, review applicants, send invitations."
        tone="cyan"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Live', value: openVacancies, tone: 'emerald' },
          { label: 'Applications', value: totalApplicants, tone: 'cyan' },
          { label: 'Shortlisted', value: shortlistedCount, tone: 'yellow' },
          { label: 'Hired 30d', value: hiredLast30, accent: true },
        ]}
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <FilterBar
            tabs={topTabs}
            activeTab={topTab}
            onTabChange={(v) => setTopTab(v as TopTab)}
          />

          {topTab === 'vacancies' && (
            <div className="space-y-5">
              <FilterBar
                tabs={vacancyTabs as { value: string; label: string; count?: number }[]}
                activeTab={vacancyTab}
                onTabChange={(v) => setVacancyTab(v as VacancyTab)}
                search={vacancySearch}
                onSearchChange={setVacancySearch}
                searchPlaceholder="Search vacancies…"
              />

              {filteredVacancies.length === 0 ? (
                <EmptyState
                  title={vacancyTab === 'live' ? 'No vacancies yet' : `No ${vacancyTab} vacancies`}
                  description={
                    vacancyTab === 'live'
                      ? 'Post your first role to start receiving applications from qualified electricians.'
                      : undefined
                  }
                  action={vacancyTab === 'live' ? 'Post your first' : undefined}
                  onAction={vacancyTab === 'live' ? () => setIsWizardOpen(true) : undefined}
                />
              ) : (
                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="Vacancies"
                    meta={<Pill tone="cyan">{filteredVacancies.length}</Pill>}
                  />
                  <ListBody>
                    {filteredVacancies.map((v) => {
                      const applicantCount = getApplicationsForVacancy(v.id).length;
                      const tone = vacancyStatusTone[v.status] ?? 'blue';
                      const rate = formatRate(v.salary_min, v.salary_max, v.salary_period);
                      return (
                        <ListRow
                          key={v.id}
                          title={v.title}
                          subtitle={`${v.location || 'Location TBC'} · ${rate} · ${applicantCount} applicant${applicantCount === 1 ? '' : 's'}`}
                          trailing={<Pill tone={tone}>{v.status}</Pill>}
                          onClick={() => setViewingVacancy(v)}
                        />
                      );
                    })}
                  </ListBody>
                </ListCard>
              )}
            </div>
          )}

          {topTab === 'applications' && (
            <div className="space-y-5">
              <FilterBar
                tabs={candidateStatusTabs}
                activeTab={statusFilter}
                onTabChange={(v) => setStatusFilter(v as StatusFilter)}
                search={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search candidates…"
              />

              <div className="flex flex-wrap items-center gap-2">
                <Select value={tierFilter} onValueChange={(v) => setTierFilter(v as TierFilter)}>
                  <SelectTrigger className={`${selectTriggerClass} w-[150px]`}>
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="all">All tiers</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={vacancyFilter} onValueChange={setVacancyFilter}>
                  <SelectTrigger className={`${selectTriggerClass} w-[170px]`}>
                    <SelectValue placeholder="Vacancy" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="all">All vacancies</SelectItem>
                    {vacancies.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className={`${selectTriggerClass} w-[140px]`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="date-desc">Newest first</SelectItem>
                    <SelectItem value="date-asc">Oldest first</SelectItem>
                    <SelectItem value="name">Name A–Z</SelectItem>
                  </SelectContent>
                </Select>

                <button
                  onClick={toggleSelectionMode}
                  className={`h-10 px-4 rounded-full text-[12.5px] font-medium border transition-colors touch-manipulation ${
                    selectionMode
                      ? 'bg-elec-yellow text-black border-elec-yellow'
                      : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
                  }`}
                >
                  {selectionMode ? 'Done' : 'Select'}
                </button>
              </div>

              {filteredApplications.length === 0 ? (
                <EmptyState
                  title="No candidates found"
                  description={
                    statusFilter !== 'all' ||
                    tierFilter !== 'all' ||
                    vacancyFilter !== 'all' ||
                    searchQuery
                      ? 'Try adjusting your filters or search query.'
                      : 'Applications will appear here when candidates apply to your vacancies.'
                  }
                />
              ) : (
                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="Candidates"
                    meta={<Pill tone="cyan">{filteredApplications.length}</Pill>}
                  />
                  <ListBody>
                    {filteredApplications.map((app) => {
                      const vacancy = vacancies.find((v) => v.id === app.vacancy_id);
                      const tone = candidateStatusTone[app.status] ?? 'blue';
                      const tier = app.elec_id_profile?.verification_tier;
                      const isSelected = selectedApplicants.has(app.id);
                      return (
                        <ListRow
                          key={app.id}
                          lead={
                            <Avatar
                              initials={getInitials(app.applicant_name)}
                              size="md"
                            />
                          }
                          title={app.applicant_name}
                          subtitle={`${vacancy?.title || 'Unknown role'} · ${formatDate(app.applied_at)}`}
                          trailing={
                            <>
                              {tier && (
                                <Pill tone={tierTone[tier] ?? 'blue'}>
                                  {tier}
                                </Pill>
                              )}
                              <Pill tone={tone}>{app.status}</Pill>
                              {selectionMode && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectionChange(app.id, !isSelected);
                                  }}
                                  className={`h-7 w-7 rounded-full border flex items-center justify-center text-[12px] font-semibold touch-manipulation ${
                                    isSelected
                                      ? 'bg-elec-yellow text-black border-elec-yellow'
                                      : 'bg-transparent text-white border-white/[0.2]'
                                  }`}
                                >
                                  {isSelected ? '✓' : ''}
                                </button>
                              )}
                            </>
                          }
                          onClick={() => {
                            if (selectionMode) {
                              handleSelectionChange(app.id, !isSelected);
                            } else {
                              setViewingApplication(app);
                            }
                          }}
                        />
                      );
                    })}
                  </ListBody>
                </ListCard>
              )}
            </div>
          )}

          {topTab === 'conversations' && (
            <ConversationList
              conversations={conversations}
              isLoading={conversationsLoading}
              onSelect={setSelectedConversation}
              emptyMessage="Start a conversation by messaging someone from the talent pool, or wait for applicants to message you."
            />
          )}
        </>
      )}

      <VacancyFormWizard
        open={isWizardOpen}
        onOpenChange={handleWizardClose}
        onSuccess={handleWizardClose}
        editData={
          editingVacancy
            ? {
                id: editingVacancy.id,
                title: editingVacancy.title,
                type: editingVacancy.type as any,
                location: editingVacancy.location,
                workArrangement: 'On-site',
                salaryMin: editingVacancy.salary_min || undefined,
                salaryMax: editingVacancy.salary_max || undefined,
                salaryPeriod: (editingVacancy.salary_period?.includes('year')
                  ? 'year'
                  : editingVacancy.salary_period?.includes('month')
                    ? 'month'
                    : editingVacancy.salary_period?.includes('week')
                      ? 'week'
                      : editingVacancy.salary_period?.includes('day')
                        ? 'day'
                        : editingVacancy.salary_period?.includes('hour')
                          ? 'hour'
                          : 'year') as any,
                benefits: editingVacancy.benefits || [],
                requirements: editingVacancy.requirements || [],
                experienceLevel: 'Mid',
                description: editingVacancy.description || '',
                closingDate: editingVacancy.closing_date || '',
              }
            : undefined
        }
        duplicateData={
          duplicatingVacancy
            ? {
                title: `${duplicatingVacancy.title} (Copy)`,
                type: duplicatingVacancy.type as any,
                location: duplicatingVacancy.location,
                workArrangement: 'On-site',
                salaryMin: duplicatingVacancy.salary_min || undefined,
                salaryMax: duplicatingVacancy.salary_max || undefined,
                salaryPeriod: (duplicatingVacancy.salary_period?.includes('year')
                  ? 'year'
                  : duplicatingVacancy.salary_period?.includes('month')
                    ? 'month'
                    : duplicatingVacancy.salary_period?.includes('week')
                      ? 'week'
                      : duplicatingVacancy.salary_period?.includes('day')
                        ? 'day'
                        : duplicatingVacancy.salary_period?.includes('hour')
                          ? 'hour'
                          : 'year') as any,
                benefits: duplicatingVacancy.benefits || [],
                requirements: duplicatingVacancy.requirements || [],
                experienceLevel: 'Mid',
                description: duplicatingVacancy.description || '',
                closingDate: '',
              }
            : undefined
        }
      />

      <Sheet
        open={!!viewingVacancy}
        onOpenChange={(open) => !open && setViewingVacancy(null)}
      >
        <SheetContent
          side="bottom"
          className="h-[88vh] rounded-t-2xl bg-[hsl(0_0%_10%)] border-white/[0.06] p-0 overflow-hidden"
        >
          {viewingVacancy && (
            <div className="flex flex-col h-full">
              <SheetHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.06] text-left">
                <div className="flex items-center gap-2">
                  <Pill tone={vacancyStatusTone[viewingVacancy.status] ?? 'blue'}>
                    {viewingVacancy.status}
                  </Pill>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white">
                    {viewingVacancy.type}
                  </span>
                </div>
                <SheetTitle className="text-white text-xl mt-2">
                  {viewingVacancy.title}
                </SheetTitle>
                <SheetDescription className="text-white">
                  {viewingVacancy.location || 'Location TBC'}
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-auto px-5 sm:px-6 py-5 space-y-6">
                <StatStrip
                  columns={3}
                  stats={[
                    {
                      label: 'Applicants',
                      value: getApplicationsForVacancy(viewingVacancy.id).length,
                      tone: 'cyan',
                    },
                    { label: 'Views', value: viewingVacancy.views || 0 },
                    {
                      label: 'Posted',
                      value: formatDate(viewingVacancy.created_at),
                    },
                  ]}
                />

                {viewingVacancy.description && (
                  <div>
                    <Divider label="Description" />
                    <p className="mt-3 text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                      {viewingVacancy.description}
                    </p>
                  </div>
                )}

                {viewingVacancy.requirements && viewingVacancy.requirements.length > 0 && (
                  <ListCard>
                    <ListCardHeader title="Requirements" />
                    <ListBody>
                      {viewingVacancy.requirements.map((req, i) => (
                        <ListRow key={i} title={req} />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {viewingVacancy.benefits && viewingVacancy.benefits.length > 0 && (
                  <ListCard>
                    <ListCardHeader title="Benefits" tone="yellow" />
                    <ListBody>
                      {viewingVacancy.benefits.map((b, i) => (
                        <ListRow key={i} title={b} />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {(() => {
                  const apps = getApplicationsForVacancy(viewingVacancy.id);
                  if (apps.length === 0) return null;
                  return (
                    <ListCard>
                      <ListCardHeader
                        tone="cyan"
                        title="Recent applicants"
                        meta={<Pill tone="cyan">{apps.length}</Pill>}
                        action="View all"
                        onAction={() => handleViewApplicants(viewingVacancy.id)}
                      />
                      <ListBody>
                        {apps.slice(0, 5).map((app) => (
                          <ListRow
                            key={app.id}
                            lead={<Avatar initials={getInitials(app.applicant_name)} size="sm" />}
                            title={app.applicant_name}
                            subtitle={formatDate(app.applied_at)}
                            trailing={
                              <Pill tone={candidateStatusTone[app.status] ?? 'blue'}>
                                {app.status}
                              </Pill>
                            }
                            onClick={() => {
                              setViewingVacancy(null);
                              setViewingApplication(app);
                            }}
                          />
                        ))}
                      </ListBody>
                    </ListCard>
                  );
                })()}
              </div>

              <SheetFooter className="px-5 sm:px-6 py-4 border-t border-white/[0.06] flex-row gap-2">
                <SecondaryButton
                  onClick={() => {
                    handleDuplicateVacancy(viewingVacancy);
                    setViewingVacancy(null);
                  }}
                >
                  Duplicate
                </SecondaryButton>
                <SecondaryButton
                  onClick={() => {
                    handleToggleVacancy(viewingVacancy);
                    setViewingVacancy(null);
                  }}
                >
                  {viewingVacancy.status === 'Open' ? 'Pause' : 'Reopen'}
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    handleEditVacancy(viewingVacancy);
                    setViewingVacancy(null);
                  }}
                  className="ml-auto"
                >
                  Edit vacancy
                </PrimaryButton>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet
        open={!!viewingApplication}
        onOpenChange={(open) => !open && setViewingApplication(null)}
      >
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl bg-[hsl(0_0%_10%)] border-white/[0.06] p-0 overflow-hidden"
        >
          {viewingApplication && (
            <div className="flex flex-col h-full">
              <SheetHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.06] text-left">
                <div className="flex items-center gap-3">
                  <Avatar initials={getInitials(viewingApplication.applicant_name)} size="md" />
                  <div className="min-w-0">
                    <SheetTitle className="text-white text-lg">
                      {viewingApplication.applicant_name}
                    </SheetTitle>
                    <SheetDescription className="text-white">
                      Applied for{' '}
                      {vacancies.find((v) => v.id === viewingApplication.vacancy_id)?.title ||
                        'unknown role'}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-auto px-5 sm:px-6 py-5 space-y-6">
                {(viewingApplication.applicant_email || viewingApplication.applicant_phone) && (
                  <ListCard>
                    <ListCardHeader title="Contact" />
                    <ListBody>
                      {viewingApplication.applicant_email && (
                        <ListRow
                          title={viewingApplication.applicant_email}
                          subtitle="Email"
                        />
                      )}
                      {viewingApplication.applicant_phone && (
                        <ListRow
                          title={viewingApplication.applicant_phone}
                          subtitle="Phone"
                        />
                      )}
                    </ListBody>
                  </ListCard>
                )}

                {viewingApplication.elec_id_profile && (
                  <ListCard>
                    <ListCardHeader
                      tone="yellow"
                      title="Elec-ID"
                      meta={
                        <Pill
                          tone={
                            tierTone[viewingApplication.elec_id_profile.verification_tier] ??
                            'blue'
                          }
                        >
                          {viewingApplication.elec_id_profile.verification_tier}
                        </Pill>
                      }
                    />
                    <ListBody>
                      <ListRow
                        title={viewingApplication.elec_id_profile.elec_id_number}
                        subtitle="ID number"
                      />
                      {viewingApplication.elec_id_profile.ecs_card_type && (
                        <ListRow
                          title={viewingApplication.elec_id_profile.ecs_card_type}
                          subtitle="ECS card"
                        />
                      )}
                    </ListBody>
                  </ListCard>
                )}

                {viewingApplication.cover_letter && (
                  <div>
                    <Divider label="Cover letter" />
                    <p className="mt-3 text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                      {viewingApplication.cover_letter}
                    </p>
                  </div>
                )}

                <StatStrip
                  columns={2}
                  stats={[
                    {
                      label: 'Status',
                      value: viewingApplication.status,
                      tone: candidateStatusTone[viewingApplication.status] ?? 'blue',
                    },
                    {
                      label: 'Applied',
                      value: formatDate(viewingApplication.applied_at),
                    },
                  ]}
                />
              </div>

              <SheetFooter className="px-5 sm:px-6 py-4 border-t border-white/[0.06] flex-row gap-2">
                {viewingApplication.status === 'New' && (
                  <>
                    <SecondaryButton
                      fullWidth
                      onClick={() => {
                        handleUpdateStatus(
                          viewingApplication.id,
                          'Rejected',
                          viewingApplication.applicant_name
                        );
                        setViewingApplication(null);
                      }}
                    >
                      Reject
                    </SecondaryButton>
                    <PrimaryButton
                      fullWidth
                      onClick={() => {
                        handleUpdateStatus(
                          viewingApplication.id,
                          'Shortlisted',
                          viewingApplication.applicant_name
                        );
                        setViewingApplication(null);
                      }}
                    >
                      Shortlist
                    </PrimaryButton>
                  </>
                )}
                {viewingApplication.status === 'Shortlisted' && (
                  <PrimaryButton
                    fullWidth
                    onClick={() => {
                      handleUpdateStatus(
                        viewingApplication.id,
                        'Interviewed',
                        viewingApplication.applicant_name
                      );
                      setViewingApplication(null);
                    }}
                  >
                    Mark as interviewed
                  </PrimaryButton>
                )}
                {viewingApplication.status === 'Interviewed' && (
                  <PrimaryButton
                    fullWidth
                    onClick={() => {
                      handleUpdateStatus(
                        viewingApplication.id,
                        'Offered',
                        viewingApplication.applicant_name
                      );
                      setViewingApplication(null);
                    }}
                  >
                    Make offer
                  </PrimaryButton>
                )}
                {viewingApplication.status === 'Offered' && (
                  <PrimaryButton
                    fullWidth
                    onClick={() => {
                      handleUpdateStatus(
                        viewingApplication.id,
                        'Hired',
                        viewingApplication.applicant_name
                      );
                      setViewingApplication(null);
                    }}
                  >
                    Mark as hired
                  </PrimaryButton>
                )}
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <ChatView
        conversation={selectedConversation}
        open={!!selectedConversation}
        onOpenChange={(open) => !open && setSelectedConversation(null)}
        onArchived={() => setSelectedConversation(null)}
      />

      <BulkActionBar
        selectedCount={selectedApplicants.size}
        onShortlistAll={handleBulkShortlist}
        onRejectAll={handleBulkReject}
        onClearSelection={clearSelection}
        isProcessing={bulkUpdateStatus.isPending}
      />
    </PageFrame>
  );
}
