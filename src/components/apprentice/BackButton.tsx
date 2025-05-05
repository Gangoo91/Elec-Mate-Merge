
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
    if (course && unit && section) {
      // Determine the correct back navigation path based on unit type
      const isElectricalTheoryUnit = unit.includes('elec2-01') || unit.includes('elec2-04');
      const isInstallationMethodsUnit = unit.includes('elec2-05a');
      
      if (isElectricalTheoryUnit) {
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
      // Fallback to unit page
      navigate(`/apprentice/study/eal/${course}/unit/${unit}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
      onClick={handleBackClick}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Section
    </Button>
  );
};

export default BackButton;
