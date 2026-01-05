
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
      default: return 'text-white/80 bg-gray-400/10';
    }
  };

  return (
    <Card className="bg-card border-border lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Quiz & Assessment
        </CardTitle>
        <CardDescription className="text-white">
          Test your knowledge and track your progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {assessments.map((assessment, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{assessment.title}</h4>
                {assessment.score && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm font-medium text-elec-yellow">{assessment.score}%</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span>{assessment.questions} questions</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{assessment.duration}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(assessment.difficulty)}`}>
                    {assessment.difficulty}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  {assessment.score ? 'Retake' : 'Start'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Trophy className="h-4 w-4 mr-2" />
            View Progress
          </Button>
          <Button variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black">
            Create Custom Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizAssessment;
