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
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
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
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {item.item || item.description}
                    {item.supplier && (
                      <div className="text-xs text-muted-foreground">
                        {item.supplier}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {isEditMode ? (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-muted-foreground">£</span>
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
                  <TableCell className="text-right font-mono font-medium">
                    £{item.total?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell colSpan={3} className="text-right">Total Materials:</TableCell>
                <TableCell className="text-right font-mono">£{total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsTable;
