import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CollegeFeatureTile } from "@/components/college/CollegeFeatureTile";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { AtRiskPredictor } from "@/components/college/widgets/AtRiskPredictor";
import { EPACountdown } from "@/components/college/widgets/EPACountdown";
import { ActivityFeed } from "@/components/college/widgets/ActivityFeed";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Users,
  BookOpen,
  ClipboardCheck,
  FolderOpen,
  GraduationCap,
  UserCog,
  CheckSquare,
  Target,
  Award,
  TrendingUp,
  Calendar,
  AlertTriangle,
} from "lucide-react";

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

export function CollegeOverviewSection({ onNavigate }: CollegeOverviewSectionProps) {
  const {
    staff,
    students,
    cohorts,
    courses,
    epaRecords,
    getStaffByRole,
    getPendingAssessments,
    getOverdueILPReviews,
    getUpcomingLessons,
    getStudentsAtRisk,
  } = useCollege();

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const activeCohorts = cohorts.filter(c => c.status === 'Active').length;
  const pendingAssessments = getPendingAssessments().length;
  const overdueILPReviews = getOverdueILPReviews().length;
  const upcomingLessons = getUpcomingLessons(7);
  const studentsAtRisk = getStudentsAtRisk();
  const studentsAtGateway = epaRecords.filter(e => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready').length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <CollegeSectionHeader
        title="College Dashboard"
        description="Welcome back to Elec-Mate for Education"
      />

      {/* Quick Stats - Scrollable on mobile */}
      <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card
          className="backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-elec-yellow/30 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10 hover:-translate-y-0.5 group"
          onClick={() => onNavigate("students")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-elec-yellow">{activeStudents}</p>
                <p className="text-xs md:text-sm text-white/60">Students</p>
              </div>
              <div className="p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-elec-yellow" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-info/30 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-info/10 hover:-translate-y-0.5 group"
          onClick={() => onNavigate("tutors")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-info">{activeTutors}</p>
                <p className="text-xs md:text-sm text-white/60">Tutors</p>
              </div>
              <div className="p-2 rounded-xl bg-gradient-to-br from-info/20 to-info/5 border border-info/20 shadow-lg shadow-info/5 group-hover:scale-110 transition-transform duration-300">
                <UserCog className="h-5 w-5 md:h-6 md:w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-warning/30 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-warning/10 hover:-translate-y-0.5 group"
          onClick={() => onNavigate("grading")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{pendingAssessments}</p>
                <p className="text-xs md:text-sm text-white/60">Pending</p>
              </div>
              <div className="p-2 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 shadow-lg shadow-warning/5 group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="h-5 w-5 md:h-6 md:w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-success/30 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-success/10 hover:-translate-y-0.5 group"
          onClick={() => onNavigate("epatracking")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{studentsAtGateway}</p>
                <p className="text-xs md:text-sm text-white/60">Gateway</p>
              </div>
              <div className="p-2 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20 shadow-lg shadow-success/5 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Hub Cards */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
          Main Areas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <CollegeFeatureTile
            icon={Users}
            title="People"
            description="Staff, students & cohorts"
            onClick={() => onNavigate("peoplehub")}
            badge={`${activeStudents} students`}
          />
          <CollegeFeatureTile
            icon={BookOpen}
            title="Curriculum"
            description="Courses, lessons & resources"
            onClick={() => onNavigate("curriculumhub")}
          />
          <CollegeFeatureTile
            icon={ClipboardCheck}
            title="Assessment"
            description="Grades, ILPs, EPA tracking"
            onClick={() => onNavigate("assessmenthub")}
            badge={pendingAssessments > 0 ? `${pendingAssessments} pending` : undefined}
            badgeVariant="warning"
          />
          <CollegeFeatureTile
            icon={FolderOpen}
            title="Resources"
            description="Documents, VLE & settings"
            onClick={() => onNavigate("resourceshub")}
          />
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-warning to-orange-500 rounded-full"></span>
          AI Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <AtRiskPredictor onNavigate={onNavigate} compact />
          <EPACountdown onNavigate={onNavigate} compact />
        </div>
        {overdueILPReviews > 0 && (
          <div className="mt-3 md:mt-4">
            <CollegeFeatureTile
              icon={Target}
              title="Overdue ILPs"
              description={`${overdueILPReviews} reviews need completing`}
              onClick={() => onNavigate("ilpmanagement")}
              badge={`${overdueILPReviews}`}
              badgeVariant="warning"
            />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <CollegeFeatureTile
            icon={CheckSquare}
            title="Grade Work"
            description="Record assessments"
            onClick={() => onNavigate("grading")}
            badge={pendingAssessments > 0 ? `${pendingAssessments}` : undefined}
            badgeVariant="warning"
            compact
          />
          <CollegeFeatureTile
            icon={Calendar}
            title="Take Register"
            description="Record attendance"
            onClick={() => onNavigate("attendance")}
            compact
          />
          <CollegeFeatureTile
            icon={Target}
            title="ILP Review"
            description="Update learning plans"
            onClick={() => onNavigate("ilpmanagement")}
            compact
          />
          <CollegeFeatureTile
            icon={Award}
            title="EPA Gateway"
            description="Check readiness"
            onClick={() => onNavigate("epatracking")}
            compact
          />
        </div>
      </div>

      {/* Upcoming Lessons & EPA Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Upcoming Lessons */}
        <Card className="backdrop-blur-xl bg-elec-dark/60 border-white/10">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm md:text-base">Upcoming Lessons</h3>
              <div className="p-1.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5">
                <Calendar className="h-4 w-4 text-elec-yellow" />
              </div>
            </div>
            <div className="space-y-3">
              {upcomingLessons.length > 0 ? (
                upcomingLessons.slice(0, 3).map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                    onClick={() => onNavigate("lessonplans")}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white/90 truncate group-hover:text-white">{lesson.title}</p>
                      <p className="text-xs text-white/50 truncate">{lesson.cohortName}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-xs bg-white/10 text-white/80 border border-white/10">
                      {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/50">No upcoming lessons this week</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* EPA Progress */}
        <Card className="backdrop-blur-xl bg-elec-dark/60 border-white/10">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm md:text-base">EPA Progress</h3>
              <div className="p-1.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5">
                <Award className="h-4 w-4 text-elec-yellow" />
              </div>
            </div>
            <div className="space-y-3">
              <div
                className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => onNavigate("epatracking")}
              >
                <div>
                  <p className="text-sm font-medium text-white/90 group-hover:text-white">At Gateway</p>
                  <p className="text-xs text-white/50">Ready for assessment</p>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success border border-success/30">
                  {studentsAtGateway}
                </Badge>
              </div>
              <div
                className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => onNavigate("epatracking")}
              >
                <div>
                  <p className="text-sm font-medium text-white/90 group-hover:text-white">In Progress</p>
                  <p className="text-xs text-white/50">Working towards gateway</p>
                </div>
                <Badge variant="secondary" className="bg-white/10 text-white/80 border border-white/10">
                  {epaRecords.filter(e => e.status === 'In Progress').length}
                </Badge>
              </div>
              <div
                className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => onNavigate("epatracking")}
              >
                <div>
                  <p className="text-sm font-medium text-white/90 group-hover:text-white">Completed</p>
                  <p className="text-xs text-white/50">EPA passed</p>
                </div>
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30">
                  {epaRecords.filter(e => e.status === 'Complete').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-info to-blue-500 rounded-full"></span>
          Recent Activity
        </h2>
        <ActivityFeed maxItems={8} compact />
      </div>
    </div>
  );
}
