
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Calendar, Clock, FileText, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface TimeEntryFormProps {
  onAddEntry: (duration: number, activity: string, notes: string) => void;
}

const TimeEntryForm = ({ onAddEntry }: TimeEntryFormProps) => {
  const { toast } = useToast();
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [activity, setActivity] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [activityCategory, setActivityCategory] = useState<string>("");
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total minutes from hours and minutes
    const totalMinutes = (hours * 60) + minutes;
    
    if (!totalMinutes || !activity) {
      toast({
        title: "Missing information",
        description: "Please enter both duration and activity.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Format the activity with category if selected
    const formattedActivity = activityCategory ? `${activityCategory}: ${activity}` : activity;
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      onAddEntry(totalMinutes, formattedActivity, notes);
      
      // Reset form
      setHours(0);
      setMinutes(0);
      setActivity("");
      setNotes("");
      setActivityCategory("");
      setDate(format(new Date(), 'yyyy-MM-dd'));
      setIsSubmitting(false);

      toast({
        title: "Time entry added",
        description: "Your off-the-job training has been logged successfully.",
        icon: <Check className="h-4 w-4 text-green-500" />
      });
    }, 600);
  };

  const activityCategories = [
    "College/Training Provider",
    "Online Learning",
    "Shadowing",
    "Mentoring Session",
    "Industry Visit",
    "Research/Study",
    "Practical Exercise",
    "Workshop",
    "Exam Preparation",
    "Other"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/10">
        <h3 className="text-sm font-medium flex items-center mb-3">
          <Calendar className="h-4 w-4 mr-2 text-elec-yellow" />
          Log New Training Activity
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="entry-date" className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-elec-yellow" />
              Date
            </label>
            <Input
              type="date"
              id="entry-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-elec-yellow/20 bg-elec-gray"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="activity-category" className="text-sm font-medium">
                Activity Category
              </label>
              <Select value={activityCategory} onValueChange={setActivityCategory}>
                <SelectTrigger id="activity-category" className="border-elec-yellow/20 bg-elec-gray">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {activityCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="activity" className="text-sm font-medium">
                Activity Description
              </label>
              <Input
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="E.g., Electrical theory lesson, Circuit design"
                className="border-elec-yellow/20 bg-elec-gray"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2 text-elec-yellow" />
              Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min="0"
                    value={hours || ""}
                    onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="border-elec-yellow/20 bg-elec-gray"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">hours</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes || ""}
                    onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="border-elec-yellow/20 bg-elec-gray"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">minutes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-elec-yellow" />
              Notes/Learning Outcomes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you learn? How does this relate to your job role?"
              className="min-h-[80px] border-elec-yellow/20 bg-elec-gray"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Describe what you learned and how it relates to your apprenticeship standards
            </p>
          </div>
          
          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Saving Entry...</>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Time Entry
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TimeEntryForm;
