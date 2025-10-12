import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, TrendingDown, Package, Clock, Calculator } from "lucide-react";
import { useState } from "react";

interface MaterialItem {
  description: string;
  quantity: number;
  unit: string;
  wholesalePrice: number;
  markup: number;
  unitPrice: number;
  total: number;
  supplier: string;
  inStock?: boolean;
  inDatabase?: boolean;
}

interface LabourTask {
  description: string;
  hours: number;
  workers?: number;
  electricianHours?: number;
  apprenticeHours?: number;
  rate: number;
  total: number;
}

interface ValueEngineering {
  suggestion: string;
  potentialSaving: number;
}

interface CostData {
  materials: {
    items: MaterialItem[];
    subtotal: number;
    totalMarkup: number;
    subtotalWithMarkup: number;
    vat: number;
    total: number;
  };
  labour: {
    tasks: LabourTask[];
    subtotal: number;
    vat: number;
    total: number;
  };
  valueEngineering?: ValueEngineering[];
  summary: {
    materialsSubtotal: number;
    materialsMarkup: number;
    materialsTotal: number;
    labourTotal: number;
    subtotal: number;
    vat: number;
    grandTotal: number;
  };
}

export const CostEngineerCards = ({ data }: { data: CostData }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']));

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  };

  const hasValueEngineering = data.valueEngineering && data.valueEngineering.length > 0;
  const totalPotentialSavings = hasValueEngineering 
    ? data.valueEngineering.reduce((sum, item) => sum + item.potentialSaving, 0)
    : 0;

  return (
    <div className="space-y-4">
      {/* Summary Card - Always Prominent */}
      <Card className="border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Cost Summary
            </CardTitle>
            <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 text-xs">
              10% markup applied
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Grand Total - Big and Prominent */}
          <div className="text-center py-4 px-6 bg-elec-yellow/10 border-2 border-elec-yellow/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Cost (inc. VAT)</p>
            <p className="text-4xl sm:text-5xl font-bold text-elec-yellow">
              £{data.summary.grandTotal.toFixed(2)}
            </p>
          </div>

          {/* Breakdown */}
          <Collapsible open={expandedSections.has('summary')} onOpenChange={() => toggleSection('summary')}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span>View Breakdown</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.has('summary') ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between px-3 py-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">Materials (wholesale)</span>
                  <span className="font-semibold">£{data.summary.materialsSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-3 py-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">+10% Markup</span>
                  <span className="font-semibold text-elec-yellow">£{data.summary.materialsMarkup.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-3 py-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">Labour</span>
                  <span className="font-semibold">£{data.labour.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-3 py-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">VAT (20%)</span>
                  <span className="font-semibold">£{data.summary.vat.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between px-4 py-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 font-semibold">
                <span>Subtotal (before VAT)</span>
                <span>£{data.summary.subtotal.toFixed(2)}</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Materials Breakdown Card */}
      <Card className="border-blue-500/20 bg-card/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-400" />
            Materials Breakdown
            <Badge variant="outline" className="ml-auto text-xs">
              {data.materials.items.length} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">Item</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Qty</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground hidden sm:table-cell">Wholesale</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground hidden sm:table-cell">+10%</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.materials.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="py-2 px-2">
                      <div>
                        <p className="font-medium text-foreground">{item.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {item.inDatabase ? (
                            <span className="text-xs text-green-600 dark:text-green-400">✓ {item.supplier}</span>
                          ) : (
                            <span className="text-xs text-yellow-600 dark:text-yellow-400">⚠ Market rate</span>
                          )}
                        </div>
                        {item.inStock === false && (
                          <Badge variant="outline" className="text-xs mt-1 bg-orange-500/10 text-orange-500 border-orange-500/30">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="text-right py-2 px-2">
                      <span className="text-foreground">{item.quantity}</span>
                      <span className="text-xs text-muted-foreground ml-1">{item.unit}</span>
                    </td>
                    <td className="text-right py-2 px-2 hidden sm:table-cell text-muted-foreground">
                      £{item.wholesalePrice.toFixed(2)}
                    </td>
                    <td className="text-right py-2 px-2 hidden sm:table-cell text-elec-yellow">
                      £{item.markup.toFixed(2)}
                    </td>
                    <td className="text-right py-2 px-2 font-semibold text-foreground">
                      £{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold border-t-2 border-border">
                  <td className="py-3 px-2" colSpan={2}>Materials Total (inc. VAT)</td>
                  <td className="text-right py-3 px-2 hidden sm:table-cell" colSpan={2}>
                    <span className="text-xs text-muted-foreground">
                      £{data.materials.subtotalWithMarkup.toFixed(2)} + VAT
                    </span>
                  </td>
                  <td className="text-right py-3 px-2 text-foreground">
                    £{data.materials.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Labour Breakdown Card */}
      <Card className="border-green-500/20 bg-card/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-400" />
            Labour Breakdown
            <Badge variant="outline" className="ml-auto text-xs">
              £50/hour
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.labour.tasks.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{task.description}</p>
                {task.workers === 2 && task.electricianHours && task.apprenticeHours ? (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p>Electrician: {task.electricianHours.toFixed(1)}hrs @ £50/hr</p>
                    <p>Apprentice: {task.apprenticeHours.toFixed(1)}hrs @ £25/hr</p>
                    <p className="text-green-600 dark:text-green-400">2-person team (30% faster)</p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {task.hours} {task.hours === 1 ? 'hour' : 'hours'} @ £{task.rate.toFixed(2)}/hr
                  </p>
                )}
              </div>
              <p className="text-sm font-semibold text-foreground">
                £{task.total.toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30 font-semibold mt-3">
            <span>Labour Total (inc. VAT)</span>
            <span>£{data.labour.total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Value Engineering Card */}
      {hasValueEngineering && (
        <Card className="border-purple-500/20 bg-card/40">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-purple-400" />
                Value Engineering
              </CardTitle>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40 text-xs">
                Save up to £{totalPotentialSavings.toFixed(2)}
              </Badge>
            </div>
          </CardHeader>
          <Collapsible defaultOpen={false}>
            <CardContent className="pb-3">
              <CollapsibleTrigger asChild>
                <button className="w-full px-4 py-2 flex items-center justify-center gap-2 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-colors text-sm">
                  <span>View Cost-Saving Suggestions</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </CollapsibleTrigger>
            </CardContent>
            <CollapsibleContent>
              <CardContent className="space-y-2 pt-0">
                {data.valueEngineering?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-2 px-3 rounded-lg bg-muted/30">
                    <TrendingDown className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-relaxed">{item.suggestion}</p>
                    </div>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs whitespace-nowrap flex-shrink-0">
                      -£{item.potentialSaving.toFixed(2)}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}
    </div>
  );
};