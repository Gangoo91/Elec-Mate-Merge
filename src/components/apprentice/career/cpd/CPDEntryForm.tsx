import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useUnifiedCPD } from '@/hooks/cpd/useUnifiedCPD';

interface CPDEntryFormProps {
  onSuccess?: () => void;
}

const CPDEntryForm = ({ onSuccess }: CPDEntryFormProps = {}) => {
  const { addEntry, activeMembership, memberships, loading } = useUnifiedCPD();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    hours: '',
    category: '',
    type: '',
    description: '',
    learningOutcomes: '',
  });

  const categories = [
    { id: 'technical-skills', name: 'Technical skills' },
    { id: 'regulations-standards', name: 'Regulations and standards' },
    { id: 'safety-health', name: 'Safety and health' },
    { id: 'business-commercial', name: 'Business and commercial' },
    { id: 'professional-ethics', name: 'Professional ethics' },
    { id: 'environmental-sustainability', name: 'Environmental sustainability' },
    { id: 'digital-technology', name: 'Digital technology' },
    { id: 'customer-service', name: 'Customer service' },
  ];

  const activityTypes = [
    { id: 'formal-training', name: 'Formal training' },
    { id: 'work-based-learning', name: 'Work-based learning' },
    { id: 'self-directed-study', name: 'Self-directed study' },
    { id: 'professional-activities', name: 'Professional activities' },
    { id: 'conferences-seminars', name: 'Conferences and seminars' },
    { id: 'mentoring', name: 'Mentoring' },
    { id: 'assessment-preparation', name: 'Assessment preparation' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !formData.title || !formData.hours || !formData.category || !formData.type) {
      return;
    }

    setIsSubmitting(true);

    try {
      const entryData = {
        title: formData.title,
        description: formData.description,
        activity_type: formData.type,
        category: formData.category,
        hours: parseFloat(formData.hours),
        date_completed: date.toISOString().split('T')[0],
        learning_outcomes: formData.learningOutcomes ? [formData.learningOutcomes] : undefined,
      };

      const result = await addEntry(entryData);

      if (result) {
        setFormData({
          title: '',
          hours: '',
          category: '',
          type: '',
          description: '',
          learningOutcomes: '',
        });
        setDate(undefined);
        onSuccess?.();
      }
    } catch (error) {
      console.error('Error submitting CPD entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-elec-yellow rounded-full mx-auto mb-4" />
        <div className="text-[14px] text-white/85">Loading CPD system...</div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {(!activeMembership || memberships.length === 0) && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Professional body required
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            {memberships.length === 0
              ? 'Please set up your professional body membership in settings to enable CPD tracking.'
              : 'No active professional body selected. CPD entries will be saved but may not count towards compliance.'}
          </p>
        </div>
      )}

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Log CPD activity
          </span>
          {activeMembership && (
            <p className="text-[14px] text-white/85">
              Recording for{' '}
              <span className="text-white">{activeMembership.professional_body?.name}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[12px] text-white/70">
                Activity title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g. BS 7671:2018+A4:2026 update course"
                className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] text-white/70">Date completed *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full h-11 justify-start text-left font-normal touch-manipulation bg-white/[0.03] border-white/10 hover:bg-white/[0.06]',
                      !date && 'text-white/40'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-white/55" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-elec-gray border-white/10">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours" className="text-[12px] text-white/70">
                Hours *
              </Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                min="0"
                value={formData.hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                placeholder="e.g. 3.5"
                className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] text-white/70">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                required
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/10">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-[12px] text-white/70">Activity type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
                required
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/10">
                  {activityTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[12px] text-white/70">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the activity and what was covered..."
              className="touch-manipulation text-base bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 min-h-[100px]"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learningOutcomes" className="text-[12px] text-white/70">
              Learning outcomes
            </Label>
            <Textarea
              id="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={(e) => handleInputChange('learningOutcomes', e.target.value)}
              placeholder="What did you learn? How will this benefit your professional development?"
              className="touch-manipulation text-base bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 min-h-[100px]"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !date ||
              !formData.title ||
              !formData.hours ||
              !formData.category ||
              !formData.type
            }
            className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation font-medium"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save CPD entry'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CPDEntryForm;
