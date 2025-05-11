
import CourseUnitGrid from "@/components/apprentice/CourseUnitGrid";
import UnitDetails from "@/components/apprentice/UnitDetails";
import CourseInfoBox from "@/components/apprentice/CourseInfoBox";
import type { CourseUnit } from "@/data/courseTypes";

interface CourseContentProps {
  isUnitPage: boolean;
  selectedUnit: string | null;
  courseSlug?: string;
  selectedUnitData: CourseUnit | null;
  completedResources: Record<string, boolean>;
  onUnitSelect: (unitId: string) => void;
  onResourceClick: (type: string) => void;
  onToggleResourceComplete: (resourceId: string) => void;
  units: CourseUnit[];
  showOnSectionPages?: boolean;
}

const CourseContent = ({
  isUnitPage,
  selectedUnit,
  courseSlug,
  selectedUnitData,
  completedResources,
  onUnitSelect,
  onResourceClick,
  onToggleResourceComplete,
  units,
  showOnSectionPages = false
}: CourseContentProps) => {
  // If we're on a section page and showOnSectionPages is false, don't render anything
  if (!showOnSectionPages && isUnitPage && location.pathname.includes('/section/')) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Course units grid - show on the main course page or if no unit is selected */}
      {!isUnitPage && (
        <CourseUnitGrid 
          units={units} 
          selectedUnit={selectedUnit} 
          onUnitSelect={onUnitSelect}
          completedResources={completedResources}
          courseSlug={courseSlug}
        />
      )}
      
      {/* Selected unit details - only show on unit-specific pages */}
      {isUnitPage && selectedUnitData && (
        <UnitDetails 
          unit={selectedUnitData} 
          onResourceClick={onResourceClick}
          completedResources={completedResources}
          onToggleResourceComplete={onToggleResourceComplete}
        />
      )}

      {/* Only show info box on main course page */}
      {!isUnitPage && <CourseInfoBox />}
    </div>
  );
};

export default CourseContent;
