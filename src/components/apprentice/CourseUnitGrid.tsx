
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CourseUnit } from "@/data/courseUnits";

interface CourseUnitGridProps {
  units: CourseUnit[];
  selectedUnit: string | null;
  onUnitSelect: (unitId: string) => void;
}

const CourseUnitGrid = ({ units, selectedUnit, onUnitSelect }: CourseUnitGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.map(unit => (
        <Card 
          key={unit.id}
          className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors cursor-pointer 
            ${selectedUnit === unit.id ? 'ring-2 ring-elec-yellow' : ''}`}
          onClick={() => onUnitSelect(unit.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">{unit.title}</h3>
                <p className="text-sm text-elec-yellow mb-2">{unit.code}</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{unit.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseUnitGrid;
