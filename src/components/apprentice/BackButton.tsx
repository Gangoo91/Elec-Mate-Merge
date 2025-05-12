
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
}

const BackButton = ({ courseSlug, unitSlug, sectionId }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    // Get the current path to check if we're on the electrical theory unit
    const path = window.location.pathname;
    const isElectricalTheory = path.includes("/elec2-04") || path.includes("/electrical-theory");
    
    // Use the correct unit slug based on the path
    let effectiveUnitSlug = unitSlug;
    if (!effectiveUnitSlug && isElectricalTheory) {
      effectiveUnitSlug = "elec2-04";
    } else if (!effectiveUnitSlug) {
      effectiveUnitSlug = "health-safety";
    }
    
    // If we have a section ID, go back to the unit page
    if (sectionId && effectiveUnitSlug) {
      navigate(`/apprentice/study/eal/${courseSlug || 'level-2-diploma'}/unit/${effectiveUnitSlug}`);
    }
    // If we have only a unit ID, go back to the course page
    else if (effectiveUnitSlug) {
      navigate(`/apprentice/study/eal/${courseSlug || 'level-2-diploma'}`);
    } 
    // Otherwise, use the browser's history
    else {
      navigate(-1);
    }
  };
  
  return (
    <Button 
      variant="outline" 
      className="mb-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
      onClick={handleBackClick}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
};

export default BackButton;
