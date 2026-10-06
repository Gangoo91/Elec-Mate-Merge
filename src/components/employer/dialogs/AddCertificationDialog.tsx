import { useState, useEffect } from 'react';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEmployees } from '@/hooks/useEmployees';
import { useAddTeamCredential } from '@/hooks/useCredentialStore';
import {
  VERIFICATION_LEVELS,
  verificationLabel,
  type VerificationLevel,
} from '@/services/credentialsService';
import { toast } from '@/hooks/use-toast';
import { Award, Plus } from 'lucide-react';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';
import { SelectField } from '@/components/forms';

const CERT_TYPES = [
  '18th Edition Wiring Regulations',
  'ECS Gold Card',
  'ECS Apprentice Card',
  'ECS Supervisor Card',
  'Part P Certification',
  'IPAF Licence',
  'First Aid at Work',
  'Asbestos Awareness',
  'PASMA',
  'SMSTS',
  'SSSTS',
  'CSCS Card',
  'Other',
];

const ISSUERS = [
  'City & Guilds',
  'JIB',
  'NICEIC',
  'IPAF',
  'St John Ambulance',
  'UKATA',
  'CITB',
  'PASMA',
  'Other',
];

interface AddCertificationDialogProps {
  trigger?: React.ReactNode;
  preselectedEmployeeId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddCertificationDialog({
  trigger,
  preselectedEmployeeId,
  open: controlledOpen,
  onOpenChange,
}: AddCertificationDialogProps) {
  const { data: employees = [] } = useEmployees();
  const addCredential = useAddTeamCredential();
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [formData, setFormData] = useState({
    employeeId: preselectedEmployeeId || '',
    name: '',
    issuer: '',
    certNumber: '',
    achievedDate: '',
    expiryDate: '',
    otherName: '',
    level: 'self_declared' as VerificationLevel,
    method: '',
  });

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'add-certification',
      formName: 'Add Certification',
      fields: [
        { name: 'employee', label: 'Employee', type: 'text', required: true },
        { name: 'name', label: 'Certification Type', type: 'text', required: true },
        { name: 'issuer', label: 'Issuing Body', type: 'text', required: true },
        { name: 'certNumber', label: 'Certificate Number', type: 'text' },
        { name: 'expiryDate', label: 'Expiry Date', type: 'text' },
      ],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'employee': {
            const emp = employees.find((e) =>
              e.name.toLowerCase().includes(strValue.toLowerCase())
            );
            if (emp) setFormData((prev) => ({ ...prev, employeeId: emp.id }));
            break;
          }
          case 'name':
            setFormData((prev) => ({ ...prev, name: strValue }));
            break;
          case 'issuer':
            setFormData((prev) => ({ ...prev, issuer: strValue }));
            break;
          case 'certNumber':
            setFormData((prev) => ({ ...prev, certNumber: strValue }));
            break;
          case 'expiryDate':
            setFormData((prev) => ({ ...prev, expiryDate: strValue }));
            break;
        }
      },
      onSubmit: () => {
        const form = document.getElementById('certification-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });

    return () => voiceContext.unregisterForm('add-certification');
  }, [open, voiceContext, employees]);

  // ELE-1950: written to the person's own Elec-ID (the single credentials
  // store) via add_team_credential — never employer_certifications.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name === 'Other' ? formData.otherName.trim() : formData.name;
    if (!formData.employeeId || !name) {
      toast({
        title: 'Missing fields',
        description: 'Choose who it is for and what the qualification is.',
        variant: 'destructive',
      });
      return;
    }
    if (formData.level !== 'self_declared' && !formData.method.trim()) {
      toast({
        title: 'Say how you checked it',
        description: 'For example "Original certificate seen" or "Checked on the JIB card checker".',
        variant: 'destructive',
      });
      return;
    }

    const employee = employees.find((e) => e.id === formData.employeeId);
    if (!employee) return;

    try {
      await addCredential.mutateAsync({
        rosterId: formData.employeeId,
        input: {
          qualification_name: name,
          category: /\b(ecs|cscs)\b|card/i.test(name) ? 'cards' : 'certification',
          awarding_body: formData.issuer || null,
          certificate_number: formData.certNumber || null,
          date_achieved: formData.achievedDate || null,
          expiry_date: formData.expiryDate || null,
          verification_level: formData.level,
          verification_method: formData.level === 'self_declared' ? null : formData.method.trim(),
        },
      });
    } catch (error) {
      toast({
        title: 'Not saved',
        description: error instanceof Error ? error.message : 'Could not save. Try again.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Added to their Elec-ID',
      description: `${name} has been added for ${employee.name}.`,
    });

    setFormData({
      employeeId: preselectedEmployeeId || '',
      name: '',
      issuer: '',
      certNumber: '',
      achievedDate: '',
      expiryDate: '',
      otherName: '',
      level: 'self_declared',
      method: '',
    });
    setOpen(false);
  };

  return (
    <ResponsiveFormModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        trigger !== null
          ? trigger || (
              <Button variant="outline" size="sm" className="touch-feedback">
                <Award className="h-4 w-4 mr-2" />
                Add qualification
              </Button>
            )
          : undefined
      }
    >
      <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="text-white">
            <Award className="h-5 w-5 text-elec-yellow" />
            Add qualification
          </ResponsiveFormModalTitle>
        </ResponsiveFormModalHeader>
        <ResponsiveFormModalBody className="pb-6">
          <form id="certification-form" onSubmit={handleSubmit} className="space-y-4">
          <FormCard bleed eyebrow="Qualification details">
            <Field label="Employee" required>
              <Select
                value={formData.employeeId}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, employeeId: val }))}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select employee..." />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {employees
                    .filter((e) => e.status !== 'Archived')
                    .map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Qualification or card" required>
              <SelectField
        value={formData.name}
        onValueChange={(val) => setFormData((prev) => ({ ...prev, name: val }))}
        placeholder="Select qualification..."
        options={CERT_TYPES.map((cert) => ({ value: cert, label: cert }))}
      />
            </Field>

            {formData.name === 'Other' && (
              <Field label="Name" required>
                <Input
                  value={formData.otherName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, otherName: e.target.value }))}
                  placeholder="e.g. 2391-52 Inspection and Testing"
                  className={inputClass}
                />
              </Field>
            )}

            <FormGrid cols={2}>
              <Field label="Issuing body">
                <SelectField
        value={formData.issuer}
        onValueChange={(val) => setFormData((prev) => ({ ...prev, issuer: val }))}
        placeholder="Select issuer..."
        options={ISSUERS.map((issuer) => ({ value: issuer, label: issuer }))}
      />
              </Field>
              <Field label="Certificate number">
                <Input
                  id="certNumber"
                  value={formData.certNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, certNumber: e.target.value }))}
                  placeholder="e.g. CG-18ED-2024-001"
                  className={inputClass}
                />
              </Field>
            </FormGrid>

            <FormGrid cols={2}>
              <Field label="Achieved">
                <Input
                  type="date"
                  value={formData.achievedDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, achievedDate: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Expiry date" hint="Leave blank if it does not expire.">
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard bleed eyebrow="How has it been checked?">
            <div className="grid grid-cols-1 gap-2">
              {VERIFICATION_LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, level: l }))}
                  aria-pressed={formData.level === l}
                  className={`h-11 rounded-full border px-4 text-[13px] text-left touch-manipulation ${
                    formData.level === l
                      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                  }`}
                >
                  {verificationLabel(l)}
                </button>
              ))}
            </div>
            {formData.level !== 'self_declared' && (
              <Field label="How you checked it" required>
                <Input
                  value={formData.method}
                  onChange={(e) => setFormData((prev) => ({ ...prev, method: e.target.value }))}
                  placeholder={
                    formData.level === 'verified_at_source'
                      ? 'e.g. Checked on the JIB/ECS card checker'
                      : 'e.g. Original certificate seen'
                  }
                  className={inputClass}
                />
              </Field>
            )}
            <p className="text-[12px] text-white leading-snug">
              It is saved on their Elec-ID with your name and the date. Only say it was checked if
              you checked it.
            </p>
          </FormCard>

          <div className="flex gap-2 pt-2">
            <SecondaryButton onClick={() => setOpen(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" fullWidth disabled={addCredential.isPending}>
              {addCredential.isPending ? 'Saving…' : 'Add qualification'}
            </PrimaryButton>
          </div>
          </form>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
