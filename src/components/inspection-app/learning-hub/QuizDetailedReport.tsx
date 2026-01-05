import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Clock, Target, TrendingUp } from 'lucide-react';
import { useQuizResults } from '@/hooks/useQuizResults';

interface QuizDetailedReportProps {
  onBack: () => void;
}

const QuizDetailedReport = ({ onBack }: QuizDetailedReportProps) => {
  const { results, getPerformanceByCategory, getOverallStats, isLoading } = useQuizResults();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analytics
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const performanceData = getPerformanceByCategory();
  const overallStats = getOverallStats();
  const recentResults = results.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analytics
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Detailed Performance Report</h1>
        <p className="text-gray-400">Comprehensive analysis of your quiz performance</p>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Quizzes</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{overallStats.totalQuizzes}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{overallStats.averageScore}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Best Score</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{overallStats.bestScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Time</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {Math.round(overallStats.totalTimeSpent / 60)}m
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Category */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Performance by Category</CardTitle>
          <CardDescription className="text-gray-300">
            Average scores across different knowledge areas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {performanceData.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground font-medium">{category.subject}</span>
                <span className="text-gray-400">
                  {category.score > 0 ? `${category.score}%` : 'Not attempted'}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${category.color} transition-all duration-500`}
                  style={{ width: `${category.score}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Quiz History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Recent Quiz History</CardTitle>
          <CardDescription className="text-gray-300">
            Your latest quiz attempts and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No quiz results yet. Complete a quiz to see your history here!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentResults.map((result, index) => (
                <div key={result.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">Assessment #{result.assessment_id}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(result.completed_at).toLocaleDateString('en-GB')} • 
                      {Math.round(result.time_spent / 60)} minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground font-bold text-lg">{Math.round(result.percentage)}%</p>
                    <p className="text-gray-400 text-sm">
                      {result.correct_answers}/{result.total_questions} correct
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDetailedReport;