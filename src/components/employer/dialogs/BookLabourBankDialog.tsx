import { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Briefcase,
  Zap,
  AlertTriangle,
  CheckCircle,
  Award,
} from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import {
  useEmployer,
  type BookingDuration,
  type ShiftPattern,
  type UrgencyPremium,
} from '@/contexts/EmployerContext';
import { toast } from '@/hooks/use-toast';
import { useHireTracking } from '@/hooks/useHireTracking';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  Eyebrow,
} from '@/components/employer/editorial';

interface Electrician {
  id: string;
  name: string;
  ecsCardType: string;
  dayRate: number;
  hourlyRate: number;
  elecIdProfileId?: string;
}

interface BookLabourBankDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  electrician: Electrician | null;
  preAgreedRate?: number;
}

const DURATION_OPTIONS: { value: BookingDuration; label: string; days: number }[] = [
  { value: '1 day', label: '1 Day', days: 1 },
  { value: '2-3 days', label: '2-3 Days', days: 2.5 },
  { value: '1 week', label: '1 Week (5 days)', days: 5 },
  { value: '2 weeks', label: '2 Weeks (10 days)', days: 10 },
  { value: 'Ongoing', label: 'Ongoing', days: 0 },
  { value: 'Custom', label: 'Custom Dates', days: 0 },
];

const SHIFT_OPTIONS: { value: ShiftPattern; label: string; hours: string }[] = [
  { value: 'Day (7am-4pm)', label: 'Day Shift', hours: '7:00 - 16:00' },
  { value: 'Late (10am-7pm)', label: 'Late Shift', hours: '10:00 - 19:00' },
  { value: 'Night (6pm-6am)', label: 'Night Shift', hours: '18:00 - 06:00' },
  { value: 'Custom', label: 'Custom Hours', hours: 'Specify' },
];

const URGENCY_OPTIONS: { value: UrgencyPremium; label: string; multiplier: number }[] = [
  { value: 'none', label: 'None', multiplier: 1 },
  { value: '10%', label: '+10%', multiplier: 1.1 },
  { value: '20%', label: '+20%', multiplier: 1.2 },
  { value: '25%', label: '+25%', multiplier: 1.25 },
  { value: '50%', label: '+50%', multiplier: 1.5 },
];

export function BookLabourBankDialog({
  open,
  onOpenChange,
  electrician,
  preAgreedRate,
}: BookLabourBankDialogProps) {
  const { createBooking } = useEmployer();
  const { recordHire, isRecording } = useHireTracking();
  const { data: jobs = [] } = useJobs();
  const activeJobs = jobs.filter((j) => j.status === 'Active');

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState<BookingDuration>('1 day');
  const [shiftPattern, setShiftPattern] = useState<ShiftPattern>('Day (7am-4pm)');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [siteAddress, setSiteAddress] = useState('');
  const [urgencyPremium, setUrgencyPremium] = useState<UrgencyPremium>('none');
  const [urgencyEnabled, setUrgencyEnabled] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (duration === 'Custom' || duration === 'Ongoing') return;

    const durationData = DURATION_OPTIONS.find((d) => d.value === duration);
    if (durationData && durationData.days > 0) {
      const start = new Date(startDate);
      let daysToAdd = durationData.days;

      let currentDate = new Date(start);
      let addedDays = 0;
      while (addedDays < daysToAdd - 1) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          addedDays++;
        }
      }
      setEndDate(currentDate.toISOString().split('T')[0]);
    }
  }, [startDate, duration]);

  useEffect(() => {
    if (selectedJobId) {
      const job = activeJobs.find((j) => j.id === selectedJobId);
      if (job) {
        setSiteAddress(job.location);
      }
    }
  }, [selectedJobId, activeJobs]);

  const calculations = useMemo(() => {
    const baseRate = preAgreedRate || electrician?.dayRate || 0;
    const durationData = DURATION_OPTIONS.find((d) => d.value === duration);
    const estimatedDays =
      duration === 'Custom' || duration === 'Ongoing'
        ? endDate && startDate
          ? Math.ceil(
              (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
            ) + 1
          : 1
        : durationData?.days || 1;

    const urgencyData = urgencyEnabled
      ? URGENCY_OPTIONS.find((u) => u.value === urgencyPremium)
      : URGENCY_OPTIONS[0];
    const multiplier = urgencyData?.multiplier || 1;

    const adjustedDayRate = Math.round(baseRate * multiplier);
    const totalCost = adjustedDayRate * estimatedDays;
    const premiumAmount = adjustedDayRate - baseRate;

    return {
      baseRate,
      adjustedDayRate,
      estimatedDays,
      totalCost,
      premiumAmount,
      multiplier,
    };
  }, [preAgreedRate, electrician, duration, startDate, endDate, urgencyEnabled, urgencyPremium]);

  const handleConfirmBooking = async () => {
    if (!electrician) return;

    const jobId = selectedJobId && selectedJobId !== 'none' ? selectedJobId : undefined;
    const jobTitle = jobId ? activeJobs.find((j) => j.id === jobId)?.title : undefined;

    createBooking({
      electricianId: electrician.id,
      electricianName: electrician.name,
      jobId,
      jobTitle,
      startDate,
      endDate: endDate || undefined,
      duration,
      shiftPattern,
      urgencyPremium: urgencyEnabled ? urgencyPremium : 'none',
      baseRate: calculations.baseRate,
      totalCost: calculations.totalCost,
      estimatedDays: calculations.estimatedDays,
      siteAddress: siteAddress || undefined,
      notes: notes || undefined,
    });

    if (electrician.elecIdProfileId) {
      await recordHire(electrician.elecIdProfileId, jobTitle);
    }

    toast({
      title: 'Booking Request Sent',
      description: `Request sent to ${electrician.name} for ${calculations.estimatedDays} day${calculations.estimatedDays > 1 ? 's' : ''} at £${calculations.adjustedDayRate}/day.`,
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    setDuration('1 day');
    setShiftPattern('Day (7am-4pm)');
    setSelectedJobId('');
    setSiteAddress('');
    setUrgencyPremium('none');
    setUrgencyEnabled(false);
    setNotes('');
  };

  if (!electrician) return null;

  const initials = electrician.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Book Worker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Worker Info Header */}
          <FormCard eyebrow="Worker">
            <div className="flex items-center justify-between -mt-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-lg">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{electrician.name}</p>
                  <div className="flex items-center gap-2 text-[12.5px] text-white">
                    <Award className="h-3 w-3" />
                    <span>{electrician.ecsCardType}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {preAgreedRate ? (
                  <div className="bg-emerald-500/15 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    <p className="font-bold text-emerald-400">£{preAgreedRate}</p>
                    <p className="text-[10px] text-emerald-400">Pre-agreed</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-white">£{electrician.dayRate}</p>
                    <p className="text-[11px] text-white">per day</p>
                  </div>
                )}
              </div>
            </div>
          </FormCard>

          {/* Booking Details */}
          <FormCard eyebrow="Booking details">
            <div className="flex items-center gap-2 -mt-1">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-[12.5px] text-white">Dates and shift pattern</span>
            </div>
            <FormGrid cols={2}>
              <Field label="Start date">
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={inputClass}
                />
              </Field>
              <Field label="Duration">
                <Select value={duration} onValueChange={(v) => setDuration(v as BookingDuration)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {DURATION_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>

            {(duration === 'Custom' || duration === 'Ongoing') && (
              <Field label="End date">
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className={inputClass}
                />
              </Field>
            )}

            <Field label="Shift pattern">
              <Select
                value={shiftPattern}
                onValueChange={(v) => setShiftPattern(v as ShiftPattern)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {SHIFT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <span>{opt.label}</span>
                        <span className="text-white text-[11px]">({opt.hours})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          {/* Job Assignment */}
          <FormCard eyebrow="Job assignment">
            <div className="flex items-center gap-2 -mt-1">
              <Briefcase className="h-4 w-4 text-elec-yellow" />
              <span className="text-[12.5px] text-white">Optional link to an active job</span>
            </div>
            <Field label="Assign to job (optional)">
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="none">No job assigned</SelectItem>
                  {activeJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      <div className="flex flex-col">
                        <span>{job.title}</span>
                        <span className="text-white text-[11px]">{job.client}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Site address">
              <Input
                id="siteAddress"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                placeholder="Enter site address"
                className={inputClass}
              />
            </Field>
          </FormCard>

          {/* Pay Adjustments */}
          <FormCard eyebrow="Pay adjustments">
            <div className="flex items-center gap-2 -mt-1">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="text-[12.5px] text-white">Urgency premiums and cost breakdown</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <div>
                  <p className="text-[13px] font-medium text-white">Urgency Premium</p>
                  <p className="text-[11.5px] text-white">
                    Add extra for short notice bookings
                  </p>
                </div>
              </div>
              <Switch checked={urgencyEnabled} onCheckedChange={setUrgencyEnabled} />
            </div>

            {urgencyEnabled && (
              <div className="grid grid-cols-4 gap-2">
                {URGENCY_OPTIONS.filter((o) => o.value !== 'none').map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setUrgencyPremium(opt.value)}
                    className={cn(
                      'h-11 px-3 rounded-xl text-[12.5px] font-medium border transition-colors',
                      urgencyPremium === opt.value
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Cost Breakdown */}
            <div className="p-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-white">Base Rate</span>
                <span className="text-white tabular-nums">£{calculations.baseRate}/day</span>
              </div>
              {urgencyEnabled && calculations.premiumAmount > 0 && (
                <div className="flex justify-between text-[13px] text-amber-400">
                  <span>Urgency Premium ({urgencyPremium})</span>
                  <span className="tabular-nums">+£{calculations.premiumAmount}/day</span>
                </div>
              )}
              <div className="flex justify-between text-[13px]">
                <span className="text-white">Adjusted Day Rate</span>
                <span className="font-medium text-white tabular-nums">
                  £{calculations.adjustedDayRate}/day
                </span>
              </div>
              <div className="h-px bg-white/[0.06] my-2" />
              <div className="flex justify-between text-[13px]">
                <span className="text-white">Estimated Days</span>
                <span className="text-white tabular-nums">
                  {calculations.estimatedDays} {calculations.estimatedDays === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span className="text-white">Total Estimate</span>
                <span className="text-elec-yellow tabular-nums">
                  £{calculations.totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </FormCard>

          {/* Notes */}
          <Field label="Additional notes">
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="PPE requirements, parking info, site access details..."
              rows={3}
              className={textareaClass}
            />
          </Field>

          {/* Summary Card */}
          <div className="p-4 bg-elec-yellow/10 rounded-2xl border border-elec-yellow/30 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow" />
              <Eyebrow>Booking summary</Eyebrow>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div>
                <span className="text-white">Worker:</span>
                <p className="font-medium text-white">{electrician.name}</p>
              </div>
              <div>
                <span className="text-white">Shift:</span>
                <p className="font-medium text-white">
                  {SHIFT_OPTIONS.find((s) => s.value === shiftPattern)?.label}
                </p>
              </div>
              <div>
                <span className="text-white">Dates:</span>
                <p className="font-medium text-white">
                  {new Date(startDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                  {endDate &&
                    ` - ${new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                </p>
              </div>
              <div>
                <span className="text-white">Total:</span>
                <p className="font-bold text-elec-yellow tabular-nums">
                  £{calculations.totalCost.toLocaleString()}
                </p>
              </div>
            </div>
            {selectedJobId && (
              <Badge className="text-[11px] bg-white/[0.06] text-white border-white/[0.08]">
                <Briefcase className="h-3 w-3 mr-1" />
                {activeJobs.find((j) => j.id === selectedJobId)?.title}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <SecondaryButton
              onClick={() => onOpenChange(false)}
              disabled={isRecording}
              fullWidth
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleConfirmBooking}
              disabled={isRecording}
              fullWidth
            >
              <Calendar className="h-4 w-4 mr-2" />
              {isRecording ? 'Recording...' : 'Confirm Booking'}
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
