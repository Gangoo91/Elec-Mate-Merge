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
import { Badge } from "@/components/ui/badge";
import { CloudRain, UserX, Briefcase, Calendar, AlertTriangle } from "lucide-react";

interface CancelBriefingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: any;
  onSuccess: () => void;
  onReschedule?: () => void;
}

const quickReasons = [
  { id: 'weather', label: 'Weather', icon: CloudRain },
  { id: 'resources', label: 'Resource Unavailable', icon: UserX },
  { id: 'postponed', label: 'Job Postponed', icon: Briefcase },
  { id: 'other', label: 'Other', icon: AlertTriangle },
];

export const CancelBriefingDialog = ({
  open,
  onOpenChange,
  briefing,
  onSuccess,
  onReschedule,
}: CancelBriefingDialogProps) => {
  const [reason, setReason] = useState("");
  const [selectedQuickReason, setSelectedQuickReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleQuickReasonSelect = (reasonId: string) => {
    setSelectedQuickReason(reasonId);
    const selectedReason = quickReasons.find(r => r.id === reasonId);
    if (selectedReason && reasonId !== 'other') {
      setReason(selectedReason.label);
    } else {
      setReason("");
    }
  };

  const handleRescheduleInstead = () => {
    onOpenChange(false);
    onReschedule?.();
  };

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
      <DialogContent className="sm:max-w-[500px]">
        {!showConfirmation ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Cancel Briefing
              </DialogTitle>
              <DialogDescription>
                Cancelling "{briefing?.briefing_name || briefing?.title}". Consider rescheduling instead?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Quick Reason Chips */}
              <div className="space-y-2">
                <Label>Quick Reason</Label>
                <div className="grid grid-cols-2 gap-2">
                  {quickReasons.map((quickReason) => {
                    const Icon = quickReason.icon;
                    return (
                      <Badge
                        key={quickReason.id}
                        variant={selectedQuickReason === quickReason.id ? "default" : "outline"}
                        className="cursor-pointer justify-start gap-2 py-2 px-3 hover:bg-accent"
                        onClick={() => handleQuickReasonSelect(quickReason.id)}
                      >
                        <Icon className="h-4 w-4" />
                        {quickReason.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Custom Reason */}
              {selectedQuickReason === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="reason">Details (Optional)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Provide additional details..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                variant="outline"
                onClick={handleRescheduleInstead}
                disabled={loading}
                className="w-full sm:w-full border-elec-yellow/30 hover:border-elec-yellow"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Reschedule Instead
              </Button>
              <div className="flex gap-2 w-full">
                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className="flex-1">
                  Keep Briefing
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowConfirmation(true)}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel Briefing
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-destructive">Confirm Cancellation</DialogTitle>
              <DialogDescription>
                This will permanently cancel the briefing. Team members will need to be notified separately.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                <strong>Briefing:</strong> {briefing?.briefing_name || briefing?.title}
              </p>
              {reason && (
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Reason:</strong> {reason}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmation(false)} disabled={loading}>
                Go Back
              </Button>
              <Button variant="destructive" onClick={handleCancel} disabled={loading}>
                {loading ? "Cancelling..." : "Confirm Cancellation"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
