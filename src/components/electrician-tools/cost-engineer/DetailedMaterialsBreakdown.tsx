import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, CheckCircle2, AlertCircle, Clock, ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MaterialItemDetailed {
  description: string;
  quantity: number;
  unit: string;
  wholesalePrice: number;
  markupPercent: number;
  markupAmount: number;
  unitPrice: number;
  total: number;
  supplier: string;
  supplierCode?: string;
  inStock: boolean;
  inDatabase: boolean;
  alternativeSuppliers?: Array<{
    name: string;
    price: number;
    inStock: boolean;
  }>;
}

interface DetailedMaterialsBreakdownProps {
  materials: MaterialItemDetailed[];
  wholesaleTotal: number;
  markupTotal: number;
  subtotal: number;
  wastagePercent?: number;
  wastageAmount?: number;
  finalTotal: number;
}

export const DetailedMaterialsBreakdown = ({
  materials,
  wholesaleTotal,
  markupTotal,
  subtotal,
  wastagePercent = 0,
  wastageAmount = 0,
  finalTotal
}: DetailedMaterialsBreakdownProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const getStockStatusBadge = (inStock: boolean, inDatabase: boolean) => {
    if (!inDatabase) {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          Estimated Price
        </Badge>
      );
    }
    if (inStock) {
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          In Stock
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30 text-xs">
        <Clock className="h-3 w-3 mr-1" />
        3-5 Days
      </Badge>
    );
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Detailed Materials Breakdown
          <Badge variant="outline" className="ml-auto">
            {materials.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Wholesale</TableHead>
                <TableHead className="text-right">Markup</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="min-w-[200px]">
                      <p className="font-medium text-foreground">{material.description}</p>
                      {material.supplierCode && (
                        <p className="text-xs text-white mt-1">
                          Code: {material.supplierCode}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {material.quantity} {material.unit}
                  </TableCell>
                  <TableCell className="text-right text-white">
                    £{material.wholesalePrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-emerald-600 dark:text-emerald-400">
                    +£{material.markupAmount.toFixed(2)}
                    <span className="text-xs ml-1">({material.markupPercent}%)</span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    £{material.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    £{material.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{material.supplier}</span>
                      {material.alternativeSuppliers && material.alternativeSuppliers.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => toggleItem(idx)}
                        >
                          +{material.alternativeSuppliers.length}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStockStatusBadge(material.inStock, material.inDatabase)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {materials.map((material, idx) => (
            <Card key={idx} className="border-border/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{material.description}</p>
                    <p className="text-sm text-white mt-1">
                      {material.quantity} {material.unit} × £{material.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-foreground">
                    £{material.total.toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between px-2 py-1 rounded bg-muted/50">
                    <span className="text-white">Wholesale</span>
                    <span className="font-medium">£{material.wholesalePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1 rounded bg-emerald-500/10">
                    <span className="text-white">Markup</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      +£{material.markupAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {material.supplier}
                    </span>
                    {material.supplierCode && (
                      <span className="text-xs text-white">
                        #{material.supplierCode}
                      </span>
                    )}
                  </div>
                  {getStockStatusBadge(material.inStock, material.inDatabase)}
                </div>

                {material.alternativeSuppliers && material.alternativeSuppliers.length > 0 && (
                  <Collapsible open={expandedItems.has(idx)} onOpenChange={() => toggleItem(idx)}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View {material.alternativeSuppliers.length} Alternative Supplier{material.alternativeSuppliers.length > 1 ? 's' : ''}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-1">
                      {material.alternativeSuppliers.map((alt, altIdx) => (
                        <div key={altIdx} className="flex items-center justify-between px-3 py-2 rounded bg-muted/30 text-sm">
                          <span className="text-white">{alt.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">£{alt.price.toFixed(2)}</span>
                            {alt.inStock ? (
                              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            ) : (
                              <Clock className="h-3 w-3 text-orange-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Totals */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
            <span className="text-sm text-white">Wholesale Cost</span>
            <span className="font-semibold text-foreground">£{wholesaleTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 rounded bg-emerald-500/10">
            <span className="text-sm text-white">Your Markup</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              +£{markupTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
            <span className="text-sm font-medium">Materials Subtotal</span>
            <span className="font-bold text-foreground">£{subtotal.toFixed(2)}</span>
          </div>
          {wastageAmount > 0 && (
            <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
              <span className="text-sm text-white">
                Wastage Allowance ({wastagePercent}%)
              </span>
              <span className="font-semibold text-foreground">+£{wastageAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-primary/10 border-2 border-primary/30">
            <span className="font-bold">MATERIALS TOTAL</span>
            <span className="font-bold text-xl text-primary">£{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
