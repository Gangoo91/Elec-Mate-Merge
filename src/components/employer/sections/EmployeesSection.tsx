import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RefreshCw, MessageSquare, Briefcase, X, CheckSquare, Square, Send } from 'lucide-react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  checkboxClass,
  type Tone,
} from '@/components/employer/editorial';
import type { Employee } from '@/services/employeeService';

type TeamRole = 'QS' | 'Supervisor' | 'Operative' | 'Apprentice' | 'Project Manager';
type AvailabilityStatus = 'Available' | 'On Job' | 'On Leave' | 'Unavailable';
type FilterTab = 'all' | 'active' | 'leave' | 'pending';
type SortKey = 'name' | 'team_role' | 'rate' | 'newest';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'team_role', label: 'Team role' },
  { value: 'rate', label: 'Hourly rate (high first)' },
  { value: 'newest', label: 'Recently added' },
];

const ROLE_TONE: Record<TeamRole, Tone> = {
  QS: 'yellow',
  Supervisor: 'blue',
  Operative: 'emerald',
  Apprentice: 'amber',
  'Project Manager': 'purple',
};

const AVAILABILITY_TONE: Record<AvailabilityStatus, Tone> = {
  Available: 'emerald',
  'On Job': 'blue',
  'On Leave': 'amber',
  Unavailable: 'red',
};

const getAvailability = (employee: Employee): AvailabilityStatus => {
  if (employee.status === 'On Leave') return 'On Leave';
  if (employee.status === 'Archived') return 'Unavailable';
  if (employee.active_jobs_count > 0) return 'On Job';
  return 'Available';
};

const getTeamRole = (role: string): TeamRole => {
  const validRoles: TeamRole[] = ['QS', 'Supervisor', 'Operative', 'Apprentice', 'Project Manager'];
  return validRoles.includes(role as TeamRole) ? (role as TeamRole) : 'Operative';
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
  const { data: seatInfo } = useQuery({
    queryKey: ['employer-seat-summary'],
    queryFn: async () => {
      const [{ count }, { data: auth }] = await Promise.all([
        supabase
          .from('employer_seats')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'active'),
        supabase.auth.getUser(),
      ]);
      let cap: number | null = null;
      let comped = false;
      if (auth?.user) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('employer_seat_cap, free_access_granted')
          .eq('id', auth.user.id)
          .maybeSingle();
        cap = (prof as { employer_seat_cap?: number | null } | null)?.employer_seat_cap ?? null;
        comped = (prof as { free_access_granted?: boolean } | null)?.free_access_granted === true;
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
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<TeamRole[]>([]);
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

  const availableCount = activeEmployees.filter((e) => getAvailability(e) === 'Available').length;
  const onJobCount = activeEmployees.filter((e) => getAvailability(e) === 'On Job').length;
  const onLeaveCount = activeEmployees.filter((e) => getAvailability(e) === 'On Leave').length;
  const pendingCount = employees.filter((e) => e.status === 'Archived').length;

  const tabFilteredEmployees = useMemo(() => {
    if (activeTab === 'leave')
      return activeEmployees.filter((e) => getAvailability(e) === 'On Leave');
    if (activeTab === 'pending') return employees.filter((e) => e.status === 'Archived');
    if (activeTab === 'active')
      return activeEmployees.filter((e) => getAvailability(e) !== 'On Leave');
    return activeEmployees;
  }, [activeTab, activeEmployees, employees]);

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
      return matchesSearch && matchesRole && matchesAvailability;
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
  }, [tabFilteredEmployees, searchQuery, selectedRoles, selectedAvailability, sortBy]);

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

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="People"
          title="Team"
          description={`Manage every operative, supervisor and PM on your books.${seatSummary}`}
          tone="blue"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="People"
          title="Team"
          description="Manage every operative, supervisor and PM on your books."
          tone="blue"
        />
        <EmptyState
          title="Failed to load team"
          description="Please try again in a moment."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefetching}>
      <PageFrame>
        <PageHero
          eyebrow="People"
          title="Team"
          description={`Manage every operative, supervisor and PM on your books.${seatSummary}`}
          tone="blue"
          actions={
            <>
              <PrimaryButton onClick={() => setAddEmployeeDialogOpen(true)}>
                Add team member
              </PrimaryButton>
              <IconButton onClick={() => refetch()} aria-label="Refresh">
                <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
              </IconButton>
              <IconButton
                onClick={() => setMultiSelectMode((v) => !v)}
                aria-label={multiSelectMode ? 'Exit multi-select' : 'Multi-select'}
              >
                {multiSelectMode ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            // Same population as the "All" tab — archived members get their
            // own number, not silently folded into Total
            { label: 'Total', value: activeEmployees.length },
            { label: 'Active', value: availableCount + onJobCount, tone: 'emerald' },
            { label: 'On leave', value: onLeaveCount, tone: 'amber' },
            { label: 'Archived', value: pendingCount, tone: 'red' },
          ]}
        />

        {multiSelectMode && (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title={`${selectedEmployeeIds.length} selected`}
              meta={
                <button
                  onClick={selectAllEmployees}
                  className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Select all
                </button>
              }
            />
            <div className="flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4">
              <SecondaryButton
                onClick={() => setBulkMessageOpen(true)}
                disabled={selectedEmployeeIds.length === 0}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </SecondaryButton>
              <PrimaryButton
                onClick={() => setBulkAssignDialogOpen(true)}
                disabled={selectedEmployeeIds.length === 0}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Assign
              </PrimaryButton>
              <div className="ml-auto">
                <IconButton onClick={exitMultiSelect} aria-label="Exit multi-select">
                  <X className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </ListCard>
        )}

        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: activeEmployees.length },
            { value: 'active', label: 'Active', count: availableCount + onJobCount },
            { value: 'leave', label: 'On leave', count: onLeaveCount },
            { value: 'pending', label: 'Archived', count: pendingCount },
          ]}
          activeTab={activeTab}
          onTabChange={(value) => setActiveTab(value as FilterTab)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search team…"
          actions={
            <button
              onClick={() => setFilterOpen(true)}
              className="h-10 px-4 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white text-[12.5px] font-medium touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors inline-flex items-center gap-2"
            >
              Filters
              {filterCount > 0 && <Pill tone="yellow">{filterCount}</Pill>}
            </button>
          }
        />

        {filteredEmployees.length === 0 ? (
          <EmptyState
            title={
              hasActiveFilters || searchQuery.trim() ? 'No matches' : 'No team members yet'
            }
            description={
              hasActiveFilters || searchQuery.trim()
                ? 'Try adjusting your filters or search.'
                : 'Add your first operative, supervisor or PM to get started.'
            }
            action={hasActiveFilters ? 'Clear filters' : 'Add team member'}
            onAction={hasActiveFilters ? clearFilters : () => setAddEmployeeDialogOpen(true)}
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Team"
              meta={<Pill tone="blue">{filteredEmployees.length}</Pill>}
            />
            <ListBody>
              {filteredEmployees.map((employee) => {
                const isSelected = selectedEmployeeIds.includes(employee.id);
                const availability = getAvailability(employee);
                const liveStatus = liveStatusByEmployee.get(employee.id);
                const isOnSite = liveStatus === 'On Site' || liveStatus === 'En Route';
                const teamRole = getTeamRole(employee.team_role);
                const subtitleParts: string[] = [employee.role];
                if (employee.certifications_count > 0)
                  subtitleParts.push(`${employee.certifications_count} certs`);
                if (employee.active_jobs_count > 0)
                  subtitleParts.push(`${employee.active_jobs_count} jobs`);

                return (
                  <ListRow
                    key={employee.id}
                    lead={
                      <div className="flex items-center gap-2.5">
                        {multiSelectMode && (
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                            onClick={(e) => e.stopPropagation()}
                            className={checkboxClass}
                          />
                        )}
                        <Avatar
                          initials={employee.avatar_initials || getInitials(employee.name)}
                          online={
                            isOnSite || availability === 'Available' || availability === 'On Job'
                          }
                        />
                      </div>
                    }
                    title={employee.name}
                    subtitle={subtitleParts.join(' · ')}
                    trailing={
                      <>
                        <Pill tone={ROLE_TONE[teamRole]}>{teamRole}</Pill>
                        {!employee.user_id && employee.status !== 'Archived' ? (
                          <Pill tone="amber">Invited</Pill>
                        ) : isOnSite ? (
                          <Pill tone={liveStatus === 'En Route' ? 'blue' : 'emerald'}>
                            {liveStatus}
                          </Pill>
                        ) : (
                          <Pill tone={AVAILABILITY_TONE[availability]}>{availability}</Pill>
                        )}
                      </>
                    }
                    onClick={() => handleItemClick(employee)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetContent
            side="bottom"
            className="h-[80vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <SheetHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-white">Filter team</SheetTitle>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </SheetHeader>

            <ScrollArea className="h-[calc(80vh-160px)]">
              <div className="px-5 sm:px-6 py-5 space-y-6">
                <div>
                  <Eyebrow>Sort by</Eyebrow>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {SORT_OPTIONS.map((opt) => {
                      const active = sortBy === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSortBy(opt.value)}
                          className={`h-11 px-3 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation text-left ${
                            active
                              ? 'bg-elec-yellow text-black border-elec-yellow'
                              : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.08] hover:bg-white/[0.05]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Eyebrow>Availability</Eyebrow>
                  <ListCard className="mt-3">
                    <ListBody>
                      {(
                        ['Available', 'On Job', 'On Leave', 'Unavailable'] as AvailabilityStatus[]
                      ).map((status) => (
                        <ListRow
                          key={status}
                          lead={
                            <Checkbox
                              checked={selectedAvailability.includes(status)}
                              onCheckedChange={() => toggleAvailability(status)}
                              className={checkboxClass}
                            />
                          }
                          title={status}
                          trailing={<Pill tone={AVAILABILITY_TONE[status]}>{status}</Pill>}
                          onClick={() => toggleAvailability(status)}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                </div>

                <div>
                  <Eyebrow>Role</Eyebrow>
                  <ListCard className="mt-3">
                    <ListBody>
                      {(
                        [
                          'QS',
                          'Supervisor',
                          'Operative',
                          'Apprentice',
                          'Project Manager',
                        ] as TeamRole[]
                      ).map((role) => (
                        <ListRow
                          key={role}
                          lead={
                            <Checkbox
                              checked={selectedRoles.includes(role)}
                              onCheckedChange={() => toggleRole(role)}
                              className={checkboxClass}
                            />
                          }
                          title={role}
                          trailing={<Pill tone={ROLE_TONE[role]}>{role}</Pill>}
                          onClick={() => toggleRole(role)}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                </div>
              </div>
            </ScrollArea>

            <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06] bg-[hsl(0_0%_10%)]">
              <PrimaryButton onClick={() => setFilterOpen(false)} fullWidth>
                Show {filteredEmployees.length} results
              </PrimaryButton>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={bulkMessageOpen} onOpenChange={setBulkMessageOpen}>
          <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden">
            <div className="bg-background px-4 pt-4 pb-8 space-y-4">
              <SheetHeader>
                <SheetTitle className="text-left text-base">
                  Message {selectedEmployeeIds.length} team member
                  {selectedEmployeeIds.length === 1 ? '' : 's'}
                </SheetTitle>
              </SheetHeader>
              <Textarea
                value={bulkMessageText}
                onChange={(e) => setBulkMessageText(e.target.value)}
                placeholder="Type your message…"
                rows={4}
                className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
              <PrimaryButton
                onClick={handleBulkMessage}
                disabled={!bulkMessageText.trim()}
                fullWidth
              >
                <Send className="h-4 w-4 mr-2" />
                Send message
              </PrimaryButton>
            </div>
          </SheetContent>
        </Sheet>

        <AddEmployeeDialog open={addEmployeeDialogOpen} onOpenChange={setAddEmployeeDialogOpen} />

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
                    hourlyRate: selectedEmployee.hourly_rate,
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
