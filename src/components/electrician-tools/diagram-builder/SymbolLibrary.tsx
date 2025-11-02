import { useState } from "react";
import { electricalSymbols, SymbolCategory } from "./symbols/electricalSymbols";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface SymbolLibraryProps {
  onSymbolSelect: (symbolId: string) => void;
  selectedSymbolId: string | null;
  isMobile?: boolean;
}

export const SymbolLibrary = ({ onSymbolSelect, selectedSymbolId, isMobile = false }: SymbolLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState<Set<SymbolCategory>>(
    new Set(["lighting", "sockets", "switches"])
  );

  const filteredSymbols = electricalSymbols.filter(symbol =>
    symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symbol.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories: SymbolCategory[] = ["lighting", "sockets", "switches", "distribution", "accessories"];

  const toggleCategory = (category: SymbolCategory) => {
    const newOpen = new Set(openCategories);
    if (newOpen.has(category)) {
      newOpen.delete(category);
    } else {
      newOpen.add(category);
    }
    setOpenCategories(newOpen);
  };

  const categoryNames: Record<SymbolCategory, string> = {
    lighting: "Lighting",
    sockets: "Sockets & Outlets",
    switches: "Switches & Controls",
    distribution: "Distribution",
    accessories: "Safety & Accessories",
  };

  if (isMobile) {
    return (
      <div className="px-2 py-2">
        <div className="grid grid-cols-6 gap-1.5 overflow-x-auto">
          {filteredSymbols.slice(0, 12).map((symbol) => (
            <button
              key={symbol.id}
              onClick={() => onSymbolSelect(symbol.id)}
              className={`aspect-square flex flex-col items-center justify-center p-1.5 rounded border transition-all ${
                selectedSymbolId === symbol.id
                  ? "border-elec-yellow bg-elec-yellow/10"
                  : "border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40"
              }`}
              title={symbol.name}
            >
              <svg width="20" height="20" viewBox="0 0 40 40" className="text-elec-yellow">
                <path d={symbol.svg} fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-elec-yellow/20">
        <h2 className="text-lg font-semibold text-elec-light mb-3">Symbol Library</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-elec-light/40" />
          <Input
            type="text"
            placeholder="Search symbols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-elec-dark border-elec-yellow/20 text-elec-light"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {categories.map((category) => {
          const categorySymbols = filteredSymbols.filter(s => s.category === category);
          if (categorySymbols.length === 0) return null;

          return (
            <Collapsible
              key={category}
              open={openCategories.has(category)}
              onOpenChange={() => toggleCategory(category)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto hover:bg-elec-yellow/10 text-elec-light"
                >
                  <span className="font-medium">{categoryNames[category]}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openCategories.has(category) ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-2 pt-2">
                {categorySymbols.map((symbol) => (
                  <button
                    key={symbol.id}
                    onClick={() => onSymbolSelect(symbol.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded border transition-all ${
                      selectedSymbolId === symbol.id
                        ? "border-elec-yellow bg-elec-yellow/10"
                        : "border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40"
                    }`}
                  >
                    <svg width="32" height="32" viewBox="0 0 40 40" className="text-elec-yellow flex-shrink-0">
                      <path d={symbol.svg} fill="currentColor" />
                    </svg>
                    <span className="text-sm text-elec-light text-left">{symbol.name}</span>
                  </button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};
