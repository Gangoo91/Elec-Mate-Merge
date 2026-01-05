import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { RecordGradeDialog } from "@/components/college/dialogs/RecordGradeDialog";
import { RubricGradingDialog } from "@/components/college/dialogs/RubricGradingDialog";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Plus,
  CheckSquare,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function GradingSection() {
  const { assessments, students, staff, courses, cohorts } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCohort, setFilterCohort] = useState<string>("all");
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [rubricDialogOpen, setRubricDialogOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | undefined>();

  const pendingAssessments = assessments.filter(a => a.status === 'Pending');
  const gradedAssessments = assessments.filter(a => a.status === 'Graded');

  const filteredAssessments = assessments.filter(assessment => {
    const student = students.find(s => s.id === assessment.studentId);
    const matchesSearch = assessment.unitTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.assessmentType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || assessment.status === filterStatus;
    const matchesCohort = filterCohort === "all" || student?.cohortId === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'Graded': return 'bg-success/10 text-success border-success/20';
      case 'Resubmission': return 'bg-info/10 text-info border-info/20';
      case 'Not Yet Competent': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="h-3.5 w-3.5" />;
      case 'Graded': return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Resubmission': return <AlertCircle className="h-3.5 w-3.5" />;
      case 'Not Yet Competent': return <XCircle className="h-3.5 w-3.5" />;
      default: return <FileText className="h-3.5 w-3.5" />;
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case 'Distinction': return 'bg-success/10 text-success';
      case 'Merit': return 'bg-info/10 text-info';
      case 'Pass': return 'bg-primary/10 text-primary';
      case 'Competent': return 'bg-success/10 text-success';
      case 'Refer': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || 'Unknown';
  };

  const getStudentAvatar = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return {
      initials: student?.avatarInitials || '?',
      photoUrl: student?.photoUrl,
    };
  };

  const getAssessorName = (assessorId?: string) => {
    if (!assessorId) return 'Unassigned';
    return staff.find(s => s.id === assessorId)?.name || 'Unknown';
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Assessment & Grading"
        description={`${pendingAssessments.length} pending, ${gradedAssessments.length} graded`}
        actions={
          <Button className="gap-2" onClick={() => { setSelectedAssessmentId(undefined); setGradeDialogOpen(true); }}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Record Grade</span>
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{pendingAssessments.length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{gradedAssessments.length}</p>
              <p className="text-xs text-muted-foreground">Graded</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">
                {assessments.filter(a => a.status === 'Resubmission').length}
              </p>
              <p className="text-xs text-muted-foreground">Resubmissions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Graded">Graded</SelectItem>
            <SelectItem value="Resubmission">Resubmission</SelectItem>
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

      {/* Assessments List */}
      <div className="grid gap-3">
        {filteredAssessments.map((assessment) => {
          const studentAvatar = getStudentAvatar(assessment.studentId);

          return (
            <Card
              key={assessment.id}
              className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 ${
                assessment.status === 'Pending' && isOverdue(assessment.dueDate)
                  ? 'border-l-4 border-l-destructive'
                  : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={studentAvatar.photoUrl} />
                    <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-sm font-semibold">
                      {studentAvatar.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{assessment.unitTitle}</h3>
                        <p className="text-sm text-muted-foreground">{getStudentName(assessment.studentId)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(assessment.status)} flex items-center gap-1`}>
                          {getStatusIcon(assessment.status)}
                          {assessment.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Submission</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSelectedAssessmentId(assessment.id); setRubricDialogOpen(true); }}>
                              Grade with Rubric
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSelectedAssessmentId(assessment.id); setGradeDialogOpen(true); }}>
                              Quick Grade
                            </DropdownMenuItem>
                            <DropdownMenuItem>Add Feedback</DropdownMenuItem>
                            <DropdownMenuItem>Request Resubmission</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {assessment.assessmentType}
                      </Badge>
                      {assessment.grade && (
                        <Badge variant="outline" className={getGradeColor(assessment.grade)}>
                          {assessment.grade}
                        </Badge>
                      )}
                      {assessment.status === 'Pending' && isOverdue(assessment.dueDate) && (
                        <Badge variant="outline" className="bg-destructive/10 text-destructive text-xs">
                          Overdue
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        <span>Assessor: {getAssessorName(assessment.assessorId)}</span>
                      </div>
                      {assessment.submittedDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            Submitted: {new Date(assessment.submittedDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                      )}
                      {assessment.dueDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            Due: {new Date(assessment.dueDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {assessment.feedback && (
                      <div className="mt-3 p-2 bg-muted/50 rounded-md">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          <span className="font-medium">Feedback:</span> {assessment.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredAssessments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No assessments found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <RecordGradeDialog
        open={gradeDialogOpen}
        onOpenChange={setGradeDialogOpen}
        assessmentId={selectedAssessmentId}
      />

      <RubricGradingDialog
        open={rubricDialogOpen}
        onOpenChange={setRubricDialogOpen}
        assessmentId={selectedAssessmentId}
      />
    </div>
  );
}
