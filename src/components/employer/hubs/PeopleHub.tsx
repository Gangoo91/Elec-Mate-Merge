import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import type { Section } from "@/pages/employer/EmployerDashboard";
import { 
  Users, 
  UserSearch, 
  Briefcase, 
  CreditCard, 
  Clock,
  MessageSquare,
  Award,
  UserPlus
} from "lucide-react";
import { employees, availableElectricians, jobVacancies, vacancyApplications, timesheets } from "@/data/employerMockData";

interface PeopleHubProps {
  onNavigate: (section: Section) => void;
}

export function PeopleHub({ onNavigate }: PeopleHubProps) {
  const activeEmployees = employees.filter(e => e.status === "Active").length;
  const availableTalent = availableElectricians.filter(e => e.status === "Available").length;
  const openVacancies = jobVacancies.filter(v => v.status === "Open").length;
  const newApplications = vacancyApplications.filter(a => a.status === "New").length;
  const totalHoursThisWeek = timesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
  
  // Determine if user is a sole trader (no employees other than themselves)
  const isSoloTrader = activeEmployees <= 1;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title={isSoloTrader ? "My Profile" : "People Hub"}
        description={isSoloTrader ? "Your credentials and training" : "Manage your team and find talent"}
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeEmployees}</p>
              <p className="text-xs text-muted-foreground">Your Team</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <UserSearch className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{availableTalent}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{openVacancies}</p>
              <p className="text-xs text-muted-foreground">Open Roles</p>
            </div>
          </CardContent>
        </Card>
        {newApplications > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{newApplications}</p>
                <p className="text-xs text-muted-foreground">New Apps</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recruitment */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Recruitment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FeatureTile
            icon={UserSearch}
            title="Talent Pool"
            description="Browse electricians on Elec-Mate looking for work"
            onClick={() => onNavigate("talentpool")}
            badge={`${availableTalent} available`}
          />
          <FeatureTile
            icon={Briefcase}
            title="Job Vacancies"
            description="Post jobs and manage applications"
            onClick={() => onNavigate("vacancies")}
            badge={newApplications > 0 ? `${newApplications} new` : undefined}
            badgeVariant="warning"
          />
        </div>
      </div>

      {/* Your Team - Show for team mode */}
      {!isSoloTrader && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Your Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <FeatureTile
              icon={Users}
              title="Team List"
              description="Manage workers & permissions"
              onClick={() => onNavigate("team")}
              compact
            />
            <FeatureTile
              icon={CreditCard}
              title="Credentials"
              description="Elec-ID & compliance"
              onClick={() => onNavigate("elecid")}
              compact
            />
            <FeatureTile
              icon={Clock}
              title="Timesheets"
              description="Hours & attendance"
              onClick={() => onNavigate("timesheets")}
              badge={`${totalHoursThisWeek}h`}
              compact
            />
            <FeatureTile
              icon={MessageSquare}
              title="Comms"
              description="Messages & alerts"
              onClick={() => onNavigate("comms")}
              compact
            />
          </div>
        </div>
      )}

      {/* Solo Trader - My Credentials */}
      {isSoloTrader && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            My Credentials
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <FeatureTile
              icon={CreditCard}
              title="My Credentials"
              description="Elec-ID & compliance"
              onClick={() => onNavigate("elecid")}
              compact
            />
            <FeatureTile
              icon={Clock}
              title="My Time Log"
              description="Track your hours"
              onClick={() => onNavigate("timesheets")}
              badge={`${totalHoursThisWeek}h`}
              compact
            />
          </div>
        </div>
      )}
    </div>
  );
}
