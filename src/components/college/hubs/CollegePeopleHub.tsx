import { Card, CardContent } from "@/components/ui/card";
import { CollegeFeatureTile } from "@/components/college/CollegeFeatureTile";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { Button } from "@/components/ui/button";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Users,
  UserCog,
  GraduationCap,
  UsersRound,
  UserPlus,
  AlertTriangle,
  Calendar,
  Building2,
} from "lucide-react";

interface CollegePeopleHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function CollegePeopleHub({ onNavigate }: CollegePeopleHubProps) {
  const { staff, students, cohorts, employers, getStudentsAtRisk, getStaffByRole } = useCollege();

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const activeCohorts = cohorts.filter(c => c.status === 'Active').length;
  const studentsAtRisk = getStudentsAtRisk().length;
  const supportStaff = staff.filter(s => ['admin', 'support', 'assessor'].includes(s.role) && s.status === 'Active').length;
  const activeEmployers = employers.length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="People Hub"
        description="Manage your teaching staff, students and cohorts"
        action={
          <Button className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black">
            <UserPlus className="h-4 w-4" />
            Quick Add
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeStudents}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <UserCog className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeTutors}</p>
              <p className="text-xs text-muted-foreground">Tutors</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeCohorts}</p>
              <p className="text-xs text-muted-foreground">Cohorts</p>
            </div>
          </CardContent>
        </Card>
        {studentsAtRisk > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{studentsAtRisk}</p>
                <p className="text-xs text-muted-foreground">At Risk</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Staff Management */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Staff
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CollegeFeatureTile
            icon={UserCog}
            title="Tutors"
            description="Teaching staff & qualifications"
            onClick={() => onNavigate("tutors")}
            badge={`${activeTutors} active`}
          />
          <CollegeFeatureTile
            icon={Users}
            title="Support Staff"
            description="Assessors, admin & IQA"
            onClick={() => onNavigate("supportstaff")}
            badge={`${supportStaff} active`}
          />
        </div>
      </div>

      {/* Students & Cohorts */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Students & Groups
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <CollegeFeatureTile
            icon={GraduationCap}
            title="Students"
            description="Enrolments & profiles"
            onClick={() => onNavigate("students")}
            badge={`${activeStudents}`}
            compact
          />
          <CollegeFeatureTile
            icon={UsersRound}
            title="Cohorts"
            description="Class groups"
            onClick={() => onNavigate("cohorts")}
            badge={`${activeCohorts}`}
            compact
          />
          <CollegeFeatureTile
            icon={Calendar}
            title="Attendance"
            description="Records & registers"
            onClick={() => onNavigate("attendance")}
            compact
          />
        </div>
      </div>

      {/* Employers */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Employer Partners
        </h2>
        <CollegeFeatureTile
          icon={Building2}
          title="Employer Portal"
          description="View apprentice progress & employer engagement"
          onClick={() => onNavigate("employerportal")}
          badge={`${activeEmployers} employers`}
        />
      </div>

      {/* At Risk Alert */}
      {studentsAtRisk > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-warning rounded-full"></span>
            Needs Attention
          </h2>
          <CollegeFeatureTile
            icon={AlertTriangle}
            title="Students Requiring Attention"
            description={`${studentsAtRisk} students with attendance or progress concerns`}
            onClick={() => onNavigate("progresstracking")}
            badge={`${studentsAtRisk}`}
            badgeVariant="warning"
          />
        </div>
      )}
    </div>
  );
}
