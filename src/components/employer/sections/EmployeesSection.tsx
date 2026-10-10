import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  RefreshCw,
  MessageSquare,
  Briefcase,
  X,
  CheckSquare,
  ListChecks,
  Send,
  Mail,
  Link2,
  Plus,
  Loader2,
} from 'lucide-react';
import { formatDistanceToNowStrict, parseISO, differenceInCalendarDays } from 'date-fns';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useRtwStatusMap, RTW_STATUS_LABEL } from '@/hooks/useRightToWork';
import { useTeamInviteHistory, useChaseTeamInvite, inviteLink } from '@/hooks/useTeamInvites';
import { TeamInviteSheet } from '@/components/employer/sheets/TeamInviteSheet';
import { copyToClipboard } from '@/utils/clipboard';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  HeroActions,
  Initials,
  PlainEmpty,
  Row,
  Tag,
  colClass,
  filterStack,
  heroBtn,
  frameClass,
  rowBtnPrimary,
  rowBtnSecondary,
  rowsClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useEmployees } from '@/hooks/useEmployees';
import { useWorkerLocations } from '@/hooks/useWorkerLocations';
import { AddEmployeeDialog } from '@/components/employer/dialogs/AddEmployeeDialog';
import { EditEmployeeDialog } from '@/components/employer/dialogs/EditEmployeeDialog';
import { TeamMemberSheet } from '@/components/employer/TeamMemberSheet';
import { AssignToJobDialog } from '@/components/employer/dialogs/AssignToJobDialog';
import { SendMessageDialog } from '@/components/employer/dialogs/SendMessageDialog';
import { BulkAssignDialog } from '@/components/employer/dialogs/BulkAssignDialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import { createCommunication } from '@/services/communicationService';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  Avatar,
  IconButton,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  checkboxClass,
} from '@/components/employer/editorial';
import type { Employee } from '@/services/employeeService';
import { TEAM_ROLES, toTeamRole, type TeamRole } from '@/lib/teamRoles';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { TEAM_HELP } from '@/components/employer/help/people';

type AvailabilityStatus = 'Available' | 'On Job' | 'On Leave' | 'Unavailable';
// ELE-1951: Active (joined) / Invited (added, never signed in) / Archived.
// The old 'pending' tab was labelled Archived and counted archived rows; the
// people who actually needed chasing had no tab at all.
type FilterTab = 'active' | 'invited' | 'archived';
const TAB_ALIASES: Record<string, FilterTab> = {
  active: 'active',
  all: 'active',
  invited: 'invited',
  invites: 'invited',
  archived: 'archived',
  pending: 'archived',
};
type SortKey = 'name' | 'team_role' | 'rate' | 'newest';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'team_role', label: 'Team role' },
  { value: 'rate', label: 'Hourly rate (high first)' },
  { value: 'newest', label: 'Recently added' },
];

const getAvailability = (employee: Employee): AvailabilityStatus => {
  if (employee.status === 'On Leave') return 'On Leave';
  if (employee.status === 'Archived') return 'Unavailable';
  if (employee.active_jobs_count > 0) return 'On Job';
  return 'Available';
};

const getTeamRole = (role: string): TeamRole => toTeamRole(role);

type WorkerTypeFilter = 'all' | 'employee' | 'apprentice' | 'subcontractor';
const WORKER_TYPE_FILTERS: { value: WorkerTypeFilter; label: string }[] = [
  { value: 'all', label: 'Everyone' },
  { value: 'employee', label: 'Employees' },
  { value: 'apprentice', label: 'Apprentices' },
  { value: 'subcontractor', label: 'Subcontractors' },
];
const workerTypeOf = (role: string): Exclude<WorkerTypeFilter, 'all'> => {
  const r = toTeamRole(role);
  return r === 'Apprentice' ? 'apprentice' : r === 'Subcontractor' ? 'subcontractor' : 'employee';
};

const getInitials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
};

export function EmployeesSection() {
  const { data: employees = [], isLoading, error, refetch, isRefetching } = useEmployees();
  // Live on-site presence (clock-in derived) keyed by employee id — drives the
  // real-time "On site" pill so the roster shows who's actually working now.
  // Rows older than 12h are history, not presence — same staleness rule as the
  // Worker Tracking page, so the roster and the map tell one truth.
  const { data: workerLocations = [] } = useWorkerLocations();
  const liveStatusByEmployee = useMemo(() => {
    const m = new Map<string, string>();
    const staleCutoff = Date.now() - 12 * 60 * 60 * 1000;
    for (const loc of workerLocations) {
      if (!loc.employee_id || !loc.status) continue;
      if (!loc.last_updated || new Date(loc.last_updated).getTime() < staleCutoff) continue;
      m.set(loc.employee_id, loc.status);
    }
    return m;
  }, [workerLocations]);
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;
  const { data: seatInfo } = useQuery({
    queryKey: ['employer-seat-summary'],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) return { active: 0, cap: null, comped: false };
      // Scoped to THIS firm — RLS alone also returns the viewer's own seat in
      // any other firm they work for, which inflated the count (ELE-1951).
      const firm = (await getActingEmployerId(auth.user.id)) ?? auth.user.id;
      const { count } = await supabase
        .from('employer_seats')
        .select('id', { count: 'exact', head: true })
        .eq('employer_id', firm)
        .eq('status', 'active');
      let cap: number | null = null;
      let comped = false;
      {
        // ELE-2020: a manager can't read the owner's profile row, so the
        // firm's seat terms come from a firm-scoped RPC.
        const { data: terms } = await supabase.rpc('get_firm_seat_terms', { p_firm: firm });
        const prof = terms?.[0] ?? null;
        cap = prof?.employer_seat_cap ?? null;
        comped = prof?.free_access_granted === true;
      }
      return { active: count ?? 0, cap, comped };
    },
    staleTime: 60 * 1000,
  });
  const activeSeatCount = seatInfo?.active ?? 0;
  // Live seat summary — "3 of 5 seats in use". No £ figure: seat billing is
  // dormant until EMPLOYER_SEAT_PRICE_ID is configured (manage-employer-seats
  // no-ops), and the client can't see that secret — quoting a monthly cost
  // nobody is charged would be a fabricated number.
  const seatSummary = (() => {
    if (activeSeatCount === 0) return '';
    const ofCap = seatInfo?.cap != null ? ` of ${seatInfo.cap}` : '';
    const comped = seatInfo?.comped ? ' · free on your plan' : '';
    return ` ${activeSeatCount}${ofCap} seat${activeSeatCount === 1 ? '' : 's'} in use${comped}.`;
  })();

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTabState] = useState<FilterTab>('active');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<TeamRole[]>([]);
  // ELE-1830: employee / apprentice / subcontractor at a glance.
  const [workerType, setWorkerType] = useState<WorkerTypeFilter>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityStatus[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Deep link: ?member={employee_id} opens that worker's record directly —
  // cross-links from Credentials (and elsewhere) land here
  const [searchParams, setSearchParams] = useSearchParams();
  const memberParam = searchParams.get('member');
  // ?tab=invited lands the Overview "haven't joined yet" row on the right tab
  const tabParam = searchParams.get('tab');
  useEffect(() => {
    const t = tabParam ? TAB_ALIASES[tabParam] : undefined;
    if (t) setActiveTabState(t);
  }, [tabParam]);
  const setActiveTab = (t: FilterTab) => {
    setActiveTabState(t);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (t === 'active') next.delete('tab');
        else next.set('tab', t);
        return next;
      },
      { replace: true }
    );
  };
  const { data: inviteHistory } = useTeamInviteHistory();
  const chaseInvite = useChaseTeamInvite();
  const [chasingId, setChasingId] = useState<string | null>(null);
  const [teamCodeOpen, setTeamCodeOpen] = useState(false);
  const handleChase = (employee: Employee) => {
    setChasingId(employee.id);
    chaseInvite.mutate(employee.id, {
      onSuccess: () =>
        toast({
          title: 'Reminder sent',
          description: `A fresh invite is on its way to ${employee.email}.`,
        }),
      onError: (err) =>
        toast({
          title: 'Not sent',
          description: err instanceof Error ? err.message : 'Try again.',
          variant: 'destructive',
        }),
      onSettled: () => setChasingId(null),
    });
  };
  const handleCopyLink = async (employee: Employee) => {
    const token = inviteHistory?.get(employee.id)?.liveToken;
    if (!token) {
      toast({
        title: 'No live link',
        description: 'Send a reminder first. That makes a fresh link.',
      });
      return;
    }
    await copyToClipboard(inviteLink(token));
    toast({
      title: 'Link copied',
      description: `Send it only to ${employee.name.split(' ')[0]}: whoever opens it joins as them.`,
    });
  };
  useEffect(() => {
    if (!memberParam || employees.length === 0) return;
    const target = employees.find((e) => e.id === memberParam);
    if (target) {
      setSelectedEmployee(target);
      setProfileSheetOpen(true);
    }
    // Consume the param so closing the sheet doesn't re-open it
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('member');
        return next;
      },
      { replace: true }
    );
  }, [memberParam, employees, setSearchParams]);
  const [assignJobDialogOpen, setAssignJobDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [bulkAssignDialogOpen, setBulkAssignDialogOpen] = useState(false);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);

  const activeEmployees = useMemo(
    () => employees.filter((e) => e.status !== 'Archived'),
    [employees]
  );

  const joinedEmployees = useMemo(
    () => activeEmployees.filter((e) => !!e.user_id),
    [activeEmployees]
  );
  const invitedEmployees = useMemo(
    () => activeEmployees.filter((e) => !e.user_id),
    [activeEmployees]
  );
  const onLeaveCount = activeEmployees.filter((e) => getAvailability(e) === 'On Leave').length;
  const archivedCount = employees.filter((e) => e.status === 'Archived').length;

  const tabFilteredEmployees = useMemo(() => {
    if (activeTab === 'invited') return invitedEmployees;
    if (activeTab === 'archived') return employees.filter((e) => e.status === 'Archived');
    return joinedEmployees;
  }, [activeTab, invitedEmployees, joinedEmployees, employees]);

  const filteredEmployees = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matched = tabFilteredEmployees.filter((emp) => {
      // Search the whole record — owners look people up by email and phone as
      // often as by name ("who's on 07700…?")
      const matchesSearch =
        !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.role.toLowerCase().includes(q) ||
        (emp.email ?? '').toLowerCase().includes(q) ||
        (emp.phone ?? '').replace(/\s+/g, '').includes(q.replace(/\s+/g, ''));
      const matchesRole =
        selectedRoles.length === 0 || selectedRoles.includes(getTeamRole(emp.team_role));
      const matchesAvailability =
        selectedAvailability.length === 0 || selectedAvailability.includes(getAvailability(emp));
      const matchesType = workerType === 'all' || workerTypeOf(emp.team_role) === workerType;
      return matchesSearch && matchesRole && matchesAvailability && matchesType;
    });
    const sorted = [...matched];
    switch (sortBy) {
      case 'team_role':
        sorted.sort(
          (a, b) =>
            getTeamRole(a.team_role).localeCompare(getTeamRole(b.team_role)) ||
            a.name.localeCompare(b.name)
        );
        break;
      case 'rate':
        sorted.sort((a, b) => (b.hourly_rate ?? 0) - (a.hourly_rate ?? 0));
        break;
      case 'newest':
        sorted.sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''));
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [tabFilteredEmployees, searchQuery, selectedRoles, selectedAvailability, sortBy, workerType]);

  // ELE-2061: Checked / Due / Missing on every row.
  const { map: rtwMap } = useRtwStatusMap();

  const handleItemClick = (employee: Employee) => {
    if (multiSelectMode) {
      toggleEmployeeSelection(employee.id);
    } else {
      setSelectedEmployee(employee);
      setProfileSheetOpen(true);
    }
  };

  const toggleRole = (role: TeamRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleAvailability = (status: AvailabilityStatus) => {
    setSelectedAvailability((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedRoles([]);
    setSelectedAvailability([]);
  };

  const toggleEmployeeSelection = (id: string) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const selectAllEmployees = () => {
    setSelectedEmployeeIds(filteredEmployees.map((e) => e.id));
  };

  const clearEmployeeSelection = () => {
    setSelectedEmployeeIds([]);
  };

  const [bulkMessageText, setBulkMessageText] = useState('');
  const [bulkMessageOpen, setBulkMessageOpen] = useState(false);

  const handleBulkMessage = async () => {
    const selectedEmps = employees.filter((e) => selectedEmployeeIds.includes(e.id));
    if (!bulkMessageText.trim() || selectedEmps.length === 0) return;
    try {
      await createCommunication({
        sender_id: null,
        type: 'message',
        title: `Message to ${selectedEmps.length} team member${selectedEmps.length === 1 ? '' : 's'}`,
        content: bulkMessageText.trim(),
        priority: 'normal',
        target_audience: 'specific',
        target_employee_ids: selectedEmps.map((e) => e.id),
        attachments: null,
        is_pinned: false,
        expires_at: null,
      });
      toast({ title: 'Message sent', description: `Sent to ${selectedEmps.length} team members.` });
      setBulkMessageText('');
      setBulkMessageOpen(false);
      clearEmployeeSelection();
      setMultiSelectMode(false);
    } catch {
      toast({
        title: 'Send failed',
        description: 'Could not send the message.',
        variant: 'destructive',
      });
    }
  };

  const exitMultiSelect = () => {
    clearEmployeeSelection();
    setMultiSelectMode(false);
  };

  const hasActiveFilters = selectedRoles.length > 0 || selectedAvailability.length > 0;
  const filterCount = selectedRoles.length + selectedAvailability.length;

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  if (employees.length === 0) {
    helpBlockers.push({
      text: 'No one on the team yet. Add your first person to send them an invite.',
      fixLabel: 'Add team member',
      onFix: () => setAddEmployeeDialogOpen(true),
    });
  } else if (invitedEmployees.length > 0) {
    helpBlockers.push({
      text: `${invitedEmployees.length} ${invitedEmployees.length === 1 ? 'person has' : 'people have'} not joined yet, so they can’t use the app for your firm.`,
      fixLabel: 'See who',
      onFix: () => setActiveTab('invited'),
    });
  }

  // Where the team stands, in one line.
  const heroLine = (() => {
    // Same definition as the Overview (ELE-2086): everyone active on the roster
    // is on the team; "not joined" is the part of it without the app yet.
    const bits = [`${activeEmployees.length} on the team`];
    if (invitedEmployees.length > 0)
      bits.push(
        `${invitedEmployees.length} ${invitedEmployees.length === 1 ? "hasn't" : "haven't"} joined yet`
      );
    if (onLeaveCount > 0) bits.push(`${onLeaveCount} on leave`);
    return `${bits.join(', ')}.${seatSummary}`;
  })();

  const heroActions = (
    <HeroActions stretchFirst>
      <PrimaryButton
        data-help="team.add"
        onClick={() => setAddEmployeeDialogOpen(true)}
        className={heroBtn}
      >
        <Plus className="h-4 w-4 mr-1.5" />
        Add team member
      </PrimaryButton>
      <span data-help="team.select" className="contents">
        <IconButton
          onClick={() => setMultiSelectMode((v) => !v)}
          aria-label={multiSelectMode ? 'Exit multi-select' : 'Multi-select'}
          className={cn('shrink-0', multiSelectMode && 'border-elec-yellow text-elec-yellow')}
        >
          {multiSelectMode ? (
            <CheckSquare className="h-4 w-4" />
          ) : (
            <ListChecks className="h-4 w-4" />
          )}
        </IconButton>
      </span>
      <PageHelpButton
        help={TEAM_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'team', tab: activeTab }}
      />
      <IconButton onClick={() => refetch()} aria-label="Refresh" className="shrink-0">
        <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
      </IconButton>
    </HeroActions>
  );

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Team" description={`Everyone on your books.${seatSummary}`} />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Team" description="Everyone on your books." />
        <div className={panel}>
          <PlainEmpty
            bare
            text="The team didn't load. Check your connection and try again."
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

  const typeCount = (t: WorkerTypeFilter) =>
    t === 'all'
      ? tabFilteredEmployees.length
      : tabFilteredEmployees.filter((e) => workerTypeOf(e.team_role) === t).length;

  const statusTag = (employee: Employee) => {
    const availability = getAvailability(employee);
    const liveStatus = liveStatusByEmployee.get(employee.id);
    if (!employee.user_id && employee.status !== 'Archived')
      return <Tag tone="yellow">Invited</Tag>;
    if (liveStatus === 'On Site') return <Tag tone="green">On site</Tag>;
    if (liveStatus === 'En Route') return <Tag tone="neutral">En route</Tag>;
    if (availability === 'On Job') return <Tag tone="neutral">On a job</Tag>;
    if (availability === 'On Leave') return <Tag tone="outline">On leave</Tag>;
    if (availability === 'Unavailable') return <Tag tone="outline">Unavailable</Tag>;
    return <Tag tone="outline">Available</Tag>;
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefetching}>
      <PageFrame className={frameClass}>
        <PageHero title="Team" description={heroLine} actions={heroActions} />

        <HowItWorks
          help={TEAM_HELP}
          blockers={helpBlockers}
          askContext={{ page: 'team', tab: activeTab }}
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Joined',
              value: joinedEmployees.length,
              sub: 'Using the app',
              onClick: () => setActiveTab('active'),
            },
            {
              label: 'Not joined',
              value: invitedEmployees.length,
              tone: invitedEmployees.length > 0 ? 'yellow' : undefined,
              sub: invitedEmployees.length > 0 ? 'Chase them' : 'Everyone is in',
              onClick: () => setActiveTab('invited'),
            },
            {
              label: 'On leave',
              value: onLeaveCount,
              sub: onLeaveCount === 0 ? 'Everyone in' : 'Today',
            },
            {
              label: 'Archived',
              value: archivedCount,
              sub: 'Past team',
              onClick: () => setActiveTab('archived'),
            },
          ]}
        />

        <div className={twoColClass}>
          <div className={colClass}>
            {multiSelectMode && (
              <div className={cn(panel, 'flex flex-wrap items-center gap-2 px-4 py-3 sm:px-5')}>
                <span className="text-[15px] font-semibold text-white tabular-nums">
                  {selectedEmployeeIds.length} selected
                </span>
                <button
                  onClick={selectAllEmployees}
                  className="h-11 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Select all
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    className={rowBtnSecondary}
                    onClick={() => setBulkMessageOpen(true)}
                    disabled={selectedEmployeeIds.length === 0}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </button>
                  <button
                    type="button"
                    className={rowBtnPrimary}
                    onClick={() => setBulkAssignDialogOpen(true)}
                    disabled={selectedEmployeeIds.length === 0}
                  >
                    <Briefcase className="h-4 w-4" />
                    Assign
                  </button>
                  <IconButton onClick={exitMultiSelect} aria-label="Exit multi-select">
                    <X className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            )}

            {/* Phone: the type filter as one wrapping row of chips */}
            <div className="flex flex-wrap gap-2 lg:hidden" data-help="team.type">
              {WORKER_TYPE_FILTERS.map((t) => {
                const active = workerType === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setWorkerType(t.value)}
                    className={cn(
                      'h-11 rounded-full border px-4 text-[13px] touch-manipulation',
                      active
                        ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                        : 'bg-white/[0.04] border-white/[0.14] text-white font-medium'
                    )}
                  >
                    {t.label} <span className="tabular-nums">{typeCount(t.value)}</span>
                  </button>
                );
              })}
            </div>

            {/* The phone chips above are display:none on desktop but still take
                the column's space-y margin, so pull the tabs back up there. */}
            <div data-help="team.tabs" className={cn(filterStack, !multiSelectMode && 'lg:!mt-0')}>
              <FilterBar
                tabs={[
                  { value: 'active', label: 'Active', count: joinedEmployees.length },
                  { value: 'invited', label: 'Invited', count: invitedEmployees.length },
                  { value: 'archived', label: 'Archived', count: archivedCount },
                ]}
                activeTab={activeTab}
                onTabChange={(value) => setActiveTab(value as FilterTab)}
                search={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search team…"
                actions={
                  <SecondaryButton onClick={() => setFilterOpen(true)} className="shrink-0">
                    Filters
                    {filterCount > 0 && (
                      <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[11px] font-bold text-black tabular-nums">
                        {filterCount}
                      </span>
                    )}
                  </SecondaryButton>
                }
              />
            </div>

            {activeTab === 'invited' ? (
              <section>
                <PanelTitle
                  title="Not joined yet"
                  meta={filteredEmployees.length > 0 ? filteredEmployees.length : undefined}
                />
                <p className="-mt-1 mb-3 text-[13px] text-white">
                  Added to the team but never signed in. Each gets the invite email; you can send up
                  to three reminders, a day apart.
                </p>
                {filteredEmployees.length === 0 ? (
                  <div className={panel}>
                    <PlainEmpty
                      bare
                      text={
                        searchQuery.trim()
                          ? 'No matches. Try a different search.'
                          : 'Everyone has joined. New people you add show here until they sign in.'
                      }
                    />
                  </div>
                ) : (
                  <div className={cn(panel, rowsClass)}>
                    {filteredEmployees.map((employee) => {
                      const hist = inviteHistory?.get(employee.id);
                      const extra = employee as Employee & {
                        link_declined_at?: string | null;
                        invite_chase_count?: number;
                      };
                      const declined = !!extra.link_declined_at;
                      const chases = extra.invite_chase_count ?? 0;
                      const hoursSinceLast = hist
                        ? (Date.now() - new Date(hist.lastSentAt).getTime()) / 36e5
                        : Infinity;
                      const waitHours = Math.max(0, Math.ceil(24 - hoursSinceLast));
                      const canChase =
                        !!employee.email && !declined && chases < 3 && hoursSinceLast >= 24;
                      const status = !employee.email
                        ? 'No email address. Add one to invite them'
                        : declined
                          ? 'Said the invite wasn’t for them. Check the email address'
                          : !hist
                            ? 'No invite sent yet'
                            : `Sent ${
                                hoursSinceLast < 1 / 60
                                  ? 'just now'
                                  : formatDistanceToNowStrict(parseISO(hist.lastSentAt), {
                                      addSuffix: true,
                                    })
                              }${hist.sends > 1 ? ` · ${hist.sends} emails` : ''} · not joined`;
                      const expiry =
                        hist?.liveToken && hist.expiresAt
                          ? differenceInCalendarDays(parseISO(hist.expiresAt), new Date())
                          : null;
                      return (
                        <div
                          key={employee.id}
                          className="flex flex-col gap-3 px-4 py-3.5 sm:px-5 md:flex-row md:items-center"
                        >
                          <button
                            onClick={() => handleItemClick(employee)}
                            className="flex min-w-0 flex-1 items-center gap-3 text-left touch-manipulation"
                          >
                            <Initials name={employee.name} />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[15px] font-semibold text-white">
                                {employee.name}
                              </div>
                              <div className="mt-0.5 truncate text-[13px] text-white">
                                {getTeamRole(employee.team_role)} · {employee.email || 'No email'}
                              </div>
                              <div
                                className={cn(
                                  'mt-0.5 text-[12.5px] font-medium',
                                  declined || !employee.email ? 'text-red-300' : 'text-white'
                                )}
                              >
                                {status}
                                {expiry !== null && expiry <= 3 && expiry >= 0
                                  ? ` · link expires ${expiry === 0 ? 'today' : `in ${expiry} day${expiry === 1 ? '' : 's'}`}`
                                  : ''}
                                {hist?.expired ? ' · link expired' : ''}
                              </div>
                            </div>
                          </button>
                          <div className="flex gap-2 md:shrink-0">
                            <button
                              type="button"
                              data-help="team.chase"
                              className={cn(rowBtnPrimary, 'flex-1 md:flex-none')}
                              onClick={() => handleChase(employee)}
                              disabled={!canChase || chasingId === employee.id}
                            >
                              {chasingId === employee.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Mail className="h-4 w-4" />
                              )}
                              {!employee.email || declined
                                ? 'Fix email first'
                                : chases >= 3
                                  ? 'Chased 3 times'
                                  : hoursSinceLast < 24
                                    ? `Chase in ${waitHours}h`
                                    : hist
                                      ? 'Send reminder'
                                      : 'Send invite'}
                            </button>
                            <button
                              type="button"
                              className={cn(rowBtnSecondary, 'flex-1 md:flex-none')}
                              onClick={() => handleCopyLink(employee)}
                              disabled={!hist?.liveToken}
                            >
                              <Link2 className="h-4 w-4" />
                              Copy link
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ) : filteredEmployees.length === 0 ? (
              <div className={panel}>
                <PlainEmpty
                  bare
                  text={
                    hasActiveFilters || searchQuery.trim()
                      ? 'No matches. Try other filters or a different search.'
                      : activeTab === 'archived'
                        ? 'Nobody archived. People you archive keep their records here.'
                        : 'No one on the team yet. Add your first operative, supervisor or PM and they get an invite.'
                  }
                  action={
                    hasActiveFilters ? (
                      <button type="button" onClick={clearFilters} className={rowBtnSecondary}>
                        Clear filters
                      </button>
                    ) : activeTab === 'active' && !searchQuery.trim() ? (
                      <button
                        type="button"
                        onClick={() => setAddEmployeeDialogOpen(true)}
                        className={rowBtnSecondary}
                      >
                        Add team member
                      </button>
                    ) : undefined
                  }
                />
              </div>
            ) : (
              <section data-help="team.list">
                <PanelTitle
                  title={activeTab === 'archived' ? 'Archived' : 'The team'}
                  meta={filteredEmployees.length}
                />
                <div className={cn(panel, rowsClass)}>
                  {filteredEmployees.map((employee) => {
                    const isSelected = selectedEmployeeIds.includes(employee.id);
                    const liveStatus = liveStatusByEmployee.get(employee.id);
                    const teamRole = getTeamRole(employee.team_role);
                    const detailParts: string[] = [teamRole];
                    if (employee.role && employee.role !== teamRole)
                      detailParts.push(employee.role);
                    if (employee.certifications_count > 0)
                      detailParts.push(`${employee.certifications_count} certs`);
                    if (employee.active_jobs_count > 0)
                      detailParts.push(`${employee.active_jobs_count} jobs`);

                    return (
                      <Row
                        key={employee.id}
                        lead={
                          <div className="flex shrink-0 items-center gap-3">
                            {multiSelectMode && (
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                                onClick={(e) => e.stopPropagation()}
                                className={checkboxClass}
                              />
                            )}
                            {employee.photo_url ? (
                              <Avatar
                                initials={employee.avatar_initials || getInitials(employee.name)}
                                photo={employee.photo_url}
                                online={liveStatus === 'On Site' ? true : undefined}
                                className="[&>div]:h-10 [&>div]:w-10 [&>div]:rounded-full"
                              />
                            ) : (
                              <Initials name={employee.name} live={liveStatus === 'On Site'} />
                            )}
                          </div>
                        }
                        title={employee.name}
                        detail={(() => {
                          const rtw = rtwMap.get(employee.id);
                          if (!rtw || activeTab === 'archived') return detailParts.join(' · ');
                          const tone =
                            rtw.status === 'missing' || rtw.status === 'overdue'
                              ? 'font-semibold text-red-400'
                              : rtw.status === 'due'
                                ? 'font-semibold text-elec-yellow'
                                : 'text-white';
                          return (
                            <>
                              {detailParts.join(' · ')} ·{' '}
                              <span className={tone}>
                                Right to work {RTW_STATUS_LABEL[rtw.status].toLowerCase()}
                              </span>
                            </>
                          );
                        })()}
                        trailing={statusTag(employee)}
                        onClick={() => handleItemClick(employee)}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div className={colClass}>
            <section className="hidden lg:block" data-help="team.type">
              <PanelTitle title="Show" />
              <div className={cn(panel, rowsClass)}>
                {WORKER_TYPE_FILTERS.map((t) => {
                  const active = workerType === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setWorkerType(t.value)}
                      className={cn(
                        'flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-2.5 text-left touch-manipulation transition-colors sm:px-5',
                        active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            'h-2 w-2 rounded-full',
                            active ? 'bg-elec-yellow' : 'bg-transparent'
                          )}
                        />
                        <span
                          className={cn(
                            'text-[15px] text-white',
                            active ? 'font-semibold' : 'font-medium'
                          )}
                        >
                          {t.label}
                        </span>
                      </span>
                      <span className="text-[15px] font-semibold text-white tabular-nums">
                        {typeCount(t.value)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* "Show" above is desktop-only; drop its margin on a phone. */}
            <section className="max-lg:!mt-0">
              <PanelTitle title="Bringing people in" />
              <div className={cn(panel, rowsClass)}>
                <Row
                  title="Add someone"
                  detail="With an email address they get an invite straight away."
                  onClick={() => setAddEmployeeDialogOpen(true)}
                />
                <Row
                  data-help="team.team-code"
                  title="Team code"
                  detail="Share one code. People sign up and join your firm."
                  onClick={() => setTeamCodeOpen(true)}
                />
                {invitedEmployees.length > 0 && activeTab !== 'invited' && (
                  <Row
                    title="Chase who hasn't joined"
                    detail={`${invitedEmployees.length} waiting on an invite`}
                    trailing={<Tag tone="yellow">{invitedEmployees.length}</Tag>}
                    onClick={() => setActiveTab('invited')}
                  />
                )}
              </div>
            </section>
          </div>
        </div>

        <FormSheet
          open={filterOpen}
          onOpenChange={setFilterOpen}
          title="Filter the team"
          description="Sort the list, or show only some roles or availability."
          headerTrailing={
            hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="h-11 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
              >
                Clear all
              </button>
            ) : undefined
          }
          width="wide"
          bodyClassName="grid gap-6 [&>*]:min-w-0 lg:grid-cols-3 lg:gap-8 lg:items-start"
          footer={
            <PrimaryButton onClick={() => setFilterOpen(false)} fullWidth size="lg">
              Show {filteredEmployees.length} {filteredEmployees.length === 1 ? 'person' : 'people'}
            </PrimaryButton>
          }
        >
          <div>
            <h3 className="mb-3 text-[15px] font-semibold text-white">Sort by</h3>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {SORT_OPTIONS.filter((o) => canSeeMoney || o.value !== 'rate').map((opt) => {
                const active = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSortBy(opt.value)}
                    className={cn(
                      'h-11 rounded-xl border px-3 text-left text-[13px] font-medium transition-colors touch-manipulation',
                      active
                        ? 'bg-elec-yellow text-black border-elec-yellow font-semibold'
                        : 'bg-white/[0.04] text-white border-white/[0.12] hover:bg-white/[0.06]'
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[15px] font-semibold text-white">Availability</h3>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
              <div className={rowsClass}>
                {(['Available', 'On Job', 'On Leave', 'Unavailable'] as AvailabilityStatus[]).map(
                  (status) => (
                    <Row
                      key={status}
                      chevron={false}
                      lead={
                        <Checkbox
                          checked={selectedAvailability.includes(status)}
                          onCheckedChange={() => toggleAvailability(status)}
                          onClick={(e) => e.stopPropagation()}
                          className={checkboxClass}
                        />
                      }
                      title={status === 'On Job' ? 'On a job' : status}
                      onClick={() => toggleAvailability(status)}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[15px] font-semibold text-white">Role</h3>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
              <div className={rowsClass}>
                {TEAM_ROLES.map((role) => (
                  <Row
                    key={role}
                    chevron={false}
                    lead={
                      <Checkbox
                        checked={selectedRoles.includes(role)}
                        onCheckedChange={() => toggleRole(role)}
                        onClick={(e) => e.stopPropagation()}
                        className={checkboxClass}
                      />
                    }
                    title={role}
                    onClick={() => toggleRole(role)}
                  />
                ))}
              </div>
            </div>
          </div>
        </FormSheet>

        <FormSheet
          open={bulkMessageOpen}
          onOpenChange={setBulkMessageOpen}
          title={`Message ${selectedEmployeeIds.length} team member${selectedEmployeeIds.length === 1 ? '' : 's'}`}
          description="They get it in the app and can reply."
          width="lg"
          footer={
            <PrimaryButton
              onClick={handleBulkMessage}
              disabled={!bulkMessageText.trim()}
              fullWidth
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              Send message
            </PrimaryButton>
          }
        >
          <Textarea
            value={bulkMessageText}
            onChange={(e) => setBulkMessageText(e.target.value)}
            placeholder="Type your message…"
            rows={6}
            className="min-h-[160px] rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow placeholder:text-white/35 focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 touch-manipulation"
          />
        </FormSheet>

        <AddEmployeeDialog open={addEmployeeDialogOpen} onOpenChange={setAddEmployeeDialogOpen} />

        <TeamInviteSheet open={teamCodeOpen} onOpenChange={setTeamCodeOpen} />

        <TeamMemberSheet
          employee={
            selectedEmployee
              ? (() => {
                  // Emergency-contact columns are read optimistically — the row
                  // comes from select('*'), so the sheet lights up the moment
                  // the DB migration lands, with no further FE change.
                  const extra = selectedEmployee as Employee & {
                    emergency_contact_name?: string | null;
                    emergency_contact_phone?: string | null;
                    emergency_contact_relationship?: string | null;
                  };
                  return {
                    id: selectedEmployee.id,
                    userId: selectedEmployee.user_id,
                    name: selectedEmployee.name,
                    role: selectedEmployee.role,
                    teamRole: getTeamRole(selectedEmployee.team_role),
                    status: selectedEmployee.status,
                    phone: selectedEmployee.phone || '',
                    email: selectedEmployee.email || '',
                    joinDate: selectedEmployee.join_date || '',
                    avatar: selectedEmployee.avatar_initials,
                    photo: selectedEmployee.photo_url || undefined,
                    availability: getAvailability(selectedEmployee),
                    // Office managers never see pay (can_see_firm_money)
                    hourlyRate: canSeeMoney ? selectedEmployee.hourly_rate : undefined,
                    emergencyContact:
                      extra.emergency_contact_name && extra.emergency_contact_phone
                        ? {
                            name: extra.emergency_contact_name,
                            phone: extra.emergency_contact_phone,
                            relationship: extra.emergency_contact_relationship ?? undefined,
                          }
                        : undefined,
                  };
                })()
              : null
          }
          open={profileSheetOpen}
          onOpenChange={setProfileSheetOpen}
          onEdit={() => {
            setProfileSheetOpen(false);
            setEditDialogOpen(true);
          }}
          onAssignToJob={() => {
            setProfileSheetOpen(false);
            setAssignJobDialogOpen(true);
          }}
          onSendMessage={() => {
            setProfileSheetOpen(false);
            setMessageDialogOpen(true);
          }}
        />

        <EditEmployeeDialog
          employee={selectedEmployee}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />

        <AssignToJobDialog
          employee={selectedEmployee}
          open={assignJobDialogOpen}
          onOpenChange={setAssignJobDialogOpen}
        />

        <SendMessageDialog
          employee={selectedEmployee}
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
        />

        <BulkAssignDialog
          open={bulkAssignDialogOpen}
          onOpenChange={setBulkAssignDialogOpen}
          onComplete={() => {
            clearEmployeeSelection();
            setMultiSelectMode(false);
          }}
          selectedEmployees={employees.filter((e) => selectedEmployeeIds.includes(e.id))}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
