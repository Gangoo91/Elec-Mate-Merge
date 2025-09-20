import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Check, Star, ArrowRight } from "lucide-react";
import { MaterialItem } from "@/hooks/useToolsForMaterials";

interface MaterialComparisonProps {
  materials: MaterialItem[];
}

const MaterialComparison = ({ materials }: MaterialComparisonProps) => {
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const addMaterial = (material: MaterialItem) => {
    if (selectedMaterials.length < 3 && !selectedMaterials.find(m => m.id === material.id)) {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const removeMaterial = (materialId: string | number | undefined) => {
    setSelectedMaterials(selectedMaterials.filter(m => m.id !== materialId));
  };

  const getPrice = (material: MaterialItem) => {
    const price = material.salePrice || material.price;
    return parseFloat(price.replace(/[£,]/g, ''));
  };

  const getValueScore = (material: MaterialItem) => {
    return (material.highlights?.length || 0) + 
           (material.isOnSale ? 1 : 0) + 
           (material.stockStatus === "In Stock" ? 1 : 0) +
           (material.supplier === "Screwfix" ? 1 : 0); // Bonus for trusted supplier
  };

  if (!isExpanded) {
    return (
      <Card className="bg-gradient-to-br from-elec-yellow/5 via-transparent to-blue-500/5 border-elec-yellow/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Compare Materials</h3>
              <p className="text-white/80">Select up to 3 materials to compare prices, specifications, and suppliers side by side</p>
            </div>
            <Button 
              onClick={() => setIsExpanded(true)}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              Start Comparing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-elec-yellow/5 via-transparent to-blue-500/5 border-elec-yellow/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-elec-yellow">Material Comparison</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(false)}
            className="text-white/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Material Selection */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Select Materials to Compare ({selectedMaterials.length}/3)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
            {materials.slice(0, 12).map((material) => {
              const isSelected = selectedMaterials.find(m => m.id === material.id);
              const canAdd = selectedMaterials.length < 3;
              
              return (
                <Button
                  key={material.id}
                  variant="outline"
                  size="sm"
                  disabled={!canAdd && !isSelected}
                  onClick={() => isSelected ? removeMaterial(material.id) : addMaterial(material)}
                  className={`justify-start text-left h-auto p-2 ${
                    isSelected 
                      ? 'bg-elec-yellow/20 border-elec-yellow text-elec-yellow' 
                      : 'border-white/20 text-white hover:border-elec-yellow/50'
                  }`}
                >
                  {isSelected ? <Check className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  <span className="truncate">{material.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedMaterials.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-white font-medium">Comparison Results</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/80 p-2">Feature</th>
                    {selectedMaterials.map((material) => (
                      <th key={material.id} className="text-left text-white p-2 min-w-48">
                        <div className="space-y-1">
                          <div className="font-medium truncate">{material.name}</div>
                          <Badge className="bg-blue-600/90 text-white border-blue-400">
                            {material.category}
                          </Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Price</td>
                    {selectedMaterials.map((material) => (
                      <td key={material.id} className="p-2">
                        <div className="space-y-1">
                          <div className="text-elec-yellow font-semibold">
                            {material.salePrice || material.price}
                          </div>
                          {material.salePrice && (
                            <div className="text-white/60 line-through text-sm">
                              {material.price}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Supplier</td>
                    {selectedMaterials.map((material) => (
                      <td key={material.id} className="p-2 text-white">
                        {material.supplier}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Stock Status</td>
                    {selectedMaterials.map((material) => (
                      <td key={material.id} className="p-2">
                        <Badge 
                          className={
                            material.stockStatus === "In Stock" 
                              ? "bg-green-600/90 text-white border-green-400" 
                              : material.stockStatus === "Low Stock"
                              ? "bg-yellow-600/90 text-white border-yellow-400"
                              : "bg-red-600/90 text-white border-red-400"
                          }
                        >
                          {material.stockStatus}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Key Features</td>
                    {selectedMaterials.map((material) => (
                      <td key={material.id} className="p-2">
                        <div className="space-y-1">
                          {material.highlights?.slice(0, 3).map((highlight, idx) => (
                            <div key={idx} className="text-sm text-white/80 flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-400" />
                              {highlight}
                            </div>
                          )) || <span className="text-white/60">No features listed</span>}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-white/80 p-2 font-medium">Value Score</td>
                    {selectedMaterials.map((material) => {
                      const score = getValueScore(material);
                      return (
                        <td key={material.id} className="p-2">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < score ? 'fill-elec-yellow text-elec-yellow' : 'text-white/30'
                                }`} 
                              />
                            ))}
                            <span className="text-white/80 ml-1">{score}/5</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialComparison;