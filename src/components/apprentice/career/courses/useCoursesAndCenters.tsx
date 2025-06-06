
import { useState } from "react";
import { careerCourses, trainingCenters, CareerCourse, TrainingCenter } from "./coursesData";
import { useForm } from "react-hook-form";

interface SearchFormValues {
  location: string;
  searchQuery: string;
}

export const useCoursesAndCentres = () => {
  const [activeTab, setActiveTab] = useState("courses"); // courses or centers
  const [selectedCourse, setSelectedCourse] = useState<CareerCourse | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<TrainingCenter | null>(null);
  
  const form = useForm<SearchFormValues>({
    defaultValues: {
      location: "All Locations",
      searchQuery: "",
    }
  });

  // Handle search (to be used by parent component)
  const handleSearch = (values: SearchFormValues) => {
    // This will be handled by the parent component now
    // since it needs to coordinate with location filtering
    return values;
  };
  
  const viewCourseDetails = (course: CareerCourse) => {
    setSelectedCourse(course);
  };
  
  const viewCenterDetails = (center: TrainingCenter) => {
    setSelectedCenter(center);
  };
  
  const handleClose = () => {
    setSelectedCourse(null);
    setSelectedCenter(null);
  };

  const resetFilters = () => {
    form.reset({
      location: "All Locations",
      searchQuery: ""
    });
  };

  return {
    activeTab,
    setActiveTab,
    selectedCourse,
    selectedCenter,
    form,
    handleSearch,
    viewCourseDetails,
    viewCenterDetails,
    handleClose,
    resetFilters
  };
};
