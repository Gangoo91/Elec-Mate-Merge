import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { GraduationCap, Loader2 } from "lucide-react";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const { cohorts, courses, addStudent } = useCollege();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentNumber: "",
    cohortId: "",
    employerName: "",
    fundingType: "Levy" as "Levy" | "Non-Levy" | "Self-Funded",
    expectedCompletionDate: "",
    notes: "",
  });

  const activeCohorts = cohorts.filter(c => c.status === 'Active');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate avatar initials from name
      const nameParts = formData.name.trim().split(' ');
      const avatarInitials = nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : formData.name.substring(0, 2).toUpperCase();

      addStudent({
        ...formData,
        avatarInitials,
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0],
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        studentNumber: "",
        cohortId: "",
        employerName: "",
        fundingType: "Levy",
        expectedCompletionDate: "",
        notes: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate student number suggestion
  const generateStudentNumber = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `STU${year}${random}`;
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[500px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            Enrol New Student
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Add a new student to the system. All fields marked with * are required.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="studentNumber">Student Number *</Label>
                <div className="flex gap-2">
                  <Input
                    id="studentNumber"
                    value={formData.studentNumber}
                    onChange={(e) => handleChange("studentNumber", e.target.value)}
                    placeholder="STU24XXXX"
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleChange("studentNumber", generateStudentNumber())}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john.smith@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="07XXX XXXXXX"
                />
              </div>
            </div>
          </div>

          {/* Course & Cohort */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="cohortId">Cohort *</Label>
                <Select
                  value={formData.cohortId}
                  onValueChange={(value) => handleChange("cohortId", value)}
                  required
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
                <Label htmlFor="fundingType">Funding Type *</Label>
                <Select
                  value={formData.fundingType}
                  onValueChange={(value) => handleChange("fundingType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Levy">Levy</SelectItem>
                    <SelectItem value="Non-Levy">Non-Levy</SelectItem>
                    <SelectItem value="Self-Funded">Self-Funded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Employer */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="employerName">Employer Name</Label>
                <Input
                  id="employerName"
                  value={formData.employerName}
                  onChange={(e) => handleChange("employerName", e.target.value)}
                  placeholder="Company Ltd"
                />
              </div>
              <div>
                <Label htmlFor="expectedCompletionDate">Expected Completion *</Label>
                <Input
                  id="expectedCompletionDate"
                  type="date"
                  value={formData.expectedCompletionDate}
                  onChange={(e) => handleChange("expectedCompletionDate", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional notes about this student..."
              rows={2}
              className="touch-manipulation"
            />
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
            disabled={isSubmitting}
            className="h-11 touch-manipulation"
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enrolling...
              </>
            ) : (
              "Enrol Student"
            )}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
