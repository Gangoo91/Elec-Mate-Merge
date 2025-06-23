
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle } from "lucide-react";

interface ToolSpec {
  name: string;
  description: string;
  specifications: {
    standard?: string;
    voltage?: string;
    capacity?: string;
    material?: string;
    certification?: string;
  };
  priceRange: string;
  priority: "essential" | "recommended" | "optional";
  pros: string[];
  cons: string[];
  buyingTips: string[];
  maintenanceNotes?: string;
}

interface ToolSpecificationCardProps {
  tool: ToolSpec;
}

const ToolSpecificationCard = ({ tool }: ToolSpecificationCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "essential": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "recommended": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "optional": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-elec-yellow text-lg">{tool.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
          </div>
          <Badge className={getPriorityColor(tool.priority)} variant="outline">
            {tool.priority}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Specifications */}
        <div>
          <h4 className="font-medium text-white mb-2">Specifications</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(tool.specifications).map(([key, value]) => (
              value && (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="text-white">{value}</span>
                </div>
              )
            ))}
            <div className="flex justify-between col-span-2 pt-2 border-t border-elec-yellow/20">
              <span className="text-muted-foreground">Price Range:</span>
              <span className="text-elec-yellow font-medium">{tool.priceRange}</span>
            </div>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4" />
              Advantages
            </h4>
            <ul className="space-y-1">
              {tool.pros.map((pro, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Check className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
              <X className="h-4 w-4" />
              Considerations
            </h4>
            <ul className="space-y-1">
              {tool.cons.map((con, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <X className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buying Tips */}
        <div>
          <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Buying Tips
          </h4>
          <ul className="space-y-1">
            {tool.buyingTips.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {tip}
              </li>
            ))}
          </ul>
        </div>

        {tool.maintenanceNotes && (
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
            <h4 className="font-medium text-elec-yellow mb-1">Maintenance Notes</h4>
            <p className="text-sm text-muted-foreground">{tool.maintenanceNotes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ToolSpecificationCard;
