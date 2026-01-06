import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  Zap,
  AlertTriangle,
  CheckCircle,
  Award
} from "lucide-react";
import { jobs } from "@/data/employerMockData";
import { useEmployer, type BookingDuration, type ShiftPattern, type UrgencyPremium } from "@/contexts/EmployerContext";
import { toast } from "@/hooks/use-toast";
import { useHireTracking } from "@/hooks/useHireTracking";

interface Electrician {
  id: string;
  name: string;
  ecsCardType: string;
  dayRate: number;
  hourlyRate: number;
  elecIdProfileId?: string; // Elec-ID profile for hire tracking
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
  preAgreedRate
}: BookLabourBankDialogProps) {
  const { createBooking } = useEmployer();
  const { recordHire, isRecording } = useHireTracking();
  const activeJobs = jobs.filter(j => j.status === 'Active');

  // Form state
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState<BookingDuration>('1 day');
  const [shiftPattern, setShiftPattern] = useState<ShiftPattern>('Day (7am-4pm)');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [siteAddress, setSiteAddress] = useState('');
  const [urgencyPremium, setUrgencyPremium] = useState<UrgencyPremium>('none');
  const [urgencyEnabled, setUrgencyEnabled] = useState(false);
  const [notes, setNotes] = useState('');

  // Calculate end date based on duration
  useEffect(() => {
    if (duration === 'Custom' || duration === 'Ongoing') return;
    
    const durationData = DURATION_OPTIONS.find(d => d.value === duration);
    if (durationData && durationData.days > 0) {
      const start = new Date(startDate);
      let daysToAdd = durationData.days;
      
      // Skip weekends
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

  // Auto-fill site address from job
  useEffect(() => {
    if (selectedJobId) {
      const job = activeJobs.find(j => j.id === selectedJobId);
      if (job) {
        setSiteAddress(job.location);
      }
    }
  }, [selectedJobId, activeJobs]);

  // Cost calculations
  const calculations = useMemo(() => {
    const baseRate = preAgreedRate || electrician?.dayRate || 0;
    const durationData = DURATION_OPTIONS.find(d => d.value === duration);
    const estimatedDays = duration === 'Custom' || duration === 'Ongoing' 
      ? (endDate && startDate ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 1)
      : durationData?.days || 1;
    
    const urgencyData = urgencyEnabled 
      ? URGENCY_OPTIONS.find(u => u.value === urgencyPremium) 
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
    const jobTitle = jobId ? activeJobs.find(j => j.id === jobId)?.title : undefined;

    // Create the local booking
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

    // Record hire to database for fee tracking (if worker has Elec-ID profile)
    if (electrician.elecIdProfileId) {
      await recordHire(electrician.elecIdProfileId, jobTitle);
    }

    toast({
      title: "Booking Request Sent",
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

  const initials = electrician.name.split(' ').map(n => n[0]).join('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Book Worker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Worker Info Header */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-lg">
                {initials}
              </div>
              <div>
                <p className="font-semibold text-foreground">{electrician.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-3 w-3" />
                  <span>{electrician.ecsCardType}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {preAgreedRate ? (
                <div className="bg-success/10 px-3 py-1.5 rounded-lg border border-success/20">
                  <p className="font-bold text-success">£{preAgreedRate}</p>
                  <p className="text-[10px] text-success">Pre-agreed</p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-foreground">£{electrician.dayRate}</p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              Booking Details
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={(v) => setDuration(v as BookingDuration)}>
                  <SelectTrigger id="duration" className="h-11">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(duration === 'Custom' || duration === 'Ongoing') && (
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="h-11"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="shift">Shift Pattern</Label>
              <Select value={shiftPattern} onValueChange={(v) => setShiftPattern(v as ShiftPattern)}>
                <SelectTrigger id="shift" className="h-11">
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  {SHIFT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <span>{opt.label}</span>
                        <span className="text-muted-foreground text-xs">({opt.hours})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Job Assignment */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-elec-yellow" />
              Job Assignment
            </h4>

            <div className="space-y-2">
              <Label htmlFor="job">Assign to Job (Optional)</Label>
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger id="job" className="h-11">
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No job assigned</SelectItem>
                  {activeJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      <div className="flex flex-col">
                        <span>{job.title}</span>
                        <span className="text-muted-foreground text-xs">{job.client}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteAddress">Site Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="siteAddress"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  placeholder="Enter site address"
                  className="pl-10 h-11"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Pay Adjustments */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Pay Adjustments
            </h4>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <div>
                  <p className="text-sm font-medium">Urgency Premium</p>
                  <p className="text-xs text-muted-foreground">Add extra for short notice bookings</p>
                </div>
              </div>
              <Switch 
                checked={urgencyEnabled} 
                onCheckedChange={setUrgencyEnabled}
              />
            </div>

            {urgencyEnabled && (
              <div className="grid grid-cols-5 gap-2">
                {URGENCY_OPTIONS.filter(o => o.value !== 'none').map((opt) => (
                  <Button
                    key={opt.value}
                    variant={urgencyPremium === opt.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUrgencyPremium(opt.value)}
                    className="h-11"
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            )}

            {/* Cost Breakdown */}
            <div className="p-4 bg-surface-elevated rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base Rate</span>
                <span>£{calculations.baseRate}/day</span>
              </div>
              {urgencyEnabled && calculations.premiumAmount > 0 && (
                <div className="flex justify-between text-sm text-warning">
                  <span>Urgency Premium ({urgencyPremium})</span>
                  <span>+£{calculations.premiumAmount}/day</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Adjusted Day Rate</span>
                <span className="font-medium">£{calculations.adjustedDayRate}/day</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Days</span>
                <span>{calculations.estimatedDays} {calculations.estimatedDays === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total Estimate</span>
                <span className="text-elec-yellow">£{calculations.totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="PPE requirements, parking info, site access details..."
              rows={3}
            />
          </div>

          {/* Summary Card */}
          <div className="p-4 bg-elec-yellow/10 rounded-xl border border-elec-yellow/20 space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-elec-yellow" />
              Booking Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Worker:</span>
                <p className="font-medium">{electrician.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Shift:</span>
                <p className="font-medium">{SHIFT_OPTIONS.find(s => s.value === shiftPattern)?.label}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Dates:</span>
                <p className="font-medium">
                  {new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  {endDate && ` - ${new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Total:</span>
                <p className="font-bold text-elec-yellow">£{calculations.totalCost.toLocaleString()}</p>
              </div>
            </div>
            {selectedJobId && (
              <Badge variant="secondary" className="text-xs">
                <Briefcase className="h-3 w-3 mr-1" />
                {activeJobs.find(j => j.id === selectedJobId)?.title}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={() => onOpenChange(false)}
              disabled={isRecording}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12"
              onClick={handleConfirmBooking}
              disabled={isRecording}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {isRecording ? "Recording..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
