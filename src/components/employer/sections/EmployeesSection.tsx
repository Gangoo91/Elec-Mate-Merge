import { useState, useCallback, useMemo } from 'react';
import { RefreshCw, MessageSquare, Briefcase, X, CheckSquare, Square } from 'lucide-react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEmployees } from '@/hooks/useEmployees';
import { AddEmployeeDialog } from '@/components/employer/dialogs/AddEmployeeDialog';
import { EditEmployeeDialog } from '@/components/employer/dialogs/EditEmployeeDialog';
import { TeamMemberSheet } from '@/components/employer/TeamMemberSheet';
import { AssignToJobDialog } from '@/components/employer/dialogs/AssignToJobDialog';
import { SendMessageDialog } from '@/components/employer/dialogs/SendMessageDialog';
import { BulkAssignDialog } from '@/components/employer/dialogs/BulkAssignDialog';
import { toast } from '@/hooks/use-toast';
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

const ALL_SKILLS = [
  '18th Edition',
  'Testing & Inspection',
  'EV Charging',
  'Solar PV',
  'Smart Home',
  'Commercial',
  'Domestic',
  'First Aid',
  'Project Management',
  'Design',
  'Basic Wiring',
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

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<TeamRole[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityStatus[]>([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignJobDialogOpen, setAssignJobDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [bulkAssignDialogOpen, setBulkAssignDialogOpen] = useState(false);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);

  const activeEmployees = useMemo(
    () => employees.filter((e) => e.status !== 'Archived'),
    [employees]
  );

  const totalCount = employees.length;
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
    return tabFilteredEmployees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        selectedRoles.length === 0 || selectedRoles.includes(getTeamRole(emp.team_role));
      const matchesAvailability =
        selectedAvailability.length === 0 || selectedAvailability.includes(getAvailability(emp));
      return matchesSearch && matchesRole && matchesAvailability;
    });
  }, [tabFilteredEmployees, searchQuery, selectedRoles, selectedAvailability]);

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

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleAvailability = (status: AvailabilityStatus) => {
    setSelectedAvailability((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedRoles([]);
    setSelectedSkills([]);
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

  const handleBulkMessage = () => {
    const selectedEmps = employees.filter((e) => selectedEmployeeIds.includes(e.id));
    toast({ title: 'Messages sent', description: `Sent to ${selectedEmps.length} team members.` });
    clearEmployeeSelection();
    setMultiSelectMode(false);
  };

  const exitMultiSelect = () => {
    clearEmployeeSelection();
    setMultiSelectMode(false);
  };

  const hasActiveFilters =
    selectedRoles.length > 0 || selectedSkills.length > 0 || selectedAvailability.length > 0;
  const filterCount = selectedRoles.length + selectedSkills.length + selectedAvailability.length;

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="People"
          title="Team"
          description="Manage every operative, supervisor and PM on your books."
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
          description="Manage every operative, supervisor and PM on your books."
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
            { label: 'Total', value: totalCount },
            { label: 'Active', value: availableCount + onJobCount, tone: 'emerald' },
            { label: 'On leave', value: onLeaveCount, tone: 'amber' },
            { label: 'Vacant', value: pendingCount, tone: 'red' },
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
                onClick={handleBulkMessage}
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
            title="No team members yet"
            description={
              hasActiveFilters
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
                          initials={
                            employee.avatar_initials || getInitials(employee.name)
                          }
                          online={availability === 'Available' || availability === 'On Job'}
                        />
                      </div>
                    }
                    title={employee.name}
                    subtitle={subtitleParts.join(' · ')}
                    trailing={
                      <>
                        <Pill tone={ROLE_TONE[teamRole]}>{teamRole}</Pill>
                        <Pill tone={AVAILABILITY_TONE[availability]}>{availability}</Pill>
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

                <div>
                  <Eyebrow>Skills</Eyebrow>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ALL_SKILLS.map((skill) => {
                      const active = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`h-10 px-3.5 rounded-full text-[12.5px] font-medium touch-manipulation transition-colors ${
                            active
                              ? 'bg-elec-yellow text-black'
                              : 'bg-[hsl(0_0%_14%)] border border-white/[0.08] text-white hover:bg-[hsl(0_0%_17%)]'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
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

        <AddEmployeeDialog
          open={addEmployeeDialogOpen}
          onOpenChange={setAddEmployeeDialogOpen}
        />

        <TeamMemberSheet
          employee={
            selectedEmployee
              ? {
                  id: selectedEmployee.id,
                  name: selectedEmployee.name,
                  role: selectedEmployee.role,
                  teamRole: getTeamRole(selectedEmployee.team_role),
                  status: selectedEmployee.status,
                  certifications: selectedEmployee.certifications_count,
                  activeJobs: selectedEmployee.active_jobs_count,
                  phone: selectedEmployee.phone || '',
                  email: selectedEmployee.email || '',
                  joinDate: selectedEmployee.join_date || '',
                  permissions: [],
                  completedDocuments: [],
                  avatar: selectedEmployee.avatar_initials,
                  photo: selectedEmployee.photo_url || undefined,
                  availability: getAvailability(selectedEmployee),
                  skills: [],
                  rating: 0,
                  notes: [],
                  hourlyRate: selectedEmployee.hourly_rate,
                }
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
          employee={
            selectedEmployee
              ? {
                  id: selectedEmployee.id,
                  name: selectedEmployee.name,
                  role: selectedEmployee.role,
                  teamRole: getTeamRole(selectedEmployee.team_role),
                  status: selectedEmployee.status,
                  certifications: selectedEmployee.certifications_count,
                  activeJobs: selectedEmployee.active_jobs_count,
                  phone: selectedEmployee.phone || '',
                  email: selectedEmployee.email || '',
                  joinDate: selectedEmployee.join_date || '',
                  permissions: [],
                  completedDocuments: [],
                  avatar: selectedEmployee.avatar_initials,
                  availability: getAvailability(selectedEmployee),
                  skills: [],
                  rating: 0,
                  notes: [],
                }
              : null
          }
          open={assignJobDialogOpen}
          onOpenChange={setAssignJobDialogOpen}
        />

        <SendMessageDialog
          employee={
            selectedEmployee
              ? {
                  id: selectedEmployee.id,
                  name: selectedEmployee.name,
                  role: selectedEmployee.role,
                  teamRole: getTeamRole(selectedEmployee.team_role),
                  status: selectedEmployee.status,
                  certifications: selectedEmployee.certifications_count,
                  activeJobs: selectedEmployee.active_jobs_count,
                  phone: selectedEmployee.phone || '',
                  email: selectedEmployee.email || '',
                  joinDate: selectedEmployee.join_date || '',
                  permissions: [],
                  completedDocuments: [],
                  avatar: selectedEmployee.avatar_initials,
                  availability: getAvailability(selectedEmployee),
                  skills: [],
                  rating: 0,
                  notes: [],
                }
              : null
          }
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
        />

        <BulkAssignDialog
          open={bulkAssignDialogOpen}
          onOpenChange={setBulkAssignDialogOpen}
          onComplete={() => setMultiSelectMode(false)}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
