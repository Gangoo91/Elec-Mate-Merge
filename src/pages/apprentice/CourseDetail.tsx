
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import StudyHeader from "@/components/apprentice/StudyHeader";
import { courseUnits } from "@/data/courseUnits";
import { courseUnitsLevel3 } from "@/data/courseUnitsLevel3";
import { courseUnitsLevel4 } from "@/data/courseUnitsLevel4";
import CourseHeader from "@/components/apprentice/CourseHeader";
import CourseContent from "@/components/apprentice/CourseContent";
import BackButton from "@/components/common/BackButton";

const CourseDetail = () => {
  const { courseSlug, unitSlug } = useParams();
  const location = useLocation();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(unitSlug || null);
  const [completedResources, setCompletedResources] = useState<Record<string, boolean>>({});
  
  // Determine if we're on a unit page or the main course page
  const isUnitPage = location.pathname.includes('/unit/');
  
  // Determine which level of coursework we're viewing
  const isLevel3 = courseSlug?.includes('level-3');
  const isLevel4 = courseSlug?.includes('level-4');
  
  // Get the right units for the current level
  const units = isLevel3 ? courseUnitsLevel3 :
               isLevel4 ? courseUnitsLevel4 :
               courseUnits;
  
  // Find the selected unit data if we're on a unit page
  const selectedUnitData = selectedUnit 
    ? units.find(unit => unit.slug === selectedUnit) || null 
    : null;
  
  // Function to handle unit selection
  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId);
  };
  
  // Track mock resource completion in localStorage
  useEffect(() => {
    const storedCompletion = localStorage.getItem('completedResources');
    if (storedCompletion) {
      setCompletedResources(JSON.parse(storedCompletion));
    }
  }, []);
  
  // Function to handle resource clicks
  const handleResourceClick = (type: string) => {
    // This would typically log or track resource usage
    console.log(`Resource of type ${type} clicked`);
  };
  
  // Function to toggle resource completion status
  const handleToggleResourceComplete = (resourceId: string) => {
    setCompletedResources(prev => {
      const updated = { ...prev, [resourceId]: !prev[resourceId] };
      localStorage.setItem('completedResources', JSON.stringify(updated));
      return updated;
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in px-2 md:px-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <StudyHeader />
          {isUnitPage && (
            <BackButton 
              customUrl={`/apprentice/study/eal/${courseSlug}`} 
              label="Back to Course"
            />
          )}
        </div>
        
        <CourseHeader 
          courseSlug={courseSlug} 
          unitSlug={unitSlug} 
          selectedUnitData={selectedUnitData}
        />
      </div>
      
      <div className="bg-elec-gray/20 rounded-lg p-6">
        <CourseContent 
          isUnitPage={isUnitPage}
          selectedUnit={selectedUnit}
          courseSlug={courseSlug}
          selectedUnitData={selectedUnitData}
          completedResources={completedResources}
          onUnitSelect={handleUnitSelect}
          onResourceClick={handleResourceClick}
          onToggleResourceComplete={handleToggleResourceComplete}
          units={units}
        />
      </div>
    </div>
  );
};

export default CourseDetail;
