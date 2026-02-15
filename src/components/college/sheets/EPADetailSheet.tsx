import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeEPA, useUpdateEPA, useUpdateEPAStatus } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import type { EPAStatus } from '@/services/college';
import {
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  FileText,
  Award,
  Loader2,
  Save,
  User,
} from 'lucide-react';

interface EPADetailSheetProps {
  epaId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EPA_STEPS: { status: EPAStatus; label: string }[] = [
  { status: 'Not Started', label: 'Not Started' },
  { status: 'In Progress', label: 'In Progress' },
  { status: 'Pre-Gateway', label: 'Pre-Gateway' },
  { status: 'Gateway Ready', label: 'Gateway Ready' },
  { status: 'Complete', label: 'Complete' },
];

const STATUS_ORDER: Record<EPAStatus, number> = {
  'Not Started': 0,
  'In Progress': 1,
  'Pre-Gateway': 2,
  'Gateway Ready': 3,
  Complete: 4,
};

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function getEPAStatusBadgeColour(status: EPAStatus | null): string {
  switch (status) {
    case 'Not Started':
      return 'bg-muted text-white';
    case 'In Progress':
      return 'bg-info/10 text-info border-info/20';
    case 'Pre-Gateway':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'Gateway Ready':
      return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20';
    case 'Complete':
      return 'bg-success/10 text-success border-success/20';
    default:
      return 'bg-muted text-white';
  }
}

export function EPADetailSheet({ epaId, open, onOpenChange }: EPADetailSheetProps) {
  const { data: epa, isLoading } = useCollegeEPA(epaId!);
  const { data: students } = useCollegeStudents();
  const updateEPA = useUpdateEPA();
  const updateEPAStatus = useUpdateEPAStatus();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();

  const [activeTab, setActiveTab] = useState('timeline');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Details tab state
  const [editStatus, setEditStatus] = useState<EPAStatus | null>(null);
  const [editGatewayDate, setEditGatewayDate] = useState('');
  const [editEpaDate, setEditEpaDate] = useState('');

  // Notes tab state
  const [notesText, setNotesText] = useState('');
  const [notesInitialised, setNotesInitialised] = useState(false);

  const studentName = students?.find((s) => s.id === epa?.student_id)?.name ?? 'Unknown Student';

  // Initialise editable fields when EPA data loads
  if (epa && !notesInitialised) {
    setNotesText(epa.notes ?? '');
    setEditStatus(epa.status ?? 'Not Started');
    setEditGatewayDate(epa.gateway_date ?? '');
    setEditEpaDate(epa.epa_date ?? '');
    setNotesInitialised(true);
  }

  // Reset state when sheet closes
  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        setNotesInitialised(false);
        setActiveTab('timeline');
        setShowSuccess(false);
      }
      onOpenChange(value);
    },
    [onOpenChange]
  );

  const handleStatusUpdate = async (newStatus: EPAStatus) => {
    if (!epa) return;
    setIsSaving(true);
    try {
      await updateEPAStatus.mutateAsync({
        id: epa.id,
        status: newStatus,
        updatedBy: epa.updated_by ?? 'staff',
      });
      setEditStatus(newStatus);
      triggerSuccess();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
      toast({ title: 'Status updated', description: `EPA status changed to ${newStatus}` });
    } catch {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDetailsSave = async () => {
    if (!epa) return;
    setIsSaving(true);
    try {
      await updateEPA.mutateAsync({
        id: epa.id,
        updates: {
          gateway_date: editGatewayDate || null,
          epa_date: editEpaDate || null,
        },
      });
      triggerSuccess();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
      toast({ title: 'Details saved', description: 'EPA details have been updated' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save details', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotesSave = async () => {
    if (!epa) return;
    setIsSaving(true);
    try {
      await updateEPA.mutateAsync({
        id: epa.id,
        updates: { notes: notesText },
      });
      triggerSuccess();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
      toast({ title: 'Notes saved', description: 'EPA notes have been updated' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save notes', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const currentStatusIndex = STATUS_ORDER[epa?.status ?? 'Not Started'];

  if (!epaId) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SuccessCheckmark show={showSuccess} />

          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-elec-yellow/10 flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-elec-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-xl text-left">{studentName}</SheetTitle>
                  <p className="text-sm text-white mt-0.5">End Point Assessment</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={getEPAStatusBadgeColour(epa?.status ?? null)}
                    >
                      {epa?.status ?? 'Not Started'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </SheetHeader>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full justify-start gap-0 h-auto p-1 bg-muted/50 rounded-none border-b border-border flex-shrink-0">
              <TabsTrigger
                value="timeline"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Timeline
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Notes
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {/* Timeline Tab */}
                {activeTab === 'timeline' && (
                  <motion.div
                    key="timeline"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-2"
                  >
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                      EPA Journey
                    </h4>

                    <div className="relative pl-8">
                      {/* Vertical line */}
                      <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-white/10" />

                      {EPA_STEPS.map((step, index) => {
                        const isCompleted = index < currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;
                        const isFuture = index > currentStatusIndex;

                        let dateLabel: string | null = null;
                        if (step.status === 'Not Started' && epa?.created_at) {
                          dateLabel = formatUKDateShort(epa.created_at);
                        }
                        if (step.status === 'Gateway Ready' && epa?.gateway_date) {
                          dateLabel = formatUKDateShort(epa.gateway_date);
                        }
                        if (step.status === 'Complete') {
                          if (epa?.epa_date) {
                            dateLabel = formatUKDateShort(epa.epa_date);
                          }
                        }

                        return (
                          <div
                            key={step.status}
                            className="relative flex items-start gap-4 pb-6 last:pb-0"
                          >
                            {/* Step indicator */}
                            <div
                              className={cn(
                                'absolute left-[-17px] z-10 flex items-center justify-center rounded-full',
                                isCompleted && 'h-7 w-7 bg-success',
                                isCurrent && 'h-7 w-7 bg-elec-yellow ring-4 ring-elec-yellow/20',
                                isFuture && 'h-7 w-7 bg-white/10'
                              )}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              ) : isCurrent ? (
                                <Clock className="h-4 w-4 text-black" />
                              ) : (
                                <Circle className="h-4 w-4 text-white" />
                              )}
                            </div>

                            {/* Step content */}
                            <div
                              className={cn(
                                'flex-1 rounded-lg p-3 border',
                                isCompleted && 'bg-success/5 border-success/20',
                                isCurrent && 'bg-elec-yellow/5 border-elec-yellow/20',
                                isFuture && 'bg-white/5 border-white/10'
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <p
                                  className={cn(
                                    'text-sm font-medium',
                                    isCompleted && 'text-success',
                                    isCurrent && 'text-elec-yellow',
                                    isFuture && 'text-white'
                                  )}
                                >
                                  {step.label}
                                </p>
                                {dateLabel && (
                                  <span className="text-xs text-white">{dateLabel}</span>
                                )}
                              </div>
                              {isCurrent && (
                                <p className="text-xs text-white mt-1">Current stage</p>
                              )}
                              {step.status === 'Complete' && epa?.result && isCompleted && (
                                <Badge
                                  variant="outline"
                                  className="mt-2 bg-success/10 text-success border-success/20"
                                >
                                  Result: {epa.result}
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Details Tab */}
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {/* Status */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Status
                        </h4>
                        <Select
                          value={editStatus ?? 'Not Started'}
                          onValueChange={(val) => handleStatusUpdate(val as EPAStatus)}
                          disabled={isSaving}
                        >
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="Not Started" className="h-11 touch-manipulation">
                              Not Started
                            </SelectItem>
                            <SelectItem value="In Progress" className="h-11 touch-manipulation">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Pre-Gateway" className="h-11 touch-manipulation">
                              Pre-Gateway
                            </SelectItem>
                            <SelectItem value="Gateway Ready" className="h-11 touch-manipulation">
                              Gateway Ready
                            </SelectItem>
                            <SelectItem value="Complete" className="h-11 touch-manipulation">
                              Complete
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>

                    {/* Dates */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-4">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Key Dates
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-white mb-1 block">Gateway Date</Label>
                            <Input
                              type="date"
                              value={editGatewayDate}
                              onChange={(e) => setEditGatewayDate(e.target.value)}
                              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-white mb-1 block">EPA Date</Label>
                            <Input
                              type="date"
                              value={editEpaDate}
                              onChange={(e) => setEditEpaDate(e.target.value)}
                              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                            />
                          </div>
                        </div>
                        <Button
                          className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/80 gap-2"
                          onClick={handleDetailsSave}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          Save Dates
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Result */}
                    {epa?.status === 'Complete' && epa?.result && (
                      <Card className="border-white/10">
                        <CardContent className="p-4 space-y-3">
                          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-success" />
                            Result
                          </h4>
                          <Badge
                            variant="outline"
                            className="bg-success/10 text-success border-success/20 text-sm"
                          >
                            {epa.result}
                          </Badge>
                        </CardContent>
                      </Card>
                    )}

                    {/* Meta Info */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Record Info
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-white text-xs">Updated By</p>
                            <p className="text-white font-medium flex items-center gap-1">
                              <User className="h-3.5 w-3.5" />
                              {epa?.updated_by ?? '-'}
                            </p>
                          </div>
                          <div>
                            <p className="text-white text-xs">Last Updated</p>
                            <p className="text-white font-medium">
                              {formatUKDateShort(epa?.updated_at)}
                            </p>
                          </div>
                          <div>
                            <p className="text-white text-xs">Created</p>
                            <p className="text-white font-medium">
                              {formatUKDateShort(epa?.created_at)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <FileText className="h-4 w-4 text-elec-yellow" />
                          EPA Notes
                        </h4>
                        {epa?.notes && (
                          <div className="rounded-lg bg-elec-gray p-3 border border-white/10">
                            <p className="text-sm text-white whitespace-pre-wrap">{epa.notes}</p>
                            <p className="text-xs text-white mt-2">
                              Last updated: {formatUKDateShort(epa.updated_at)}
                            </p>
                          </div>
                        )}
                        <Label className="text-xs text-white block">
                          {epa?.notes ? 'Update Notes' : 'Add Notes'}
                        </Label>
                        <Textarea
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder="Enter EPA notes, observations, or follow-up actions..."
                          className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                        />
                        <Button
                          className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/80 gap-2"
                          onClick={handleNotesSave}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          Save Notes
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              className="flex-1 h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/80 gap-2"
              onClick={() => {
                if (epa?.status) {
                  const nextIndex = STATUS_ORDER[epa.status] + 1;
                  const nextStep = EPA_STEPS[nextIndex];
                  if (nextStep) {
                    handleStatusUpdate(nextStep.status);
                  }
                }
              }}
              disabled={isSaving || !epa || epa.status === 'Complete'}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {epa?.status === 'Complete'
                ? 'EPA Complete'
                : `Advance to ${EPA_STEPS[(STATUS_ORDER[epa?.status ?? 'Not Started'] ?? 0) + 1]?.label ?? 'Next'}`}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
