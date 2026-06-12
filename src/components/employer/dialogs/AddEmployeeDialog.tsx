import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IOSStepIndicator } from '@/components/ui/ios-step-indicator';
import { useCreateEmployee } from '@/hooks/useEmployees';
import { useCreateElecIdProfile } from '@/hooks/useElecId';
import { toast } from '@/hooks/use-toast';
import {
  Plus,
  Camera,
  User,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Sparkles,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { PayType } from '@/services/employeeService';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  checkboxClass,
  Eyebrow,
} from '@/components/employer/editorial';

/* ==========================================================================
   AddEmployeeDialog — stepped bottom sheet for adding a team member.
   Same shell as the quote/invoice builders: full-width sheet, drag handle,
   step indicator, sticky action bar. Three steps: Who → Role & pay →
   Elec-ID & review.
   ========================================================================== */

type TeamRole = 'QS' | 'Supervisor' | 'Operative' | 'Apprentice' | 'Project Manager';

const TEAM_ROLES: TeamRole[] = ['QS', 'Supervisor', 'Operative', 'Apprentice', 'Project Manager'];
const JOB_ROLES = [
  'Senior Electrician',
  'Electrician',
  'Apprentice',
  'Project Manager',
  'Site Supervisor',
  'Estimator',
];
const ECS_CARD_TYPES = ['Gold', 'Blue', 'White', 'Black', 'Green'];

interface AddEmployeeDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddEmployeeDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: AddEmployeeDialogProps) {
  const createEmployee = useCreateEmployee();
  const createElecId = useCreateElecIdProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    teamRole: '' as TeamRole | '',
    payType: 'hourly' as PayType,
    hourlyRate: '25',
    annualSalary: '',
    dayRate: '',
    createElecId: false,
    ecsCardType: 'Gold',
    ecsCardNumber: '',
    ecsExpiryDate: '',
  });

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Please select an image file.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Image must be under 5MB.',
        variant: 'destructive',
      });
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

    const {
      data: { publicUrl },
    } = supabase.storage.from('employee-photos').getPublicUrl(filePath);

    return publicUrl;
  };

  const payLabel = () => {
    if (formData.payType === 'hourly' && formData.hourlyRate)
      return `£${formData.hourlyRate}/hr`;
    if (formData.payType === 'annual' && formData.annualSalary)
      return `£${Number(formData.annualSalary).toLocaleString()} p.a.`;
    if (formData.payType === 'day_rate' && formData.dayRate) return `£${formData.dayRate}/day`;
    return 'Not set';
  };

  const calculateEquivalent = () => {
    if (formData.payType === 'hourly' && formData.hourlyRate) {
      const annual = parseFloat(formData.hourlyRate) * 40 * 52;
      return `≈ £${annual.toLocaleString()} p.a.`;
    }
    if (formData.payType === 'annual' && formData.annualSalary) {
      const hourly = parseFloat(formData.annualSalary) / (40 * 52);
      return `≈ £${hourly.toFixed(2)}/hr`;
    }
    if (formData.payType === 'day_rate' && formData.dayRate) {
      const annual = parseFloat(formData.dayRate) * 5 * 52;
      return `≈ £${annual.toLocaleString()} p.a.`;
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.role || !formData.teamRole) {
      toast({
        title: 'Missing fields',
        description: 'Name, job role and team role are required.',
        variant: 'destructive',
      });
      return;
    }

    const initials = formData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    let hourlyRate = parseFloat(formData.hourlyRate) || 25;
    let annualSalary: number | null = null;

    if (formData.payType === 'annual' && formData.annualSalary) {
      annualSalary = parseFloat(formData.annualSalary);
      hourlyRate = annualSalary / (40 * 52);
    } else if (formData.payType === 'day_rate' && formData.dayRate) {
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
        status: 'Active',
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
        title: 'Team member added',
        description: `${formData.name} has been added to your team.${formData.createElecId ? ' Elec-ID created.' : ''}`,
      });

      resetForm();
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add team member. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      teamRole: '',
      payType: 'hourly',
      hourlyRate: '25',
      annualSalary: '',
      dayRate: '',
      createElecId: false,
      ecsCardType: 'Gold',
      ecsCardNumber: '',
      ecsExpiryDate: '',
    });
    setPhotoPreview(null);
    setPhotoFile(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    setOpen(next);
  };

  const isPending = createEmployee.isPending || isUploading;

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return !!formData.role && !!formData.teamRole;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'add-employee',
      formName: 'Add Team Member',
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
      actions: ['next_step', 'previous_step'],
      onFillField: (field, value) => {
        const strValue = String(value);
        setFormData((prev) => ({ ...prev, [field]: strValue }));
      },
      onAction: (action) => {
        if (action === 'next_step') setStep((prev) => Math.min(prev + 1, 3));
        if (action === 'previous_step') setStep((prev) => Math.max(prev - 1, 1));
      },
      onSubmit: handleSubmit,
      onCancel: () => handleOpenChange(false),
      onNextStep: () => setStep((prev) => Math.min(prev + 1, 3)),
    });

    return () => voiceContext.unregisterForm('add-employee');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, voiceContext]);

  const stepLabels = ['Who', 'Role & pay', 'Review'];
  const currentStepLabel = stepLabels[step - 1];

  const initialsPreview = formData.name
    ? formData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {trigger !== null && trigger !== undefined && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      {trigger === undefined && controlledOpen === undefined && (
        <SheetTrigger asChild>
          <Button size="sm" className="touch-feedback">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </SheetTrigger>
      )}
      <SheetContent
        side="bottom"
        className="h-[95vh] p-0 rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.08]"
      >
        <div className="flex flex-col h-full">
          {/* Drag indicator */}
          <div className="pt-2.5 pb-1 flex justify-center">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="px-4 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenChange(false)}
                  className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <div>
                  <Eyebrow>New team member</Eyebrow>
                  <div className="mt-1 text-[18px] font-semibold text-white leading-tight">
                    {formData.name.trim() || 'Add to your team'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[13px] font-medium text-white">{currentStepLabel}</span>
                <IOSStepIndicator steps={3} currentStep={step - 1} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 px-4">
            <div className="py-6 pb-40">
              {step === 1 && (
                <div className="space-y-4">
                  {/* Photo */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-[hsl(0_0%_8%)] shadow-lg">
                        <AvatarImage src={photoPreview || undefined} />
                        <AvatarFallback className="bg-white/[0.06] text-white text-2xl">
                          {initialsPreview || <User className="h-10 w-10" />}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-1 -right-1 h-11 w-11 rounded-full bg-elec-yellow text-black flex items-center justify-center shadow-md hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                        aria-label="Add photo"
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

                  <FormCard eyebrow="Personal details">
                    <Field label="Full name" required>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="John Smith"
                        className={inputClass}
                        autoComplete="off"
                      />
                    </Field>
                    <Field label="Email">
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="john@example.com"
                        className={inputClass}
                        autoComplete="off"
                      />
                    </Field>
                    <Field label="Phone">
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="07700 900000"
                        className={inputClass}
                        autoComplete="off"
                      />
                    </Field>
                  </FormCard>

                  <div className="rounded-2xl border border-elec-yellow/25 bg-elec-yellow/[0.06] px-4 py-3.5 flex gap-3">
                    <Sparkles className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <div className="text-[12.5px] leading-relaxed text-white/80">
                      <span className="font-medium text-white">How linking works:</span> they sign
                      in with this email and connect to your team automatically. A linked team
                      member adds <span className="font-medium text-white">£9.99/month</span> to
                      your subscription — they pay nothing themselves.
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormCard eyebrow="Role">
                    <Field label="Job role" required>
                      <Select
                        value={formData.role}
                        onValueChange={(val) => setFormData((prev) => ({ ...prev, role: val }))}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Select role..." />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          {JOB_ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Team role" required>
                      <div className="grid grid-cols-2 gap-2">
                        {TEAM_ROLES.map((role) => {
                          const active = formData.teamRole === role;
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, teamRole: role }))}
                              className={cn(
                                'h-11 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation',
                                active
                                  ? 'bg-elec-yellow text-black border-elec-yellow'
                                  : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.05]'
                              )}
                            >
                              {role}
                            </button>
                          );
                        })}
                      </div>
                      {formData.teamRole === 'QS' && (
                        <p className="text-[11.5px] text-white/50 mt-2">
                          QS team members can review and countersign certificates submitted by
                          your electricians.
                        </p>
                      )}
                    </Field>
                  </FormCard>

                  <FormCard eyebrow="Pay">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'hourly', label: 'Hourly' },
                        { value: 'annual', label: 'Annual' },
                        { value: 'day_rate', label: 'Day rate' },
                      ].map((option) => {
                        const active = formData.payType === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                payType: option.value as PayType,
                              }))
                            }
                            className={cn(
                              'h-11 rounded-xl text-[13px] font-medium border transition-colors touch-manipulation',
                              active
                                ? 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow'
                                : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.05]'
                            )}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>

                    {formData.payType === 'hourly' && (
                      <Field label="Hourly rate (£)">
                        <Input
                          id="hourlyRate"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="0.50"
                          value={formData.hourlyRate}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))
                          }
                          placeholder="25.00"
                          className={inputClass}
                        />
                      </Field>
                    )}
                    {formData.payType === 'annual' && (
                      <Field label="Annual salary (£)">
                        <Input
                          id="annualSalary"
                          type="number"
                          inputMode="numeric"
                          min="0"
                          step="1000"
                          value={formData.annualSalary}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, annualSalary: e.target.value }))
                          }
                          placeholder="45000"
                          className={inputClass}
                        />
                      </Field>
                    )}
                    {formData.payType === 'day_rate' && (
                      <Field label="Day rate (£)">
                        <Input
                          id="dayRate"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="10"
                          value={formData.dayRate}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, dayRate: e.target.value }))
                          }
                          placeholder="250"
                          className={inputClass}
                        />
                      </Field>
                    )}
                    {calculateEquivalent() && (
                      <p className="text-[12px] text-white/60">{calculateEquivalent()}</p>
                    )}
                    <p className="text-[11.5px] text-white/40">
                      Used for job costing and timesheet labour costs — only you can see it.
                    </p>
                  </FormCard>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <FormCard eyebrow="Elec-ID card">
                    <div
                      className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] cursor-pointer touch-manipulation min-h-[44px]"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, createElecId: !prev.createElecId }))
                      }
                    >
                      <Checkbox
                        id="createElecId"
                        checked={formData.createElecId}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, createElecId: checked as boolean }))
                        }
                        className={checkboxClass}
                      />
                      <label
                        htmlFor="createElecId"
                        className="text-[13px] text-white cursor-pointer flex-1"
                      >
                        Create an Elec-ID profile for this team member
                      </label>
                    </div>

                    {formData.createElecId && (
                      <div className="space-y-3 pt-2 animate-fade-in">
                        <Field label="ECS card type">
                          <Select
                            value={formData.ecsCardType}
                            onValueChange={(val) =>
                              setFormData((prev) => ({ ...prev, ecsCardType: val }))
                            }
                          >
                            <SelectTrigger className={selectTriggerClass}>
                              <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent className={selectContentClass}>
                              {ECS_CARD_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        <FormGrid cols={2}>
                          <Field label="ECS card number">
                            <Input
                              id="ecsCardNumber"
                              value={formData.ecsCardNumber}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  ecsCardNumber: e.target.value,
                                }))
                              }
                              placeholder="ECS-12345678"
                              className={inputClass}
                            />
                          </Field>
                          <Field label="ECS expiry date">
                            <Input
                              id="ecsExpiryDate"
                              type="date"
                              value={formData.ecsExpiryDate}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  ecsExpiryDate: e.target.value,
                                }))
                              }
                              className={inputClass}
                            />
                          </Field>
                        </FormGrid>
                      </div>
                    )}
                  </FormCard>

                  {/* Review summary */}
                  <div className="rounded-2xl bg-elec-yellow/10 border border-elec-yellow/30 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={photoPreview || undefined} />
                        <AvatarFallback className="bg-white/[0.08] text-white">
                          {initialsPreview || <User className="h-5 w-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">
                          {formData.name || 'Unnamed'}
                        </p>
                        <p className="text-[12.5px] text-white/60 truncate">
                          {[formData.role, formData.teamRole].filter(Boolean).join(' · ') ||
                            'Role not set'}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-white/[0.1] pt-3 space-y-1.5 text-[12.5px]">
                      <div className="flex justify-between">
                        <span className="text-white/60">Pay</span>
                        <span className="text-white tabular-nums">{payLabel()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Elec-ID</span>
                        <span className="text-white">
                          {formData.createElecId ? 'Will be created' : 'Not now'}
                        </span>
                      </div>
                      {formData.email.trim() && (
                        <div className="flex justify-between">
                          <span className="text-white/60">Seat when they link</span>
                          <span className="text-white tabular-nums">£9.99/month</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sticky action bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[hsl(0_0%_8%)] border-t border-white/[0.06]">
            <div className="px-4 py-3 pb-safe">
              <div className="flex gap-3 w-full">
                {step > 1 ? (
                  <SecondaryButton onClick={() => setStep(step - 1)} fullWidth>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </SecondaryButton>
                ) : (
                  <SecondaryButton onClick={() => handleOpenChange(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                )}
                {step < 3 ? (
                  <PrimaryButton onClick={() => setStep(step + 1)} disabled={!canProceed()} fullWidth>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </PrimaryButton>
                ) : (
                  <PrimaryButton onClick={handleSubmit} disabled={isPending} fullWidth>
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add team member
                      </>
                    )}
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
