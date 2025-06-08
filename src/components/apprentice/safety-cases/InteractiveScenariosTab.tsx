
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Award, Target, Lightbulb } from "lucide-react";
import { useState } from "react";

const InteractiveScenariosTab = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: "electrical-shock",
      title: "Electrical Shock Incident",
      difficulty: "Beginner",
      duration: "10-15 mins",
      category: "Emergency Response",
      description: "An apprentice receives an electric shock while working on a domestic installation. Learn the proper emergency response procedures.",
      objectives: ["Immediate response to electrical shock", "First aid procedures", "Incident reporting", "Prevention measures"],
      completed: false
    },
    {
      id: "arc-flash",
      title: "Arc Flash Near Miss",
      difficulty: "Intermediate",
      duration: "15-20 mins", 
      category: "PPE & Safety",
      description: "A near-miss arc flash incident at an industrial facility. Understand risk assessment and PPE requirements.",
      objectives: ["Arc flash hazard recognition", "PPE selection", "Safe working distances", "Risk mitigation"],
      completed: true
    },
    {
      id: "lockout-failure",
      title: "Lockout/Tagout Failure",
      difficulty: "Advanced",
      duration: "20-25 mins",
      category: "Isolation Procedures",
      description: "A serious incident caused by improper isolation procedures. Learn comprehensive LOTO protocols.",
      objectives: ["Proper isolation procedures", "Verification testing", "Communication protocols", "System restoration"],
      completed: false
    },
    {
      id: "confined-space",
      title: "Confined Space Emergency",
      difficulty: "Advanced",
      duration: "25-30 mins",
      category: "Hazardous Environments",
      description: "Emergency response in a confined space electrical work environment with multiple hazards present.",
      objectives: ["Confined space protocols", "Atmospheric monitoring", "Emergency procedures", "Rescue planning"],
      completed: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Safety Scenarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Experience realistic safety scenarios through interactive decision-making exercises. 
            Each scenario is based on real incidents and provides valuable learning outcomes for electrical safety.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">
                {scenarios.filter(s => s.completed).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {scenarios.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Scenarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {Math.round((scenarios.filter(s => s.completed).length / scenarios.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="border-elec-yellow/20 bg-elec-gray relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-white text-lg">{scenario.title}</CardTitle>
                    {scenario.completed && (
                      <Award className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getDifficultyColor(scenario.difficulty)}>
                      {scenario.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {scenario.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {scenario.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {scenario.duration}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-elec-yellow" />
                    Learning Objectives:
                  </h4>
                  <ul className="space-y-1">
                    {scenario.objectives.map((objective, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={() => setSelectedScenario(scenario.id)}
                disabled={scenario.completed}
              >
                <Play className="mr-2 h-4 w-4" />
                {scenario.completed ? "Completed" : "Start Scenario"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            How Interactive Scenarios Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Scenario Structure</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Realistic situation presentation</li>
                <li>• Multiple decision points</li>
                <li>• Immediate feedback on choices</li>
                <li>• Detailed explanations of outcomes</li>
                <li>• Best practice recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Learning Benefits</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Practice critical decision-making</li>
                <li>• Learn from mistakes safely</li>
                <li>• Understand consequences of actions</li>
                <li>• Build confidence in emergency response</li>
                <li>• Reinforce safety procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveScenariosTab;
