import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Info } from "lucide-react";

interface Material {
  description: string;
  specification: string;
  quantity: string | number;
  unit: string;
  notes?: string;
}

interface MaterialsListTableProps {
  materialsList: Material[];
}

export const MaterialsListTable = ({ materialsList }: MaterialsListTableProps) => {
  if (!materialsList || materialsList.length === 0) {
    return null;
  }

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-primary/5 to-background shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 animate-fade-in">
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-lg">
            <Package className="h-6 w-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-foreground mb-1">Materials Required</h3>
            <p className="text-sm text-muted-foreground">
              {materialsList.length} item{materialsList.length !== 1 ? 's' : ''} with quantities and specifications
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Description</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Specification</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Quantity</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Unit</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {materialsList.map((material, index) => (
                <tr 
                  key={index} 
                  className="border-b border-border/30 last:border-0 hover:bg-purple-500/5 transition-colors"
                >
                  <td className="py-3 px-2">
                    <p className="text-sm font-medium text-foreground">{material.description}</p>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="bg-card text-xs font-mono">
                      {material.specification}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <p className="text-sm font-semibold text-foreground">{material.quantity}</p>
                  </td>
                  <td className="py-3 px-2">
                    <p className="text-sm text-muted-foreground">{material.unit}</p>
                  </td>
                  <td className="py-3 px-2">
                    {material.notes && (
                      <div className="flex items-start gap-1">
                        <Info className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">{material.notes}</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {materialsList.map((material, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-card border border-border/50 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <p className="text-sm font-semibold text-foreground flex-1">{material.description}</p>
                <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400 text-xs shrink-0">
                  #{index + 1}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Specification</p>
                  <Badge variant="outline" className="bg-card text-xs font-mono">
                    {material.specification}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Quantity</p>
                    <p className="text-sm font-semibold text-foreground">{material.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Unit</p>
                    <p className="text-sm text-foreground">{material.unit}</p>
                  </div>
                </div>

                {material.notes && (
                  <div className="pt-2 border-t border-border/30">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Notes</p>
                        <p className="text-xs text-foreground">{material.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
