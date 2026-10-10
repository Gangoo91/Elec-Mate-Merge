import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import FormSheet from '@/components/forms/FormSheet';
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
  LoadingBlocks,
  PrimaryButton,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  Row,
  RowList,
  rowsClass,
  KeyValue,
  StatusPill,
  PlainEmpty,
  Segments,
  SearchField,
  FilterRow,
  HeroActions,
  heroBtn,
  rowBtn,
  rowBtnPrimary,
  rowBtnSecondary,
  Initials,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { VACANCIES_HELP } from '@/components/employer/help/people';

import { ConversationList } from '@/components/employer/vacancies/ConversationList';
import { ChatView } from '@/components/employer/messaging/ChatView';
import { VacancyFormWizard } from '@/components/employer/vacancy-form/VacancyFormWizard';
import { BulkActionBar } from '@/components/employer/vacancies/BulkActionBar';
import { CandidateNotesSection } from '@/components/employer/vacancies/CandidateNotesSection';
import {
  PipelineStrip,
  PIPELINE_STAGES,
  stagePillTone,
  type PipelineStage,
} from '@/components/employer/vacancies/PipelineStrip';
import { CandidateCard, interviewSummary } from '@/components/employer/vacancies/CandidateCard';
import { RejectCandidateDialog } from '@/components/employer/vacancies/RejectCandidateDialog';
import { ScheduleInterviewDialog } from '@/components/employer/dialogs/ScheduleInterviewDialog';
import { ReachTalentPoolSheet } from '@/components/employer/vacancies/ReachTalentPoolSheet';
import { useVacancyInvitationCounts } from '@/hooks/useVacancyReach';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useHireAndOnboard, useHireOffer, useSaveHireOffer } from '@/hooks/useStarters';
import {
  HireStarterSheet,
  type HireSheetMode,
  type HireSheetSubmit,
} from '@/components/employer/people/HireStarterSheet';

import { useVacancies, useToggleVacancyStatus } from '@/hooks/useVacancies';
import {
  useVacancyApplications,
  useUpdateApplicationStatus,
  useBulkUpdateApplicationStatus,
  useUpdateApplicationNotes,
} from '@/hooks/useVacancyApplications';
import { useConversations } from '@/hooks/useConversations';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

import { Vacancy, VacancyApplication, notifyApplicantOfStatus } from '@/services/vacancyService';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Conversation } from '@/services/conversationService';
import {
  getEcsCardLabel,
  getQualificationLabel,
  jobTitleText,
} from '@/data/uk-electrician-constants';

type StatusFilter = 'all' | PipelineStage;
type TierFilter = 'all' | 'basic' | 'verified' | 'premium';
type SortOption = 'date-desc' | 'date-asc' | 'stale' | 'name';
type TopTab = 'vacancies' | 'applications' | 'conversations';
type VacancyTab = 'live' | 'draft' | 'closed';

/** One-tap advance labels per stage. Shortlisted deliberately routes through
 *  the booking dialog — the applicant push for 'Interviewed' says "Interview
 *  Scheduled", so entering the stage without a booking would mislead them. */
const advanceLabels: Partial<Record<VacancyApplication['status'], string>> = {
  New: 'Shortlist',
  Reviewing: 'Shortlist',
  Shortlisted: 'Interview…',
  Interviewed: 'Make offer',
  Offered: 'Hire',
};

const stageEmptyCopy: Record<PipelineStage, { title: string; description: string }> = {
  New: {
    title: 'No new applications',
    description: 'New applicants land here the moment they apply to one of your live vacancies.',
  },
  Reviewing: {
    title: 'Nothing under review',
    description: 'Applications you are actively considering sit in this stage.',
  },
  Shortlisted: {
    title: 'No one shortlisted yet',
    description: 'Shortlist promising applicants to build your interview list. They get notified.',
  },
  Interviewed: {
    title: 'No interviews in progress',
    description: 'Book an interview with a shortlisted candidate to move them here.',
  },
  Offered: {
    title: 'No offers out',
    description: 'Make an offer after interview. The candidate is notified straight away.',
  },
  Hired: {
    title: 'No hires from this pipeline yet',
    description: 'Hired candidates join your team roster automatically.',
  },
  Rejected: {
    title: 'No rejected candidates',
    description: 'Candidates you turn down are kept here for your records.',
  },
};

function formatRate(min?: number | null, max?: number | null, period?: string | null) {
  if (!min && !max) return 'Rate to agree';
  const range =
    min && max && min !== max
      ? `${min.toLocaleString()} to ${max.toLocaleString()}`
      : `${(min ?? max ?? 0).toLocaleString()}`;
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
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // ELE-2091: offers and hires carry pay, so the offer and hire sheets are owner/admin.
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;
  const saveOffer = useSaveHireOffer();
  const hireAndOnboard = useHireAndOnboard();
  const [hireSheet, setHireSheet] = useState<{
    mode: HireSheetMode;
    app: VacancyApplication;
  } | null>(null);
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
  const updateApplicationNotes = useUpdateApplicationNotes();

  const [topTab, setTopTab] = useState<TopTab>('vacancies');
  const [vacancyTab, setVacancyTab] = useState<VacancyTab>('live');
  const [vacancySearch, setVacancySearch] = useState('');

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [duplicatingVacancy, setDuplicatingVacancy] = useState<Vacancy | null>(null);
  const [viewingVacancy, setViewingVacancy] = useState<Vacancy | null>(null);
  const [viewingApplication, setViewingApplication] = useState<VacancyApplication | null>(null);
  const [schedulingApp, setSchedulingApp] = useState<VacancyApplication | null>(null);
  const [rejectingApp, setRejectingApp] = useState<VacancyApplication | null>(null);
  // ELE-1957: after a vacancy goes live, offer the matching talent pool
  const [reachVacancy, setReachVacancy] = useState<{
    id: string;
    title: string;
    location?: string | null;
    status?: string;
  } | null>(null);
  const [reachJustPublished, setReachJustPublished] = useState(false);
  const { data: invitationCounts } = useVacancyInvitationCounts();

  const { data: viewingOffer } = useHireOffer(viewingApplication?.id, canSeeMoney);

  // Full Elec-ID credentials for the open applicant (employer-readable under RLS)
  const { data: applicantCredentials } = useQuery({
    queryKey: ['applicant-elec-id', viewingApplication?.applicant_profile_id],
    enabled: !!viewingApplication?.applicant_profile_id,
    queryFn: async () => {
      const pid = viewingApplication!.applicant_profile_id!;
      const [skills, quals, history] = await Promise.all([
        supabase
          .from('employer_elec_id_skills')
          .select('id, skill_name, skill_level, years_experience')
          .eq('profile_id', pid),
        supabase
          .from('employer_elec_id_qualifications')
          .select('id, qualification_name, awarding_body, is_verified')
          .eq('profile_id', pid),
        supabase
          .from('employer_elec_id_work_history')
          .select('id, job_title, employer_name, start_date, end_date, is_current')
          .eq('profile_id', pid)
          .order('start_date', { ascending: false }),
      ]);
      return {
        skills: skills.data || [],
        qualifications: quals.data || [],
        workHistory: history.data || [],
      };
    },
  });
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [vacancyFilter, setVacancyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  const totalApplicants = applications.length;
  const openVacancies = vacancies.filter((v) => v.status === 'Open').length;
  const draftVacancies = vacancies.filter((v) => v.status === 'Draft').length;
  const closedVacancies = vacancies.filter((v) => v.status === 'Closed').length;

  const stageCounts = useMemo(() => {
    const counts: Record<PipelineStage, number> = {
      New: 0,
      Reviewing: 0,
      Shortlisted: 0,
      Interviewed: 0,
      Offered: 0,
      Hired: 0,
      Rejected: 0,
    };
    for (const a of applications) {
      if (a.status in counts) counts[a.status as PipelineStage]++;
    }
    return counts;
  }, [applications]);
  // "In progress" = everyone past the first look and not yet decided. A bare
  // Shortlisted count read 0 the moment anyone moved on to interview.
  const inProgressCount = stageCounts.Shortlisted + stageCounts.Interviewed + stageCounts.Offered;

  // Hired in the last 30 days, by when they were hired (the row's last
  // update), not when they applied: a March applicant hired today counts.
  const hiredLast30 = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return applications.filter(
      (a) => a.status === 'Hired' && new Date(a.updated_at || a.applied_at).getTime() >= cutoff
    ).length;
  }, [applications]);
  const invitedTotal = invitationCounts?.total ?? 0;
  const invitedApplied = invitationCounts?.applied ?? 0;

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
        (v) => v.title.toLowerCase().includes(q) || v.location?.toLowerCase().includes(q)
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
        case 'stale':
          // Quietest first — real updated_at only (also moves on notes edits,
          // which is why the card labels it "last activity")
          return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
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

  const [isHiring, setIsHiring] = useState(false);

  // The hire hinge: marks Hired, records the finder's fee, pulls the worker
  // into the team roster and unlocks the conversation — one atomic RPC.
  const handleHire = async (app: VacancyApplication) => {
    setIsHiring(true);
    try {
      const { data, error } = await supabase.rpc('hire_applicant', {
        p_application_id: app.id,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = data as any;
      if (error || r?.error) throw error || new Error(r?.error);

      // Raise the £250 finder's fee. Dormant until launch (no-ops as
      // 'not_enabled'); fire-and-forget so billing never blocks the hire —
      // the fee row already exists and can be collected/retried server-side.
      // hire_record_id is null on a re-hire, which guards against double-charge.
      if (r?.hire_record_id) {
        supabase.functions
          .invoke('charge-finder-fee', {
            body: { hire_record_id: r.hire_record_id, worker_name: app.applicant_name },
          })
          .catch(() => {});
      }

      // The RPC already set status='Hired' server-side, so the update path's
      // changed-status guard would skip the push — send it directly instead.
      // Fire-and-forget: a failed notification must never block the hire.
      notifyApplicantOfStatus(app.id, 'Hired').catch(() => {});

      // ELE-1957: the roster row alone left the new starter outside the app.
      // The team invite email links them to Worker Tools on day one (jobs,
      // clock-in, timesheets). Needs an email on the application.
      let invited = false;
      if (r?.roster_employee_id && r?.roster_created && app.applicant_email) {
        const { error: inviteErr } = await supabase.functions.invoke('send-team-welcome', {
          body: { employeeId: r.roster_employee_id },
        });
        invited = !inviteErr;
      }

      // ELE-2091: say what actually happened. This path (no offer recorded,
      // used when the signed-in manager can't set pay) leaves pay to the owner.
      toast({
        title:
          r?.roster_created === false ? 'Marked as hired' : `${app.applicant_name} is on your team`,
        description:
          r?.roster_created === false
            ? `${app.applicant_name} was already on your team. Nothing on their record changed.`
            : [
                r?.pay_carried ? null : 'The owner or an admin adds their pay and start date.',
                invited
                  ? 'Their app invite is in their inbox.'
                  : app.applicant_email
                    ? 'The app invite did not go. Send it from their record.'
                    : 'Add their email on their record to send the app invite.',
              ]
                .filter(Boolean)
                .join(' '),
      });
      queryClient.invalidateQueries({ queryKey: ['vacancy-applications'] });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setViewingApplication(null);
    } catch {
      toast({
        title: 'Could not complete the hire',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsHiring(false);
    }
  };

  // ELE-2091: Make offer records the pay, start date and role; Hire carries
  // them into the roster with probation, pay profile and the starter
  // checklist. A manager who can't see pay keeps the old one-tap steps.
  const openOffer = (app: VacancyApplication) => {
    if (canSeeMoney) setHireSheet({ mode: 'offer', app });
    else handleUpdateStatus(app.id, 'Offered', app.applicant_name);
  };
  const openHire = (app: VacancyApplication) => {
    if (canSeeMoney) setHireSheet({ mode: 'hire', app });
    else handleHire(app);
  };

  const handleHireSheetSubmit = async ({ mode, details, invite }: HireSheetSubmit) => {
    if (!hireSheet) return;
    const app = hireSheet.app;
    if (mode === 'offer') {
      try {
        await saveOffer.mutateAsync({ applicationId: app.id, offer: details });
        if (app.status !== 'Offered') {
          await updateApplicationStatus.mutateAsync({ id: app.id, status: 'Offered' });
        }
        toast({
          title: 'Offer saved',
          description:
            app.status !== 'Offered'
              ? `${app.applicant_name} has been told they have an offer.`
              : 'The new terms go onto their record when you hire.',
        });
        setHireSheet(null);
        setViewingApplication(null);
      } catch (e) {
        toast({
          title: 'Offer not saved',
          description: e instanceof Error ? e.message : 'Please try again.',
          variant: 'destructive',
        });
      }
      return;
    }

    try {
      const r = await hireAndOnboard.mutateAsync({ applicationId: app.id, details });
      // Finder's fee: dormant until launch, fire-and-forget, as before.
      if (r.hire_record_id) {
        supabase.functions
          .invoke('charge-finder-fee', {
            body: { hire_record_id: r.hire_record_id, worker_name: app.applicant_name },
          })
          .catch(() => {});
      }
      notifyApplicantOfStatus(app.id, 'Hired').catch(() => {});

      let invited: boolean | null = null;
      if (invite && r.roster_created && app.applicant_email) {
        const { data, error: inviteErr } = await supabase.functions.invoke('send-team-welcome', {
          body: { employeeId: r.roster_employee_id },
        });
        invited = !inviteErr && (data as { success?: boolean } | null)?.success !== false;
      }

      const first = app.applicant_name.split(' ')[0] || app.applicant_name;
      const pay =
        details.pay_type === 'annual'
          ? `£${Number(details.annual_salary).toLocaleString('en-GB')} a year`
          : `£${Number(details.hourly_rate).toFixed(2)} an hour`;
      toast({
        title: r.roster_created ? `${app.applicant_name} is on your team` : 'Marked as hired',
        description: r.roster_created
          ? [
              `${pay} from ${format(parseISO(details.start_date), 'd MMM')}.`,
              r.probation_end_date
                ? `Probation to ${format(parseISO(r.probation_end_date), 'd MMM yyyy')}.`
                : null,
              invited === true
                ? `Their app invite is in their inbox.`
                : invited === false
                  ? 'The app invite did not go. Send it from the checklist.'
                  : null,
              `Next: the right-to-work check before ${first} starts.`,
            ]
              .filter(Boolean)
              .join(' ')
          : `${app.applicant_name} was already on your team. Their pay and start date were not changed.`,
      });
      setHireSheet(null);
      setViewingApplication(null);
      // Straight to their record, where the starter checklist is.
      navigate(`/employer?section=team&member=${r.roster_employee_id}`);
    } catch (e) {
      toast({
        title: 'Could not complete the hire',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  /** One-tap advance to the next pipeline stage. */
  const handleAdvance = (app: VacancyApplication) => {
    if (app.status === 'New' || app.status === 'Reviewing') {
      handleUpdateStatus(app.id, 'Shortlisted', app.applicant_name);
    } else if (app.status === 'Shortlisted') {
      // Interview entry always goes through the booking dialog — the
      // applicant push for this stage says "Interview Scheduled"
      setSchedulingApp(app);
    } else if (app.status === 'Interviewed') {
      openOffer(app);
    } else if (app.status === 'Offered') {
      openHire(app);
    }
  };

  const appendNote = (existing: string | null | undefined, line: string) =>
    [existing?.trim(), line].filter(Boolean).join('\n\n');

  // Awaited by ScheduleInterviewDialog — a throw keeps its success toast
  // honest. The booking is written to the first-class interview_* columns
  // (read preferentially by the chip and detail sheet) AND appended to notes
  // as a human-readable line; the status change fires the applicant's push
  // via the service.
  const handleScheduleInterview = async (details: {
    date: string;
    time: string;
    type: 'In-person' | 'Phone' | 'Video';
    location?: string;
  }) => {
    if (!schedulingApp) return;
    const app = schedulingApp;
    const line = `Interview booked: ${formatDate(details.date)}, ${details.time} · ${details.type}${
      details.location ? ` · ${details.location}` : ''
    }`;
    const notes = appendNote(app.notes, line);
    const interview = {
      // Local wall-clock booking → timestamptz
      at: new Date(`${details.date}T${details.time}:00`).toISOString(),
      type: details.type,
      location: details.location ?? null,
    };
    await updateApplicationStatus.mutateAsync({
      id: app.id,
      status: 'Interviewed',
      notes,
      interview,
    });
    if (viewingApplication?.id === app.id) {
      setViewingApplication({
        ...viewingApplication,
        status: 'Interviewed',
        notes,
        interview_at: interview.at,
        interview_type: interview.type,
        interview_location: interview.location,
      });
    }
    setSchedulingApp(null);
  };

  // Awaited by RejectCandidateDialog — only toasts after the write lands.
  const handleRejectConfirm = async (reason: string) => {
    if (!rejectingApp) return;
    const app = rejectingApp;
    const notes = reason ? appendNote(app.notes, `Rejected — ${reason}`) : undefined;
    await updateApplicationStatus.mutateAsync({ id: app.id, status: 'Rejected', notes });
    toast({
      title: 'Candidate rejected',
      description: `${app.applicant_name} has been sent a standard update.`,
    });
    setRejectingApp(null);
    if (viewingApplication?.id === app.id) setViewingApplication(null);
  };

  const handleToggleVacancy = async (vacancy: Vacancy) => {
    // Publishing puts the ad on the PUBLIC job board and offers the matching
    // talent pool an invite — a title-only draft must finish in the wizard
    // (which enforces the full validation) before it can go live.
    if (vacancy.status === 'Draft' && (!vacancy.location?.trim() || !vacancy.description?.trim())) {
      toast({
        title: 'Draft needs finishing',
        description: 'Add a location and description before publishing. Opening the editor.',
      });
      handleEditVacancy(vacancy);
      return;
    }
    try {
      await toggleVacancyStatus.mutateAsync({ id: vacancy.id, currentStatus: vacancy.status });
      // Going live (publish or reopen) — offer the matching talent pool
      if (vacancy.status !== 'Open') {
        setReachJustPublished(true);
        setReachVacancy({ ...vacancy, status: 'Open' });
      }
      toast({
        title:
          vacancy.status === 'Open'
            ? 'Vacancy closed'
            : vacancy.status === 'Draft'
              ? 'Vacancy published'
              : 'Vacancy reopened',
        description:
          vacancy.status === 'Draft'
            ? `${vacancy.title} is now live and taking applications.`
            : `${vacancy.title} is now ${vacancy.status === 'Open' ? 'closed' : 'open'}.`,
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

  // Live "Before you start" line for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !isLoading && vacancies.length === 0
      ? [
          {
            text: 'No vacancies yet. Post one so people can apply.',
            fixLabel: 'Post vacancy',
            onFix: () => setIsWizardOpen(true),
          },
        ]
      : [];

  const heroActions = (
    <HeroActions stretchFirst>
      <PrimaryButton
        data-help="vacancies.post"
        className={heroBtn}
        onClick={() => setIsWizardOpen(true)}
      >
        Post vacancy
      </PrimaryButton>
      <PageHelpButton
        help={VACANCIES_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'vacancies', tab: topTab }}
      />
    </HeroActions>
  );

  const topTabs: { value: TopTab; label: string; count?: number }[] = [
    { value: 'vacancies', label: 'Vacancies', count: vacancies.length },
    { value: 'applications', label: 'Candidates', count: totalApplicants },
    { value: 'conversations', label: 'Messages', count: totalUnread },
  ];

  const vacancyTabs: { value: VacancyTab; label: string; count: number }[] = [
    { value: 'live', label: 'Live', count: openVacancies },
    { value: 'draft', label: 'Draft', count: draftVacancies },
    { value: 'closed', label: 'Closed', count: closedVacancies },
  ];

  // One live line: what is waiting first, else where things stand.
  const liveTodo: string[] = [];
  if (stageCounts.New > 0) liveTodo.push(`${plural(stageCounts.New, 'new candidate')} to review`);
  if (totalUnread > 0) liveTodo.push(`${plural(totalUnread, 'unread message')}`);
  const liveStanding =
    openVacancies > 0
      ? `${plural(openVacancies, 'vacancy', 'vacancies')} live, ${inProgressCount} in progress`
      : draftVacancies > 0
        ? `Nothing live, ${plural(draftVacancies, 'draft')} ready to publish`
        : 'Not hiring right now';
  const liveFirst = liveTodo.join(', ');
  const liveLine =
    liveTodo.length > 0
      ? `${liveFirst.charAt(0).toUpperCase()}${liveFirst.slice(1)}. ${liveStanding}.`
      : `${liveStanding}.`;

  const openStage = (stage: StatusFilter) => {
    setStatusFilter(stage);
    setTopTab('applications');
  };

  const vacancyPill = (status: string) => (
    <StatusPill tone={status === 'Open' ? 'green' : status === 'Closed' ? 'red' : 'neutral'}>
      {status === 'Open' ? 'Live' : status}
    </StatusPill>
  );

  const stagePill = (status: string) => (
    <StatusPill tone={stagePillTone[status] ?? 'neutral'}>{status}</StatusPill>
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero title="Job vacancies" description={liveLine} actions={heroActions} />

      <HowItWorks
        help={VACANCIES_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'vacancies', tab: topTab }}
      />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Live vacancies',
            value: openVacancies,
            sub: draftVacancies > 0 ? `${draftVacancies} in draft` : undefined,
            onClick: () => {
              setTopTab('vacancies');
              setVacancyTab('live');
            },
          },
          {
            label: 'New candidates',
            value: stageCounts.New,
            tone: stageCounts.New > 0 ? 'yellow' : undefined,
            sub: `${totalApplicants} in total`,
            onClick: () => openStage('New'),
          },
          {
            label: 'In progress',
            value: inProgressCount,
            sub: 'Shortlist, interview, offer',
            onClick: () => openStage('all'),
          },
          {
            label: 'Hired',
            value: hiredLast30,
            sub: 'Last 30 days',
            onClick: () => openStage('Hired'),
          },
        ]}
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <div data-help="vacancies.tabs" className="flex">
            <Segments items={topTabs} value={topTab} onChange={(v) => setTopTab(v)} />
          </div>

          {topTab === 'vacancies' && (
            <div className={twoColClass}>
              <div className={colClass}>
                <div data-help="vacancies.status-tabs">
                  <FilterRow>
                    <Segments
                      quiet
                      items={vacancyTabs}
                      value={vacancyTab}
                      onChange={(v) => setVacancyTab(v)}
                    />
                    <SearchField
                      value={vacancySearch}
                      onChange={setVacancySearch}
                      placeholder="Search vacancies"
                      className="lg:w-72"
                    />
                  </FilterRow>
                </div>

                {filteredVacancies.length === 0 ? (
                  <PlainEmpty
                    text={
                      vacancySearch
                        ? 'No vacancy matches that search.'
                        : vacancyTab === 'live'
                          ? 'No live vacancies. Post a role and it goes on the Elec-Mate job board, and you can invite people from the talent pool.'
                          : `No ${vacancyTab} vacancies.`
                    }
                    action={vacancyTab === 'live' && !vacancySearch ? 'Post vacancy' : undefined}
                    onAction={
                      vacancyTab === 'live' && !vacancySearch
                        ? () => setIsWizardOpen(true)
                        : undefined
                    }
                  />
                ) : (
                  <div data-help="vacancies.list">
                    <RowList>
                      {filteredVacancies.map((v) => {
                        const applicantCount = getApplicationsForVacancy(v.id).length;
                        const rate = formatRate(v.salary_min, v.salary_max, v.salary_period);
                        const sent = invitationCounts?.byVacancy[v.id]?.sent ?? 0;
                        return (
                          <Row
                            key={v.id}
                            title={v.title}
                            detail={`${v.location || 'Location to be confirmed'} · ${rate}`}
                            meta={`${plural(applicantCount, 'applicant')}${sent > 0 ? ` · ${sent} invited` : ''}`}
                            trailing={vacancyPill(v.status)}
                            onClick={() => setViewingVacancy(v)}
                          />
                        );
                      })}
                    </RowList>
                  </div>
                )}
              </div>

              <div className={colClass}>
                <section>
                  <PanelTitle
                    title="Candidates"
                    meta={totalApplicants > 0 ? `${totalApplicants} in total` : undefined}
                    action={totalApplicants > 0 ? 'All' : undefined}
                    onAction={totalApplicants > 0 ? () => openStage('all') : undefined}
                  />
                  <div className={cn(panel, 'overflow-hidden')}>
                    <div className={rowsClass}>
                      {PIPELINE_STAGES.map((st) => (
                        <KeyValue
                          key={st.value}
                          label={st.label}
                          value={stageCounts[st.value]}
                          tone={st.value === 'New' && stageCounts.New > 0 ? 'yellow' : undefined}
                          onClick={() => openStage(st.value)}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <PanelTitle title="Talent pool" />
                  <div className={cn(panel, 'overflow-hidden')}>
                    <div className={rowsClass}>
                      <KeyValue label="Invited to apply" value={invitedTotal} />
                      <KeyValue label="Applied after an invite" value={invitedApplied} />
                    </div>
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-white">
                    Open a live vacancy to invite people who switched on Let firms find me.
                  </p>
                </section>
              </div>
            </div>
          )}

          {topTab === 'applications' && (
            <div className="space-y-4">
              <PipelineStrip
                counts={stageCounts}
                total={totalApplicants}
                active={statusFilter}
                onChange={(v) => setStatusFilter(v)}
              />

              <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                <SearchField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search candidates"
                  className="lg:w-72"
                />
                {/* 2-col grid on a phone, one row from lg up */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                  <Select value={tierFilter} onValueChange={(v) => setTierFilter(v as TierFilter)}>
                    <SelectTrigger className={`${selectTriggerClass} w-full sm:w-[150px]`}>
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
                    <SelectTrigger className={`${selectTriggerClass} w-full sm:w-[170px]`}>
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
                    <SelectTrigger className={`${selectTriggerClass} w-full sm:w-[150px]`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="date-desc">Newest first</SelectItem>
                      <SelectItem value="date-asc">Oldest first</SelectItem>
                      <SelectItem value="stale">Waiting longest</SelectItem>
                      <SelectItem value="name">Name A to Z</SelectItem>
                    </SelectContent>
                  </Select>

                  <button
                    type="button"
                    onClick={toggleSelectionMode}
                    aria-pressed={selectionMode}
                    className={cn(
                      rowBtn,
                      'rounded-full border',
                      selectionMode
                        ? 'border-white bg-white text-black'
                        : 'border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    )}
                  >
                    {selectionMode ? 'Done' : 'Select'}
                  </button>
                </div>
              </div>

              {filteredApplications.length === 0 ? (
                <PlainEmpty
                  text={
                    tierFilter !== 'all' || vacancyFilter !== 'all' || searchQuery
                      ? 'No candidates match. Change the filters or the search.'
                      : statusFilter !== 'all'
                        ? `${stageEmptyCopy[statusFilter].title}. ${stageEmptyCopy[statusFilter].description}`
                        : 'No candidates yet. Applications show here when people apply to your vacancies.'
                  }
                />
              ) : (
                <div
                  className="grid grid-cols-1 gap-3 xl:grid-cols-2"
                  data-help="vacancies.candidates"
                >
                  {filteredApplications.map((app) => {
                    const isSelected = selectedApplicants.has(app.id);
                    return (
                      <CandidateCard
                        key={app.id}
                        app={app}
                        vacancyTitle={
                          vacancies.find((v) => v.id === app.vacancy_id)?.title || 'Unknown role'
                        }
                        selectionMode={selectionMode}
                        isSelected={isSelected}
                        onToggleSelect={() => handleSelectionChange(app.id, !isSelected)}
                        onOpen={() => setViewingApplication(app)}
                        advanceLabel={advanceLabels[app.status] ?? null}
                        onAdvance={() => handleAdvance(app)}
                        onReject={
                          app.status !== 'Hired' && app.status !== 'Rejected'
                            ? () => setRejectingApp(app)
                            : undefined
                        }
                        onReinstate={
                          app.status === 'Rejected'
                            ? () => handleUpdateStatus(app.id, 'New', app.applicant_name)
                            : undefined
                        }
                        actionPending={updateApplicationStatus.isPending || isHiring}
                      />
                    );
                  })}
                </div>
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
        onSuccess={(published) => {
          handleWizardClose();
          if (published?.status === 'Open') {
            setReachJustPublished(true);
            setReachVacancy(published);
          }
        }}
        editData={
          editingVacancy
            ? {
                id: editingVacancy.id,
                title: editingVacancy.title,
                type: editingVacancy.type as any,
                location: editingVacancy.location,
                workArrangement: (editingVacancy.work_arrangement || 'On-site') as any,
                experienceLevel: (editingVacancy.experience_level || 'Mid') as any,
                postcode: editingVacancy.postcode || '',
                schedule: editingVacancy.schedule || '',
                startDate: editingVacancy.start_date || '',
                niceToHave: editingVacancy.nice_to_have || [],
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
                workArrangement: (duplicatingVacancy.work_arrangement || 'On-site') as any,
                experienceLevel: (duplicatingVacancy.experience_level || 'Mid') as any,
                postcode: duplicatingVacancy.postcode || '',
                schedule: duplicatingVacancy.schedule || '',
                startDate: '',
                niceToHave: duplicatingVacancy.nice_to_have || [],
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
                description: duplicatingVacancy.description || '',
                closingDate: '',
              }
            : undefined
        }
      />

      <FormSheet
        open={!!viewingVacancy}
        onOpenChange={(open) => !open && setViewingVacancy(null)}
        width="wide"
        title={viewingVacancy?.title ?? 'Vacancy'}
        description={
          viewingVacancy
            ? [
                viewingVacancy.status === 'Open' ? 'Live' : viewingVacancy.status,
                viewingVacancy.type,
                viewingVacancy.location || 'Location to be confirmed',
                formatRate(
                  viewingVacancy.salary_min,
                  viewingVacancy.salary_max,
                  viewingVacancy.salary_period
                ),
              ]
                .filter(Boolean)
                .join(' · ')
            : undefined
        }
        footer={
          viewingVacancy ? (
            <div data-help="vacancies.vacancy-actions" className="flex gap-2">
              <button
                type="button"
                className={cn(rowBtnSecondary, 'h-12 flex-1 lg:flex-none lg:px-5')}
                onClick={() => {
                  handleDuplicateVacancy(viewingVacancy);
                  setViewingVacancy(null);
                }}
              >
                Duplicate
              </button>
              {viewingVacancy.status === 'Draft' ? (
                <>
                  <button
                    type="button"
                    className={cn(rowBtnSecondary, 'h-12 flex-1 lg:flex-none lg:px-5')}
                    onClick={() => {
                      handleEditVacancy(viewingVacancy);
                      setViewingVacancy(null);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={cn(rowBtnPrimary, 'h-12 flex-1 lg:flex-none lg:px-6')}
                    onClick={() => {
                      handleToggleVacancy(viewingVacancy);
                      setViewingVacancy(null);
                    }}
                  >
                    Publish
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={cn(rowBtnSecondary, 'h-12 flex-1 lg:flex-none lg:px-5')}
                    onClick={() => {
                      handleToggleVacancy(viewingVacancy);
                      setViewingVacancy(null);
                    }}
                  >
                    {viewingVacancy.status === 'Open' ? 'Pause' : 'Reopen'}
                  </button>
                  <button
                    type="button"
                    className={cn(rowBtnPrimary, 'h-12 flex-1 lg:flex-none lg:px-6')}
                    onClick={() => {
                      handleEditVacancy(viewingVacancy);
                      setViewingVacancy(null);
                    }}
                  >
                    Edit vacancy
                  </button>
                </>
              )}
            </div>
          ) : undefined
        }
      >
        {viewingVacancy && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <div className="min-w-0 space-y-6">
              {viewingVacancy.status === 'Open' && (
                <section>
                  <PanelTitle title="Talent pool" />
                  <RowList>
                    <Row
                      title="Invite matching electricians"
                      detail={(() => {
                        const c = invitationCounts?.byVacancy[viewingVacancy.id];
                        return c && c.sent > 0
                          ? `${c.sent} invited · ${c.applied} applied`
                          : 'People who opted in to be found. They apply with their Elec-ID.';
                      })()}
                      trailing={<StatusPill tone="volt">Invite</StatusPill>}
                      onClick={() => {
                        setReachJustPublished(false);
                        setReachVacancy(viewingVacancy);
                        setViewingVacancy(null);
                      }}
                    />
                  </RowList>
                </section>
              )}

              {viewingVacancy.description && (
                <section>
                  <PanelTitle title="Description" />
                  <div className={cn(panel, 'px-4 py-3 sm:px-5')}>
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                      {viewingVacancy.description}
                    </p>
                  </div>
                </section>
              )}

              {(() => {
                const apps = getApplicationsForVacancy(viewingVacancy.id);
                if (apps.length === 0) return null;
                return (
                  <section>
                    <PanelTitle
                      title="Recent applicants"
                      meta={`${apps.length}`}
                      action="View all"
                      onAction={() => handleViewApplicants(viewingVacancy.id)}
                    />
                    <RowList>
                      {apps.slice(0, 5).map((app) => (
                        <Row
                          key={app.id}
                          lead={<Initials name={app.applicant_name} />}
                          title={app.applicant_name}
                          detail={`Applied ${formatDate(app.applied_at)}`}
                          trailing={stagePill(app.status)}
                          onClick={() => {
                            setViewingVacancy(null);
                            setViewingApplication(app);
                          }}
                        />
                      ))}
                    </RowList>
                  </section>
                );
              })()}
            </div>

            <div className="min-w-0 space-y-6">
              <section>
                <PanelTitle title="At a glance" />
                <div className={cn(panel, 'overflow-hidden')}>
                  <div className={rowsClass}>
                    <KeyValue
                      label="Applicants"
                      value={getApplicationsForVacancy(viewingVacancy.id).length}
                    />
                    <KeyValue label="Views" value={viewingVacancy.views || 0} />
                    <KeyValue label="Posted" value={formatDate(viewingVacancy.created_at)} />
                  </div>
                </div>
              </section>

              {viewingVacancy.requirements && viewingVacancy.requirements.length > 0 && (
                <section>
                  <PanelTitle title="Requirements" />
                  <RowList>
                    {viewingVacancy.requirements.map((req, i) => (
                      <Row key={i} title={req} />
                    ))}
                  </RowList>
                </section>
              )}

              {viewingVacancy.benefits && viewingVacancy.benefits.length > 0 && (
                <section>
                  <PanelTitle title="Benefits" />
                  <RowList>
                    {viewingVacancy.benefits.map((bn, i) => (
                      <Row key={i} title={bn} />
                    ))}
                  </RowList>
                </section>
              )}
            </div>
          </div>
        )}
      </FormSheet>

      <FormSheet
        open={!!viewingApplication}
        onOpenChange={(open) => !open && setViewingApplication(null)}
        width="wide"
        title={viewingApplication?.applicant_name ?? 'Candidate'}
        description={
          viewingApplication
            ? `${viewingApplication.status} · applied for ${
                vacancies.find((v) => v.id === viewingApplication.vacancy_id)?.title ||
                'an unknown role'
              } on ${formatDate(viewingApplication.applied_at)}`
            : undefined
        }
        footer={
          viewingApplication && viewingApplication.status !== 'Hired' ? (
            <div className="flex gap-2">
              {/* Reject is destructive and separated; reason captured via
                  dialog and kept in private notes */}
              {viewingApplication.status !== 'Rejected' && (
                <button
                  type="button"
                  className={cn(
                    rowBtn,
                    'h-12 flex-1 border border-red-500/40 text-red-400 hover:bg-red-500/10 lg:flex-none lg:px-5'
                  )}
                  onClick={() => setRejectingApp(viewingApplication)}
                >
                  Reject
                </button>
              )}
              {(viewingApplication.status === 'New' ||
                viewingApplication.status === 'Reviewing') && (
                <button
                  type="button"
                  className={cn(rowBtnPrimary, 'h-12 flex-[2] lg:flex-none lg:px-6')}
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
                </button>
              )}
              {viewingApplication.status === 'Shortlisted' && (
                // Entering Interview always books: the applicant push for
                // this stage says "Interview Scheduled"
                <button
                  type="button"
                  className={cn(rowBtnPrimary, 'h-12 flex-[2] lg:flex-none lg:px-6')}
                  onClick={() => setSchedulingApp(viewingApplication)}
                >
                  Schedule interview
                </button>
              )}
              {viewingApplication.status === 'Interviewed' && (
                <button
                  type="button"
                  className={cn(rowBtnPrimary, 'h-12 flex-[2] lg:flex-none lg:px-6')}
                  onClick={() => openOffer(viewingApplication)}
                >
                  Make offer
                </button>
              )}
              {viewingApplication.status === 'Offered' && (
                <button
                  type="button"
                  className={cn(rowBtnPrimary, 'h-12 flex-[2] lg:flex-none lg:px-6')}
                  disabled={isHiring}
                  onClick={() => openHire(viewingApplication)}
                >
                  {isHiring ? 'Hiring…' : `Hire ${viewingApplication.applicant_name.split(' ')[0]}`}
                </button>
              )}
              {viewingApplication.status === 'Rejected' && (
                <button
                  type="button"
                  className={cn(rowBtnSecondary, 'h-12 flex-1 lg:flex-none lg:px-6')}
                  onClick={() => {
                    handleUpdateStatus(
                      viewingApplication.id,
                      'New',
                      viewingApplication.applicant_name
                    );
                    setViewingApplication(null);
                  }}
                >
                  Reinstate to New
                </button>
              )}
            </div>
          ) : undefined
        }
      >
        {viewingApplication && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <div className="min-w-0 space-y-6">
              {/* ELE-2091: the offer that goes onto their record at hire */}
              {canSeeMoney && viewingOffer && viewingApplication.status !== 'Rejected' && (
                <section>
                  <PanelTitle
                    title="Offer"
                    action={viewingApplication.status === 'Offered' ? 'Edit' : undefined}
                    onAction={() => setHireSheet({ mode: 'offer', app: viewingApplication })}
                  />
                  <div className={cn(panel, 'overflow-hidden')}>
                    <div className={rowsClass}>
                      <KeyValue
                        label="Pay"
                        value={
                          viewingOffer.pay_type === 'annual'
                            ? viewingOffer.annual_salary
                              ? `£${Number(viewingOffer.annual_salary).toLocaleString('en-GB')} a year`
                              : 'Not set'
                            : viewingOffer.hourly_rate
                              ? `£${Number(viewingOffer.hourly_rate).toFixed(2)} an hour`
                              : 'Not set'
                        }
                      />
                      <KeyValue
                        label="Starts"
                        value={
                          viewingOffer.start_date ? formatDate(viewingOffer.start_date) : 'Not set'
                        }
                      />
                      <KeyValue
                        label="Role"
                        value={
                          [
                            viewingOffer.job_title,
                            viewingOffer.team_role && viewingOffer.team_role !== 'Operative'
                              ? viewingOffer.team_role
                              : null,
                          ]
                            .filter(Boolean)
                            .join(', ') || 'Electrician'
                        }
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* Booking reads the first-class interview_* columns, falling
                  back to the structured notes line on legacy rows */}
              {(() => {
                const booked = interviewSummary(viewingApplication);
                return booked ? (
                  <section>
                    <PanelTitle title="Interview" />
                    <RowList>
                      <Row title={booked} detail="Booked" />
                    </RowList>
                  </section>
                ) : null;
              })()}

              {applicantCredentials && applicantCredentials.qualifications.length > 0 && (
                <section>
                  <PanelTitle
                    title="Qualifications"
                    meta={`${applicantCredentials.qualifications.length}`}
                  />
                  <RowList>
                    {applicantCredentials.qualifications.map((q) => (
                      <Row
                        key={q.id}
                        title={getQualificationLabel(q.qualification_name)}
                        detail={q.awarding_body || undefined}
                        trailing={
                          q.is_verified ? (
                            <StatusPill tone="green">Verified at source</StatusPill>
                          ) : undefined
                        }
                      />
                    ))}
                  </RowList>
                </section>
              )}

              {applicantCredentials && applicantCredentials.workHistory.length > 0 && (
                <section>
                  <PanelTitle
                    title="Work history"
                    meta={`${applicantCredentials.workHistory.length}`}
                  />
                  <RowList>
                    {applicantCredentials.workHistory.map((w) => (
                      <Row
                        key={w.id}
                        title={[jobTitleText(w.job_title), w.employer_name]
                          .filter(Boolean)
                          .join(', ')}
                        detail={`${w.start_date ? new Date(w.start_date).getFullYear() : ''}${
                          w.is_current
                            ? ' to now'
                            : w.end_date
                              ? ` to ${new Date(w.end_date).getFullYear()}`
                              : ''
                        }`}
                      />
                    ))}
                  </RowList>
                </section>
              )}

              {applicantCredentials && applicantCredentials.skills.length > 0 && (
                <section>
                  <PanelTitle title="Skills" meta={`${applicantCredentials.skills.length}`} />
                  <RowList>
                    {applicantCredentials.skills.map((sk) => (
                      <Row
                        key={sk.id}
                        title={sk.skill_name}
                        detail={[
                          sk.skill_level,
                          sk.years_experience ? `${sk.years_experience} yrs` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      />
                    ))}
                  </RowList>
                </section>
              )}

              {viewingApplication.cover_letter && (
                <section>
                  <PanelTitle title="Cover letter" />
                  <div className={cn(panel, 'px-4 py-3 sm:px-5')}>
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                      {viewingApplication.cover_letter}
                    </p>
                  </div>
                </section>
              )}
            </div>

            <div className="min-w-0 space-y-6">
              {(viewingApplication.applicant_email || viewingApplication.applicant_phone) && (
                <section>
                  <PanelTitle title="Contact" />
                  <RowList>
                    {viewingApplication.applicant_email && (
                      <Row title={viewingApplication.applicant_email} detail="Email" />
                    )}
                    {viewingApplication.applicant_phone && (
                      <Row title={viewingApplication.applicant_phone} detail="Phone" />
                    )}
                  </RowList>
                </section>
              )}

              {(viewingApplication.elec_id_profile || viewingApplication.cv_url) && (
                <section>
                  <PanelTitle title="Elec-ID and CV" />
                  <RowList>
                    {viewingApplication.elec_id_profile && (
                      <Row
                        title={viewingApplication.elec_id_profile.elec_id_number}
                        detail={
                          viewingApplication.elec_id_profile.ecs_card_type
                            ? getEcsCardLabel(viewingApplication.elec_id_profile.ecs_card_type)
                            : 'Elec-ID number'
                        }
                        trailing={
                          viewingApplication.elec_id_profile.verification_tier ? (
                            <StatusPill>
                              {viewingApplication.elec_id_profile.verification_tier
                                .charAt(0)
                                .toUpperCase() +
                                viewingApplication.elec_id_profile.verification_tier.slice(1)}
                            </StatusPill>
                          ) : undefined
                        }
                      />
                    )}
                    {/* The one document the candidate explicitly submitted */}
                    {viewingApplication.cv_url && (
                      <Row
                        title="Attached CV"
                        detail="Submitted with this application"
                        onClick={() =>
                          window.open(viewingApplication.cv_url!, '_blank', 'noopener,noreferrer')
                        }
                      />
                    )}
                  </RowList>
                </section>
              )}

              {/* Interview notes: at 20 applicants, "who said what on the
                  phone" lives here, not in someone's head. */}
              <CandidateNotesSection
                notes={viewingApplication.notes}
                updatedAt={viewingApplication.updated_at}
                onSave={async (notes) => {
                  await updateApplicationNotes.mutateAsync({
                    id: viewingApplication.id,
                    notes,
                  });
                  // Keep the open sheet in sync: the list refetch doesn't
                  // reach this locally-held copy
                  setViewingApplication({ ...viewingApplication, notes });
                  toast({ title: 'Notes saved' });
                }}
              />
            </div>
          </div>
        )}
      </FormSheet>

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

      {/* Booking is the only door into the Interview stage — the dialog awaits
          the write, so its success toast can't lie */}
      <ScheduleInterviewDialog
        open={!!schedulingApp}
        onOpenChange={(open) => !open && setSchedulingApp(null)}
        candidateName={schedulingApp?.applicant_name ?? ''}
        onSchedule={handleScheduleInterview}
      />

      <ReachTalentPoolSheet
        open={!!reachVacancy}
        onOpenChange={(open) => !open && setReachVacancy(null)}
        vacancy={reachVacancy}
        justPublished={reachJustPublished}
      />

      <HireStarterSheet
        open={!!hireSheet}
        onOpenChange={(open) => !open && setHireSheet(null)}
        mode={hireSheet?.mode ?? 'offer'}
        application={hireSheet?.app ?? null}
        vacancy={vacancies.find((v) => v.id === hireSheet?.app.vacancy_id) ?? null}
        busy={saveOffer.isPending || hireAndOnboard.isPending || updateApplicationStatus.isPending}
        onSubmit={handleHireSheetSubmit}
      />

      <RejectCandidateDialog
        open={!!rejectingApp}
        onOpenChange={(open) => !open && setRejectingApp(null)}
        candidateName={rejectingApp?.applicant_name ?? ''}
        onConfirm={handleRejectConfirm}
      />
    </PageFrame>
  );
}
