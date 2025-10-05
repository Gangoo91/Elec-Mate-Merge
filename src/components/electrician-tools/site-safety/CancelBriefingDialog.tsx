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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CancelBriefingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: any;
  onSuccess: () => void;
}

export const CancelBriefingDialog = ({
  open,
  onOpenChange,
  briefing,
  onSuccess,
}: CancelBriefingDialogProps) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("team_briefings")
        .update({
          status: "cancelled",
          cancelled_reason: reason,
          cancelled_at: new Date().toISOString(),
        })
        .eq("id", briefing.id);

      if (error) throw error;

      toast({
        title: "Briefing Cancelled",
        description: "The briefing has been cancelled successfully.",
      });

      onOpenChange(false);
      onSuccess();
      setReason("");
    } catch (error) {
      console.error("Error cancelling briefing:", error);
      toast({
        title: "Error",
        description: "Failed to cancel briefing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancel Briefing</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel "{briefing?.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Cancellation (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for cancelling this briefing..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Keep Briefing
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={loading}>
            {loading ? "Cancelling..." : "Cancel Briefing"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
