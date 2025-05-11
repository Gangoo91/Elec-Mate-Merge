
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCardGrid from "@/components/apprentice/CourseCardGrid";
import OffJobTrainingInfo from "@/components/apprentice/OffJobTrainingInfo";
import { courseCategories } from "@/data/courseCategories";
import { Link } from "react-router-dom";
import { GraduationCap, Shield, FileText } from "lucide-react";
import CourseCard from "@/components/apprentice/CourseCard";

const ApprenticeStudy = () => {
  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <StudyHeader />
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-elec-yellow">Electrical Courses</h2>
        <p className="text-muted-foreground">Industry-standard qualifications for electrical professionals</p>
      </div>

      <CourseCardGrid courses={courseCategories} baseUrl="/apprentice/study" />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <CourseCard 
          id="ai-learning"
          title="AI Learning Tools"
          description=""
          icon={GraduationCap}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="mock-exams"
          title="Mock Exams"
          description=""
          icon={FileText}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="safety-fundamentals"
          title="Safety Fundamentals"
          description=""
          icon={Shield}
          courses={[]}
          baseUrl="/apprentice/study"
        />
      </div>
      
      <OffJobTrainingInfo />
    </div>
  );
};

export default ApprenticeStudy;
