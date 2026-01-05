import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Plus,
  Target,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Filter,
  AlertTriangle,
  CheckCircle2,
  FileText,
  TrendingUp,
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

export function ILPManagementSection() {
  const { ilps, students, staff, cohorts, getOverdueILPReviews } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCohort, setFilterCohort] = useState<string>("all");

  const overdueReviews = getOverdueILPReviews();

  const filteredILPs = ilps.filter(ilp => {
    const student = students.find(s => s.id === ilp.studentId);
    const matchesSearch = student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ilp.targets.some(t => t.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === "all" || ilp.status === filterStatus;
    const matchesCohort = filterCohort === "all" || student?.cohortId === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Draft': return 'bg-warning/10 text-warning border-warning/20';
      case 'Completed': return 'bg-info/10 text-info border-info/20';
      case 'Archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTargetStatusColor = (status: string) => {
    switch (status) {
      case 'Achieved': return 'bg-success/10 text-success';
      case 'On Track': return 'bg-primary/10 text-primary';
      case 'At Risk': return 'bg-warning/10 text-warning';
      case 'Not Started': return 'bg-muted text-muted-foreground';
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

  const getTutorName = (tutorId: string) => {
    return staff.find(s => s.id === tutorId)?.name || 'Unknown';
  };

  const getTargetProgress = (ilp: typeof ilps[0]) => {
    const achieved = ilp.targets.filter(t => t.status === 'Achieved').length;
    return Math.round((achieved / ilp.targets.length) * 100);
  };

  const isReviewOverdue = (nextReviewDate: string) => {
    return new Date(nextReviewDate) < new Date();
  };

  const isReviewDueSoon = (nextReviewDate: string) => {
    const reviewDate = new Date(nextReviewDate);
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return reviewDate >= now && reviewDate <= weekFromNow;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="ILP Management"
        description={`${ilps.filter(i => i.status === 'Active').length} active learning plans`}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create ILP</span>
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">
                {ilps.filter(i => i.status === 'Active').length}
              </p>
              <p className="text-xs text-muted-foreground">Active ILPs</p>
            </div>
          </CardContent>
        </Card>
        {overdueReviews.length > 0 && (
          <Card className="bg-destructive/10 border-destructive/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-lg font-bold text-foreground">{overdueReviews.length}</p>
                <p className="text-xs text-muted-foreground">Overdue Reviews</p>
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">
                {ilps.filter(i => i.status === 'Completed').length}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Reviews Alert */}
      {overdueReviews.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Overdue ILP Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueReviews.slice(0, 3).map(ilp => {
                const student = getStudentInfo(ilp.studentId);
                return (
                  <div key={ilp.id} className="flex items-center justify-between p-2 rounded-lg bg-background">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={student.photoUrl} />
                        <AvatarFallback className="text-xs">{student.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{student.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive text-xs">
                      Due: {new Date(ilp.nextReviewDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ILPs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
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

      {/* ILP List */}
      <div className="grid gap-4">
        {filteredILPs.map((ilp) => {
          const studentInfo = getStudentInfo(ilp.studentId);
          const targetProgress = getTargetProgress(ilp);
          const isOverdue = isReviewOverdue(ilp.nextReviewDate);
          const isDueSoon = isReviewDueSoon(ilp.nextReviewDate);

          return (
            <Card
              key={ilp.id}
              className={`hover:shadow-md transition-shadow ${
                isOverdue ? 'border-l-4 border-l-destructive' :
                isDueSoon ? 'border-l-4 border-l-warning' : ''
              }`}
            >
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
                        <p className="text-sm text-muted-foreground">{getCohortName(studentInfo.cohortId)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(ilp.status)}>
                          {ilp.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View ILP</DropdownMenuItem>
                            <DropdownMenuItem>Conduct Review</DropdownMenuItem>
                            <DropdownMenuItem>Edit Targets</DropdownMenuItem>
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuItem>Print ILP</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Target Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Target Progress</span>
                        <span className="font-medium">
                          {ilp.targets.filter(t => t.status === 'Achieved').length}/{ilp.targets.length} achieved
                        </span>
                      </div>
                      <Progress value={targetProgress} className="h-2" />
                    </div>

                    {/* Targets Summary */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {ilp.targets.slice(0, 3).map((target, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className={`${getTargetStatusColor(target.status)} text-xs`}
                        >
                          {target.status === 'Achieved' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {target.description.length > 25
                            ? target.description.substring(0, 25) + '...'
                            : target.description}
                        </Badge>
                      ))}
                      {ilp.targets.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{ilp.targets.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Tutor: {getTutorName(ilp.tutorId)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{ilp.reviews.length} reviews</span>
                      </div>
                      <div className={`flex items-center gap-1 ${isOverdue ? 'text-destructive' : isDueSoon ? 'text-warning' : ''}`}>
                        <Calendar className="h-3 w-3" />
                        <span>
                          {isOverdue ? 'Overdue: ' : isDueSoon ? 'Due: ' : 'Next: '}
                          {new Date(ilp.nextReviewDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredILPs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No ILPs found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
