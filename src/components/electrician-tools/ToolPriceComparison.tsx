import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Scale, Search, ExternalLink, X, Star, Zap, Wrench } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToolItem } from "@/hooks/useToolsData";

interface ToolPriceComparisonProps {
  initialQuery?: string;
  selectedItems?: ToolItem[];
  onClearSelection?: () => void;
}

const ToolPriceComparison: React.FC<ToolPriceComparisonProps> = ({
  initialQuery = "",
  selectedItems = [],
  onClearSelection
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const isMobile = useIsMobile();

  // Mock comparison data for demo
  const comparisonTools: ToolItem[] = selectedItems.length > 0 ? selectedItems : [
    {
      id: 1,
      name: "Fluke 179 Digital Multimeter",
      price: "£189.99",
      supplier: "RS Components",
      image: "/placeholder.svg",
      stockStatus: "In Stock",
      category: "Test Equipment",
      highlights: ["True RMS", "CAT III 1000V", "Temperature measurement"],
      reviews: "4.8/5 (127 reviews)"
    },
    {
      id: 2,
      name: "Kewtech KT65DL Multifunction Tester",
      price: "£649.99",
      supplier: "City Electrical Factors",
      image: "/placeholder.svg",
      stockStatus: "In Stock",
      category: "Test Equipment",
      highlights: ["17th & 18th Edition", "Bluetooth connectivity", "Large colour display"],
      reviews: "4.6/5 (89 reviews)"
    },
    {
      id: 3,
      name: "Megger MIT400 Insulation Tester",
      price: "£299.99",
      supplier: "Screwfix",
      image: "/placeholder.svg",
      stockStatus: "Low Stock",
      category: "Test Equipment",
      highlights: ["250V, 500V, 1000V test", "CAT IV 600V", "IP54 rated"],
      reviews: "4.7/5 (156 reviews)"
    }
  ];

  const getToolSpecs = (tool: ToolItem) => {
    // Extract specifications from tool name and description
    const specs: Record<string, string> = {};
    const name = tool.name.toLowerCase();
    
    if (name.includes('multimeter')) {
      specs['Type'] = 'Digital Multimeter';
      specs['True RMS'] = name.includes('true rms') ? 'Yes' : 'Standard';
      specs['CAT Rating'] = name.includes('cat iii') ? 'CAT III' : name.includes('cat iv') ? 'CAT IV' : 'CAT II';
    } else if (name.includes('tester')) {
      specs['Type'] = 'Multifunction Tester';
      specs['Standards'] = '17th/18th Edition';
      specs['Display'] = name.includes('colour') ? 'Colour LCD' : 'LCD';
    } else if (name.includes('insulation')) {
      specs['Type'] = 'Insulation Tester';
      specs['Test Voltages'] = '250V/500V/1000V';
      specs['IP Rating'] = name.includes('ip54') ? 'IP54' : 'IP40';
    }
    
    return specs;
  };

  const comparisonData = useMemo(() => {
    if (comparisonTools.length === 0) return null;
    
    // Get all unique specifications
    const allSpecs = new Set<string>();
    comparisonTools.forEach(tool => {
      Object.keys(getToolSpecs(tool)).forEach(spec => allSpecs.add(spec));
    });
    
    return {
      tools: comparisonTools,
      specifications: Array.from(allSpecs)
    };
  }, [comparisonTools]);

  const getPriceValue = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[£,]/g, '')) || 0;
  };

  const findBestValue = () => {
    if (comparisonTools.length === 0) return null;
    
    const toolsWithValue = comparisonTools.map(tool => ({
      ...tool,
      priceValue: getPriceValue(tool.price)
    }));
    
    return toolsWithValue.reduce((best, current) => 
      current.priceValue < best.priceValue ? current : best
    );
  };

  const bestValue = findBestValue();

  if (!comparisonData) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6 text-center space-y-4">
          <Scale className="h-12 w-12 text-elec-yellow mx-auto" />
          <h3 className="text-xl font-semibold">Compare Tools</h3>
          <p className="text-muted-foreground">
            Select tools from the browse section to compare features, prices, and specifications side by side.
          </p>
          <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
            <Input
              placeholder="Search for tools to compare..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-elec-gray border-elec-yellow/20"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Scale className="h-6 w-6 text-elec-yellow" />
            Tool Comparison
          </h2>
          <p className="text-muted-foreground">
            Comparing {comparisonData.tools.length} tools side by side
          </p>
        </div>
        {onClearSelection && (
          <Button
            variant="outline"
            onClick={onClearSelection}
            className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
          >
            Clear Selection
          </Button>
        )}
      </div>

      {/* Best Value Highlight */}
      {bestValue && (
        <Card className="bg-elec-yellow/10 border-elec-yellow/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <span className="font-semibold text-elec-yellow">Best Value Pick</span>
            </div>
            <p className="text-sm">
              <strong>{bestValue.name}</strong> offers the best price at {bestValue.price}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Comparison Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {comparisonData.tools.map((tool, index) => (
          <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray relative">
            {tool.id === bestValue?.id && (
              <Badge 
                variant="gold" 
                className="absolute -top-2 left-4 z-10"
              >
                Best Value
              </Badge>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base line-clamp-2 flex-1">
                  {tool.name}
                </CardTitle>
                {tool.stockStatus && (
                  <Badge 
                    variant={tool.stockStatus === 'In Stock' ? 'success' : 'warning'}
                    className="text-xs"
                  >
                    {tool.stockStatus}
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                {tool.supplier}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-md bg-muted">
                <img 
                  src={tool.image || "/placeholder.svg"} 
                  alt={tool.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              
              {/* Price */}
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow mb-1">
                  {tool.price}
                </div>
                {tool.reviews && (
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    {tool.reviews}
                  </div>
                )}
              </div>
              
              {/* Specifications */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <Wrench className="h-3 w-3" />
                  Specifications
                </h4>
                {comparisonData.specifications.map(spec => {
                  const toolSpecs = getToolSpecs(tool);
                  const value = toolSpecs[spec];
                  return (
                    <div key={spec} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{spec}:</span>
                      <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
                        {value || 'N/A'}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Key Features */}
              {tool.highlights && tool.highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Features</h4>
                  <ul className="text-xs space-y-1">
                    {tool.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Action Button */}
              <Button variant="gold" size="sm" className="w-full" asChild>
                <a 
                  href={tool.productUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Product
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Table for Desktop */}
      {!isMobile && comparisonData.tools.length > 1 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-elec-yellow" />
              Quick Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-elec-yellow/20">
                    <th className="text-left p-2">Feature</th>
                    {comparisonData.tools.map(tool => (
                      <th key={tool.id} className="text-left p-2 min-w-[200px]">
                        {tool.name.split(' ').slice(0, 3).join(' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-elec-yellow/10">
                    <td className="p-2 font-medium">Price</td>
                    {comparisonData.tools.map(tool => (
                      <td key={tool.id} className="p-2 text-elec-yellow font-semibold">
                        {tool.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-elec-yellow/10">
                    <td className="p-2 font-medium">Supplier</td>
                    {comparisonData.tools.map(tool => (
                      <td key={tool.id} className="p-2">{tool.supplier}</td>
                    ))}
                  </tr>
                  {comparisonData.specifications.map(spec => (
                    <tr key={spec} className="border-b border-elec-yellow/10">
                      <td className="p-2 font-medium">{spec}</td>
                      {comparisonData.tools.map(tool => {
                        const toolSpecs = getToolSpecs(tool);
                        const value = toolSpecs[spec];
                        return (
                          <td key={tool.id} className="p-2">
                            {value || '-'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ToolPriceComparison;