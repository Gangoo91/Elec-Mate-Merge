import { useState, useCallback } from "react";
import { Search, Filter, Users, Plus, X, CheckSquare, Square, MessageSquare, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area"; // Used in filter sheet
import { Skeleton } from "@/components/ui/skeleton";
import { useEmployees } from "@/hooks/useEmployees";
import { AddEmployeeDialog } from "@/components/employer/dialogs/AddEmployeeDialog";
import { EditEmployeeDialog } from "@/components/employer/dialogs/EditEmployeeDialog";
import { TeamMemberSheet } from "@/components/employer/TeamMemberSheet";
import { AssignToJobDialog } from "@/components/employer/dialogs/AssignToJobDialog";
import { SendMessageDialog } from "@/components/employer/dialogs/SendMessageDialog";
import { BulkAssignDialog } from "@/components/employer/dialogs/BulkAssignDialog";
import { TeamMemberCard } from "@/components/employer/TeamMemberCard";
import { toast } from "@/hooks/use-toast";
import type { Employee } from "@/services/employeeService";

type TeamRole = "QS" | "Supervisor" | "Operative" | "Apprentice" | "Project Manager";
type AvailabilityStatus = "Available" | "On Job" | "On Leave" | "Unavailable";

const roleColors: Record<TeamRole, string> = {
  "QS": "bg-elec-yellow/20 text-elec-yellow",
  "Supervisor": "bg-info/20 text-info",
  "Operative": "bg-success/20 text-success",
  "Apprentice": "bg-warning/20 text-warning",
  "Project Manager": "bg-elec-yellow/20 text-elec-yellow",
};

const availabilityColors: Record<AvailabilityStatus, string> = {
  "Available": "bg-success",
  "On Job": "bg-info",
  "On Leave": "bg-warning",
  "Unavailable": "bg-muted-foreground",
};

const ALL_SKILLS = [
  "18th Edition", "Testing & Inspection", "EV Charging", "Solar PV",
  "Smart Home", "Commercial", "Domestic", "First Aid", "Project Management", "Design", "Basic Wiring",
];

// Map employee status to availability
const getAvailability = (employee: Employee): AvailabilityStatus => {
  if (employee.status === 'On Leave') return 'On Leave';
  if (employee.status === 'Archived') return 'Unavailable';
  if (employee.active_jobs_count > 0) return 'On Job';
  return 'Available';
};

// Map team_role string to TeamRole type
const getTeamRole = (role: string): TeamRole => {
  const validRoles: TeamRole[] = ["QS", "Supervisor", "Operative", "Apprentice", "Project Manager"];
  return validRoles.includes(role as TeamRole) ? (role as TeamRole) : "Operative";
};

export function EmployeesSection() {
  const { data: employees = [], isLoading, error, refetch, isRefetching } = useEmployees();

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<TeamRole[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityStatus[]>([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  
  // Dialog states
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignJobDialogOpen, setAssignJobDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [bulkAssignDialogOpen, setBulkAssignDialogOpen] = useState(false);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);

  const activeEmployees = employees.filter(e => e.status !== 'Archived');
  
  const filteredEmployees = activeEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(getTeamRole(emp.team_role));
    const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(getAvailability(emp));
    // Skills not yet in DB - skip skill filtering for now
    return matchesSearch && matchesRole && matchesAvailability;
  });

  // Group by availability for at-a-glance
  const availableNow = activeEmployees.filter(e => getAvailability(e) === "Available");
  const onJob = activeEmployees.filter(e => getAvailability(e) === "On Job");

  const handleItemClick = (employee: Employee) => {
    if (multiSelectMode) {
      toggleEmployeeSelection(employee.id);
    } else {
      setSelectedEmployee(employee);
      setProfileSheetOpen(true);
    }
  };


  const handleQuickMessage = (e: React.MouseEvent, employee: Employee) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
    setMessageDialogOpen(true);
  };

  const toggleRole = (role: TeamRole) => {
    setSelectedRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const toggleAvailability = (status: AvailabilityStatus) => {
    setSelectedAvailability(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };

  const clearFilters = () => {
    setSelectedRoles([]);
    setSelectedSkills([]);
    setSelectedAvailability([]);
  };

  const toggleEmployeeSelection = (id: string) => {
    setSelectedEmployeeIds(prev => 
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  const selectAllEmployees = () => {
    setSelectedEmployeeIds(activeEmployees.map(e => e.id));
  };

  const clearEmployeeSelection = () => {
    setSelectedEmployeeIds([]);
  };

  const handleBulkMessage = () => {
    const selectedEmps = employees.filter(e => selectedEmployeeIds.includes(e.id));
    toast({ title: "Messages Sent", description: `Sent to ${selectedEmps.length} team members.` });
    clearEmployeeSelection();
    setMultiSelectMode(false);
  };

  const exitMultiSelect = () => {
    clearEmployeeSelection();
    setMultiSelectMode(false);
  };

  const hasActiveFilters = selectedRoles.length > 0 || selectedSkills.length > 0 || selectedAvailability.length > 0;
  const filterCount = selectedRoles.length + selectedSkills.length + selectedAvailability.length;

  if (isLoading) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-20" />
        </div>
        <Skeleton className="h-11 w-full" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <Users className="h-12 w-12 text-destructive/30 mx-auto mb-3" />
        <h3 className="font-medium text-foreground mb-1">Failed to load team</h3>
        <p className="text-sm text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefetching}>
    <div className="space-y-4 animate-fade-in">
      {/* Clean Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Your Team</h1>
          <p className="text-xs text-muted-foreground">
            {activeEmployees.length} team · {availableNow.length} available · {onJob.length} on job
          </p>
        </div>
        <AddEmployeeDialog
          open={addEmployeeDialogOpen}
          onOpenChange={setAddEmployeeDialogOpen}
          trigger={
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          }
        />
      </div>

      {/* Multi-Select Bar */}
      {multiSelectMode && (
        <div className="flex items-center justify-between p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-elec-yellow">{selectedEmployeeIds.length} selected</span>
            <Button size="sm" variant="ghost" onClick={selectAllEmployees} className="text-xs h-7">Select All</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleBulkMessage} disabled={selectedEmployeeIds.length === 0} className="h-8">
              <MessageSquare className="h-4 w-4 mr-1" />Message
            </Button>
            <Button size="sm" onClick={() => setBulkAssignDialogOpen(true)} disabled={selectedEmployeeIds.length === 0} className="h-8">
              <Briefcase className="h-4 w-4 mr-1" />Assign
            </Button>
            <Button size="icon" variant="ghost" onClick={exitMultiSelect} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Search + Filter Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        
        {/* Filter Sheet */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className={`h-11 w-11 relative ${hasActiveFilters ? 'border-elec-yellow text-elec-yellow' : ''}`}>
              <Filter className="h-4 w-4" />
              {filterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center">
                  {filterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
            <SheetHeader className="pb-4">
              <div className="flex items-center justify-between">
                <SheetTitle>Filter Team</SheetTitle>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                    Clear all
                  </Button>
                )}
              </div>
            </SheetHeader>
            
            <ScrollArea className="h-[calc(70vh-120px)]">
              <div className="space-y-6 pb-4">
                {/* Availability */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Availability</h4>
                  <div className="space-y-2">
                    {(['Available', 'On Job', 'On Leave', 'Unavailable'] as AvailabilityStatus[]).map(status => (
                      <div key={status} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Checkbox
                          id={`avail-${status}`}
                          checked={selectedAvailability.includes(status)}
                          onCheckedChange={() => toggleAvailability(status)}
                        />
                        <label htmlFor={`avail-${status}`} className="flex-1 flex items-center gap-2 cursor-pointer">
                          <div className={`w-3 h-3 rounded-full ${availabilityColors[status]}`} />
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Role</h4>
                  <div className="space-y-2">
                    {(['QS', 'Supervisor', 'Operative', 'Apprentice', 'Project Manager'] as TeamRole[]).map(role => (
                      <div key={role} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Checkbox
                          id={`role-${role}`}
                          checked={selectedRoles.includes(role)}
                          onCheckedChange={() => toggleRole(role)}
                        />
                        <label htmlFor={`role-${role}`} className="flex-1 cursor-pointer">{role}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SKILLS.map(skill => (
                      <Badge 
                        key={skill} 
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer py-2 px-3"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="pt-4 border-t border-border">
              <Button className="w-full" onClick={() => setFilterOpen(false)}>
                Show {filteredEmployees.length} Results
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Multi-select toggle */}
        <Button 
          variant={multiSelectMode ? "default" : "outline"} 
          size="icon"
          className="h-11 w-11"
          onClick={() => setMultiSelectMode(!multiSelectMode)}
        >
          {multiSelectMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
        </Button>
      </div>

      {/* Card Grid - natural scroll */}
      <div className="pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredEmployees.map(employee => {
            const isSelected = selectedEmployeeIds.includes(employee.id);
            const availability = getAvailability(employee);
            const teamRole = getTeamRole(employee.team_role);
            
            return (
              <TeamMemberCard
                key={employee.id}
                id={employee.id}
                name={employee.name}
                role={employee.role}
                teamRole={teamRole}
                avatar={employee.avatar_initials}
                photo={employee.photo_url}
                availability={availability}
                phone={employee.phone}
                email={employee.email}
                certificationsCount={employee.certifications_count}
                activeJobsCount={employee.active_jobs_count}
                isSelected={isSelected}
                multiSelectMode={multiSelectMode}
                onClick={() => handleItemClick(employee)}
                onMessage={(e) => handleQuickMessage(e, employee)}
              />
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-16">
          <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-1">No team members found</h3>
          <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search</p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>Clear Filters</Button>
          )}
        </div>
      )}
      
      {/* Team Member Sheet (Bottom Sheet Profile) */}
      <TeamMemberSheet 
        employee={selectedEmployee ? {
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
        } : null}
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

      {/* Edit Employee Dialog */}
      <EditEmployeeDialog 
        employee={selectedEmployee}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      {/* Assign to Job Dialog */}
      <AssignToJobDialog
        employee={selectedEmployee ? {
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
        } : null}
        open={assignJobDialogOpen}
        onOpenChange={setAssignJobDialogOpen}
      />

      {/* Send Message Dialog */}
      <SendMessageDialog
        employee={selectedEmployee ? {
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
        } : null}
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
      />

      {/* Bulk Assign Dialog */}
      <BulkAssignDialog
        open={bulkAssignDialogOpen}
        onOpenChange={setBulkAssignDialogOpen}
        onComplete={() => setMultiSelectMode(false)}
      />

    </div>
    </PullToRefresh>
  );
}
