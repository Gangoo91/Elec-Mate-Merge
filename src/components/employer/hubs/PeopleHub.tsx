import BusinessCard from '@/components/business-hub/BusinessCard';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  Users,
  UserSearch,
  Briefcase,
  CreditCard,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { useActiveEmployees } from '@/hooks/useEmployees';
import { useTalentPool } from '@/hooks/useTalentPool';
import { useNewApplicationsCount } from '@/hooks/useVacancyApplications';
import { useTimesheets } from '@/hooks/useTimesheets';
import { useCommunicationStats } from '@/hooks/useCommunications';
import { useMemo } from 'react';

interface PeopleHubProps {
  onNavigate: (section: Section) => void;
}

export function PeopleHub({ onNavigate }: PeopleHubProps) {
  const { data: employees = [] } = useActiveEmployees();
  const { totalCount: talentCount, availableNowCount } = useTalentPool();
  const { data: newApplicationsCount = 0 } = useNewApplicationsCount();
  const { data: timesheets = [] } = useTimesheets();
  const { data: commStats } = useCommunicationStats();

  const activeEmployees = employees.length;
  const unreadComms = commStats?.unreadCount || 0;

  const totalHoursThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    return timesheets
      .filter((ts) => ts.date >= weekAgoStr)
      .reduce((sum, ts) => sum + (ts.total_hours || 0), 0);
  }, [timesheets]);

  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      {/* Recruitment */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Recruitment
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Talent Pool"
            description="Browse available sparkies"
            icon={UserSearch}
            onClick={() => onNavigate('talentpool')}
            accentColor="from-emerald-500 via-emerald-400 to-green-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
            liveSubtitle={availableNowCount > 0 ? `${availableNowCount} available now` : `${talentCount} total`}
          />
          <BusinessCard
            title="Job Vacancies"
            description="Post jobs & manage apps"
            icon={Briefcase}
            onClick={() => onNavigate('vacancies')}
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
            liveSubtitle={newApplicationsCount > 0 ? `${newApplicationsCount} new apps` : undefined}
          />
        </div>
      </section>

      {/* Your Team */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Your Team
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Team List"
            description="Manage workers"
            icon={Users}
            onClick={() => onNavigate('team')}
            accentColor="from-elec-yellow via-amber-400 to-orange-400"
            iconColor="text-elec-yellow"
            iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
            liveSubtitle={activeEmployees > 0 ? `${activeEmployees} active` : undefined}
          />
          <BusinessCard
            title="Credentials"
            description="Elec-ID & compliance"
            icon={CreditCard}
            onClick={() => onNavigate('elecid')}
            accentColor="from-purple-500 via-violet-400 to-indigo-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
          <BusinessCard
            title="Timesheets"
            description="Hours & attendance"
            icon={Clock}
            onClick={() => onNavigate('timesheets')}
            accentColor="from-orange-500 via-amber-400 to-red-400"
            iconColor="text-orange-400"
            iconBg="bg-orange-500/10 border border-orange-500/20"
            liveSubtitle={totalHoursThisWeek > 0 ? `${Math.round(totalHoursThisWeek)}h this week` : undefined}
          />
          <BusinessCard
            title="Comms"
            description="Messages & alerts"
            icon={MessageSquare}
            onClick={() => onNavigate('comms')}
            accentColor="from-cyan-500 via-blue-400 to-blue-500"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
            liveSubtitle={unreadComms > 0 ? `${unreadComms} unread` : undefined}
          />
        </div>
      </section>
    </div>
  );
}
