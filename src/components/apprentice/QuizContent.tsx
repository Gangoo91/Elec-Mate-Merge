
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import UnitQuiz from "@/components/apprentice/UnitQuiz";
import { healthAndSafetyQuizzes } from "@/data/unitQuizzes";
import { useToast } from "@/components/ui/use-toast";

const QuizContent = () => {
  const { courseSlug, unitSlug } = useParams();
  const { toast } = useToast();
  
  // Extract unit code from the unitSlug
  const unitCode = unitSlug?.includes('-') ? 
    unitSlug.split('-').slice(0, 2).join('/').toUpperCase() : '';
  
  const handleQuizComplete = (score: number) => {
    // Mark quiz as completed
    localStorage.setItem(`unit_${unitCode}_quiz_completed`, 'true');
    
    // Show toast
    toast({
      title: "Quiz Completed",
      description: `You scored ${score} out of 10. Your progress has been saved.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`}>
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Unit
          </Button>
        </Link>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg">
            Q
          </span>
          <h2 className="text-2xl font-bold">Knowledge Assessment Quiz</h2>
        </div>
        
        <div className="mt-6">
          <UnitQuiz
            unitCode={unitCode}
            questions={healthAndSafetyQuizzes.questions}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizContent;
