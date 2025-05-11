
import { useParams, useSearchParams } from "react-router-dom";
import type { CourseUnit } from "@/data/courseTypes";
import HealthSafetyUnit from "./units/HealthSafetyUnit";
import ElectricalTheoryUnit from "./units/ElectricalTheoryUnit";
import InstallationMethodsUnit from "./units/InstallationMethodsUnit";
import CraftSkillsUnit from "./units/CraftSkillsUnit";
import ElectricalScienceUnit from "./units/ElectricalScienceUnit";

interface UnitDetailsProps {
  unit: CourseUnit;
  onResourceClick: (type: string) => void;
  completedResources: Record<string, boolean>;
  onToggleResourceComplete: (resourceId: string) => void;
}

const UnitDetails = ({ 
  unit, 
  onResourceClick,
  completedResources,
  onToggleResourceComplete 
}: UnitDetailsProps) => {
  const { courseSlug } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  
  // Determine which content to show based on unit code
  const showHealthSafetyContent = unit.code === "ELEC2/01";
  const showElectricalTheoryContent = unit.code === "ELEC2/04";
  const showInstallationMethodsContent = unit.code === "ELEC2/05A";
  const showCraftSkillsContent = unit.code === "ELEC2/05B";
  const showScienceContent = unit.code === "ELEC2/08";

  return (
    <div className="space-y-6 animate-fade-in">
      {showHealthSafetyContent && (
        <HealthSafetyUnit 
          unitCode={unit.code} 
          onResourceClick={onResourceClick} 
        />
      )}

      {showElectricalTheoryContent && (
        <ElectricalTheoryUnit 
          unitCode={unit.code} 
          onResourceClick={onResourceClick} 
        />
      )}

      {showInstallationMethodsContent && (
        <InstallationMethodsUnit 
          unitCode={unit.code} 
          onResourceClick={onResourceClick} 
        />
      )}

      {showCraftSkillsContent && (
        <CraftSkillsUnit 
          unitCode={unit.code} 
          onResourceClick={onResourceClick} 
        />
      )}

      {showScienceContent && (
        <ElectricalScienceUnit 
          unitCode={unit.code} 
          onResourceClick={onResourceClick} 
        />
      )}
    </div>
  );
};

export default UnitDetails;
