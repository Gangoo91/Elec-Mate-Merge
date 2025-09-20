import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Check, Star, ArrowRight } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

interface ToolComparisonProps {
  tools: ToolItem[];
}

const ToolComparison = ({ tools }: ToolComparisonProps) => {
  const [selectedTools, setSelectedTools] = useState<ToolItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const addTool = (tool: ToolItem) => {
    if (selectedTools.length < 3 && !selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const removeTool = (toolId: string | number | undefined) => {
    setSelectedTools(selectedTools.filter(t => t.id !== toolId));
  };

  const getPrice = (tool: ToolItem) => {
    const price = tool.salePrice || tool.price;
    return parseFloat(price.replace(/[£,]/g, ''));
  };

  const getFeatureScore = (tool: ToolItem) => {
    return (tool.highlights?.length || 0) + 
           (tool.reviews ? 1 : 0) + 
           (tool.isOnSale ? 1 : 0) + 
           (tool.stockStatus === "In Stock" ? 1 : 0);
  };

  if (!isExpanded) {
    return (
      <Card className="bg-gradient-to-br from-elec-yellow/5 via-transparent to-blue-500/5 border-elec-yellow/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Compare Tools</h3>
              <p className="text-white/80">Select up to 3 tools to compare features, prices, and specifications side by side</p>
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
          <CardTitle className="text-elec-yellow">Tool Comparison</CardTitle>
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
        {/* Tool Selection */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Select Tools to Compare ({selectedTools.length}/3)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
            {tools.slice(0, 12).map((tool) => {
              const isSelected = selectedTools.find(t => t.id === tool.id);
              const canAdd = selectedTools.length < 3;
              
              return (
                <Button
                  key={tool.id}
                  variant="outline"
                  size="sm"
                  disabled={!canAdd && !isSelected}
                  onClick={() => isSelected ? removeTool(tool.id) : addTool(tool)}
                  className={`justify-start text-left h-auto p-2 ${
                    isSelected 
                      ? 'bg-elec-yellow/20 border-elec-yellow text-elec-yellow' 
                      : 'border-white/20 text-white hover:border-elec-yellow/50'
                  }`}
                >
                  {isSelected ? <Check className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  <span className="truncate">{tool.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedTools.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-white font-medium">Comparison Results</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/80 p-2">Feature</th>
                    {selectedTools.map((tool) => (
                      <th key={tool.id} className="text-left text-white p-2 min-w-48">
                        <div className="space-y-1">
                          <div className="font-medium truncate">{tool.name}</div>
                          <Badge className="bg-blue-600/90 text-white border-blue-400">
                            {tool.category}
                          </Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Price</td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-2">
                        <div className="space-y-1">
                          <div className="text-elec-yellow font-semibold">
                            {tool.salePrice || tool.price}
                          </div>
                          {tool.salePrice && (
                            <div className="text-white/60 line-through text-sm">
                              {tool.price}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Supplier</td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-2 text-white">
                        {tool.supplier || "Screwfix"}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Stock Status</td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-2">
                        <Badge 
                          className={
                            tool.stockStatus === "In Stock" 
                              ? "bg-green-600/90 text-white border-green-400" 
                              : "bg-yellow-600/90 text-white border-yellow-400"
                          }
                        >
                          {tool.stockStatus || "In Stock"}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="text-white/80 p-2 font-medium">Key Features</td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-2">
                        <div className="space-y-1">
                          {tool.highlights?.slice(0, 3).map((highlight, idx) => (
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
                    {selectedTools.map((tool) => {
                      const score = getFeatureScore(tool);
                      return (
                        <td key={tool.id} className="p-2">
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

export default ToolComparison;