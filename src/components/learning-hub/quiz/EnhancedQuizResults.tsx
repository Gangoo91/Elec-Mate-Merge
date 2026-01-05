import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Trophy, 
  Clock, 
  Target, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Eye,
  TrendingUp,
  Brain,
  Award,
  ChevronRight,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import { QuizResult, Assessment, QuizQuestion, QuizAnswer } from '@/types/quiz';

interface EnhancedQuizResultsProps {
  result: QuizResult;
  assessment: Assessment;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  onRetake: () => void;
  onBackToHub: () => void;
  onReviewAnswers: () => void;
  onTakeAnother: () => void;
  onViewAnalytics: () => void;
}

const EnhancedQuizResults: React.FC<EnhancedQuizResultsProps> = ({
  result,
  assessment,
  questions,
  answers,
  onRetake,
  onBackToHub,
  onReviewAnswers,
  onTakeAnother,
  onViewAnalytics
}) => {
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreMessage = (percentage: number): string => {
    if (percentage >= 90) return 'Outstanding! You\'ve mastered this topic.';
    if (percentage >= 80) return 'Excellent work! You have a strong understanding.';
    if (percentage >= 70) return 'Good job! You\'re well on your way.';
    if (percentage >= 60) return 'Not bad! Some areas need improvement.';
    return 'Keep studying! Focus on the areas highlighted below.';
  };

  const getCategoryColor = (correct: number, total: number): string => {
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getStrengths = (): string[] => {
    return Object.entries(result.categoryBreakdown)
      .filter(([_, data]) => (data.correct / data.total) >= 0.8)
      .map(([category]) => category);
  };

  const getWeaknesses = (): string[] => {
    return Object.entries(result.categoryBreakdown)
      .filter(([_, data]) => (data.correct / data.total) < 0.6)
      .map(([category]) => category);
  };

  const getRecommendations = (): string[] => {
    const weaknesses = getWeaknesses();
    const recommendations = [];

    if (weaknesses.length > 0) {
      recommendations.push(`Focus on ${weaknesses.slice(0, 2).join(' and ')} topics`);
    }
    
    if (result.percentage < 70) {
      recommendations.push('Review BS 7671 regulations for these areas');
      recommendations.push('Practice with more questions in weak categories');
    }
    
    if (result.timeSpent / result.totalQuestions > 90) {
      recommendations.push('Work on improving your response time');
    }
    
    return recommendations;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6 px-3 sm:px-4">
      {/* Header */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow flex-shrink-0" />
              <div>
                <CardTitle className="text-xl sm:text-2xl">Quiz Complete!</CardTitle>
                <p className="text-muted-foreground text-sm sm:text-base">{assessment.title}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onBackToHub} className="min-h-[44px] touch-manipulation w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hub
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Score Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <div className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${getScoreColor(result.percentage)}`}>
              {result.percentage}%
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Overall Score</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Correct Answers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
              {formatTime(result.timeSpent)}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Time Taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
              {Math.round(result.timeSpent / result.totalQuestions)}s
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Avg. per Question</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Message */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="text-center">
            <div className={`text-base sm:text-lg font-medium mb-2 ${getScoreColor(result.percentage)}`}>
              {getScoreMessage(result.percentage)}
            </div>
            {result.percentage >= 70 && (
              <div className="flex items-center justify-center gap-2 text-elec-yellow text-sm sm:text-base">
                <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Certification Ready</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Target className="h-4 w-4 sm:h-5 sm:w-5" />
              Category Performance
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCategoryDetails(!showCategoryDetails)}
              className="min-h-[44px] touch-manipulation text-xs sm:text-sm w-full sm:w-auto"
            >
              {showCategoryDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-4">
            {Object.entries(result.categoryBreakdown).map(([category, data]) => {
              const percentage = Math.round((data.correct / data.total) * 100);
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm sm:text-base">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm ${getCategoryColor(data.correct, data.total)}`}>
                        {data.correct}/{data.total} ({percentage}%)
                      </span>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-3 sm:h-2" />
                  
                  {showCategoryDetails && (
                    <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {data.correct} correct
                        </span>
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-red-500" />
                          {data.total - data.correct} incorrect
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getStrengths().length > 0 ? (
              <div className="space-y-2">
                {getStrengths().map(strength => (
                  <Badge key={strength} variant="outline" className="text-green-400 border-green-500/50">
                    {strength}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Keep practising to identify your strengths!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-400" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getWeaknesses().length > 0 ? (
              <div className="space-y-2">
                {getWeaknesses().map(weakness => (
                  <Badge key={weakness} variant="outline" className="text-amber-400 border-amber-500/50">
                    {weakness}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Excellent! No major weak areas identified.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Study Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getRecommendations().map((recommendation, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-elec-blue" />
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Button onClick={onReviewAnswers} className="min-h-[56px] sm:h-auto p-4 flex-col gap-1 sm:gap-2 touch-manipulation">
          <Eye className="h-5 w-5" />
          <span className="text-sm sm:text-base">Review Answers</span>
          <span className="text-xs opacity-70">See correct solutions</span>
        </Button>

        <Button variant="outline" onClick={onRetake} className="min-h-[56px] sm:h-auto p-4 flex-col gap-1 sm:gap-2 touch-manipulation">
          <RotateCcw className="h-5 w-5" />
          <span className="text-sm sm:text-base">Retake Quiz</span>
          <span className="text-xs opacity-70">Try again</span>
        </Button>

        <Button variant="outline" onClick={onTakeAnother} className="min-h-[56px] sm:h-auto p-4 flex-col gap-1 sm:gap-2 touch-manipulation">
          <BookOpen className="h-5 w-5" />
          <span className="text-sm sm:text-base">Take Another Quiz</span>
          <span className="text-xs opacity-70">More practice</span>
        </Button>

        <Button variant="outline" onClick={onViewAnalytics} className="min-h-[56px] sm:h-auto p-4 flex-col gap-1 sm:gap-2 touch-manipulation">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm sm:text-base">View Analytics</span>
          <span className="text-xs opacity-70">Track progress</span>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedQuizResults;