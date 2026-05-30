import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MethodStatementData } from '@/types/method-statement';
import {
  FormCard,
  Field,
  FormGrid,
  PrimaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
} from '@/components/college/primitives';

interface DetailsStepProps {
  data: MethodStatementData;
  onDataChange: (updates: Partial<MethodStatementData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const WORK_TYPES = [
  'Installation Work',
  'Maintenance',
  'Testing & Inspection',
  'Repair Work',
  'Emergency Response',
  'Upgrade/Modification',
  'Fault Finding',
  'Commissioning',
];

const RISK_LEVELS: { value: 'low' | 'medium' | 'high'; label: string }[] = [
  { value: 'low', label: 'Low Risk' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'high', label: 'High Risk' },
];

const DetailsStep = ({ data, onDataChange, onNext }: DetailsStepProps) => {
  const isFormValid = () =>
    !!(data.jobTitle && data.location && data.contractor && data.supervisor && data.workType);

  return (
    <div className="space-y-5">
      <FormCard eyebrow="Job information">
        <FormGrid cols={2}>
          <Field label="Job title" required>
            <input
              value={data.jobTitle}
              onChange={(e) => onDataChange({ jobTitle: e.target.value })}
              className={inputClass}
              placeholder="e.g. Consumer Unit Replacement"
            />
          </Field>
          <Field label="Site location" required>
            <input
              value={data.location}
              onChange={(e) => onDataChange({ location: e.target.value })}
              className={inputClass}
              placeholder="Full site address"
            />
          </Field>
          <Field label="Contractor company" required>
            <input
              value={data.contractor}
              onChange={(e) => onDataChange({ contractor: e.target.value })}
              className={inputClass}
              placeholder="Company name"
            />
          </Field>
          <Field label="Site supervisor" required>
            <input
              value={data.supervisor}
              onChange={(e) => onDataChange({ supervisor: e.target.value })}
              className={inputClass}
              placeholder="Supervisor name"
            />
          </Field>
          <Field label="Type of work" required>
            <input
              list="workType-suggestions"
              value={data.workType || ''}
              onChange={(e) => onDataChange({ workType: e.target.value })}
              className={inputClass}
              placeholder="Type or select work type"
            />
            <datalist id="workType-suggestions">
              {WORK_TYPES.map((type) => (
                <option key={type} value={type} />
              ))}
            </datalist>
          </Field>
          <Field label="Estimated duration">
            <input
              value={data.duration}
              onChange={(e) => onDataChange({ duration: e.target.value })}
              className={inputClass}
              placeholder="e.g. 2 days"
            />
          </Field>
          <Field label="Team size">
            <input
              value={data.teamSize}
              onChange={(e) => onDataChange({ teamSize: e.target.value })}
              className={inputClass}
              placeholder="Number of personnel"
            />
          </Field>
          <Field label="Overall risk level">
            <Select
              value={data.overallRiskLevel}
              onValueChange={(value: 'low' | 'medium' | 'high') =>
                onDataChange({ overallRiskLevel: value })
              }
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {RISK_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FormGrid>

        <Field label="Job description">
          <textarea
            value={data.description}
            onChange={(e) => onDataChange({ description: e.target.value })}
            className={textareaClass}
            rows={4}
            placeholder="Provide a detailed description of the work to be carried out"
          />
        </Field>

        <Field label="Review date">
          <input
            type="date"
            value={data.reviewDate ? data.reviewDate.slice(0, 10) : ''}
            onChange={(e) =>
              onDataChange({
                reviewDate: e.target.value ? new Date(e.target.value).toISOString() : '',
              })
            }
            className={inputClass}
          />
        </Field>
      </FormCard>

      {/* Work-type guidance */}
      {data.workType === 'Installation Work' && (
        <FormCard eyebrow="Installation work — guidance">
          <ul className="space-y-1.5 text-[12.5px] text-white/80">
            <li>• Ensure Part P notification requirements are met</li>
            <li>• Consider 18th Edition compliance requirements</li>
            <li>• Plan for installation testing and certification</li>
            <li>• Verify supply disconnection procedures</li>
          </ul>
          <p className="text-[11.5px] text-orange-400/90">
            Common hazards: electric shock, arc flash, manual handling and falls from height will be
            suggested in the hazards step.
          </p>
        </FormCard>
      )}
      {data.workType === 'Testing & Inspection' && (
        <FormCard eyebrow="Testing &amp; inspection — guidance">
          <ul className="space-y-1.5 text-[12.5px] text-white/80">
            <li>• Ensure testing equipment is calibrated</li>
            <li>• Plan for safe isolation procedures</li>
            <li>• Consider EICR reporting requirements</li>
            <li>• Verify prove dead procedures</li>
          </ul>
          <p className="text-[11.5px] text-orange-400/90">
            Common hazards: electric shock, faulty equipment and confined spaces will be suggested in
            the hazards step.
          </p>
        </FormCard>
      )}
      {data.workType === 'Maintenance' && (
        <FormCard eyebrow="Maintenance — guidance">
          <ul className="space-y-1.5 text-[12.5px] text-white/80">
            <li>• Schedule appropriate downtime</li>
            <li>• Coordinate with facility management</li>
            <li>• Plan for equipment replacement parts</li>
            <li>• Consider environmental conditions</li>
          </ul>
          <p className="text-[11.5px] text-orange-400/90">
            Common hazards: equipment failure, chemical exposure and manual handling will be
            suggested in the hazards step.
          </p>
        </FormCard>
      )}

      {!isFormValid() && (
        <p className="text-[11.5px] text-amber-400/90">
          Complete all required fields before continuing.
        </p>
      )}

      <div className="flex justify-end pt-1">
        <PrimaryButton onClick={onNext} disabled={!isFormValid()}>
          Continue to steps
        </PrimaryButton>
      </div>
    </div>
  );
};

export default DetailsStep;
