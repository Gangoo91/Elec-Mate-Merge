import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Field, FormGrid, inputClass } from '@/components/employer/editorial';
import { SelectField } from '@/components/forms';
import { JOB_TYPE_OPTIONS } from '@/lib/jobTypes';
import { useJobTypeHoursHistory } from '@/hooks/useJobProfit';

/**
 * ELE-1824 — job type + quoted hours on a job, with the quoting loop:
 * "Your last 5 consumer units took 11.5 hrs on average (quoted 9)".
 * Hours only — safe for office managers. The history is the firm's own
 * completed jobs of the same type with approved timesheet hours.
 */
export const JobHoursFields = forwardRef<
  HTMLInputElement,
  {
    jobType: string;
    onJobTypeChange: (v: string) => void;
    quotedHours: string;
    onQuotedHoursChange: (v: string) => void;
    /** Leave the job being edited out of its own history. */
    jobId?: string;
  }
>(function JobHoursFields({ jobType, onJobTypeChange, quotedHours, onQuotedHoursChange, jobId }, ref) {
  const { data: history } = useJobTypeHoursHistory(jobType || null, jobId);
  const fmt = (n: number) => n.toLocaleString('en-GB', { maximumFractionDigits: 1 });

  return (
    <div className="space-y-3">
      <FormGrid cols={2}>
        <Field label="Job type">
          <SelectField
            value={jobType}
            onValueChange={onJobTypeChange}
            options={JOB_TYPE_OPTIONS}
            placeholder="Choose a job type"
            title="Job type"
          />
        </Field>
        <Field label="Quoted hours">
          <Input
            ref={ref}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            placeholder="e.g. 16"
            value={quotedHours}
            onChange={(e) => onQuotedHoursChange(e.target.value)}
            className={inputClass}
          />
        </Field>
      </FormGrid>
      {jobType && history && (
        <p className="text-[12.5px] text-white leading-snug">
          {history.count > 0 && history.avgHours !== null ? (
            <>
              Your last {history.count === 1 ? 'job' : `${history.count}`} of this type{' '}
              {history.count === 1 ? 'took' : 'averaged'}{' '}
              <span className="font-semibold text-elec-yellow">{fmt(history.avgHours)} hrs</span>
              {history.avgQuotedHours !== null && (
                <> against {fmt(history.avgQuotedHours)} quoted</>
              )}
              . From approved timesheets on completed jobs.
            </>
          ) : (
            'No completed jobs of this type with approved hours yet, so there is nothing to compare against.'
          )}
        </p>
      )}
      <p className="text-[12px] text-white leading-snug">
        Quoted hours are what the price was based on. The job sheet and the crew’s job page show
        hours used against them.
      </p>
    </div>
  );
});
