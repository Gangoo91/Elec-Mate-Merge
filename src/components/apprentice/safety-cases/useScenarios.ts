
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SafetyScenario, safetyScenarios } from "./safetyScenarios";

export const useScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState<SafetyScenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const { toast } = useToast();

  const handleSelectScenario = (scenario: SafetyScenario) => {
    setSelectedScenario(scenario);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !selectedScenario) {
      toast({
        title: "No option selected",
        description: "Please select an option to continue",
        variant: "destructive"
      });
      return;
    }
    
    setShowFeedback(true);
    
    // Mark this scenario as completed
    if (!completedScenarios.includes(selectedScenario.id)) {
      setCompletedScenarios(prev => [...prev, selectedScenario.id]);
    }
    
    const correctOption = selectedScenario.options.find(option => option.isCorrect);
    const isCorrect = selectedScenario.options.find(option => option.id === selectedOption)?.isCorrect;
    
    if (isCorrect) {
      toast({
        title: "Correct choice!",
        description: "You've made the safe and professional decision",
        variant: "default"
      });
    } else {
      toast({
        title: "Consider a different approach",
        description: `The safer option would be: ${correctOption?.text}`,
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleNextScenario = () => {
    if (!selectedScenario) return;
    
    const nextScenarioIndex = safetyScenarios.findIndex(s => s.id === selectedScenario.id) + 1;
    if (nextScenarioIndex < safetyScenarios.length) {
      handleSelectScenario(safetyScenarios[nextScenarioIndex]);
    } else {
      handleReset();
    }
  };

  const isLastScenario = selectedScenario 
    ? safetyScenarios.findIndex(s => s.id === selectedScenario.id) === safetyScenarios.length - 1
    : false;

  return {
    scenarios: safetyScenarios,
    selectedScenario,
    selectedOption,
    showFeedback,
    completedScenarios,
    isLastScenario,
    handleSelectScenario,
    handleOptionSelect,
    handleSubmitAnswer,
    handleReset,
    handleNextScenario
  };
};
