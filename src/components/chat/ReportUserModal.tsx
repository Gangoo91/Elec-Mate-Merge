
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedUser: {
    id: string;
    name: string;
    messageId?: string;
  } | null;
}

const reportReasons = [
  { id: "spam", label: "Spam" },
  { id: "harassment", label: "Harassment or bullying" },
  { id: "inappropriate", label: "Inappropriate content" },
  { id: "false-information", label: "False information" },
  { id: "other", label: "Other" }
];

const ReportUserModal = ({ isOpen, onClose, reportedUser }: ReportUserModalProps) => {
  const [reason, setReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitReport = async () => {
    if (!reason) {
      toast({
        title: "Missing information",
        description: "Please select a reason for your report.",
        variant: "destructive"
      });
      return;
    }

    if (reason === "other" && !details.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide details for your report.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would be a call to Supabase
      // This is where we would save the report to the database
      // For now we'll just simulate the request with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Report submitted",
        description: "Thank you for your report. Our team will review it shortly.",
      });
      
      handleClose();
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Could not submit your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReason("");
    setDetails("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-elec-gray border border-elec-yellow/20">
        <DialogHeader>
          <DialogTitle className="text-elec-yellow">Report {reportedUser?.name}</DialogTitle>
          <DialogDescription>
            Please let us know why you're reporting this user or message.
            Our team will review your report and take appropriate action.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-white">Reason for reporting</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {reportReasons.map(reportReason => (
                <div key={reportReason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reportReason.id} id={reportReason.id} />
                  <Label htmlFor={reportReason.id} className="text-white">{reportReason.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details" className="text-white">
              Additional details {reason === "other" && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id="details"
              placeholder="Please provide any additional details that might help our review team."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-[100px] bg-elec-gray-light/30 border-elec-yellow/20"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmitReport} 
            disabled={isSubmitting}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUserModal;
