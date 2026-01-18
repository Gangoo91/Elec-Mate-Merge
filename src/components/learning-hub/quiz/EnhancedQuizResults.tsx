import React, { useState, useEffect } from 'react';
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
  Share2,
  Star,
  Sparkles
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
  const [showCelebration, setShowCelebration] = useState(false);

  const isPassing = result.percentage >= 70;
  const isExcellent = result.percentage >= 80;

  // Show celebration animation for excellent scores
  useEffect(() => {
    if (isExcellent) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isExcellent]);

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
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6 px-3 sm:px-4 relative">
      {/* Celebration Effect for excellent scores */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute top-20 left-1/4 animate-bounce">
            <Sparkles className="h-8 w-8 text-elec-yellow animate-pulse" />
          </div>
          <div className="absolute top-32 right-1/4 animate-bounce delay-100">
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-16 right-1/3 animate-bounce delay-200">
            <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
          </div>
          <div className="absolute top-28 left-1/3 animate-bounce delay-150">
            <Star className="h-7 w-7 text-elec-yellow animate-pulse" />
          </div>
        </div>
      )}

      {/* Main Score Display - Hero Section */}
      <Card className={`overflow-hidden ${isExcellent ? 'ring-2 ring-green-500/50' : isPassing ? 'ring-2 ring-elec-yellow/50' : ''}`}>
        <div className={`p-6 sm:p-8 text-center space-y-4 ${
          isExcellent
            ? 'bg-gradient-to-b from-green-500/10 to-transparent'
            : isPassing
              ? 'bg-gradient-to-b from-elec-yellow/10 to-transparent'
              : 'bg-gradient-to-b from-red-500/10 to-transparent'
        }`}>
          {/* Result Icon */}
          <div className="flex justify-center">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center ${
              isExcellent
                ? 'bg-green-500/20 ring-4 ring-green-500/30'
                : isPassing
                  ? 'bg-elec-yellow/20 ring-4 ring-elec-yellow/30'
                  : 'bg-red-500/20 ring-4 ring-red-500/30'
            }`}>
              {isExcellent ? (
                <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-green-400" />
              ) : isPassing ? (
                <Award className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow" />
              ) : (
                <Target className="h-10 w-10 sm:h-12 sm:w-12 text-red-400" />
              )}
            </div>
          </div>

          {/* Score */}
          <div className="space-y-1">
            <h2 className={`text-5xl sm:text-6xl font-bold ${getScoreColor(result.percentage)}`}>
              {result.percentage}%
            </h2>
            <p className="text-lg sm:text-xl text-foreground font-medium">
              {result.correctAnswers} of {result.totalQuestions} correct
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge
              className={`text-sm px-4 py-1.5 ${
                isExcellent
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : isPassing
                    ? 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}
            >
              {isExcellent ? 'Excellent!' : isPassing ? 'Passed' : 'Needs Practice'}
            </Badge>
          </div>

          {/* Message */}
          <p className="text-foreground/80 text-sm sm:text-base max-w-md mx-auto">
            {getScoreMessage(result.percentage)}
          </p>

          {/* Assessment Title */}
          <p className="text-xs text-foreground/70 pt-2">
            {assessment.title}
          </p>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <Clock className="h-5 w-5 mx-auto mb-2 text-foreground/70" />
            <div className="text-lg sm:text-xl font-bold text-foreground">
              {formatTime(result.timeSpent)}
            </div>
            <p className="text-xs text-foreground/70">Time Taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <CheckCircle className="h-5 w-5 mx-auto mb-2 text-green-400" />
            <div className="text-lg sm:text-xl font-bold text-foreground">
              {result.correctAnswers}
            </div>
            <p className="text-xs text-foreground/70">Correct</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <XCircle className="h-5 w-5 mx-auto mb-2 text-red-400" />
            <div className="text-lg sm:text-xl font-bold text-foreground">
              {result.incorrectAnswers}
            </div>
            <p className="text-xs text-foreground/70">Incorrect</p>
          </CardContent>
        </Card>
      </div>

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
                    <div className="mt-2 text-xs sm:text-sm text-foreground/70">
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
              <p className="text-foreground/70">Keep practising to identify your strengths!</p>
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
              <p className="text-foreground/70">Excellent! No major weak areas identified.</p>
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
      <div className="space-y-3 sm:space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button
            onClick={onReviewAnswers}
            className="min-h-[64px] sm:min-h-[72px] p-4 flex-col gap-1.5 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.98] transition-transform"
          >
            <Eye className="h-6 w-6" />
            <span className="text-sm sm:text-base font-semibold">Review Answers</span>
          </Button>

          <Button
            variant="outline"
            onClick={onRetake}
            className="min-h-[64px] sm:min-h-[72px] p-4 flex-col gap-1.5 touch-manipulation active:scale-[0.98] transition-transform"
          >
            <RotateCcw className="h-6 w-6" />
            <span className="text-sm sm:text-base font-semibold">Retake Quiz</span>
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={onTakeAnother}
            className="min-h-[56px] p-4 flex-col gap-1 touch-manipulation active:scale-[0.98] transition-transform"
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs sm:text-sm">Another Quiz</span>
          </Button>

          <Button
            variant="outline"
            onClick={onBackToHub}
            className="min-h-[56px] p-4 flex-col gap-1 touch-manipulation active:scale-[0.98] transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-xs sm:text-sm">Back to Hub</span>
          </Button>
        </div>
      </div>

      {/* Bottom Spacing for Safe Area */}
      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default EnhancedQuizResults;