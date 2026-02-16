import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const RightsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'How much annual leave are apprentices entitled to?',
      options: [
        '20 days plus bank holidays',
        '15 days plus bank holidays',
        '25 days plus bank holidays',
        'It depends on your employer',
      ],
      correct: 0,
      explanation:
        'Apprentices are entitled to 20 days annual leave plus bank holidays as a minimum.',
    },
    {
      question: 'What percentage of your time should be spent on off-the-job training?',
      options: ['10%', '15%', '20%', '25%'],
      correct: 2,
      explanation:
        'Apprentices are entitled to a minimum of 20% off-the-job training (typically 1 day per week).',
    },
    {
      question: 'Can your employer make you work overtime without extra pay?',
      options: [
        'Yes, as an apprentice you have no choice',
        "Only if it's written in your contract",
        'No, overtime must be paid at enhanced rates',
        'Only during busy periods',
      ],
      correct: 1,
      explanation:
        'Your contract should specify overtime arrangements. Generally, overtime should be paid at enhanced rates.',
    },
    {
      question: 'Who should you contact first if you have concerns about your apprenticeship?',
      options: ['ACAS', 'Your training provider', 'Citizens Advice', 'A trade union'],
      correct: 1,
      explanation:
        'Your training provider should be your first port of call for apprenticeship-related issues.',
    },
    {
      question: 'What is the apprentice minimum wage from April 2026?',
      options: ['£6.40', '£7.55', '£8.00', '£10.85'],
      correct: 2,
      explanation:
        'The apprentice minimum wage rises to £8.00 per hour from 1 April 2026 (up from £7.55). After the first year, if aged 19+, the National Living Wage of £12.71 applies.',
    },
    {
      question: 'Can your employer deduct the cost of training from your wages?',
      options: [
        'Yes, if they pay for the training',
        'Only if you agree in writing',
        'No, this is never allowed for apprenticeships',
        'Only after you qualify',
      ],
      correct: 2,
      explanation:
        'Employers cannot deduct apprenticeship training costs from your wages. Your training is funded through the apprenticeship levy or government co-investment.',
    },
    {
      question: 'What should you do if asked to work on live electrical circuits without proper safety procedures?',
      options: [
        'Do it carefully to impress your employer',
        'Refuse the task — it is your legal right',
        'Ask a colleague for help',
        'Do it but report it afterwards',
      ],
      correct: 1,
      explanation:
        'You have the legal right to refuse unsafe work under the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989. Working live without proper procedures is a criminal offence.',
    },
    {
      question: 'How much Statutory Sick Pay (SSP) are you entitled to per week (2025/26)?',
      options: ['£96.35', '£109.40', '£118.75', '£130.00'],
      correct: 2,
      explanation:
        'SSP is £118.75 per week in 2025/26, rising to £123.25 from April 2026. You are eligible after 3 consecutive days of sickness (paid from day 4).',
    },
    {
      question: 'Who should you report apprenticeship quality or funding concerns to?',
      options: [
        'Ofsted',
        'Your local council',
        'Education & Skills Funding Agency (ESFA)',
        'The Department for Education directly',
      ],
      correct: 2,
      explanation:
        'The ESFA oversees apprenticeship quality and funding. They handle complaints about training providers and employers. Contact them at 0370 267 0001 or through GOV.UK.',
    },
    {
      question: 'After your first year as an apprentice aged 19+, what is the minimum wage you should receive from April 2026?',
      options: ['£8.00', '£10.85', '£12.71', '£15.00'],
      correct: 2,
      explanation:
        'After the first year of your apprenticeship, if you are aged 19 or over, you are entitled to the National Living Wage — £12.71 per hour from April 2026. Many employers pay more than this.',
    },
    {
      question: 'What does the GS38 guidance note cover?',
      options: [
        'Safe isolation procedures',
        'Electrical test instruments and probes',
        'Cable sizing calculations',
        'Earthing arrangements',
      ],
      correct: 1,
      explanation:
        'GS38 is an HSE guidance note on electrical test equipment. It specifies requirements for safe test leads, probes, and instruments to prevent electric shock. Your employer must provide GS38-compliant test equipment.',
    },
    {
      question: 'Can your employer end your apprenticeship without following proper procedures?',
      options: [
        'Yes, apprentices have no protection',
        'Only during the first 3 months',
        'No — apprentices have the same employment rights as other employees',
        'Only if you fail an assessment',
      ],
      correct: 2,
      explanation:
        'Apprentices have the same employment rights as other workers. Your employer must follow proper dismissal procedures. Contact your training provider and ACAS immediately if your employer tries to end your apprenticeship unfairly.',
    },
    {
      question: 'What is the CITB completion bonus for finishing your electrical apprenticeship?',
      options: ['£1,000', '£2,500', '£3,500', '£5,000'],
      correct: 2,
      explanation:
        'CITB pays employers a £3,500 completion bonus when you finish your apprenticeship, plus £2,500 per year during training (paid quarterly). The total over 4 years is £13,500.',
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 11) return 'text-green-400';
    if (score >= 7) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = getScore();
    return (
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-blue-400">Quiz Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/{questions.length}
            </div>
            <p className="text-white">
              {score >= 11
                ? 'Excellent! You know your rights well.'
                : score >= 7
                  ? 'Good knowledge, but room for improvement.'
                  : 'Consider reviewing your rights and entitlements.'}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correct;

              return (
                <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-medium text-white mb-1">{question.question}</h4>
                      <p className="text-sm text-white mb-2">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-xs text-blue-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={resetQuiz} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="border-blue-500/30 bg-blue-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-blue-400">Rights Assessment Quiz</CardTitle>
          </div>
          <Badge variant="outline" className="border-blue-400/40 text-blue-400">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 border-blue-500/20 hover:bg-blue-500/20"
                onClick={() => handleAnswer(index)}
              >
                <span className="mr-3 text-blue-400 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full bg-white/5 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RightsQuiz;
