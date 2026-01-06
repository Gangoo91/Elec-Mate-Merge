
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Question } from './types';

interface DiagnosticQuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

const DiagnosticQuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion
}: DiagnosticQuestionCardProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const isCriticalPath = question.criticalPath;

  return (
    <Card className={`bg-card border-border ${isCriticalPath ? 'border-red-500/50' : ''}`}>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          Interactive Diagnostic Wizard
          {isCriticalPath && (
            <Badge className="bg-red-500 text-foreground">Critical Path</Badge>
          )}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/70">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {question.question}
          </h3>
          
          <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect}>
            {question.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={option} id={`option-${idx}`} />
                <Label htmlFor={`option-${idx}`} className="text-white/80 cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="border-border text-white/80 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {isLastQuestion ? 'Get Diagnosis' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticQuestionCard;
