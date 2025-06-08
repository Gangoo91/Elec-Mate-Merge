
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

const RecoveryStrategiesTab = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerCount, setTimerCount] = useState(0);

  const recoverySteps = [
    {
      title: "Immediate Response",
      timeframe: "0-5 minutes",
      icon: AlertTriangle,
      color: "border-red-500/20 bg-red-500/10",
      steps: [
        "Stop work immediately if safety is compromised",
        "Assess the situation calmly",
        "Inform your supervisor",
        "Document what happened"
      ],
      tips: ["Don't panic", "Be honest", "Focus on safety first"]
    },
    {
      title: "Analysis Phase",
      timeframe: "5-15 minutes",
      icon: Target,
      color: "border-amber-500/20 bg-amber-500/10",
      steps: [
        "Identify the root cause",
        "Understand what went wrong",
        "Consider contributing factors",
        "Plan corrective action"
      ],
      tips: ["Ask 'why' 5 times", "Consider all factors", "Avoid blame"]
    },
    {
      title: "Recovery Action",
      timeframe: "15+ minutes",
      icon: CheckCircle,
      color: "border-green-500/20 bg-green-500/10",
      steps: [
        "Implement the fix",
        "Test the solution",
        "Verify compliance",
        "Update documentation"
      ],
      tips: ["Double-check work", "Test thoroughly", "Learn from it"]
    }
  ];

  const startTimer = (title: string) => {
    setActiveTimer(title);
    setTimerCount(0);
    const interval = setInterval(() => {
      setTimerCount(prev => {
        if (prev >= 300) { // 5 minutes
          clearInterval(interval);
          setActiveTimer(null);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
              const isActive = activeTimer === step.title;
              
              return (
                <div key={index} className={`border rounded-lg p-6 ${step.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <Badge variant="outline" className="text-xs border-white/20">
                        {step.timeframe}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startTimer(step.title)}
                      disabled={activeTimer !== null}
                      className="border-white/20 hover:bg-white/10"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {isActive ? formatTime(timerCount) : "Start"}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-2">Steps:</h4>
                      <ol className="space-y-1">
                        {step.steps.map((stepItem, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-elec-yellow font-medium text-xs">{stepIndex + 1}.</span>
                            {stepItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Key Tips:</h4>
                      <div className="flex flex-wrap gap-1">
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
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Cable Mix-Up Recovery</h4>
              <p className="text-sm text-muted-foreground mb-3">
                "I connected the wrong cables in a three-phase supply. Caught it during testing, 
                immediately isolated, corrected the connections, and retested. Supervisor appreciated 
                my honesty and thoroughness."
              </p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                Positive Outcome
              </Badge>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Wrong MCB Rating</h4>
              <p className="text-sm text-muted-foreground mb-3">
                "Installed 32A MCB instead of 20A for lighting circuit. Realised during final 
                check, replaced immediately, and created a checklist to prevent future errors."
              </p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                Learning Applied
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecoveryStrategiesTab;
