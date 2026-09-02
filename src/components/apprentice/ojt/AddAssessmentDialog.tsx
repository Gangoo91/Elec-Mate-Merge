import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms/SelectField';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

interface AddAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddAssessment: (assessment: any) => void;
}

// Common electrical assessments — quick-fill templates.
const REAL_ASSESSMENTS = [
  { title: 'BS 7671 18th Edition Wiring Regulations', unitCode: 'C&G 2382-22', type: 'Written' },
  {
    title: 'Inspection & Testing of Electrical Installations',
    unitCode: 'C&G 2391-52',
    type: 'Practical',
  },
  { title: 'Initial Verification and Certification', unitCode: 'C&G 2391-10', type: 'Written' },
  { title: 'Safe Isolation of Electrical Circuits', unitCode: 'C&G 2391-50', type: 'Practical' },
  {
    title: 'Electrical Installation Work (Construction)',
    unitCode: 'BTEC Unit 1',
    type: 'Portfolio',
  },
  { title: 'Electrical Systems Design', unitCode: 'BTEC Unit 5', type: 'Written' },
  { title: 'Motor Control Circuits', unitCode: 'NVQ Unit 3.1', type: 'Practical' },
  { title: 'Emergency Lighting Systems', unitCode: 'C&G 2391-651', type: 'Written' },
  { title: 'Fire Alarm Systems', unitCode: 'C&G 2391-661', type: 'Written' },
  { title: 'Solar PV Installation', unitCode: 'C&G 2399', type: 'Practical' },
  { title: 'PAT Testing', unitCode: 'C&G 2377-22', type: 'Practical' },
  { title: 'Electrical Fault Diagnosis', unitCode: 'C&G 2391-53', type: 'Practical' },
  { title: 'Electrical Installation Design', unitCode: 'C&G 2396', type: 'Written' },
];

const ASSESSMENT_TYPES = [
  { value: 'Written', label: 'Written examination' },
  { value: 'Practical', label: 'Practical assessment' },
  { value: 'Portfolio', label: 'Portfolio assessment' },
  { value: 'Observation', label: 'Workplace observation' },
  { value: 'Oral', label: 'Oral assessment' },
  { value: 'Project', label: 'Project work' },
];

const CUSTOM = '__custom__';

const AddAssessmentDialog = ({ open, onOpenChange, onAddAssessment }: AddAssessmentDialogProps) => {
  const [template, setTemplate] = useState('');
  const [title, setTitle] = useState('');
  const [unitCode, setUnitCode] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const reset = () => {
    setTemplate('');
    setTitle('');
    setUnitCode('');
    setType('');
    setDescription('');
    setDueDate('');
  };

  const applyTemplate = (t: string) => {
    setTemplate(t);
    if (t === CUSTOM) return;
    const found = REAL_ASSESSMENTS.find((a) => a.title === t);
    if (found) {
      setTitle(found.title);
      setUnitCode(found.unitCode);
      setType(found.type);
    }
  };

  const valid = !!title.trim() && !!type && !!dueDate;

  const handleSubmit = () => {
    if (!valid) return;
    onAddAssessment({
      title: title.trim(),
      unitCode,
      type,
      description,
      dueDate,
    });
    reset();
  };

  const footer = (
    <div className="grid grid-cols-2 gap-2.5">
      <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
        Cancel
      </button>
      <button type="button" onClick={handleSubmit} disabled={!valid} className={buttonPrimaryCn}>
        Add assessment
      </button>
    </div>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
      eyebrow="New assessment"
      title="Track an assessment"
      description="Add an upcoming assessment so its deadline doesn't sneak up on you."
      footer={footer}
    >
      <div>
        <label className={labelCn}>Quick fill (common assessments)</label>
        <SelectField
          value={template}
          onValueChange={applyTemplate}
          placeholder="Pick a common assessment, or enter your own"
          title="Common assessments"
          options={[
            ...REAL_ASSESSMENTS.map((a) => ({
              value: a.title,
              label: `${a.title} · ${a.unitCode}`,
            })),
            { value: CUSTOM, label: 'Enter my own' },
          ]}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="assessment-title">
          Assessment title
        </label>
        <Input
          id="assessment-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. BS 7671 18th Edition"
          className={inputCn}
        />
      </div>

      <div className={grid2Cn}>
        <div>
          <label className={labelCn} htmlFor="assessment-code">
            Unit / course code
          </label>
          <Input
            id="assessment-code"
            value={unitCode}
            onChange={(e) => setUnitCode(e.target.value)}
            placeholder="e.g. C&G 2382-22"
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn}>Type</label>
          <SelectField
            value={type}
            onValueChange={setType}
            placeholder="Type"
            title="Assessment type"
            options={ASSESSMENT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
          />
        </div>
      </div>

      <div>
        <label className={labelCn} htmlFor="assessment-description">
          Description (optional)
        </label>
        <textarea
          id="assessment-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What this assessment covers."
          rows={3}
          className={cn(textareaCn, 'w-full resize-none')}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="assessment-due">
          Due date
        </label>
        <Input
          id="assessment-due"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={inputCn}
        />
      </div>
    </FormSheet>
  );
};

export default AddAssessmentDialog;
