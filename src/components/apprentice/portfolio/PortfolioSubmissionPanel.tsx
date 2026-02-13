import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  FileText,
  MessageSquare,
  RefreshCw,
  Loader2,
  Award,
  XCircle,
} from 'lucide-react';
import { useStudentSubmissions } from '@/hooks/college/usePortfolioSubmissions';
import { usePortfolioDataWithQualifications } from '@/hooks/portfolio/usePortfolioDataWithQualifications';
import { useQualifications } from '@/hooks/qualification/useQualifications';

interface PortfolioSubmissionPanelProps {
  qualificationId?: string;
}

const PortfolioSubmissionPanel: React.FC<PortfolioSubmissionPanelProps> = ({
  qualificationId: propQualificationId,
}) => {
  const { userSelection } = useQualifications();
  const qualificationId = propQualificationId || userSelection?.qualification_id;

  const { submissions, isLoading: submissionsLoading, submitCategory } = useStudentSubmissions();
  const {
    categories,
    entries,
    isLoading: portfolioLoading,
    hasQualificationSelected,
  } = usePortfolioDataWithQualifications();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoading = submissionsLoading || portfolioLoading;

  // Calculate status for each category
  const getCategoryStatus = (categoryId: string) => {
    const submission = submissions.find((s) => s.category_id === categoryId);
    if (!submission) return 'not_submitted';
    return submission.status;
  };

  const getCategoryEntries = (categoryId: string) => {
    return entries.filter((e) => e.category?.id === categoryId);
  };

  const canSubmitCategory = (categoryId: string) => {
    const categoryEntries = getCategoryEntries(categoryId);
    const completedEntries = categoryEntries.filter((e) => e.status === 'completed');
    const category = categories.find((c) => c.id === categoryId);
    const requiredEntries = category?.requiredEntries || 1;

    // Must have at least the required number of completed entries
    return completedEntries.length >= requiredEntries;
  };

  const handleSubmitClick = (categoryId: string, categoryName: string) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!selectedCategory || !qualificationId) return;

    setIsSubmitting(true);
    try {
      await submitCategory.mutateAsync({
        qualificationId,
        categoryId: selectedCategory.id,
      });
      setShowConfirmDialog(false);
      setSelectedCategory(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not_submitted':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Not Submitted
          </Badge>
        );
      case 'submitted':
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Submitted</Badge>
        );
      case 'under_review':
        return (
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
            Under Review
          </Badge>
        );
      case 'feedback_given':
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
            Feedback Given
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Approved</Badge>
        );
      case 'signed_off':
      case 'iqa_sampled':
      case 'iqa_verified':
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Complete</Badge>
        );
      case 'resubmitted':
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
            Resubmitted
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed_off':
      case 'iqa_sampled':
      case 'iqa_verified':
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'feedback_given':
        return <MessageSquare className="h-5 w-5 text-amber-400" />;
      case 'submitted':
      case 'under_review':
      case 'resubmitted':
        return <Clock className="h-5 w-5 text-blue-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </CardContent>
      </Card>
    );
  }

  if (!hasQualificationSelected || !qualificationId) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="py-12 text-center">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Qualification Selected</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Please select a qualification in the Portfolio tab first to manage your submissions.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate overall submission stats
  const totalCategories = categories.length;
  const submittedCategories = categories.filter((c) => {
    const status = getCategoryStatus(c.id);
    return status !== 'not_submitted';
  }).length;
  const completedCategories = categories.filter((c) => {
    const status = getCategoryStatus(c.id);
    return ['signed_off', 'iqa_sampled', 'iqa_verified'].includes(status);
  }).length;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Portfolio Submission Progress
          </CardTitle>
          <CardDescription>Submit your evidence for assessor review when ready</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <p className="text-2xl font-bold">{totalCategories}</p>
              <p className="text-xs text-muted-foreground">Total Units</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-500/10">
              <p className="text-2xl font-bold text-blue-400">{submittedCategories}</p>
              <p className="text-xs text-muted-foreground">Submitted</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-500/10">
              <p className="text-2xl font-bold text-green-400">{completedCategories}</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress
            value={totalCategories > 0 ? (completedCategories / totalCategories) * 100 : 0}
            className="h-2"
          />
        </CardContent>
      </Card>

      {/* Category List */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader>
          <CardTitle className="text-base">Units & Categories</CardTitle>
          <CardDescription>Click on a category to see details and submit for review</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {categories.map((category) => {
              const status = getCategoryStatus(category.id);
              const categoryEntries = getCategoryEntries(category.id);
              const completedEntries = categoryEntries.filter(
                (e) => e.status === 'completed'
              ).length;
              const canSubmit = canSubmitCategory(category.id);
              const submission = submissions.find((s) => s.category_id === category.id);

              return (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border border-elec-gray/40 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(status)}
                      <div className="flex-1 text-left">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {completedEntries}/{category.requiredEntries || 1} entries complete
                        </p>
                      </div>
                      {getStatusBadge(status)}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4 pt-2">
                      {/* Entry Progress */}
                      <div className="flex items-center gap-3">
                        <Progress
                          value={
                            (completedEntries / (category.requiredEntries || 1)) * 100
                          }
                          className="h-2 flex-1"
                        />
                        <span className="text-sm text-muted-foreground">
                          {Math.round(
                            (completedEntries / (category.requiredEntries || 1)) * 100
                          )}
                          %
                        </span>
                      </div>

                      {/* Current feedback from assessor */}
                      {submission?.assessor_feedback && status === 'feedback_given' && (
                        <div className="space-y-3">
                          {/* Prominent current feedback */}
                          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-amber-400 font-semibold flex items-center gap-1.5">
                                <MessageSquare className="h-4 w-4" />
                                Assessor Feedback
                              </p>
                              {submission.grade && (
                                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 capitalize">
                                  {submission.grade}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-foreground">
                              {submission.assessor_feedback}
                            </p>
                          </div>

                          {/* What to fix section */}
                          {submission.action_required && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                              <p className="text-sm text-red-400 font-semibold flex items-center gap-1.5 mb-2">
                                <XCircle className="h-4 w-4" />
                                What to Fix
                              </p>
                              <p className="text-sm text-foreground">
                                {submission.action_required}
                              </p>
                            </div>
                          )}

                          {/* Previous feedback history */}
                          {submission.previous_feedback && (
                            <div className="p-3 rounded-lg bg-white/5 border border-border/50">
                              <p className="text-xs text-muted-foreground font-medium mb-1 flex items-center gap-1.5">
                                <Clock className="h-3 w-3" />
                                Previous Feedback (Attempt #
                                {(submission.submission_count || 1) - 1})
                              </p>
                              <p className="text-sm text-foreground">
                                {submission.previous_feedback}
                              </p>
                              {submission.previous_grade && (
                                <Badge className="mt-2" variant="outline">
                                  Previous Grade: {submission.previous_grade}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Entry List */}
                      {categoryEntries.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground font-medium">
                            Your Evidence
                          </p>
                          {categoryEntries.map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                            >
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="flex-1 text-sm truncate">{entry.title}</span>
                              <Badge variant="outline" className="text-xs capitalize">
                                {entry.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="pt-2">
                        {status === 'not_submitted' ? (
                          <Button
                            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/80"
                            disabled={!canSubmit}
                            onClick={() => handleSubmitClick(category.id, category.name)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Submit for Review
                          </Button>
                        ) : status === 'feedback_given' ? (
                          <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => handleSubmitClick(category.id, category.name)}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Resubmit
                          </Button>
                        ) : ['signed_off', 'iqa_sampled', 'iqa_verified'].includes(status) ? (
                          <div className="flex items-center justify-center gap-2 text-green-400 py-2">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-medium">Unit Complete</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-muted-foreground py-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Awaiting assessor review</span>
                          </div>
                        )}

                        {!canSubmit && status === 'not_submitted' && (
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Complete at least {category.requiredEntries || 1} evidence entries to
                            submit
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No categories available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-elec-dark border-elec-gray/40">
          <DialogHeader>
            <DialogTitle>Submit for Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit "{selectedCategory?.name}" for assessor review?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Once submitted, your assessor will review your evidence and provide feedback. You may
              need to make changes and resubmit if required.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-elec-gray/40"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioSubmissionPanel;
