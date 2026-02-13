import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ShieldCheck, HardHat, Eye, Hand, Footprints, Ear, Zap, Pencil, Save, X, Plus, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PPEItem } from '@/types/rams';
import { toast } from '@/hooks/use-toast';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { PPEEditSheet } from './PPEEditSheet';

interface PPEGridViewProps {
  ppeDetails?: PPEItem[];
  requiredPPE?: string[];
  editable?: boolean;
  onUpdate?: (ppeDetails: PPEItem[]) => void;
}

const getPPEIcon = (ppeType: string) => {
  const type = ppeType.toLowerCase();
  if (type.includes('helmet') || type.includes('hat')) return HardHat;
  if (type.includes('eye') || type.includes('goggles') || type.includes('glasses') || type.includes('face') || type.includes('shield')) return Eye;
  if (type.includes('glove') || type.includes('insulating glove')) return Hand;
  if (type.includes('boot') || type.includes('footwear') || type.includes('shoe')) return Footprints;
  if (type.includes('ear') || type.includes('hearing')) return Ear;
  if (type.includes('insulated') || type.includes('arc')) return Zap;
  return ShieldCheck;
};

export const PPEGridView: React.FC<PPEGridViewProps> = ({
  ppeDetails,
  requiredPPE,
  editable = false,
  onUpdate
}) => {
  const { isMobile } = useMobileEnhanced();
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [editedPPE, setEditedPPE] = useState<PPEItem[]>([]);

  // Convert requiredPPE strings to PPEItem objects if ppeDetails not provided
  const items = ppeDetails && ppeDetails.length > 0
    ? ppeDetails
    : requiredPPE?.map((ppe, idx) => ({
        id: 'ppe-' + idx,
        itemNumber: idx + 1,
        ppeType: ppe,
        standard: 'BS EN Standard',
        mandatory: true,
        purpose: 'Required for safety'
      })) || [];

  useEffect(() => {
    setEditedPPE(items);
  }, [ppeDetails, requiredPPE]);

  const handleEditClick = () => {
    if (isMobile) {
      setShowEditSheet(true);
    } else {
      setIsEditing(true);
      setEditedPPE([...items]);
    }
  };

  const handleSave = () => {
    if (onUpdate) {
      const validItems = editedPPE.filter(item => item.ppeType.trim());
      onUpdate(validItems);
      toast({ title: 'PPE Updated', description: `${validItems.length} PPE item${validItems.length !== 1 ? 's' : ''} saved` });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPPE([...items]);
    setIsEditing(false);
  };

  const handleItemChange = (id: string, updates: Partial<PPEItem>) => {
    setEditedPPE(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleAddItem = () => {
    const newItem: PPEItem = {
      id: `ppe-${Date.now()}`,
      itemNumber: editedPPE.length + 1,
      ppeType: '',
      standard: '',
      mandatory: true,
      purpose: ''
    };
    setEditedPPE(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setEditedPPE(prev => prev.filter(item => item.id !== id).map((item, idx) => ({
      ...item,
      itemNumber: idx + 1
    })));
  };

  const handleSheetSave = (ppeItems: PPEItem[]) => {
    if (onUpdate) {
      onUpdate(ppeItems);
    }
  };

  if (items.length === 0 && !editable) {
    return null;
  }

  return (
    <>
      {/* Mobile Edit Sheet */}
      <PPEEditSheet
        ppeItems={items}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={handleSheetSave}
      />

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden">
        {/* Card Header */}
        <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-elec-yellow" />
            <h3 className="text-sm font-semibold text-white">Required PPE</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/10 text-white border-0 text-[10px]">
              {isEditing ? editedPPE.length : items.length} items
            </Badge>
            {editable && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditClick}
                className="h-8 w-8 p-0 text-white hover:text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-3">
          {/* View Mode */}
          {!isEditing && (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between py-3 px-1 touch-manipulation min-h-[44px]">
                  <span className="text-sm text-white">
                    {isOpen ? 'Hide details' : 'Show all PPE requirements'}
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-white transition-transform duration-200",
                    isOpen && "rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="space-y-2 pb-4">
                  {items.map((item) => {
                    const Icon = getPPEIcon(item.ppeType);
                    return (
                      <li key={item.id} className="flex items-start gap-3 text-sm text-white py-2 px-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-elec-yellow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-white">{item.ppeType}</span>
                          {item.standard && (
                            <p className="text-xs text-white mt-0.5">{item.standard}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {editable && (
                  <div className="pb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditClick}
                      className="h-9 text-xs border-white/[0.08] text-white hover:text-elec-yellow hover:border-elec-yellow/30"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1.5" />
                      Edit PPE Requirements
                    </Button>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Edit Mode (Desktop) */}
          {isEditing && (
            <div className="space-y-4 py-4">
              {/* Add Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddItem}
                className="w-full sm:w-auto h-10 text-xs border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add PPE Item
              </Button>

              {/* Editable Items */}
              <div className="space-y-3">
                {editedPPE.map((item, index) => {
                  const Icon = getPPEIcon(item.ppeType);
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]"
                    >
                      {/* Item Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-elec-yellow" />
                          </div>
                          <span className="text-xs font-bold text-white">PPE #{index + 1}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="h-8 w-8 p-0 text-white hover:text-white hover:bg-white/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white">PPE Type</label>
                          <Input
                            value={item.ppeType}
                            onChange={(e) => handleItemChange(item.id, { ppeType: e.target.value })}
                            placeholder="e.g., Safety Helmet"
                            className="h-10 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white">Standard</label>
                          <Input
                            value={item.standard}
                            onChange={(e) => handleItemChange(item.id, { standard: e.target.value })}
                            placeholder="e.g., BS EN 397"
                            className="h-10 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white">Purpose</label>
                          <Input
                            value={item.purpose}
                            onChange={(e) => handleItemChange(item.id, { purpose: e.target.value })}
                            placeholder="e.g., Head protection"
                            className="h-10 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {editedPPE.length === 0 && (
                <div className="text-center py-8 text-white border border-dashed border-white/10 rounded-xl">
                  <ShieldCheck className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No PPE items yet</p>
                  <p className="text-xs mt-1">Click "Add PPE Item" to add requirements</p>
                </div>
              )}

              {/* Save/Cancel Actions */}
              <div className="flex gap-2 pt-4 border-t border-white/[0.05]">
                <Button
                  variant="outline"
                  className="flex-1 border-white/[0.08]"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
