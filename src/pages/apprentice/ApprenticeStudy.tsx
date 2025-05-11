
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCardGrid from "@/components/apprentice/CourseCardGrid";
import OffJobTrainingInfo from "@/components/apprentice/OffJobTrainingInfo";
import { courseCategories } from "@/data/courseCategories";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Shield, FileText } from "lucide-react";

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
        <Link to="/apprentice/study/ai-learning" className="block h-full">
          <Button variant="outline" className="border-elec-yellow h-full w-full py-8 hover:bg-elec-yellow/10 flex flex-col gap-4">
            <div className="bg-elec-yellow/10 p-4 rounded-full">
              <GraduationCap className="h-8 w-8 text-elec-yellow" />
            </div>
            <span className="text-xl font-semibold">AI Learning Tools</span>
          </Button>
        </Link>
        
        <Link to="/apprentice/study/mock-exams" className="block h-full">
          <Button variant="outline" className="border-elec-yellow h-full w-full py-8 hover:bg-elec-yellow/10 flex flex-col gap-4">
            <div className="bg-elec-yellow/10 p-4 rounded-full">
              <FileText className="h-8 w-8 text-elec-yellow" />
            </div>
            <span className="text-xl font-semibold">Mock Exams</span>
          </Button>
        </Link>
        
        <Link to="/apprentice/safety-fundamentals" className="block h-full">
          <Button variant="outline" className="border-elec-yellow h-full w-full py-8 hover:bg-elec-yellow/10 flex flex-col gap-4">
            <div className="bg-elec-yellow/10 p-4 rounded-full">
              <Shield className="h-8 w-8 text-elec-yellow" />
            </div>
            <span className="text-xl font-semibold">Safety Fundamentals</span>
          </Button>
        </Link>
      </div>
      
      <OffJobTrainingInfo />
    </div>
  );
};

export default ApprenticeStudy;
