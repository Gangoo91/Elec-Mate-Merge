import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeILP } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { getInitials, formatUKDateShort } from '@/utils/collegeHelpers';
import {
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  type Tone,
} from '@/components/college/primitives';

interface ILPDetailSheetProps {
  ilpId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: 'targets' | 'support' | 'history';
  onConductReview?: (ilpId: string) => void;
  onEditTargets?: (ilpId: string) => void;
}

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const targetTone = (status: string): Tone =>
  status === 'Achieved'
    ? 'green'
    : status === 'In Progress'
      ? 'blue'
      : status === 'Overdue'
        ? 'red'
        : 'yellow';

const statusTone = (status: string | null | undefined): Tone =>
  status === 'Active'
    ? 'green'
    : status === 'Draft'
      ? 'amber'
      : status === 'Completed'
        ? 'blue'
        : 'yellow';

export function ILPDetailSheet({
  ilpId,
  open,
  onOpenChange,
  initialTab = 'targets',
  onConductReview,
  onEditTargets,
}: ILPDetailSheetProps) {
  const { data: ilp, isLoading } = useCollegeILP(ilpId!);
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const student = useMemo(() => {
    if (!ilp?.student_id) return null;
    return students.find((s) => s.id === ilp.student_id) ?? null;
  }, [ilp, students]);

  const reviewer = useMemo(() => {
    if (!ilp?.reviewed_by) return null;
    return staff.find((s) => s.id === ilp.reviewed_by) ?? null;
  }, [ilp, staff]);

  const targets = ilp?.targets ?? [];
  const achievedCount = targets.filter((t) => t.status === 'Achieved').length;
  const totalCount = targets.length;

  if (!ilpId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-5">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-white/[0.04] animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-32 bg-white/[0.04] animate-pulse rounded" />
                  <div className="h-4 w-24 bg-white/[0.04] animate-pulse rounded" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 shrink-0 ring-1 ring-white/[0.08]">
                  <AvatarImage src={student?.photo_url ?? undefined} />
                  <AvatarFallback className="bg-orange-500/10 text-orange-400 text-lg font-semibold">
                    {student ? getInitials(student.name) : '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                    Individual Learning Plan
                  </div>
                  <SheetTitle className="mt-1 text-xl text-left">
                    {student?.name ?? 'Unknown Student'}
                  </SheetTitle>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <Pill tone={statusTone(ilp?.status)}>{ilp?.status ?? 'Unknown'}</Pill>
                    {totalCount > 0 && (
                      <Pill tone="yellow">
                        {achievedCount}/{totalCount} achieved
                      </Pill>
                    )}
                  </div>
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
              {['targets', 'support', 'history'].map((tab) => (
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
                {activeTab === 'targets' && (
                  <motion.div
                    key="targets"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-20 bg-white/[0.04] animate-pulse rounded-xl" />
                        ))}
                      </div>
                    ) : targets.length === 0 ? (
                      <EmptyState
                        title="No targets set"
                        description="Add SMART targets to track this learner's progress."
                        action="Edit targets"
                        onAction={() => onEditTargets?.(ilpId)}
                      />
                    ) : (
                      <ListCard>
                        {targets.map((target, i) => (
                          <ListRow
                            key={i}
                            accent={targetTone(target.status)}
                            title={target.description}
                            subtitle={`Due ${formatUKDateShort(target.target_date)}`}
                            trailing={<Pill tone={targetTone(target.status)}>{target.status}</Pill>}
                          />
                        ))}
                      </ListCard>
                    )}
                  </motion.div>
                )}

                {activeTab === 'support' && (
                  <motion.div
                    key="support"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {isLoading ? (
                      <div className="h-20 bg-white/[0.04] animate-pulse rounded-xl" />
                    ) : ilp?.support_needs ? (
                      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                          Support Needs
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {ilp.support_needs
                            .split(',')
                            .map((need) => need.trim())
                            .filter(Boolean)
                            .map((need, i) => (
                              <Pill key={i} tone="yellow">{need}</Pill>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <EmptyState
                        title="No support needs recorded"
                        description="No additional support needs have been identified for this learner."
                      />
                    )}
                  </motion.div>
                )}

                {activeTab === 'history' && (
                  <motion.div
                    key="history"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-16 bg-white/[0.04] animate-pulse rounded-xl" />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 mb-5">
                          Timeline
                        </div>

                        <div className="relative pl-6 space-y-5">
                          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/[0.08]" />

                          <div className="relative">
                            <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-elec-yellow" />
                            <div className="text-[13px] font-medium text-white">ILP created</div>
                            <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                              {formatUKDateShort(ilp?.created_at)}
                            </div>
                          </div>

                          {ilp?.last_reviewed && (
                            <div className="relative">
                              <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-blue-400" />
                              <div className="text-[13px] font-medium text-white">
                                Last reviewed
                              </div>
                              <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                                {formatUKDateShort(ilp.last_reviewed)}
                                {reviewer && ` · ${reviewer.name}`}
                              </div>
                            </div>
                          )}

                          {ilp?.review_date && (
                            <div className="relative">
                              <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
                              <div className="text-[13px] font-medium text-white">
                                Next review due
                              </div>
                              <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                                {formatUKDateShort(ilp.review_date)}
                              </div>
                              {new Date(ilp.review_date) < new Date() && (
                                <div className="mt-1.5">
                                  <Pill tone="red">Overdue</Pill>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-5 flex-row items-center justify-end gap-4">
            <button
              onClick={() => onOpenChange(false)}
              className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
            >
              Close
            </button>
            <button
              onClick={() => onEditTargets?.(ilpId)}
              disabled={isLoading || !ilp}
              className="text-[12.5px] font-medium text-white/70 hover:text-white disabled:opacity-40 transition-colors touch-manipulation"
            >
              Edit targets
            </button>
            <button
              onClick={() => onConductReview?.(ilpId)}
              disabled={isLoading || !ilp}
              className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              Conduct review →
            </button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
