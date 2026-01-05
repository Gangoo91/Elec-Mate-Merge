import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { bmsModule1Section2QuizData } from '@/data/upskilling/bmsModule1Section2QuizData';

interface BMSModule1Section2QuizProps {
  onBack: () => void;
}

const BMSModule1Section2Quiz = ({ onBack }: BMSModule1Section2QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>(
    new Array(bmsModule1Section2QuizData.length).fill(undefined)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < bmsModule1Section2QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(bmsModule1Section2QuizData.length).fill(undefined));
    setShowResults(false);
    setQuizCompleted(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-elec-dark text-foreground">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={onBack}
                className="bg-elec-gray text-foreground hover:bg-[#323232] hover:text-elec-yellow"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Section
              </Button>
            </div>
            
            <QuizResults
              questions={bmsModule1Section2QuizData}
              selectedAnswers={selectedAnswers}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-dark text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="bg-elec-gray text-foreground hover:bg-[#323232] hover:text-elec-yellow"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Section
            </Button>
          </div>

          {/* Quiz Title */}
          <Card className="bg-elec-gray border-transparent">
            <CardHeader>
              <CardTitle className="text-foreground text-center">
                BMS Module 1 - Section 2 Quiz
              </CardTitle>
              <p className="text-center text-gray-300">
                Common Systems Integrated with BMS
              </p>
            </CardHeader>
          </Card>

          {/* Progress */}
          <QuizProgress 
            currentQuestion={currentQuestion} 
            totalQuestions={bmsModule1Section2QuizData.length} 
          />

          {/* Question */}
          <QuizQuestion
            question={bmsModule1Section2QuizData[currentQuestion]}
            selectedAnswer={selectedAnswers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-gray-600 text-gray-300 hover:bg-elec-gray disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="border-gray-600 text-gray-300 hover:bg-elec-gray"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restart
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
              >
                {currentQuestion === bmsModule1Section2QuizData.length - 1 ? 'Complete Quiz' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMSModule1Section2Quiz;