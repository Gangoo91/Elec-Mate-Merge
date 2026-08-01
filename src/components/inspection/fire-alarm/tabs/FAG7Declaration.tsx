/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification — Tab 4: Declaration & Sign-off
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import SignatureInput from '@/components/signature/SignatureInput';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG7Declaration({ formData, onUpdate }: Props) {
  const { loadInstallerDetails, hasDefaultProfile } = useFireAlarmSmartForm();

  const handleUseMyDetails = () => {
    const details = loadInstallerDetails();
    if (!details) {
      toast('No saved profile found');
      return;
    }
    if (details.name) onUpdate('modifierName', details.name);
    if (details.company) onUpdate('modifierCompany', details.company);
    if (details.qualifications) onUpdate('modifierQualifications', details.qualifications);
    if (details.signature && !formData.modifierSignature)
      onUpdate('modifierSignature', details.signature);
    if (!formData.modifierDate && details.date) onUpdate('modifierDate', details.date);
    toast.success('Your saved details have been applied');
  };

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Modifier declaration */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Modifier declaration" />
        {hasDefaultProfile && (
          <button
            type="button"
            onClick={handleUseMyDetails}
            className="w-full h-11 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-transform"
          >
            Use my saved details
          </button>
        )}
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-[12px] text-white/85 leading-relaxed">
            I hereby certify that the modification to the fire detection and fire alarm system
            described in this certificate has been carried out in accordance with BS 5839-1:2025.
            The modified sections have been tested and the entire system remains compliant and
            functional.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Name" required>
            <Input
              value={formData.modifierName || ''}
              onChange={(e) => onUpdate('modifierName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Company">
            <Input
              value={formData.modifierCompany || ''}
              onChange={(e) => onUpdate('modifierCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Qualifications">
          <Input
            value={formData.modifierQualifications || ''}
            onChange={(e) => onUpdate('modifierQualifications', e.target.value)}
            className={inputCn}
            placeholder="e.g. FIA certified, BAFE SP203-1"
          />
        </Field>
        <SignatureInput
          label="Modifier Signature *"
          value={formData.modifierSignature || ''}
          onChange={(sig) => onUpdate('modifierSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.modifierDate || ''}
            onChange={(e) => onUpdate('modifierDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Responsible person notification */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Responsible person notification" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Name">
            <Input
              value={formData.responsiblePersonName || ''}
              onChange={(e) => onUpdate('responsiblePersonName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Position">
            <Input
              value={formData.responsiblePersonPosition || ''}
              onChange={(e) => onUpdate('responsiblePersonPosition', e.target.value)}
              className={inputCn}
              placeholder="e.g. Building Manager"
            />
          </Field>
        </div>
        <SignatureInput
          label="Responsible Person Signature"
          value={formData.responsiblePersonSignature || ''}
          onChange={(sig) => onUpdate('responsiblePersonSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.responsiblePersonDate || ''}
            onChange={(e) => onUpdate('responsiblePersonDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Overall result */}
      <div className={cardCn}>
        <SectionHeader title="Overall result" />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'satisfactory')}
            className={cn(
              'flex-1 h-12 rounded-xl border text-sm touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'satisfactory'
                ? 'bg-green-500 border-green-500 text-black font-semibold'
                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
            )}
          >
            Satisfactory
          </button>
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'unsatisfactory')}
            className={cn(
              'flex-1 h-12 rounded-xl border text-sm touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'unsatisfactory'
                ? 'bg-red-500 border-red-500 text-white font-semibold'
                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
            )}
          >
            Unsatisfactory
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className={cardCn}>
        <SectionHeader title="Notes" />
        <Textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className={textareaCn}
          placeholder="Additional modification notes..."
        />
      </div>
    </div>
  );
}
