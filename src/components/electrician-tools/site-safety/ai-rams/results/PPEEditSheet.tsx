import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Save, X, Trash2, ShieldCheck, Plus, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PPEItem } from '@/types/rams';
import { toast } from '@/hooks/use-toast';

interface PPEEditSheetProps {
  ppeItems: PPEItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (ppeItems: PPEItem[]) => void;
}

export const PPEEditSheet: React.FC<PPEEditSheetProps> = ({
  ppeItems,
  open,
  onOpenChange,
  onSave
}) => {
  const [editedItems, setEditedItems] = useState<PPEItem[]>(ppeItems);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedItems(ppeItems);
    setHasChanges(false);
  }, [ppeItems, open]);

  const handleItemChange = (id: string, updates: Partial<PPEItem>) => {
    setEditedItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
    setHasChanges(true);
  };

  const handleAddItem = () => {
    const newItem: PPEItem = {
      id: `ppe-${Date.now()}`,
      itemNumber: editedItems.length + 1,
      ppeType: '',
      standard: '',
      mandatory: true,
      purpose: ''
    };
    setEditedItems(prev => [...prev, newItem]);
    setHasChanges(true);
  };

  const handleRemoveItem = (id: string) => {
    setEditedItems(prev => prev.filter(item => item.id !== id).map((item, idx) => ({
      ...item,
      itemNumber: idx + 1
    })));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Filter out empty items
    const validItems = editedItems.filter(item => item.ppeType.trim());
    onSave(validItems);
    toast({
      title: 'PPE Updated',
      description: `${validItems.length} PPE item${validItems.length !== 1 ? 's' : ''} saved`,
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    if (hasChanges && !confirm('You have unsaved changes. Are you sure you want to close?')) {
      return;
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-background z-10 pb-4 border-b border-primary/10">
          <SheetTitle className="text-lg font-bold text-elec-light flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
            Edit PPE Requirements
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4 pb-24">
          {/* Summary Badge */}
          <div className="flex items-center justify-between">
            <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              {editedItems.length} item{editedItems.length !== 1 ? 's' : ''}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddItem}
              className="h-9 text-xs border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add PPE
            </Button>
          </div>

          {/* PPE Items List */}
          {editedItems.length === 0 ? (
            <div className="text-center py-8 text-white/50">
              <ShieldCheck className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No PPE items yet</p>
              <p className="text-xs mt-1">Tap "Add PPE" to add requirements</p>
            </div>
          ) : (
            <div className="space-y-3">
              {editedItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all",
                    item.mandatory
                      ? "bg-red-500/5 border-red-500/20"
                      : "bg-white/[0.03] border-white/[0.08]"
                  )}
                >
                  {/* Item Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/60">#{index + 1}</span>
                      {item.mandatory && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px]">
                          Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* PPE Type */}
                  <div className="space-y-1.5 mb-3">
                    <label className="text-xs font-medium text-white/60">PPE Type</label>
                    <Input
                      value={item.ppeType}
                      onChange={(e) => handleItemChange(item.id, { ppeType: e.target.value })}
                      placeholder="e.g., Safety Helmet"
                      className="h-11 text-base"
                    />
                  </div>

                  {/* Standard */}
                  <div className="space-y-1.5 mb-3">
                    <label className="text-xs font-medium text-white/60">Standard</label>
                    <Input
                      value={item.standard}
                      onChange={(e) => handleItemChange(item.id, { standard: e.target.value })}
                      placeholder="e.g., BS EN 397"
                      className="h-11 text-base"
                    />
                  </div>

                  {/* Purpose */}
                  <div className="space-y-1.5 mb-3">
                    <label className="text-xs font-medium text-white/60">Purpose</label>
                    <Input
                      value={item.purpose}
                      onChange={(e) => handleItemChange(item.id, { purpose: e.target.value })}
                      placeholder="e.g., Head protection from falling objects"
                      className="h-11 text-base"
                    />
                  </div>

                  {/* Mandatory Toggle */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <Checkbox
                      id={`mandatory-${item.id}`}
                      checked={item.mandatory}
                      onCheckedChange={(checked) => handleItemChange(item.id, { mandatory: !!checked })}
                      className="border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <label
                      htmlFor={`mandatory-${item.id}`}
                      className="text-sm text-white/70 cursor-pointer"
                    >
                      Mandatory requirement
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Add Suggestions */}
          {editedItems.length < 8 && (
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-white/50 mb-2">Quick add common PPE:</p>
              <div className="flex flex-wrap gap-2">
                {['Safety Helmet', 'Safety Glasses', 'Safety Boots', 'Hi-Vis Vest', 'Gloves', 'Ear Protection']
                  .filter(ppe => !editedItems.some(item => item.ppeType.toLowerCase() === ppe.toLowerCase()))
                  .slice(0, 4)
                  .map(ppe => (
                    <button
                      key={ppe}
                      onClick={() => {
                        const newItem: PPEItem = {
                          id: `ppe-${Date.now()}`,
                          itemNumber: editedItems.length + 1,
                          ppeType: ppe,
                          standard: '',
                          mandatory: true,
                          purpose: ''
                        };
                        setEditedItems(prev => [...prev, newItem]);
                        setHasChanges(true);
                      }}
                      className="px-3 py-1.5 text-xs rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:border-elec-yellow/30 transition-all"
                    >
                      + {ppe}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-primary/20 p-4 flex gap-2 z-20">
          <Button
            variant="outline"
            className="flex-1 min-h-[48px]"
            onClick={handleClose}
          >
            <X className="h-5 w-5 mr-2" />
            Cancel
          </Button>
          <Button
            className="flex-1 min-h-[48px] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-card"
            onClick={handleSave}
          >
            <Save className="h-5 w-5 mr-2" />
            Save ({editedItems.filter(i => i.ppeType.trim()).length})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
