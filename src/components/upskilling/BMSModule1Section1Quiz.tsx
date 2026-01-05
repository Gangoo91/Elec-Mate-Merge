import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { bmsModule1Section1QuizData } from '@/data/upskilling/bmsModule1Section1QuizData';

interface BMSModule1Section1QuizProps {
  onBack: () => void;
}

const BMSModule1Section1Quiz = ({ onBack }: BMSModule1Section1QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < bmsModule1Section1QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-elec-dark px-4 sm:px-6 lg:px-8 py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-foreground hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Section
        </Button>
        
        <QuizResults 
          questions={bmsModule1Section1QuizData}
          selectedAnswers={selectedAnswers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  const question = bmsModule1Section1QuizData[currentQuestion];
  const progress = ((currentQuestion + 1) / bmsModule1Section1QuizData.length) * 100;

  return (
    <div className="min-h-screen bg-elec-dark text-foreground px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            Knowledge Check ({bmsModule1Section1QuizData.length} Questions)
          </h1>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Question Counter */}
          <div className="text-center text-gray-400 text-lg mb-8">
            Question {currentQuestion + 1} of {bmsModule1Section1QuizData.length}
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {question.question}
          </h2>
          
          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option: string, index: number) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-elec-yellow bg-elec-yellow/10' 
                      : 'border-gray-600 bg-transparent hover:border-gray-500'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? 'border-elec-yellow bg-elec-yellow' 
                      : 'border-gray-500'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <label className="text-foreground cursor-pointer flex-1">
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2"
          >
            {currentQuestion === bmsModule1Section1QuizData.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BMSModule1Section1Quiz;