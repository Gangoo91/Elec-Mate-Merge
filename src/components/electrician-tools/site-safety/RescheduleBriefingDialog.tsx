import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface RescheduleBriefingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: any;
  onSuccess: () => void;
}

export const RescheduleBriefingDialog = ({
  open,
  onOpenChange,
  briefing,
  onSuccess,
}: RescheduleBriefingDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(
    briefing?.briefing_date ? new Date(briefing.briefing_date) : undefined
  );
  const [time, setTime] = useState(briefing?.briefing_time || "09:00");
  const [loading, setLoading] = useState(false);

  const handleReschedule = async () => {
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a new date for the briefing.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("team_briefings")
        .update({
          briefing_date: format(date, "yyyy-MM-dd"),
          briefing_time: time,
        })
        .eq("id", briefing.id);

      if (error) throw error;

      toast({
        title: "Briefing Rescheduled",
        description: `Briefing moved to ${format(date, "PPP")} at ${time}`,
      });

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Error rescheduling briefing:", error);
      toast({
        title: "Error",
        description: "Failed to reschedule briefing. Please try again.",
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
          <DialogTitle>Reschedule Briefing</DialogTitle>
          <DialogDescription>
            Select a new date and time for "{briefing?.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>New Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">New Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleReschedule} disabled={loading}>
            {loading ? "Rescheduling..." : "Reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
