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
import { UserPlus, Loader2 } from "lucide-react";
import type { StaffRole } from "@/data/collegeMockData";

interface AddTutorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEPARTMENTS = [
  "Electrical Installation",
  "Electrical Engineering",
  "Building Services",
  "Plumbing",
  "Construction",
  "Health & Safety",
  "General Studies",
];

const SPECIALIZATIONS = [
  "18th Edition",
  "Inspection & Testing",
  "Installation",
  "Domestic",
  "Commercial",
  "Industrial",
  "Solar PV",
  "EV Charging",
  "Fire Alarms",
  "Emergency Lighting",
  "PAT Testing",
];

export function AddTutorDialog({ open, onOpenChange }: AddTutorDialogProps) {
  const { addStaff } = useCollege();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "tutor" as StaffRole,
    department: "",
    employmentType: "Full-time" as "Full-time" | "Part-time" | "Agency" | "Contractor",
    startDate: new Date().toISOString().split('T')[0],
    maxTeachingHours: "",
    teachingQual: "",
    assessorQual: "",
    specialisations: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate avatar initials from name
      const nameParts = formData.name.trim().split(' ');
      const avatarInitials = nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : formData.name.substring(0, 2).toUpperCase();

      addStaff({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department,
        status: 'Active',
        specialisations: formData.specialisations,
        qualifications: [],
        avatarInitials,
        employmentType: formData.employmentType,
        startDate: formData.startDate,
        maxTeachingHours: formData.maxTeachingHours ? parseInt(formData.maxTeachingHours) : undefined,
        teachingQual: formData.teachingQual || undefined,
        assessorQual: formData.assessorQual || undefined,
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "tutor",
        department: "",
        employmentType: "Full-time",
        startDate: new Date().toISOString().split('T')[0],
        maxTeachingHours: "",
        teachingQual: "",
        assessorQual: "",
        specialisations: [],
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add tutor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSpecialisation = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialisations: prev.specialisations.includes(spec)
        ? prev.specialisations.filter(s => s !== spec)
        : [...prev.specialisations, spec]
    }));
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[500px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-elec-yellow" />
            Add New Tutor
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Add a new tutor or staff member to the system. All fields marked with * are required.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john.smith@college.ac.uk"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="07XXX XXXXXX"
                  required
                />
              </div>
            </div>
          </div>

          {/* Role & Department */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutor">Tutor</SelectItem>
                  <SelectItem value="assessor">Assessor</SelectItem>
                  <SelectItem value="head_of_department">Head of Department</SelectItem>
                  <SelectItem value="support">Support Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleChange("department", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Employment */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="employmentType">Employment Type *</Label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) => handleChange("employmentType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Agency">Agency</SelectItem>
                  <SelectItem value="Contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          </div>

          {/* Teaching Details */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="maxTeachingHours">Max Hours/Week</Label>
              <Input
                id="maxTeachingHours"
                type="number"
                min="0"
                max="40"
                value={formData.maxTeachingHours}
                onChange={(e) => handleChange("maxTeachingHours", e.target.value)}
                placeholder="35"
              />
            </div>
            <div>
              <Label htmlFor="teachingQual">Teaching Qual</Label>
              <Input
                id="teachingQual"
                value={formData.teachingQual}
                onChange={(e) => handleChange("teachingQual", e.target.value)}
                placeholder="PGCE, AET"
              />
            </div>
            <div>
              <Label htmlFor="assessorQual">Assessor Qual</Label>
              <Input
                id="assessorQual"
                value={formData.assessorQual}
                onChange={(e) => handleChange("assessorQual", e.target.value)}
                placeholder="L3 TAQA"
              />
            </div>
          </div>

          {/* Specialisations */}
          <div>
            <Label>Specialisations</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {SPECIALIZATIONS.map((spec) => (
                <Button
                  key={spec}
                  type="button"
                  variant={formData.specialisations.includes(spec) ? "default" : "outline"}
                  size="sm"
                  className={`h-11 touch-manipulation ${formData.specialisations.includes(spec) ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black" : ""}`}
                  onClick={() => toggleSpecialisation(spec)}
                >
                  {spec}
                </Button>
              ))}
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
            disabled={isSubmitting || !formData.name || !formData.email || !formData.department}
            className="h-11 touch-manipulation"
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Tutor"
            )}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
