
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { useQuizResults } from '@/hooks/useQuizResults';
import QuizDetailedReport from './QuizDetailedReport';

interface QuizPerformanceAnalyticsProps {
  onViewReport?: () => void;
}

const QuizPerformanceAnalytics = ({ onViewReport }: QuizPerformanceAnalyticsProps) => {
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const { getPerformanceByCategory, isLoading } = useQuizResults();

  if (showDetailedReport) {
    return <QuizDetailedReport onBack={() => setShowDetailedReport(false)} />;
  }

  const performanceData = getPerformanceByCategory();

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
          <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
          Performance Analytics
        </CardTitle>
        <CardDescription className="text-white text-sm">
          Track your learning progress and identify strengths
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {performanceData.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-foreground">{subject.subject}</span>
                <span className="text-white/80">
                  {subject.score > 0 ? `${subject.score}%` : 'Not attempted'}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                <div 
                  className={`h-1.5 sm:h-2 rounded-full ${subject.color}`}
                  style={{ width: `${subject.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-3 sm:pt-4 border-t border-border">
          <Button 
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 text-sm"
            onClick={() => onViewReport ? onViewReport() : setShowDetailedReport(true)}
            disabled={isLoading}
          >
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            {isLoading ? 'Loading...' : 'View Detailed Report'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizPerformanceAnalytics;
