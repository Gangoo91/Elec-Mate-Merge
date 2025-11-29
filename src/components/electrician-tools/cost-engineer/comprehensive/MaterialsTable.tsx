import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Edit, Save, X } from "lucide-react";
import { useState } from "react";

interface MaterialsTableProps {
  items: any[];
  onItemsChange?: (items: any[]) => void;
}

const MaterialsTable = ({ items, onItemsChange }: MaterialsTableProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItems, setEditedItems] = useState(items);

  if (!items || items.length === 0) return null;

  const currentItems = isEditMode ? editedItems : items;
  const total = currentItems.reduce((sum, item) => sum + (item.total || 0), 0);

  const handleEditPrice = (index: number, newUnitPrice: string) => {
    const price = parseFloat(newUnitPrice) || 0;
    const updatedItems = [...editedItems];
    updatedItems[index] = {
      ...updatedItems[index],
      unitPrice: price,
      total: updatedItems[index].quantity * price
    };
    setEditedItems(updatedItems);
  };

  const handleSave = () => {
    onItemsChange?.(editedItems);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedItems(items);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setEditedItems(items);
    setIsEditMode(true);
  };

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-elec-yellow" />
            Materials Breakdown
          </CardTitle>
          {onItemsChange && (
            <div className="flex gap-2">
              {isEditMode ? (
                <>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleCancel}
                    className="h-8 gap-1"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSave}
                    className="h-8 gap-1 bg-elec-yellow text-elec-gray hover:bg-elec-yellow/90"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save Prices
                  </Button>
                </>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleEdit}
                  className="h-8 gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit Prices
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        {/* Mobile: Stacked Cards */}
        <div className="space-y-3 sm:hidden">
          {currentItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="font-medium text-white text-base mb-1 leading-snug">
                {item.item || item.description}
              </div>
              {item.supplier && (
                <div className="text-sm text-white/70 mb-3">{item.supplier}</div>
              )}
              <div className="grid grid-cols-3 gap-2 text-center mt-3">
                <div className="p-2.5 rounded bg-background/50">
                  <div className="text-xs text-white/70 mb-1">Qty</div>
                  <div className="font-mono text-white text-sm">{item.quantity} {item.unit}</div>
                </div>
                <div className="p-2.5 rounded bg-background/50">
                  <div className="text-xs text-white/70 mb-1">Unit</div>
                  {isEditMode ? (
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => handleEditPrice(idx, e.target.value)}
                      className="h-7 text-center font-mono text-sm p-1"
                    />
                  ) : (
                    <div className="font-mono text-white text-sm">£{item.unitPrice?.toFixed(2)}</div>
                  )}
                </div>
                <div className="p-2.5 rounded bg-background/50">
                  <div className="text-xs text-white/70 mb-1">Total</div>
                  <div className="font-mono text-elec-yellow font-bold text-sm">£{item.total?.toFixed(0)}</div>
                </div>
              </div>
            </div>
          ))}
          {/* Total row */}
          <div className="p-4 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Total Materials</span>
              <span className="text-xl font-bold text-elec-yellow">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Desktop: Table */}
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left text-white font-semibold text-base sm:text-sm">Description</TableHead>
                <TableHead className="text-right text-white font-semibold text-base sm:text-sm">Qty</TableHead>
                <TableHead className="text-right text-white font-semibold text-base sm:text-sm">Unit Price</TableHead>
                <TableHead className="text-right text-white font-semibold text-base sm:text-sm">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-base sm:text-sm text-white text-left py-4">
                    {item.item || item.description}
                    {item.supplier && (
                      <div className="text-sm text-white text-left">
                        {item.supplier}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-base sm:text-sm text-white">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right font-mono text-base sm:text-sm text-white">
                    {isEditMode ? (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-white">£</span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => handleEditPrice(idx, e.target.value)}
                          className="w-20 h-8 text-right font-mono"
                        />
                      </div>
                    ) : (
                      `£${item.unitPrice?.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium text-base sm:text-sm text-white">
                    £{item.total?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-elec-yellow/10 font-bold border-t-2 border-elec-yellow/30">
                <TableCell colSpan={3} className="text-right text-white">Total Materials:</TableCell>
                <TableCell className="text-right font-mono text-white text-lg sm:text-base">£{total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsTable;
