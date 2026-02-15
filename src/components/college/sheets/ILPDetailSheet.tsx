import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCollegeILP } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { getInitials, getStatusColour, formatUKDateShort } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import {
  ClipboardList,
  Target,
  CheckCircle2,
  Clock,
  Calendar,
  Heart,
  History,
  Edit,
  Search,
} from 'lucide-react';

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

const getTargetStatusColour = (status: string) => {
  switch (status) {
    case 'Achieved':
      return 'bg-success/10 text-success border-success/20';
    case 'In Progress':
      return 'bg-info/10 text-info border-info/20';
    case 'Overdue':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'Pending':
    default:
      return 'bg-muted text-white border-white/10';
  }
};

const getTargetIcon = (status: string) => {
  switch (status) {
    case 'Achieved':
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case 'In Progress':
      return <Clock className="h-4 w-4 text-info" />;
    case 'Overdue':
      return <Calendar className="h-4 w-4 text-orange-400" />;
    case 'Pending':
    default:
      return <Target className="h-4 w-4 text-white" />;
  }
};

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
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 shrink-0 ring-2 ring-offset-2 ring-offset-background ring-elec-yellow">
                  <AvatarImage src={student?.photo_url ?? undefined} />
                  <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-lg font-semibold">
                    {student ? getInitials(student.name) : '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-xl text-left flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-elec-yellow shrink-0" />
                    {student?.name ?? 'Unknown Student'}
                  </SheetTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className={getStatusColour(ilp?.status)}>
                      {ilp?.status ?? 'Unknown'}
                    </Badge>
                    {totalCount > 0 && (
                      <Badge variant="secondary" className="text-white">
                        {achievedCount}/{totalCount} Targets Achieved
                      </Badge>
                    )}
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
                value="targets"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Targets
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Support
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                History
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {/* Targets Tab */}
                {activeTab === 'targets' && (
                  <motion.div
                    key="targets"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-3"
                  >
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                        ))}
                      </div>
                    ) : targets.length > 0 ? (
                      targets.map((target, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-elec-gray border border-white/10"
                        >
                          {target.status === 'Achieved' ? (
                            <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-success" />
                          ) : (
                            getTargetIcon(target.status)
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{target.description}</p>
                            <p className="text-xs text-white mt-1">
                              Due: {formatUKDateShort(target.target_date)}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn('text-xs shrink-0', getTargetStatusColour(target.status))}
                          >
                            {target.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <Card className="border-white/10">
                        <CardContent className="p-8 text-center space-y-3">
                          <Target className="h-12 w-12 mx-auto text-white" />
                          <p className="text-white font-medium">No Targets Set</p>
                          <p className="text-sm text-white">
                            This ILP does not have any targets yet. Add targets to track learner
                            progress.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}

                {/* Support Tab */}
                {activeTab === 'support' && (
                  <motion.div
                    key="support"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {isLoading ? (
                      <div className="h-20 bg-muted animate-pulse rounded-lg" />
                    ) : ilp?.support_needs ? (
                      <Card className="border-white/10">
                        <CardContent className="p-4 space-y-3">
                          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                            <Heart className="h-4 w-4 text-elec-yellow" />
                            Support Needs
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {ilp.support_needs
                              .split(',')
                              .map((need) => need.trim())
                              .filter(Boolean)
                              .map((need, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="bg-elec-yellow/10 text-white border-elec-yellow/20 py-1.5 px-3"
                                >
                                  {need}
                                </Badge>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="border-white/10">
                        <CardContent className="p-8 text-center space-y-3">
                          <Heart className="h-12 w-12 mx-auto text-white" />
                          <p className="text-white font-medium">No Support Needs Recorded</p>
                          <p className="text-sm text-white">
                            No additional support needs have been identified for this learner.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <motion.div
                    key="history"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <Card className="border-white/10">
                        <CardContent className="p-4">
                          <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                            <History className="h-4 w-4 text-elec-yellow" />
                            ILP Timeline
                          </h4>

                          {/* Timeline */}
                          <div className="relative pl-6 space-y-6">
                            {/* Vertical line */}
                            <div className="absolute left-[9px] top-1 bottom-1 w-px bg-white/20" />

                            {/* Created */}
                            <div className="relative">
                              <div className="absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full bg-elec-yellow/20 border-2 border-elec-yellow flex items-center justify-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">ILP Created</p>
                                <p className="text-xs text-white mt-0.5">
                                  {formatUKDateShort(ilp?.created_at)}
                                </p>
                              </div>
                            </div>

                            {/* Last Reviewed */}
                            {ilp?.last_reviewed && (
                              <div className="relative">
                                <div className="absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full bg-info/20 border-2 border-info flex items-center justify-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-info" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">Last Reviewed</p>
                                  <p className="text-xs text-white mt-0.5">
                                    {formatUKDateShort(ilp.last_reviewed)}
                                  </p>
                                  {reviewer && (
                                    <p className="text-xs text-white mt-0.5">
                                      Reviewed by: {reviewer.name}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Next Review */}
                            {ilp?.review_date && (
                              <div className="relative">
                                <div className="absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">Next Review Due</p>
                                  <p className="text-xs text-white mt-0.5">
                                    {formatUKDateShort(ilp.review_date)}
                                  </p>
                                  {new Date(ilp.review_date) < new Date() && (
                                    <Badge
                                      variant="outline"
                                      className="mt-1 bg-orange-500/10 text-orange-400 border-orange-500/20 text-xs"
                                    >
                                      Overdue
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          {/* Footer Actions */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={() => onConductReview?.(ilpId)}
              disabled={isLoading || !ilp}
            >
              <Search className="h-4 w-4" />
              Conduct Review
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={() => onEditTargets?.(ilpId)}
              disabled={isLoading || !ilp}
            >
              <Edit className="h-4 w-4" />
              Edit Targets
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
