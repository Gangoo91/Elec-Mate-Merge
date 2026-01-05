import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollege } from "@/contexts/CollegeContext";
import { ClipboardCheck, Loader2, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import type { AttendanceStatus } from "@/data/collegeMockData";

interface TakeAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cohortId?: string; // If provided, pre-select this cohort
}

type StudentAttendance = {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  notes: string;
  minutesLate?: number;
};

const SESSION_TYPES = [
  "Lecture",
  "Workshop",
  "Tutorial",
  "EPA Prep",
  "Assessment",
  "Practical",
  "Online",
  "Self-Study",
] as const;

const ATTENDANCE_STATUSES: { value: AttendanceStatus; label: string; icon: typeof CheckCircle2 }[] = [
  { value: "Present", label: "Present", icon: CheckCircle2 },
  { value: "Absent", label: "Absent", icon: XCircle },
  { value: "Late", label: "Late", icon: AlertTriangle },
  { value: "Authorised Absence", label: "Auth. Absence", icon: Clock },
  { value: "Sick", label: "Sick", icon: XCircle },
];

export function TakeAttendanceDialog({ open, onOpenChange, cohortId }: TakeAttendanceDialogProps) {
  const { students, cohorts, staff, bulkRecordAttendance } = useCollege();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(cohortId || "");
  const [sessionType, setSessionType] = useState<typeof SESSION_TYPES[number]>("Lecture");
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [tutorId, setTutorId] = useState("");
  const [studentAttendance, setStudentAttendance] = useState<StudentAttendance[]>([]);

  // Get active cohorts
  const activeCohorts = cohorts.filter(c => c.status === 'Active');

  // Get tutors
  const tutors = staff.filter(s => s.role === 'tutor');

  // Get students for selected cohort
  const cohortStudents = students.filter(
    s => s.cohortId === selectedCohort && s.status === 'Active'
  );

  // Initialize student attendance when cohort changes
  useEffect(() => {
    if (selectedCohort && cohortStudents.length > 0) {
      setStudentAttendance(
        cohortStudents.map(student => ({
          studentId: student.id,
          studentName: student.name,
          status: "Present" as AttendanceStatus,
          notes: "",
        }))
      );
    } else {
      setStudentAttendance([]);
    }
  }, [selectedCohort]);

  // Update form when cohortId prop changes
  useEffect(() => {
    if (cohortId) {
      setSelectedCohort(cohortId);
    }
  }, [cohortId]);

  const updateStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setStudentAttendance(prev =>
      prev.map(sa =>
        sa.studentId === studentId ? { ...sa, status } : sa
      )
    );
  };

  const markAllPresent = () => {
    setStudentAttendance(prev =>
      prev.map(sa => ({ ...sa, status: "Present" as AttendanceStatus }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCohort || !tutorId || studentAttendance.length === 0) return;

    setIsSubmitting(true);

    try {
      const tutor = staff.find(s => s.id === tutorId);

      const records = studentAttendance.map(sa => ({
        studentId: sa.studentId,
        studentName: sa.studentName,
        cohortId: selectedCohort,
        sessionDate,
        sessionType,
        tutorId,
        tutorName: tutor?.name || 'Unknown',
        status: sa.status,
        minutesLate: sa.status === 'Late' ? sa.minutesLate : undefined,
        absenceReason: sa.status !== 'Present' ? sa.notes : undefined,
        offTheJobHours: sessionType !== 'Self-Study' ? 3 : 0, // Default to 3 hours for most sessions
      }));

      bulkRecordAttendance(records);

      // Reset and close
      setSelectedCohort("");
      setStudentAttendance([]);
      setTutorId("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to record attendance:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'Present': return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'Absent': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'Late': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'Authorised Absence':
      case 'Sick': return <Clock className="h-4 w-4 text-info" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const presentCount = studentAttendance.filter(s => s.status === 'Present').length;
  const absentCount = studentAttendance.filter(s => s.status === 'Absent' || s.status === 'Sick').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
            Take Register
          </DialogTitle>
          <DialogDescription>
            Record attendance for a cohort session.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Session Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="cohort">Cohort *</Label>
              <Select
                value={selectedCohort}
                onValueChange={setSelectedCohort}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cohort" />
                </SelectTrigger>
                <SelectContent>
                  {activeCohorts.map((cohort) => (
                    <SelectItem key={cohort.id} value={cohort.id}>
                      {cohort.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sessionDate">Date *</Label>
              <Input
                id="sessionDate"
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="sessionType">Session Type *</Label>
              <Select
                value={sessionType}
                onValueChange={(value) => setSessionType(value as typeof SESSION_TYPES[number])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SESSION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tutorId">Tutor *</Label>
              <Select
                value={tutorId}
                onValueChange={setTutorId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tutor" />
                </SelectTrigger>
                <SelectContent>
                  {tutors.map((tutor) => (
                    <SelectItem key={tutor.id} value={tutor.id}>
                      {tutor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Students List */}
          {selectedCohort && studentAttendance.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Students ({studentAttendance.length})</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/10 text-success">
                    {presentCount} Present
                  </Badge>
                  {absentCount > 0 && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive">
                      {absentCount} Absent
                    </Badge>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={markAllPresent}
                  >
                    Mark All Present
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg divide-y max-h-[300px] overflow-y-auto">
                {studentAttendance.map((sa) => {
                  const student = students.find(s => s.id === sa.studentId);
                  return (
                    <div key={sa.studentId} className="p-3 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student?.photoUrl} />
                        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs">
                          {student?.avatarInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{sa.studentName}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {ATTENDANCE_STATUSES.map((status) => (
                          <Button
                            key={status.value}
                            type="button"
                            variant={sa.status === status.value ? "default" : "ghost"}
                            size="sm"
                            className={`h-8 px-2 ${
                              sa.status === status.value
                                ? status.value === 'Present'
                                  ? 'bg-success hover:bg-success/90'
                                  : status.value === 'Absent' || status.value === 'Sick'
                                  ? 'bg-destructive hover:bg-destructive/90'
                                  : status.value === 'Late'
                                  ? 'bg-warning hover:bg-warning/90 text-warning-foreground'
                                  : 'bg-info hover:bg-info/90'
                                : ''
                            }`}
                            onClick={() => updateStudentStatus(sa.studentId, status.value)}
                            title={status.label}
                          >
                            <status.icon className="h-3.5 w-3.5" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCohort && studentAttendance.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              No active students in this cohort.
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !selectedCohort || !tutorId || studentAttendance.length === 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Register"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
