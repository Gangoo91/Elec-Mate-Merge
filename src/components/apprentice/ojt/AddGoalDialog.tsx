import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms/SelectField';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  grid2Cn,
  infoPanelCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddGoal: (goal: any) => void;
}

const CATEGORIES = [
  { value: 'training', label: 'Training & learning' },
  { value: 'portfolio', label: 'Portfolio development' },
  { value: 'assessment', label: 'Assessments & exams' },
  { value: 'skill', label: 'Skill development' },
  { value: 'certification', label: 'Certifications' },
] as const;

const PRIORITIES = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
] as const;

const UNITS = [
  'hours',
  'sessions',
  'modules',
  'items',
  'evidence',
  'assessments',
  'certificates',
  'projects',
];

const SUGGESTIONS: Record<string, { units: string[]; targets: number[]; examples: string[] }> = {
  training: {
    units: ['hours', 'sessions', 'modules'],
    targets: [20, 40, 80, 120],
    examples: [
      'Complete Health & Safety training',
      'Electrical regulations workshop',
      'First aid certification',
    ],
  },
  portfolio: {
    units: ['items', 'pages', 'evidence'],
    targets: [5, 10, 15, 20],
    examples: [
      'Document site work experience',
      'Technical drawings portfolio',
      'Compile assessment evidence',
    ],
  },
  assessment: {
    units: ['assessments', 'units', 'exams'],
    targets: [1, 3, 5, 8],
    examples: ['Pass Unit 1 assessment', 'Complete practical evaluation', 'End-point assessment'],
  },
  skill: {
    units: ['hours', 'projects', 'techniques'],
    targets: [30, 60, 100, 150],
    examples: [
      'Master cable installation',
      'Develop fault-finding skills',
      'Learn motor control systems',
    ],
  },
  certification: {
    units: ['certificates', 'qualifications', 'awards'],
    targets: [1, 2, 3, 5],
    examples: [
      'Achieve 18th Edition certificate',
      'Complete City & Guilds Level 3',
      'ECS Gold Card application',
    ],
  },
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const AddGoalDialog = ({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [unit, setUnit] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const suggestions = category ? SUGGESTIONS[category] : null;

  // Default the unit to the category's first suggested unit.
  useEffect(() => {
    if (suggestions && !unit) setUnit(suggestions.units[0]);
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setTitle('');
    setDescription('');
    setTargetValue('');
    setUnit('');
    setPriority('');
    setCategory('');
    setDeadline('');
  };

  const valid =
    !!title.trim() &&
    !!description.trim() &&
    !!targetValue &&
    Number(targetValue) > 0 &&
    !!unit &&
    !!priority &&
    !!category &&
    !!deadline;

  const handleSubmit = () => {
    if (!valid) return;
    onAddGoal({
      title: title.trim(),
      description: description.trim(),
      targetValue: parseInt(targetValue, 10),
      unit,
      priority,
      category,
      deadline,
    });
    reset();
  };

  const footer = (
    <div className="grid grid-cols-2 gap-2.5">
      <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
        Cancel
      </button>
      <button type="button" onClick={handleSubmit} disabled={!valid} className={buttonPrimaryCn}>
        Create goal
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
      eyebrow="New goal"
      title="Set a personal target"
      description="Track something measurable alongside your hours — pick a category for suggestions."
      footer={footer}
    >
      <div>
        <label className={labelCn}>Category</label>
        <SelectField
          value={category}
          onValueChange={setCategory}
          placeholder="Select a category"
          title="Category"
          options={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
        />
      </div>

      {suggestions && (
        <div className={cn(infoPanelCn, 'space-y-3')}>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
            Suggestions
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestions.examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setTitle(ex)}
                className={cn(chipBase, title === ex ? chipOn : chipOff, 'px-3.5')}
              >
                {ex}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.targets.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTargetValue(String(t))}
                className={cn(
                  chipBase,
                  targetValue === String(t) ? chipOn : chipOff,
                  'px-3.5 tabular-nums'
                )}
              >
                {t} {suggestions.units[0]}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className={labelCn} htmlFor="goal-title">
          Goal title
        </label>
        <Input
          id="goal-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Complete electrical safety training"
          className={inputCn}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="goal-description">
          Description
        </label>
        <textarea
          id="goal-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What you want to achieve and how you'll measure it."
          rows={3}
          className={cn(textareaCn, 'w-full resize-none')}
        />
      </div>

      <div className={grid2Cn}>
        <div>
          <label className={labelCn} htmlFor="goal-target">
            Target
          </label>
          <Input
            id="goal-target"
            type="number"
            min="1"
            inputMode="numeric"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            placeholder="e.g. 20"
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn}>Unit</label>
          <SelectField
            value={unit}
            onValueChange={setUnit}
            placeholder="Unit"
            title="Unit"
            options={(suggestions?.units ?? UNITS).map((u) => ({
              value: u,
              label: u.charAt(0).toUpperCase() + u.slice(1),
            }))}
          />
        </div>
      </div>

      <div>
        <label className={labelCn}>Priority</label>
        <div className="flex gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              aria-pressed={priority === p.value}
              onClick={() => setPriority(p.value)}
              className={cn(chipBase, 'flex-1 px-2', priority === p.value ? chipOn : chipOff)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCn} htmlFor="goal-deadline">
          Target deadline
        </label>
        <Input
          id="goal-deadline"
          type="date"
          min={todayIso()}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={inputCn}
        />
      </div>
    </FormSheet>
  );
};

export default AddGoalDialog;
