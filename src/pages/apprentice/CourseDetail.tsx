
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ealLevel2Units } from "@/data/courseUnits";
import CourseTimer from "@/components/apprentice/CourseTimer";
import CourseHeader from "@/components/apprentice/CourseHeader";
import CourseContent from "@/components/apprentice/CourseContent";
import { useStudySession } from "@/hooks/useStudySession";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CourseDetail = () => {
  const { courseSlug, unitSlug } = useParams();
  const location = useLocation();
  const isUnitPage = location.pathname.includes('/unit/');
  const isQuizPage = location.pathname.includes('/quiz');
  const isSubsectionPage = location.pathname.includes('/section/');
  
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  
  // Get course title from slug
  const courseTitle = courseSlug?.split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Use our custom hook for study session management
  const {
    isStudying,
    elapsedTime,
    todayTotal,
    currentResourceType,
    completedResources,
    handleStartStudy,
    handleStopStudy,
    handleResourceClick,
    handleToggleResourceComplete
  } = useStudySession({ courseSlug });

  useEffect(() => {
    // If there's a unitSlug in the URL, find and select that unit
    if (unitSlug) {
      const matchedUnit = ealLevel2Units.find(unit => {
        const generatedSlug = unit.code.toLowerCase().replace('/', '-') + '-' + 
          unit.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        return generatedSlug === unitSlug;
      });
      
      if (matchedUnit) {
        setSelectedUnit(matchedUnit.id);
      }
    }
  }, [unitSlug]);

  // Handler for unit selection
  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId);
  };

  // Find the selected unit for display
  const selectedUnitData = selectedUnit 
    ? ealLevel2Units.find(unit => unit.id === selectedUnit) 
    : null;

  // Automatically trigger learning mode when viewing sections or subsections
  useEffect(() => {
    if ((isUnitPage || isSubsectionPage) && !isStudying && !currentResourceType) {
      handleResourceClick('learning');
    }
  }, [isUnitPage, isSubsectionPage, location.pathname]);

  return (
    <div className="space-y-8 animate-fade-in px-4 md:px-6 lg:px-8">
      {!isUnitPage && <CourseHeader courseTitle={courseTitle} />}

      {/* Back button - only show on unit page */}
      {isUnitPage && courseSlug && !isQuizPage && !isSubsectionPage && (
        <div className="mb-4">
          <Link to={`/apprentice/study/eal/${courseSlug}`}>
            <Button 
              variant="outline" 
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Units
            </Button>
          </Link>
        </div>
      )}

      {/* Timer - show on all pages but quiz */}
      {!isQuizPage && (
        <CourseTimer 
          courseSlug={courseSlug}
          isStudying={isStudying}
          elapsedTime={elapsedTime}
          todayTotal={todayTotal}
          currentResourceType={currentResourceType}
          onStartStudy={handleStartStudy}
          onStopStudy={handleStopStudy}
        />
      )}
      
      {/* Course Content - show on all pages including section pages */}
      <CourseContent 
        isUnitPage={isUnitPage}
        selectedUnit={selectedUnit}
        courseSlug={courseSlug}
        selectedUnitData={selectedUnitData}
        completedResources={completedResources}
        onUnitSelect={handleUnitSelect}
        onResourceClick={handleResourceClick}
        onToggleResourceComplete={handleToggleResourceComplete}
        units={ealLevel2Units}
        showOnSectionPages={isSubsectionPage} // New prop to control visibility on section pages
      />
    </div>
  );
};

export default CourseDetail;
