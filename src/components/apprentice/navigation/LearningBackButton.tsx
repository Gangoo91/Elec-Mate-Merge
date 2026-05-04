import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LearningBackButtonProps {
  currentPath: 'course' | 'unit' | 'section' | 'subsection';
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
  subsectionId?: string;
  className?: string;
}

const LearningBackButton = ({
  currentPath,
  courseSlug,
  unitSlug,
  sectionId,
  subsectionId,
  className,
}: LearningBackButtonProps) => {
  const navigate = useNavigate();

  const effectiveCourseSlug = courseSlug || 'level-2-diploma';

  const path = window.location.pathname;
  const isElectricalTheory = path.includes('/elec2-04') || path.includes('/electrical-theory');

  let effectiveUnitSlug = unitSlug;
  if (isElectricalTheory) {
    effectiveUnitSlug = 'elec2-04';
  } else if (!effectiveUnitSlug) {
    effectiveUnitSlug = 'health-safety';
  }

  const handleBackClick = () => {
    console.log('LearningBackButton: navigating from', {
      currentPath,
      courseSlug,
      unitSlug,
      sectionId,
      subsectionId,
    });
    console.log('Using effective values:', {
      effectiveCourseSlug,
      effectiveUnitSlug,
      isElectricalTheory,
    });

    switch (currentPath) {
      case 'subsection': {
        const sectionPath = `/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}/section/${sectionId}`;
        console.log('Navigating to section:', sectionPath);
        navigate(sectionPath);
        break;
      }
      case 'section':
        navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`);
        break;
      case 'unit':
        navigate(`/apprentice/study/eal/${effectiveCourseSlug}`);
        break;
      case 'course':
        navigate('/apprentice/study/eal');
        break;
      default:
        navigate(-1);
    }
  };

  const getButtonText = () => {
    switch (currentPath) {
      case 'subsection':
        return 'Back to section';
      case 'section':
        return 'Back to unit';
      case 'unit':
        return 'Back to course';
      case 'course':
        return 'Back to courses';
      default:
        return 'Back';
    }
  };

  return (
    <Button
      variant="ghost"
      className={`text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation ${className || ''}`}
      onClick={handleBackClick}
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      <span>{getButtonText()}</span>
    </Button>
  );
};

export default LearningBackButton;
