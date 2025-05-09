
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCardGrid from "@/components/apprentice/CourseCardGrid";
import OffJobTrainingInfo from "@/components/apprentice/OffJobTrainingInfo";
import { courseCategories } from "@/data/courseCategories";

const ApprenticeStudy = () => {
  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <StudyHeader />
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-elec-yellow">Electrical Courses</h2>
        <p className="text-muted-foreground">Industry-standard qualifications for electrical professionals</p>
      </div>

      <CourseCardGrid courses={courseCategories} />
      
      <OffJobTrainingInfo />
    </div>
  );
};

export default ApprenticeStudy;
