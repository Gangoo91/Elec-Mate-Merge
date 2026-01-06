import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  EyeOff,
  BookOpen,
  Clock,
  Target,
  Info
} from 'lucide-react';
import { QuizQuestion, QuizAnswer, Assessment } from '@/types/quiz';

interface QuizReviewInterfaceProps {
  assessment: Assessment;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  onBack: () => void;
}

const QuizReviewInterface: React.FC<QuizReviewInterfaceProps> = ({
  assessment,
  questions,
  answers,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanations, setShowExplanations] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const getAnswerStyle = (index: number) => {
    if (!currentAnswer) return 'border-white/40';

    const isCorrect = index === currentQuestion.correctAnswer;
    const isUserAnswer = index === currentAnswer.selectedAnswer;

    if (isCorrect && isUserAnswer) {
      return 'border-green-500 bg-green-500/10 text-green-400';
    }
    if (isCorrect && !isUserAnswer) {
      return 'border-green-500 bg-green-500/5 text-green-400';
    }
    if (isUserAnswer && !isCorrect) {
      return 'border-red-500 bg-red-500/10 text-red-400';
    }
    return 'border-white/40';
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Intermediate': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-white/10 text-white/80 border-white/50';
    }
  };

  const getQuestionStatus = (index: number) => {
    const question = questions[index];
    const answer = answers.find(a => a.questionId === question.id);
    
    if (!answer) return 'unanswered';
    return answer.isCorrect ? 'correct' : 'incorrect';
  };

  const correctCount = answers.filter(a => a.isCorrect).length;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">No questions to review.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Eye className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle className="text-xl">Review: {assessment.title}</CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
                    {currentQuestion.difficulty}
                  </Badge>
                  {currentQuestion.regulation && (
                    <Badge variant="outline" className="text-elec-blue">
                      {currentQuestion.regulation}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-white/80">
                {correctCount}/{questions.length} correct ({Math.round((correctCount / questions.length) * 100)}%)
              </div>
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress & Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExplanations(!showExplanations)}
              >
                {showExplanations ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showExplanations ? 'Hide' : 'Show'} Explanations
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
            
            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-2">
                {questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  let bgColor = 'bg-white/10';
                  let textColor = 'text-white';
                  
                  if (status === 'correct') {
                    bgColor = 'bg-green-600';
                    textColor = 'text-foreground';
                  } else if (status === 'incorrect') {
                    bgColor = 'bg-red-600';
                    textColor = 'text-foreground';
                  }
                  
                  return (
                    <Button
                      key={index}
                      variant={index === currentQuestionIndex ? "default" : "outline"}
                      size="sm"
                      className={`h-8 w-8 p-0 flex-shrink-0 ${bgColor} ${textColor}`}
                      onClick={() => jumpToQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Question Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-4">
            {currentAnswer?.isCorrect ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Correct Answer</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Incorrect Answer</span>
              </div>
            )}
            {currentAnswer && (
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{currentAnswer.timeSpent}s</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
          <div className="text-sm text-white/80">
            Category: {currentQuestion.category}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`w-full p-4 rounded-lg border text-left ${getAnswerStyle(index)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {index === currentQuestion.correctAnswer && (
                      <Badge variant="outline" className="text-green-400 border-green-500/50">
                        Correct
                      </Badge>
                    )}
                    {index === currentAnswer?.selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <Badge variant="outline" className="text-red-400 border-red-500/50">
                        Your Answer
                      </Badge>
                    )}
                    {index === currentAnswer?.selectedAnswer && index === currentQuestion.correctAnswer && (
                      <Badge variant="outline" className="text-green-400 border-green-500/50">
                        Your Answer (Correct)
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showExplanations && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-elec-blue mt-0.5" />
                <div>
                  <h4 className="font-medium mb-2">Explanation</h4>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.regulation && (
                    <div className="mt-2 text-xs text-elec-blue">
                      Reference: {currentQuestion.regulation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-white/80">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <Button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizReviewInterface;