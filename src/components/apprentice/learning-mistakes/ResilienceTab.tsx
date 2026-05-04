import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ResilienceTab = () => {
  const [resilienceScore, setResilienceScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const resilienceQuestions = [
    {
      question: 'When I make a mistake at work, I...',
      options: [
        { text: 'Panic and worry about being fired', score: 1 },
        { text: 'Feel embarrassed but tell my supervisor', score: 3 },
        { text: 'Calmly assess the situation and fix it', score: 5 },
        { text: 'Learn from it and improve my process', score: 4 },
      ],
    },
    {
      question: 'If a colleague criticises my work, I...',
      options: [
        { text: 'Take it personally and get defensive', score: 1 },
        { text: 'Listen but feel hurt', score: 2 },
        { text: 'Consider their feedback objectively', score: 4 },
        { text: 'Thank them and ask for specific advice', score: 5 },
      ],
    },
    {
      question: 'When facing a challenging task, I...',
      options: [
        { text: 'Avoid it or ask someone else to do it', score: 1 },
        { text: 'Worry but attempt it anyway', score: 2 },
        { text: 'Break it down into smaller steps', score: 4 },
        { text: 'See it as an opportunity to learn', score: 5 },
      ],
    },
    {
      question: 'After a difficult day at work, I...',
      options: [
        { text: 'Dwell on what went wrong', score: 1 },
        { text: 'Try to forget about it', score: 2 },
        { text: 'Reflect on lessons learned', score: 4 },
        { text: 'Plan how to improve tomorrow', score: 5 },
      ],
    },
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < resilienceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const maxScore = resilienceQuestions.length * 5;
      const percentage = (totalScore / maxScore) * 100;
      setResilienceScore(percentage);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setResilienceScore(0);
  };

  const getResilienceLevel = (score: number) => {
    if (score >= 80)
      return {
        level: 'High',
        description: 'You have excellent resilience skills',
      };
    if (score >= 60)
      return {
        level: 'Good',
        description: "You're developing strong resilience",
      };
    if (score >= 40)
      return {
        level: 'Moderate',
        description: "There's room for improvement",
      };
    return {
      level: 'Developing',
      description: 'Focus on building resilience skills',
    };
  };

  const resilienceStrategies = [
    {
      title: 'Growth Mindset',
      description: 'View challenges as opportunities to learn and grow',
      techniques: [
        "Replace 'I can't do this' with 'I can't do this yet'",
        'Focus on the learning process, not just results',
        'Celebrate small improvements and progress',
      ],
    },
    {
      title: 'Emotional Regulation',
      description: 'Manage your emotional responses to setbacks',
      techniques: [
        'Practice deep breathing when stressed',
        'Take a moment to pause before reacting',
        'Acknowledge feelings without being controlled by them',
      ],
    },
    {
      title: 'Support Networks',
      description: 'Build strong relationships for guidance and encouragement',
      techniques: [
        'Connect with mentors and experienced colleagues',
        'Join apprentice support groups',
        'Share experiences with fellow learners',
      ],
    },
    {
      title: 'Self-Reflection',
      description: 'Regularly assess your progress and learning',
      techniques: [
        'Keep a learning journal',
        'Review mistakes objectively',
        'Identify patterns in your challenges',
      ],
    },
  ];

  const progressPercent = (currentQuestion / resilienceQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Resilience assessment
        </span>

        {!showResults ? (
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-white/85 font-mono">
                  {currentQuestion + 1}/{resilienceQuestions.length}
                </span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <h3 className="text-[18px] font-semibold text-white leading-snug">
              {resilienceQuestions[currentQuestion].question}
            </h3>

            <div className="space-y-2.5">
              {resilienceQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-left justify-start h-auto p-4 min-h-[52px] border-white/[0.06] bg-white/[0.02] text-white/85 hover:bg-white/[0.05] hover:border-white/15 touch-manipulation whitespace-normal"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center space-y-3 py-2">
              <div className="text-[40px] font-mono text-white leading-none">
                {Math.round(resilienceScore)}%
              </div>
              <div className="text-[14px] text-white/85">
                {getResilienceLevel(resilienceScore).level} resilience
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">
                {getResilienceLevel(resilienceScore).description}
              </p>
            </div>

            <Button
              onClick={resetQuiz}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            >
              Take assessment again
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Building resilience
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resilienceStrategies.map((strategy, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[16px] font-semibold text-white">{strategy.title}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{strategy.description}</p>
              <ul className="space-y-1.5 pt-1">
                {strategy.techniques.map((technique, techIndex) => (
                  <li
                    key={techIndex}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <span>{technique}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResilienceTab;
