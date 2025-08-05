import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Copy, TrendingUp, TrendingDown, Minus, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Scenario {
  id: string;
  name: string;
  businessType: string;
  totalStartup: number;
  totalMonthly: number;
  yearOneTotal: number;
  createdAt: Date;
}

interface ScenarioComparisonProps {
  currentScenario: {
    businessType: string;
    totalStartup: number;
    totalMonthly: number;
    yearOneTotal: number;
  };
  onLoadScenario?: (scenario: any) => void;
}

const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  currentScenario,
  onLoadScenario,
}) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState("comparison");
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: "1",
      name: "Conservative Start",
      businessType: "sole-trader",
      totalStartup: 18000,
      totalMonthly: 1200,
      yearOneTotal: 32400,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Professional Setup",
      businessType: "limited-company",
      totalStartup: 45000,
      totalMonthly: 2800,
      yearOneTotal: 78600,
      createdAt: new Date(),
    },
  ]);

  const saveCurrentScenario = () => {
    const name = prompt("Enter a name for this scenario:");
    if (!name) return;

    const newScenario: Scenario = {
      id: Date.now().toString(),
      name,
      businessType: currentScenario.businessType,
      totalStartup: currentScenario.totalStartup,
      totalMonthly: currentScenario.totalMonthly,
      yearOneTotal: currentScenario.yearOneTotal,
      createdAt: new Date(),
    };

    setScenarios(prev => [newScenario, ...prev]);
    toast({
      title: "Scenario Saved",
      description: `"${name}" has been saved to your scenarios.`,
      variant: "success",
    });
  };

  const deleteScenario = (id: string) => {
    setScenarios(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Scenario Deleted",
      description: "The scenario has been removed.",
    });
  };

  const duplicateScenario = (scenario: Scenario) => {
    const newScenario: Scenario = {
      ...scenario,
      id: Date.now().toString(),
      name: `${scenario.name} (Copy)`,
      createdAt: new Date(),
    };
    setScenarios(prev => [newScenario, ...prev]);
    toast({
      title: "Scenario Duplicated",
      description: "A copy has been created.",
    });
  };

  const getComparisonIcon = (value1: number, value2: number) => {
    if (value1 > value2) return <TrendingUp className="h-4 w-4 text-red-400" />;
    if (value1 < value2) return <TrendingDown className="h-4 w-4 text-green-400" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getBusinessTypeColor = (type: string) => {
    const colors = {
      "sole-trader": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "partnership": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "limited-company": "bg-green-500/20 text-green-300 border-green-500/30",
      "franchise": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    };
    return colors[type] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Scenario Analysis
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comparison">Compare Scenarios</SelectItem>
                  <SelectItem value="management">Manage Scenarios</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={saveCurrentScenario}
                size="sm"
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Save Current
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content based on view mode */}
      {viewMode === "comparison" && (
        <div className="space-y-4">
          {scenarios.length > 0 ? (
            <div className="space-y-4">
              {scenarios.map((scenario) => (
                <Card key={scenario.id} className="border-muted bg-elec-gray">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{scenario.name}</h4>
                        <Badge className={getBusinessTypeColor(scenario.businessType)}>
                          {scenario.businessType.replace("-", " ")}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLoadScenario?.(scenario)}
                        className="self-start sm:self-auto"
                      >
                        Load
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-background/30">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {getComparisonIcon(scenario.totalStartup, currentScenario.totalStartup)}
                          <span className="text-sm text-muted-foreground font-medium">Startup</span>
                        </div>
                        <p className="font-semibold text-lg">£{scenario.totalStartup.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {scenario.totalStartup > currentScenario.totalStartup ? "+" : ""}
                          £{Math.abs(scenario.totalStartup - currentScenario.totalStartup).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="text-center p-3 rounded-lg bg-background/30">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {getComparisonIcon(scenario.totalMonthly, currentScenario.totalMonthly)}
                          <span className="text-sm text-muted-foreground font-medium">Monthly</span>
                        </div>
                        <p className="font-semibold text-lg">£{scenario.totalMonthly.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {scenario.totalMonthly > currentScenario.totalMonthly ? "+" : ""}
                          £{Math.abs(scenario.totalMonthly - currentScenario.totalMonthly).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="text-center p-3 rounded-lg bg-background/30">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {getComparisonIcon(scenario.yearOneTotal, currentScenario.yearOneTotal)}
                          <span className="text-sm text-muted-foreground font-medium">Year 1</span>
                        </div>
                        <p className="font-semibold text-lg">£{scenario.yearOneTotal.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {scenario.yearOneTotal > currentScenario.yearOneTotal ? "+" : ""}
                          £{Math.abs(scenario.yearOneTotal - currentScenario.yearOneTotal).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-muted">
              <CardContent className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2 font-medium">No saved scenarios yet</p>
                <p className="text-sm text-muted-foreground">
                  Save your current calculation to start comparing different business setups.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {viewMode === "management" && (
        <div className="space-y-4">
          {scenarios.length > 0 ? (
            scenarios.map((scenario) => (
              <Card key={scenario.id} className="border-muted bg-elec-gray">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">{scenario.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge className={getBusinessTypeColor(scenario.businessType)}>
                          {scenario.businessType.replace("-", " ")}
                        </Badge>
                        <span>•</span>
                        <span>Created {scenario.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateScenario(scenario)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteScenario(scenario.id)}
                        className="text-destructive hover:text-destructive flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-dashed border-muted">
              <CardContent className="text-center py-12">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2 font-medium">No scenarios to manage</p>
                <p className="text-sm text-muted-foreground">
                  Save some scenarios first to manage them here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default ScenarioComparison;