import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Download,
  Image,
  File,
  AlertTriangle,
  Award,
  Send,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { useSubmissionDetail, SubmissionDetails, SubmissionPortfolioItem } from '@/hooks/college/usePortfolioSubmissions';
import { useAssessorActions } from '@/hooks/college/useAssessorActions';

interface SubmissionReviewPanelProps {
  submissionId: string;
  onBack: () => void;
  onComplete?: () => void;
}

const SubmissionReviewPanel: React.FC<SubmissionReviewPanelProps> = ({
  submissionId,
  onBack,
  onComplete
}) => {
  const { submission, isLoading, refetch } = useSubmissionDetail(submissionId);
  const { startReview, submitFeedback, signOff, requestMoreEvidence } = useAssessorActions();

  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState<string>('');
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [showSignOffDialog, setShowSignOffDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartReview = async () => {
    if (!submission) return;
    await startReview.mutateAsync(submissionId);
    refetch();
  };

  const handleSubmitFeedback = async () => {
    if (!feedback || !grade) return;
    setIsSubmitting(true);
    try {
      await submitFeedback.mutateAsync({
        submissionId,
        feedback,
        grade: grade as any,
        strengthsNoted: strengths,
        areasForImprovement: improvements
      });
      onComplete?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOff = async () => {
    setIsSubmitting(true);
    try {
      await signOff.mutateAsync({ submissionId });
      setShowSignOffDialog(false);
      onComplete?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestMoreEvidence = async () => {
    if (!rejectionReason) return;
    setIsSubmitting(true);
    try {
      await requestMoreEvidence.mutateAsync({
        submissionId,
        request: rejectionReason
      });
      setShowRejectDialog(false);
      onComplete?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (!submission) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <p className="text-white/70">Submission not found</p>
          <Button variant="outline" onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Queue
          </Button>
        </CardContent>
      </Card>
    );
  }

  const PortfolioItemCard = ({ item }: { item: SubmissionPortfolioItem }) => (
    <Card className="bg-white/5 border-elec-gray/40">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <CardDescription className="text-xs mt-1">
              Created {formatDate(item.createdAt)} • {Math.floor(item.timeSpent / 60)}h logged
            </CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">{item.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {item.description && (
          <p className="text-sm text-white/80">{item.description}</p>
        )}

        {item.skillsDemonstrated.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.skillsDemonstrated.map((skill, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {item.reflectionNotes && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-400 font-medium mb-1">Student Reflection</p>
            <p className="text-sm text-white/80">{item.reflectionNotes}</p>
          </div>
        )}

        {item.evidenceFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-white/60 font-medium">Evidence Files ({item.evidenceFiles.length})</p>
            <div className="grid gap-2">
              {item.evidenceFiles.map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-elec-gray/40"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {getFileIcon(file.fileType)}
                    <span className="text-sm truncate">{file.fileName}</span>
                    <span className="text-xs text-white/50">{formatFileSize(file.fileSize)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => window.open(file.fileUrl, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">Review Submission</h2>
            <p className="text-sm text-white/60">{submission.categoryName}</p>
          </div>
        </div>
        <Badge variant="outline" className="capitalize">{submission.status.replace('_', ' ')}</Badge>
      </div>

      {/* Student Info */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow">
                {submission.studentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{submission.studentName}</p>
              <p className="text-sm text-white/60">{submission.qualificationTitle}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                <span className="text-white/60">Submitted:</span> {formatDate(submission.submittedAt)}
              </p>
              <p className="text-sm">
                <span className="text-white/60">Attempt:</span> #{submission.submissionCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous Feedback (if resubmission) */}
      {submission.previousFeedback && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-amber-400" />
              Previous Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/80">{submission.previousFeedback}</p>
            {submission.previousGrade && (
              <Badge className="mt-2" variant="outline">Previous Grade: {submission.previousGrade}</Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Portfolio Items */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Portfolio Evidence ({submission.portfolioItems.length} items)
        </h3>
        <Accordion type="single" collapsible className="space-y-2">
          {submission.portfolioItems.map((item, index) => (
            <AccordionItem key={item.id} value={item.id} className="border-elec-gray/40">
              <AccordionTrigger className="hover:no-underline px-4 py-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-white/50 text-sm">#{index + 1}</span>
                  <span className="font-medium">{item.title}</span>
                  <Badge variant="outline" className="ml-auto mr-4">{item.evidenceFiles.length} files</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <PortfolioItemCard item={item} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Review Actions */}
      {submission.status === 'submitted' && (
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <Button
              onClick={handleStartReview}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/80"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Feedback Form */}
      {(submission.status === 'under_review' || submission.status === 'resubmitted') && (
        <Card className="bg-white/5 border-elec-gray/40">
          <CardHeader>
            <CardTitle className="text-base">Assessor Feedback</CardTitle>
            <CardDescription>Provide detailed feedback on this submission</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Overall Feedback *</Label>
              <Textarea
                placeholder="Provide comprehensive feedback on the submission..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="bg-white/5 border-elec-gray/40 min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Strengths Noted</Label>
                <Textarea
                  placeholder="What did the student do well?"
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  className="bg-white/5 border-elec-gray/40"
                />
              </div>
              <div className="space-y-2">
                <Label>Areas for Improvement</Label>
                <Textarea
                  placeholder="What could be improved?"
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  className="bg-white/5 border-elec-gray/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Grade *</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="bg-white/5 border-elec-gray/40">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-gray/40">
                  <SelectItem value="distinction">Distinction</SelectItem>
                  <SelectItem value="merit">Merit</SelectItem>
                  <SelectItem value="pass">Pass</SelectItem>
                  <SelectItem value="refer">Refer (Resubmission Required)</SelectItem>
                  <SelectItem value="not_yet_competent">Not Yet Competent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={() => setShowRejectDialog(true)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Request More Evidence
              </Button>
              <Button
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/80"
                onClick={handleSubmitFeedback}
                disabled={!feedback || !grade || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sign-off Section */}
      {submission.status === 'approved' && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-5 w-5 text-green-400" />
              Ready for Sign-off
            </CardTitle>
            <CardDescription>
              This submission has been approved. Sign off to complete the assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setShowSignOffDialog(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sign Off Submission
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sign-off Dialog */}
      <Dialog open={showSignOffDialog} onOpenChange={setShowSignOffDialog}>
        <DialogContent className="bg-elec-dark border-elec-gray/40">
          <DialogHeader>
            <DialogTitle>Confirm Sign-off</DialogTitle>
            <DialogDescription>
              By signing off this submission, you confirm that all evidence has been reviewed
              and meets the required standard for this qualification unit.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowSignOffDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSignOff}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Confirm Sign-off
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Evidence Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-elec-dark border-elec-gray/40">
          <DialogHeader>
            <DialogTitle>Request Additional Evidence</DialogTitle>
            <DialogDescription>
              Explain what additional evidence the student needs to provide.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Describe the additional evidence required..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="bg-white/5 border-elec-gray/40 min-h-[100px]"
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRequestMoreEvidence}
              disabled={!rejectionReason || isSubmitting}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionReviewPanel;
