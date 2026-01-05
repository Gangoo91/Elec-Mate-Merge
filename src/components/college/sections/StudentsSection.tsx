import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { AddStudentDialog } from "@/components/college/dialogs/AddStudentDialog";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Plus,
  Mail,
  Phone,
  Building2,
  Calendar,
  MoreVertical,
  Filter,
  TrendingUp,
  Clock,
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

export function StudentsSection() {
  const { students, cohorts, getStudentAttendanceRate, getStudentProgressPercentage } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCohort, setFilterCohort] = useState<string>("all");
  const [addStudentOpen, setAddStudentOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.employerName?.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    const matchesCohort = filterCohort === "all" || student.cohortId === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Withdrawn': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Completed': return 'bg-info/10 text-info border-info/20';
      case 'Suspended': return 'bg-warning/10 text-warning border-warning/20';
      case 'On Break': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCohortName = (cohortId?: string) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find(c => c.id === cohortId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Students"
        description={`${students.filter(s => s.status === 'Active').length} active students enrolled`}
        actions={
          <Button className="gap-2" onClick={() => setAddStudentOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Enrol Student</span>
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
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
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Withdrawn">Withdrawn</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
            <SelectItem value="On Break">On Break</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCohort} onValueChange={setFilterCohort}>
          <SelectTrigger className="w-full sm:w-[200px]">
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

      {/* Students List */}
      <div className="grid gap-3">
        {filteredStudents.map((student) => {
          const attendanceRate = getStudentAttendanceRate(student.id);
          const progressPercent = getStudentProgressPercentage(student.id);

          return (
            <Card key={student.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={student.photoUrl} />
                    <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                      {student.avatarInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.studentNumber}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>View ILP</DropdownMenuItem>
                            <DropdownMenuItem>View Attendance</DropdownMenuItem>
                            <DropdownMenuItem>Contact Employer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[150px]">{student.email}</span>
                      </div>
                      {student.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{student.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                      {student.employerName && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Building2 className="h-3.5 w-3.5" />
                          <span>{student.employerName}</span>
                        </div>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {getCohortName(student.cohortId)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {student.fundingType}
                      </Badge>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className={`h-3.5 w-3.5 ${attendanceRate >= 90 ? 'text-success' : attendanceRate >= 80 ? 'text-warning' : 'text-destructive'}`} />
                        <span className="text-xs">{attendanceRate}% attendance</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className={`h-3.5 w-3.5 ${progressPercent >= 70 ? 'text-success' : progressPercent >= 50 ? 'text-warning' : 'text-destructive'}`} />
                        <span className="text-xs">{progressPercent}% complete</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Due: {new Date(student.expectedCompletionDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No students found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AddStudentDialog open={addStudentOpen} onOpenChange={setAddStudentOpen} />
    </div>
  );
}
