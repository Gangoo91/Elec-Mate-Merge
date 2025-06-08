
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HardHat, Clock, AlertTriangle, Building } from "lucide-react";
import { SafetyScenario } from "./safetyScenarios";

interface ScenarioCardProps {
  scenario: SafetyScenario;
  onClick: () => void;
  isCompleted?: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onClick, isCompleted = false }) => {
  console.log('ScenarioCard - Rendering scenario:', scenario.id, scenario.title);

  const handleClick = () => {
    console.log('ScenarioCard - Card clicked for scenario:', scenario.id);
    try {
      onClick();
    } catch (error) {
      console.error('ScenarioCard - Error in onClick handler:', error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    console.log('ScenarioCard - Button clicked for scenario:', scenario.id);
    e.stopPropagation();
    try {
      onClick();
    } catch (error) {
      console.error('ScenarioCard - Error in button onClick handler:', error);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "High": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card 
      className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors relative ${
        isCompleted ? 'ring-2 ring-green-500/50' : ''
      }`}
      onClick={handleClick}
    >
      {isCompleted && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Completed
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-elec-yellow/10">
            <HardHat className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{scenario.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-muted-foreground text-xs">
                {scenario.category}
              </Badge>
              <Badge className={getRiskLevelColor(scenario.riskLevel)} variant="outline">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {scenario.riskLevel}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <CardDescription className="text-elec-light/80 text-sm">
          {scenario.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2">
          <Badge className={getDifficultyColor(scenario.difficulty)} variant="outline">
            {scenario.difficulty}
          </Badge>
          
          <Badge variant="outline" className="text-muted-foreground">
            <Building className="h-3 w-3 mr-1" />
            {scenario.industry}
          </Badge>
          
          <Badge variant="outline" className="text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {scenario.duration}
          </Badge>
        </div>

        {scenario.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {scenario.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {scenario.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{scenario.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleButtonClick}
        >
          {isCompleted ? "Review Scenario" : "Start Scenario"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
