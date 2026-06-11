import React, { useState } from 'react';
import { JobDetails } from '@/types/quote';
import { cn } from '@/lib/utils';
import { format, parse, isValid } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface JobDetailsStepProps {
  jobDetails?: JobDetails;
  onUpdate: (jobDetails: JobDetails) => void;
}

const durationOptions = [
  { value: 'Half day', label: 'Half day' },
  { value: '1 day', label: '1 day' },
  { value: '2 days', label: '2 days' },
  { value: '3 days', label: '3 days' },
  { value: '1 week', label: '1 week' },
  { value: '2 weeks', label: '2 weeks' },
  { value: '3 weeks', label: '3 weeks' },
  { value: '1 month', label: '1 month' },
  { value: 'Other', label: 'Other...' },
];

const inputClass =
  'w-full h-12 px-3.5 rounded-xl text-base text-white bg-white/[0.05] border border-white/[0.10] focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/15 outline-none touch-manipulation placeholder:text-white/40 transition-colors';

const labelClass = 'text-[11px] font-medium uppercase tracking-wider text-white/65 mb-1.5 block';

export const JobDetailsStep = ({ jobDetails, onUpdate }: JobDetailsStepProps) => {
  const [showOptional, setShowOptional] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const handleChange = (field: keyof JobDetails, value: string) => {
    onUpdate({ ...(jobDetails || {}), [field]: value } as JobDetails);
  };

  // workStartDate is stored as 'yyyy-MM-dd' (native date input format)
  const startDate = jobDetails?.workStartDate
    ? parse(jobDetails.workStartDate, 'yyyy-MM-dd', new Date())
    : undefined;
  const startDateValid = startDate && isValid(startDate) ? startDate : undefined;

  return (
    <div className="space-y-5 text-left">
      {/* Title · Duration · Start date — one row on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="col-span-2">
          <label className={labelClass}>
            Job title <span className="text-elec-yellow">*</span>
          </label>
          <input
            value={jobDetails?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Estimated duration</label>
          {jobDetails?.estimatedDuration === 'Other' ? (
            <div className="flex gap-2">
              <input
                value={jobDetails?.customDuration || ''}
                onChange={(e) => handleChange('customDuration', e.target.value)}
                placeholder="Enter duration"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => handleChange('estimatedDuration', '')}
                className="text-[12px] text-elec-yellow font-medium shrink-0 touch-manipulation"
              >
                Reset
              </button>
            </div>
          ) : (
            <Select
              value={jobDetails?.estimatedDuration || ''}
              onValueChange={(value) => handleChange('estimatedDuration', value)}
            >
              <SelectTrigger className="h-12 rounded-xl touch-manipulation bg-white/[0.05] border-white/[0.10] focus:border-elec-yellow text-white data-[placeholder]:text-white/40">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-white/10 text-white">
                {durationOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-white focus:bg-elec-yellow focus:text-black touch-manipulation"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <label className={labelClass}>Proposed start date</label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  inputClass,
                  'flex items-center justify-between text-left',
                  !startDateValid && 'text-white/40'
                )}
              >
                {startDateValid ? format(startDateValid, 'EEE d MMM yyyy') : 'Pick a date'}
                <CalendarIcon className="h-4 w-4 text-white/50 flex-shrink-0 ml-2" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto p-0 z-[100] bg-elec-gray border-white/10"
            >
              <Calendar
                mode="single"
                selected={startDateValid}
                onSelect={(date) => {
                  handleChange('workStartDate', date ? format(date, 'yyyy-MM-dd') : '');
                  setDateOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Description — full width */}
      <div>
        <label className={labelClass}>
          Job description <span className="text-elec-yellow">*</span>
        </label>
        <textarea
          value={jobDetails?.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the scope of work — your client reads this on the quote"
          rows={4}
          className="w-full px-3.5 py-3 rounded-xl text-base text-white bg-white/[0.05] border border-white/[0.10] focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/15 outline-none touch-manipulation placeholder:text-white/40 resize-none transition-colors"
        />
      </div>

      {/* Optional fields toggle */}
      <button
        type="button"
        onClick={() => setShowOptional(!showOptional)}
        className="text-[12px] font-medium text-elec-yellow touch-manipulation py-1"
      >
        {showOptional ? 'Hide additional details' : 'Additional details (optional)'}
      </button>

      {showOptional && (
        <div className="grid lg:grid-cols-2 gap-4 space-y-0">
          <div>
            <label className={labelClass}>Work location</label>
            <input
              value={jobDetails?.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="If different from client address"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Special requirements</label>
            <textarea
              value={jobDetails?.specialRequirements || ''}
              onChange={(e) => handleChange('specialRequirements', e.target.value)}
              placeholder="Access, parking, isolation requirements..."
              rows={2}
              className="w-full px-3.5 py-3 rounded-xl text-base text-white bg-white/[0.05] border border-white/[0.10] focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/15 outline-none touch-manipulation placeholder:text-white/40 resize-none transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
};
