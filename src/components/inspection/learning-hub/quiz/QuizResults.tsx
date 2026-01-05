import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Target, Book, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import { QuizResult, Assessment } from '@/types/quiz';

interface QuizResultsProps {
  result: QuizResult;
  assessment: Assessment;
  onRetake: () => void;
  onBackToHub: () => void;
}

const QuizResults = ({ result, assessment, onRetake, onBackToHub }: QuizResultsProps) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent work! Outstanding knowledge demonstrated.';
    if (percentage >= 80) return 'Great job! You have a strong understanding.';
    if (percentage >= 70) return 'Good effort! Consider reviewing some topics.';
    if (percentage >= 60) return 'Fair performance. More study recommended.';
    return 'Additional study required. Consider retaking after review.';
  };

  const getCategoryColor = (correct: number, total: number) => {
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              result.percentage >= 80 ? 'bg-green-500/20 text-green-400' :
              result.percentage >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              <Trophy className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-elec-yellow mb-2">Quiz Complete!</h1>
          <h2 className="text-xl text-gray-300">{assessment.title}</h2>
          <p className="text-gray-400 mt-2">{getScoreMessage(result.percentage)}</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Final Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getScoreColor(result.percentage)}`}>
                {result.percentage}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Correct Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {result.correctAnswers}
              </div>
              <div className="text-sm text-gray-400">of {result.totalQuestions}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Time Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">
                {formatTime(result.timeSpent)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Average per Question</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">
                {Math.round(result.timeSpent / result.totalQuestions / 1000)}s
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.categoryBreakdown).map(([category, data]) => {
              const percentage = Math.round((data.correct / data.total) * 100);
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">{category}</span>
                    <span className={`font-bold ${getCategoryColor(data.correct, data.total)}`}>
                      {data.correct}/{data.total} ({percentage}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="w-full" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Book className="h-5 w-5" />
              Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Strengths</h4>
                <div className="space-y-2">
                  {Object.entries(result.categoryBreakdown)
                    .filter(([, data]) => (data.correct / data.total) >= 0.8)
                    .map(([category]) => (
                      <div key={category} className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span>{category}</span>
                      </div>
                    ))}
                  {Object.entries(result.categoryBreakdown).filter(([, data]) => (data.correct / data.total) >= 0.8).length === 0 && (
                    <p className="text-gray-400 text-sm">Focus on improving across all areas</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Areas for Improvement</h4>
                <div className="space-y-2">
                  {Object.entries(result.categoryBreakdown)
                    .filter(([, data]) => (data.correct / data.total) < 0.7)
                    .map(([category]) => (
                      <div key={category} className="flex items-center gap-2 text-red-400">
                        <XCircle className="h-4 w-4" />
                        <span>{category}</span>
                      </div>
                    ))}
                  {Object.entries(result.categoryBreakdown).filter(([, data]) => (data.correct / data.total) < 0.7).length === 0 && (
                    <p className="text-gray-400 text-sm">Good performance across all categories!</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRetake}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
          
          <Button
            variant="outline"
            onClick={onBackToHub}
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Apprentice Hub
          </Button>
        </div>

        {/* Study Recommendations */}
        {result.percentage < 80 && (
          <Card className="bg-blue-500/10 border-blue-500/20 mt-8">
            <CardHeader>
              <CardTitle className="text-blue-400">Recommended Study Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-300">
                {result.percentage < 60 && (
                  <p>• Review fundamental BS 7671 principles and definitions</p>
                )}
                {Object.entries(result.categoryBreakdown)
                  .filter(([, data]) => (data.correct / data.total) < 0.7)
                  .map(([category]) => (
                    <p key={category}>• Focus on {category} topics and practical applications</p>
                  ))}
                <p>• Practice with additional quiz questions to reinforce learning</p>
                <p>• Review regulation references for topics you found challenging</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizResults;