import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, ShoppingCart, Info } from "lucide-react";
import { Tool } from "@/data/electrician/toolData";
import { useState } from "react";

interface ToolCardProps {
  tool: Tool;
  showComparison?: boolean;
  compact?: boolean;
}

const ToolCard = ({ tool, showComparison = false, compact = false }: ToolCardProps) => {
  const [selectedSupplier, setSelectedSupplier] = useState(Object.keys(tool.suppliers)[0]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "essential": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "recommended": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "optional": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "in-stock": return "text-green-400";
      case "low-stock": return "text-yellow-400";
      case "out-of-stock": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const bestPrice = Math.min(...Object.values(tool.suppliers).map(s => s.price));
  const currentSupplier = tool.suppliers[selectedSupplier];

  if (compact) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white text-sm truncate">{tool.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getPriorityColor(tool.priority)} variant="outline">
                  {tool.priority}
                </Badge>
                {tool.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-elec-yellow text-elec-yellow" />
                    <span className="text-xs text-muted-foreground">{tool.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-elec-yellow font-semibold text-sm">£{bestPrice}</div>
              <div className="text-xs text-muted-foreground">from</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 mb-2">
          <CardTitle className="text-elec-yellow text-lg leading-tight">{tool.name}</CardTitle>
          <Badge className={getPriorityColor(tool.priority)} variant="outline">
            {tool.priority}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Brands */}
        <div>
          <h4 className="text-sm font-medium text-white mb-1">Available Brands:</h4>
          <div className="flex flex-wrap gap-1">
            {tool.brands.slice(0, 3).map((brand) => (
              <Badge key={brand} variant="outline" className="text-xs border-elec-yellow/20">
                {brand}
              </Badge>
            ))}
            {tool.brands.length > 3 && (
              <Badge variant="outline" className="text-xs border-elec-yellow/20">
                +{tool.brands.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Key Specifications */}
        {tool.specifications && (
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Key Specs:</h4>
            <div className="space-y-1">
              {Object.entries(tool.specifications).slice(0, 2).map(([key, value]) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        {tool.rating && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= tool.rating! ? "fill-elec-yellow text-elec-yellow" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {tool.rating} ({tool.reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Price Comparison */}
        <div className="bg-elec-dark/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-white">Best Prices:</h4>
            <span className="text-elec-yellow font-semibold">
              from £{bestPrice}
            </span>
          </div>
          
          {showComparison ? (
            <div className="space-y-2">
              {Object.entries(tool.suppliers).map(([supplier, details]) => (
                <div key={supplier} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">
                      {supplier.replace('-', ' ')}
                    </span>
                    <span className={getAvailabilityColor(details.availability)}>
                      {details.availability.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-elec-yellow">£{details.price}</div>
                    <div className="text-muted-foreground">{details.delivery}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <select 
                className="w-full text-xs bg-elec-dark border border-elec-yellow/30 rounded px-2 py-1 text-white"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                {Object.entries(tool.suppliers).map(([supplier, details]) => (
                  <option key={supplier} value={supplier}>
                    {supplier.replace('-', ' ')} - £{details.price} ({details.delivery})
                  </option>
                ))}
              </select>
              
              <div className="flex items-center justify-between text-xs">
                <span className={getAvailabilityColor(currentSupplier.availability)}>
                  {currentSupplier.availability.replace('-', ' ')}
                </span>
                <span className="text-muted-foreground">
                  {currentSupplier.delivery}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Compare Prices
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
              <Info className="h-4 w-4 mr-1" />
              Details
            </Button>
            <Button variant="outline" size="sm" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
              <ExternalLink className="h-4 w-4 mr-1" />
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;