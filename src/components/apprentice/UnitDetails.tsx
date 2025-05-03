
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ResourceCard from "@/components/apprentice/ResourceCard";
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
        
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Unit Progress</span>
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-elec-yellow/20" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <h4 className="font-semibold col-span-full">Learning Resources</h4>
          {unit.resources.map(resource => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              cta={resource.type === 'video' ? 'Watch Video' : resource.type === 'document' ? 'Read Document' : 'Start Activity'}
              href={resource.href}
              duration={resource.duration}
              onClick={() => onResourceClick(resource.type)}
              isCompleted={!!completedResources[resource.id]}
              onToggleComplete={() => onToggleResourceComplete(resource.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitDetails;
