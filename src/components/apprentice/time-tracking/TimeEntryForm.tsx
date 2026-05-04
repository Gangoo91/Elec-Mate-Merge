import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Clock, FileText, Plus } from 'lucide-react';
import { MobileInputWrapper } from '@/components/ui/mobile-input-wrapper';
import { MobileSelectWrapper } from '@/components/ui/mobile-select-wrapper';

export interface TimeEntryFormProps {
  onAddEntry: (duration: number, activity: string, notes: string) => void;
  onCancel?: () => void;
}

const TimeEntryForm = ({ onAddEntry, onCancel }: TimeEntryFormProps) => {
  const [duration, setDuration] = useState<number>(60);
  const [activity, setActivity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Pre-defined activity types for easy selection
  const activityTypes = [
    'College Session',
    'Online Learning Module',
    'Skills Workshop',
    'Mentoring Session',
    'Assessment Preparation',
    'Technical Reading',
    'Safety Training',
    'Practical Exercise',
    'Research & Study',
    'Reflection & Planning',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;

    onAddEntry(duration, activity, notes);
    // Reset form fields
    setDuration(60);
    setActivity('');
    setNotes('');
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInputWrapper
            label="Duration"
            type="number"
            value={duration}
            onChange={(value) => setDuration(parseInt(value) || 0)}
            min="1"
            max="480"
            step="15"
            unit="mins"
            placeholder="60"
            icon={<Clock className="h-4 w-4" />}
          />
          <MobileSelectWrapper
            label="Activity type"
            placeholder="Select activity type"
            value={activity}
            onValueChange={setActivity}
            options={activityTypes.map((type) => ({ value: type, label: type }))}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[13px] text-white/85">Training notes (optional)</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe what you learned, activities completed, or reflection notes..."
            rows={4}
            className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 resize-none"
          />
          <p className="text-[11px] text-white/55">
            Good practice: Note key learning points, skills developed, or areas for improvement
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              type="button"
              className="w-full sm:w-auto h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!activity.trim()}
            className="w-full sm:w-auto h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log training hours
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TimeEntryForm;
