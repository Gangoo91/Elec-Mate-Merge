
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const ResponsibilityCompetencyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What does competency in electrical inspection and testing include?",
      options: [
        "A. Holding a qualification only",
        "B. Knowing how to use test equipment",
        "C. Skills, knowledge, experience, and understanding",
        "D. Following what others tell you"
      ],
      correctAnswer: 2,
      explanation: "Competency requires all four elements: skills, knowledge, experience, and understanding. A qualification alone is not sufficient - practical ability and judgement are equally important."
    },
    {
      id: 2,
      question: "True or False: You can legally sign off a test if someone else confirms it was done correctly.",
      options: [
        "A. True - verbal confirmation is sufficient",
        "B. False - you must personally verify all work you certify",
        "C. True - if the supervisor is more qualified",
        "D. True - if it's documented in writing"
      ],
      correctAnswer: 1,
      explanation: "False. Under EAWR 1989 and professional standards, the person who signs the certificate is legally responsible for the work. You cannot rely on others' confirmation - you must personally verify everything you certify."
    },
    {
      id: 3,
      question: "Under the Electricity at Work Regulations 1989, who can carry out inspection and testing?",
      options: [
        "A. Anyone employed by a contractor",
        "B. Only persons deemed competent",
        "C. The site manager",
        "D. The client"
      ],
      correctAnswer: 1,
      explanation: "EAWR 1989 Regulation 16 specifically requires that work on electrical systems be carried out only by competent persons. This is a legal requirement, not just best practice."
    },
    {
      id: 4,
      question: "What is a serious risk of working outside your level of competence?",
      options: [
        "A. You might take longer to finish",
        "B. You may be overcharged for training",
        "C. You could face legal action and endanger lives",
        "D. The certificate will need more pages"
      ],
      correctAnswer: 2,
      explanation: "Working outside competency limits creates serious legal liability and safety risks. This can result in prosecution, imprisonment, fines, and most importantly, could endanger lives through missed hazards or incorrect certification."
    },
    {
      id: 5,
      question: "Which of these best demonstrates competency for inspection and testing?",
      options: [
        "A. Watching online videos",
        "B. Reading outdated guidance",
        "C. City & Guilds 2391 qualification plus practical experience",
        "D. Asking a friend for advice"
      ],
      correctAnswer: 2,
      explanation: "Competency is best demonstrated through recognised qualifications (like C&G 2391) combined with practical experience. This provides both theoretical knowledge and real-world application skills necessary for safe and effective work."
    },
    {
      id: 6,
      question: "What are the potential penalties for electrical work carried out by non-competent persons?",
      options: [
        "A. Warning letter only",
        "B. Unlimited fines and up to 2 years imprisonment",
        "C. Small fixed penalty notice",
        "D. Just increased insurance premiums"
      ],
      correctAnswer: 1,
      explanation: "Under EAWR 1989 and HASWA 1974, penalties can include unlimited fines, imprisonment up to 2 years, and director disqualification. These are serious criminal offences with severe consequences."
    },
    {
      id: 7,
      question: "Which regulation specifically requires competent persons for electrical work?",
      options: [
        "A. Regulation 4 of EAWR 1989",
        "B. Regulation 16 of EAWR 1989",
        "C. Section 7 of HASWA 1974",
        "D. Building Regulations Part P"
      ],
      correctAnswer: 1,
      explanation: "Regulation 16 of the Electricity at Work Regulations 1989 specifically states that no person shall be engaged in work which requires technical knowledge or experience unless they possess such knowledge or experience."
    },
    {
      id: 8,
      question: "What should you do if asked to inspect an installation type you're unfamiliar with?",
      options: [
        "A. Proceed carefully and do your best",
        "B. Use similar test methods from other installations",
        "C. Seek appropriate training or refer to a specialist",
        "D. Ask the client what they think should be done"
      ],
      correctAnswer: 2,
      explanation: "Working outside your competency area is dangerous and illegal. You should seek appropriate training or refer the work to someone with the necessary competency for that specific installation type."
    },
    {
      id: 9,
      question: "Which professional body membership can help demonstrate ongoing competency?",
      options: [
        "A. Local football club",
        "B. NICEIC or NAPIT membership",
        "C. Gym membership",
        "D. Social media groups"
      ],
      correctAnswer: 1,
      explanation: "Professional membership with bodies like NICEIC, NAPIT, ECA, or SELECT provides ongoing assessment, technical support, and demonstrates commitment to maintaining professional standards and competency."
    },
    {
      id: 10,
      question: "What is the primary responsibility of the person who signs an electrical certificate?",
      options: [
        "A. To ensure the work was completed on time",
        "B. To confirm the installation is safe and complies with BS 7671",
        "C. To negotiate the best price with suppliers",
        "D. To arrange follow-up maintenance visits"
      ],
      correctAnswer: 1,
      explanation: "The primary responsibility of signing a certificate is to confirm that the installation has been properly inspected, tested, and complies with BS 7671. This carries full legal responsibility for the safety assessment."
    }
  ];

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
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const currentQ = questions[currentQuestion];
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <div className="space-y-6">
        <Card className="bg-[#323232] border-gray-700">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                {score}/{questions.length}
              </div>
              <div className={`text-2xl font-semibold ${getScoreColor(score)}`}>
                {percentage}%
              </div>
              <p className="text-gray-400 mt-2">
                {percentage >= 80 ? "Excellent understanding!" :
                 percentage >= 60 ? "Good progress - review the areas below" :
                 "Review the material and try again"}
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-600">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-foreground font-medium mb-2">
                          Question {index + 1}: {question.question}
                        </p>
                        <p className={`text-sm mb-2 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-300 text-sm mb-2">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-gray-400 text-sm">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                onClick={handleRestart}
                className="bg-elec-yellow text-black hover:bg-yellow-400"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-[#323232] rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-foreground font-medium">Progress</span>
          <span className="text-gray-400">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-[#323232] border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">
            Question {currentQuestion + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground text-lg leading-relaxed">
            {currentQ.question}
          </p>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                    : 'bg-[#2a2a2a] border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-[#353535]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="bg-transparent border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
        >
          Previous
        </Button>

        <div className="flex gap-3">
          {selectedAnswers.length === questions.length && !quizCompleted && (
            <Button
              onClick={handleShowResults}
              variant="outline"
              className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
            >
              Show Results
            </Button>
          )}
          
          {selectedAnswers[currentQuestion] !== undefined && (
            <Button
              onClick={handleNext}
              className="bg-elec-yellow text-black hover:bg-yellow-400"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponsibilityCompetencyQuiz;
