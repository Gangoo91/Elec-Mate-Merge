
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";
import { legislationSubsections, rolesResponsibilitiesSubsections } from "@/data/healthAndSafety/subsections";

interface HealthSafetyUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const HealthSafetyUnit = ({ unitCode, onResourceClick }: HealthSafetyUnitProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { courseSlug } = useParams();
  
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Health and Safety Content */}
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
        
        {/* Legislation and Regulations Section */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/legislation`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-4 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">L</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Legislation and Regulations</h3>
              </div>
              
              <div className="flex justify-end mt-auto pt-2">
                <BookOpen className="h-5 w-5 text-elec-yellow opacity-70" />
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Roles and Responsibilities Section */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/roles`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-4 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">R</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Roles and Responsibilities</h3>
              </div>
              
              <div className="flex justify-end mt-auto pt-2">
                <BookOpen className="h-5 w-5 text-elec-yellow opacity-70" />
              </div>
            </CardContent>
          </Card>
        </Link>
        
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
