
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HardHat, Clock, AlertTriangle, Building, CheckCircle, Play, RotateCcw } from "lucide-react";
import { SafetyScenario } from "./safetyScenarios";

interface ScenarioCardProps {
  scenario: SafetyScenario;
  onClick: () => void;
  isCompleted?: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onClick, isCompleted = false }) => {
  const handleClick = () => {
    try {
      onClick();
    } catch (error) {
      console.error('ScenarioCard - Error in onClick handler:', error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      onClick();
    } catch (error) {
      console.error('ScenarioCard - Error in button onClick handler:', error);
    }
  };

  const getRiskLevelConfig = (level: string) => {
    switch (level) {
      case "Low": return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case "Medium": return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case "High": return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' };
      case "Critical": return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      default: return { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case "Intermediate": return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case "Advanced": return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      default: return { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  const riskConfig = getRiskLevelConfig(scenario.riskLevel);
  const difficultyConfig = getDifficultyConfig(scenario.difficulty);

  return (
    <Card
      className={`bg-gradient-to-br from-white/5 to-elec-card border-white/10 hover:border-white/20 cursor-pointer transition-all overflow-hidden relative ${
        isCompleted ? 'ring-2 ring-green-500/30' : ''
      }`}
      onClick={handleClick}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3 relative">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 flex-shrink-0">
            <HardHat className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg text-white mb-2">{scenario.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/5 text-white/60 border border-white/10 text-xs">
                {scenario.category}
              </Badge>
              <Badge className={`${riskConfig.bg} ${riskConfig.text} border ${riskConfig.border} text-xs`}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {scenario.riskLevel}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <CardDescription className="text-white/70 text-sm leading-relaxed">
          {scenario.description}
        </CardDescription>

        <div className="flex flex-wrap gap-2">
          <Badge className={`${difficultyConfig.bg} ${difficultyConfig.text} border ${difficultyConfig.border}`}>
            {scenario.difficulty}
          </Badge>

          <Badge className="bg-white/5 text-white/60 border border-white/10">
            <Building className="h-3 w-3 mr-1" />
            {scenario.industry}
          </Badge>

          <Badge className="bg-white/5 text-white/60 border border-white/10">
            <Clock className="h-3 w-3 mr-1" />
            {scenario.duration}
          </Badge>
        </div>

        {scenario.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {scenario.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                className="bg-white/10 text-white/80 border border-white/10 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {scenario.tags.length > 3 && (
              <Badge className="bg-white/10 text-white/80 border border-white/10 text-xs">
                +{scenario.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 relative">
        <Button
          className={`w-full h-11 font-semibold touch-manipulation active:scale-95 transition-all ${
            isCompleted
              ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              : 'bg-elec-yellow hover:bg-elec-yellow/90 text-black'
          }`}
          onClick={handleButtonClick}
        >
          {isCompleted ? (
            <>
              <RotateCcw className="h-4 w-4 mr-2" />
              Review Scenario
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Scenario
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
