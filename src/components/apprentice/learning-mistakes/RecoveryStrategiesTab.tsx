
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, AlertTriangle, CheckCircle } from "lucide-react";

const RecoveryStrategiesTab = () => {
  const recoverySteps = [
    {
      title: "Immediate Response",
      timeframe: "0-5 minutes",
      icon: AlertTriangle,
      color: "border-red-500/20 bg-red-500/10",
      description: "Take control of the situation quickly and safely",
      steps: [
        "Stop work immediately if safety is compromised",
        "Assess the situation calmly and objectively",
        "Inform your supervisor or mentor promptly",
        "Document what happened whilst it's fresh"
      ],
      tips: ["Don't panic - stay calm", "Be honest and transparent", "Safety comes first always"]
    },
    {
      title: "Analysis Phase",
      timeframe: "5-15 minutes",
      icon: Target,
      color: "border-amber-500/20 bg-amber-500/10",
      description: "Understand the root cause thoroughly",
      steps: [
        "Identify the specific root cause",
        "Understand exactly what went wrong",
        "Consider all contributing factors",
        "Plan your corrective action carefully"
      ],
      tips: ["Ask 'why' five times", "Consider all factors", "Avoid blame - focus on facts"]
    },
    {
      title: "Recovery Action",
      timeframe: "15+ minutes",
      icon: CheckCircle,
      color: "border-green-500/20 bg-green-500/10",
      description: "Implement solutions and verify results",
      steps: [
        "Implement the corrective fix properly",
        "Test the solution thoroughly",
        "Verify full compliance with standards",
        "Update all relevant documentation"
      ],
      tips: ["Double-check all work", "Test everything thoroughly", "Document lessons learned"]
    }
  ];

  const successStories = [
    {
      title: "Cable Mix-Up Recovery",
      description: "Connected wrong cables in a three-phase supply. Caught it during testing, immediately isolated, corrected the connections, and retested thoroughly. Supervisor appreciated the honesty and methodical approach.",
      outcome: "Positive Outcome",
      lesson: "Testing procedures save the day"
    },
    {
      title: "Wrong MCB Rating",
      description: "Installed 32A MCB instead of 20A for lighting circuit. Realised during final check, replaced immediately, and created a personal checklist to prevent future errors.",
      outcome: "Learning Applied",
      lesson: "Systematic checking prevents repeats"
    },
    {
      title: "Earthing Connection Issue",
      description: "Inadequate earth connection discovered during testing. Re-made connection properly, tested continuity, and learned about proper termination techniques from mentor.",
      outcome: "Skill Development",
      lesson: "Every mistake teaches technique"
    },
    {
      title: "Documentation Error",
      description: "Forgot to update circuit schedule after modification. Caught during handover, immediately updated all paperwork, and implemented a documentation checklist system.",
      outcome: "Process Improvement",
      lesson: "Good systems prevent human error"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Mistake Recovery Framework</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recoverySteps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <div key={index} className={`border rounded-lg p-6 ${step.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <Badge variant="outline" className="text-xs border-white/20 mt-1">
                        {step.timeframe}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-2">Key Steps:</h4>
                      <ol className="space-y-2">
                        {step.steps.map((stepItem, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-elec-yellow font-medium text-xs mt-0.5">{stepIndex + 1}.</span>
                            <span>{stepItem}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Remember:</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.tips.map((tip, tipIndex) => (
                          <Badge key={tipIndex} variant="outline" className="text-xs border-white/20">
                            {tip}
                          </Badge>
                        ))}
                      </div>
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
          <CardTitle className="text-elec-yellow">Recovery Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {successStories.map((story, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{story.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                
                <div className="flex flex-col gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/40 w-fit">
                    {story.outcome}
                  </Badge>
                  <div className="text-xs text-elec-yellow">
                    <strong>Key Lesson:</strong> {story.lesson}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecoveryStrategiesTab;
