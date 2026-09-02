import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormSheet } from '@/components/forms/FormSheet';
import { SelectField } from '@/components/forms/SelectField';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { TimeEntry } from '@/types/time-tracking';
import { PortfolioCategory } from '@/types/portfolio';
import { UniversalActivityData } from '@/hooks/portfolio/useUniversalPortfolio';

interface TimeEntryToPortfolioDialogProps {
  timeEntry: TimeEntry;
  categories: PortfolioCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const TimeEntryToPortfolioDialog = ({
  timeEntry,
  categories,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: TimeEntryToPortfolioDialogProps) => {
  const [formData, setFormData] = useState({
    title: timeEntry.activity,
    description: timeEntry.notes || '',
    categoryId: '',
    skills: [] as string[],
    reflection: '',
    learningOutcomes: [] as string[],
    assessmentCriteria: [] as string[],
    tags: [] as string[],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [newCriterion, setNewCriterion] = useState('');
  const [newTag, setNewTag] = useState('');

  // Generate smart suggestions based on time entry
  const generateSmartSuggestions = () => {
    const activity = timeEntry.activity.toLowerCase();
    const notes = timeEntry.notes?.toLowerCase() || '';

    // Smart title suggestion
    const smartTitle = `${timeEntry.activity} - ${new Date(timeEntry.date).toLocaleDateString()}`;

    // Smart description based on activity type
    let smartDescription = '';
    if (timeEntry.isQuiz && timeEntry.score !== undefined) {
      smartDescription = `Completed quiz with ${Math.round((timeEntry.score / (timeEntry.totalQuestions || 1)) * 100)}% score. ${timeEntry.notes || ''}`;
    } else {
      smartDescription = `Completed ${timeEntry.activity.toLowerCase()} activity lasting ${Math.floor(timeEntry.duration / 60)}h ${timeEntry.duration % 60}m. ${timeEntry.notes || ''}`;
    }

    const activityData: UniversalActivityData = {
      title: smartTitle,
      description: smartDescription,
      activityType: 'time-entry' as const,
      timeSpent: timeEntry.duration,
      date: timeEntry.date,
    };

    return activityData;
  };

  const handleSmartFill = () => {
    const suggestions = generateSmartSuggestions();
    setFormData((prev) => ({
      ...prev,
      title: suggestions.title,
      description: suggestions.description,
    }));
  };

  const addItem = (
    type: 'skills' | 'learningOutcomes' | 'assessmentCriteria' | 'tags',
    value: string,
    setter: (value: string) => void
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
      setter('');
    }
  };

  const removeItem = (
    type: 'skills' | 'learningOutcomes' | 'assessmentCriteria' | 'tags',
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  type ListKey = 'skills' | 'learningOutcomes' | 'assessmentCriteria' | 'tags';

  const listField = (
    key: ListKey,
    label: string,
    placeholder: string,
    value: string,
    setter: (v: string) => void,
    prefix = ''
  ) => (
    <div>
      <label className={labelCn} htmlFor={`tep-${key}`}>
        {label}
      </label>
      <div className="flex gap-2">
        <Input
          id={`tep-${key}`}
          value={value}
          onChange={(e) => setter(e.target.value)}
          placeholder={placeholder}
          className={cn(inputCn, 'flex-1')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem(key, value, setter);
            }
          }}
        />
        <button
          type="button"
          onClick={() => addItem(key, value, setter)}
          className={cn(buttonSecondaryCn, 'h-11 shrink-0 px-4')}
        >
          Add
        </button>
      </div>
      {formData[key].length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {formData[key].map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => removeItem(key, index)}
              aria-label={`Remove ${item}`}
              className={cn(chipBase, chipOff, 'inline-flex items-center gap-1.5 px-3.5')}
            >
              {prefix}
              {item}
              <X className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const canSubmit = !isLoading && !!formData.title.trim() && !!formData.description.trim();

  return (
    <FormSheet
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      eyebrow="Portfolio"
      title="Add to your portfolio"
      description="Turn this time entry into a full portfolio entry."
      headerTrailing={
        <button
          type="button"
          onClick={handleSmartFill}
          className="h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
        >
          Smart fill
        </button>
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(formData)}
            disabled={!canSubmit}
            className={buttonPrimaryCn}
          >
            {isLoading ? 'Adding…' : 'Add to portfolio'}
          </button>
        </div>
      }
    >
      <div>
        <label className={labelCn} htmlFor="tep-title">
          Title
        </label>
        <Input
          id="tep-title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Portfolio entry title"
          className={inputCn}
          required
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="tep-description">
          Description
        </label>
        <textarea
          id="tep-description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="What you did and what you learned"
          rows={3}
          className={cn(textareaCn, 'w-full resize-none')}
          required
        />
      </div>

      <div>
        <label className={labelCn}>Category</label>
        <SelectField
          value={formData.categoryId}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value }))}
          placeholder="Select a category"
          title="Category"
          options={categories.map((category) => ({ value: category.id, label: category.name }))}
        />
      </div>

      {listField('skills', 'Skills demonstrated', 'Add a skill', newSkill, setNewSkill)}

      <div>
        <label className={labelCn} htmlFor="tep-reflection">
          Reflection
        </label>
        <textarea
          id="tep-reflection"
          value={formData.reflection}
          onChange={(e) => setFormData((prev) => ({ ...prev, reflection: e.target.value }))}
          placeholder="What you learned and what you would do differently"
          rows={3}
          className={cn(textareaCn, 'w-full resize-none')}
        />
      </div>

      {listField(
        'learningOutcomes',
        'Learning outcomes',
        'Add a learning outcome',
        newOutcome,
        setNewOutcome
      )}
      {listField(
        'assessmentCriteria',
        'Assessment criteria met',
        'Add a criterion',
        newCriterion,
        setNewCriterion
      )}
      {listField('tags', 'Tags', 'Add a tag', newTag, setNewTag, '#')}
    </FormSheet>
  );
};

export default TimeEntryToPortfolioDialog;
