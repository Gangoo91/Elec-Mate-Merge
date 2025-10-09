import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Material {
  item: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
  total: number;
}

interface Labour {
  hours: number;
  rate: number;
  total: number;
}

interface CostBreakdownData {
  materials?: Material[];
  labour?: Labour;
  totalCost?: number;
}

interface CostBreakdownCardProps {
  data: CostBreakdownData;
}

export const CostBreakdownCard = ({ data }: CostBreakdownCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const materialsTotal = data.materials?.reduce((sum, m) => sum + m.total, 0) || 0;
  const labourTotal = data.labour?.total || 0;
  
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-green-500/5 to-transparent hover:border-elec-yellow/30 transition-all">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
            💷 Cost Estimate
          </Badge>
        </div>

        {/* Total Cost - Always Visible */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Project Cost</p>
            <p className="text-3xl font-bold text-foreground">
              £{data.totalCost?.toFixed(2) || (materialsTotal + labourTotal).toFixed(2)}
            </p>
          </div>

          {/* Cost Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded p-2">
              <p className="text-xs text-muted-foreground">Materials</p>
              <p className="text-base font-semibold text-foreground">
                £{materialsTotal.toFixed(2)}
              </p>
            </div>
            <div className="bg-muted/30 rounded p-2">
              <p className="text-xs text-muted-foreground">Labour</p>
              <p className="text-base font-semibold text-foreground">
                £{labourTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Breakdown */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-xs h-8"
            >
              <span>View Detailed Breakdown</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-3">
            {/* Materials Table */}
            {data.materials && data.materials.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Materials Breakdown</p>
                <div className="border border-border/50 rounded overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-2 text-muted-foreground font-medium">Item</th>
                        <th className="text-right p-2 text-muted-foreground font-medium">Qty</th>
                        <th className="text-right p-2 text-muted-foreground font-medium">Unit £</th>
                        <th className="text-right p-2 text-muted-foreground font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.materials.map((material, idx) => (
                        <tr key={idx} className="border-t border-border/30">
                          <td className="p-2 text-foreground">
                            {material.item}
                            <span className="block text-[10px] text-muted-foreground">
                              {material.supplier}
                            </span>
                          </td>
                          <td className="p-2 text-right text-foreground">{material.quantity}</td>
                          <td className="p-2 text-right text-foreground">£{material.unitPrice.toFixed(2)}</td>
                          <td className="p-2 text-right font-semibold text-foreground">
                            £{material.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-border bg-muted/30">
                        <td colSpan={3} className="p-2 text-right font-semibold text-foreground">
                          Materials Subtotal
                        </td>
                        <td className="p-2 text-right font-bold text-foreground">
                          £{materialsTotal.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Labour Breakdown */}
            {data.labour && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Labour Breakdown</p>
                <div className="border border-border/50 rounded p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours Required</span>
                    <span className="font-semibold text-foreground">{data.labour.hours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hourly Rate</span>
                    <span className="font-semibold text-foreground">£{data.labour.rate}/h</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border/50">
                    <span className="font-semibold text-foreground">Labour Total</span>
                    <span className="font-bold text-foreground">£{data.labour.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
