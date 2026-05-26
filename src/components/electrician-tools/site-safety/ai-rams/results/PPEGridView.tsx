import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
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

/**
 * Required PPE — editorial list. No icons, no chip backgrounds.
 * Collapsible — collapsed shows just the count; expanded shows
 * editorial rows with PPE type + standard.
 */
export const PPEGridView: React.FC<PPEGridViewProps> = ({
  ppeDetails,
  requiredPPE,
  editable = false,
  onUpdate,
}) => {
  const { isMobile } = useMobileEnhanced();
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [editedPPE, setEditedPPE] = useState<PPEItem[]>([]);

  const items: PPEItem[] =
    ppeDetails && ppeDetails.length > 0
      ? ppeDetails
      : requiredPPE?.map((ppe, idx) => ({
          id: 'ppe-' + idx,
          itemNumber: idx + 1,
          ppeType: ppe,
          standard: 'BS EN Standard',
          mandatory: true,
          purpose: 'Required for safety',
        })) || [];

  useEffect(() => {
    setEditedPPE(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const validItems = editedPPE.filter((item) => item.ppeType.trim());
      onUpdate(validItems);
      toast({
        title: 'PPE updated',
        description: `${validItems.length} PPE item${validItems.length !== 1 ? 's' : ''} saved`,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPPE([...items]);
    setIsEditing(false);
  };

  const handleItemChange = (id: string, updates: Partial<PPEItem>) => {
    setEditedPPE((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleAddItem = () => {
    const newItem: PPEItem = {
      id: `ppe-${Date.now()}`,
      itemNumber: editedPPE.length + 1,
      ppeType: '',
      standard: '',
      mandatory: true,
      purpose: '',
    };
    setEditedPPE((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setEditedPPE((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((item, idx) => ({ ...item, itemNumber: idx + 1 }))
    );
  };

  const handleSheetSave = (ppeItems: PPEItem[]) => {
    if (onUpdate) onUpdate(ppeItems);
  };

  if (items.length === 0 && !editable) return null;

  return (
    <>
      <PPEEditSheet
        ppeItems={items}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={handleSheetSave}
      />

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Required PPE
            </div>
            <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
              Personal protective equipment.
            </h3>
          </div>
          <div className="flex items-baseline gap-3 shrink-0">
            <span className="text-[11px] text-white/45 tabular-nums">
              {isEditing ? editedPPE.length : items.length} items
            </span>
            {editable && !isEditing && (
              <button
                type="button"
                onClick={handleEditClick}
                className="text-[12.5px] font-medium text-white/55 hover:text-elec-yellow transition-colors touch-manipulation"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* View mode */}
        {!isEditing && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="w-full text-left">
              <div className="flex items-baseline justify-between py-2 touch-manipulation">
                <span className="text-[12px] font-medium text-white/55">
                  {isOpen ? 'Hide details' : 'Show details'}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white/55 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {items.map((item, idx) => (
                  <li key={item.id} className="py-3 flex items-baseline gap-3">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow w-8 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-white">{item.ppeType}</p>
                      {item.standard && (
                        <p className="mt-0.5 text-[12px] text-white/55">{item.standard}</p>
                      )}
                    </div>
                    {item.mandatory && (
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-elec-yellow shrink-0">
                        Mandatory
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Edit mode (desktop) */}
        {isEditing && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-[12.5px] font-medium bg-white/[0.05] border border-white/[0.10] text-white/80 hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              + Add PPE item
            </button>

            <div className="space-y-3">
              {editedPPE.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                      PPE {String(index + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-[12px] font-medium text-white/55 hover:text-red-400 transition-colors touch-manipulation"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                        Type
                      </label>
                      <Input
                        value={item.ppeType}
                        onChange={(e) => handleItemChange(item.id, { ppeType: e.target.value })}
                        placeholder="e.g. Safety helmet"
                        className="h-10 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                        Standard
                      </label>
                      <Input
                        value={item.standard}
                        onChange={(e) => handleItemChange(item.id, { standard: e.target.value })}
                        placeholder="e.g. BS EN 397"
                        className="h-10 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                        Purpose
                      </label>
                      <Input
                        value={item.purpose}
                        onChange={(e) => handleItemChange(item.id, { purpose: e.target.value })}
                        placeholder="e.g. Head protection"
                        className="h-10 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {editedPPE.length === 0 && (
              <div className="bg-[hsl(0_0%_10%)] border border-dashed border-white/[0.12] rounded-2xl p-6 text-center">
                <p className="text-[13px] text-white/65">No PPE items yet</p>
                <p className="mt-1 text-[12px] text-white/45">
                  Click "+ Add PPE item" to add requirements
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 inline-flex items-center justify-center h-10 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white/80 hover:border-white/20 transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 inline-flex items-center justify-center h-10 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors touch-manipulation"
              >
                Save changes
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
