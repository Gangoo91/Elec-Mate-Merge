
import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  const location = useLocation();
  
  // Use provided props or fallback to params from router
  const course = courseSlug || params.courseSlug;
  const unit = unitSlug || params.unitSlug;
  const section = sectionId || params.sectionId;

  const handleBackClick = () => {
    console.log("Back button clicked with params:", { course, unit, section });
    console.log("Current path:", location.pathname);
    console.log("Current full URL:", window.location.href);
    
    // Check if we're on an installation-method page
    const isInstallationMethodPage = location.pathname.includes('/installation-method/');
    
    // Check if we're on a craft-skills page
    const isCraftSkillsPage = location.pathname.includes('/craft-skills/');
    
    // Check if we're on a section page (but not subsection)
    const isSectionPage = location.pathname.includes('/section/') && !location.pathname.includes('/subsection/');
    
    // Check if we're on a subsection page
    const isSubsectionPage = location.pathname.includes('/subsection/');
    
    // More detailed logging to help with debugging
    console.log("Path analysis:", { 
      isInstallationMethodPage, 
      isCraftSkillsPage,
      isSectionPage, 
      isSubsectionPage
    });
    
    // Handle subsection pages - navigate back to the section page
    if (isSubsectionPage && course && unit && section) {
      if (isInstallationMethodPage) {
        navigate(`/apprentice/study/eal/${course}/unit/${unit}/installation-method/${section}`);
      } else if (isCraftSkillsPage) {
        navigate(`/apprentice/study/eal/${course}/unit/${unit}/craft-skills/${section}`);
      } else {
        navigate(`/apprentice/study/eal/${course}/unit/${unit}/section/${section}`);
      }
      return;
    }
    
    // Handle section pages - navigate to the unit page
    if (isSectionPage || isInstallationMethodPage || isCraftSkillsPage) {
      if (course && unit) {
        navigate(`/apprentice/study/eal/${course}/unit/${unit}`);
        return;
      }
    }
    
    // Handle unit page - go back to courses
    if (location.pathname.includes('/unit/') && !isSectionPage && !isSubsectionPage && course) {
      navigate(`/apprentice/study/eal/${course}`);
      return;
    }
    
    // Last resort fallback - just go back in history
    navigate(-1);
  };

  // Determine button text based on context
  const getButtonText = () => {
    if (location.pathname.includes('/subsection/')) {
      return "Back to Section";
    } else if (location.pathname.includes('/section/') || 
               location.pathname.includes('/installation-method/') || 
               location.pathname.includes('/craft-skills/')) {
      return "Back to Unit Sections";
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
