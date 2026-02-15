import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCollegeGrade, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { getInitials, getStatusColour, formatUKDateShort } from '@/utils/collegeHelpers';
import {
  Loader2,
  FileText,
  MessageSquare,
  History,
  Calendar,
  Award,
  Hash,
  User,
  Clock,
  ClipboardCheck,
  BookOpen,
  Save,
  Zap,
} from 'lucide-react';

interface GradeDetailSheetProps {
  gradeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function GradeDetailSheet({ gradeId, open, onOpenChange }: GradeDetailSheetProps) {
  const { data: grade, isLoading } = useCollegeGrade(gradeId!);
  const { data: students } = useCollegeStudents();
  const { data: staff } = useCollegeStaff();
  const updateGrade = useUpdateGrade();

  const [activeTab, setActiveTab] = useState('details');
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const student = useMemo(() => {
    if (!grade?.student_id || !students) return null;
    return students.find((s) => s.id === grade.student_id) ?? null;
  }, [grade, students]);

  const assessor = useMemo(() => {
    if (!grade?.assessed_by || !staff) return null;
    return staff.find((s) => s.id === grade.assessed_by) ?? null;
  }, [grade, staff]);

  const getGradeColour = (gradeValue: string | null | undefined): string => {
    switch (gradeValue) {
      case 'Distinction':
        return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20';
      case 'Merit':
        return 'bg-info/10 text-info border-info/20';
      case 'Pass':
        return 'bg-success/10 text-success border-success/20';
      case 'Refer':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Not Yet Competent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-white';
    }
  };

  const handleStartFeedback = () => {
    setFeedbackText(grade?.feedback ?? '');
    setIsEditingFeedback(true);
  };

  const handleSaveFeedback = () => {
    if (!gradeId) return;
    updateGrade.mutate(
      { id: gradeId, updates: { feedback: feedbackText } },
      {
        onSuccess: () => {
          setIsEditingFeedback(false);
        },
      }
    );
  };

  if (!gradeId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}

          {/* Content */}
          {!isLoading && grade && (
            <>
              {/* Header */}
              <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 shrink-0 ring-2 ring-offset-2 ring-offset-background ring-info/50">
                    <AvatarFallback className="bg-info/10 text-info text-lg font-semibold">
                      {student ? getInitials(student.name) : '??'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-xl text-left">
                      {student?.name ?? 'Unknown Student'}
                    </SheetTitle>
                    <p className="text-sm text-white mt-0.5">
                      {grade.unit_name ?? 'Unassigned Unit'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className={getStatusColour(grade.status)}>
                        {grade.status ?? 'Pending'}
                      </Badge>
                      {grade.grade && (
                        <Badge variant="outline" className={getGradeColour(grade.grade)}>
                          <Award className="h-3 w-3 mr-1" />
                          {grade.grade}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <TabsList className="w-full justify-start gap-0 h-auto p-1 bg-muted/50 rounded-none border-b border-border flex-shrink-0">
                  <TabsTrigger
                    value="details"
                    className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
                  >
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="feedback"
                    className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
                  >
                    <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                    Feedback
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
                  >
                    <History className="h-3.5 w-3.5 mr-1.5" />
                    History
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <AnimatePresence mode="wait">
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
                        {/* Assessment Information */}
                        <Card className="border-white/10">
                          <CardContent className="p-4 space-y-3">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-info" />
                              Assessment Information
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-3 text-white">
                                <ClipboardCheck className="h-4 w-4 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-white">Assessment Type</p>
                                  <p className="font-medium text-white">
                                    {grade.assessment_type ?? 'Not specified'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-white">
                                <Award className="h-4 w-4 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-white">Grade</p>
                                  <p className="font-medium text-white">
                                    {grade.grade ?? 'Not yet graded'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-white">
                                <Hash className="h-4 w-4 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-white">Score</p>
                                  <p className="font-medium text-white">
                                    {grade.score != null ? `${grade.score}%` : 'No score recorded'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Assessor and Dates */}
                        <Card className="border-white/10">
                          <CardContent className="p-4 space-y-3">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-info" />
                              Assessor and Dates
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-3 text-white">
                                <User className="h-4 w-4 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-white">Assessor</p>
                                  <p className="font-medium text-white">
                                    {assessor?.name ?? 'Not assigned'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-white">
                                <Calendar className="h-4 w-4 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-white">Assessed Date</p>
                                  <p className="font-medium text-white">
                                    {formatUKDateShort(grade.assessed_at)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-white">
                                <Clock className="h-4 w-4 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-white">Created Date</p>
                                  <p className="font-medium text-white">
                                    {formatUKDateShort(grade.created_at)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* Feedback Tab */}
                    {activeTab === 'feedback' && (
                      <motion.div
                        key="feedback"
                        variants={tabVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="p-4 space-y-4"
                      >
                        {isEditingFeedback ? (
                          <Card className="border-white/10">
                            <CardContent className="p-4 space-y-3">
                              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                                Edit Feedback
                              </h4>
                              <Textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Enter assessment feedback for the student..."
                                className="touch-manipulation text-base min-h-[160px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 text-white"
                              />
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  className="flex-1 h-11 touch-manipulation"
                                  onClick={() => setIsEditingFeedback(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="flex-1 h-11 touch-manipulation gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                                  onClick={handleSaveFeedback}
                                  disabled={updateGrade.isPending}
                                >
                                  {updateGrade.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Save className="h-4 w-4" />
                                  )}
                                  Save Feedback
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ) : grade.feedback ? (
                          <Card className="border-white/10">
                            <CardContent className="p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                                  Assessment Feedback
                                </h4>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-11 touch-manipulation"
                                  onClick={handleStartFeedback}
                                >
                                  Edit
                                </Button>
                              </div>
                              <div className="p-3 rounded-lg bg-background border border-border">
                                <pre className="whitespace-pre-wrap text-sm font-sans text-white">
                                  {grade.feedback}
                                </pre>
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <Card className="border-white/10">
                            <CardContent className="p-8 text-center space-y-3">
                              <MessageSquare className="h-12 w-12 mx-auto text-white" />
                              <p className="text-white font-medium">No Feedback Yet</p>
                              <p className="text-sm text-white">
                                No feedback has been recorded for this assessment.
                              </p>
                              <Button
                                className="h-11 touch-manipulation gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                                onClick={handleStartFeedback}
                              >
                                <MessageSquare className="h-4 w-4" />
                                Add Feedback
                              </Button>
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
                        <Card className="border-white/10">
                          <CardContent className="p-4 space-y-3">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-info" />
                              Assessment Timeline
                            </h4>

                            {/* Timeline */}
                            <div className="relative pl-6 space-y-6">
                              {/* Vertical line */}
                              <div className="absolute left-[9px] top-1 bottom-1 w-px bg-white/20" />

                              {/* Created */}
                              <div className="relative">
                                <div className="absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full bg-info/20 border-2 border-info flex items-center justify-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-info" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    Assessment Created
                                  </p>
                                  <p className="text-xs text-white mt-0.5">
                                    {formatUKDateShort(grade.created_at)}
                                  </p>
                                  <p className="text-xs text-white mt-1">
                                    Unit: {grade.unit_name ?? 'Not specified'}
                                  </p>
                                </div>
                              </div>

                              {/* Status change - Submitted/Pending */}
                              {grade.status && grade.status !== 'Pending' && (
                                <div className="relative">
                                  <div className="absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full bg-warning/20 border-2 border-warning flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-white">
                                      Status Updated to {grade.status}
                                    </p>
                                    {grade.assessed_at ? (
                                      <p className="text-xs text-white mt-0.5">
                                        {formatUKDateShort(grade.assessed_at)}
                                      </p>
                                    ) : (
                                      <p className="text-xs text-white mt-0.5">Date not recorded</p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Assessed */}
                              {grade.assessed_at && (
                                <div className="relative">
                                  <div className="absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full bg-success/20 border-2 border-success flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-white">
                                      Assessment Graded
                                    </p>
                                    <p className="text-xs text-white mt-0.5">
                                      {formatUKDateShort(grade.assessed_at)}
                                    </p>
                                    {assessor && (
                                      <p className="text-xs text-white mt-1">
                                        Assessed by: {assessor.name}
                                      </p>
                                    )}
                                    {grade.grade && (
                                      <Badge
                                        variant="outline"
                                        className={`mt-1.5 ${getGradeColour(grade.grade)}`}
                                      >
                                        {grade.grade}
                                        {grade.score != null && ` - ${grade.score}%`}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Feedback added */}
                              {grade.feedback && (
                                <div className="relative">
                                  <div className="absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full bg-elec-yellow/20 border-2 border-elec-yellow flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-white">
                                      Feedback Recorded
                                    </p>
                                    <p className="text-xs text-white mt-0.5">
                                      {grade.feedback.length} characters of feedback provided
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
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
                  onClick={() => onOpenChange(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  Grade with Rubric
                </Button>
                <Button
                  className="flex-1 h-11 touch-manipulation gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                  onClick={() => onOpenChange(false)}
                >
                  <Zap className="h-4 w-4" />
                  Quick Grade
                </Button>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
