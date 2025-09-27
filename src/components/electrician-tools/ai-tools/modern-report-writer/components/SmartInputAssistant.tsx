import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Lightbulb, 
  Wand2, 
  MapPin, 
  Calendar,
  X,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface SmartSuggestion {
  id: string;
  field: string;
  value: string;
  label: string;
  confidence: 'high' | 'medium' | 'low';
  category: 'common' | 'location' | 'recent' | 'intelligent';
}

interface SmartInputAssistantProps {
  fieldId: string;
  fieldLabel: string;
  currentValue: string;
  onSuggestionApply: (value: string) => void;
  suggestions?: SmartSuggestion[];
  onDismiss?: () => void;
}

const SmartInputAssistant: React.FC<SmartInputAssistantProps> = ({
  fieldId,
  fieldLabel,
  currentValue,
  onSuggestionApply,
  suggestions = [],
  onDismiss
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [customValue, setCustomValue] = useState("");

  // Generate smart suggestions based on field type
  const generateSuggestions = (): SmartSuggestion[] => {
    if (suggestions.length > 0) return suggestions;

    const baseSuggestions: SmartSuggestion[] = [];

    switch (fieldId) {
      case 'clientName':
        baseSuggestions.push(
          { id: '1', field: fieldId, value: 'Smith Property Management', label: 'Smith Property Management', confidence: 'high', category: 'recent' },
          { id: '2', field: fieldId, value: 'ABC Construction Ltd', label: 'ABC Construction Ltd', confidence: 'medium', category: 'common' },
          { id: '3', field: fieldId, value: 'Johnson & Sons Electrical', label: 'Johnson & Sons Electrical', confidence: 'medium', category: 'recent' }
        );
        break;
      case 'propertyAddress':
        baseSuggestions.push(
          { id: '1', field: fieldId, value: '123 High Street, London', label: '123 High Street, London', confidence: 'high', category: 'location' },
          { id: '2', field: fieldId, value: '45 Oak Avenue, Manchester', label: '45 Oak Avenue, Manchester', confidence: 'medium', category: 'location' },
          { id: '3', field: fieldId, value: '78 Victoria Road, Birmingham', label: '78 Victoria Road, Birmingham', confidence: 'medium', category: 'location' }
        );
        break;
      case 'inspectorName':
        baseSuggestions.push(
          { id: '1', field: fieldId, value: 'John Smith', label: 'John Smith (Previous reports)', confidence: 'high', category: 'recent' },
          { id: '2', field: fieldId, value: 'Sarah Johnson', label: 'Sarah Johnson (Team member)', confidence: 'medium', category: 'common' },
          { id: '3', field: fieldId, value: 'Michael Brown', label: 'Michael Brown (Frequent)', confidence: 'medium', category: 'recent' }
        );
        break;
      default:
        return [];
    }

    return baseSuggestions;
  };

  const smartSuggestions = generateSuggestions();

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'border-green-500/30 bg-green-500/10 text-green-400';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';
      case 'low': return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
      default: return 'border-muted/30 bg-muted/10 text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'location': return MapPin;
      case 'recent': return Calendar;
      case 'intelligent': return Wand2;
      default: return Lightbulb;
    }
  };

  if (!showSuggestions || smartSuggestions.length === 0) {
    return null;
  }

  return (
    <Card className="bg-elec-card border-elec-yellow/30 p-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-medium text-white">Smart Suggestions</span>
          <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
            AI Powered
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setShowSuggestions(false);
            onDismiss?.();
          }}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {smartSuggestions.slice(0, 3).map((suggestion) => {
          const IconComponent = getCategoryIcon(suggestion.category);
          
          return (
            <button
              key={suggestion.id}
              onClick={() => onSuggestionApply(suggestion.value)}
              className="w-full p-3 rounded-lg border border-elec-yellow/20 bg-elec-dark hover:bg-elec-yellow/5 hover:border-elec-yellow/40 transition-all group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">
                      {suggestion.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {suggestion.label}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}
                  >
                    {suggestion.confidence === 'high' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {suggestion.confidence === 'medium' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {suggestion.confidence}
                  </Badge>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom value input */}
      <div className="mt-3 pt-3 border-t border-elec-yellow/20">
        <div className="flex gap-2">
          <Input
            placeholder="Type custom value..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="flex-1 bg-elec-dark border-elec-yellow/30 text-white text-sm"
          />
          <Button
            size="sm"
            onClick={() => {
              if (customValue.trim()) {
                onSuggestionApply(customValue.trim());
                setCustomValue("");
              }
            }}
            disabled={!customValue.trim()}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SmartInputAssistant;