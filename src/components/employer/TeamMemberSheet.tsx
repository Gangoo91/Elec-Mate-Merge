import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStorageUrl } from '@/utils/storageUrls';
// View-model the Team section maps real employer_employees rows into
export type AvailabilityStatus = 'Available' | 'On Job' | 'On Leave' | 'Unavailable';
export interface TeamMemberView {
  id: string;
  userId?: string | null; // null = invited, not yet joined
  status?: string;
  name: string;
  role: string;
  teamRole?: string;
  team_role?: string;
  email?: string;
  phone?: string;
  avatar: string;
  photo?: string;
  availability: AvailabilityStatus;
  joinDate?: string;
  hourlyRate?: number;
  emergencyContact?: { name: string; phone: string; relationship?: string };
  currentJobTitle?: string;
  currentJobLocation?: string;
}
import { useEmployeeAssignments, useDeleteJobAssignment } from '@/hooks/useJobAssignments';
import { useUpdateEmployee } from '@/hooks/useEmployees';
import { useCertificationsByEmployee } from '@/hooks/useCertifications';
import { useEmployeeTimesheets } from '@/hooks/useTimesheets';
import { useMyExpenses } from '@/hooks/useExpenses';
import { useTeamLeaveRequests, useTeamAllowances } from '@/hooks/useTeamLeave';
import { useCompanyTools } from '@/hooks/useCompanyTools';
import { useWorkerLocations } from '@/hooks/useWorkerLocations';
import { checkOutWorker } from '@/services/locationService';
import { differenceInDays, parseISO, format } from 'date-fns';
import { CreateElecIDForEmployeeDialog } from '@/components/employer/dialogs/CreateElecIDForEmployeeDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useElecIdProfileByEmployee } from '@/hooks/useElecId';
import { PrimaryButton, SecondaryButton } from './editorial';
import {
  Phone,
  Mail,
  MessageSquare,
  Briefcase,
  Award,
  MapPin,
  Clock,
  ChevronRight,
  UserCog,
  AlertTriangle,
  X,
  PoundSterling,
  AlertCircle,
  Plus,
  IdCard,
  ExternalLink,
  Archive,
  ArchiveRestore,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type TeamRole = 'QS' | 'Supervisor' | 'Operative' | 'Apprentice' | 'Project Manager';
const roleColors: Record<TeamRole, string> = {
  QS: 'bg-elec-yellow/20 text-elec-yellow',
  Supervisor: 'bg-blue-500/20 text-blue-400',
  Operative: 'bg-emerald-500/20 text-emerald-400',
  Apprentice: 'bg-amber-500/20 text-amber-400',
  'Project Manager': 'bg-elec-yellow/20 text-elec-yellow',
};

const availabilityColors: Record<AvailabilityStatus, string> = {
  Available: 'bg-emerald-500',
  'On Job': 'bg-blue-500',
  'On Leave': 'bg-amber-500',
  Unavailable: 'bg-white/20',
};

interface TeamMemberSheetProps {
  employee: TeamMemberView | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onAssignToJob?: () => void;
  onSendMessage?: () => void;
}

export function TeamMemberSheet({
  employee,
  open,
  onOpenChange,
  onEdit,
  onAssignToJob,
  onSendMessage,
}: TeamMemberSheetProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  // Legacy full photo URLs pass through; new bare paths are signed on demand.
  const { url: employeePhotoSrc } = useStorageUrl('employee-photos', employee?.photo);
  const { data: rawAssignments = [] } = useEmployeeAssignments(employee?.id || '');
  const deleteAssignment = useDeleteJobAssignment();
  const { data: rawCerts = [] } = useCertificationsByEmployee(employee?.id);
  const { data: rawTimesheets = [] } = useEmployeeTimesheets(employee?.id || '');
  const { expenses: rawExpenses = [] } = useMyExpenses(employee?.id);
  const { data: allLeave = [] } = useTeamLeaveRequests();
  const { data: workerLocations = [] } = useWorkerLocations();
  // Offboarding pre-flight sources — tools signed out + holiday balance
  const { data: companyTools = [] } = useCompanyTools();
  const { data: teamAllowances = [] } = useTeamAllowances();
  const [activeTab, setActiveTab] = useState('details');
  const [createElecIdOpen, setCreateElecIdOpen] = useState(false);
  const [resending, setResending] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const updateEmployee = useUpdateEmployee();

  const { data: elecIdProfile, isLoading: elecIdLoading } = useElecIdProfileByEmployee(
    employee?.id || ''
  );

  if (!employee) return null;

  const employeeAssignments = rawAssignments
    .filter(
      (a) =>
        !['completed', 'cancelled', 'removed', 'ended'].includes((a.status || '').toLowerCase())
    )
    .map((a) => ({
      id: a.id,
      jobTitle: a.job?.title || 'Job',
      jobLocation: a.job?.location || '',
    }));
  const employeeCerts = rawCerts.map((c) => {
    const days = c.expiry_date ? differenceInDays(parseISO(c.expiry_date), new Date()) : null;
    return {
      id: c.id,
      name: c.name,
      issuer: c.issuing_body || '',
      daysRemaining: days ?? 0,
      status:
        days !== null && days < 0 ? 'Expired' : days !== null && days <= 60 ? 'Warning' : 'Active',
    };
  });
  const expiringSoonCerts = employeeCerts.filter(
    (c) => c.status === 'Warning' || c.status === 'Expired'
  );

  // Timesheets — already ordered by date desc from the hook
  const recentTimesheets = rawTimesheets.slice(0, 12);
  const pendingTimesheets = rawTimesheets.filter(
    (t) => (t.status || '').toLowerCase() === 'pending'
  ).length;
  const timesheetStatusTone = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'approved') return 'border-l-emerald-500';
    if (s === 'rejected') return 'border-l-red-500';
    return 'border-l-amber-500'; // pending / submitted
  };

  // Expenses — already ordered by submitted_date desc from the hook
  const recentExpenses = rawExpenses.slice(0, 12);
  const pendingExpenses = rawExpenses.filter((e) => (e.status || '').toLowerCase() === 'pending');
  const pendingExpenseTotal = pendingExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const expenseStatusTone = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'approved' || s === 'paid') return 'border-l-emerald-500';
    if (s === 'rejected') return 'border-l-red-500';
    return 'border-l-amber-500'; // pending
  };

  // Leave — useLeaveRequests is employer-scoped; filter to this worker
  const employeeLeave = allLeave.filter((l) => l.employeeId === employee?.id);
  const recentLeave = employeeLeave.slice(0, 12);
  const pendingLeave = employeeLeave.filter(
    (l) => (l.status || '').toLowerCase() === 'pending'
  ).length;
  const leaveStatusTone = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'approved') return 'border-l-emerald-500';
    if (s === 'rejected' || s === 'cancelled') return 'border-l-red-500';
    return 'border-l-amber-500'; // pending
  };

  // Live on-site presence — latest location row for this worker (clock-in derived)
  const presence = workerLocations.find((l) => l.employee_id === employee?.id);
  const presenceDot = (status?: string) => {
    switch (status) {
      case 'On Site':
        return 'bg-emerald-500';
      case 'En Route':
        return 'bg-blue-500';
      case 'Office':
        return 'bg-amber-500';
      case 'On Leave':
        return 'bg-red-500';
      default:
        return 'bg-white/30'; // Off Duty / unknown
    }
  };
  // The location row embeds the job under the table-name key `employer_jobs`.
  const presenceJobTitle = (presence as { employer_jobs?: { title?: string } } | undefined)
    ?.employer_jobs?.title;
  const presenceSince =
    presence?.status === 'Off Duty'
      ? presence?.checked_out_at || presence?.last_updated
      : presence?.checked_in_at || presence?.last_updated;

  const isInvited = !employee.userId && (employee.status ?? '').toLowerCase() !== 'archived';
  const handleResendInvite = async () => {
    setResending(true);
    try {
      const { error } = await supabase.functions.invoke('send-team-welcome', {
        body: { employeeId: employee.id },
      });
      if (error) throw error;
      toast({
        title: 'Invite resent',
        description: `A fresh invite is on its way to ${employee.email}.`,
      });
    } catch {
      toast({
        title: 'Could not resend',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setResending(false);
    }
  };

  const handleCall = () => {
    if (employee.phone) window.location.href = `tel:${employee.phone}`;
  };
  const handleEmergencyCall = () => {
    if (employee.emergencyContact) {
      window.location.href = `tel:${employee.emergencyContact.phone}`;
    }
  };

  // Leaver / rejoiner flow — archive keeps every timesheet, cert and Elec-ID
  // (hard deletes are FK-RESTRICTed at the DB) and releases the paid seat via
  // the seat resync inside updateEmployee. Restore reverses it.
  const isArchived = (employee.status ?? '').toLowerCase() === 'archived';

  // Offboarding pre-flight — everything still hanging off this person, checked
  // against live data before the archive is confirmed. NON-BLOCKING: it informs
  // the decision, it never gates it.
  const unapprovedTimesheets = rawTimesheets.filter((t) => {
    const s = (t.status || '').toLowerCase();
    return s !== 'approved' && s !== 'rejected';
  }).length;
  const assignedTools = companyTools.filter(
    (t) => t.assigned_to_employee_id === employee.id
  ).length;
  const holidayAllowance = teamAllowances.find((a) => a.employeeId === employee.id);
  const remainingHoliday = holidayAllowance
    ? Math.max(
        0,
        holidayAllowance.totalDays + holidayAllowance.carriedOver - holidayAllowance.usedDays
      )
    : null;
  const offboardingChecklist: Array<{
    key: string;
    label: string;
    count: number;
    onGo?: () => void;
  }> = [
    {
      key: 'timesheets',
      label: 'Timesheets awaiting approval',
      count: unapprovedTimesheets,
      onGo: () => {
        onOpenChange(false);
        navigate('/employer?section=timesheets');
      },
    },
    {
      key: 'jobs',
      label: 'Active job assignments',
      count: employeeAssignments.length,
      onGo: () => {
        setConfirmArchive(false);
        setActiveTab('jobs');
      },
    },
    {
      key: 'tools',
      label: 'Company tools signed out',
      count: assignedTools,
      onGo: () => {
        onOpenChange(false);
        navigate('/employer?section=procurement');
      },
    },
    {
      key: 'leave',
      label: 'Leave requests pending',
      count: pendingLeave,
      onGo: () => {
        onOpenChange(false);
        navigate('/employer?section=timesheets');
      },
    },
  ];
  const outstandingCount = offboardingChecklist.filter((i) => i.count > 0).length;
  const allClear = outstandingCount === 0;
  const handleArchiveToggle = async () => {
    try {
      // Close any open shift first — a leaver must not stay "On Site" on the
      // tracking map for a fortnight after they've gone.
      if (!isArchived && presence && !presence.checked_out_at) {
        try {
          await checkOutWorker(presence.id);
        } catch {
          // Best-effort: the stale-demotion rule catches it if this fails
        }
      }
      await updateEmployee.mutateAsync({
        id: employee.id,
        updates: { status: isArchived ? 'Active' : 'Archived' },
      });
      toast({
        title: isArchived ? 'Restored to team' : 'Archived',
        description: isArchived
          ? `${employee.name} is back on the active roster.`
          : `${employee.name} moved to Archived — history kept, seat released.`,
      });
      setConfirmArchive(false);
      onOpenChange(false);
    } catch {
      toast({
        title: isArchived ? 'Could not restore' : 'Could not archive',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Shared content for both Sheet and Drawer. Plain JSX, NOT a nested
  // component — an inline component gets a new identity every render, which
  // remounts the whole subtree (scroll jumps to top on each state change).
  const profileContent = (
    <>
      {/* Header with large photo - fixed height, no shrink */}
      <div className="px-4 md:px-6 pt-4 pb-2 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          {/* Large photo with availability ring */}
          <div className="relative">
            <div className={`p-1 rounded-full ${availabilityColors[employee.availability]}`}>
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-[hsl(0_0%_8%)]">
                <AvatarImage src={employeePhotoSrc ?? undefined} alt={employee.name} />
                <AvatarFallback className="text-2xl md:text-3xl font-bold bg-elec-yellow/10 text-elec-yellow">
                  {employee.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
            {/* Verification badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-elec-yellow flex items-center justify-center border-2 border-[hsl(0_0%_8%)]">
              <Award className="h-4 w-4 md:h-5 md:w-5 text-black" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-white truncate">{employee.name}</h2>
            <p className="text-sm md:text-base text-white">{employee.role}</p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <Badge
                className={`text-xs ${roleColors[(employee.teamRole as TeamRole) || 'Operative']}`}
              >
                {employee.teamRole || employee.team_role || 'Operative'}
              </Badge>
              <Badge variant="outline" className="text-xs border-white/20 text-white">
                {employee.availability}
              </Badge>
              {expiringSoonCerts.length > 0 && (
                <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                  <AlertTriangle className="h-3 w-3 mr-0.5" />
                  {expiringSoonCerts.length}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Invited but not yet joined — resend the branded invite */}
        {isInvited && (
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3 mb-3 flex items-center justify-between gap-3">
            <p className="text-[12.5px] text-amber-200/90 leading-snug">
              Invite sent{employee.email ? ` to ${employee.email}` : ''} — waiting for them to join.
            </p>
            <SecondaryButton onClick={handleResendInvite} disabled={resending} className="shrink-0">
              <Mail className="h-4 w-4 mr-1.5" />
              {resending ? 'Sending…' : 'Resend'}
            </SecondaryButton>
          </div>
        )}

        {/* Quick action bar */}
        <div className="flex gap-2">
          <SecondaryButton className="flex-1" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-2 text-emerald-400" />
            Call
          </SecondaryButton>
          <SecondaryButton className="flex-1" onClick={onSendMessage}>
            <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
            Message
          </SecondaryButton>
          <PrimaryButton className="flex-1" onClick={onAssignToJob}>
            <Briefcase className="h-4 w-4 mr-2" />
            Assign
          </PrimaryButton>
        </div>
      </div>

      {/* Tabs - flex-1 with overflow handling */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col min-h-0 overflow-hidden"
      >
        <div className="px-4 md:px-6 border-b border-white/[0.06] flex-shrink-0">
          <TabsList className="w-full justify-start gap-1 bg-transparent h-auto p-0 overflow-x-auto flex-nowrap">
            <TabsTrigger
              value="details"
              className="flex-shrink-0 whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3.5 py-3 text-sm text-white"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="flex-shrink-0 whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3.5 py-3 text-sm text-white"
            >
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="hours"
              className="flex-shrink-0 whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3.5 py-3 text-sm text-white"
            >
              Hours
            </TabsTrigger>
            <TabsTrigger
              value="spend"
              className="flex-shrink-0 whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3.5 py-3 text-sm text-white"
            >
              Spend
            </TabsTrigger>
            <TabsTrigger
              value="leave"
              className="flex-shrink-0 whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3.5 py-3 text-sm text-white"
            >
              Leave
            </TabsTrigger>
            <TabsTrigger
              value="creds"
              className="flex-shrink-0 whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3.5 py-3 text-sm text-white"
            >
              Credentials
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable content area with explicit height */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4 md:p-6">
            {/* Details Tab */}
            <TabsContent value="details" className="mt-0 space-y-4">
              {/* Snapshot — the three facts you glance at first */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: 'Hourly rate',
                    value: employee.hourlyRate ? `£${employee.hourlyRate}` : '—',
                    gold: true,
                  },
                  {
                    label: 'Team role',
                    value: employee.teamRole || employee.team_role || 'Operative',
                  },
                  {
                    label: 'Status',
                    value: isInvited ? 'Invited' : employee.availability,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] px-2.5 py-3 text-center min-w-0"
                  >
                    <p
                      className={`text-[15px] font-bold truncate ${s.gold ? 'text-elec-yellow' : 'text-white'}`}
                    >
                      {s.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-white/45 mt-0.5 truncate">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Live on-site presence (clock-in derived) */}
              {presence && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <span
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${presenceDot(presence.status)}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {presence.status}
                      {presenceJobTitle && (
                        <span className="text-xs text-white font-normal">
                          {' '}
                          · {presenceJobTitle}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-white/50">
                      {presenceSince
                        ? `since ${format(parseISO(presenceSince), 'EEE d MMM, HH:mm')}`
                        : 'no recent check-in'}
                    </p>
                  </div>
                  <MapPin className="h-4 w-4 text-white flex-shrink-0" />
                </div>
              )}

              {/* Contact — only render channels that exist; a tappable row
                  dialling tel:undefined is worse than an honest gap */}
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-medium px-0.5">
                  Contact
                </p>
                {employee.phone ? (
                  <button
                    onClick={handleCall}
                    className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{employee.phone}</p>
                      <p className="text-xs text-white/50">Mobile</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                ) : null}

                {employee.email ? (
                  <button
                    onClick={() => (window.location.href = `mailto:${employee.email}`)}
                    className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                  >
                    <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{employee.email}</p>
                      <p className="text-xs text-white/50">Email</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                ) : null}

                {!employee.phone && !employee.email && (
                  <button
                    onClick={onEdit}
                    className="w-full p-3 rounded-xl border border-dashed border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-colors text-left touch-manipulation"
                  >
                    <p className="text-[13px] font-medium text-white">No contact details on file</p>
                    <p className="text-[11.5px] text-white/50">
                      Add a phone or email so you can reach {employee.name.split(' ')[0]} from site.
                    </p>
                  </button>
                )}
              </div>

              {/* Emergency Contact */}
              {employee.emergencyContact && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    Emergency Contact
                  </h4>
                  <button
                    onClick={handleEmergencyCall}
                    className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors touch-manipulation"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{employee.emergencyContact.name}</p>
                      <p className="text-xs text-white/50">
                        {employee.emergencyContact.relationship} • {employee.emergencyContact.phone}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
              )}

              {/* Invited — set expectations and fill the space instead of a void */}
              {isInvited && (
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_11%)] p-4">
                  <p className="text-[13px] font-semibold text-white mb-1">Waiting to join</p>
                  <p className="text-[12px] text-white/55 leading-relaxed">
                    Once {employee.name.split(' ')[0] || 'they'} accept the invite, their assigned
                    jobs, clocked hours, expenses and credentials appear here automatically.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Current Assignments</h4>
                <SecondaryButton size="sm" onClick={onAssignToJob}>
                  <Plus className="h-3 w-3 mr-1" />
                  Assign
                </SecondaryButton>
              </div>
              {employeeAssignments.length > 0 ? (
                <div className="space-y-2">
                  {employeeAssignments.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
                    >
                      <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{a.jobTitle}</p>
                        <p className="text-xs text-white flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {a.jobLocation}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center rounded-full text-white hover:bg-red-500/10 hover:text-red-400 touch-manipulation"
                        onClick={async () => {
                          // deleteJobAssignment returns false on failure rather
                          // than throwing — only confirm when the row is gone
                          const removed = await deleteAssignment.mutateAsync(a.id);
                          if (removed) {
                            toast({ title: 'Removed from Job' });
                          } else {
                            toast({
                              title: 'Could not remove from job',
                              description: 'The assignment was not removed. Please try again.',
                              variant: 'destructive',
                            });
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="h-10 w-10 text-white/25 mx-auto mb-2" />
                  <p className="text-sm text-white">No active assignments</p>
                </div>
              )}
            </TabsContent>

            {/* Hours Tab */}
            <TabsContent value="hours" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Recent Timesheets</h4>
                {pendingTimesheets > 0 && (
                  <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                    {pendingTimesheets} pending
                  </Badge>
                )}
              </div>
              {recentTimesheets.length > 0 ? (
                <div className="space-y-2">
                  {recentTimesheets.map((t) => (
                    <div
                      key={t.id}
                      className={`p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-4 ${timesheetStatusTone(t.status)}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate">
                              {t.total_hours != null ? `${t.total_hours}h` : '—'}
                            </p>
                            <p className="text-xs text-white/50">
                              {t.date ? format(parseISO(t.date), 'EEE d MMM') : ''}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-white/20 text-white capitalize"
                        >
                          {t.status || 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-10 w-10 text-white/25 mx-auto mb-2" />
                  <p className="text-sm text-white">No timesheets yet</p>
                </div>
              )}
            </TabsContent>

            {/* Spend (Expenses) Tab */}
            <TabsContent value="spend" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Recent Expenses</h4>
                {pendingExpenses.length > 0 && (
                  <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                    £{pendingExpenseTotal.toFixed(2)} pending
                  </Badge>
                )}
              </div>
              {recentExpenses.length > 0 ? (
                <div className="space-y-2">
                  {recentExpenses.map((e) => (
                    <div
                      key={e.id}
                      className={`p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-4 ${expenseStatusTone(e.status)}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                            <PoundSterling className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate">
                              £{(Number(e.amount) || 0).toFixed(2)}
                              <span className="text-xs text-white font-normal">
                                {' '}
                                · {e.category}
                              </span>
                            </p>
                            <p className="text-xs text-white truncate">
                              {e.description ||
                                (e.submitted_date
                                  ? format(parseISO(e.submitted_date), 'd MMM')
                                  : '')}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-white/20 text-white capitalize"
                        >
                          {e.status || 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PoundSterling className="h-10 w-10 text-white/25 mx-auto mb-2" />
                  <p className="text-sm text-white">No expenses claimed</p>
                </div>
              )}
            </TabsContent>

            {/* Leave Tab */}
            <TabsContent value="leave" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Leave Requests</h4>
                {pendingLeave > 0 && (
                  <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                    {pendingLeave} pending
                  </Badge>
                )}
              </div>
              {recentLeave.length > 0 ? (
                <div className="space-y-2">
                  {recentLeave.map((l) => (
                    <div
                      key={l.id}
                      className={`p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-4 ${leaveStatusTone(l.status)}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate capitalize">
                              {l.type}
                              <span className="text-xs text-white font-normal">
                                {' '}
                                · {l.totalDays}d
                              </span>
                            </p>
                            <p className="text-xs text-white truncate">
                              {l.startDate ? format(parseISO(l.startDate), 'd MMM') : ''}
                              {l.endDate && l.endDate !== l.startDate
                                ? ` – ${format(parseISO(l.endDate), 'd MMM')}`
                                : ''}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-white/20 text-white capitalize"
                        >
                          {l.status || 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-10 w-10 text-white/25 mx-auto mb-2" />
                  <p className="text-sm text-white">No leave requests</p>
                </div>
              )}
            </TabsContent>

            {/* Credentials Tab */}
            <TabsContent value="creds" className="mt-0 space-y-4">
              {/* Elec-ID Section */}
              <div className="space-y-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-elec-yellow" />
                  Elec-ID Profile
                </h4>
                {elecIdLoading ? (
                  <div className="p-4 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] animate-pulse">
                    <div className="h-4 bg-white/[0.06] rounded w-3/4"></div>
                  </div>
                ) : elecIdProfile ? (
                  <div className="p-4 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                          <IdCard className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{elecIdProfile.elec_id_number}</p>
                          <div className="flex items-center gap-2 text-xs text-white/50">
                            <span className="capitalize">{elecIdProfile.ecs_card_type} Card</span>
                            {elecIdProfile.is_verified && (
                              <Badge
                                variant="outline"
                                className="border-emerald-500 text-emerald-400 text-[10px]"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <SecondaryButton
                        size="sm"
                        onClick={() => {
                          onOpenChange(false);
                          navigate(`/employer?section=elecid&member=${employee?.id}`);
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </SecondaryButton>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setCreateElecIdOpen(true)}
                    className="w-full p-4 rounded-xl border border-dashed border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-colors text-center touch-manipulation"
                  >
                    <IdCard className="h-8 w-8 text-white/25 mx-auto mb-2" />
                    <p className="text-sm font-medium text-white">No Elec-ID Profile</p>
                    <p className="text-xs text-white/50">Click to set up digital ID</p>
                  </button>
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <h4 className="font-medium text-white">Certifications ({employeeCerts.length})</h4>
                {employeeCerts.length > 0 ? (
                  <div className="space-y-2">
                    {employeeCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className={`p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-4 ${cert.status === 'Expired' ? 'border-l-red-500' : cert.status === 'Warning' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-white truncate">{cert.name}</p>
                            <p className="text-xs text-white/50">{cert.issuer}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ml-2 ${cert.status === 'Expired' ? 'border-red-500 text-red-400' : cert.status === 'Warning' ? 'border-amber-500 text-amber-400' : 'border-emerald-500 text-emerald-400'}`}
                          >
                            {cert.status === 'Expired'
                              ? 'Expired'
                              : cert.status === 'Warning'
                                ? `${cert.daysRemaining}d left`
                                : 'Active'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="h-8 w-8 text-white/25 mx-auto mb-2" />
                    <p className="text-sm text-white">No certifications on file</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Footer actions - fixed at bottom */}
      <div className="p-4 md:p-6 border-t border-white/[0.06] flex-shrink-0">
        {confirmArchive ? (
          <div className="space-y-2.5 max-h-[55vh] overflow-y-auto">
            {/* Pre-flight checklist — live counts of everything still hanging
                off this person. Informative, never blocking. */}
            <p className="text-[13px] font-semibold text-white">
              Before {employee.name.split(' ')[0]} leaves
            </p>
            {allClear ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-3 flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <p className="text-[12.5px] text-emerald-200/90">
                  Nothing outstanding — timesheets, jobs, tools and leave are all clear.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_11%)] divide-y divide-white/[0.06]">
                {offboardingChecklist.map((item) =>
                  item.count > 0 ? (
                    <button
                      key={item.key}
                      type="button"
                      onClick={item.onGo}
                      className="w-full min-h-[44px] px-3.5 py-2.5 flex items-center gap-2.5 text-left touch-manipulation hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="h-5 min-w-5 px-1 rounded-full bg-amber-500/15 text-amber-400 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                        {item.count}
                      </span>
                      <span className="flex-1 text-[12.5px] text-white">{item.label}</span>
                      <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0" />
                    </button>
                  ) : (
                    <div
                      key={item.key}
                      className="min-h-[44px] px-3.5 py-2.5 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span className="flex-1 text-[12.5px] text-white/55">{item.label}</span>
                      <span className="text-[11px] text-emerald-400/80 font-medium">Clear</span>
                    </div>
                  )
                )}
              </div>
            )}
            {/* Holiday balance — display only, for the final pay calculation */}
            {remainingHoliday !== null && remainingHoliday > 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_11%)] px-3.5 py-2.5 flex items-center gap-2.5">
                <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <p className="flex-1 text-[12.5px] text-white/70">
                  <span className="font-semibold text-white">
                    {remainingHoliday} day{remainingHoliday === 1 ? '' : 's'}
                  </span>{' '}
                  unused holiday — settle in final pay.
                </p>
              </div>
            )}
            <p className="text-[12.5px] text-white/70 leading-relaxed">
              {allClear ? (
                <>
                  Archive <span className="font-semibold text-white">{employee.name}</span>?{' '}
                </>
              ) : (
                <>
                  {outstandingCount} item{outstandingCount === 1 ? '' : 's'} outstanding —
                  archive <span className="font-semibold text-white">{employee.name}</span>{' '}
                  anyway?{' '}
                </>
              )}
              Their timesheets, certs and Elec-ID are kept, their worker access is switched off
              and their seat is released. You can restore them any time from the Archived tab.
            </p>
            <div className="flex gap-2">
              <SecondaryButton
                fullWidth
                onClick={() => setConfirmArchive(false)}
                disabled={updateEmployee.isPending}
              >
                Keep on team
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleArchiveToggle}
                disabled={updateEmployee.isPending}
              >
                {updateEmployee.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Archive className="h-4 w-4 mr-2" />
                )}
                {allClear ? 'Archive' : 'Archive anyway'}
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <SecondaryButton fullWidth onClick={onEdit}>
              <UserCog className="h-4 w-4 mr-2" />
              Edit Profile
            </SecondaryButton>
            {isArchived ? (
              <PrimaryButton
                fullWidth
                onClick={handleArchiveToggle}
                disabled={updateEmployee.isPending}
              >
                {updateEmployee.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ArchiveRestore className="h-4 w-4 mr-2" />
                )}
                Restore to team
              </PrimaryButton>
            ) : (
              <SecondaryButton
                fullWidth
                onClick={() => setConfirmArchive(true)}
                className="text-red-300 hover:text-red-200"
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </SecondaryButton>
            )}
          </div>
        )}
      </div>
    </>
  );

  // Mobile: Bottom Drawer
  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="max-h-[92vh] flex flex-col bg-[hsl(0_0%_8%)] border-t border-white/[0.06]">
            <DrawerTitle className="sr-only">{employee.name} — team member</DrawerTitle>
            {profileContent}
          </DrawerContent>
        </Drawer>
        <CreateElecIDForEmployeeDialog
          employeeId={employee.id}
          employeeName={employee.name}
          open={createElecIdOpen}
          onOpenChange={setCreateElecIdOpen}
        />
      </>
    );
  }

  // Desktop: Side Sheet
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg p-0 flex flex-col bg-[hsl(0_0%_8%)] border-l border-white/[0.06]"
        >
          <SheetTitle className="sr-only">{employee.name} — team member</SheetTitle>
          {profileContent}
        </SheetContent>
      </Sheet>
      <CreateElecIDForEmployeeDialog
        employeeId={employee.id}
        employeeName={employee.name}
        open={createElecIdOpen}
        onOpenChange={setCreateElecIdOpen}
      />
    </>
  );
}
