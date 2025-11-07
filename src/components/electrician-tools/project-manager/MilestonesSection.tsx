import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface Milestone {
  milestone?: string;
  name?: string;
  date?: string;
}

interface MilestonesSectionProps {
  milestones: (Milestone | string)[];
}

const MilestonesSection = ({ milestones }: MilestonesSectionProps) => {
  if (!milestones || milestones.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckCircle2 className="h-5 w-5 text-pink-400" />
          Key Milestones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {milestones.map((milestone, idx) => {
          const text = typeof milestone === 'string' 
            ? milestone 
            : milestone.milestone || milestone.name || 'Milestone';
          const date = typeof milestone !== 'string' ? milestone.date : null;

          return (
            <div 
              key={idx} 
              className="flex items-center gap-3 text-sm p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0" />
              <div className="flex-1">{text}</div>
              {date && (
                <span className="text-muted-foreground text-xs">{date}</span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default MilestonesSection;
