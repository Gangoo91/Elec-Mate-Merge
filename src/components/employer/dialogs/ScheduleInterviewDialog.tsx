import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Video, Phone, Building, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

interface ScheduleInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  onSchedule: (details: {
    date: string;
    time: string;
    type: 'In-person' | 'Phone' | 'Video';
    location?: string;
  }) => void;
}

export function ScheduleInterviewDialog({
  open,
  onOpenChange,
  candidateName,
  onSchedule,
}: ScheduleInterviewDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [interviewType, setInterviewType] = useState<'In-person' | 'Phone' | 'Video'>('In-person');
  const [location, setLocation] = useState('');

  const timeSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time) {
      toast({
        title: 'Missing Information',
        description: 'Please select a date and time for the interview.',
        variant: 'destructive',
      });
      return;
    }

    if (interviewType === 'In-person' && !location) {
      toast({
        title: 'Missing Location',
        description: 'Please enter the interview location.',
        variant: 'destructive',
      });
      return;
    }

    onSchedule({
      date: format(date, 'yyyy-MM-dd'),
      time,
      type: interviewType,
      location: interviewType === 'In-person' ? location : undefined,
    });

    toast({
      title: 'Interview Scheduled',
      description: `Interview with ${candidateName} scheduled for ${format(date, 'PPP')} at ${time}.`,
    });

    setDate(undefined);
    setTime('');
    setInterviewType('In-person');
    setLocation('');
    onOpenChange(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="h-4 w-4" />;
      case 'Phone':
        return <Phone className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="text-white">Schedule interview</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3">
            <p className="text-[11px] text-white uppercase tracking-[0.14em]">
              Scheduling interview with
            </p>
            <p className="mt-1 text-[15px] font-semibold text-white">{candidateName}</p>
          </div>

          <FormCard eyebrow="When">
            <div className="space-y-1.5">
              <label className={fieldLabelClass}>Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      'w-full h-11 px-4 inline-flex items-center bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-[13px] touch-manipulation',
                      date ? 'text-white' : 'text-white'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                    {date ? format(date, 'PPP') : 'Select date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-[hsl(0_0%_10%)] border-white/[0.08]"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date() || date.getDay() === 0 || date.getDay() === 6
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Field label="Time">
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className={selectTriggerClass}>
                  <Clock className="mr-2 h-4 w-4 text-white" />
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          <FormCard eyebrow="Format">
            <label className={fieldLabelClass}>Interview type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['In-person', 'Phone', 'Video'] as const).map((type) => {
                const selected = interviewType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInterviewType(type)}
                    className={cn(
                      'flex flex-col items-center gap-1 h-auto py-3 rounded-xl border text-[12px] font-medium transition-colors touch-manipulation',
                      selected
                        ? 'bg-elec-yellow/10 border-elec-yellow text-elec-yellow'
                        : 'bg-[hsl(0_0%_9%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_11%)]'
                    )}
                  >
                    {getTypeIcon(type)}
                    <span>{type}</span>
                  </button>
                );
              })}
            </div>

            {interviewType === 'In-person' && (
              <Field label="Location">
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Head Office, Manchester"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </Field>
            )}
            {interviewType === 'Video' && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-[12px] text-blue-300">
                A video call link will be sent to the candidate.
              </div>
            )}
            {interviewType === 'Phone' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[12px] text-emerald-300">
                You will call the candidate at their registered number.
              </div>
            )}
          </FormCard>

          {date && time && (
            <FormCard eyebrow="Summary">
              <p className="text-[12.5px] text-white">
                {format(date, 'EEEE, d MMMM yyyy')} at {time}
              </p>
              <p className="text-[12.5px] text-white flex items-center gap-1.5">
                {getTypeIcon(interviewType)}
                {interviewType}
                {interviewType === 'In-person' && location && ` · ${location}`}
              </p>
            </FormCard>
          )}

          <div className="flex gap-2 pt-1">
            <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" fullWidth>
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              Schedule
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
