
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PlannerFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  goals: string;
  setGoals: (goals: string) => void;
  isLoading: boolean;
  onGeneratePlan: () => void;
  onClose: () => void;
}

const PlannerForm = ({ 
  topic, 
  setTopic, 
  duration, 
  setDuration, 
  goals, 
  setGoals,
  isLoading, 
  onGeneratePlan, 
  onClose 
}: PlannerFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topic">Study Topic</Label>
        <Input
          id="topic"
          placeholder="e.g., Three-phase electrical systems, RCD protection, BS 7671 regulations"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration">Study Duration (weeks)</Label>
        <Input
          id="duration"
          type="number"
          min="1"
          max="12"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="goals">Learning Goals (optional)</Label>
        <Textarea
          id="goals"
          placeholder="e.g., Prepare for AM2 assessment, understand wiring regulations for domestic installations"
          className="min-h-[80px]"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </div>
      
      <div className="flex space-x-2">
        <Button 
          className="flex-1"
          onClick={onGeneratePlan}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Generating Plan...
            </>
          ) : (
            'Generate Study Plan'
          )}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default PlannerForm;
