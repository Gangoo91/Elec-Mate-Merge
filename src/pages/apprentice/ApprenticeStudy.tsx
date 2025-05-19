
import StudyHeader from "@/components/apprentice/StudyHeader";
import { GraduationCap, Shield, FileText, AlertTriangle, Book, School, BookOpen, Library, Briefcase } from "lucide-react";
import CourseCard from "@/components/apprentice/CourseCard";

const ApprenticeStudy = () => {
  return (
    <div className="space-y-8 animate-fade-in px-2 md:px-0">
      <StudyHeader />
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-elec-yellow">Learning Resources</h2>
        <p className="text-muted-foreground">Tools and resources to support your electrical education</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <CourseCard 
          id="level-2"
          title="Level 2 Electrical Installation"
          description=""
          icon={Book}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="level-3"
          title="Level 3 Electrical Installation"
          description=""
          icon={BookOpen}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="inspection-testing"
          title="Inspection & Testing"
          description=""
          icon={FileText}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="18th-edition"
          title="18th Edition (BS 7671)"
          description=""
          icon={Library}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="on-site-skills"
          title="On-Site Apprenticeship Skills"
          description=""
          icon={Briefcase}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="am2-prep"
          title="AM2 / AM2S Prep"
          description=""
          icon={GraduationCap}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="ai-learning"
          title="AI Learning Tools"
          description=""
          icon={School}
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
