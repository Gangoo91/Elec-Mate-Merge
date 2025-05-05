
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
};

const BackButton = ({ courseSlug, unitSlug, sectionId }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (courseSlug && unitSlug && sectionId) {
      // Navigate back to the section page
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/section/${sectionId}`);
    } else if (courseSlug && unitSlug) {
      // Fallback to unit page
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
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
