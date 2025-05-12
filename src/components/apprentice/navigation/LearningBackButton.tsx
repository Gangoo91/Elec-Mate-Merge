
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LearningBackButtonProps {
  currentPath: 'course' | 'unit' | 'section' | 'subsection';
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  subsectionId?: string;
  className?: string;
}

const LearningBackButton = ({ 
  currentPath, 
  courseSlug, 
  unitSlug, 
  sectionId, 
  subsectionId,
  className
}: LearningBackButtonProps) => {
  const navigate = useNavigate();
  
  // Default values for navigation
  const effectiveCourseSlug = courseSlug || "level-2-diploma";
  // Check if we're in the electrical theory unit
  let effectiveUnitSlug = unitSlug;
  if (!effectiveUnitSlug) {
    // Detect if we're on an electrical theory page
    const path = window.location.pathname;
    if (path.includes("/elec2-04") || path.includes("/electrical-theory")) {
      effectiveUnitSlug = "elec2-04";
    } else {
      effectiveUnitSlug = "health-safety";
    }
  }

  const handleBackClick = () => {
    console.log("LearningBackButton: navigating from", { currentPath, courseSlug, unitSlug, sectionId, subsectionId });
    console.log("Using effective values:", { effectiveCourseSlug, effectiveUnitSlug });
    
    switch (currentPath) {
      case 'subsection':
        // From subsection → section (correct route for unit 1 sections)
        navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}/section/${sectionId}`);
        break;
      case 'section':
        // From section → unit
        navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`);
        break;
      case 'unit':
        // From unit → course
        navigate(`/apprentice/study/eal/${effectiveCourseSlug}`);
        break;
      case 'course':
        // From course → courses list
        navigate("/apprentice/study/eal");
        break;
      default:
        // Fallback
        navigate(-1);
    }
  };

  const getButtonText = () => {
    switch (currentPath) {
      case 'subsection':
        return "Back to Section";
      case 'section':
        return "Back to Unit";
      case 'unit':
        return "Back to Course";
      case 'course':
        return "Back to Courses";
      default:
        return "Back";
    }
  };

  return (
    <Button 
      variant="outline" 
      className={`border-elec-yellow/30 hover:bg-elec-yellow/10 px-4 py-2 h-auto flex items-center gap-2 ${className || ""}`}
      onClick={handleBackClick}
    >
      <ArrowLeft className="h-4 w-4 flex-shrink-0" />
      <span>{getButtonText()}</span>
    </Button>
  );
};

export default LearningBackButton;
