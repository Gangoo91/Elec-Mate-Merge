import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, Shield, CheckCircle, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const PreventionTab = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [riskScore, setRiskScore] = useState(0);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);

  const preventionStrategies = [
    {
      category: "Planning & Preparation",
      icon: Brain,
      color: "border-blue-500/20 bg-blue-500/10",
      strategies: [
        {
          id: "plan-1",
          title: "Read job specifications thoroughly",
          description: "Understand requirements before starting",
          impact: "Prevents scope misunderstandings"
        },
        {
          id: "plan-2",
          title: "Create a materials checklist",
          description: "List all required components and quantities",
          impact: "Reduces wrong part selection"
        },
        {
          id: "plan-3",
          title: "Review relevant regulations",
          description: "Check BS 7671 requirements for the job",
          impact: "Ensures compliance from start"
        }
      ]
    },
    {
      category: "Work Execution",
      icon: Shield,
      color: "border-green-500/20 bg-green-500/10",
      strategies: [
        {
          id: "exec-1",
          title: "Double-check before energising",
          description: "Verify all connections and settings",
          impact: "Catches errors before they become dangerous"
        },
        {
          id: "exec-2",
          title: "Use proper testing sequence",
          description: "Follow dead testing procedures religiously",
          impact: "Prevents live working incidents"
        },
        {
          id: "exec-3",
          title: "Label as you go",
          description: "Mark cables and circuits during installation",
          impact: "Prevents confusion in complex installations"
        }
      ]
    },
    {
      category: "Communication",
      icon: Users,
      color: "border-purple-500/20 bg-purple-500/10",
      strategies: [
        {
          id: "comm-1",
          title: "Ask questions when uncertain",
          description: "Clarify doubts before proceeding",
          impact: "Prevents assumption-based errors"
        },
        {
          id: "comm-2",
          title: "Report progress regularly",
          description: "Keep supervisor informed of status",
          impact: "Early intervention if issues arise"
        },
        {
          id: "comm-3",
          title: "Document changes",
          description: "Record any deviations from original plan",
          impact: "Maintains accurate installation records"
        }
      ]
    }
  ];

  const riskFactors = [
    { factor: "Working under time pressure", weight: 3 },
    { factor: "Unfamiliar installation type", weight: 2 },
    { factor: "Complex circuit design", weight: 2 },
    { factor: "Multiple people on same circuit", weight: 2 },
    { factor: "Client present and watching", weight: 1 },
    { factor: "End of day/week", weight: 2 },
    { factor: "New or modified tools", weight: 1 },
    { factor: "Noisy work environment", weight: 1 }
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

  const handleRiskAssessment = (selectedFactors: string[]) => {
    const score = selectedFactors.reduce((sum, factor) => {
      const riskFactor = riskFactors.find(rf => rf.factor === factor);
      return sum + (riskFactor?.weight || 0);
    }, 0);
    
    setRiskScore(score);
    setShowRiskAssessment(false);
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: "Low", color: "text-green-400", description: "Standard precautions sufficient" };
    if (score <= 6) return { level: "Moderate", color: "text-yellow-400", description: "Extra care recommended" };
    if (score <= 10) return { level: "High", color: "text-orange-400", description: "Additional supervision advised" };
    return { level: "Very High", color: "text-red-400", description: "Consider postponing or redesigning task" };
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
                    <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.strategies.map((strategy) => (
                      <div key={strategy.id} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                        <Checkbox
                          id={strategy.id}
                          checked={completedItems.includes(strategy.id)}
                          onCheckedChange={() => toggleCompleted(strategy.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={strategy.id} className="font-medium text-white cursor-pointer">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Personal Risk Assessment</CardTitle>
            </div>
            <Button onClick={() => setShowRiskAssessment(true)} size="sm">
              Start Assessment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {riskScore > 0 && (
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-elec-yellow mb-2">Risk Level: {getRiskLevel(riskScore).level}</div>
              <div className={`text-lg ${getRiskLevel(riskScore).color}`}>
                {getRiskLevel(riskScore).description}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Common Risk Factors</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {riskFactors.slice(0, 4).map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    {factor.factor}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Mitigation Strategies</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  Take regular breaks
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  Ask for help when unsure
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  Double-check critical connections
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  Use checklists for complex tasks
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreventionTab;
