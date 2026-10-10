import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  cisLabel,
  expiryState,
  useSubcontractorDetails,
  useSubcontractorTerms,
} from '@/hooks/useSubcontractors';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent } from '@/components/ui/tabs';
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
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useChaseTeamInvite } from '@/hooks/useTeamInvites';
import { PersonContractsCard } from '@/components/employer/contracts/PersonContractsCard';
import { PersonRightToWorkCard } from '@/components/employer/people/PersonRightToWorkCard';
import { PersonProbationCard } from '@/components/employer/people/PersonProbationCard';
import {
  StarterChecklistCard,
  type StarterCardKey,
} from '@/components/employer/people/StarterChecklist';
import { useStarters } from '@/hooks/useStarters';
import { PersonPayLawCard } from '@/components/employer/payLaw/PersonPayLawCard';
import { PersonHolidayRecord } from '@/components/employer/payLaw/PersonHolidayRecord';
import { useMarkLeaver, useRestoreLeaver } from '@/hooks/useHrRecords';
import { LeavingDateField } from '@/components/employer/people/LeavingDateField';
import { leavingDateValid, todayIso } from '@/lib/leavingDate';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  panel,
  PanelTitle,
  Row,
  RowList,
  rowsClass,
  KeyValue,
  StatusPill,
  PlainEmpty,
  Segments,
  rowBtn,
  rowBtnPrimary,
  rowBtnSecondary,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { toast } from '@/hooks/use-toast';
import { CourseAssignmentsList } from '@/components/employer/CourseAssignmentsList';
import { PersonTrainingEvidence } from '@/components/employer/PersonTrainingEvidence';
import { ACCESS_ROLE_LABEL, accessRoleOf } from '@/lib/teamRoles';
import { ACCESS_GUIDE_ROUTE } from '@/lib/roleAccess';
import { ecsCardPhrase } from '@/data/uk-electrician-constants';

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
  // ?memberTab=creds lands a deep link (the course-completed bell) on the
  // Credentials tab, where assigned courses sit.
  const [searchParams, setSearchParams] = useSearchParams();
  const memberTab = searchParams.get('memberTab');
  useEffect(() => {
    if (!open || !employee || !memberTab) return;
    if (['details', 'jobs', 'hours', 'spend', 'leave', 'creds'].includes(memberTab)) {
      setActiveTab(memberTab);
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('memberTab');
        return next;
      },
      { replace: true }
    );
  }, [open, employee, memberTab, setSearchParams]);
  const [createElecIdOpen, setCreateElecIdOpen] = useState(false);
  const chaseInvite = useChaseTeamInvite();
  const resending = chaseInvite.isPending;
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;
  // ELE-1830: subbies have their own block (trade, insurance, CIS) and no holiday.
  const isSub = (employee?.teamRole || employee?.team_role) === 'Subcontractor';
  const { data: subDetails } = useSubcontractorDetails(isSub ? employee?.id : null);
  const { data: subTerms } = useSubcontractorTerms(isSub ? employee?.id : null, canSeeMoney);
  const [confirmArchive, setConfirmArchive] = useState(false);
  // While the starter checklist is open its rows stand for the right to work,
  // probation, date of birth and contract cards, so those cards stay folded
  // away until a row opens one (they showed twice and could disagree).
  const { data: starterRows = [] } = useStarters(employee?.id ?? null, open && canSeeMoney);
  const checklistOpen = canSeeMoney && !!starterRows[0] && !starterRows[0].finished_at;
  const [openCards, setOpenCards] = useState<StarterCardKey[]>([]);
  useEffect(() => setOpenCards([]), [employee?.id, open]);
  const showCard = (k: StarterCardKey) => !checklistOpen || openCards.includes(k);
  const openStarterCard = (k: StarterCardKey) => {
    setOpenCards((c) => (c.includes(k) ? c : [...c, k]));
    const id = {
      rtw: 'person-rtw',
      contract: 'person-contract',
      probation: 'person-probation',
      pay_profile: 'person-pay',
    }[k];
    window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    );
  };
  // ELE-2075: archiving always records the real leaving date, which starts
  // the retention periods. Office managers can archive, so they can set it.
  const markLeaver = useMarkLeaver();
  const restoreLeaver = useRestoreLeaver();
  const [leftOn, setLeftOn] = useState(todayIso());
  const leavePending = markLeaver.isPending || restoreLeaver.isPending;

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

  // Expenses — already ordered by submitted_date desc from the hook
  const recentExpenses = rawExpenses.slice(0, 12);
  const pendingExpenses = rawExpenses.filter((e) => (e.status || '').toLowerCase() === 'pending');
  const pendingExpenseTotal = pendingExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  // Leave — useLeaveRequests is employer-scoped; filter to this worker
  const employeeLeave = allLeave.filter((l) => l.employeeId === employee?.id);
  const recentLeave = employeeLeave.slice(0, 12);
  const pendingLeave = employeeLeave.filter(
    (l) => (l.status || '').toLowerCase() === 'pending'
  ).length;

  // Live on-site presence — latest location row for this worker (clock-in derived)
  const presence = workerLocations.find((l) => l.employee_id === employee?.id);
  // The location row embeds the job under the table-name key `employer_jobs`.
  const presenceJobTitle = (presence as { employer_jobs?: { title?: string } } | undefined)
    ?.employer_jobs?.title;
  const presenceSince =
    presence?.status === 'Off Duty'
      ? presence?.checked_out_at || presence?.last_updated
      : presence?.checked_in_at || presence?.last_updated;

  const isInvited = !employee.userId && (employee.status ?? '').toLowerCase() !== 'archived';
  // Same gate as the Invited tab (ELE-1951): a day between emails, three
  // reminders at most, recorded on the roster row.
  const handleResendInvite = () => {
    chaseInvite.mutate(employee.id, {
      onSuccess: () =>
        toast({
          title: 'Reminder sent',
          description: `A fresh invite is on its way to ${employee.email}.`,
        }),
      onError: (err) =>
        toast({
          title: 'Not sent',
          description: err instanceof Error ? err.message : 'Please try again.',
          variant: 'destructive',
        }),
    });
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
  // (hard deletes are FK-RESTRICTed at the DB), records the leaving date and
  // releases the paid seat (hr_mark_leaver, then the seat resync). Restore
  // reverses it.
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
        navigate('/employer?section=kit');
      },
    },
    {
      key: 'leave',
      label: 'Leave requests pending',
      count: pendingLeave,
      onGo: () => {
        onOpenChange(false);
        navigate('/employer?section=leave');
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
      if (isArchived) {
        await restoreLeaver.mutateAsync(employee.id);
      } else {
        await markLeaver.mutateAsync({ rosterId: employee.id, leftOn });
      }
      toast({
        title: isArchived ? 'Restored to team' : 'Archived',
        description: isArchived
          ? `${employee.name} is back on the active roster.`
          : `${employee.name} moved to Archived. History kept, seat released.`,
      });
      setConfirmArchive(false);
      onOpenChange(false);
    } catch (e) {
      toast({
        title: isArchived ? 'Could not restore' : 'Could not archive',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const firstName = employee.name.split(' ')[0] || 'they';
  const teamRoleLabel = employee.teamRole || employee.team_role || 'Operative';
  const statusPill = (status: string | undefined, pendingTone: PillTone = 'volt') => {
    const st = (status || 'pending').toLowerCase();
    const label = st.charAt(0).toUpperCase() + st.slice(1);
    const tone: PillTone =
      st === 'approved' || st === 'paid'
        ? 'green'
        : st === 'rejected' || st === 'declined' || st === 'cancelled'
          ? 'red'
          : st === 'pending' || st === 'submitted'
            ? pendingTone
            : 'neutral';
    return <StatusPill tone={tone}>{label === 'Rejected' ? 'Declined' : label}</StatusPill>;
  };

  const tabs: { value: string; label: string }[] = [
    { value: 'details', label: 'Details' },
    { value: 'jobs', label: 'Jobs' },
    { value: 'hours', label: 'Hours' },
    { value: 'spend', label: 'Spend' },
    { value: 'leave', label: 'Leave' },
    { value: 'creds', label: 'Credentials' },
  ];

  // ELE-1831: "Why can't I see this?" lands on the role guide in Settings.
  const openAccessGuide = (role: string) => {
    onOpenChange(false);
    navigate(`${ACCESS_GUIDE_ROUTE}&role=${role}`);
  };
  const facts: { label: string; value: string; onClick?: () => void }[] = [
    // Pay is owner/admin only: office managers don't see it
    ...(canSeeMoney
      ? [
          isSub
            ? {
                label: subTerms?.rate_basis === 'hour' ? 'Hourly rate' : 'Day rate',
                value: subTerms?.rate ? `£${subTerms.rate}` : 'Not set',
              }
            : {
                label: 'Hourly rate',
                value: employee.hourlyRate ? `£${employee.hourlyRate}` : 'Not set',
              },
        ]
      : [
          {
            label: 'Pay rate',
            value: 'Owner and admins',
            onClick: () => openAccessGuide(roleInfo?.role ?? 'office'),
          },
        ]),
    { label: 'Team role', value: teamRoleLabel },
    {
      label: 'Access',
      value: ACCESS_ROLE_LABEL[accessRoleOf(teamRoleLabel)],
      onClick: () => openAccessGuide(accessRoleOf(teamRoleLabel)),
    },
    { label: 'Status', value: isInvited ? 'Invited' : employee.availability },
    ...(employee.joinDate
      ? [{ label: 'Joined', value: format(parseISO(employee.joinDate), 'd MMM yyyy') }]
      : []),
  ];

  const emptyLine = (text: string) => <PlainEmpty text={text} />;

  // Shared content for both Sheet and Drawer. Plain JSX, NOT a nested
  // component: an inline component gets a new identity every render, which
  // remounts the whole subtree (scroll jumps to top on each state change).
  const profileContent = (
    <>
      {/* Header: who, one status line, the actions on one row */}
      <div className="shrink-0 px-4 pb-3 pt-4 sm:px-6">
        <div className="flex items-center gap-3.5 pr-10">
          <div className="relative shrink-0">
            <Avatar className="h-14 w-14">
              <AvatarImage src={employeePhotoSrc ?? undefined} alt={employee.name} />
              <AvatarFallback className="bg-white/[0.1] text-[16px] font-bold text-white">
                {employee.avatar}
              </AvatarFallback>
            </Avatar>
            {employee.availability === 'Available' && !isInvited && (
              <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-[hsl(0_0%_8%)] bg-emerald-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="truncate text-[22px] font-semibold leading-tight tracking-tight text-white">
                {employee.name}
              </h2>
              {/* ELE-1831: what this person can see, as one of the firm's roles */}
              <button
                type="button"
                onClick={() => openAccessGuide(accessRoleOf(teamRoleLabel))}
                title="What this role can see"
                className="hidden shrink-0 touch-manipulation sm:inline-flex"
              >
                <StatusPill>{ACCESS_ROLE_LABEL[accessRoleOf(teamRoleLabel)]}</StatusPill>
              </button>
            </div>
            <p className="mt-0.5 truncate text-[14px] text-white">
              {employee.role} · {teamRoleLabel} ·{' '}
              {isInvited ? 'Invited' : isArchived ? 'Archived' : employee.availability}
              {expiringSoonCerts.length > 0 && (
                <span className="font-semibold text-elec-yellow">
                  {' '}
                  · {expiringSoonCerts.length} cert{expiringSoonCerts.length === 1 ? '' : 's'} due
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Invited but not yet joined: resend the branded invite */}
        {isInvited && (
          <div className={cn(panel, 'mt-4 flex items-center gap-3 px-4 py-3 sm:px-5')}>
            <p className="min-w-0 flex-1 text-[13px] leading-snug text-white">
              Invite sent{employee.email ? ` to ${employee.email}` : ''}. Waiting for {firstName} to
              join.
            </p>
            <button
              type="button"
              onClick={handleResendInvite}
              disabled={resending}
              className={rowBtnSecondary}
            >
              {resending ? 'Sending…' : 'Chase'}
            </button>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onAssignToJob}
            className={cn(rowBtnPrimary, 'flex-1 sm:flex-none sm:px-5')}
          >
            Assign to job
          </button>
          <button
            type="button"
            onClick={onSendMessage}
            className={cn(rowBtnSecondary, 'flex-1 sm:flex-none sm:px-5')}
          >
            Message
          </button>
          {employee.phone && (
            <button
              type="button"
              onClick={handleCall}
              className={cn(rowBtnSecondary, 'flex-1 sm:flex-none sm:px-5')}
            >
              Call
            </button>
          )}
        </div>
      </div>

      {/* Tabs: they wrap into a grid on a phone, never scroll sideways */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className="flex shrink-0 border-b border-white/[0.08] px-4 pb-3 sm:px-6">
          <Segments items={tabs} value={activeTab} onChange={setActiveTab} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 py-5 sm:px-6">
            {/* Details */}
            <TabsContent value="details" className="mt-0">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="min-w-0 space-y-6">
                  <section>
                    <PanelTitle title="At a glance" />
                    <div className={cn(panel, 'overflow-hidden')}>
                      <div className={rowsClass}>
                        {facts.map((f) => (
                          <KeyValue
                            key={f.label}
                            label={f.label}
                            value={f.value}
                            onClick={f.onClick}
                          />
                        ))}
                        {/* Live on-site presence (clock-in derived) */}
                        {presence && (
                          <KeyValue
                            label={presenceJobTitle ? `Now · ${presenceJobTitle}` : 'Now'}
                            value={`${presence.status}${
                              presenceSince
                                ? ` since ${format(parseISO(presenceSince), 'EEE HH:mm')}`
                                : ''
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Contact: only render channels that exist; a tappable row
                      dialling tel:undefined is worse than an honest gap */}
                  <section>
                    <PanelTitle title="Contact" />
                    {employee.phone || employee.email ? (
                      <RowList>
                        {employee.phone && (
                          <Row title={employee.phone} detail="Mobile" onClick={handleCall} />
                        )}
                        {employee.email && (
                          <Row
                            title={employee.email}
                            detail="Email"
                            onClick={() => (window.location.href = `mailto:${employee.email}`)}
                          />
                        )}
                        {employee.emergencyContact && (
                          <Row
                            title={employee.emergencyContact.name}
                            detail={`Emergency contact${
                              employee.emergencyContact.relationship
                                ? `, ${employee.emergencyContact.relationship}`
                                : ''
                            } · ${employee.emergencyContact.phone}`}
                            trailing={<StatusPill tone="red">Emergency</StatusPill>}
                            onClick={handleEmergencyCall}
                          />
                        )}
                      </RowList>
                    ) : (
                      <PlainEmpty
                        text={`No contact details on file. Add a phone or email so you can reach ${firstName} from site.`}
                        action="Add details"
                        onAction={onEdit}
                      />
                    )}
                    {!employee.phone && !employee.email && employee.emergencyContact && (
                      <RowList className="mt-3">
                        <Row
                          title={employee.emergencyContact.name}
                          detail={`Emergency contact · ${employee.emergencyContact.phone}`}
                          trailing={<StatusPill tone="red">Emergency</StatusPill>}
                          onClick={handleEmergencyCall}
                        />
                      </RowList>
                    )}
                  </section>
                </div>

                <div className="min-w-0 space-y-6">
                  {/* ELE-2091: the new starter checklist (owner/admin; hidden when they were not hired through a vacancy) */}
                  {canSeeMoney && !isArchived && (
                    <StarterChecklistCard
                      person={{
                        id: employee.id,
                        name: employee.name,
                        email: employee.email,
                        teamRole: employee.teamRole || employee.team_role,
                        hourlyRate: employee.hourlyRate,
                        joinDate: employee.joinDate,
                        linked: !!employee.userId,
                      }}
                      onEdit={onEdit}
                      onAssignToJob={onAssignToJob}
                      onOpenCard={openStarterCard}
                      onCheckCards={() => setActiveTab('creds')}
                    />
                  )}

                  {isSub && (
                    <section>
                      <PanelTitle title="Subcontractor" meta="No holiday or PAYE" />
                      <div className={cn(panel, 'overflow-hidden')}>
                        <div className={rowsClass}>
                          <KeyValue label="Trade" value={subDetails?.trade || 'Not set'} />
                          <KeyValue
                            label="Insurance"
                            value={expiryState(subDetails?.insurance_expiry ?? null).label}
                          />
                          {canSeeMoney && (
                            <KeyValue label="CIS" value={cisLabel(subTerms?.cis_status)} />
                          )}
                          <Row
                            title="Days, statements and insurance"
                            onClick={() => {
                              onOpenChange(false);
                              navigate(`/employer?section=subcontractors&member=${employee.id}`);
                            }}
                          />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* ELE-2061: right to work, for employees and subcontractors */}
                  {!isArchived && showCard('rtw') && (
                    <div id="person-rtw" className="scroll-mt-4">
                      <PersonRightToWorkCard
                        person={{
                          id: employee.id,
                          name: employee.name,
                          teamRole: employee.teamRole || employee.team_role,
                        }}
                        canRecord={canSeeMoney}
                      />
                    </div>
                  )}
                  {/* ELE-2075: probation and the qualifying date (owner/admin) */}
                  {canSeeMoney && !isSub && !isArchived && showCard('probation') && (
                    <div id="person-probation" className="scroll-mt-4">
                      <PersonProbationCard
                        person={{
                          id: employee.id,
                          name: employee.name,
                          joinDate: employee.joinDate,
                        }}
                      />
                    </div>
                  )}

                  {/* ELE-2062/2063: date of birth, minimum wage check, holiday basis (owner/admin) */}
                  {canSeeMoney && !isSub && !isArchived && showCard('pay_profile') && (
                    <div id="person-pay" className="scroll-mt-4">
                      <PersonPayLawCard
                        person={{
                          id: employee.id,
                          name: employee.name,
                          teamRole: employee.teamRole || employee.team_role,
                        }}
                      />
                    </div>
                  )}

                  {/* Contract: sent and tracked from the person (ELE-1982) */}
                  {showCard('contract') && (
                    <div id="person-contract" className="scroll-mt-4">
                      <PersonContractsCard
                        person={{
                          id: employee.id,
                          name: employee.name,
                          email: employee.email,
                          teamRole: employee.teamRole || employee.team_role,
                          hourlyRate: canSeeMoney ? employee.hourlyRate : null,
                          linked: !!employee.userId,
                        }}
                        canSeeMoney={canSeeMoney}
                        onNavigateAway={() => onOpenChange(false)}
                      />
                    </div>
                  )}

                  {/* Invited: set expectations instead of a void */}
                  {isInvited && (
                    <PlainEmpty
                      text={`Once ${firstName} accepts the invite, their jobs, clocked hours, expenses and credentials show here.`}
                    />
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Jobs */}
            <TabsContent value="jobs" className="mt-0">
              <PanelTitle
                title="Current jobs"
                meta={employeeAssignments.length > 0 ? `${employeeAssignments.length}` : undefined}
                action="Assign"
                onAction={onAssignToJob}
              />
              {employeeAssignments.length > 0 ? (
                <RowList>
                  {employeeAssignments.map((a) => (
                    <Row
                      key={a.id}
                      title={a.jobTitle}
                      detail={a.jobLocation || 'No address on the job'}
                      trailing={
                        <button
                          type="button"
                          aria-label={`Take ${firstName} off ${a.jobTitle}`}
                          title="Take off this job"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation hover:border-red-500/50 hover:text-red-400"
                          onClick={async () => {
                            // deleteJobAssignment returns false on failure rather
                            // than throwing: only confirm when the row is gone
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
                      }
                    />
                  ))}
                </RowList>
              ) : (
                emptyLine(`${employee.name} is not on any job right now.`)
              )}
            </TabsContent>

            {/* Hours */}
            <TabsContent value="hours" className="mt-0">
              <PanelTitle
                title="Recent timesheets"
                meta={pendingTimesheets > 0 ? `${pendingTimesheets} to approve` : undefined}
                action={pendingTimesheets > 0 ? 'Approve' : undefined}
                onAction={
                  pendingTimesheets > 0
                    ? () => {
                        onOpenChange(false);
                        navigate('/employer?section=timesheets');
                      }
                    : undefined
                }
              />
              {recentTimesheets.length > 0 ? (
                <RowList>
                  {recentTimesheets.map((t) => (
                    <Row
                      key={t.id}
                      title={t.total_hours != null ? `${t.total_hours}h` : 'Hours not in yet'}
                      detail={t.date ? format(parseISO(t.date), 'EEEE d MMM') : ''}
                      trailing={statusPill(t.status)}
                    />
                  ))}
                </RowList>
              ) : (
                emptyLine('No timesheets yet.')
              )}
            </TabsContent>

            {/* Spend (expenses) */}
            <TabsContent value="spend" className="mt-0">
              <PanelTitle
                title="Recent expenses"
                meta={
                  pendingExpenses.length > 0
                    ? `£${pendingExpenseTotal.toFixed(2)} waiting`
                    : undefined
                }
              />
              {recentExpenses.length > 0 ? (
                <RowList>
                  {recentExpenses.map((e) => (
                    <Row
                      key={e.id}
                      title={`£${(Number(e.amount) || 0).toFixed(2)}${e.category ? ` · ${e.category}` : ''}`}
                      detail={
                        e.description ||
                        (e.submitted_date ? format(parseISO(e.submitted_date), 'd MMM') : '')
                      }
                      trailing={statusPill(e.status)}
                    />
                  ))}
                </RowList>
              ) : (
                emptyLine('No expenses claimed.')
              )}
            </TabsContent>

            {/* Leave */}
            <TabsContent value="leave" className="mt-0">
              <PanelTitle
                title="Leave requests"
                meta={pendingLeave > 0 ? `${pendingLeave} to decide` : undefined}
                action={pendingLeave > 0 ? 'Decide' : undefined}
                onAction={
                  pendingLeave > 0
                    ? () => {
                        onOpenChange(false);
                        navigate('/employer?section=leave');
                      }
                    : undefined
                }
              />
              {recentLeave.length > 0 ? (
                <RowList>
                  {recentLeave.map((l) => (
                    <Row
                      key={l.id}
                      title={`${l.type ? l.type.charAt(0).toUpperCase() + l.type.slice(1) : 'Leave'} · ${l.totalDays} day${l.totalDays === 1 ? '' : 's'}`}
                      detail={`${l.startDate ? format(parseISO(l.startDate), 'd MMM') : ''}${
                        l.endDate && l.endDate !== l.startDate
                          ? ` to ${format(parseISO(l.endDate), 'd MMM')}`
                          : ''
                      }`}
                      trailing={statusPill(l.status)}
                    />
                  ))}
                </RowList>
              ) : (
                emptyLine('No leave requests.')
              )}
              {/* ELE-2062: accrual for irregular hours and the 6-year record (owner/admin) */}
              {canSeeMoney && !isSub && (
                <div className="mt-6">
                  <PersonHolidayRecord person={{ id: employee.id, name: employee.name }} />
                </div>
              )}
            </TabsContent>

            {/* Credentials */}
            <TabsContent value="creds" className="mt-0">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="min-w-0 space-y-6">
                  <section>
                    <PanelTitle title="Elec-ID" />
                    {elecIdLoading ? (
                      <div className={cn(panel, 'h-[60px] animate-pulse')} />
                    ) : elecIdProfile ? (
                      <RowList>
                        <Row
                          title={elecIdProfile.elec_id_number}
                          detail={
                            elecIdProfile.ecs_card_type
                              ? ecsCardPhrase(elecIdProfile.ecs_card_type)
                              : 'No ECS card recorded'
                          }
                          trailing={
                            elecIdProfile.is_verified ? (
                              <StatusPill>Approved by Elec-Mate</StatusPill>
                            ) : undefined
                          }
                          onClick={() => {
                            onOpenChange(false);
                            navigate(`/employer?section=elecid&member=${employee?.id}`);
                          }}
                        />
                      </RowList>
                    ) : (
                      <PlainEmpty
                        text={`${firstName} has no Elec-ID yet. Set one up to record their ECS card and qualifications.`}
                        action="Set up Elec-ID"
                        onAction={() => setCreateElecIdOpen(true)}
                      />
                    )}
                  </section>

                  <section>
                    <PanelTitle
                      title="Certifications"
                      meta={employeeCerts.length > 0 ? `${employeeCerts.length}` : undefined}
                    />
                    {employeeCerts.length > 0 ? (
                      <RowList>
                        {employeeCerts.map((cert) => (
                          <Row
                            key={cert.id}
                            title={cert.name}
                            detail={cert.issuer || 'No issuer recorded'}
                            trailing={
                              <StatusPill
                                tone={
                                  cert.status === 'Expired'
                                    ? 'red'
                                    : cert.status === 'Warning'
                                      ? 'volt'
                                      : 'green'
                                }
                              >
                                {cert.status === 'Expired'
                                  ? 'Expired'
                                  : cert.status === 'Warning'
                                    ? `${cert.daysRemaining} days left`
                                    : 'In date'}
                              </StatusPill>
                            }
                          />
                        ))}
                      </RowList>
                    ) : (
                      emptyLine('No certifications on file.')
                    )}
                  </section>

                  {/* ELE-1834: briefings signed and training hours, never a ticket */}
                  <PersonTrainingEvidence
                    employeeId={employee.id}
                    firstName={firstName}
                    onNavigateAway={() => onOpenChange(false)}
                  />
                </div>

                {/* ELE-1834: Study Centre courses the firm asked them to do */}
                <div className="min-w-0">
                  <CourseAssignmentsList
                    person={{ id: employee.id, name: employee.name, linked: !!employee.userId }}
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Footer: always visible */}
      <div className="shrink-0 border-t border-white/[0.08] bg-[hsl(0_0%_8%)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
        {confirmArchive ? (
          <div className="max-h-[55vh] space-y-3 overflow-y-auto">
            {/* Pre-flight checklist: live counts of everything still hanging
                off this person. Informative, never blocking. */}
            <p className="text-[15px] font-semibold text-white">Before {firstName} leaves</p>
            <div className={cn(panel, 'overflow-hidden')}>
              <div className={rowsClass}>
                {offboardingChecklist.map((item) =>
                  item.count > 0 ? (
                    <Row
                      key={item.key}
                      title={item.label}
                      onClick={item.onGo}
                      trailing={<StatusPill tone="volt">{item.count}</StatusPill>}
                    />
                  ) : (
                    <Row
                      key={item.key}
                      title={item.label}
                      trailing={<StatusPill tone="green">Clear</StatusPill>}
                    />
                  )
                )}
                {/* Holiday balance: display only, for the final pay calculation */}
                {!isSub && remainingHoliday !== null && remainingHoliday > 0 && (
                  <Row
                    title={`${remainingHoliday} day${remainingHoliday === 1 ? '' : 's'} unused holiday`}
                    detail="Settle it in their final pay"
                  />
                )}
              </div>
            </div>
            <LeavingDateField value={leftOn} onChange={setLeftOn} firstName={firstName} />
            <p className="text-[13px] leading-relaxed text-white">
              {allClear ? (
                <>
                  Archive <span className="font-semibold">{employee.name}</span>?{' '}
                </>
              ) : (
                <>
                  {outstandingCount} item{outstandingCount === 1 ? '' : 's'} outstanding. Archive{' '}
                  <span className="font-semibold">{employee.name}</span> anyway?{' '}
                </>
              )}
              Their timesheets, certs and Elec-ID are kept, their worker access is switched off and
              their seat is released. You can restore them any time from the Archived tab.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className={cn(rowBtnSecondary, 'flex-1')}
                onClick={() => setConfirmArchive(false)}
                disabled={leavePending}
              >
                Keep on team
              </button>
              <button
                type="button"
                className={cn(rowBtnPrimary, 'flex-1')}
                onClick={handleArchiveToggle}
                disabled={leavePending || !leavingDateValid(leftOn)}
              >
                {leavePending && <Loader2 className="h-4 w-4 animate-spin" />}
                {allClear ? 'Archive' : 'Archive anyway'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 sm:justify-end">
            <button
              type="button"
              data-help="team.edit-profile"
              className={cn(rowBtnSecondary, 'flex-1 sm:flex-none sm:px-6')}
              onClick={onEdit}
            >
              Edit profile
            </button>
            {isArchived ? (
              <button
                type="button"
                className={cn(rowBtnPrimary, 'flex-1 sm:flex-none sm:px-6')}
                onClick={handleArchiveToggle}
                disabled={leavePending}
              >
                {leavePending && <Loader2 className="h-4 w-4 animate-spin" />}
                Restore to team
              </button>
            ) : (
              <button
                type="button"
                className={cn(
                  rowBtn,
                  'flex-1 border border-red-500/40 text-red-400 hover:bg-red-500/10 sm:flex-none sm:px-6'
                )}
                onClick={() => {
                  setLeftOn(todayIso());
                  setConfirmArchive(true);
                }}
              >
                Archive
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );

  // Phone: bottom drawer at the house height
  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="flex h-[85vh] flex-col border-t border-white/[0.06] bg-[hsl(0_0%_8%)]">
            <DrawerTitle className="sr-only">{employee.name}, team member</DrawerTitle>
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

  // Desktop: a wide side sheet, details in two columns
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="flex w-full flex-col border-l border-white/[0.06] bg-[hsl(0_0%_8%)] p-0 sm:max-w-2xl lg:max-w-[960px]"
        >
          <SheetTitle className="sr-only">{employee.name}, team member</SheetTitle>
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
