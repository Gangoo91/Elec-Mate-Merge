import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, BookOpen, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";

interface HealthSafetyUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const HealthSafetyUnit = ({ unitCode, onResourceClick }: HealthSafetyUnitProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { courseSlug, sectionId } = useParams();
  
  // Load completion status
  useEffect(() => {
    const storedQuizStatus = localStorage.getItem(`unit_${unitCode}_quiz_completed`);
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, [unitCode]);

  const handleSectionClick = () => {
    // Report study activity when opening a section
    onResourceClick('learning');
  };

  // Create a URL slug from a section number and title
  const createSectionSlug = (sectionNumber: string) => {
    return sectionNumber.toLowerCase().replace(/\//g, "-");
  };
  
  // Section 1 specific content
  const renderSection1Content = () => {
    return (
      <div className="space-y-6 mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">Health and Safety in Electrical Work</h2>
        <p className="text-elec-light/80">
          This section covers the key legislation and regulations that govern health and safety in electrical work, 
          along with the roles and responsibilities of different stakeholders in maintaining a safe work environment.
        </p>
        
        {/* Subsections for Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Legislation and Regulations subsection */}
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20">
            <Link 
              to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/1/subsection/1.1`}
              onClick={handleSectionClick}
              className="block h-full"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                    <Shield className="h-5 w-5 text-elec-dark" />
                  </div>
                  <CardTitle className="text-lg">Legislation and Regulations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-elec-light/80">
                  Study of key health and safety laws relevant to electrical work, including the Health 
                  and Safety at Work Act, Electricity at Work Regulations, and COSHH.
                </CardDescription>
                <div className="flex justify-end mt-4">
                  <BookOpen className="h-5 w-5 text-elec-yellow opacity-70" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          {/* Roles and Responsibilities subsection */}
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20">
            <Link 
              to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/1/subsection/1.2`}
              onClick={handleSectionClick}
              className="block h-full"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                    <Users className="h-5 w-5 text-elec-dark" />
                  </div>
                  <CardTitle className="text-lg">Roles and Responsibilities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-elec-light/80">
                  Identification of duties for employers, employees, and other stakeholders in 
                  maintaining a safe working environment.
                </CardDescription>
                <div className="flex justify-end mt-4">
                  <BookOpen className="h-5 w-5 text-elec-yellow opacity-70" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Display Section 1 specific content if we're on section 1 */}
      {sectionId === "1" && renderSection1Content()}
      
      {/* Original Health and Safety Content - keep this for other sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthAndSafetyContent.map((section) => {
          const sectionSlug = createSectionSlug(section.sectionNumber);
          return (
            <Link
              key={section.sectionNumber}
              to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/${sectionSlug}`}
              onClick={handleSectionClick}
              className="block transition-transform hover:scale-102 duration-200"
            >
              <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
                <CardContent className="flex flex-col p-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                      <span className="text-elec-dark font-bold text-lg">{section.sectionNumber}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium leading-tight">{section.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        
        {/* Quiz Section */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/quiz`}
          onClick={() => {
            handleSectionClick();
            onResourceClick('assessment');
          }}
          className="block transition-transform hover:scale-102 duration-200"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-4 h-full relative">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">Q</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Health & Safety Assessment Quiz</h3>
              </div>
              
              {quizCompleted && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              )}
              
              <div className="flex justify-end mt-auto pt-2">
                <BookOpen className="h-5 w-5 text-elec-yellow opacity-70" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default HealthSafetyUnit;
