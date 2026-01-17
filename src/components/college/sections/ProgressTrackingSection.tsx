import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import { cn } from "@/lib/utils";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
  MoreVertical,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Calendar,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProgressTrackingSection() {
  const {
    studentProgress,
    students,
    cohorts,
    getStudentAttendanceRate,
    getStudentProgressPercentage,
    getStudentsAtRisk,
  } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCohort, setFilterCohort] = useState<string>("all");

  const studentsAtRisk = getStudentsAtRisk();

  // Combine progress data with student info
  const progressData = students
    .filter(s => s.status === 'Active')
    .map(student => {
      const progress = studentProgress.find(p => p.studentId === student.id);
      const attendanceRate = getStudentAttendanceRate(student.id);
      const overallProgress = getStudentProgressPercentage(student.id);

      return {
        ...student,
        progress,
        attendanceRate,
        overallProgress,
        isAtRisk: studentsAtRisk.some(s => s.id === student.id),
      };
    });

  const filteredProgress = progressData.filter(data => {
    const matchesSearch = data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.studentNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" ||
      (filterStatus === "at-risk" && data.isAtRisk) ||
      (filterStatus === "on-track" && !data.isAtRisk && data.overallProgress >= 70) ||
      (filterStatus === "behind" && !data.isAtRisk && data.overallProgress < 70);

    const matchesCohort = filterCohort === "all" || data.cohortId === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  // Sort by progress (lowest first for attention)
  const sortedProgress = [...filteredProgress].sort((a, b) => a.overallProgress - b.overallProgress);

  const getCohortName = (cohortId?: string) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find(c => c.id === cohortId)?.name || 'Unknown';
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 80) return 'text-success';
    if (percent >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressBg = (percent: number) => {
    if (percent >= 80) return 'bg-success';
    if (percent >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Calculate cohort averages
  const cohortAverages = cohorts
    .filter(c => c.status === 'Active')
    .map(cohort => {
      const cohortStudents = progressData.filter(p => p.cohortId === cohort.id);
      const avgProgress = cohortStudents.length > 0
        ? Math.round(cohortStudents.reduce((sum, s) => sum + s.overallProgress, 0) / cohortStudents.length)
        : 0;
      const avgAttendance = cohortStudents.length > 0
        ? Math.round(cohortStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / cohortStudents.length)
        : 0;

      return {
        ...cohort,
        avgProgress,
        avgAttendance,
        studentCount: cohortStudents.length,
        atRiskCount: cohortStudents.filter(s => s.isAtRisk).length,
      };
    });

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Progress Tracking"
        description={`${studentsAtRisk.length} students at risk`}
        actions={
          <Button className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {progressData.filter(p => p.overallProgress >= 80).length}
                </p>
                <p className="text-xs text-muted-foreground">On Track (80%+)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {progressData.filter(p => p.overallProgress >= 60 && p.overallProgress < 80).length}
                </p>
                <p className="text-xs text-muted-foreground">Needs Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-lg font-bold text-foreground">{studentsAtRisk.length}</p>
                <p className="text-xs text-muted-foreground">At Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {Math.round(progressData.reduce((sum, p) => sum + p.overallProgress, 0) / (progressData.length || 1))}%
                </p>
                <p className="text-xs text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cohort Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Cohort Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cohortAverages.map(cohort => (
              <div key={cohort.id} className="flex items-center gap-4">
                <div className="w-32 truncate text-sm font-medium">{cohort.name}</div>
                <div className="flex-1">
                  <Progress value={cohort.avgProgress} className="h-2" />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{cohort.avgProgress}%</span>
                  <span>{cohort.studentCount} students</span>
                  {cohort.atRiskCount > 0 && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive text-xs">
                      {cohort.atRiskCount} at risk
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Students At Risk Alert */}
      {studentsAtRisk.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Students At Risk - Immediate Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {studentsAtRisk.slice(0, 5).map(student => (
                <Badge
                  key={student.id}
                  variant="outline"
                  className="bg-destructive/10 text-destructive border-destructive/20"
                >
                  {student.name}
                </Badge>
              ))}
              {studentsAtRisk.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{studentsAtRisk.length - 5} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(!searchQuery && "pl-9")}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="on-track">On Track</SelectItem>
            <SelectItem value="behind">Behind</SelectItem>
            <SelectItem value="at-risk">At Risk</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCohort} onValueChange={setFilterCohort}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Cohort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cohorts</SelectItem>
            {cohorts.filter(c => c.status === 'Active').map(cohort => (
              <SelectItem key={cohort.id} value={cohort.id}>{cohort.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Student Progress List */}
      <div className="grid gap-3">
        {sortedProgress.map((data) => (
          <Card
            key={data.id}
            className={`hover:shadow-md transition-shadow ${
              data.isAtRisk ? 'border-l-4 border-l-destructive' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={data.photoUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {data.avatarInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{data.name}</h3>
                        {data.isAtRisk && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive text-xs">
                            At Risk
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{getCohortName(data.cohortId)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(data.progress?.trend)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                          <DropdownMenuItem>Update Progress</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Review</DropdownMenuItem>
                          <DropdownMenuItem>Contact Student</DropdownMenuItem>
                          <DropdownMenuItem>Contact Employer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className={`font-medium ${getProgressColor(data.overallProgress)}`}>
                          {data.overallProgress}%
                        </span>
                      </div>
                      <Progress
                        value={data.overallProgress}
                        className={`h-2 ${getProgressBg(data.overallProgress)}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Attendance</span>
                        <span className={`font-medium ${getProgressColor(data.attendanceRate)}`}>
                          {data.attendanceRate}%
                        </span>
                      </div>
                      <Progress
                        value={data.attendanceRate}
                        className={`h-2 ${getProgressBg(data.attendanceRate)}`}
                      />
                    </div>
                  </div>

                  {/* Progress Details */}
                  {data.progress && (
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>
                          Units: {data.progress.unitsCompleted}/{data.progress.unitsTotal}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>OTJ: {data.progress.otjHoursLogged}h logged</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Due: {new Date(data.expectedCompletionDate).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedProgress.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No students found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
