
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, Target, AlertTriangle } from "lucide-react";

const PreventionTab = () => {
  const preventionStrategies = [
    {
      strategy: "Systematic Checking Procedures",
      icon: CheckCircle,
      effectiveness: 85,
      description: "Develop consistent checking routines for all work",
      techniques: [
        {
          name: "The Three-Check Method",
          description: "Check your work at three stages: during, immediately after, and before moving to next task",
          example: "When terminating cables: check during stripping, after connection, before leaving the area"
        },
        {
          name: "Peer Review System",
          description: "Ask colleagues to check critical work before testing",
          example: "Have another apprentice verify your consumer unit connections before energising"
        },
        {
          name: "Documentation Verification",
          description: "Always cross-reference your work against drawings and specifications",
          example: "Check cable schedule against actual connections, verify circuit labelling matches drawings"
        }
      ]
    },
    {
      strategy: "Knowledge Gap Management",
      icon: Brain,
      effectiveness: 90,
      description: "Proactively identify and address areas of uncertainty",
      techniques: [
        {
          name: "Pre-Task Knowledge Check",
          description: "Before starting any task, honestly assess your understanding",
          example: "Ask yourself: Do I understand every step? Have I done this before? What could go wrong?"
        },
        {
          name: "Question Preparation",
          description: "Prepare specific questions before starting complex tasks",
          example: "Write down what you're uncertain about and discuss with supervisor before beginning"
        },
        {
          name: "Learning Resource Access",
          description: "Keep reference materials easily accessible during work",
          example: "Have BS 7671, cable charts, and calculation sheets readily available"
        }
      ]
    },
    {
      strategy: "Environmental Awareness",
      icon: Target,
      effectiveness: 75,
      description: "Recognize and manage factors that increase mistake likelihood",
      techniques: [
        {
          name: "Pressure Point Recognition",
          description: "Identify when time pressure is affecting your work quality",
          example: "When feeling rushed, take 2 minutes to slow down and refocus on accuracy"
        },
        {
          name: "Fatigue Management",
          description: "Recognize when tiredness is affecting concentration",
          example: "Take proper breaks, avoid complex tasks when extremely tired"
        },
        {
          name: "Distraction Control",
          description: "Manage your work environment to minimize interruptions",
          example: "Complete critical connections without interruption, organize workspace to reduce confusion"
        }
      ]
    }
  ];

  const riskFactors = [
    {
      factor: "Time Pressure",
      riskLevel: "High",
      commonSituations: ["End of day rush", "Client waiting on-site", "Behind schedule pressure"],
      mitigations: [
        "Communicate delays early rather than rushing",
        "Break urgent tasks into smaller, manageable steps",
        "Focus on safety and quality over speed",
        "Ask for help or additional time when needed"
      ]
    },
    {
      factor: "Overconfidence",
      riskLevel: "Medium",
      commonSituations: ["Familiar, routine tasks", "Recent success on similar work", "Working without supervision"],
      mitigations: [
        "Maintain checking procedures even for routine work",
        "Remember that familiarity can breed complacency",
        "Stay alert to new variables in familiar situations",
        "Regularly review and update your procedures"
      ]
    },
    {
      factor: "Knowledge Gaps",
      riskLevel: "High",
      commonSituations: ["New regulations", "Unfamiliar equipment", "Complex calculations"],
      mitigations: [
        "Admit when you don't know something",
        "Research thoroughly before starting",
        "Seek guidance from qualified colleagues",
        "Practice new skills in low-risk situations"
      ]
    },
    {
      factor: "Communication Breakdown",
      riskLevel: "Medium",
      commonSituations: ["Unclear instructions", "Assumptions about requirements", "Missing information"],
      mitigations: [
        "Ask clarifying questions when instructions are unclear",
        "Confirm understanding by summarizing back",
        "Document important decisions and changes",
        "Establish regular check-in points with supervisors"
      ]
    }
  ];

  const preventionTools = [
    {
      tool: "Personal Mistake Log",
      description: "Track patterns in your own mistakes to identify improvement areas",
      components: ["Date and task", "What went wrong", "Why it happened", "How to prevent next time"],
      benefits: "Reveals personal error patterns and effective prevention strategies"
    },
    {
      tool: "Pre-Task Risk Assessment",
      description: "Systematic evaluation of potential problems before starting work",
      components: ["Task complexity", "Your experience level", "Environmental factors", "Available support"],
      benefits: "Identifies high-risk situations before problems occur"
    },
    {
      tool: "Quality Checklist System",
      description: "Standardized checklists for common electrical tasks",
      components: ["Safety checks", "Technical requirements", "Testing procedures", "Documentation needs"],
      benefits: "Ensures consistent quality and reduces oversight errors"
    },
    {
      tool: "Learning Partnership",
      description: "Regular knowledge sharing with fellow apprentices",
      components: ["Weekly mistake discussions", "Shared learning resources", "Peer review sessions", "Group problem solving"],
      benefits: "Learn from others' experiences and get different perspectives"
    }
  ];

  const proactiveHabits = [
    {
      habit: "Daily Learning Review",
      description: "Spend 10 minutes each day reviewing what you learned and what challenged you",
      frequency: "Daily",
      impact: "High"
    },
    {
      habit: "Weekly Skill Assessment",
      description: "Honestly evaluate your competence in different areas each week",
      frequency: "Weekly",
      impact: "Medium"
    },
    {
      habit: "Monthly Goal Setting",
      description: "Set specific learning and improvement goals each month",
      frequency: "Monthly",
      impact: "High"
    },
    {
      habit: "Quarterly Reflection",
      description: "Deep reflection on major lessons learned and areas for improvement",
      frequency: "Quarterly",
      impact: "Very High"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Prevention Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {preventionStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{strategy.strategy}</h3>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
                    <Badge variant="outline" className="border-green-500/40 text-green-400">
                      {strategy.effectiveness}% effective
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {strategy.techniques.map((technique, techIndex) => (
                      <div key={techIndex} className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">{technique.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                          <h5 className="font-medium text-blue-300 mb-1">Example:</h5>
                          <p className="text-sm text-muted-foreground">{technique.example}</p>
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
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Risk Factor Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {riskFactors.map((factor, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-white">{factor.factor}</h4>
                  <Badge 
                    variant={factor.riskLevel === 'High' ? 'destructive' : 'outline'}
                    className={factor.riskLevel === 'Medium' ? 'border-amber-500/40 text-amber-400' : ''}
                  >
                    {factor.riskLevel} Risk
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2">Common Situations:</h5>
                    <ul className="space-y-1">
                      {factor.commonSituations.map((situation, sIndex) => (
                        <li key={sIndex} className="text-sm text-muted-foreground">• {situation}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Mitigation Strategies:</h5>
                    <ul className="space-y-1">
                      {factor.mitigations.map((mitigation, mIndex) => (
                        <li key={mIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                          {mitigation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Prevention Tools & Systems</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {preventionTools.map((tool, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{tool.tool}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                
                <div className="bg-blue-500/10 p-3 rounded-lg mb-3">
                  <h5 className="font-medium text-blue-300 mb-2">Components:</h5>
                  <ul className="space-y-1">
                    {tool.components.map((component, cIndex) => (
                      <li key={cIndex} className="text-sm text-muted-foreground">• {component}</li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-sm text-elec-yellow">
                  <strong>Benefits:</strong> {tool.benefits}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Proactive Learning Habits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {proactiveHabits.map((habit, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-white mb-2">{habit.habit}</h4>
                <p className="text-sm text-muted-foreground mb-3">{habit.description}</p>
                <div className="space-y-2">
                  <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                    {habit.frequency}
                  </Badge>
                  <div className="text-sm">
                    <span className="text-elec-yellow font-medium">Impact: </span>
                    <span className="text-muted-foreground">{habit.impact}</span>
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

export default PreventionTab;
