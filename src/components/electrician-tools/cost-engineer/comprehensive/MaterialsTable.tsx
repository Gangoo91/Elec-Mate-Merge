import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <Card variant="ios" className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"
              >
                <Package className="h-5 w-5 text-blue-400" />
              </motion.div>
              <div>
                <h3 className="text-ios-headline text-white font-semibold">Materials Breakdown</h3>
                <p className="text-ios-caption-1 text-white/50">{currentItems.length} items</p>
              </div>
            </div>
            {onItemsChange && (
              <div className="flex gap-2">
                {isEditMode ? (
                  <>
                    <Button
                      size="sm"
                      variant="ios-ghost"
                      onClick={handleCancel}
                      className="h-8 gap-1 text-xs"
                    >
                      <X className="h-3.5 w-3.5" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="h-8 gap-1 text-xs bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      <Save className="h-3.5 w-3.5" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="ios-ghost"
                    onClick={handleEdit}
                    className="h-8 gap-1 text-xs"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          {/* Mobile: Stacked Cards */}
          <div className="space-y-3 sm:hidden">
            {currentItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-black/30 border border-white/10"
              >
                <div className="text-ios-body font-medium text-white mb-1 leading-snug">
                  {item.item || item.description}
                </div>
                {item.supplier && (
                  <div className="text-ios-caption-1 text-white/50 mb-3">{item.supplier}</div>
                )}
                <div className="grid grid-cols-3 gap-2 text-center mt-3">
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-ios-caption-1 text-white/50 mb-1">Qty</div>
                    <div className="font-mono text-ios-footnote text-white">{item.quantity} {item.unit}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-ios-caption-1 text-white/50 mb-1">Unit</div>
                    {isEditMode ? (
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => handleEditPrice(idx, e.target.value)}
                        className="h-7 text-center font-mono text-sm p-1 bg-white/10 border-white/20"
                      />
                    ) : (
                      <div className="font-mono text-ios-footnote text-white">£{item.unitPrice?.toFixed(2)}</div>
                    )}
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-ios-caption-1 text-white/50 mb-1">Total</div>
                    <div className="font-mono text-ios-footnote font-bold text-blue-400">£{item.total?.toFixed(0)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Total row */}
            <div className="p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
              <div className="flex justify-between items-center">
                <span className="text-ios-body font-semibold text-white">Total Materials</span>
                <span className="text-xl font-bold text-blue-400">£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Desktop: Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-left text-white/70 font-semibold text-ios-footnote">Description</TableHead>
                  <TableHead className="text-right text-white/70 font-semibold text-ios-footnote">Qty</TableHead>
                  <TableHead className="text-right text-white/70 font-semibold text-ios-footnote">Unit Price</TableHead>
                  <TableHead className="text-right text-white/70 font-semibold text-ios-footnote">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item, idx) => (
                  <TableRow key={idx} className="border-white/5">
                    <TableCell className="font-medium text-ios-body text-white text-left py-4">
                      {item.item || item.description}
                      {item.supplier && (
                        <div className="text-ios-caption-1 text-white/50 text-left">
                          {item.supplier}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-ios-body text-white/80">
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell className="text-right font-mono text-ios-body text-white/80">
                      {isEditMode ? (
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-white/60">£</span>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => handleEditPrice(idx, e.target.value)}
                            className="w-20 h-8 text-right font-mono bg-white/10 border-white/20"
                          />
                        </div>
                      ) : (
                        `£${item.unitPrice?.toFixed(2)}`
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium text-ios-body text-white">
                      £{item.total?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-blue-500/10 font-bold border-t border-blue-500/30">
                  <TableCell colSpan={3} className="text-right text-white">Total Materials:</TableCell>
                  <TableCell className="text-right font-mono text-blue-400 text-lg">£{total.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsTable;
