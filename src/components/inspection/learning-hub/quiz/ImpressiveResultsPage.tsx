import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Clock, 
  Target, 
  RotateCcw, 
  Home,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { QuizResult, Assessment } from '@/types/quiz';
import ConfettiEffect from './ConfettiEffect';
import CategoryIcon from './CategoryIcon';

interface ImpressiveResultsPageProps {
  result: QuizResult;
  assessment: Assessment;
  onRetake: () => void;
  onBackToHub: () => void;
}

const ImpressiveResultsPage = ({ 
  result, 
  assessment, 
  onRetake, 
  onBackToHub 
}: ImpressiveResultsPageProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Trigger confetti for scores >= 80%
    if (result.percentage >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    // Animate score count-up
    const duration = 1500;
    const steps = 60;
    const increment = result.percentage / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= result.percentage) {
        setAnimatedScore(result.percentage);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result.percentage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-emerald-400';
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    if (percentage >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreGradient = (percentage: number) => {
    if (percentage >= 90) return 'from-emerald-500 to-green-500';
    if (percentage >= 80) return 'from-green-500 to-emerald-400';
    if (percentage >= 70) return 'from-yellow-500 to-orange-400';
    if (percentage >= 60) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { title: 'Outstanding!', message: 'Exceptional knowledge demonstrated. You\'re certification ready!' };
    if (percentage >= 80) return { title: 'Excellent Work!', message: 'Strong understanding of BS 7671 principles.' };
    if (percentage >= 70) return { title: 'Well Done!', message: 'Good grasp of the material with room for improvement.' };
    if (percentage >= 60) return { title: 'Keep Going!', message: 'You\'re on the right track. More practice recommended.' };
    return { title: 'Keep Learning!', message: 'Review the material and try again. You can do this!' };
  };

  const getCategoryColor = (correct: number, total: number) => {
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStrengths = () => {
    return Object.entries(result.categoryBreakdown)
      .filter(([, data]) => (data.correct / data.total) >= 0.8)
      .map(([category]) => category);
  };

  const getWeaknesses = () => {
    return Object.entries(result.categoryBreakdown)
      .filter(([, data]) => (data.correct / data.total) < 0.6)
      .map(([category]) => category);
  };

  const scoreMessage = getScoreMessage(result.percentage);

  return (
    <div className="min-h-screen bg-background">
      <ConfettiEffect active={showConfetti} />

      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-8">
          {/* Trophy Animation */}
          <div className="flex justify-center animate-bounce">
            <div className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${getScoreGradient(result.percentage)} p-1 shadow-2xl`}>
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <Trophy className={`h-12 w-12 sm:h-16 sm:w-16 ${getScoreColor(result.percentage)}`} />
              </div>
            </div>
          </div>

          {/* Score Reveal */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-elec-yellow to-yellow-300 bg-clip-text text-transparent">
              {scoreMessage.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {scoreMessage.message}
            </p>
          </div>

          {/* Animated Score */}
          <div className="inline-block">
            <div className={`text-7xl sm:text-8xl font-black ${getScoreColor(result.percentage)} drop-shadow-lg`}>
              {animatedScore}%
            </div>
            <div className="text-sm sm:text-base text-muted-foreground font-medium mt-2">
              {assessment.title}
            </div>
          </div>

          {/* Certification Badge */}
          {result.percentage >= 80 && (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-elec-yellow/20 to-yellow-500/20 border-2 border-elec-yellow rounded-full">
              <Award className="h-5 w-5 text-elec-yellow" />
              <span className="font-semibold text-elec-yellow">Certification Ready</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-card to-muted/50 border-2">
            <CardContent className="p-6 text-center space-y-2">
              <div className={`text-4xl sm:text-5xl font-black ${getScoreColor(result.percentage)}`}>
                {result.percentage}%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Final Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-muted/50 border-2">
            <CardContent className="p-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <span className="text-4xl sm:text-5xl font-black text-green-400">
                  {result.correctAnswers}
                </span>
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Correct / {result.totalQuestions}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-muted/50 border-2">
            <CardContent className="p-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-4xl sm:text-5xl font-black text-blue-400">
                <Clock className="h-6 w-6" />
                <span>{Math.floor(result.timeSpent / 60)}</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Minutes Taken
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-muted/50 border-2">
            <CardContent className="p-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-4xl sm:text-5xl font-black text-purple-400">
                <Zap className="h-6 w-6" />
                <span>{Math.round(result.timeSpent / result.totalQuestions)}</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Seconds/Question
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Performance */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5 text-elec-yellow" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.categoryBreakdown).map(([category, data]) => {
              const percentage = Math.round((data.correct / data.total) * 100);
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category={category} className="h-4 w-4 text-elec-yellow" />
                      <span className="font-medium text-foreground">{category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${getCategoryColor(data.correct, data.total)}`}>
                        {data.correct}/{data.total}
                      </span>
                      <span className={`text-sm font-semibold ${getCategoryColor(data.correct, data.total)}`}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Strengths & Weaknesses */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Strengths */}
          <Card className="border-2 border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {getStrengths().length > 0 ? (
                getStrengths().map(category => (
                  <div key={category} className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">{category}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Keep practicing to identify your strengths
                </p>
              )}
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="border-2 border-orange-500/30 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <XCircle className="h-5 w-5" />
                Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {getWeaknesses().length > 0 ? (
                getWeaknesses().map(category => (
                  <div key={category} className="flex items-center gap-2 text-orange-400">
                    <XCircle className="h-4 w-4" />
                    <span className="font-medium">{category}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Excellent! No weak areas identified
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={onRetake}
            size="lg"
            className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold min-h-[56px] shadow-lg"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Retake Quiz with New Questions
          </Button>
          <Button
            onClick={onBackToHub}
            size="lg"
            variant="outline"
            className="flex-1 font-semibold min-h-[56px] border-2"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Apprentice Hub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImpressiveResultsPage;
