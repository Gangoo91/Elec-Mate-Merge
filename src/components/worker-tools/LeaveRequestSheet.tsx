/**
 * LeaveRequestSheet
 *
 * Bottom sheet for workers to request leave.
 * Calculates days automatically and submits to employer_leave_requests.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, addDays } from 'date-fns';
import {
  Palmtree,
  X,
  ChevronLeft,
  Loader2,
  Calendar,
  Clock,
  FileText,
  Thermometer,
  Wallet,
  Heart,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { LeaveType, LeaveStatus } from '@/services/types';

type LeaveStep = 'list' | 'type' | 'dates' | 'confirm';

interface LeaveTypeOption {
  value: LeaveType;
  label: string;
  icon: typeof Palmtree;
  colour: string;
  bgColour: string;
}

const LEAVE_TYPES: LeaveTypeOption[] = [
  { value: 'annual', label: 'Annual Leave', icon: Palmtree, colour: 'text-green-400', bgColour: 'bg-green-500/10' },
  { value: 'sick', label: 'Sick Leave', icon: Thermometer, colour: 'text-red-400', bgColour: 'bg-red-500/10' },
  { value: 'unpaid', label: 'Unpaid Leave', icon: Wallet, colour: 'text-gray-400', bgColour: 'bg-gray-500/10' },
  { value: 'compassionate', label: 'Compassionate', icon: Heart, colour: 'text-pink-400', bgColour: 'bg-pink-500/10' },
  { value: 'training', label: 'Training', icon: GraduationCap, colour: 'text-blue-400', bgColour: 'bg-blue-500/10' },
];

const getStatusBadge = (status: LeaveStatus) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-amber-500/20 text-amber-400 border-0">Pending</Badge>;
    case 'approved':
      return <Badge className="bg-green-500/20 text-green-400 border-0">Approved</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500/20 text-red-400 border-0">Rejected</Badge>;
    case 'cancelled':
      return <Badge className="bg-gray-500/20 text-gray-400 border-0">Cancelled</Badge>;
    default:
      return null;
  }
};

interface LeaveRequestSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveRequestSheet({ open, onOpenChange }: LeaveRequestSheetProps) {
  const {
    employee,
    employeeId,
    employeeName,
    leaveRequests,
    leaveAllowance,
    isLoadingLeave,
    submitLeaveRequest,
    calculateLeaveDays,
    getLeaveTypeName,
  } = useWorkerSelfService();

  const [step, setStep] = useState<LeaveStep>('list');
  const [selectedType, setSelectedType] = useState<LeaveType | null>(null);
  const [formData, setFormData] = useState({
    startDate: addDays(new Date(), 1).toISOString().split('T')[0],
    endDate: addDays(new Date(), 1).toISOString().split('T')[0],
    halfDay: false,
    halfDayPeriod: 'am' as 'am' | 'pm',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setStep('list');
      setSelectedType(null);
      setFormData({
        startDate: addDays(new Date(), 1).toISOString().split('T')[0],
        endDate: addDays(new Date(), 1).toISOString().split('T')[0],
        halfDay: false,
        halfDayPeriod: 'am',
        reason: '',
      });
    }, 300);
  };

  // Calculate days for the current form data
  const calculatedDays = useMemo(() => {
    if (formData.halfDay) return 0.5;
    return calculateLeaveDays(formData.startDate, formData.endDate);
  }, [formData.startDate, formData.endDate, formData.halfDay, calculateLeaveDays]);

  const handleTypeSelect = (type: LeaveType) => {
    setSelectedType(type);
    setStep('dates');
  };

  const handleSubmit = async () => {
    if (!selectedType || !employeeId || !employeeName) {
      toast.error('Please complete all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeaveRequest.mutateAsync({
        employeeId,
        employeeName,
        request: {
          type: selectedType,
          startDate: formData.startDate,
          endDate: formData.halfDay ? formData.startDate : formData.endDate,
          halfDay: formData.halfDay ? formData.halfDayPeriod : undefined,
          reason: formData.reason || undefined,
        },
      });

      toast.success('Leave request submitted');
      handleClose();
    } catch {
      toast.error('Failed to submit leave request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'list':
        return 'Leave';
      case 'type':
        return 'Leave Type';
      case 'dates':
        return 'Select Dates';
      case 'confirm':
        return 'Confirm Request';
      default:
        return 'Leave';
    }
  };

  const canGoBack = step !== 'list';

  const handleBack = () => {
    if (step === 'dates') setStep('type');
    else if (step === 'confirm') setStep('dates');
    else if (step === 'type') setStep('list');
  };

  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              {canGoBack ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="h-10 w-10 touch-manipulation"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              ) : (
                <div className="w-10" />
              )}
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                {getStepTitle()}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Request leave from work
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step: List */}
              {step === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-6"
                >
                  {/* Allowance summary */}
                  {leaveAllowance && (
                    <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-white/80">Annual Leave</p>
                        <p className="text-sm text-white/60">
                          {new Date().getFullYear()}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-2xl font-bold text-elec-yellow">
                            {leaveAllowance.remainingDays}
                          </p>
                          <p className="text-xs text-white/50">Remaining</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white/60">
                            {leaveAllowance.usedDays}
                          </p>
                          <p className="text-xs text-white/50">Used</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-amber-400">
                            {leaveAllowance.pendingDays}
                          </p>
                          <p className="text-xs text-white/50">Pending</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* New request button */}
                  <Button
                    onClick={() => setStep('type')}
                    className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
                  >
                    <Palmtree className="h-5 w-5 mr-2" />
                    Request Leave
                  </Button>

                  {/* Recent requests */}
                  {leaveRequests.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-white/60">Recent Requests</h3>
                      <div className="space-y-2">
                        {leaveRequests.slice(0, 5).map((request) => (
                          <div
                            key={request.id}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-white">
                                {getLeaveTypeName(request.type)}
                              </p>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-xs text-white/50">
                              {format(parseISO(request.startDate), 'd MMM')}
                              {request.startDate !== request.endDate && (
                                <> - {format(parseISO(request.endDate), 'd MMM yyyy')}</>
                              )}
                              {request.startDate === request.endDate && (
                                <> {format(parseISO(request.startDate), 'yyyy')}</>
                              )}
                              {' · '}{request.totalDays} day{request.totalDays !== 1 ? 's' : ''}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isLoadingLeave && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step: Type Selection */}
              {step === 'type' && (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-4"
                >
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    What type of leave are you requesting?
                  </p>
                  <div className="space-y-2">
                    {LEAVE_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.value;

                      return (
                        <button
                          key={type.value}
                          onClick={() => handleTypeSelect(type.value)}
                          className={cn(
                            'w-full flex items-center gap-4 p-4 rounded-xl border transition-all touch-manipulation',
                            isSelected
                              ? 'bg-elec-yellow/10 border-elec-yellow/50'
                              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                          )}
                        >
                          <div className={cn('p-2.5 rounded-xl', type.bgColour)}>
                            <Icon className={cn('h-5 w-5', type.colour)} />
                          </div>
                          <span className="text-sm font-medium text-white flex-1 text-left">
                            {type.label}
                          </span>
                          {isSelected && (
                            <CheckCircle className="h-5 w-5 text-elec-yellow" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step: Dates */}
              {step === 'dates' && (
                <motion.div
                  key="dates"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-5"
                >
                  {/* Half day toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div>
                      <p className="text-sm font-medium text-white">Half Day</p>
                      <p className="text-xs text-white/50">Request half a day only</p>
                    </div>
                    <Switch
                      checked={formData.halfDay}
                      onCheckedChange={(checked) => {
                        setFormData(prev => ({
                          ...prev,
                          halfDay: checked,
                          endDate: checked ? prev.startDate : prev.endDate,
                        }));
                      }}
                    />
                  </div>

                  {/* Half day period */}
                  <AnimatePresence>
                    {formData.halfDay && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setFormData(prev => ({ ...prev, halfDayPeriod: 'am' }))}
                            className={cn(
                              'p-3 rounded-xl border transition-all touch-manipulation',
                              formData.halfDayPeriod === 'am'
                                ? 'bg-elec-yellow/10 border-elec-yellow/50'
                                : 'bg-white/[0.03] border-white/10'
                            )}
                          >
                            <p className="text-sm font-medium text-white">Morning</p>
                            <p className="text-xs text-white/50">AM</p>
                          </button>
                          <button
                            onClick={() => setFormData(prev => ({ ...prev, halfDayPeriod: 'pm' }))}
                            className={cn(
                              'p-3 rounded-xl border transition-all touch-manipulation',
                              formData.halfDayPeriod === 'pm'
                                ? 'bg-elec-yellow/10 border-elec-yellow/50'
                                : 'bg-white/[0.03] border-white/10'
                            )}
                          >
                            <p className="text-sm font-medium text-white">Afternoon</p>
                            <p className="text-xs text-white/50">PM</p>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Date inputs */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formData.halfDay ? 'Date' : 'Start Date'}
                    </Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        startDate: e.target.value,
                        endDate: formData.halfDay || e.target.value > prev.endDate ? e.target.value : prev.endDate,
                      }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="h-12 touch-manipulation"
                    />
                  </div>

                  {!formData.halfDay && (
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        End Date
                      </Label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        min={formData.startDate}
                        className="h-12 touch-manipulation"
                      />
                    </div>
                  )}

                  {/* Days calculation */}
                  <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 text-center">
                    <p className="text-3xl font-bold text-elec-yellow">{calculatedDays}</p>
                    <p className="text-sm text-white/60">
                      working day{calculatedDays !== 1 ? 's' : ''} requested
                    </p>
                  </div>

                  {/* Reason */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Reason (optional)
                    </Label>
                    <Textarea
                      value={formData.reason}
                      onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Add any notes for your manager..."
                      className="touch-manipulation min-h-[80px]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {step === 'dates' && (
            <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || calculatedDays <= 0}
                className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Palmtree className="h-5 w-5 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
