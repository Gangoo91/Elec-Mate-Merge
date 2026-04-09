import React, { useState } from 'react';
import { JobDetails } from '@/types/quote';
import { cn } from '@/lib/utils';
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
  'w-full h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white';

export const JobDetailsStep = ({ jobDetails, onUpdate }: JobDetailsStepProps) => {
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (field: keyof JobDetails, value: string) => {
    onUpdate({ ...(jobDetails || {}), [field]: value } as JobDetails);
  };

  return (
    <div className="space-y-4 text-left">
      {/* Job Title */}
      <div>
        <label className="text-white text-xs mb-1.5 block">Job Title *</label>
        <input
          value={jobDetails?.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade"
          className={inputClass}
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="text-white text-xs mb-1.5 block">Job Description *</label>
        <textarea
          value={jobDetails?.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the scope of work..."
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white resize-none"
        />
      </div>

      {/* Duration + Start Date — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-white text-xs mb-1.5 block">Estimated Duration</label>
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
              <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow text-white">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-zinc-900 border-zinc-700 text-white">
                {durationOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-white focus:bg-elec-yellow focus:text-black touch-manipulation">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div>
          <label className="text-white text-xs mb-1.5 block">Proposed Start Date</label>
          <input
            type="date"
            value={jobDetails?.workStartDate || ''}
            onChange={(e) => handleChange('workStartDate', e.target.value)}
            className={cn(inputClass, '[color-scheme:dark]')}
          />
        </div>
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
        <div className="space-y-4">
          <div>
            <label className="text-white text-xs mb-1.5 block">Work Location</label>
            <input
              value={jobDetails?.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="If different from client address"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-white text-xs mb-1.5 block">Special Requirements</label>
            <textarea
              value={jobDetails?.specialRequirements || ''}
              onChange={(e) => handleChange('specialRequirements', e.target.value)}
              placeholder="Access, parking, isolation requirements..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
