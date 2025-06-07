
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat } from "lucide-react";
import { SafetyScenario } from "./safetyScenarios";

interface ScenarioCardProps {
  scenario: SafetyScenario;
  onClick: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onClick }) => {
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
    e.stopPropagation(); // Prevent event bubbling
    try {
      onClick();
    } catch (error) {
      console.error('ScenarioCard - Error in button onClick handler:', error);
    }
  };

  return (
    <Card 
      className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-elec-yellow/10">
            <HardHat className="h-5 w-5 text-elec-yellow" />
          </div>
          <CardTitle className="text-lg">{scenario.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-elec-light/80">
          {scenario.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleButtonClick}
        >
          View Scenario
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
