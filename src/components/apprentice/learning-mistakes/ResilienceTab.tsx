
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const ResilienceTab = () => {
  const [resilienceScore, setResilienceScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const resilienceQuestions = [
    {
      question: "When I make a mistake at work, I...",
      options: [
        { text: "Panic and worry about being fired", score: 1 },
        { text: "Feel embarrassed but tell my supervisor", score: 3 },
        { text: "Calmly assess the situation and fix it", score: 5 },
        { text: "Learn from it and improve my process", score: 4 }
      ]
    },
    {
      question: "If a colleague criticises my work, I...",
      options: [
        { text: "Take it personally and get defensive", score: 1 },
        { text: "Listen but feel hurt", score: 2 },
        { text: "Consider their feedback objectively", score: 4 },
        { text: "Thank them and ask for specific advice", score: 5 }
      ]
    },
    {
      question: "When facing a challenging task, I...",
      options: [
        { text: "Avoid it or ask someone else to do it", score: 1 },
        { text: "Worry but attempt it anyway", score: 2 },
        { text: "Break it down into smaller steps", score: 4 },
        { text: "See it as an opportunity to learn", score: 5 }
      ]
    },
    {
      question: "After a difficult day at work, I...",
      options: [
        { text: "Dwell on what went wrong", score: 1 },
        { text: "Try to forget about it", score: 2 },
        { text: "Reflect on lessons learned", score: 4 },
        { text: "Plan how to improve tomorrow", score: 5 }
      ]
    }
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
    if (score >= 80) return { level: "High", color: "text-green-400", description: "You have excellent resilience skills" };
    if (score >= 60) return { level: "Good", color: "text-blue-400", description: "You're developing strong resilience" };
    if (score >= 40) return { level: "Moderate", color: "text-yellow-400", description: "There's room for improvement" };
    return { level: "Developing", color: "text-orange-400", description: "Focus on building resilience skills" };
  };

  const resilienceStrategies = [
    {
      title: "Growth Mindset",
      icon: TrendingUp,
      description: "View challenges as opportunities to learn and grow",
      techniques: [
        "Replace 'I can't do this' with 'I can't do this yet'",
        "Focus on the learning process, not just results",
        "Celebrate small improvements and progress"
      ]
    },
    {
      title: "Emotional Regulation",
      icon: Heart,
      description: "Manage your emotional responses to setbacks",
      techniques: [
        "Practice deep breathing when stressed",
        "Take a moment to pause before reacting",
        "Acknowledge feelings without being controlled by them"
      ]
    },
    {
      title: "Support Networks",
      icon: Users,
      description: "Build strong relationships for guidance and encouragement",
      techniques: [
        "Connect with mentors and experienced colleagues",
        "Join apprentice support groups",
        "Share experiences with fellow learners"
      ]
    },
    {
      title: "Self-Reflection",
      icon: Brain,
      description: "Regularly assess your progress and learning",
      techniques: [
        "Keep a learning journal",
        "Review mistakes objectively",
        "Identify patterns in your challenges"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Resilience Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Progress value={(currentQuestion / resilienceQuestions.length) * 100} className="flex-1" />
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} of {resilienceQuestions.length}
                </span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {resilienceQuestions[currentQuestion].question}
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {resilienceQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleAnswer(option.score)}
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-left justify-start h-auto p-4"
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Your Resilience Score</h3>
                <div className="text-4xl font-bold text-elec-yellow mb-2">{Math.round(resilienceScore)}%</div>
                <div className={`text-lg ${getResilienceLevel(resilienceScore).color}`}>
                  {getResilienceLevel(resilienceScore).level} Resilience
                </div>
                <p className="text-muted-foreground mt-2">
                  {getResilienceLevel(resilienceScore).description}
                </p>
              </div>
              
              <Button onClick={resetQuiz} className="w-full">
                Take Assessment Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Building Resilience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resilienceStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-white">{strategy.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                  <ul className="space-y-1">
                    {strategy.techniques.map((technique, techIndex) => (
                      <li key={techIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        {technique}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResilienceTab;
