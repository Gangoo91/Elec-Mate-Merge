
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

interface TimeEntryFormProps {
  onAddEntry: (duration: number, activity: string, notes: string) => void;
}

const TimeEntryForm = ({ onAddEntry }: TimeEntryFormProps) => {
  const { toast } = useToast();
  const [duration, setDuration] = useState<number>(0);
  const [activity, setActivity] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!duration || !activity) {
      toast({
        title: "Missing information",
        description: "Please enter both duration and activity.",
        variant: "destructive"
      });
      return;
    }

    onAddEntry(duration, activity, notes);
    
    // Reset form
    setDuration(0);
    setActivity("");
    setNotes("");

    toast({
      title: "Time entry added",
      description: "Your off-the-job training has been logged successfully."
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="duration" className="text-sm font-medium">
            Duration (minutes)
          </label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={duration || ""}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            placeholder="Enter time in minutes"
            className="border-elec-yellow/20 bg-elec-dark"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="activity" className="text-sm font-medium">
            Activity Type
          </label>
          <Input
            id="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="E.g., Video lesson, Reading, Practice"
            className="border-elec-yellow/20 bg-elec-dark"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium">
          Notes (Optional)
        </label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you learn? What did you practice?"
          className="min-h-[100px] border-elec-yellow/20 bg-elec-dark"
        />
      </div>
      <Button type="submit" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Time Entry
      </Button>
    </form>
  );
};

export default TimeEntryForm;
