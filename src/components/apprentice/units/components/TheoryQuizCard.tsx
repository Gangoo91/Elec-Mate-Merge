
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface TheoryQuizCardProps {
  courseSlug: string;
  unitCode: string;
  quizCompleted: boolean;
  onClick: () => void;
}

const TheoryQuizCard = ({ 
  courseSlug, 
  unitCode, 
  quizCompleted,
  onClick
}: TheoryQuizCardProps) => {
  const unitCodeFormatted = unitCode.toLowerCase().replace('/', '-');
  
  return (
    <Link
      to={`/apprentice/study/eal/${courseSlug}/unit/${unitCodeFormatted}/quiz`}
      onClick={onClick}
      className="block transition-transform hover:scale-102 duration-200 h-full"
    >
      <Card className="border-elec-yellow/30 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 h-full">
        <CardContent className="p-6 h-full relative">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
                <span className="text-elec-dark font-bold text-lg">Q</span>
              </div>
              <h3 className="text-lg font-medium">Assessment Quiz</h3>
            </div>
            <p className="text-sm text-muted-foreground pl-[52px]">
              Electrical Theory Assessment Quiz
            </p>
          </div>
          
          {quizCompleted && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default TheoryQuizCard;
