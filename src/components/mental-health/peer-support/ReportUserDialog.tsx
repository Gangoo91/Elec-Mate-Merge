import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Flag, Loader2, CheckCircle } from "lucide-react";
import { peerReportService, ReportReason } from "@/services/peerSupportService";
import { toast } from "@/hooks/use-toast";

interface ReportUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName?: string;
  conversationId?: string;
  onReported?: () => void;
}

const reportReasons: { value: ReportReason; label: string; description: string }[] = [
  {
    value: "harassment",
    label: "Harassment",
    description: "Bullying, threats, or intimidation",
  },
  {
    value: "inappropriate",
    label: "Inappropriate Content",
    description: "Sexual content, explicit language, or offensive material",
  },
  {
    value: "spam",
    label: "Spam",
    description: "Unsolicited promotions or repetitive messages",
  },
  {
    value: "other",
    label: "Other",
    description: "Something else not listed above",
  },
];

export function ReportUserDialog({
  open,
  onOpenChange,
  userId,
  userName = "this user",
  conversationId,
  onReported,
}: ReportUserDialogProps) {
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast({
        title: "Please select a reason",
        description: "Choose why you're reporting this user",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await peerReportService.reportUser({
        reportedUserId: userId,
        conversationId,
        reason,
        additionalNotes: additionalNotes.trim() || undefined,
      });

      setIsSubmitted(true);

      // Reset and close after showing success
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
        setReason(null);
        setAdditionalNotes("");
        onReported?.();
      }, 1500);
    } catch (error) {
      console.error("Error reporting user:", error);
      toast({
        title: "Failed to submit report",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset state when closing
      setTimeout(() => {
        setReason(null);
        setAdditionalNotes("");
        setIsSubmitted(false);
      }, 200);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[380px] rounded-2xl">
        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-green-500/10 w-fit">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Report Submitted</h3>
            <p className="text-sm text-muted-foreground">
              Thank you for helping keep our community safe. Our team will review this report.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-2 p-3 rounded-full bg-orange-500/10">
                <Flag className="h-6 w-6 text-orange-500" />
              </div>
              <DialogTitle className="text-center">
                Report {userName}
              </DialogTitle>
              <DialogDescription className="text-center">
                Help us understand what happened. All reports are reviewed by our team.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Why are you reporting this user?
                </Label>
                <RadioGroup
                  value={reason || ""}
                  onValueChange={(value) => setReason(value as ReportReason)}
                  className="space-y-2"
                >
                  {reportReasons.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                        reason === option.value
                          ? "border-orange-500/50 bg-orange-500/5"
                          : "border-border hover:border-border/80"
                      }`}
                      onClick={() => setReason(option.value)}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={option.value}
                          className="font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Additional details (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Provide any additional context that might help us review this report..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="min-h-[80px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {additionalNotes.length}/500
                </p>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => handleClose(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !reason}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
