
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Activity, Shield } from "lucide-react";
import { useState } from "react";

const StressManagementTab = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);

  const stressManagementTechniques = [
    {
      title: "4-7-8 Breathing Technique",
      description: "A simple breathing pattern to reduce anxiety and promote calm",
      icon: Activity,
      color: "border-blue-500/20 bg-blue-500/10",
      steps: [
        "Exhale completely through your mouth",
        "Inhale through nose for 4 counts",
        "Hold breath for 7 counts",
        "Exhale through mouth for 8 counts",
        "Repeat 3-4 times"
      ],
      whenToUse: "Before exams, during work stress, before sleep"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Systematically tense and relax muscle groups",
      icon: Brain,
      color: "border-green-500/20 bg-green-500/10",
      steps: [
        "Start with your toes, tense for 5 seconds",
        "Release and notice the relaxation",
        "Move up to calves, thighs, abdomen",
        "Continue through arms, shoulders, face",
        "End with whole-body tension and release"
      ],
      whenToUse: "After long work days, before important meetings"
    },
    {
      title: "Grounding Technique (5-4-3-2-1)",
      description: "Use your senses to stay present and reduce overwhelm",
      icon: Shield,
      color: "border-purple-500/20 bg-purple-500/10",
      steps: [
        "5 things you can see around you",
        "4 things you can touch",
        "3 things you can hear",
        "2 things you can smell",
        "1 thing you can taste"
      ],
      whenToUse: "During panic attacks, overwhelming situations"
    }
  ];

  const wellbeingTips = [
    {
      category: "Physical Wellbeing",
      tips: [
        "Maintain regular sleep schedule (7-9 hours)",
        "Stay hydrated throughout the day",
        "Take short walks during breaks",
        "Stretch regularly to prevent muscle tension",
        "Eat balanced meals to maintain energy"
      ]
    },
    {
      category: "Mental Wellbeing",
      tips: [
        "Practice mindfulness for 5-10 minutes daily",
        "Keep a gratitude journal",
        "Set realistic daily goals",
        "Celebrate small achievements",
        "Learn to say 'no' to non-essential commitments"
      ]
    },
    {
      category: "Social Wellbeing",
      tips: [
        "Maintain connections with friends and family",
        "Join apprentice support groups",
        "Communicate openly with your mentor",
        "Seek help when needed - it's a sign of strength",
        "Balance social time with alone time"
      ]
    }
  ];

  const warningSignsAndSolutions = [
    {
      warning: "Constant fatigue despite adequate sleep",
      solution: "Review workload and study schedule, consider reducing non-essential activities",
      urgency: "medium"
    },
    {
      warning: "Difficulty concentrating on simple tasks",
      solution: "Take regular breaks, practice mindfulness, check for underlying health issues",
      urgency: "medium"
    },
    {
      warning: "Increased irritability with colleagues or family",
      solution: "Practice stress management techniques, communicate your needs, consider counselling",
      urgency: "high"
    },
    {
      warning: "Loss of motivation or enjoyment in work/study",
      solution: "Speak with mentor or college support services, review career goals",
      urgency: "high"
    },
    {
      warning: "Physical symptoms: headaches, muscle tension, stomach issues",
      solution: "Consult healthcare provider, review stress levels, implement relaxation techniques",
      urgency: "high"
    }
  ];

  const startBreathingExercise = () => {
    setBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingCount(0);
    
    // Simple breathing timer simulation
    setTimeout(() => {
      setBreathingActive(false);
    }, 60000); // 1 minute exercise
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Stress Management Techniques</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {stressManagementTechniques.map((technique, index) => {
              const IconComponent = technique.icon;
              
              return (
                <div key={index} className={`border rounded-lg p-6 ${technique.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{technique.title}</h3>
                      <p className="text-sm text-muted-foreground">{technique.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-2">Steps:</h4>
                      <ol className="space-y-1">
                        {technique.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-elec-yellow font-medium text-xs mt-0.5">{stepIndex + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">When to use:</h4>
                      <p className="text-xs text-muted-foreground">{technique.whenToUse}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Quick Breathing Exercise</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {!breathingActive ? (
              <div>
                <p className="text-muted-foreground mb-4">
                  Take a moment to practice the 4-7-8 breathing technique. This can help reduce stress and anxiety.
                </p>
                <Button onClick={startBreathingExercise} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
                  Start Breathing Exercise
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-2xl font-bold text-elec-yellow">
                  {breathingPhase === 'inhale' && 'Breathe In...'}
                  {breathingPhase === 'hold' && 'Hold...'}
                  {breathingPhase === 'exhale' && 'Breathe Out...'}
                </div>
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-elec-yellow animate-pulse flex items-center justify-center">
                  <Activity className="h-8 w-8 text-elec-yellow" />
                </div>
                <p className="text-sm text-muted-foreground">Follow the breathing pattern for 1 minute</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Wellbeing Foundation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wellbeingTips.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Warning Signs & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {warningSignsAndSolutions.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Badge 
                    className={`mt-1 ${
                      item.urgency === 'high' 
                        ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    }`}
                  >
                    {item.urgency === 'high' ? 'High Priority' : 'Monitor'}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-2">{item.warning}</h4>
                    <p className="text-sm text-muted-foreground">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">Remember: Professional Help is Available</h4>
            <p className="text-sm text-muted-foreground">
              If you're experiencing persistent stress, anxiety, or mental health concerns, don't hesitate to reach out to:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Your college's student support services</li>
              <li>• Samaritans: 116 123 (free, 24/7)</li>
              <li>• Mind: 0300 123 3393</li>
              <li>• Your GP or NHS 111</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StressManagementTab;
