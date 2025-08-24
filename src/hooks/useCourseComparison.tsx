import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

export const useCourseComparison = () => {
  const [selectedCourses, setSelectedCourses] = useState<(string | number)[]>([]);
  const [selectedCourseData, setSelectedCourseData] = useState<EnhancedCareerCourse[]>([]);
  const { toast } = useToast();

  const addToComparison = (courseId: string | number, courseData?: EnhancedCareerCourse) => {
    if (selectedCourses.length >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 courses at a time.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCourses.includes(courseId)) {
      setSelectedCourses(prev => [...prev, courseId]);
      if (courseData) {
        setSelectedCourseData(prev => [...prev, courseData]);
      }
      toast({
        title: "Course added to comparison",
        description: `Course has been added to your comparison.`,
        variant: "default"
      });
    }
  };

  const removeFromComparison = (courseId: string | number) => {
    setSelectedCourses(prev => prev.filter(id => id !== courseId));
    setSelectedCourseData(prev => prev.filter(course => course.id !== courseId));
  };

  const clearComparison = () => {
    setSelectedCourses([]);
    setSelectedCourseData([]);
  };

  const isInComparison = (courseId: string | number) => selectedCourses.includes(courseId);

  return { 
    addToComparison, 
    removeFromComparison, 
    clearComparison,
    isInComparison, 
    selectedCount: selectedCourses.length,
    selectedCourses,
    selectedCourseData
  };
};