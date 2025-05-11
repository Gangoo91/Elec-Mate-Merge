
import { Link } from "react-router-dom";
import type { CourseUnit } from "@/data/courseUnits";
import { Card } from "@/components/ui/card";

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
  const handleUnitClick = (unitSlug: string) => {
    onUnitSelect(unitSlug);
  };
  
  // Filter out the ELEC2/04 unit since we're already on that page
  const filteredUnits = courseSlug === 'level-2-diploma-in-electrical-installation' ? 
    units.filter(unit => unit.slug !== 'elec2-04') : units;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredUnits.map((unit) => {
        // Calculate completion percentage for this unit
        const unitResources = Object.keys(completedResources).filter(key => key.startsWith(`${unit.code}-`));
        const completedCount = unitResources.filter(key => completedResources[key]).length;
        const totalCount = unitResources.length;
        const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        
        return (
          <Link
            key={unit.slug}
            to={`/apprentice/study/eal/${courseSlug}/unit/${unit.slug}`}
            onClick={() => handleUnitClick(unit.slug)}
            className="block"
          >
            <Card className={`h-full border-elec-yellow/20 bg-elec-gray p-6 transition-all duration-300 hover:border-elec-yellow/40 hover:bg-elec-gray/90 ${
              selectedUnit === unit.slug ? "border-elec-yellow ring-1 ring-elec-yellow/50" : ""
            }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-elec-yellow/10 rounded-lg flex items-center justify-center">
                    <span className="text-elec-yellow font-bold text-sm">{unit.code}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{unit.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-3">{unit.description}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-elec-yellow/80">Progress</span>
                    <span className="text-elec-yellow/80">{completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-elec-dark/50 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-elec-yellow/80 rounded-full" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default CourseUnitGrid;
