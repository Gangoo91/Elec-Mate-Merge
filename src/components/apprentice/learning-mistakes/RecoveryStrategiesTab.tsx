
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle, AlertTriangle, Users } from "lucide-react";

const RecoveryStrategiesTab = () => {
  const recoveryFramework = [
    {
      phase: "Immediate Response",
      icon: AlertTriangle,
      color: "border-red-500/20 bg-red-500/10",
      duration: "0-5 minutes",
      actions: [
        {
          action: "Stop and Assess",
          description: "Pause work immediately to prevent further issues",
          example: "If you realize you've made an error, stop before continuing"
        },
        {
          action: "Ensure Safety",
          description: "Check if the mistake creates any immediate safety risks",
          example: "Isolate power if there's any electrical safety concern"
        },
        {
          action: "Inform Supervisor",
          description: "Report the mistake honestly and immediately",
          example: "'I've made an error with the cable routing and need guidance'"
        }
      ]
    },
    {
      phase: "Analysis & Planning",
      icon: Target,
      color: "border-amber-500/20 bg-amber-500/10",
      duration: "5-30 minutes",
      actions: [
        {
          action: "Root Cause Analysis",
          description: "Understand why the mistake happened",
          example: "Was it lack of knowledge, rushing, or miscommunication?"
        },
        {
          action: "Assess Impact",
          description: "Determine the full scope of the mistake",
          example: "What other work is affected? What needs to be redone?"
        },
        {
          action: "Develop Recovery Plan",
          description: "Create a step-by-step plan to fix the issue",
          example: "List materials needed, time required, and safety considerations"
        }
      ]
    },
    {
      phase: "Implementation",
      icon: CheckCircle,
      color: "border-green-500/20 bg-green-500/10",
      duration: "Variable",
      actions: [
        {
          action: "Execute Corrections",
          description: "Implement the recovery plan systematically",
          example: "Replace incorrect components, redo connections properly"
        },
        {
          action: "Document Process",
          description: "Record what was done and lessons learned",
          example: "Note the mistake and solution in your learning journal"
        },
        {
          action: "Test and Verify",
          description: "Ensure the correction solves the problem completely",
          example: "Test all affected circuits and verify compliance"
        }
      ]
    }
  ];

  const communicationStrategies = [
    {
      situation: "Admitting the Mistake",
      approach: "Direct and Professional",
      script: "I need to report an error. I incorrectly sized the cable for circuit X. I've stopped work and isolated the area. What's the best way to proceed?",
      tips: ["Be specific about what went wrong", "Show you've taken safety precautions", "Ask for guidance, don't try to hide it"]
    },
    {
      situation: "Discussing with Client",
      approach: "Honest but Reassuring",
      script: "We've identified an issue that needs correction to ensure safety and compliance. We'll fix it at no additional cost and it will add X hours to the schedule.",
      tips: ["Focus on the solution, not the problem", "Emphasize safety and quality", "Take responsibility professionally"]
    },
    {
      situation: "Learning Debrief",
      approach: "Reflective and Forward-Looking",
      script: "Here's what I learned from this mistake and how I'll prevent it in future. Can you help me understand if there were other factors I should consider?",
      tips: ["Show you've reflected on the issue", "Ask for additional insights", "Demonstrate commitment to improvement"]
    }
  ];

  const recoveryTools = [
    {
      tool: "The 5 Whys Technique",
      description: "Ask 'why' five times to get to the root cause",
      example: "Why did I use wrong cable? Because I misread the drawing. Why did I misread? Because I was rushing. Why was I rushing? Because I felt behind schedule. Why felt behind? Because I didn't ask for help when confused. Why didn't ask? Because I was afraid to look inexperienced.",
      outcome: "Real issue: Fear of appearing inexperienced led to mistake"
    },
    {
      tool: "After Action Review",
      description: "Structured review of what happened and why",
      questions: ["What was supposed to happen?", "What actually happened?", "Why were there differences?", "What can we learn?"],
      benefit: "Systematic approach to learning from mistakes"
    },
    {
      tool: "Recovery Timeline",
      description: "Document the mistake and recovery process",
      components: ["Mistake description", "Discovery time", "Impact assessment", "Recovery actions", "Time to resolution", "Lessons learned"],
      benefit: "Creates learning resource for future situations"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Recovery Framework</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recoveryFramework.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${phase.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
                      <Badge variant="outline" className="mt-1">
                        {phase.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {phase.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">{action.action}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                          <p className="text-sm text-blue-200">
                            <strong>Example:</strong> {action.example}
                          </p>
                        </div>
                      </div>
                    ))}
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
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Communication Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {communicationStrategies.map((strategy, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-white">{strategy.situation}</h4>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                    {strategy.approach}
                  </Badge>
                </div>
                <div className="bg-elec-yellow/10 p-4 rounded-lg mb-3">
                  <p className="text-sm text-muted-foreground italic">"{strategy.script}"</p>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Key Tips:</h5>
                  <ul className="space-y-1">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Recovery Analysis Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recoveryTools.map((tool, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{tool.tool}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                
                {tool.example && (
                  <div className="bg-amber-500/10 p-3 rounded-lg mb-3">
                    <h5 className="font-medium text-amber-300 mb-1">Example:</h5>
                    <p className="text-sm text-muted-foreground">{tool.example}</p>
                    {tool.outcome && (
                      <p className="text-sm text-green-300 mt-2">
                        <strong>Outcome:</strong> {tool.outcome}
                      </p>
                    )}
                  </div>
                )}
                
                {tool.questions && (
                  <div className="bg-blue-500/10 p-3 rounded-lg mb-3">
                    <h5 className="font-medium text-blue-300 mb-2">Key Questions:</h5>
                    <ul className="space-y-1">
                      {tool.questions.map((question, qIndex) => (
                        <li key={qIndex} className="text-sm text-muted-foreground">• {question}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {tool.components && (
                  <div className="bg-green-500/10 p-3 rounded-lg mb-3">
                    <h5 className="font-medium text-green-300 mb-2">Components:</h5>
                    <ul className="space-y-1">
                      {tool.components.map((component, cIndex) => (
                        <li key={cIndex} className="text-sm text-muted-foreground">• {component}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <p className="text-sm text-elec-yellow">
                  <strong>Benefit:</strong> {tool.benefit}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecoveryStrategiesTab;
