
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Trophy, Clock, Star } from 'lucide-react';

const QuizAssessment = () => {
  const assessments = [
    { 
      title: 'BS7671 Fundamentals', 
      questions: 20, 
      duration: '15 min',
      difficulty: 'Beginner',
      score: 85 
    },
    { 
      title: 'Testing & Inspection', 
      questions: 25, 
      duration: '20 min',
      difficulty: 'Intermediate',
      score: null 
    },
    { 
      title: 'Fault Finding', 
      questions: 30, 
      duration: '25 min',
      difficulty: 'Advanced',
      score: 78 
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-white/80 bg-white/5';
    }
  };

  return (
    <Card className="bg-card border-border lg:col-span-2 rounded-xl sm:rounded-2xl">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg md:text-xl">
          <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
          Quiz & Assessment
        </CardTitle>
        <CardDescription className="text-white text-xs sm:text-sm">
          Test your knowledge and track your progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
        <div className="grid gap-3 sm:gap-4">
          {assessments.map((assessment, index) => (
            <div key={index} className="p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h4 className="font-medium text-foreground text-sm sm:text-base">{assessment.title}</h4>
                {assessment.score && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-elec-yellow" />
                    <span className="text-xs sm:text-sm font-medium text-elec-yellow">{assessment.score}%</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/80 flex-wrap">
                  <span>{assessment.questions} questions</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{assessment.duration}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] sm:text-xs ${getDifficultyColor(assessment.difficulty)}`}>
                    {assessment.difficulty}
                  </span>
                </div>
                <Button
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] text-xs sm:text-sm touch-manipulation active:scale-[0.98] w-full sm:w-auto"
                >
                  {assessment.score ? 'Retake' : 'Start'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
          <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] text-sm touch-manipulation active:scale-[0.98]">
            <Trophy className="h-4 w-4 mr-2" />
            View Progress
          </Button>
          <Button variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] text-sm touch-manipulation active:scale-[0.98]">
            Create Custom Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizAssessment;
