
import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CourseUnit } from "@/data/courseUnits";

interface CourseUnitGridProps {
  units: CourseUnit[];
  selectedUnit: string | null;
  onUnitSelect: (unitId: string) => void;
  completedResources: Record<string, boolean>;
  courseSlug?: string;
}

const CourseUnitGrid = ({ 
  units, 
  selectedUnit, 
  onUnitSelect, 
  completedResources,
  courseSlug 
}: CourseUnitGridProps) => {
  const navigate = useNavigate();

  // Calculate progress percentage for each unit
  const calculateUnitProgress = (unit: CourseUnit) => {
    if (unit.resources.length === 0) return 0;
    
    const completedCount = unit.resources.filter(
      resource => completedResources[resource.id]
    ).length;
    
    return Math.round((completedCount / unit.resources.length) * 100);
  };

  // Create URL-friendly slug for the unit
  const createUnitSlug = (unit: CourseUnit) => {
    return unit.code.toLowerCase().replace('/', '-') + '-' + 
      unit.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const handleUnitClick = (unit: CourseUnit) => {
    onUnitSelect(unit.id);
    
    if (courseSlug) {
      const unitSlug = createUnitSlug(unit);
      const unitUrl = `/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`;
      navigate(unitUrl);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.map(unit => {
        const progressPercent = calculateUnitProgress(unit);
        
        return (
          <Card 
            key={unit.id}
            className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors cursor-pointer 
              ${selectedUnit === unit.id ? 'ring-2 ring-elec-yellow' : ''}`}
            onClick={() => handleUnitClick(unit)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg mb-1">{unit.title}</h3>
                  <p className="text-sm text-elec-yellow mb-2">{unit.code}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{unit.description}</p>
                  
                  <div className="w-full mt-2">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{progressPercent}%</span>
                    </div>
                    <Progress 
                      value={progressPercent} 
                      className="h-2 bg-elec-yellow/20" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseUnitGrid;
