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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (correction: string) => void;
  agentName: string;
}

const ISSUE_TYPES = [
  { value: "incorrect_regulation", label: "Incorrect regulation reference" },
  { value: "wrong_calculation", label: "Wrong calculation" },
  { value: "missing_info", label: "Missing important information" },
  { value: "unclear", label: "Unclear explanation" },
  { value: "outdated", label: "Outdated information" },
  { value: "other", label: "Other" }
];

export const FeedbackModal = ({
  open,
  onClose,
  onSubmit,
  agentName
}: FeedbackModalProps) => {
  const [issueType, setIssueType] = useState("");
  const [correction, setCorrection] = useState("");

  const handleSubmit = () => {
    if (!issueType || !correction.trim()) {
      return;
    }

    const formattedCorrection = `[${issueType}] ${correction}`;
    onSubmit(formattedCorrection);
    
    // Reset form
    setIssueType("");
    setCorrection("");
  };

  const handleClose = () => {
    setIssueType("");
    setCorrection("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report Issue with {agentName}</DialogTitle>
          <DialogDescription>
            Help us improve by explaining what was wrong with this response.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger id="issue-type">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {ISSUE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="correction">What was wrong? / What should it be?</Label>
            <Textarea
              id="correction"
              placeholder="Please provide details about the issue and, if possible, the correct information..."
              value={correction}
              onChange={(e) => setCorrection(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!issueType || !correction.trim()}
          >
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
