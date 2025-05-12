
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, BookOpen, Shield, Cable, Lightbulb, CircuitBoard, FileText, Info, ShieldAlert } from "lucide-react";

interface ElectricalTheoryUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const ElectricalTheoryUnit = ({ unitCode, onResourceClick }: ElectricalTheoryUnitProps) => {
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
      <h2 className="text-2xl font-bold">Electrical Installation Theory and Technology</h2>
      <p className="text-muted-foreground mb-6">
        This unit covers the essential theories, regulations, and technical information related to electrical installations.
      </p>
      
      {/* Electrical Theory Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Section 1 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/1`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">1</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Legislation, Regulations, and Guidance for Electrical Installation Work</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 2 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/2`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">2</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Technical Information Used in Electrical Work</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 3 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/3`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">3</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Properties, Applications, and Limitations of Different Wiring Systems</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 4 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/4`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">4</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">General Layout of Equipment at the Service Position</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 5 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/5`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">5</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Standard Lighting Circuits</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 6 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/6`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">6</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Standard Ring and Radial Final Circuits</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 7 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/7`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">7</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Basic Requirements for Circuits</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 8 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/8`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">8</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Importance of Earthing and Bonding for Protection</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 9 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/9`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">9</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Principles of Overcurrent Protection</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Section 10 */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/10`}
          onClick={handleSectionClick}
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">10</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Principles of Circuit Design</h3>
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
          className="block transition-transform hover:scale-102 duration-200 h-full"
        >
          <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
            <CardContent className="flex flex-col p-6 h-full relative">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg">Q</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium leading-tight">Electrical Theory Assessment Quiz</h3>
              </div>
              
              {quizCompleted && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ElectricalTheoryUnit;
