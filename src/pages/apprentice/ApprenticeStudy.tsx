
import StudyHeader from "@/components/apprentice/StudyHeader";
import CourseCardGrid from "@/components/apprentice/CourseCardGrid";
import { courseCategories } from "@/data/courseCategories";
import { Link } from "react-router-dom";
import { GraduationCap, Shield, FileText, AlertTriangle } from "lucide-react";
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
      
      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-4 mt-8 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200/90">
          <strong>Disclaimer:</strong> ElecMate is not endorsed by, directly affiliated with, maintained, 
          authorised, or sponsored by EAL or City &amp; Guilds. All product names, logos, and brands are 
          property of their respective owners.
        </p>
      </div>
    </div>
  );
};

export default ApprenticeStudy;
