
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SafetyScenario, safetyScenarios } from "./safetyScenarios";

export const useScenarios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<SafetyScenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  
  const { toast } = useToast();

  // Initialize hook with logging
  useEffect(() => {
    console.log('useScenarios - Initializing hook');
    console.log('useScenarios - Available scenarios:', safetyScenarios?.length || 0);
    
    try {
      // Simulate initialization delay and validate data
      const timer = setTimeout(() => {
        if (!safetyScenarios || safetyScenarios.length === 0) {
          console.error('useScenarios - No safety scenarios found');
          setError('No safety scenarios available');
        } else {
          console.log('useScenarios - Successfully initialized with scenarios:', safetyScenarios.map(s => s.id));
        }
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('useScenarios - Initialization error:', err);
      setError('Failed to initialize safety scenarios');
      setIsLoading(false);
    }
  }, []);

  const handleSelectScenario = (scenario: SafetyScenario) => {
    console.log('useScenarios - Selecting scenario:', scenario.id, scenario.title);
    try {
      setSelectedScenario(scenario);
      setSelectedOption(null);
      setShowFeedback(false);
    } catch (err) {
      console.error('useScenarios - Error selecting scenario:', err);
      setError('Failed to select scenario');
    }
  };

  const handleOptionSelect = (optionId: string) => {
    console.log('useScenarios - Selecting option:', optionId);
    if (showFeedback) {
      console.log('useScenarios - Feedback already shown, ignoring option selection');
      return;
    }
    
    try {
      setSelectedOption(optionId);
    } catch (err) {
      console.error('useScenarios - Error selecting option:', err);
      setError('Failed to select option');
    }
  };

  const handleSubmitAnswer = () => {
    console.log('useScenarios - Submitting answer:', { selectedOption, selectedScenario: selectedScenario?.id });
    
    if (!selectedOption || !selectedScenario) {
      console.warn('useScenarios - Submit called without selection');
      toast({
        title: "No option selected",
        description: "Please select an option to continue",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setShowFeedback(true);
      
      // Mark this scenario as completed
      if (!completedScenarios.includes(selectedScenario.id)) {
        const newCompleted = [...completedScenarios, selectedScenario.id];
        setCompletedScenarios(newCompleted);
        console.log('useScenarios - Updated completed scenarios:', newCompleted);
      }
      
      const correctOption = selectedScenario.options.find(option => option.isCorrect);
      const isCorrect = selectedScenario.options.find(option => option.id === selectedOption)?.isCorrect;
      
      console.log('useScenarios - Answer evaluation:', { isCorrect, correctOption: correctOption?.id });
      
      if (isCorrect) {
        toast({
          title: "Excellent decision!",
          description: "You've made the safe and professional choice",
          variant: "default"
        });
      } else {
        toast({
          title: "Consider a different approach",
          description: `The safer option would be: ${correctOption?.text}`,
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('useScenarios - Error submitting answer:', err);
      setError('Failed to submit answer');
    }
  };

  const handleReset = () => {
    console.log('useScenarios - Resetting to scenario list');
    try {
      setSelectedScenario(null);
      setSelectedOption(null);
      setShowFeedback(false);
      setError(null);
    } catch (err) {
      console.error('useScenarios - Error resetting:', err);
      setError('Failed to reset');
    }
  };

  const handleNextScenario = () => {
    console.log('useScenarios - Moving to next scenario');
    if (!selectedScenario) {
      console.warn('useScenarios - Next scenario called without current scenario');
      return;
    }
    
    try {
      const currentIndex = safetyScenarios.findIndex(s => s.id === selectedScenario.id);
      console.log('useScenarios - Current index:', currentIndex, 'of', safetyScenarios.length);
      
      if (currentIndex < safetyScenarios.length - 1) {
        handleSelectScenario(safetyScenarios[currentIndex + 1]);
      } else {
        console.log('useScenarios - All scenarios completed, resetting');
        handleReset();
        toast({
          title: "All scenarios completed!",
          description: "You've completed all scenarios. Well done!",
          variant: "default"
        });
      }
    } catch (err) {
      console.error('useScenarios - Error moving to next scenario:', err);
      setError('Failed to move to next scenario');
    }
  };

  const isLastScenario = selectedScenario 
    ? safetyScenarios.findIndex(s => s.id === selectedScenario.id) === safetyScenarios.length - 1
    : false;

  console.log('useScenarios - Current state:', {
    isLoading,
    error,
    totalScenariosCount: safetyScenarios?.length || 0,
    selectedScenarioId: selectedScenario?.id,
    completedCount: completedScenarios.length,
    isLastScenario
  });

  return {
    scenarios: safetyScenarios || [],
    allScenarios: safetyScenarios || [],
    isLoading,
    error,
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
