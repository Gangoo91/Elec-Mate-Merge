import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { EPACountdown } from "@/components/college/widgets/EPACountdown";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Plus,
  Award,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flag,
  TrendingUp,
  FileCheck,
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

export function EPATrackingSection() {
  const { epaRecords, students, cohorts, courses, staff } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCohort, setFilterCohort] = useState<string>("all");

  const filteredRecords = epaRecords.filter(record => {
    const student = students.find(s => s.id === record.studentId);
    const matchesSearch = student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.epaProvider?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesCohort = filterCohort === "all" || student?.cohortId === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  // Count by status
  const statusCounts = {
    preGateway: epaRecords.filter(r => r.status === 'Pre-Gateway').length,
    gatewayReady: epaRecords.filter(r => r.status === 'Gateway Ready').length,
    epaScheduled: epaRecords.filter(r => r.status === 'EPA Scheduled').length,
    epaComplete: epaRecords.filter(r => r.status === 'EPA Complete').length,
    achieved: epaRecords.filter(r => r.status === 'Achieved').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pre-Gateway': return 'bg-muted text-muted-foreground';
      case 'Gateway Ready': return 'bg-info/10 text-info border-info/20';
      case 'EPA Scheduled': return 'bg-warning/10 text-warning border-warning/20';
      case 'EPA Complete': return 'bg-primary/10 text-primary border-primary/20';
      case 'Achieved': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case 'Distinction': return 'bg-success/20 text-success';
      case 'Merit': return 'bg-info/20 text-info';
      case 'Pass': return 'bg-primary/20 text-primary';
      case 'Fail': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStudentInfo = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return {
      name: student?.name || 'Unknown',
      initials: student?.avatarInitials || '?',
      photoUrl: student?.photoUrl,
      cohortId: student?.cohortId,
    };
  };

  const getCohortName = (cohortId?: string) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find(c => c.id === cohortId)?.name || 'Unknown';
  };

  const getCourseName = (courseId: string) => {
    return courses.find(c => c.id === courseId)?.name || 'Unknown';
  };

  const getStatusStep = (status: string): number => {
    switch (status) {
      case 'Pre-Gateway': return 1;
      case 'Gateway Ready': return 2;
      case 'EPA Scheduled': return 3;
      case 'EPA Complete': return 4;
      case 'Achieved': return 5;
      default: return 0;
    }
  };

  const getProgressPercent = (status: string): number => {
    return (getStatusStep(status) / 5) * 100;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="EPA Tracking"
        description={`${epaRecords.length} apprentices in EPA pipeline`}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add EPA Record</span>
          </Button>
        }
      />

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <Card className="bg-muted/50">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-foreground">{statusCounts.preGateway}</p>
            <p className="text-xs text-muted-foreground">Pre-Gateway</p>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-info">{statusCounts.gatewayReady}</p>
            <p className="text-xs text-muted-foreground">Gateway Ready</p>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-warning">{statusCounts.epaScheduled}</p>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-primary">{statusCounts.epaComplete}</p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-success">{statusCounts.achieved}</p>
            <p className="text-xs text-muted-foreground">Achieved</p>
          </CardContent>
        </Card>
      </div>

      {/* Gateway Ready Alert */}
      {statusCounts.gatewayReady > 0 && (
        <Card className="border-info/50 bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-info">
              <Flag className="h-4 w-4" />
              Gateway Ready - Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {statusCounts.gatewayReady} apprentices are ready for gateway. Review and schedule EPA assessments.
            </p>
            <Button size="sm" variant="outline" className="text-info border-info/50 hover:bg-info/10">
              View Gateway Ready
            </Button>
          </CardContent>
        </Card>
      )}

      {/* EPA Countdown with Gap Analysis */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Gateway Readiness Analysis
        </h2>
        <EPACountdown />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apprentices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pre-Gateway">Pre-Gateway</SelectItem>
            <SelectItem value="Gateway Ready">Gateway Ready</SelectItem>
            <SelectItem value="EPA Scheduled">EPA Scheduled</SelectItem>
            <SelectItem value="EPA Complete">EPA Complete</SelectItem>
            <SelectItem value="Achieved">Achieved</SelectItem>
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

      {/* EPA Records List */}
      <div className="grid gap-4">
        {filteredRecords.map((record) => {
          const studentInfo = getStudentInfo(record.studentId);
          const progressPercent = getProgressPercent(record.status);

          return (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={studentInfo.photoUrl} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {studentInfo.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{studentInfo.name}</h3>
                        <p className="text-sm text-muted-foreground">{getCourseName(record.courseId)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                        {record.overallGrade && (
                          <Badge className={getGradeColor(record.overallGrade)}>
                            {record.overallGrade}
                          </Badge>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Add Assessment</DropdownMenuItem>
                            <DropdownMenuItem>Gateway Meeting</DropdownMenuItem>
                            <DropdownMenuItem>View Portfolio</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">EPA Progress</span>
                        <span className="font-medium">{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={progressPercent} className="h-2" />
                        {/* Progress steps */}
                        <div className="absolute top-0 left-0 right-0 flex justify-between -translate-y-1">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <div
                              key={step}
                              className={`w-2 h-2 rounded-full ${
                                getStatusStep(record.status) >= step
                                  ? 'bg-primary'
                                  : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Assessment Scores */}
                    {record.assessments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {record.assessments.map((assessment, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className={`text-xs ${assessment.result ? getGradeColor(assessment.result) : ''}`}
                          >
                            {assessment.type}: {assessment.result || 'Pending'}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{getCohortName(studentInfo.cohortId)}</span>
                      </div>
                      {record.epaProvider && (
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          <span>{record.epaProvider}</span>
                        </div>
                      )}
                      {record.gatewayDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Gateway: {new Date(record.gatewayDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      {record.epaDate && (
                        <div className="flex items-center gap-1">
                          <FileCheck className="h-3 w-3" />
                          <span>
                            EPA: {new Date(record.epaDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredRecords.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No EPA records found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
