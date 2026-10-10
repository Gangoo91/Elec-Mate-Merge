import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  checkboxClass,
  Eyebrow,
} from '@/components/employer/editorial';
import { SelectField } from '@/components/forms';
import { autoCompleteOff } from '@/lib/textEntry';
import { TEAM_ROLES, TEAM_ROLE_HINT, TEAM_ROLE_SEAT, type TeamRole } from '@/lib/teamRoles';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useSavePayProfile } from '@/hooks/usePayLaw';
import { useHrSettings } from '@/hooks/useRightToWork';
import { useSavePersonHr } from '@/hooks/useHrRecords';
import { addDays, addMonths, format, parseISO } from 'date-fns';
import {
  CIS_STATUS_OPTIONS,
  saveSubcontractorDetails,
  saveSubcontractorTerms,
  type CisStatus,
} from '@/hooks/useSubcontractors';

/** ELE-1830: the first question is what kind of worker this is. */
type WorkerType = 'employee' | 'apprentice' | 'subcontractor';
const WORKER_TYPES: { value: WorkerType; label: string; hint: string }[] = [
  { value: 'employee', label: 'Employee', hint: 'On your payroll, with holiday.' },
  { value: 'apprentice', label: 'Apprentice', hint: 'Training with a college.' },
  {
    value: 'subcontractor',
    label: 'Subcontractor',
    hint: 'Self-employed. Day rate and CIS, no holiday or PAYE.',
  },
];
const EMPLOYEE_ROLES = TEAM_ROLES.filter((r) => r !== 'Apprentice' && r !== 'Subcontractor');
const typeForRole = (r: TeamRole | '' | undefined): WorkerType | '' =>
  r === 'Apprentice' ? 'apprentice' : r === 'Subcontractor' ? 'subcontractor' : r ? 'employee' : '';

/* ==========================================================================
   AddEmployeeDialog — stepped bottom sheet for adding a team member.
   Same shell as the quote/invoice builders: full-width sheet, drag handle,
   step indicator, sticky action bar. Three steps: Who → Role & pay →
   Elec-ID & review.
   ========================================================================== */



const JOB_ROLES = [
  'Senior Electrician',
  'Electrician',
  'Apprentice',
  'Project Manager',
  'Site Supervisor',
  'Estimator',
];
const ECS_CARD_TYPES = [
  { value: 'Installation Electrician', label: 'Installation Electrician (Gold)' },
  { value: 'Maintenance Electrician', label: 'Maintenance Electrician (Gold)' },
  { value: 'Approved Electrician', label: 'Approved Electrician (Gold)' },
  { value: 'Domestic Electrician', label: 'Domestic Electrician (Gold)' },
  { value: 'Experienced Worker', label: 'Experienced Worker' },
  { value: 'Trainee Electrician', label: 'Trainee Electrician' },
  { value: 'Apprentice', label: 'ECS Apprentice' },
  { value: 'Electrical Labourer', label: 'Electrical Labourer' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Related Discipline', label: 'Related Discipline (White)' },
];

interface AddEmployeeDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Pre-fill the form each time the sheet opens (e.g. an apprentice the college links to the firm). */
  defaults?: { name?: string; email?: string; teamRole?: TeamRole };
}

export function AddEmployeeDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
  defaults,
}: AddEmployeeDialogProps) {
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;
  const createEmployee = useCreateEmployee();
  const createElecId = useCreateElecIdProfile();
  const savePayProfile = useSavePayProfile();
  // Gap §3C #25: probation from the firm's HR settings, from the chosen start date.
  const { data: hrSettings } = useHrSettings();
  const savePersonHr = useSavePersonHr();
  const today = () => new Date().toISOString().split('T')[0];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comped employers (e.g. build partners) get free seats — so the pricing copy
  // must reflect their plan rather than the generic £9.99.
  const { data: isComped = false } = useQuery({
    queryKey: ['employer-comped-seats'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return false;
      const { data } = await supabase
        .from('profiles')
        .select('free_access_granted')
        .eq('id', user.id)
        .maybeSingle();
      return data?.free_access_granted === true;
    },
    staleTime: 5 * 60 * 1000,
  });
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
    workerType: '' as WorkerType | '',
    trade: 'Electrician',
    subRate: '',
    cisStatus: 'unverified' as CisStatus,
    payType: 'hourly' as PayType,
    hourlyRate: '25',
    annualSalary: '',
    dayRate: '',
    createElecId: false,
    ecsCardType: 'Installation Electrician',
    ecsCardNumber: '',
    ecsExpiryDate: '',
    dateOfBirth: '',
    apprenticeshipStart: '',
    startDate: new Date().toISOString().split('T')[0],
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

    // Bare path, not a public URL: the bucket is going private and every
    // reader signs paths on demand (useStorageUrl('employee-photos', …)).
    return filePath;
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
    // Office managers can't set pay (guard_roster_pay_rates), and subbies are
    // paid through their own terms, not the roster's hourly rate.
    const noRosterPay = !canSeeMoney || formData.workerType === 'subcontractor';

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
        hourly_rate: noRosterPay ? 0 : hourlyRate,
        annual_salary: noRosterPay ? null : annualSalary,
        pay_type: formData.workerType === 'subcontractor' ? 'day_rate' : formData.payType,
        join_date: formData.startDate || today(),
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

      if (formData.workerType === 'subcontractor' && employee.id) {
        try {
          await saveSubcontractorDetails(employee.id, { trade: formData.trade.trim() || null });
          const rate = parseFloat(formData.subRate);
          if (canSeeMoney && (rate > 0 || formData.cisStatus !== 'unverified')) {
            await saveSubcontractorTerms(employee.id, {
              rate_basis: 'day',
              rate: rate > 0 ? rate : null,
              cis_status: formData.cisStatus,
            });
          }
        } catch {
          toast({
            title: 'Added, but trade and rate not saved',
            description: 'Set them in People, Subcontractors.',
            variant: 'destructive',
          });
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

      // ELE-2063: date of birth and apprenticeship start (owner/admin only).
      if (
        canSeeMoney &&
        employee.id &&
        formData.workerType !== 'subcontractor' &&
        (formData.dateOfBirth || formData.apprenticeshipStart)
      ) {
        try {
          await savePayProfile.mutateAsync({
            employeeId: employee.id,
            dateOfBirth: formData.dateOfBirth || null,
            apprenticeshipStart:
              formData.workerType === 'apprentice' ? formData.apprenticeshipStart || null : null,
          });
        } catch {
          toast({
            title: 'Added, but date of birth not saved',
            description: 'Add it on their record under Pay and holiday rules.',
            variant: 'destructive',
          });
        }
      }

      // Probation from the firm's HR settings (owner/admin only, as the record is).
      const probationMonths = hrSettings?.default_probation_months ?? 6;
      if (canSeeMoney && employee.id && formData.workerType !== 'subcontractor' && formData.startDate) {
        try {
          const end = format(addMonths(parseISO(formData.startDate), probationMonths), 'yyyy-MM-dd');
          await savePersonHr.mutateAsync({
            rosterId: employee.id,
            start_date: formData.startDate,
            probation_end_date: end,
            probation_review_date: format(addDays(parseISO(end), -14), 'yyyy-MM-dd'),
          });
        } catch {
          // Not fatal: the probation card on their record still offers it.
        }
      }

      toast({
        title: 'Team member added',
        description: `${formData.name} has been added to your team.${formData.createElecId ? ' Elec-ID created.' : ''}`,
      });

      resetForm();
      setOpen(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      const atCap = msg.includes('SEAT_CAP_REACHED');
      const capNum = atCap ? msg.match(/limited to (\d+)/)?.[1] : null;
      toast({
        title: atCap ? 'Seat limit reached' : 'Error',
        description: atCap
          ? `Your plan is limited to ${capNum ?? 'your current'} team members. Remove someone, or contact us to add more seats.`
          : 'Failed to add team member. Please try again.',
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
      workerType: '',
      trade: 'Electrician',
      subRate: '',
      cisStatus: 'unverified',
      payType: 'hourly',
      hourlyRate: '25',
      annualSalary: '',
      dayRate: '',
      createElecId: false,
      ecsCardType: 'Installation Electrician',
      ecsCardNumber: '',
      ecsExpiryDate: '',
      dateOfBirth: '',
      apprenticeshipStart: '',
      startDate: today(),
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
        return formData.name.trim().length > 0 && !!formData.workerType;
      case 2:
        return !!formData.role && !!formData.teamRole;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Pre-fill from `defaults` each time the sheet opens with them.
  useEffect(() => {
    if (!open || !defaults) return;
    const workerType = typeForRole(defaults.teamRole);
    setFormData((prev) => ({
      ...prev,
      name: defaults.name ?? prev.name,
      email: defaults.email ?? prev.email,
      teamRole: defaults.teamRole ?? prev.teamRole,
      workerType: workerType || prev.workerType,
      role:
        prev.role ||
        (workerType === 'apprentice' ? 'Apprentice' : workerType === 'subcontractor' ? 'Electrician' : ''),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, defaults?.name, defaults?.email, defaults?.teamRole]);

  const pickType = (t: WorkerType) =>
    setFormData((prev) => ({
      ...prev,
      workerType: t,
      teamRole:
        t === 'apprentice'
          ? 'Apprentice'
          : t === 'subcontractor'
            ? 'Subcontractor'
            : prev.teamRole === 'Apprentice' || prev.teamRole === 'Subcontractor'
              ? ''
              : prev.teamRole,
      role:
        t === 'apprentice'
          ? 'Apprentice'
          : t === 'subcontractor' && !prev.role
            ? 'Electrician'
            : prev.role === 'Apprentice'
              ? ''
              : prev.role,
    }));

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
        hideCloseButton
        className="h-[85vh] p-0 rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.08]"
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
                  <FormCard bleed eyebrow="What kind of worker?">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" data-help="team.add-type">
                      {WORKER_TYPES.map((t) => {
                        const active = formData.workerType === t.value;
                        return (
                          <button
                            key={t.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() => pickType(t.value)}
                            className={cn(
                              'min-h-[52px] rounded-xl border px-3 py-2 text-left touch-manipulation transition-colors',
                              active
                                ? 'bg-elec-yellow border-elec-yellow text-black'
                                : 'bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.06]'
                            )}
                          >
                            <span className="block text-[13.5px] font-semibold">{t.label}</span>
                            <span
                              className={cn(
                                'block text-[11.5px] leading-snug',
                                active ? 'text-black' : 'text-white'
                              )}
                            >
                              {t.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </FormCard>

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

                  <FormCard bleed eyebrow="Personal details">
                    <Field label="Full name" required>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="John Smith"
                        className={inputClass}
                        autoComplete={autoCompleteOff}
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
                        autoComplete={autoCompleteOff}
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
                        autoComplete={autoCompleteOff}
                      />
                    </Field>
                  </FormCard>

                  <div className="rounded-2xl border border-elec-yellow/25 bg-white/[0.06] px-4 py-3.5 flex gap-3">
                    <Sparkles className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                    <div className="text-[12.5px] leading-relaxed text-white">
                      <span className="font-medium text-white">How linking works:</span> they set up
                      their account from your invite email, or sign in with this email and tap Join.{' '}
                      {isComped ? (
                        <>
                          Team members are{' '}
                          <span className="font-medium text-white">free on your plan</span>.
                        </>
                      ) : (
                        <>
                          A linked team member adds{' '}
                          <span className="font-medium text-white">
                            {TEAM_ROLE_SEAT[formData.teamRole]}
                          </span>{' '}
                          to your subscription. They pay nothing themselves.
                        </>
                      )}
                      {!formData.email.trim() && (
                        <span className="block mt-1.5 text-white">
                          Add their email to send the invite. Without it they can't be linked to
                          the app.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormCard bleed eyebrow="Role">
                    <Field label="Job role" required>
                      <SelectField
        value={formData.role}
        onValueChange={(val) => setFormData((prev) => ({ ...prev, role: val }))}
        placeholder="Select role..."
        options={JOB_ROLES.map((role) => ({ value: role, label: role }))}
      />
                    </Field>
                    <Field label="Team role" required>
                      <div className="grid grid-cols-2 gap-2">
                        {(formData.workerType === 'employee'
                          ? EMPLOYEE_ROLES
                          : formData.workerType === 'apprentice'
                            ? (['Apprentice'] as TeamRole[])
                            : formData.workerType === 'subcontractor'
                              ? (['Subcontractor'] as TeamRole[])
                              : TEAM_ROLES
                        ).map((role) => {
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
                      {formData.teamRole && TEAM_ROLE_HINT[formData.teamRole] && (
                        <p className="text-[11.5px] text-white mt-2">
                          {TEAM_ROLE_HINT[formData.teamRole]}
                        </p>
                      )}
                      {formData.teamRole && (
                        <p className="text-[11.5px] font-semibold text-white mt-1">
                          {TEAM_ROLE_SEAT[formData.teamRole]}
                        </p>
                      )}
                    </Field>
                    <Field
                      label="Start date"
                      hint={
                        formData.workerType === 'subcontractor'
                          ? 'When they start working for you.'
                          : canSeeMoney
                            ? `Their contract starts on this date. Probation runs ${
                                hrSettings?.default_probation_months ?? 6
                              } months from it, as set in your HR settings.`
                            : 'Their contract starts on this date.'
                      }
                    >
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, startDate: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </Field>
                  </FormCard>

                  {formData.workerType === 'subcontractor' && (
                    <FormCard bleed eyebrow="Subcontractor">
                      <Field label="Trade">
                        <Input
                          value={formData.trade}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, trade: e.target.value }))
                          }
                          placeholder="Electrician"
                          className={inputClass}
                          autoComplete={autoCompleteOff}
                        />
                      </Field>
                      {canSeeMoney ? (
                        <>
                          <Field label="Day rate (£)" hint="Optional. You can set it later.">
                            <Input
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="5"
                              value={formData.subRate}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, subRate: e.target.value }))
                              }
                              placeholder="180"
                              className={inputClass}
                            />
                          </Field>
                          <Field label="CIS status">
                            <div className="grid grid-cols-2 gap-2">
                              {CIS_STATUS_OPTIONS.map((o) => {
                                const active = formData.cisStatus === o.value;
                                return (
                                  <button
                                    key={o.value}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() =>
                                      setFormData((prev) => ({ ...prev, cisStatus: o.value }))
                                    }
                                    className={cn(
                                      'h-11 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation',
                                      active
                                        ? 'bg-elec-yellow text-black border-elec-yellow'
                                        : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.05]'
                                    )}
                                  >
                                    {o.label}
                                  </button>
                                );
                              })}
                            </div>
                          </Field>
                          <p className="text-[11.5px] text-white">
                            Subbies get no holiday and are left out of PAYE payroll. You pay them
                            by a self-bill statement from approved days.
                          </p>
                        </>
                      ) : (
                        <p className="text-[11.5px] text-white">
                          The owner or an admin sets their day rate and CIS status.
                        </p>
                      )}
                    </FormCard>
                  )}

                  {canSeeMoney && formData.workerType !== 'subcontractor' && (
                  <FormCard bleed eyebrow="Pay">
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
                                ? 'bg-white/[0.06] text-elec-yellow border-elec-yellow'
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
                      <p className="text-[12px] text-white">{calculateEquivalent()}</p>
                    )}
                    <p className="text-[11.5px] text-white">
                      Used for job costing and timesheet labour costs. Only the owner and admins
                      see it.
                    </p>
                    <Field label="Date of birth (optional)">
                      <Input
                        type="date"
                        value={formData.dateOfBirth}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </Field>
                    {formData.workerType === 'apprentice' && (
                      <Field label="Apprenticeship start date (optional)">
                        <Input
                          type="date"
                          value={formData.apprenticeshipStart}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, apprenticeshipStart: e.target.value }))
                          }
                          className={inputClass}
                        />
                      </Field>
                    )}
                    <p className="text-[11.5px] text-white">
                      Checks their pay against the legal minimum, warns about under-18 hours and
                      shows the apprentice funding you can claim.
                    </p>
                  </FormCard>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <FormCard bleed eyebrow="Elec-ID card">
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
                          <SelectField
        value={formData.ecsCardType}
        onValueChange={(val) =>
                              setFormData((prev) => ({ ...prev, ecsCardType: val }))
                            }
        placeholder="Select type..."
        options={ECS_CARD_TYPES.map((type) => ({ value: type.value, label: type.label }))}
      />
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
                  <div className="rounded-2xl bg-white/[0.06] border border-elec-yellow/30 p-4 space-y-3">
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
                        <p className="text-[12.5px] text-white truncate">
                          {[formData.role, formData.teamRole].filter(Boolean).join(' · ') ||
                            'Role not set'}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-white/[0.1] pt-3 space-y-1.5 text-[12.5px]">
                      <div className="flex justify-between">
                        <span className="text-white">Pay</span>
                        <span className="text-white tabular-nums">
                          {formData.workerType === 'subcontractor'
                            ? formData.subRate && canSeeMoney
                              ? `£${formData.subRate}/day, self-bill`
                              : 'Self-bill statement'
                            : canSeeMoney
                              ? payLabel()
                              : 'Set by the owner'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Elec-ID</span>
                        <span className="text-white">
                          {formData.createElecId ? 'Will be created' : 'Not now'}
                        </span>
                      </div>
                      {formData.email.trim() && (
                        <div className="flex justify-between">
                          <span className="text-white">Seat when they link</span>
                          <span className="text-white tabular-nums">
                            {isComped ? 'Free on your plan' : TEAM_ROLE_SEAT[formData.teamRole]}
                          </span>
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
                  <PrimaryButton
                    data-help="team.add-next"
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    fullWidth
                  >
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
