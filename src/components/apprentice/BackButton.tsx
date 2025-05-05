
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  courseSlug?: string;
  unitSlug?: string;
}

const BackButton = ({ courseSlug, unitSlug }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (courseSlug && unitSlug) {
      // Always navigate back to unit page directly
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    } else {
      // Fallback to going back one step
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
      Back to Unit
    </Button>
  );
};

export default BackButton;
