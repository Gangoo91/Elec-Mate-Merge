import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Plus, 
  Lightbulb, 
  Zap, 
  Fan, 
  Microwave, 
  Car, 
  Hospital, 
  Cpu, 
  Flame, 
  Warehouse,
  Search,
  ChevronDown,
  ChevronRight,
  Filter
} from "lucide-react";
import { Circuit } from "./types";
import { CIRCUIT_TEMPLATES, getAvailableTemplatesForInstallationType } from "./CircuitDefaults";

interface EnhancedCircuitTypeSelectorProps {
  onAddCircuit: (circuitType: string) => void;
  existingCircuits: Circuit[];
  installationType: string;
}

const EnhancedCircuitTypeSelector: React.FC<EnhancedCircuitTypeSelectorProps> = ({ 
  onAddCircuit, 
  existingCircuits,
  installationType 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["recommended"]);

  const availableTemplates = getAvailableTemplatesForInstallationType(installationType);
  const existingTypes = existingCircuits.map(c => c.loadType);

  const getCircuitIcon = (type: string) => {
    switch (type) {
      case "lighting":
      case "commercial-lighting":
        return Lightbulb;
      case "power":
      case "power-radial":
      case "commercial-power":
        return Zap;
      case "cooker": return Microwave;
      case "shower": return Fan;
      case "heating": return Flame;
      case "ev-charging": return Car;
      case "motor-small":
      case "motor-large":
      case "motor": return Fan;
      case "hvac": return Fan;
      case "it-equipment": return Cpu;
      case "emergency": return Zap;
      case "medical": return Hospital;
      case "welding": return Flame;
      case "crane": return Warehouse;
      case "furnace": return Flame;
      default: return Zap;
    }
  };

  const circuitCategories = useMemo(() => {
    const categories: { [key: string]: string[] } = {
      recommended: availableTemplates.slice(0, 6),
      power: availableTemplates.filter(t => 
        t.includes("power") || t.includes("motor") || t.includes("welding") || t.includes("crane")
      ),
      lighting: availableTemplates.filter(t => t.includes("lighting")),
      specialized: availableTemplates.filter(t => 
        t.includes("hvac") || t.includes("it-equipment") || t.includes("emergency") || 
        t.includes("medical") || t.includes("furnace") || t.includes("ev-charging") ||
        t.includes("cooker") || t.includes("shower") || t.includes("heating")
      )
    };

    // Remove duplicates
    Object.keys(categories).forEach(key => {
      categories[key] = [...new Set(categories[key])];
    });

    return categories;
  }, [availableTemplates]);

  const filteredCircuits = useMemo(() => {
    let circuits = availableTemplates;
    
    if (filterCategory !== "all") {
      circuits = circuitCategories[filterCategory] || [];
    }

    if (searchTerm) {
      circuits = circuits.filter(type => {
        const template = CIRCUIT_TEMPLATES[type];
        return template && (
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.typicalApplications.some(app => 
            app.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      });
    }

    return circuits;
  }, [availableTemplates, filterCategory, searchTerm, circuitCategories]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categoryOptions = [
    { value: "all", label: "All Circuits" },
    { value: "recommended", label: "Recommended" },
    { value: "power", label: "Power & Motors" },
    { value: "lighting", label: "Lighting" },
    { value: "specialized", label: "Specialized" }
  ];

  const renderCircuitCard = (circuitType: string) => {
    const template = CIRCUIT_TEMPLATES[circuitType];
    if (!template) return null;

    const isAdded = existingTypes.includes(circuitType);
    const Icon = getCircuitIcon(circuitType);

    return (
      <Card
        key={circuitType}
        className={`cursor-pointer border-2 transition-all ${
          isAdded
            ? 'border-green-400 bg-green-400/10'
            : 'border-elec-yellow/20 hover:border-elec-yellow/40'
        }`}
        onClick={() => !isAdded && onAddCircuit(circuitType)}
      >
        <CardContent className="p-4">
          <div className="w-full">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm leading-tight mb-3 text-center">{template.name}</h4>
                <p className="text-xs text-muted-foreground mb-3 leading-tight text-center">
                  {template.description}
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-elec-dark/50 rounded p-2 text-center">
                    <div className="text-muted-foreground mb-1">Load</div>
                    <div className="font-medium text-elec-yellow">{template.totalLoad}W</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded p-2 text-center">
                    <div className="text-muted-foreground mb-1">Voltage</div>
                    <div className="font-medium text-blue-400">{template.voltage}V</div>
                  </div>
                  <div className="bg-elec-dark/50 rounded p-2 text-center">
                    <div className="text-muted-foreground mb-1">Phase</div>
                    <div className="font-medium text-green-400">{template.phases === 'single' ? '1φ' : '3φ'}</div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                {isAdded ? (
                  <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs">
                    Added
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddCircuit(circuitType);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search circuit types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-elec-dark border-elec-yellow/30"
          />
        </div>

        <MobileSelectWrapper
          label="Filter by Category"
          value={filterCategory}
          onValueChange={setFilterCategory}
          options={categoryOptions}
        />
      </div>

      {/* Circuit Categories */}
      {filterCategory === "all" ? (
        <div className="space-y-4">
          {Object.entries(circuitCategories).map(([category, types]) => {
            if (types.length === 0) return null;
            
            const isExpanded = expandedCategories.includes(category);
            const categoryLabel = categoryOptions.find(opt => opt.value === category)?.label || category;

            return (
              <Collapsible key={category} open={isExpanded} onOpenChange={() => toggleCategory(category)}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-4 h-auto border border-elec-yellow/20 hover:border-elec-yellow/40"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-elec-yellow" />
                      <span className="font-medium">{categoryLabel}</span>
                      <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                        {types.length}
                      </Badge>
                    </div>
                    {isExpanded ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-2 mt-2">
                  {types.map(renderCircuitCard)}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCircuits.map(renderCircuitCard)}
        </div>
      )}

      {/* Summary */}
      {existingCircuits.length > 0 && (
        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2 text-base">
              <Zap className="h-5 w-5" />
              Circuits Added ({existingCircuits.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {existingCircuits.map((circuit) => (
                <Badge key={circuit.id} variant="outline" className="border-green-400/30 text-green-400">
                  {circuit.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedCircuitTypeSelector;