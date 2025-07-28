
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, FileText, Plus } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";

export interface TimeEntryFormProps {
  onAddEntry: (duration: number, activity: string, notes: string) => void;
  onCancel?: () => void;
}

const TimeEntryForm = ({ onAddEntry, onCancel }: TimeEntryFormProps) => {
  const [duration, setDuration] = useState<number>(60);
  const [activity, setActivity] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Pre-defined activity types for easy selection
  const activityTypes = [
    "College Session",
    "Online Learning Module",
    "Skills Workshop",
    "Mentoring Session", 
    "Assessment Preparation",
    "Technical Reading",
    "Safety Training",
    "Practical Exercise",
    "Research & Study",
    "Reflection & Planning"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;
    
    onAddEntry(duration, activity, notes);
    // Reset form fields
    setDuration(60);
    setActivity("");
    setNotes("");
  };

  return (
    <div className="bg-elec-gray p-4 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInputWrapper
            label="Duration"
            type="number"
            value={duration}
            onChange={(value) => setDuration(parseInt(value) || 0)}
            min="1"
            max="480"
            step="15"
            unit="mins"
            placeholder="60"
            icon={<Clock className="h-4 w-4" />}
          />
          <MobileSelectWrapper
            label="Activity Type"
            placeholder="Select activity type"
            value={activity}
            onValueChange={setActivity}
            options={activityTypes.map(type => ({ value: type, label: type }))}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
            <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
            Training Notes (Optional)
          </Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe what you learned, activities completed, or reflection notes..."
            rows={4}
            className="bg-elec-card border-2 border-elec-gray/50 text-elec-light placeholder:text-elec-light/60 resize-none"
          />
          <p className="text-xs text-elec-light/60">
            Good practice: Note key learning points, skills developed, or areas for improvement
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {onCancel && (
            <Button 
              variant="outline" 
              onClick={onCancel} 
              type="button"
              className="w-full sm:w-auto border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={!activity.trim()}
            className="w-full sm:w-auto bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log Training Hours
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TimeEntryForm;
