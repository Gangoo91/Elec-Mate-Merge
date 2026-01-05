import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { emergencyLightingModule6Section2QuizData } from '@/data/upskilling/emergencyLightingModule6Section2QuizData';

export const FireSafetyIntegrationQuiz = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-dark border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-elec-yellow" />
          Quiz: Fire Safety Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SingleQuestionQuiz 
          questions={emergencyLightingModule6Section2QuizData}
          title="Test your knowledge of fire safety regulations and emergency lighting integration"
        />
      </CardContent>
    </Card>
  );
};
