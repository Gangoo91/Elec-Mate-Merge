import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Wrench, Building, AlertTriangle, Target } from "lucide-react";

interface CostBreakdownCardProps {
  materialsNet: number;
  materialsMarkup: number;
  labourHours: number;
  labourTotal: number;
  overheads?: any;
  contingencyPercent: number;
  breakEven: number;
}

const CostBreakdownCard = ({
  materialsNet,
  materialsMarkup,
  labourHours,
  labourTotal,
  overheads,
  contingencyPercent,
  breakEven
}: CostBreakdownCardProps) => {
  
  const overheadTotal = overheads?.total || 0;
  const contingencyAmount = (materialsNet + labourTotal) * (contingencyPercent / 100);

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg">Cost Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Materials */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium">Materials</div>
                <div className="text-xs text-muted-foreground">
                  Net + {materialsMarkup > 0 ? `${materialsMarkup}%` : '15%'} markup
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">£{materialsNet.toFixed(2)}</div>
            </div>
          </div>

          {/* Labour */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-orange-500" />
              <div>
                <div className="font-medium">Labour</div>
                <div className="text-xs text-muted-foreground">
                  {labourHours.toFixed(1)} hours
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">£{labourTotal.toFixed(2)}</div>
            </div>
          </div>

          {/* Overheads */}
          {overheadTotal > 0 && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="font-medium">Overheads</div>
                  <div className="text-xs text-muted-foreground">
                    Van, tools, insurance
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">£{overheadTotal.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* Contingency */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <div>
                <div className="font-medium">Contingency</div>
                <div className="text-xs text-muted-foreground">
                  {contingencyPercent}% buffer
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">£{contingencyAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Break-even Total */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-elec-yellow/10 border-2 border-elec-yellow/30 mt-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              <div>
                <div className="font-bold text-lg">Break-even Point</div>
                <div className="text-xs text-muted-foreground">
                  Minimum to cover costs
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-elec-yellow">£{breakEven.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownCard;
