
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Zap } from "lucide-react";

interface SmartSuggestion {
  value: string;
  label: string;
  category: string;
  description?: string;
}

interface SmartInputSuggestionsProps {
  fieldType: 'voltage' | 'current' | 'power' | 'length' | 'cableSize';
  currentValue: string;
  onSuggestionSelect: (value: string) => void;
  calculatorType: string;
}

const SmartInputSuggestions: React.FC<SmartInputSuggestionsProps> = ({
  fieldType,
  currentValue,
  onSuggestionSelect,
  calculatorType
}) => {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getSuggestions = (type: string): SmartSuggestion[] => {
    switch (type) {
      case 'voltage':
        return [
          { value: '230', label: '230V', category: 'Domestic', description: 'UK domestic single-phase' },
          { value: '400', label: '400V', category: 'Commercial', description: 'UK three-phase supply' },
          { value: '415', label: '415V', category: 'Industrial', description: 'UK industrial supply' },
          { value: '12', label: '12V', category: 'Low Voltage', description: 'Automotive/LED lighting' },
          { value: '24', label: '24V', category: 'Low Voltage', description: 'Control systems' },
          { value: '110', label: '110V', category: 'Site Supply', description: 'Construction site supply' }
        ];
      case 'current':
        return [
          { value: '6', label: '6A', category: 'Lighting', description: 'Typical lighting circuit' },
          { value: '16', label: '16A', category: 'Power', description: 'Socket outlet circuit' },
          { value: '32', label: '32A', category: 'Power', description: 'High power appliances' },
          { value: '40', label: '40A', category: 'Cooker', description: 'Electric cooker circuit' },
          { value: '63', label: '63A', category: 'Distribution', description: 'Sub-main distribution' },
          { value: '100', label: '100A', category: 'Main Supply', description: 'Main incomer' }
        ];
      case 'power':
        return [
          { value: '100', label: '100W', category: 'Lighting', description: 'LED floodlight' },
          { value: '500', label: '500W', category: 'Appliance', description: 'Microwave oven' },
          { value: '2000', label: '2kW', category: 'Heating', description: 'Electric heater' },
          { value: '3000', label: '3kW', category: 'Appliance', description: 'Kettle/toaster' },
          { value: '7400', label: '7.4kW', category: 'EV Charging', description: 'Type 2 EV charger' },
          { value: '22000', label: '22kW', category: 'EV Charging', description: 'Fast EV charger' }
        ];
      case 'length':
        return [
          { value: '10', label: '10m', category: 'Short Run', description: 'Room to consumer unit' },
          { value: '25', label: '25m', category: 'Medium Run', description: 'Across building' },
          { value: '50', label: '50m', category: 'Long Run', description: 'Outbuilding supply' },
          { value: '100', label: '100m', category: 'Very Long', description: 'Remote installation' }
        ];
      case 'cableSize':
        return [
          { value: '1.5', label: '1.5mm²', category: 'Lighting', description: 'Lighting circuits' },
          { value: '2.5', label: '2.5mm²', category: 'Power', description: 'Socket outlets' },
          { value: '4', label: '4mm²', category: 'Cooker', description: 'Small cooker circuits' },
          { value: '6', label: '6mm²', category: 'Cooker', description: 'Large cooker circuits' },
          { value: '10', label: '10mm²', category: 'Distribution', description: 'Sub-main circuits' },
          { value: '16', label: '16mm²', category: 'Distribution', description: 'Main distribution' }
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const allSuggestions = getSuggestions(fieldType);
    setSuggestions(allSuggestions);
  }, [fieldType]);

  const filteredSuggestions = suggestions.filter(suggestion => 
    !currentValue || suggestion.value !== currentValue
  );

  if (filteredSuggestions.length === 0) return null;

  return (
    <div className="mt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSuggestions(!showSuggestions)}
        className="h-6 px-2 text-xs text-muted-foreground hover:text-elec-yellow"
      >
        <Lightbulb className="mr-1 h-3 w-3" />
        {showSuggestions ? 'Hide' : 'Show'} common values
      </Button>
      
      {showSuggestions && (
        <div className="mt-2 space-y-2">
          <div className="grid grid-cols-2 gap-1">
            {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-elec-yellow/20 hover:border-elec-yellow/50 text-xs px-2 py-1 justify-between"
                onClick={() => onSuggestionSelect(suggestion.value)}
              >
                <span>{suggestion.label}</span>
                <Zap className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
          {filteredSuggestions.length > 6 && (
            <p className="text-xs text-muted-foreground">
              And {filteredSuggestions.length - 6} more suggestions...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartInputSuggestions;
