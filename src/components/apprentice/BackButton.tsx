
import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  subsectionId?: string;
};

const BackButton = ({ courseSlug, unitSlug, sectionId, subsectionId }: BackButtonProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  // Use provided props or fallback to params from router
  const course = courseSlug || params.courseSlug;
  const unit = unitSlug || params.unitSlug;
  const section = sectionId || params.sectionId;
  const subsection = subsectionId || params.subsectionId;

  const handleBackClick = () => {
    console.log("BackButton: Current path:", location.pathname);
    console.log("BackButton: Params:", { course, unit, section, subsection });
    
    // Determine the current page type based on URL and parameters
    const isSubsectionPage = location.pathname.includes('/subsection/');
    const isSectionPage = location.pathname.includes('/section/') && !isSubsectionPage;
    const isUnitPage = location.pathname.includes('/unit/') && !isSectionPage && !isSubsectionPage;
    
    console.log("BackButton: Page types:", { isSubsectionPage, isSectionPage, isUnitPage });
    
    // From subsection page → section page
    if (isSubsectionPage && course && unit && section) {
      console.log("BackButton: Navigating from subsection to section");
      navigate(`/apprentice/study/eal/${course}/unit/${unit}/section/${section}`);
      return;
    }
    
    // From section page → unit page
    if (isSectionPage && course && unit) {
      console.log("BackButton: Navigating from section to unit");
      navigate(`/apprentice/study/eal/${course}/unit/${unit}`);
      return;
    }
    
    // From unit page → course page
    if (isUnitPage && course) {
      console.log("BackButton: Navigating from unit to course");
      navigate(`/apprentice/study/eal/${course}`);
      return;
    }
    
    // Fallback: just go back in history
    console.log("BackButton: Using history fallback navigation");
    navigate(-1);
  };

  // Determine button text based on context
  const getButtonText = () => {
    if (location.pathname.includes('/subsection/')) {
      return "Back to Section";
    } else if (location.pathname.includes('/section/')) {
      return "Back to Unit";
    } else if (location.pathname.includes('/unit/')) {
      return "Back to Course";
    } else {
      return "Back";
    }
  };

  return (
    <Button 
      variant="outline" 
      className="border-elec-yellow/30 hover:bg-elec-yellow/10 px-4 py-2 h-auto text-sm md:text-base flex items-center gap-2 w-full md:w-auto"
      onClick={handleBackClick}
    >
      <ArrowLeft className="h-4 w-4 flex-shrink-0" />
      <span>{getButtonText()}</span>
    </Button>
  );
};

export default BackButton;
