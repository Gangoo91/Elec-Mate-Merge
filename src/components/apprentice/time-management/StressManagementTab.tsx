
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Zap, Shield, AlertTriangle, Target, Users } from "lucide-react";
import { useState } from "react";

const StressManagementTab = () => {
  const [activeStressor, setActiveStressor] = useState<string | null>(null);
  const [activeTechnique, setActiveTechnique] = useState<string | null>(null);

  const apprenticeStressors = [
    {
      id: "performance",
      title: "Performance Pressure",
      description: "Feeling overwhelmed by expectations",
      icon: Target,
      triggers: [
        "Making mistakes in front of experienced electricians",
        "Not understanding technical concepts quickly enough",
        "Pressure to prove yourself on site",
        "Comparing yourself to other apprentices"
      ],
      solutions: [
        "Remember everyone started as a beginner",
        "Focus on your own progress, not others'",
        "Ask questions - it shows engagement, not weakness",
        "Keep a progress journal to see how far you've come"
      ]
    },
    {
      id: "workload",
      title: "Overwhelming Workload",
      description: "Balancing work, study, and personal life",
      icon: AlertTriangle,
      triggers: [
        "Multiple college assignments due simultaneously",
        "Long working hours followed by study requirements",
        "Feeling behind on coursework",
        "Physical exhaustion affecting concentration"
      ],
      solutions: [
        "Break large tasks into smaller, manageable chunks",
        "Use the Pomodoro Technique for focused study",
        "Communicate with tutors about workload concerns",
        "Prioritise tasks using the Eisenhower Matrix"
      ]
    },
    {
      id: "social",
      title: "Social and Workplace Stress",
      description: "Fitting in and building relationships",
      icon: Users,
      triggers: [
        "Feeling like an outsider on established teams",
        "Workplace banter or culture shock",
        "Difficulty communicating with supervisors",
        "Isolation from peers due to different sites"
      ],
      solutions: [
        "Join apprentice groups and forums",
        "Practice assertive communication techniques",
        "Find a workplace mentor or buddy",
        "Remember workplace relationships take time to develop"
      ]
    }
  ];

  const stressTechniques = [
    {
      id: "breathing",
      title: "Box Breathing",
      duration: "2-5 minutes",
      situation: "Before difficult conversations or exams",
      icon: Brain,
      color: "border-blue-500/20 bg-blue-500/10",
      steps: [
        "Inhale for 4 counts",
        "Hold for 4 counts", 
        "Exhale for 4 counts",
        "Hold empty for 4 counts",
        "Repeat 4-8 cycles"
      ],
      benefits: ["Reduces anxiety", "Improves focus", "Can be done anywhere"]
    },
    {
      id: "grounding",
      title: "5-4-3-2-1 Grounding",
      duration: "3-5 minutes",
      situation: "When feeling overwhelmed or panicked",
      icon: Shield,
      color: "border-green-500/20 bg-green-500/10",
      steps: [
        "5 things you can see",
        "4 things you can touch",
        "3 things you can hear",
        "2 things you can smell",
        "1 thing you can taste"
      ],
      benefits: ["Brings you to present moment", "Reduces overwhelm", "Works during panic attacks"]
    },
    {
      id: "progressive",
      title: "Progressive Muscle Relaxation",
      duration: "10-15 minutes",
      situation: "Before sleep or during breaks",
      icon: Heart,
      color: "border-purple-500/20 bg-purple-500/10",
      steps: [
        "Tense feet for 5 seconds, then relax",
        "Move up to calves, thighs, abdomen",
        "Continue with hands, arms, shoulders",
        "Finish with face and head",
        "Notice the difference between tension and relaxation"
      ],
      benefits: ["Improves sleep quality", "Reduces physical tension", "Increases body awareness"]
    }
  ];

  const quickStressReliefs = [
    { technique: "Deep breath and count to 10", time: "30 seconds", situation: "Immediate frustration" },
    { technique: "Step outside for fresh air", time: "2 minutes", situation: "Feeling trapped" },
    { technique: "Listen to calming music", time: "3-5 minutes", situation: "Break time" },
    { technique: "Text a supportive friend", time: "1 minute", situation: "Feeling isolated" },
    { technique: "Do desk stretches", time: "2 minutes", situation: "Physical tension" },
    { technique: "Drink cold water slowly", time: "1 minute", situation: "Feeling overwhelmed" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Apprentice Stressors</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apprenticeStressors.map((stressor) => {
              const IconComponent = stressor.icon;
              const isActive = activeStressor === stressor.id;
              
              return (
                <div key={stressor.id} className="border border-elec-yellow/20 rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-elec-yellow/5 transition-colors"
                    onClick={() => setActiveStressor(isActive ? null : stressor.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-elec-yellow" />
                        <div>
                          <h4 className="font-semibold text-white">{stressor.title}</h4>
                          <p className="text-sm text-muted-foreground">{stressor.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {isActive ? 'Hide' : 'Show'} Details
                      </Button>
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="px-4 pb-4 border-t border-elec-yellow/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h5 className="font-medium text-white mb-2">Common Triggers:</h5>
                          <ul className="space-y-1">
                            {stressor.triggers.map((trigger, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                {trigger}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-white mb-2">Coping Strategies:</h5>
                          <ul className="space-y-1">
                            {stressor.solutions.map((solution, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Stress Reduction Techniques</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {stressTechniques.map((technique) => {
              const IconComponent = technique.icon;
              const isActive = activeTechnique === technique.id;
              
              return (
                <div key={technique.id} className={`border rounded-lg p-6 ${technique.color} transition-all duration-200 hover:scale-102`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{technique.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs border-white/20">
                          {technique.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{technique.situation}</p>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-white/20 text-white hover:bg-white/10 mb-4"
                    onClick={() => setActiveTechnique(isActive ? null : technique.id)}
                  >
                    {isActive ? 'Hide Steps' : 'Show Steps'}
                  </Button>

                  {isActive && (
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-white mb-2">Steps:</h4>
                        <ol className="space-y-1">
                          {technique.steps.map((step, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-elec-yellow font-medium">{index + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {technique.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-green-400/30 text-green-400">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Quick Stress Relief (1-5 minutes)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickStressReliefs.map((relief, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{relief.technique}</h4>
                  <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                    {relief.time}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{relief.situation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StressManagementTab;
