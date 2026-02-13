import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";

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
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [loading, setLoading] = useState(false);

  const originalDate = briefing?.briefing_date ? new Date(briefing.briefing_date) : null;
  const originalTime = briefing?.briefing_time || "09:00";

  const suggestNextSlot = () => {
    if (originalDate) {
      setDate(addDays(originalDate, 1));
      setTime(originalTime);
    }
  };

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
      // Update briefing
      const { error: updateError } = await supabase
        .from("team_briefings")
        .update({
          briefing_date: format(date, "yyyy-MM-dd"),
          briefing_time: time,
        })
        .eq("id", briefing.id);

      if (updateError) throw updateError;

      // Create status history entry
      const { data: { user } } = await supabase.auth.getUser();
      if (user && rescheduleReason) {
        await supabase
          .from("briefing_status_history")
          .insert({
            briefing_id: briefing.id,
            old_status: briefing.status,
            new_status: 'scheduled',
            reason: `Rescheduled: ${rescheduleReason}`,
            changed_by: user.id,
          });
      }

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[85vh]">
        <div className="overflow-y-auto p-6 space-y-4">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-elec-yellow" />
              Reschedule Briefing
            </SheetTitle>
            <SheetDescription>
              Select a new date and time for "{briefing?.briefing_name || briefing?.title}"
            </SheetDescription>
          </SheetHeader>

          {/* Original Date/Time Display */}
          {originalDate && (
            <div className="bg-muted/50 p-3 rounded-lg border border-border">
              <p className="text-sm font-medium mb-1">Original Schedule:</p>
              <div className="flex items-center gap-4 text-sm text-white flex-wrap">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <CalendarDays className="h-4 w-4" />
                  {format(originalDate, "PPP")}
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Clock className="h-4 w-4" />
                  {originalTime}
                </div>
              </div>
            </div>
          )}

          {/* Quick Suggestion */}
          <Button
            variant="outline"
            onClick={suggestNextSlot}
            className="w-full h-11 touch-manipulation"
          >
            Suggest Next Day (Same Time)
          </Button>

          {/* New Date Selection */}
          <div className="space-y-2">
            <Label>New Date</Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border"
              />
            </div>
          </div>

          {/* New Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time">New Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-11 touch-manipulation"
            />
          </div>

          {/* Reason for Rescheduling */}
          <div className="space-y-2">
            <Label htmlFor="reschedule-reason">Reason (Optional)</Label>
            <Textarea
              id="reschedule-reason"
              placeholder="Why are you rescheduling? (e.g., Weather delay, Resource conflict)"
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              rows={2}
              className="touch-manipulation"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className="flex-1 h-11 touch-manipulation">
              Cancel
            </Button>
            <Button onClick={handleReschedule} disabled={loading || !date} className="flex-1 h-11 touch-manipulation">
              {loading ? "Rescheduling..." : "Reschedule"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
