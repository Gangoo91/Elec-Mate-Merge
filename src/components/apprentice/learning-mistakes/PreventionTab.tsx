
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, Shield, CheckCircle, AlertTriangle, Users } from "lucide-react";
import { useState } from "react";

const PreventionTab = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const preventionStrategies = [
    {
      category: "Planning & Preparation",
      icon: Brain,
      color: "border-blue-500/20 bg-blue-500/10",
      description: "Set yourself up for success before you start",
      strategies: [
        {
          id: "plan-1",
          title: "Read job specifications thoroughly before starting",
          description: "Understand all requirements and scope completely",
          impact: "Prevents scope misunderstandings and rework"
        },
        {
          id: "plan-2",
          title: "Create a comprehensive materials checklist",
          description: "List all required components with quantities",
          impact: "Reduces wrong part selection and delays"
        },
        {
          id: "plan-3",
          title: "Review relevant BS 7671 regulations",
          description: "Check compliance requirements for the specific job",
          impact: "Ensures regulatory compliance from the start"
        }
      ]
    },
    {
      category: "Work Execution",
      icon: Shield,
      color: "border-green-500/20 bg-green-500/10",
      description: "Execute work with precision and safety",
      strategies: [
        {
          id: "exec-1",
          title: "Double-check all connections before energising",
          description: "Verify connections, polarity, and settings thoroughly",
          impact: "Catches errors before they become dangerous"
        },
        {
          id: "exec-2",
          title: "Follow proper testing sequence religiously",
          description: "Use dead testing procedures without shortcuts",
          impact: "Prevents live working incidents and injuries"
        },
        {
          id: "exec-3",
          title: "Label cables and circuits during installation",
          description: "Mark everything clearly as work progresses",
          impact: "Prevents confusion in complex installations"
        }
      ]
    },
    {
      category: "Communication & Documentation",
      icon: Users,
      color: "border-purple-500/20 bg-purple-500/10",
      description: "Keep everyone informed and records accurate",
      strategies: [
        {
          id: "comm-1",
          title: "Ask questions when anything is uncertain",
          description: "Clarify all doubts before proceeding with work",
          impact: "Prevents costly assumption-based errors"
        },
        {
          id: "comm-2",
          title: "Report progress regularly to supervisor",
          description: "Keep everyone informed of work status",
          impact: "Enables early intervention if issues arise"
        },
        {
          id: "comm-3",
          title: "Document any changes from original plan",
          description: "Record all deviations with reasons clearly",
          impact: "Maintains accurate installation records"
        }
      ]
    }
  ];

  const commonRisks = [
    {
      title: "High-Risk Situations",
      risks: [
        "Working under severe time pressure",
        "Unfamiliar installation types or locations",
        "Complex multi-circuit designs",
        "Multiple people working on same system"
      ]
    },
    {
      title: "Environmental Factors",
      risks: [
        "Noisy or distracting work environment",
        "End of day or week fatigue",
        "Client presence causing pressure",
        "New or unfamiliar tools and equipment"
      ]
    }
  ];

  const mitigationStrategies = [
    "Take regular breaks to maintain concentration",
    "Ask for help when facing unfamiliar situations",
    "Double-check all critical connections and settings",
    "Use systematic checklists for complex tasks",
    "Communicate concerns early to supervisors",
    "Plan work to avoid rushing at day's end"
  ];

  const toggleCompleted = (id: string) => {
    setCompletedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const calculateProgress = () => {
    const totalItems = preventionStrategies.reduce((sum, category) => sum + category.strategies.length, 0);
    return Math.round((completedItems.length / totalItems) * 100);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Prevention Strategies</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-2xl font-bold text-elec-yellow">{calculateProgress()}%</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {preventionStrategies.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={categoryIndex} className={`border rounded-lg p-6 ${category.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {category.strategies.map((strategy) => (
                      <div key={strategy.id} className="flex items-start gap-3 p-4 bg-black/20 rounded-lg">
                        <Checkbox
                          id={strategy.id}
                          checked={completedItems.includes(strategy.id)}
                          onCheckedChange={() => toggleCompleted(strategy.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={strategy.id} className="font-medium text-white cursor-pointer block">
                            {strategy.title}
                          </label>
                          <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                          <Badge variant="outline" className="mt-2 text-xs border-white/20">
                            {strategy.impact}
                          </Badge>
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
            <CardTitle className="text-elec-yellow">Risk Awareness & Mitigation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {commonRisks.map((riskCategory, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">{riskCategory.title}</h4>
                  <ul className="space-y-2">
                    {riskCategory.risks.map((risk, riskIndex) => (
                      <li key={riskIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Mitigation Strategies</h4>
              <ul className="space-y-2">
                {mitigationStrategies.map((strategy, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    {strategy}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreventionTab;
