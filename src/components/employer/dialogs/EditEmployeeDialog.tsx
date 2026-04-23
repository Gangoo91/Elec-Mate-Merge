import { useState, useEffect, useRef } from 'react';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
} from '@/components/ui/responsive-form-modal';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUpdateEmployee, useDeleteEmployee } from '@/hooks/useEmployees';
import { uploadEmployeePhoto } from '@/services/photoUploadService';
import { toast } from '@/hooks/use-toast';
import { UserCog, Trash2, Camera, Loader2, CreditCard } from 'lucide-react';
import type { Employee, PayType } from '@/services/employeeService';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useElecIdProfileByEmployee } from '@/hooks/useElecId';
import {
  FormCard,
  FormGrid,
  Field,
  Pill,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

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
const STATUSES = ['Active', 'On Leave', 'Archived'];

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

  const { data: elecIdProfile } = useElecIdProfileByEmployee(employee?.id || '');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    team_role: '' as TeamRole,
    status: '',
    payType: 'hourly' as PayType,
    hourlyRate: '25',
    annualSalary: '',
    dayRate: '',
  });

  useEffect(() => {
    if (employee) {
      let hourlyRate = employee.hourly_rate?.toString() || '25';
      let annualSalary = employee.annual_salary?.toString() || '';
      let dayRate = '';

      if (employee.pay_type === 'day_rate' && employee.hourly_rate) {
        dayRate = (employee.hourly_rate * 8).toString();
      }

      setFormData({
        name: employee.name,
        email: employee.email || '',
        phone: employee.phone || '',
        role: employee.role,
        team_role: employee.team_role as TeamRole,
        status: employee.status,
        payType: employee.pay_type || 'hourly',
        hourlyRate,
        annualSalary,
        dayRate,
      });
      setPhotoUrl(employee.photo_url);
    }
  }, [employee]);

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

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !employee) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please select an image file.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please select an image under 5MB.',
        variant: 'destructive',
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
          title: 'Photo Updated',
          description: 'Profile photo has been updated.',
        });
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload photo. Please try again.',
        variant: 'destructive',
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
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

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
        title: 'Employee Updated',
        description: `${formData.name}'s profile has been updated.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update employee. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!employee) return;

    try {
      await deleteEmployee.mutateAsync(employee.id);
      toast({
        title: 'Employee Archived',
        description: `${employee.name} has been archived.`,
      });
      setShowDeleteConfirm(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to archive employee. Please try again.',
        variant: 'destructive',
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
              Edit team member
            </ResponsiveFormModalTitle>
          </ResponsiveFormModalHeader>

          <ResponsiveFormModalBody>
            <form id="edit-employee-form" onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <Avatar className="h-28 w-28 border-4 border-[hsl(0_0%_12%)] shadow-lg">
                    <AvatarImage src={photoUrl || undefined} alt={employee.name} />
                    <AvatarFallback className="bg-white/[0.06] text-white text-3xl">
                      {employee.avatar_initials}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full bg-elec-yellow text-black flex items-center justify-center shadow-md hover:bg-elec-yellow/90 transition-colors disabled:opacity-50 touch-manipulation"
                    aria-label="Upload photo"
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
                {elecIdProfile ? (
                  <Pill tone="yellow">
                    <CreditCard className="h-3 w-3 mr-1" />
                    Elec-ID: {elecIdProfile.elec_id_number}
                  </Pill>
                ) : (
                  <Pill tone="amber">No Elec-ID profile</Pill>
                )}
              </div>

              <FormCard eyebrow="Personal information">
                <Field label="Full name" required>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <FormGrid cols={2}>
                  <Field label="Email">
                    <Input
                      type="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone">
                    <Input
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="07700 900000"
                      className={inputClass}
                    />
                  </Field>
                </FormGrid>
              </FormCard>

              <FormCard eyebrow="Employment">
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
                <FormGrid cols={2}>
                  <Field label="Team role" required>
                    <Select
                      value={formData.team_role}
                      onValueChange={(val) =>
                        setFormData((prev) => ({ ...prev, team_role: val as TeamRole }))
                      }
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {TEAM_ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Status">
                    <Select
                      value={formData.status}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FormGrid>
              </FormCard>

              <FormCard eyebrow="Pay information">
                <RadioGroup
                  value={formData.payType}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, payType: val as PayType }))
                  }
                  className="grid grid-cols-3 gap-2"
                >
                  {[
                    { value: 'hourly', label: 'Hourly rate' },
                    { value: 'annual', label: 'Annual salary' },
                    { value: 'day_rate', label: 'Day rate' },
                  ].map((option) => (
                    <div key={option.value}>
                      <RadioGroupItem
                        value={option.value}
                        id={`edit-${option.value}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`edit-${option.value}`}
                        className="flex items-center justify-center rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] px-3 py-3 text-[12px] font-medium text-white hover:bg-[hsl(0_0%_11%)] peer-data-[state=checked]:border-elec-yellow peer-data-[state=checked]:bg-elec-yellow/10 peer-data-[state=checked]:text-elec-yellow cursor-pointer transition-all touch-manipulation text-center"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="space-y-1.5 animate-fade-in">
                  {formData.payType === 'hourly' && (
                    <>
                      <label className={fieldLabelClass}>Hourly rate (£)</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.50"
                        value={formData.hourlyRate}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </>
                  )}
                  {formData.payType === 'annual' && (
                    <>
                      <label className={fieldLabelClass}>Annual salary (£)</label>
                      <Input
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
                    </>
                  )}
                  {formData.payType === 'day_rate' && (
                    <>
                      <label className={fieldLabelClass}>Day rate (£)</label>
                      <Input
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
                    </>
                  )}
                  {calculateEquivalent() && (
                    <p className="text-[11px] text-white">{calculateEquivalent()}</p>
                  )}
                </div>
              </FormCard>
            </form>
          </ResponsiveFormModalBody>

          <ResponsiveFormModalFooter>
            <div className="flex gap-2 w-full">
              <DestructiveButton onClick={() => setShowDeleteConfirm(true)} className="shrink-0">
                <Trash2 className="h-4 w-4" />
              </DestructiveButton>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                type="submit"
                onClick={() => {
                  const form = document.getElementById('edit-employee-form') as HTMLFormElement | null;
                  form?.requestSubmit();
                }}
                disabled={updateEmployee.isPending}
                fullWidth
              >
                {updateEmployee.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save changes'
                )}
              </PrimaryButton>
            </div>
          </ResponsiveFormModalFooter>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Archive employee?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will archive {employee?.name}. They will no longer appear in active team lists
              but their records will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/[0.06] text-white border-white/[0.1] hover:bg-white/[0.1]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
              disabled={deleteEmployee.isPending}
            >
              {deleteEmployee.isPending ? 'Archiving...' : 'Archive'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
