
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCard from "@/components/apprentice/CourseCard";
import OffJobTrainingInfo from "@/components/apprentice/OffJobTrainingInfo";
import { courseCategories } from "@/data/courseCategories";

const ApprenticeStudy = () => {
  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <StudyHeader />
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-elec-yellow">Level 3 Electrical Courses</h2>
        <p className="text-muted-foreground">Advanced electrical training for qualified professionals</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseCategories.map((category) => (
          <CourseCard 
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            courses={category.courses}
          />
        ))}
      </div>
      
      <OffJobTrainingInfo />
    </div>
  );
};

export default ApprenticeStudy;
