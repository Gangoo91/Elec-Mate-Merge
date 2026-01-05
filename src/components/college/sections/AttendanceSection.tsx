import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { TakeAttendanceDialog } from "@/components/college/dialogs/TakeAttendanceDialog";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  MoreVertical,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  CalendarDays,
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

export function AttendanceSection() {
  const { attendance, students, cohorts, getStudentAttendanceRate, getCohortAttendanceRate } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCohort, setFilterCohort] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("week");
  const [takeAttendanceOpen, setTakeAttendanceOpen] = useState(false);

  // Get recent attendance records
  const getFilteredAttendance = () => {
    const now = new Date();
    let startDate = new Date();

    switch (dateFilter) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    return attendance.filter(record => {
      const recordDate = new Date(record.date);
      const student = students.find(s => s.id === record.studentId);

      const matchesDate = recordDate >= startDate;
      const matchesCohort = filterCohort === "all" || student?.cohortId === filterCohort;
      const matchesSearch = searchQuery === "" ||
        student?.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDate && matchesCohort && matchesSearch;
    });
  };

  const filteredAttendance = getFilteredAttendance();

  // Calculate summary stats
  const totalRecords = filteredAttendance.length;
  const presentCount = filteredAttendance.filter(a => a.status === 'Present').length;
  const absentCount = filteredAttendance.filter(a => a.status === 'Absent').length;
  const lateCount = filteredAttendance.filter(a => a.status === 'Late').length;
  const authorisedAbsent = filteredAttendance.filter(a => a.status === 'Authorised Absence').length;

  const overallAttendanceRate = totalRecords > 0
    ? Math.round(((presentCount + lateCount + authorisedAbsent) / totalRecords) * 100)
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-success/10 text-success border-success/20';
      case 'Absent': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Late': return 'bg-warning/10 text-warning border-warning/20';
      case 'Authorised Absence': return 'bg-info/10 text-info border-info/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Absent': return <XCircle className="h-3.5 w-3.5" />;
      case 'Late': return <AlertTriangle className="h-3.5 w-3.5" />;
      case 'Authorised Absence': return <Calendar className="h-3.5 w-3.5" />;
      default: return <Clock className="h-3.5 w-3.5" />;
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

  // Get students with low attendance
  const studentsWithLowAttendance = students
    .filter(s => s.status === 'Active')
    .map(s => ({
      ...s,
      attendanceRate: getStudentAttendanceRate(s.id),
    }))
    .filter(s => s.attendanceRate < 85)
    .sort((a, b) => a.attendanceRate - b.attendanceRate)
    .slice(0, 5);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Attendance"
        description={`${overallAttendanceRate}% overall attendance rate`}
        actions={
          <Button className="gap-2" onClick={() => setTakeAttendanceOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Take Register</span>
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{presentCount}</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{absentCount}</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{lateCount}</p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{authorisedAbsent}</p>
                <p className="text-xs text-muted-foreground">Authorised</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{overallAttendanceRate}%</p>
                <p className="text-xs text-muted-foreground">Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Attendance Alert */}
      {studentsWithLowAttendance.length > 0 && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-warning">
              <AlertTriangle className="h-4 w-4" />
              Students Below 85% Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {studentsWithLowAttendance.map(student => (
                <Badge
                  key={student.id}
                  variant="outline"
                  className="bg-warning/10 text-warning border-warning/20"
                >
                  {student.name} ({student.attendanceRate}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <CalendarDays className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCohort} onValueChange={setFilterCohort}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Users className="h-4 w-4 mr-2" />
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

      {/* Attendance Records */}
      <div className="grid gap-2">
        {filteredAttendance.map((record) => {
          const studentInfo = getStudentInfo(record.studentId);

          return (
            <Card key={record.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={studentInfo.photoUrl} />
                    <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs font-semibold">
                      {studentInfo.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm text-foreground">{studentInfo.name}</p>
                        <p className="text-xs text-muted-foreground">{getCohortName(studentInfo.cohortId)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(record.status)} flex items-center gap-1 text-xs`}>
                          {getStatusIcon(record.status)}
                          {record.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {new Date(record.date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                            <DropdownMenuItem>View Student</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {record.notes && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        Note: {record.notes}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredAttendance.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No attendance records found for this period.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <TakeAttendanceDialog open={takeAttendanceOpen} onOpenChange={setTakeAttendanceOpen} />
    </div>
  );
}
