import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

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
  
  const chartData = [
    { name: 'Materials', value: materialsTotal, color: 'hsl(var(--chart-1))' },
    { name: 'Labour', value: labourTotal, color: 'hsl(var(--chart-2))' }
  ];
  
  const included = [
    'All materials listed',
    'Labour hours estimated',
    'Standard installation',
    'Basic testing'
  ];
  
  const notIncluded = [
    'Structural modifications',
    'Additional circuits',
    'Premium finish materials',
    'Out-of-hours work'
  ];
  
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

          {/* Visual Breakdown Chart */}
          <div className="h-32 sm:h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry: any) => (
                    <span className="text-xs text-foreground">
                      {value}: £{entry.payload.value.toFixed(2)}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* What's Included / Not Included */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-500/5 border border-green-500/20 rounded p-2 sm:p-3">
              <p className="text-[10px] sm:text-xs font-semibold text-green-400 mb-1.5 sm:mb-2">✓ What's Included</p>
              <ul className="space-y-1">
                {included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-foreground/80">
                    <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded p-2 sm:p-3">
              <p className="text-[10px] sm:text-xs font-semibold text-orange-400 mb-1.5 sm:mb-2">✗ What's Not Included</p>
              <ul className="space-y-1">
                {notIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-foreground/80">
                    <XCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
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
                <div className="border border-border/50 rounded overflow-x-auto">
                  <table className="w-full text-[10px] sm:text-xs min-w-[300px]">
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
                    <span className="text-foreground/70">Hours Required</span>
                    <span className="font-semibold text-foreground">{data.labour.hours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Hourly Rate</span>
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
