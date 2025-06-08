
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";
import { scenarioCategories, difficultyLevels, industryTypes, riskLevels } from "./safetyScenarios";

interface ScenarioFiltersProps {
  selectedCategory: string | null;
  selectedDifficulty: string | null;
  selectedIndustry: string | null;
  selectedRiskLevel: string | null;
  onCategoryChange: (category: string | null) => void;
  onDifficultyChange: (difficulty: string | null) => void;
  onIndustryChange: (industry: string | null) => void;
  onRiskLevelChange: (riskLevel: string | null) => void;
  onClearFilters: () => void;
  scenarioCount: number;
  totalScenarios: number;
}

const ScenarioFilters: React.FC<ScenarioFiltersProps> = ({
  selectedCategory,
  selectedDifficulty,
  selectedIndustry,
  selectedRiskLevel,
  onCategoryChange,
  onDifficultyChange,
  onIndustryChange,
  onRiskLevelChange,
  onClearFilters,
  scenarioCount,
  totalScenarios
}) => {
  const hasActiveFilters = selectedCategory || selectedDifficulty || selectedIndustry || selectedRiskLevel;

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
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Filter Scenarios
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {scenarioCount} of {totalScenarios} scenarios
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            {scenarioCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === category 
                    ? "bg-elec-yellow text-elec-dark" 
                    : "hover:bg-elec-yellow/20"
                }`}
                onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Difficulty</h4>
          <div className="flex flex-wrap gap-2">
            {difficultyLevels.map((difficulty) => (
              <Badge
                key={difficulty}
                variant="outline"
                className={`cursor-pointer transition-colors ${
                  selectedDifficulty === difficulty 
                    ? getDifficultyColor(difficulty)
                    : "hover:bg-elec-yellow/20"
                }`}
                onClick={() => onDifficultyChange(selectedDifficulty === difficulty ? null : difficulty)}
              >
                {difficulty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Industry Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Industry</h4>
          <div className="flex flex-wrap gap-2">
            {industryTypes.map((industry) => (
              <Badge
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedIndustry === industry 
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-blue-500/20"
                }`}
                onClick={() => onIndustryChange(selectedIndustry === industry ? null : industry)}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        {/* Risk Level Filter */}
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Risk Level</h4>
          <div className="flex flex-wrap gap-2">
            {riskLevels.map((riskLevel) => (
              <Badge
                key={riskLevel}
                variant="outline"
                className={`cursor-pointer transition-colors ${
                  selectedRiskLevel === riskLevel 
                    ? getRiskLevelColor(riskLevel)
                    : "hover:bg-elec-yellow/20"
                }`}
                onClick={() => onRiskLevelChange(selectedRiskLevel === riskLevel ? null : riskLevel)}
              >
                {riskLevel}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ScenarioFilters;
