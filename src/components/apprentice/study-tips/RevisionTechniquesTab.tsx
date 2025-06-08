
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, RefreshCw, Users, Target } from "lucide-react";

const RevisionTechniquesTab = () => {
  const techniques = [
    {
      technique: "Active Recall",
      icon: Brain,
      description: "Test yourself without looking at notes",
      effectiveness: 90,
      howTo: "Cover your notes and try to write down everything you remember about a topic",
      example: "Cover formulas and try to write them from memory, then check your accuracy",
      benefits: ["Strengthens memory pathways", "Identifies knowledge gaps", "Builds confidence"]
    },
    {
      technique: "Spaced Repetition",
      icon: RefreshCw,
      description: "Review material at increasing intervals",
      effectiveness: 85,
      howTo: "Review today, then in 3 days, 1 week, 2 weeks, and 1 month",
      example: "Study cable calculations today, review them Tuesday, next Monday, then next month",
      benefits: ["Prevents forgetting", "Efficient use of time", "Long-term retention"]
    },
    {
      technique: "Teaching Others",
      icon: Users,
      description: "Explain concepts to fellow apprentices",
      effectiveness: 95,
      howTo: "Form study groups and take turns teaching different topics",
      example: "Explain three-phase power calculations to your study group",
      benefits: ["Deepens understanding", "Reveals gaps", "Builds communication skills"]
    },
    {
      technique: "Practice Testing",
      icon: Target,
      description: "Take mock exams under real conditions",
      effectiveness: 80,
      howTo: "Set timer, use only allowed materials, no interruptions",
      example: "Complete a full 18th Edition practice paper in 2 hours",
      benefits: ["Reduces exam anxiety", "Improves time management", "Identifies weak areas"]
    }
  ];

  const studyMethods = [
    {
      method: "The Feynman Technique",
      steps: [
        "Choose a concept you want to learn",
        "Explain it in simple terms as if teaching a child",
        "Identify gaps in your explanation",
        "Go back to source material to fill gaps",
        "Repeat until you can explain clearly"
      ],
      bestFor: "Complex electrical theory concepts"
    },
    {
      method: "Mind Mapping",
      steps: [
        "Start with main topic in centre",
        "Add major branches for subtopics",
        "Include formulas, diagrams, examples",
        "Use colours and symbols",
        "Review and update regularly"
      ],
      bestFor: "Connecting related topics and regulations"
    },
    {
      method: "The Pomodoro Technique",
      steps: [
        "Study for 25 minutes focused",
        "Take 5 minute break",
        "Repeat 3-4 times",
        "Take longer 15-30 minute break",
        "Track what you accomplished"
      ],
      bestFor: "Maintaining concentration and avoiding burnout"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Evidence-Based Revision Techniques</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {techniques.map((technique, index) => {
              const IconComponent = technique.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{technique.technique}</h3>
                      <p className="text-sm text-muted-foreground">{technique.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-elec-yellow font-medium">{technique.effectiveness}% effective</div>
                      <Progress value={technique.effectiveness} className="w-20 mt-1" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">How to do it</h4>
                      <p className="text-sm text-muted-foreground mb-3">{technique.howTo}</p>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <h5 className="font-medium text-blue-400 mb-1">Example</h5>
                        <p className="text-sm text-muted-foreground">{technique.example}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Benefits</h4>
                      <ul className="space-y-1">
                        {technique.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
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
          <CardTitle className="text-elec-yellow">Proven Study Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {studyMethods.map((method, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">{method.method}</h3>
                <ol className="space-y-2 mb-4">
                  {method.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow font-medium text-xs">{stepIndex + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="bg-elec-yellow/10 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-elec-yellow">Best for:</strong> {method.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevisionTechniquesTab;
