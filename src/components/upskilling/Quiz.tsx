import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizProps {
  questions: QuizQuestionType[];
  title: string;
  description: string;
}

export const Quiz = ({ questions, title, description }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Helper to get correct answer index (handles both number and string formats)
  const getCorrectAnswerIndex = (question: QuizQuestionType): number => {
    if (typeof question.correctAnswer === 'number') {
      return question.correctAnswer;
    }
    // If it's a string, find the index in options
    const index = question.options.findIndex(opt => opt === question.correctAnswer);
    return index >= 0 ? index : 0;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === getCorrectAnswerIndex(questions[index]) ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor(score)}`}>
              {percentage}%
            </div>
            <p className="text-gray-300">
              {percentage >= 80 ? 'Excellent work!' : 
               percentage >= 60 ? 'Good effort!' : 
               'Keep studying!'}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Review Your Answers</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const correctIdx = getCorrectAnswerIndex(question);
              const isCorrect = userAnswer === correctIdx;

              return (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isCorrect ? 'bg-green-500 text-foreground' : 'bg-red-500 text-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">{question.question}</p>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Your answer:</strong> {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-gray-300 text-sm mb-2">
                          <strong>Correct answer:</strong> {question.options[correctIdx]}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleRestart}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-300">{description}</p>
        
        <div className="flex justify-between text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <QuizQuestion
          question={questions[currentQuestion]}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};