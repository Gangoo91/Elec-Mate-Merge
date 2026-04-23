import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  LoadingBlocks,
} from '@/components/employer/editorial';
import { useActiveEmployees } from '@/hooks/useEmployees';
import { useTalentPool } from '@/hooks/useTalentPool';
import { useNewApplicationsCount } from '@/hooks/useVacancyApplications';
import { useVacancies } from '@/hooks/useVacancies';
import { useTimesheets } from '@/hooks/useTimesheets';
import { useCommunicationStats } from '@/hooks/useCommunications';
import { useMemo } from 'react';

interface PeopleHubProps {
  onNavigate: (section: Section) => void;
}

export function PeopleHub({ onNavigate }: PeopleHubProps) {
  const { data: employees = [], isLoading: employeesLoading } = useActiveEmployees();
  const {
    totalCount: talentCount,
    availableNowCount,
    isLoading: talentLoading,
  } = useTalentPool();
  const { data: newApplicationsCount = 0, isLoading: appsLoading } =
    useNewApplicationsCount();
  const { data: vacancies = [], isLoading: vacanciesLoading } = useVacancies();
  const { data: timesheets = [], isLoading: timesheetsLoading } = useTimesheets();
  const { data: commStats, isLoading: commsLoading } = useCommunicationStats();

  const activeEmployees = employees.length;
  const unreadComms = commStats?.unreadCount || 0;
  const openVacancies = Array.isArray(vacancies)
    ? vacancies.filter((v: { status?: string }) => v?.status === 'open' || v?.status === 'active').length
    : 0;

  const totalHoursThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    return timesheets
      .filter((ts) => ts.date >= weekAgoStr)
      .reduce((sum, ts) => sum + (ts.total_hours || 0), 0);
  }, [timesheets]);

  const onOpenEmployees = () => onNavigate('team');
  const onOpenElecID = () => onNavigate('elecid');
  const onOpenTimesheets = () => onNavigate('timesheets');
  const onOpenComms = () => onNavigate('comms');
  const onOpenTalentPool = () => onNavigate('talentpool');
  const onOpenVacancies = () => onNavigate('vacancies');

  const isLoading =
    employeesLoading ||
    talentLoading ||
    appsLoading ||
    vacanciesLoading ||
    timesheetsLoading ||
    commsLoading;

  return (
    <HubLanding
      eyebrow="Your firm"
      title="People"
      description="Team, credentials, timesheets, comms, talent and vacancies."
      tone="blue"
      stats={[
        { label: 'Team', value: activeEmployees, onClick: onOpenEmployees },
        { label: 'Credentials', value: activeEmployees, tone: 'emerald' },
        { label: 'Open vacancies', value: openVacancies, tone: 'blue' },
        { label: 'Unread messages', value: unreadComms, tone: 'amber' },
      ]}
    >
      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <div className="space-y-4 sm:space-y-5">
            <SectionHeader eyebrow="Hiring" title="Recruitment" />
            <HubGrid columns={2}>
              <HubCard
                tone="blue"
                number="01"
                eyebrow="Talent"
                title="Talent Pool"
                description="Browse vetted sparkies available for work right now."
                meta={
                  availableNowCount > 0
                    ? `${availableNowCount} available now`
                    : `${talentCount} in pool`
                }
                cta="Open"
                onClick={onOpenTalentPool}
              />
              <HubCard
                tone="cyan"
                number="02"
                eyebrow="Vacancies"
                title="Job Vacancies"
                description="Post jobs and manage applications across your firm."
                meta={
                  newApplicationsCount > 0
                    ? `${newApplicationsCount} new applications`
                    : `${openVacancies} open`
                }
                cta="Open"
                onClick={onOpenVacancies}
              />
            </HubGrid>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <SectionHeader eyebrow="Day-to-day" title="Your Team" />
            <HubGrid columns={2}>
              <HubCard
                tone="blue"
                number="03"
                eyebrow="Workforce"
                title="Team"
                description="Operatives, supervisors and PMs on your books."
                meta={
                  activeEmployees > 0
                    ? `${activeEmployees} ${activeEmployees === 1 ? 'employee' : 'employees'}`
                    : 'No employees yet'
                }
                cta="Open"
                onClick={onOpenEmployees}
              />
              <HubCard
                tone="emerald"
                number="04"
                eyebrow="Compliance"
                title="Credentials / Elec-IDs"
                description="Cards, qualifications and renewal dates in one place."
                meta={
                  activeEmployees > 0
                    ? `${activeEmployees} profile${activeEmployees === 1 ? '' : 's'}`
                    : 'No profiles yet'
                }
                cta="Open"
                onClick={onOpenElecID}
              />
              <HubCard
                tone="amber"
                number="05"
                eyebrow="Hours"
                title="Timesheets"
                description="Approve hours, attendance and weekly submissions."
                meta={
                  totalHoursThisWeek > 0
                    ? `${Math.round(totalHoursThisWeek)}h this week`
                    : 'No hours logged'
                }
                cta="Open"
                onClick={onOpenTimesheets}
              />
              <HubCard
                tone="purple"
                number="06"
                eyebrow="Messaging"
                title="Communications"
                description="Internal messages, broadcasts and team alerts."
                meta={
                  unreadComms > 0
                    ? `${unreadComms} unread`
                    : 'All caught up'
                }
                cta="Open"
                onClick={onOpenComms}
              />
            </HubGrid>
          </div>
        </>
      )}
    </HubLanding>
  );
}
