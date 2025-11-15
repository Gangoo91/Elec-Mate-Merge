import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Zap, Lightbulb, Plug, Wind, AlertCircle, CheckCircle } from "lucide-react";
import { CircuitDesign } from "@/types/installation-design";
import { cn } from "@/lib/utils";

interface CircuitNavigatorProps {
  circuits: CircuitDesign[];
  selectedCircuitIndex: number;
  onSelectCircuit: (index: number) => void;
}

const getCircuitIcon = (loadType: string) => {
  const type = loadType.toLowerCase();
  if (type.includes('socket') || type.includes('outlet')) return Plug;
  if (type.includes('light')) return Lightbulb;
  if (type.includes('hvac') || type.includes('heating')) return Wind;
  return Zap;
};

const getComplianceColor = (circuit: CircuitDesign) => {
  if (circuit.warnings && circuit.warnings.length > 0) {
    return "bg-amber-500/10 border-amber-500/30 text-amber-600";
  }
  return "bg-emerald-500/10 border-emerald-500/30 text-emerald-600";
};

const getComplianceIcon = (circuit: CircuitDesign) => {
  if (circuit.warnings && circuit.warnings.length > 0) return AlertCircle;
  return CheckCircle;
};

export function CircuitNavigator({ circuits, selectedCircuitIndex, onSelectCircuit }: CircuitNavigatorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Group circuits by type
  const groupedCircuits = circuits.reduce((acc, circuit, index) => {
    const loadType = circuit.loadType || 'Other';
    if (!acc[loadType]) {
      acc[loadType] = [];
    }
    acc[loadType].push({ circuit, index });
    return acc;
  }, {} as Record<string, Array<{ circuit: CircuitDesign; index: number }>>);

  // Filter circuits by search query
  const filteredGroups = Object.entries(groupedCircuits).reduce((acc, [type, items]) => {
    const filtered = items.filter(({ circuit }) =>
      circuit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circuit.loadType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[type] = filtered;
    }
    return acc;
  }, {} as Record<string, Array<{ circuit: CircuitDesign; index: number }>>);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Circuits
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search circuits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4 pb-4">
          <div className="space-y-4">
            {Object.entries(filteredGroups).map(([type, items]) => {
              const Icon = getCircuitIcon(type);
              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Icon className="h-4 w-4" />
                    <span>{type}</span>
                    <Badge variant="secondary" className="h-5 text-xs">
                      {items.length}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {items.map(({ circuit, index }) => {
                      const ComplianceIcon = getComplianceIcon(circuit);
                      const isSelected = index === selectedCircuitIndex;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => onSelectCircuit(index)}
                          className={cn(
                            "w-full text-left rounded-lg border p-3 transition-all",
                            "hover:shadow-md hover:border-primary/30",
                            isSelected
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "bg-card border-border"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">
                                {circuit.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {circuit.cableSize}mm² • {circuit.protectionDevice.rating}A {circuit.protectionDevice.type}
                              </div>
                            </div>
                            <ComplianceIcon className={cn(
                              "h-4 w-4 flex-shrink-0",
                              circuit.warnings && circuit.warnings.length > 0
                                ? "text-amber-500"
                                : "text-emerald-500"
                            )} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
