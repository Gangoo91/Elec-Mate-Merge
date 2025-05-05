
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cable, ShieldAlert, Lightbulb, BellElectric, Plug, Bolt } from "lucide-react";

type ElectricalSymbolsDisplayProps = {
  subsectionId: string;
};

const ElectricalSymbolsDisplay = ({ subsectionId }: ElectricalSymbolsDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const symbolCategories = [
    { id: "all", name: "All Symbols" },
    { id: "switches", name: "Switches" },
    { id: "outlets", name: "Outlets" },
    { id: "lighting", name: "Lighting" },
    { id: "distribution", name: "Distribution" },
    { id: "protection", name: "Protection" },
  ];
  
  // BS7671 compliant electrical symbols
  const symbols = [
    { id: 1, name: "One-way Switch", category: "switches", symbol: "S₁", description: "Controls a single circuit from one location" },
    { id: 2, name: "Two-way Switch", category: "switches", symbol: "S₂", description: "Controls a circuit from two locations" },
    { id: 3, name: "Intermediate Switch", category: "switches", symbol: "SI", description: "Used with two-way switches for control from 3+ positions" },
    { id: 4, name: "Single Socket Outlet", category: "outlets", symbol: "⏣", description: "BS 1363 13A socket outlet, unswitched" },
    { id: 5, name: "Switched Socket Outlet", category: "outlets", symbol: "⏣̷", description: "BS 1363 13A socket outlet with switch" },
    { id: 6, name: "Fused Connection Unit", category: "outlets", symbol: "⌶", description: "Fused connection unit for fixed appliances" },
    { id: 7, name: "Ceiling Rose", category: "lighting", symbol: "⊙", description: "Connection point for pendant lighting" },
    { id: 8, name: "Lighting Point", category: "lighting", symbol: "⦻", description: "General lighting outlet point" },
    { id: 9, name: "Emergency Lighting", category: "lighting", symbol: "⦻̷", description: "Self-contained emergency lighting unit" },
    { id: 10, name: "Distribution Board", category: "distribution", symbol: "□", description: "Consumer unit or distribution board" },
    { id: 11, name: "Main Switch", category: "distribution", symbol: "⊗", description: "Main isolator or switch" },
    { id: 12, name: "Circuit Breaker", category: "protection", symbol: "—/—", description: "Miniature Circuit Breaker (MCB)" },
    { id: 13, name: "RCD", category: "protection", symbol: "—/—Δ", description: "Residual Current Device" },
    { id: 14, name: "RCBO", category: "protection", symbol: "—/—Δ", description: "Combined RCD and MCB protection" },
    { id: 15, name: "Earth Point", category: "protection", symbol: "⏚", description: "Earth connection point" },
    { id: 16, name: "Pull Switch", category: "switches", symbol: "S↓", description: "Ceiling mounted pull cord switch" },
  ];
  
  const filteredSymbols = selectedCategory === "all" 
    ? symbols 
    : symbols.filter(s => s.category === selectedCategory);
    
  // Helper function to render icon based on category
  const renderCategoryIcon = (category: string) => {
    switch(category) {
      case "switches": return <Bolt className="h-5 w-5 mr-2" />;
      case "outlets": return <Plug className="h-5 w-5 mr-2" />;
      case "lighting": return <Lightbulb className="h-5 w-5 mr-2" />;
      case "distribution": return <Cable className="h-5 w-5 mr-2" />;
      case "protection": return <ShieldAlert className="h-5 w-5 mr-2" />;
      default: return <BellElectric className="h-5 w-5 mr-2" />;
    }
  };
  
  return (
    <div className="mt-8 border border-elec-yellow/30 rounded-lg p-4 md:p-6">
      <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
        <ShieldAlert className="h-5 w-5 mr-2" />
        BS7671 Electrical Symbols Reference
      </h3>
      
      <div className="mb-6">
        <p className="mb-3">
          Understanding standardized BS7671 electrical symbols is essential for correctly interpreting UK electrical installation drawings.
          This reference shows the common symbols used in accordance with British Standards.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4 pb-2">
          {symbolCategories.map(category => (
            <Button 
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category.id 
                ? "bg-elec-yellow text-elec-dark" 
                : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {renderCategoryIcon(category.id)}
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {filteredSymbols.map(symbol => (
          <div key={symbol.id} className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/40">
            <div className="flex items-center gap-3">
              <div className="bg-elec-dark/70 w-12 h-12 flex items-center justify-center text-xl font-mono rounded border border-elec-yellow/30 text-elec-yellow">
                {symbol.symbol}
              </div>
              <div>
                <h4 className="font-medium text-white">{symbol.name}</h4>
                <p className="text-sm text-elec-light/80">{symbol.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-sm text-elec-light/60 italic bg-elec-dark/30 p-3 rounded-lg">
        <p className="flex items-center">
          <ShieldAlert className="h-4 w-4 mr-2 text-elec-yellow/70" />
          These symbols conform to BS7671 (18th Edition IET Wiring Regulations) and may vary slightly from older installations or specialist applications.
        </p>
      </div>
    </div>
  );
};

export default ElectricalSymbolsDisplay;
