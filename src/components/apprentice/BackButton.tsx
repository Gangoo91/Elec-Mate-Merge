
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
};

const BackButton = ({ courseSlug, unitSlug, sectionId }: BackButtonProps) => {
  const navigate = useNavigate();
  const params = useParams();
  
  // Use provided props or fallback to params from router
  const course = courseSlug || params.courseSlug;
  const unit = unitSlug || params.unitSlug;
  const section = sectionId || params.sectionId;

  const handleBackClick = () => {
    console.log("Back button clicked with params:", { course, unit, section });
    
    // Check if we're on a subsection page
    const isSubsectionPage = window.location.pathname.includes('/subsection/');
    
    if (course && unit && section && isSubsectionPage) {
      // We're on a subsection page, navigate back to the section page
      const isHealthSafetyUnit = unit.includes('elec2-01');
      const isElectricalTheoryUnit = unit.includes('elec2-04');
      const isInstallationMethodsUnit = unit.includes('elec2-05a');
      
      if (isHealthSafetyUnit) {
        // Navigate back to the health and safety section page
        navigate(`/apprentice/study/eal/${course}/unit/${unit}/section/${section}`);
      } else if (isElectricalTheoryUnit) {
        // Navigate back to the electrical theory section page
        navigate(`/apprentice/study/eal/${course}/unit/${unit}/section/${section}`);
      } else if (isInstallationMethodsUnit) {
        // Navigate back to the installation methods section page  
        navigate(`/apprentice/study/eal/${course}/unit/${unit}/installation-method/${section}`);
      } else {
        // Fallback to unit page
        navigate(`/apprentice/study/eal/${course}/unit/${unit}`);
      }
    } else if (course && unit) {
      // Fix for section pages: We need to navigate back to section list, not unit list
      if (window.location.pathname.includes('/section/')) {
        // We're on a section page, navigate to the appropriate unit content page
        navigate(`/apprentice/study/eal/${course}/unit/${unit}`);
      } else {
        // Navigate to course page as fallback
        navigate(`/apprentice/study/eal/${course}`);
      }
    } else {
      // Last resort fallback - just go back in history
      navigate(-1);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="border-elec-yellow/30 hover:bg-elec-yellow/10 px-4 py-2 h-auto text-sm md:text-base flex items-center gap-2 w-full md:w-auto"
      onClick={handleBackClick}
    >
      <ArrowLeft className="h-4 w-4 flex-shrink-0" />
      <span>Back to Section</span>
    </Button>
  );
};

export default BackButton;
