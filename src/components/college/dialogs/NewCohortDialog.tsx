import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
} from "@/components/ui/responsive-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollege } from "@/contexts/CollegeContext";
import { UsersRound, Loader2 } from "lucide-react";
import type { CohortStatus, DeliveryMode } from "@/data/collegeMockData";

interface NewCohortDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MEETING_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MEETING_TIMES = [
  "08:00 - 12:00",
  "09:00 - 13:00",
  "09:00 - 17:00",
  "13:00 - 17:00",
  "14:00 - 18:00",
  "17:30 - 21:00",
];

const ROOMS = [
  "EW101",
  "EW102",
  "EW103",
  "Workshop A",
  "Workshop B",
  "IT Lab 1",
  "IT Lab 2",
  "Online",
];

export function NewCohortDialog({ open, onOpenChange }: NewCohortDialogProps) {
  const { courses, staff, addCohort } = useCollege();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    courseId: "",
    leadTutorId: "",
    startDate: "",
    endDate: "",
    maxStudents: "16",
    status: "Planning" as CohortStatus,
    deliveryMode: "Day Release" as DeliveryMode,
    meetingDay: "",
    meetingTime: "",
    room: "",
  });

  // Get active courses
  const activeCourses = courses.filter(c => c.status === 'Active');

  // Get tutors who can lead cohorts
  const tutors = staff.filter(s =>
    (s.role === 'tutor' || s.role === 'head_of_department') &&
    s.status === 'Active'
  );

  // Get selected course details
  const selectedCourse = courses.find(c => c.id === formData.courseId);

  // Get selected tutor details
  const selectedTutor = staff.find(s => s.id === formData.leadTutorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courseId || !formData.leadTutorId) return;

    setIsSubmitting(true);

    try {
      addCohort({
        name: formData.name,
        code: formData.code,
        courseId: formData.courseId,
        courseName: selectedCourse?.name || '',
        leadTutorId: formData.leadTutorId,
        leadTutorName: selectedTutor?.name || '',
        startDate: formData.startDate,
        endDate: formData.endDate,
        maxStudents: parseInt(formData.maxStudents),
        status: formData.status,
        deliveryMode: formData.deliveryMode,
        meetingDay: formData.meetingDay,
        meetingTime: formData.meetingTime,
        room: formData.room,
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        code: "",
        courseId: "",
        leadTutorId: "",
        startDate: "",
        endDate: "",
        maxStudents: "16",
        status: "Planning",
        deliveryMode: "Day Release",
        meetingDay: "",
        meetingTime: "",
        room: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create cohort:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-generate cohort code when course is selected
  const generateCode = () => {
    if (selectedCourse) {
      const year = new Date().getFullYear().toString().slice(-2);
      const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      return `${selectedCourse.code?.substring(0, 4) || 'COH'}${year}${month}${random}`;
    }
    return '';
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[550px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            <UsersRound className="h-5 w-5 text-elec-yellow" />
            Create New Cohort
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Set up a new cohort for a course. All fields marked with * are required.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Selection */}
          <div>
            <Label htmlFor="courseId">Course *</Label>
            <Select
              value={formData.courseId}
              onValueChange={(value) => handleChange("courseId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {activeCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Name and Code */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="name">Cohort Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Level 3 Sept 2024"
                required
              />
            </div>
            <div>
              <Label htmlFor="code">Cohort Code *</Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  placeholder="AUTO-GEN"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleChange("code", generateCode())}
                  disabled={!formData.courseId}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>

          {/* Lead Tutor and Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="leadTutorId">Lead Tutor *</Label>
              <Select
                value={formData.leadTutorId}
                onValueChange={(value) => handleChange("leadTutorId", value)}
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
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="deliveryMode">Delivery Mode *</Label>
              <Select
                value={formData.deliveryMode}
                onValueChange={(value) => handleChange("deliveryMode", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day Release">Day Release</SelectItem>
                  <SelectItem value="Block Release">Block Release</SelectItem>
                  <SelectItem value="In-person">In-person (Full-time)</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maxStudents">Max Students *</Label>
              <Input
                id="maxStudents"
                type="number"
                min="1"
                max="30"
                value={formData.maxStudents}
                onChange={(e) => handleChange("maxStudents", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="meetingDay">Meeting Day</Label>
              <Select
                value={formData.meetingDay}
                onValueChange={(value) => handleChange("meetingDay", value)}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {MEETING_DAYS.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="meetingTime">Meeting Time</Label>
              <Select
                value={formData.meetingTime}
                onValueChange={(value) => handleChange("meetingTime", value)}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {MEETING_TIMES.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="room">Room</Label>
              <Select
                value={formData.room}
                onValueChange={(value) => handleChange("room", value)}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {ROOMS.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="h-11 touch-manipulation"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.code || !formData.courseId || !formData.leadTutorId}
            className="h-11 touch-manipulation"
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Cohort"
            )}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
