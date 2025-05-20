
import StudyHeader from "@/components/apprentice/StudyHeader";
import { GraduationCap, FileText, Book, School, BookOpen, Library, Briefcase, Calculator } from "lucide-react";
import CourseCard from "@/components/apprentice/CourseCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          description="Fundamental electrical installation knowledge for apprentices"
          icon={Book}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="level-3"
          title="Level 3 Electrical Installation"
          description="Advanced electrical installation techniques and knowledge"
          icon={BookOpen}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="inspection-testing"
          title="Inspection & Testing"
          description="Comprehensive guide to electrical inspection and testing procedures"
          icon={FileText}
          courses={[]}
          baseUrl="/apprentice/study/inspection-testing"
        />
        
        <CourseCard 
          id="18th-edition"
          title="18th Edition (BS 7671)"
          description="Study materials for the 18th Edition wiring regulations"
          icon={Library}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="on-site-skills"
          title="On-Site Apprenticeship Skills"
          description="Practical skills for on-site electrical work"
          icon={Briefcase}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="am2-prep"
          title="AM2 / AM2S Prep"
          description="Preparation materials for AM2 and AM2S assessments"
          icon={GraduationCap}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="maths-refresher"
          title="Maths Refresher"
          description="Essential mathematical concepts for electrical work"
          icon={Calculator}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="ai-learning"
          title="AI Learning Tools"
          description="Interactive AI-powered learning resources"
          icon={School}
          courses={[]}
          baseUrl="/apprentice/study"
        />
        
        <CourseCard 
          id="mock-exams"
          title="Mock Exams"
          description="Practice exams for electrical qualifications"
          icon={FileText}
          courses={[]}
          baseUrl="/apprentice/study/mock-exams"
        />
      </div>
      
      <div className="flex justify-center mt-8">
        <Link to="/apprentice/study/course-content">
          <Button className="bg-elec-yellow hover:bg-amber-500 text-elec-dark">
            View All Course Content
          </Button>
        </Link>
      </div>
      
      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-4 mt-8 flex items-start gap-3">
        <FileText className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
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
