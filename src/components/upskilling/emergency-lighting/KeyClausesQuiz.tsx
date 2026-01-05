import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule6Section1QuizData } from '@/data/upskilling/emergencyLightingModule6Section1QuizData';

export const KeyClausesQuiz = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-dark border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-elec-yellow" />
          Quiz: BS 5266-1 and EN 1838 Standards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SingleQuestionQuiz 
          questions={emergencyLightingModule6Section1QuizData}
          title="Test your knowledge of BS 5266-1 and EN 1838"
        />
      </CardContent>
    </Card>
  );
};
