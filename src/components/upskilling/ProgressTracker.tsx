import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trophy, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ModuleProgress {
  id: string;
  title: string;
  sections: number;
  completedSections: number;
  quizScore?: number;
  lastAccessed?: Date;
}

export const ProgressTracker = () => {
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([
    {
      id: 'module1',
      title: 'Legal Framework & Responsibilities',
      sections: 8,
      completedSections: 3,
      quizScore: 85,
      lastAccessed: new Date('2024-01-15')
    },
    {
      id: 'module2', 
      title: 'Test Equipment & Calibration',
      sections: 7,
      completedSections: 5,
      quizScore: 92,
      lastAccessed: new Date('2024-01-18')
    },
    {
      id: 'module3',
      title: 'Visual Inspection',
      sections: 6,
      completedSections: 6,
      quizScore: 78,
      lastAccessed: new Date('2024-01-20')
    },
    {
      id: 'module4',
      title: 'Electrical Testing Methods',
      sections: 7,
      completedSections: 2,
      lastAccessed: new Date('2024-01-22')
    },
    {
      id: 'module5',
      title: 'Results & Documentation',
      sections: 7,
      completedSections: 0
    }
  ]);

  const calculateOverallProgress = () => {
    const totalSections = moduleProgress.reduce((sum, module) => sum + module.sections, 0);
    const completedSections = moduleProgress.reduce((sum, module) => sum + module.completedSections, 0);
    return Math.round((completedSections / totalSections) * 100);
  };

  const getAverageQuizScore = () => {
    const scoresWithValues = moduleProgress.filter(m => m.quizScore !== undefined);
    if (scoresWithValues.length === 0) return 0;
    const average = scoresWithValues.reduce((sum, m) => sum + (m.quizScore || 0), 0) / scoresWithValues.length;
    return Math.round(average);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreBadgeVariant = (score?: number) => {
    if (!score) return 'secondary';
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const overallProgress = calculateOverallProgress();
  const averageQuizScore = getAverageQuizScore();

  return (
    <div className="space-y-6">
      {/* Overall Progress Summary */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Target className="h-5 w-5 text-elec-yellow" />
            Course Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-elec-dark p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">
                {overallProgress}%
              </div>
              <p className="text-gray-300 text-sm">Overall Completion</p>
              <Progress 
                value={overallProgress} 
                className="mt-2 h-2"
              />
            </div>
            
            <div className="bg-elec-dark p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {averageQuizScore}%
              </div>
              <p className="text-gray-300 text-sm">Average Quiz Score</p>
              <div className={`mt-2 h-2 rounded-full ${getProgressColor(averageQuizScore)}`} 
                   style={{ width: `${averageQuizScore}%` }} />
            </div>
            
            <div className="bg-elec-dark p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {moduleProgress.filter(m => m.completedSections === m.sections).length}
              </div>
              <p className="text-gray-300 text-sm">Modules Completed</p>
              <Trophy className="h-6 w-6 text-elec-yellow mx-auto mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Module Progress */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Module Progress Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {moduleProgress.map((module) => {
            const modulePercentage = Math.round((module.completedSections / module.sections) * 100);
            const isCompleted = module.completedSections === module.sections;
            
            return (
              <div key={module.id} className="bg-elec-dark p-4 rounded-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500" />
                    )}
                    <h3 className="text-foreground font-medium">{module.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {module.quizScore && (
                      <Badge variant={getScoreBadgeVariant(module.quizScore)}>
                        Quiz: {module.quizScore}%
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-gray-300 border-gray-600">
                      {module.completedSections}/{module.sections} sections
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-300">{modulePercentage}%</span>
                  </div>
                  <Progress value={modulePercentage} className="h-2" />
                </div>
                
                {module.lastAccessed && (
                  <p className="text-xs text-gray-500 mt-2">
                    Last accessed: {module.lastAccessed.toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Learning Objectives Status */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
            Learning Objectives Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-foreground font-medium">Completed Objectives</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Understand legal requirements for inspection
                </li>
                <li className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Identify appropriate test equipment
                </li>
                <li className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Conduct systematic visual inspection
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-foreground font-medium">In Progress</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2 text-yellow-400">
                  <Circle className="h-4 w-4" />
                  Perform electrical testing procedures
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Circle className="h-4 w-4" />
                  Document and interpret test results
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Circle className="h-4 w-4" />
                  Issue appropriate certificates
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};