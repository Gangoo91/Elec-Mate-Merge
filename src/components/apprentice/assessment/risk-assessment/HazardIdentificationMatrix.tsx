
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Search, Plus } from "lucide-react";
import { hazardCategories, type HazardCategory } from "@/data/hazards";
import { cn } from "@/lib/utils";

interface HazardIdentificationMatrixProps {
  onHazardSelected: (hazard: string) => void;
}

const HazardIdentificationMatrix = ({ onHazardSelected }: HazardIdentificationMatrixProps) => {
  const [customHazard, setCustomHazard] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHazards = hazardCategories.map(category => ({
    ...category,
    hazards: category.hazards.filter(hazard =>
      hazard.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category =>
    category.hazards.length > 0 ||
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHazardSelect = (hazard: string) => {
    onHazardSelected(hazard);
  };

  const handleCustomHazardSubmit = () => {
    if (customHazard.trim()) {
      onHazardSelected(customHazard.trim());
      setCustomHazard("");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            Hazard Identification Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative">
              {!searchTerm && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
              )}
              <MobileInput
                label=""
                placeholder="Search hazards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(!searchTerm && "pl-10")}
              />
            </div>

            {/* Hazard Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHazards.map((category) => (
                <Card
                  key={category.id}
                  className="bg-gradient-to-br from-white/10 to-elec-gray border-white/10 hover:border-white/20 transition-colors"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white">{category.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.hazards.map((hazard, index) => (
                      <button
                        key={index}
                        onClick={() => handleHazardSelect(hazard)}
                        className="w-full text-left p-3 rounded-xl bg-white/10 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all touch-manipulation active:scale-[0.98]"
                      >
                        <span className="text-xs text-white/70">{hazard}</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Hazard Input */}
            <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3 text-sm">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Plus className="h-4 w-4 text-blue-400" />
                  </div>
                  Custom Hazard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-end">
                  <MobileInput
                    label=""
                    placeholder="Describe a specific hazard not listed above..."
                    value={customHazard}
                    onChange={(e) => setCustomHazard(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomHazardSubmit()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleCustomHazardSubmit}
                    disabled={!customHazard.trim()}
                    className="h-12 bg-blue-500 hover:bg-blue-500/90 text-white disabled:opacity-30 touch-manipulation active:scale-95 transition-all"
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HazardIdentificationMatrix;
