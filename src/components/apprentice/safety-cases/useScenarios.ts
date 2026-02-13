import { useState, useEffect, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { SafetyScenario, safetyScenarios } from "./safetyScenarios";

const STORAGE_KEY = "elec-mate-safety-progress";

interface ScenarioResult {
  completedAt: string;
  stepsCorrect: number;
  totalSteps: number;
  score: number;
}

interface ProgressData {
  completedScenarios: Record<string, ScenarioResult>;
  currentStreak: number;
  lastCompletedDate: string | null;
  bestStreak: number;
}

interface StepResult {
  stepId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

const defaultProgress: ProgressData = {
  completedScenarios: {},
  currentStreak: 0,
  lastCompletedDate: null,
  bestStreak: 0,
};

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as ProgressData;
    // Validate streak — reset if last completion was more than 1 day ago
    if (parsed.lastCompletedDate) {
      const last = new Date(parsed.lastCompletedDate);
      const now = new Date();
      const diffDays = Math.floor(
        (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays > 1) {
        parsed.currentStreak = 0;
      }
    }
    return parsed;
  } catch {
    return defaultProgress;
  }
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export type DifficultyFilter = "All" | "Beginner" | "Intermediate" | "Advanced";

export const useScenarios = () => {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [selectedScenario, setSelectedScenario] =
    useState<SafetyScenario | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stepResults, setStepResults] = useState<StepResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const { toast } = useToast();

  // Persist progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Filtered scenarios
  const scenarios = useMemo(() => {
    return safetyScenarios.filter((s) => {
      if (difficultyFilter !== "All" && s.difficulty !== difficultyFilter)
        return false;
      if (categoryFilter !== "All" && s.category !== categoryFilter)
        return false;
      return true;
    });
  }, [difficultyFilter, categoryFilter]);

  // All unique categories
  const categories = useMemo(() => {
    const cats = new Set(safetyScenarios.map((s) => s.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  // Stats
  const completedCount = Object.keys(progress.completedScenarios).length;
  const totalCount = safetyScenarios.length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const isScenarioCompleted = useCallback(
    (id: number) => !!progress.completedScenarios[String(id)],
    [progress.completedScenarios]
  );

  const startScenario = useCallback((scenario: SafetyScenario) => {
    setSelectedScenario(scenario);
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setStepResults([]);
    setIsComplete(false);
  }, []);

  const selectOption = useCallback(
    (optionId: string) => {
      if (showFeedback) return;
      setSelectedOption(optionId);
    },
    [showFeedback]
  );

  const submitStep = useCallback(() => {
    if (!selectedOption || !selectedScenario) {
      toast({
        title: "No option selected",
        description: "Please select an option to continue",
        variant: "destructive",
      });
      return;
    }

    const step = selectedScenario.steps[currentStepIndex];
    const chosenOption = step.options.find((o) => o.id === selectedOption);
    const isCorrect = chosenOption?.isCorrect ?? false;

    setShowFeedback(true);
    setStepResults((prev) => [
      ...prev,
      { stepId: step.id, selectedOptionId: selectedOption, isCorrect },
    ]);

    if (isCorrect) {
      toast({
        title: "Excellent decision!",
        description: "You have made the safe and professional choice",
      });
    } else {
      const correct = step.options.find((o) => o.isCorrect);
      toast({
        title: "Consider a different approach",
        description: `The safer option would be: ${correct?.text}`,
        variant: "destructive",
      });
    }
  }, [selectedOption, selectedScenario, currentStepIndex, toast]);

  const advanceStep = useCallback(() => {
    if (!selectedScenario) return;

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < selectedScenario.steps.length) {
      setCurrentStepIndex(nextIndex);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Scenario complete
      setIsComplete(true);
      const allResults = stepResults;
      const stepsCorrect = allResults.filter((r) => r.isCorrect).length;
      const totalSteps = selectedScenario.steps.length;
      const score = Math.round((stepsCorrect / totalSteps) * 100);
      const today = new Date().toISOString().split("T")[0];

      setProgress((prev) => {
        const isNewCompletion =
          !prev.completedScenarios[String(selectedScenario.id)];
        const wasCompletedToday = prev.lastCompletedDate === today;
        let newStreak = prev.currentStreak;

        if (isNewCompletion && !wasCompletedToday) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];

          if (
            prev.lastCompletedDate === yesterdayStr ||
            prev.currentStreak === 0
          ) {
            newStreak = prev.currentStreak + 1;
          }
        }

        return {
          completedScenarios: {
            ...prev.completedScenarios,
            [String(selectedScenario.id)]: {
              completedAt: new Date().toISOString(),
              stepsCorrect,
              totalSteps,
              score,
            },
          },
          currentStreak: newStreak,
          lastCompletedDate: today,
          bestStreak: Math.max(prev.bestStreak, newStreak),
        };
      });

      toast({
        title: "Scenario complete!",
        description: `You scored ${score}% — ${stepsCorrect}/${totalSteps} steps correct`,
      });
    }
  }, [selectedScenario, currentStepIndex, stepResults, toast]);

  const exitScenario = useCallback(() => {
    setSelectedScenario(null);
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setStepResults([]);
    setIsComplete(false);
  }, []);

  const nextScenario = useCallback(() => {
    if (!selectedScenario) return;
    const currentIdx = scenarios.findIndex(
      (s) => s.id === selectedScenario.id
    );
    if (currentIdx < scenarios.length - 1) {
      startScenario(scenarios[currentIdx + 1]);
    } else {
      exitScenario();
    }
  }, [selectedScenario, scenarios, startScenario, exitScenario]);

  return {
    // Data
    scenarios,
    allScenarios: safetyScenarios,
    categories,
    totalCount,
    completedCount,
    completionPercentage,
    currentStreak: progress.currentStreak,
    bestStreak: progress.bestStreak,

    // Scenario state
    selectedScenario,
    currentStepIndex,
    selectedOption,
    showFeedback,
    stepResults,
    isComplete,

    // Filters
    difficultyFilter,
    categoryFilter,
    setDifficultyFilter,
    setCategoryFilter,

    // Actions
    startScenario,
    selectOption,
    submitStep,
    advanceStep,
    exitScenario,
    nextScenario,
    isScenarioCompleted,
  };
};
