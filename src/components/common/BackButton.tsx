
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  customUrl?: string;
  label?: string;
}

const BackButton = ({ 
  courseSlug, 
  unitSlug, 
  sectionId, 
  customUrl,
  label = "Back" 
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (customUrl) {
      navigate(customUrl);
      return;
    }

    if (courseSlug && unitSlug && sectionId) {
      // We have section ID, navigate to unit page
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    } else if (courseSlug && unitSlug) {
      // We have unit slug, navigate to course page
      navigate(`/apprentice/study/eal/${courseSlug}`);
    } else if (courseSlug) {
      // We have course slug, navigate to courses list
      navigate('/apprentice/study/eal');
    } else {
      // No info, go back in history
      navigate(-1);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleClick}
      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default BackButton;
