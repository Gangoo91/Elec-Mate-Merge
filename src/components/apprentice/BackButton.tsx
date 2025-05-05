
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface BackButtonProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
}

const BackButton = ({ courseSlug, unitSlug, sectionId }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    const isSubsectionPath = location.pathname.includes('/subsection/');
    
    if (isSubsectionPath && courseSlug && unitSlug && sectionId) {
      // If we're in a subsection, navigate back to the section
      if (location.pathname.includes('/craft-skills/')) {
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/craft-skills/${sectionId}`);
      } else if (location.pathname.includes('/installation-method/')) {
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/installation-method/${sectionId}`);
      } else {
        navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}`);
      }
    } else if (courseSlug && unitSlug) {
      // From section pages, go back to unit
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    } else {
      // Fallback to going back one step
      navigate(-1);
    }
  };

  // Determine the button text based on the path
  const getButtonText = () => {
    if (location.pathname.includes('/subsection/')) {
      return "Back to Section";
    } else {
      return "Back to Unit";
    }
  };

  return (
    <Button 
      variant="outline" 
      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
      onClick={handleBackClick}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {getButtonText()}
    </Button>
  );
};

export default BackButton;
