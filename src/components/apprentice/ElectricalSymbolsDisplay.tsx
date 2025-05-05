
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

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
  ];
  
  // Sample symbols data
  const symbols = [
    { id: 1, name: "Single Pole Switch", category: "switches", symbol: "⌂", description: "Controls a single circuit from one location" },
    { id: 2, name: "Two-Way Switch", category: "switches", symbol: "◁▷", description: "Controls a circuit from two locations" },
    { id: 3, name: "Socket Outlet", category: "outlets", symbol: "⊗", description: "Standard BS 1363 socket outlet" },
    { id: 4, name: "Ceiling Rose", category: "lighting", symbol: "○", description: "Connection point for pendant lighting" },
    { id: 5, name: "Consumer Unit", category: "distribution", symbol: "□", description: "Main distribution board for the installation" },
    { id: 6, name: "Fluorescent Light", category: "lighting", symbol: "═══", description: "Fluorescent lighting fixture" },
    { id: 7, name: "Emergency Light", category: "lighting", symbol: "⊕", description: "Self-contained emergency lighting unit" },
    { id: 8, name: "Fused Connection Unit", category: "outlets", symbol: "⌻", description: "Fused outlet for fixed appliances" },
  ];
  
  const filteredSymbols = selectedCategory === "all" 
    ? symbols 
    : symbols.filter(s => s.category === selectedCategory);
  
  return (
    <div className="mt-8 border border-elec-yellow/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-elec-yellow mb-4">Electrical Symbols Reference</h3>
      
      <div className="mb-6">
        <p className="mb-3">
          Understanding electrical symbols is essential for reading and interpreting electrical drawings.
          Use this reference guide to familiarize yourself with common symbols used in UK electrical installations.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
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
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSymbols.map(symbol => (
          <div key={symbol.id} className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/40">
            <div className="flex items-center gap-3">
              <div className="bg-elec-dark/70 w-12 h-12 flex items-center justify-center text-2xl font-mono rounded border border-elec-yellow/30">
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
      
      <div className="mt-6 text-sm text-elec-light/60 italic">
        <p>Note: Symbol representations may vary slightly between different drawing standards and software.</p>
      </div>
    </div>
  );
};

export default ElectricalSymbolsDisplay;
