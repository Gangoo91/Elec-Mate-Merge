import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Pill,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

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

const statusTone = (status: EPAStatus | null): Tone =>
  status === 'Not Started'
    ? 'yellow'
    : status === 'In Progress'
      ? 'blue'
      : status === 'Pre-Gateway'
        ? 'amber'
        : status === 'Gateway Ready'
          ? 'yellow'
          : status === 'Complete'
            ? 'green'
            : 'yellow';

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

  const [editStatus, setEditStatus] = useState<EPAStatus | null>(null);
  const [editGatewayDate, setEditGatewayDate] = useState('');
  const [editEpaDate, setEditEpaDate] = useState('');

  const [notesText, setNotesText] = useState('');
  const [notesInitialised, setNotesInitialised] = useState(false);

  const studentName = students?.find((s) => s.id === epa?.student_id)?.name ?? 'Unknown Student';

  if (epa && !notesInitialised) {
    setNotesText(epa.notes ?? '');
    setEditStatus(epa.status ?? 'Not Started');
    setEditGatewayDate(epa.gateway_date ?? '');
    setEditEpaDate(epa.epa_date ?? '');
    setNotesInitialised(true);
  }

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
      toast({ title: 'Status updated', description: `EPA status → ${newStatus}` });
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
        updates: { gateway_date: editGatewayDate || null, epa_date: editEpaDate || null },
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
      await updateEPA.mutateAsync({ id: epa.id, updates: { notes: notesText } });
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

          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-5">
            {isLoading ? (
              <LoadingState />
            ) : (
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  End Point Assessment
                </div>
                <SheetTitle className="mt-1 text-xl text-left">{studentName}</SheetTitle>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Pill tone={statusTone(epa?.status ?? null)}>
                    {epa?.status ?? 'Not Started'}
                  </Pill>
                  {epa?.result && <Pill tone="green">Result · {epa.result}</Pill>}
                </div>
              </div>
            )}
          </SheetHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full justify-start gap-0 h-auto p-0 bg-transparent rounded-none border-b border-white/[0.06] flex-shrink-0">
              {['timeline', 'details', 'notes'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 h-11 touch-manipulation text-[12.5px] font-medium text-white/60 data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none capitalize"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {activeTab === 'timeline' && (
                  <motion.div
                    key="timeline"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 mb-5">
                      EPA Journey
                    </div>

                    <div className="relative pl-6 space-y-5">
                      <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/[0.08]" />

                      {EPA_STEPS.map((step, index) => {
                        const isCompleted = index < currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;

                        let dateLabel: string | null = null;
                        if (step.status === 'Not Started' && epa?.created_at)
                          dateLabel = formatUKDateShort(epa.created_at);
                        if (step.status === 'Gateway Ready' && epa?.gateway_date)
                          dateLabel = formatUKDateShort(epa.gateway_date);
                        if (step.status === 'Complete' && epa?.epa_date)
                          dateLabel = formatUKDateShort(epa.epa_date);

                        return (
                          <div key={step.status} className="relative">
                            <div
                              className={cn(
                                'absolute -left-6 top-1 h-2.5 w-2.5 rounded-full',
                                isCompleted && 'bg-emerald-400',
                                isCurrent && 'bg-elec-yellow ring-4 ring-elec-yellow/20',
                                !isCompleted && !isCurrent && 'bg-white/20'
                              )}
                            />
                            <div className="flex items-baseline justify-between gap-3">
                              <div
                                className={cn(
                                  'text-[13px] font-medium',
                                  isCompleted && 'text-emerald-400',
                                  isCurrent && 'text-elec-yellow',
                                  !isCompleted && !isCurrent && 'text-white/75'
                                )}
                              >
                                {step.label}
                              </div>
                              {dateLabel && (
                                <span className="text-[11px] text-white/75 tabular-nums">
                                  {dateLabel}
                                </span>
                              )}
                            </div>
                            {isCurrent && (
                              <div className="mt-0.5 text-[11px] text-white/70">Current stage</div>
                            )}
                            {step.status === 'Complete' && epa?.result && isCompleted && (
                              <div className="mt-1.5">
                                <Pill tone="green">Result · {epa.result}</Pill>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-5"
                  >
                    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                        Status
                      </div>
                      <Select
                        value={editStatus ?? 'Not Started'}
                        onValueChange={(val) => handleStatusUpdate(val as EPAStatus)}
                        disabled={isSaving}
                      >
                        <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_9%)] border-white/[0.08] text-white focus:border-elec-yellow/60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                          {EPA_STEPS.map((s) => (
                            <SelectItem key={s.status} value={s.status} className="h-11 touch-manipulation">
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                        Key Dates
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-[11px] text-white/75 mb-1.5 block">
                            Gateway date
                          </Label>
                          <Input
                            type="date"
                            value={editGatewayDate}
                            onChange={(e) => setEditGatewayDate(e.target.value)}
                            className="h-11 text-[13px] touch-manipulation bg-[hsl(0_0%_9%)] border-white/[0.08] text-white tabular-nums focus:border-elec-yellow/60"
                          />
                        </div>
                        <div>
                          <Label className="text-[11px] text-white/75 mb-1.5 block">
                            EPA date
                          </Label>
                          <Input
                            type="date"
                            value={editEpaDate}
                            onChange={(e) => setEditEpaDate(e.target.value)}
                            className="h-11 text-[13px] touch-manipulation bg-[hsl(0_0%_9%)] border-white/[0.08] text-white tabular-nums focus:border-elec-yellow/60"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={handleDetailsSave}
                          disabled={isSaving}
                          className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                        >
                          {isSaving ? 'Saving…' : 'Save dates →'}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                        Record Info
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-[13px]">
                        <div>
                          <div className="text-[11px] text-white/55 uppercase tracking-[0.12em]">
                            Updated by
                          </div>
                          <div className="mt-0.5 text-white">{epa?.updated_by ?? '—'}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/55 uppercase tracking-[0.12em]">
                            Updated
                          </div>
                          <div className="mt-0.5 text-white tabular-nums">
                            {formatUKDateShort(epa?.updated_at)}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/55 uppercase tracking-[0.12em]">
                            Created
                          </div>
                          <div className="mt-0.5 text-white tabular-nums">
                            {formatUKDateShort(epa?.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                        EPA Notes
                      </div>
                      {epa?.notes && (
                        <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-4">
                          <p className="text-[13px] text-white/80 leading-relaxed whitespace-pre-wrap">
                            {epa.notes}
                          </p>
                          <p className="mt-2 text-[11px] text-white/70 tabular-nums">
                            Last updated · {formatUKDateShort(epa.updated_at)}
                          </p>
                        </div>
                      )}
                      <Label className="text-[11px] text-white/75 block">
                        {epa?.notes ? 'Update notes' : 'Add notes'}
                      </Label>
                      <Textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        placeholder="Enter EPA notes, observations or follow-up actions…"
                        className="touch-manipulation text-[13px] min-h-[140px] bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/65 focus:border-elec-yellow/60"
                      />
                      <div className="flex items-center justify-end">
                        <button
                          onClick={handleNotesSave}
                          disabled={isSaving}
                          className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                        >
                          {isSaving ? 'Saving…' : 'Save notes →'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-5">
            <button
              onClick={() => {
                if (epa?.status) {
                  const nextIndex = STATUS_ORDER[epa.status] + 1;
                  const nextStep = EPA_STEPS[nextIndex];
                  if (nextStep) handleStatusUpdate(nextStep.status);
                }
              }}
              disabled={isSaving || !epa || epa.status === 'Complete'}
              className="w-full h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSaving
                ? 'Saving…'
                : epa?.status === 'Complete'
                  ? 'EPA complete'
                  : `Advance to ${EPA_STEPS[(STATUS_ORDER[epa?.status ?? 'Not Started'] ?? 0) + 1]?.label ?? 'next'} →`}
            </button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
