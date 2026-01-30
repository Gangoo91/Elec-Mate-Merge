import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, HardHat, Eye, Hand, Footprints, Ear, Zap, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
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
  if (type.includes('eye') || type.includes('goggles') || type.includes('glasses')) return Eye;
  if (type.includes('glove')) return Hand;
  if (type.includes('boot') || type.includes('footwear')) return Footprints;
  if (type.includes('ear') || type.includes('hearing')) return Ear;
  if (type.includes('insulated')) return Zap;
  return ShieldCheck;
};

export const PPEGridView: React.FC<PPEGridViewProps> = ({
  ppeDetails,
  requiredPPE,
  editable = false,
  onUpdate
}) => {
  const { isMobile } = useMobileEnhanced();
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
    return (
      <div className="py-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
          </div>
          <h4 className="font-semibold text-white">Required PPE</h4>
        </div>
        <p className="text-sm text-white/50">No PPE requirements specified</p>
      </div>
    );
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

      <div className="py-6 border-t border-white/5 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-elec-yellow" />
            </div>
            <h4 className="font-semibold text-white">Required PPE</h4>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              {isEditing ? editedPPE.length : items.length} items
            </Badge>
            {editable && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditClick}
                className="h-9 w-9 p-0 rounded-lg hover:bg-white/10 active:bg-white/20 touch-manipulation"
              >
                <Edit3 className="h-4 w-4 text-white/60" />
              </Button>
            )}
          </div>
        </div>

        {/* View Mode */}
        {!isEditing && (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => {
              const Icon = getPPEIcon(item.ppeType);
              return (
                <div
                  key={item.id}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-2 rounded-full border transition-all',
                    item.mandatory
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-white/[0.03] border-white/[0.08] text-white/70'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.ppeType}</span>
                  {item.mandatory && (
                    <span className="text-xs bg-red-500/20 px-1.5 py-0.5 rounded-full">Required</span>
                  )}
                </div>
              );
            })}
            {items.length === 0 && editable && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditClick}
                className="h-9 text-xs border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add PPE Requirements
              </Button>
            )}
          </div>
        )}

        {/* Edit Mode (Desktop) */}
        {isEditing && (
          <div className="space-y-4">
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
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          item.mandatory ? "bg-red-500/20" : "bg-elec-yellow/10"
                        )}>
                          <Icon className={cn("h-4 w-4", item.mandatory ? "text-red-400" : "text-elec-yellow")} />
                        </div>
                        <span className="text-xs font-bold text-white/60">PPE #{index + 1}</span>
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

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-white/60">PPE Type</label>
                        <Input
                          value={item.ppeType}
                          onChange={(e) => handleItemChange(item.id, { ppeType: e.target.value })}
                          placeholder="e.g., Safety Helmet"
                          className="h-10 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-white/60">Standard</label>
                        <Input
                          value={item.standard}
                          onChange={(e) => handleItemChange(item.id, { standard: e.target.value })}
                          placeholder="e.g., BS EN 397"
                          className="h-10 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-white/60">Purpose</label>
                        <Input
                          value={item.purpose}
                          onChange={(e) => handleItemChange(item.id, { purpose: e.target.value })}
                          placeholder="e.g., Head protection"
                          className="h-10 text-sm"
                        />
                      </div>
                    </div>

                    {/* Mandatory Toggle */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
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
                );
              })}
            </div>

            {/* Empty State */}
            {editedPPE.length === 0 && (
              <div className="text-center py-8 text-white/50 border border-dashed border-white/10 rounded-xl">
                <ShieldCheck className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No PPE items yet</p>
                <p className="text-xs mt-1">Click "Add PPE Item" to add requirements</p>
              </div>
            )}

            {/* Save/Cancel Actions */}
            <div className="flex gap-2 pt-4 border-t border-white/5">
              <Button
                variant="outline"
                className="flex-1"
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

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
        `}</style>
      </div>
    </>
  );
};
