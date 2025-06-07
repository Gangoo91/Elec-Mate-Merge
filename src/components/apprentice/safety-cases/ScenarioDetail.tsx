
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat } from "lucide-react";
import ScenarioOption from "./ScenarioOption";
import { SafetyScenario } from "./safetyScenarios";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScenarioDetailProps {
  scenario: SafetyScenario;
  selectedOption: string | null;
  showFeedback: boolean;
  onOptionSelect: (optionId: string) => void;
  onSubmitAnswer: () => void;
  onReset: () => void;
  onNextScenario: () => void;
  isLastScenario: boolean;
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({
  scenario,
  selectedOption,
  showFeedback,
  onOptionSelect,
  onSubmitAnswer,
  onReset,
  onNextScenario,
  isLastScenario,
}) => {
  const isMobile = useIsMobile();

  console.log('ScenarioDetail - Rendering scenario:', {
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    selectedOption,
    showFeedback,
    isLastScenario,
    optionsCount: scenario.options?.length || 0
  });

  const handleOptionSelect = (optionId: string) => {
    console.log('ScenarioDetail - Option selected:', optionId);
    try {
      onOptionSelect(optionId);
    } catch (error) {
      console.error('ScenarioDetail - Error selecting option:', error);
    }
  };

  const handleSubmitAnswer = () => {
    console.log('ScenarioDetail - Submitting answer:', selectedOption);
    try {
      onSubmitAnswer();
    } catch (error) {
      console.error('ScenarioDetail - Error submitting answer:', error);
    }
  };

  const handleReset = () => {
    console.log('ScenarioDetail - Resetting to scenario list');
    try {
      onReset();
    } catch (error) {
      console.error('ScenarioDetail - Error resetting:', error);
    }
  };

  const handleNextScenario = () => {
    console.log('ScenarioDetail - Moving to next scenario');
    try {
      onNextScenario();
    } catch (error) {
      console.error('ScenarioDetail - Error moving to next scenario:', error);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <HardHat className="h-6 w-6 text-elec-yellow" />
          <CardTitle>{scenario.title}</CardTitle>
        </div>
        <CardDescription className="text-base text-elec-light/80 mt-2">
          {scenario.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
          <p className="font-medium text-lg">{scenario.question}</p>
        </div>

        <div className="space-y-3">
          {scenario.options.map((option) => (
            <ScenarioOption
              key={option.id}
              optionId={option.id}
              text={option.text}
              isSelected={selectedOption === option.id}
              isCorrect={option.isCorrect}
              feedback={option.feedback}
              outcome={option.outcome}
              regulation={option.regulation}
              showFeedback={showFeedback}
              onClick={() => handleOptionSelect(option.id)}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className={`flex ${isMobile ? "flex-col" : "justify-end"} gap-3`}>
        <Button 
          variant="outline" 
          onClick={handleReset} 
          className={isMobile ? "w-full" : ""}
        >
          Back to Scenarios
        </Button>
        {!showFeedback ? (
          <Button 
            onClick={handleSubmitAnswer} 
            disabled={!selectedOption} 
            className={isMobile ? "w-full" : ""}
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNextScenario} 
            className={isMobile ? "w-full" : ""}
          >
            {isLastScenario ? "Complete All Scenarios" : "Next Scenario"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ScenarioDetail;
