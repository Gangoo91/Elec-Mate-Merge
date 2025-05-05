
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

export interface TimeEntryFormProps {
  onAddEntry: (duration: number, activity: string, notes: string) => void;
  onCancel?: () => void; // Make onCancel optional
}

const TimeEntryForm = ({ onAddEntry, onCancel }: TimeEntryFormProps) => {
  const [duration, setDuration] = useState<number>(15);
  const [activity, setActivity] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry(duration, activity, notes);
    // Reset form fields
    setDuration(15);
    setActivity("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          required
          className="bg-elec-dark border-elec-gray/40"
        />
      </div>
      
      <div>
        <Label htmlFor="activity">Activity Type</Label>
        <Input
          id="activity"
          value={activity}
          placeholder="e.g., Course Reading, Practice Exercise"
          onChange={(e) => setActivity(e.target.value)}
          required
          className="bg-elec-dark border-elec-gray/40"
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          placeholder="Add details about what you worked on"
          onChange={(e) => setNotes(e.target.value)}
          className="bg-elec-dark border-elec-gray/40"
          rows={3}
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} type="button">
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-elec-yellow text-black hover:bg-elec-yellow/80">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>
    </form>
  );
};

export default TimeEntryForm;
