
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

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
  try {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const courseId = searchParams.get("courseId");
    
    // Helper function to add courseId to URL if present
    const addCourseIdToUrl = (url: string) => {
      if (courseId) {
        return url.includes('?') ? `${url}&courseId=${courseId}` : `${url}?courseId=${courseId}`;
      }
      return url;
    };

    const handleClick = () => {
      console.log('BackButton clicked:', { 
        currentPath: location.pathname, 
        customUrl, 
        courseSlug, 
        unitSlug, 
        sectionId 
      });

      if (customUrl) {
        const finalUrl = addCourseIdToUrl(customUrl);
        console.log('Navigating to custom URL:', finalUrl);
        navigate(finalUrl);
        return;
      }

      if (courseSlug && unitSlug && sectionId) {
        // We have section ID, navigate to unit page
        const url = `/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`;
        const finalUrl = addCourseIdToUrl(url);
        console.log('Navigating to unit page:', finalUrl);
        navigate(finalUrl);
      } else if (courseSlug && unitSlug) {
        // We have unit slug, navigate to course page
        const url = `/apprentice/study/eal/${courseSlug}`;
        const finalUrl = addCourseIdToUrl(url);
        console.log('Navigating to course page:', finalUrl);
        navigate(finalUrl);
      } else if (courseSlug) {
        // We have course slug, navigate to courses list
        console.log('Navigating to courses list');
        navigate('/apprentice/study/eal');
      } else {
        // No info, go back in history
        console.log('Going back in history');
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
  } catch (error) {
    console.warn('BackButton: Router context not available', error);
    // Fallback: render a disabled button
    return (
      <Button 
        variant="outline" 
        className="border-elec-yellow/30 hover:bg-elec-yellow/10 flex items-center gap-2"
        disabled
      >
        <ArrowLeft className="h-4 w-4" />
        {label}
      </Button>
    );
  }
};

export default BackButton;
