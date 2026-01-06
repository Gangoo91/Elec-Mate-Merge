
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, ArrowLeft, ArrowRight, Send, CheckCircle } from "lucide-react";
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

  const handleOptionSelect = (optionId: string) => {
    try {
      onOptionSelect(optionId);
    } catch (error) {
      console.error('ScenarioDetail - Error selecting option:', error);
    }
  };

  const handleSubmitAnswer = () => {
    try {
      onSubmitAnswer();
    } catch (error) {
      console.error('ScenarioDetail - Error submitting answer:', error);
    }
  };

  const handleReset = () => {
    try {
      onReset();
    } catch (error) {
      console.error('ScenarioDetail - Error resetting:', error);
    }
  };

  const handleNextScenario = () => {
    try {
      onNextScenario();
    } catch (error) {
      console.error('ScenarioDetail - Error moving to next scenario:', error);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="relative">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 flex-shrink-0">
            <HardHat className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-white">{scenario.title}</CardTitle>
            <CardDescription className="text-white/70 mt-2">
              {scenario.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Question Box */}
        <div className="p-4 rounded-xl bg-white/10 border border-elec-yellow/30">
          <p className="font-medium text-lg text-white">{scenario.question}</p>
        </div>

        {/* Options */}
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

      <CardFooter className={`flex ${isMobile ? "flex-col" : "justify-end"} gap-3 pt-4 border-t border-white/10 relative`}>
        <Button
          variant="outline"
          onClick={handleReset}
          className={`${isMobile ? "w-full" : ""} border-white/20 hover:bg-white/10 text-white h-11 touch-manipulation active:scale-95 transition-all`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scenarios
        </Button>

        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            className={`${isMobile ? "w-full" : ""} bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-11 disabled:opacity-30 touch-manipulation active:scale-95 transition-all`}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextScenario}
            className={`${isMobile ? "w-full" : ""} bg-green-500 hover:bg-green-500/90 text-white font-semibold h-11 touch-manipulation active:scale-95 transition-all`}
          >
            {isLastScenario ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete All Scenarios
              </>
            ) : (
              <>
                Next Scenario
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ScenarioDetail;
