import { useState, useEffect, useRef } from "react";
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
} from "@/components/ui/responsive-form-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateEmployee, useDeleteEmployee } from "@/hooks/useEmployees";
import { uploadEmployeePhoto } from "@/services/photoUploadService";
import { toast } from "@/hooks/use-toast";
import { UserCog, Trash2, Camera, Loader2, User, Briefcase, PoundSterling, CreditCard } from "lucide-react";
import type { Employee, PayType } from "@/services/employeeService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useElecIdProfileByEmployee } from "@/hooks/useElecId";
import { Badge } from "@/components/ui/badge";

type TeamRole = "QS" | "Supervisor" | "Operative" | "Apprentice" | "Project Manager";

const TEAM_ROLES: TeamRole[] = ["QS", "Supervisor", "Operative", "Apprentice", "Project Manager"];
const JOB_ROLES = ["Senior Electrician", "Electrician", "Apprentice", "Project Manager", "Site Supervisor", "Estimator"];
const STATUSES = ["Active", "On Leave", "Archived"];

interface EditEmployeeDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditEmployeeDialog({ employee, open, onOpenChange }: EditEmployeeDialogProps) {
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  
  const { data: elecIdProfile } = useElecIdProfileByEmployee(employee?.id || "");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    team_role: "" as TeamRole,
    status: "",
    payType: "hourly" as PayType,
    hourlyRate: "25",
    annualSalary: "",
    dayRate: "",
  });

  useEffect(() => {
    if (employee) {
      let hourlyRate = employee.hourly_rate?.toString() || "25";
      let annualSalary = employee.annual_salary?.toString() || "";
      let dayRate = "";

      if (employee.pay_type === "day_rate" && employee.hourly_rate) {
        dayRate = (employee.hourly_rate * 8).toString();
      }

      setFormData({
        name: employee.name,
        email: employee.email || "",
        phone: employee.phone || "",
        role: employee.role,
        team_role: employee.team_role as TeamRole,
        status: employee.status,
        payType: employee.pay_type || "hourly",
        hourlyRate,
        annualSalary,
        dayRate,
      });
      setPhotoUrl(employee.photo_url);
    }
  }, [employee]);

  const calculateEquivalent = () => {
    if (formData.payType === "hourly" && formData.hourlyRate) {
      const annual = parseFloat(formData.hourlyRate) * 40 * 52;
      return `≈ £${annual.toLocaleString()} p.a.`;
    }
    if (formData.payType === "annual" && formData.annualSalary) {
      const hourly = parseFloat(formData.annualSalary) / (40 * 52);
      return `≈ £${hourly.toFixed(2)}/hr`;
    }
    if (formData.payType === "day_rate" && formData.dayRate) {
      const annual = parseFloat(formData.dayRate) * 5 * 52;
      return `≈ £${annual.toLocaleString()} p.a.`;
    }
    return null;
  };

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !employee) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image under 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadEmployeePhoto(employee.id, file);
      if (url) {
        setPhotoUrl(url);
        await updateEmployee.mutateAsync({
          id: employee.id,
          updates: { photo_url: url },
        });
        toast({
          title: "Photo Updated",
          description: "Profile photo has been updated.",
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employee) return;

    if (!formData.name || !formData.role || !formData.team_role) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    let hourlyRate = parseFloat(formData.hourlyRate) || 25;
    let annualSalary: number | null = null;

    if (formData.payType === "annual" && formData.annualSalary) {
      annualSalary = parseFloat(formData.annualSalary);
      hourlyRate = annualSalary / (40 * 52);
    } else if (formData.payType === "day_rate" && formData.dayRate) {
      const dayRate = parseFloat(formData.dayRate);
      hourlyRate = dayRate / 8;
      annualSalary = dayRate * 5 * 52;
    }

    try {
      await updateEmployee.mutateAsync({
        id: employee.id,
        updates: {
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone || null,
          role: formData.role,
          team_role: formData.team_role,
          status: formData.status,
          hourly_rate: hourlyRate,
          annual_salary: annualSalary,
          pay_type: formData.payType,
        },
      });

      toast({
        title: "Employee Updated",
        description: `${formData.name}'s profile has been updated.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!employee) return;
    
    try {
      await deleteEmployee.mutateAsync(employee.id);
      toast({
        title: "Employee Archived",
        description: `${employee.name} has been archived.`,
      });
      setShowDeleteConfirm(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive employee. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!employee) return null;

  return (
    <>
      <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
        <ResponsiveFormModalContent>
          <ResponsiveFormModalHeader>
            <ResponsiveFormModalTitle>
              <UserCog className="h-5 w-5 text-elec-yellow" />
              Edit Team Member
            </ResponsiveFormModalTitle>
          </ResponsiveFormModalHeader>
          
          <ResponsiveFormModalBody>
            <form id="edit-employee-form" onSubmit={handleSubmit} className="space-y-6 py-2">
              {/* Photo Upload Section */}
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                    <AvatarImage src={photoUrl || undefined} alt={employee.name} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-3xl">
                      {employee.avatar_initials}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center shadow-md hover:bg-elec-yellow/90 transition-colors disabled:opacity-50 touch-feedback"
                  >
                    {isUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Elec-ID Status */}
              <div className="flex items-center justify-center">
                {elecIdProfile ? (
                  <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 text-sm">
                    <CreditCard className="h-3.5 w-3.5" />
                    Elec-ID: {elecIdProfile.elec_id_number}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground px-3 py-1.5">
                    No Elec-ID Profile
                  </Badge>
                )}
              </div>

              {/* Personal Info Section */}
              <div className="rounded-xl bg-surface/50 border border-border/50 p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="h-7 w-7 rounded-lg bg-success/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-success" />
                  </div>
                  Personal Information
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="07700 900000"
                      className="h-12 text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details Section */}
              <div className="rounded-xl bg-surface/50 border border-border/50 p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="h-7 w-7 rounded-lg bg-info/20 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-info" />
                  </div>
                  Employment Details
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-medium">Job Role *</Label>
                    <Select value={formData.role} onValueChange={(val) => setFormData(prev => ({ ...prev, role: val }))}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select role..." />
                      </SelectTrigger>
                      <SelectContent>
                        {JOB_ROLES.map(role => (
                          <SelectItem key={role} value={role} className="h-12">{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="teamRole" className="text-sm font-medium">Team Role *</Label>
                      <Select value={formData.team_role} onValueChange={(val) => setFormData(prev => ({ ...prev, team_role: val as TeamRole }))}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {TEAM_ROLES.map(role => (
                            <SelectItem key={role} value={role} className="h-12">{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                      <Select value={formData.status} onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map(status => (
                            <SelectItem key={status} value={status} className="h-12">{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Information Section */}
              <div className="rounded-xl bg-surface/50 border border-border/50 p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="h-7 w-7 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                    <PoundSterling className="h-4 w-4 text-elec-yellow" />
                  </div>
                  Pay Information
                </div>
                <div className="space-y-4">
                  <RadioGroup
                    value={formData.payType}
                    onValueChange={(val) => setFormData(prev => ({ ...prev, payType: val as PayType }))}
                    className="flex flex-col gap-2"
                  >
                    {[
                      { value: "hourly", label: "Hourly Rate" },
                      { value: "annual", label: "Annual Salary" },
                      { value: "day_rate", label: "Day Rate" },
                    ].map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem value={option.value} id={`edit-${option.value}`} className="peer sr-only" />
                        <Label
                          htmlFor={`edit-${option.value}`}
                          className="flex items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-elec-yellow peer-data-[state=checked]:bg-elec-yellow/10 cursor-pointer transition-all touch-feedback"
                        >
                          <span className="text-base font-medium">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="space-y-2 animate-fade-in">
                    {formData.payType === "hourly" && (
                      <>
                        <Label htmlFor="hourlyRate" className="text-sm font-medium">Hourly Rate (£)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="0.50"
                          value={formData.hourlyRate}
                          onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                          className="h-12 text-base"
                        />
                      </>
                    )}
                    {formData.payType === "annual" && (
                      <>
                        <Label htmlFor="annualSalary" className="text-sm font-medium">Annual Salary (£)</Label>
                        <Input
                          id="annualSalary"
                          type="number"
                          inputMode="numeric"
                          min="0"
                          step="1000"
                          value={formData.annualSalary}
                          onChange={(e) => setFormData(prev => ({ ...prev, annualSalary: e.target.value }))}
                          placeholder="45000"
                          className="h-12 text-base"
                        />
                      </>
                    )}
                    {formData.payType === "day_rate" && (
                      <>
                        <Label htmlFor="dayRate" className="text-sm font-medium">Day Rate (£)</Label>
                        <Input
                          id="dayRate"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="10"
                          value={formData.dayRate}
                          onChange={(e) => setFormData(prev => ({ ...prev, dayRate: e.target.value }))}
                          placeholder="250"
                          className="h-12 text-base"
                        />
                      </>
                    )}
                    {calculateEquivalent() && (
                      <p className="text-sm text-muted-foreground">{calculateEquivalent()}</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </ResponsiveFormModalBody>

          <ResponsiveFormModalFooter>
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="destructive" 
                size="icon"
                className="h-12 w-12 shrink-0"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 h-12 text-base"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="edit-employee-form"
                className="flex-1 h-12 text-base font-semibold"
                disabled={updateEmployee.isPending}
              >
                {updateEmployee.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </ResponsiveFormModalFooter>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Employee?</AlertDialogTitle>
            <AlertDialogDescription>
              This will archive {employee?.name}. They will no longer appear in active team lists but their records will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteEmployee.isPending}
            >
              {deleteEmployee.isPending ? "Archiving..." : "Archive"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
