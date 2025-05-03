
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import UnitProgressBar from "@/components/apprentice/UnitProgressBar";
import UnitResourceList from "@/components/apprentice/UnitResourceList";
import type { CourseUnit } from "@/data/courseUnits";

interface UnitDetailsProps {
  unit: CourseUnit;
  onResourceClick: (type: string) => void;
  completedResources: Record<string, boolean>;
  onToggleResourceComplete: (resourceId: string) => void;
}

const UnitDetails = ({ unit, onResourceClick, completedResources, onToggleResourceComplete }: UnitDetailsProps) => {
  // Calculate progress for this unit
  const calculateProgress = () => {
    if (unit.resources.length === 0) return 0;
    
    const completedCount = unit.resources.filter(
      resource => completedResources[resource.id]
    ).length;
    
    return Math.round((completedCount / unit.resources.length) * 100);
  };

  const progressPercent = calculateProgress();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="h-6 w-6 text-elec-yellow" />
          <h2 className="text-xl font-semibold">{unit.title} <span className="text-elec-yellow">({unit.code})</span></h2>
        </div>
        
        <p className="text-muted-foreground">{unit.description}</p>
        
        <UnitProgressBar progressPercent={progressPercent} />
        
        <UnitResourceList 
          resources={unit.resources}
          onResourceClick={onResourceClick}
          completedResources={completedResources}
          onToggleResourceComplete={onToggleResourceComplete}
        />
      </CardContent>
    </Card>
  );
};

export default UnitDetails;
