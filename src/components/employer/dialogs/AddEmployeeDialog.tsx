import { useState, useRef, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateEmployee } from "@/hooks/useEmployees";
import { useCreateElecIdProfile } from "@/hooks/useElecId";
import { toast } from "@/hooks/use-toast";
import { Plus, UserPlus, Camera, User, Briefcase, PoundSterling, CreditCard, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { PayType } from "@/services/employeeService";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

type TeamRole = "QS" | "Supervisor" | "Operative" | "Apprentice" | "Project Manager";

const TEAM_ROLES: TeamRole[] = ["QS", "Supervisor", "Operative", "Apprentice", "Project Manager"];
const JOB_ROLES = ["Senior Electrician", "Electrician", "Apprentice", "Project Manager", "Site Supervisor", "Estimator"];
const ECS_CARD_TYPES = ["Gold", "Blue", "White", "Black", "Green"];

interface AddEmployeeDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddEmployeeDialog({ trigger, open: controlledOpen, onOpenChange }: AddEmployeeDialogProps) {
  const createEmployee = useCreateEmployee();
  const createElecId = useCreateElecIdProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [isUploading, setIsUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    teamRole: "" as TeamRole | "",
    payType: "hourly" as PayType,
    hourlyRate: "25",
    annualSalary: "",
    dayRate: "",
    createElecId: false,
    ecsCardType: "Gold",
    ecsCardNumber: "",
    ecsExpiryDate: "",
  });

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file", description: "Please select an image file.", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Image must be under 5MB.", variant: "destructive" });
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const uploadPhoto = async (employeeId: string): Promise<string | null> => {
    if (!photoFile) return null;

    const fileExt = photoFile.name.split('.').pop();
    const fileName = `${employeeId}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('employee-photos')
      .upload(filePath, photoFile, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('employee-photos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.teamRole) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

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

    setIsUploading(true);

    try {
      const employee = await createEmployee.mutateAsync({
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        role: formData.role,
        team_role: formData.teamRole as TeamRole,
        status: "Active",
        avatar_initials: initials,
        hourly_rate: hourlyRate,
        annual_salary: annualSalary,
        pay_type: formData.payType,
        join_date: new Date().toISOString().split('T')[0],
        photo_url: null,
        certifications_count: 0,
        active_jobs_count: 0,
      });

      if (photoFile && employee.id) {
        const photoUrl = await uploadPhoto(employee.id);
        if (photoUrl) {
          await supabase
            .from('employer_employees')
            .update({ photo_url: photoUrl })
            .eq('id', employee.id);
        }
      }

      if (formData.createElecId && employee.id) {
        const elecIdNumber = `EID-${Date.now().toString(36).toUpperCase()}`;
        await createElecId.mutateAsync({
          employee_id: employee.id,
          elec_id_number: elecIdNumber,
          ecs_card_type: formData.ecsCardType.toLowerCase(),
          ecs_card_number: formData.ecsCardNumber || null,
          ecs_expiry_date: formData.ecsExpiryDate || null,
        });
      }

      toast({
        title: "Employee Added",
        description: `${formData.name} has been added to your team.${formData.createElecId ? " Elec-ID created." : ""}`,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        teamRole: "",
        payType: "hourly",
        hourlyRate: "25",
        annualSalary: "",
        dayRate: "",
        createElecId: false,
        ecsCardType: "Gold",
        ecsCardNumber: "",
        ecsExpiryDate: "",
      });
      setPhotoPreview(null);
      setPhotoFile(null);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const isPending = createEmployee.isPending || isUploading;

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'add-employee',
      formName: 'Add Employee',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'role', label: 'Job Role', type: 'text', required: true },
        { name: 'teamRole', label: 'Team Role', type: 'text', required: true },
        { name: 'payType', label: 'Pay Type', type: 'text' },
        { name: 'hourlyRate', label: 'Hourly Rate', type: 'text' },
        { name: 'annualSalary', label: 'Annual Salary', type: 'text' },
        { name: 'dayRate', label: 'Day Rate', type: 'text' },
      ],
      onFillField: (field, value) => {
        const strValue = String(value);
        setFormData(prev => ({ ...prev, [field]: strValue }));
      },
      onSubmit: () => {
        const form = document.getElementById('employee-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });
    
    return () => voiceContext.unregisterForm('add-employee');
  }, [open, voiceContext]);

  return (
    <ResponsiveFormModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        trigger !== null
          ? trigger || (
              <Button size="sm" className="touch-feedback">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            )
          : undefined
      }
    >
      <ResponsiveFormModalContent>
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle>
            <UserPlus className="h-5 w-5 text-elec-yellow" />
            Add Team Member
          </ResponsiveFormModalTitle>
        </ResponsiveFormModalHeader>
        
        <ResponsiveFormModalBody>
          <form id="employee-form" onSubmit={handleSubmit} className="space-y-6 py-2">
            {/* Photo Upload Section */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                  <AvatarImage src={photoPreview || undefined} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-3xl">
                    {formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : <User className="h-12 w-12" />}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center shadow-md hover:bg-elec-yellow/90 transition-colors touch-feedback"
                >
                  <Camera className="h-5 w-5" />
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
                    placeholder="John Smith"
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
                    placeholder="john@example.com"
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
                <div className="space-y-2">
                  <Label htmlFor="teamRole" className="text-sm font-medium">Team Role *</Label>
                  <Select value={formData.teamRole} onValueChange={(val) => setFormData(prev => ({ ...prev, teamRole: val as TeamRole }))}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select team role..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_ROLES.map(role => (
                        <SelectItem key={role} value={role} className="h-12">{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                      <Label
                        htmlFor={option.value}
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
                        placeholder="25.00"
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

            {/* Elec-ID Section */}
            <div className="rounded-xl bg-surface/50 border border-border/50 p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <div className="h-7 w-7 rounded-lg bg-warning/20 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-warning" />
                </div>
                Elec-ID Card
              </div>
              <div className="space-y-4">
                <div 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 cursor-pointer touch-feedback"
                  onClick={() => setFormData(prev => ({ ...prev, createElecId: !prev.createElecId }))}
                >
                  <Checkbox
                    id="createElecId"
                    checked={formData.createElecId}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, createElecId: checked as boolean }))}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="createElecId" className="text-base font-normal cursor-pointer flex-1">
                    Create Elec-ID profile for this employee
                  </Label>
                </div>

                {formData.createElecId && (
                  <div className="space-y-4 pt-2 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="ecsCardType" className="text-sm font-medium">ECS Card Type</Label>
                      <Select value={formData.ecsCardType} onValueChange={(val) => setFormData(prev => ({ ...prev, ecsCardType: val }))}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {ECS_CARD_TYPES.map(type => (
                            <SelectItem key={type} value={type} className="h-12">{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ecsCardNumber" className="text-sm font-medium">ECS Card Number</Label>
                      <Input
                        id="ecsCardNumber"
                        value={formData.ecsCardNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, ecsCardNumber: e.target.value }))}
                        placeholder="ECS-12345678"
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ecsExpiryDate" className="text-sm font-medium">ECS Expiry Date</Label>
                      <Input
                        id="ecsExpiryDate"
                        type="date"
                        value={formData.ecsExpiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, ecsExpiryDate: e.target.value }))}
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </ResponsiveFormModalBody>

        <ResponsiveFormModalFooter>
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 h-12 text-base"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              form="add-employee-form"
              className="flex-1 h-12 text-base font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Employee"
              )}
            </Button>
          </div>
        </ResponsiveFormModalFooter>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
