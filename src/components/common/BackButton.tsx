
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  
  // Helper function to add courseId to URL if present
  const addCourseIdToUrl = (url: string) => {
    if (courseId) {
      return url.includes('?') ? `${url}&courseId=${courseId}` : `${url}?courseId=${courseId}`;
    }
    return url;
  };

  const handleClick = () => {
    if (customUrl) {
      navigate(addCourseIdToUrl(customUrl));
      return;
    }

    if (courseSlug && unitSlug && sectionId) {
      // We have section ID, navigate to unit page
      const url = `/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`;
      navigate(addCourseIdToUrl(url));
    } else if (courseSlug && unitSlug) {
      // We have unit slug, navigate to course page
      const url = `/apprentice/study/eal/${courseSlug}`;
      navigate(addCourseIdToUrl(url));
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
      className="border-elec-yellow/30 hover:bg-elec-yellow/10 flex items-center gap-2"
      onClick={handleClick}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default BackButton;
