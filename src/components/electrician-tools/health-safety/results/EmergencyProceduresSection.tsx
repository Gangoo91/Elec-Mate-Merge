import { useState } from 'react';
import { AlertCircle, Trash2, Edit2, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

interface EmergencyProceduresSectionProps {
  procedures: string[];
  isEditing?: boolean;
  onUpdate?: (index: number, value: string) => void;
  onDelete?: (index: number) => void;
  onMove?: (index: number, direction: 'up' | 'down') => void;
  onAdd?: () => void;
}

export const EmergencyProceduresSection = ({
  procedures,
  isEditing = false,
  onUpdate,
  onDelete,
  onMove,
  onAdd,
}: EmergencyProceduresSectionProps) => {
  const { isMobile } = useMobileEnhanced();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  if (!procedures || procedures.length === 0) return null;

  const handleStartEdit = (idx: number, value: string) => {
    setEditingIndex(idx);
    setEditValue(value);
  };

  const handleSaveEdit = (idx: number) => {
    onUpdate?.(idx, editValue);
    setEditingIndex(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {procedures.map((procedure, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] relative sm:flex-row sm:items-start"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </div>

              {editingIndex === idx ? (
                <div className="flex-1 w-full space-y-2">
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={cn(
                      'min-h-[60px] touch-manipulation',
                      isMobile && 'min-h-[100px] text-base'
                    )}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(idx)}
                      className={cn(
                        'touch-manipulation active:scale-[0.98]',
                        isMobile && 'min-h-[44px] px-4'
                      )}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className={cn(
                        'touch-manipulation active:scale-[0.98]',
                        isMobile && 'min-h-[44px] px-4'
                      )}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="flex-1 w-full text-sm text-white leading-relaxed pt-1 text-center sm:text-left">
                    {procedure}
                  </p>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleStartEdit(idx, procedure)}
                      className={cn(
                        'touch-manipulation active:scale-[0.95]',
                        isMobile ? 'h-11 w-11' : 'h-8 w-8'
                      )}
                    >
                      <Edit2 className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete?.(idx)}
                      className={cn(
                        'text-red-500 hover:text-red-700 hover:bg-red-100 touch-manipulation active:scale-[0.95]',
                        isMobile ? 'h-11 w-11' : 'h-8 w-8'
                      )}
                    >
                      <Trash2 className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
                    </Button>
                  </div>
                </>
              )}
            </div>
        ))}
      </div>

      <Button
        onClick={onAdd}
        variant="outline"
        className={cn(
          'w-full touch-manipulation active:scale-[0.98]',
          isMobile && 'min-h-[48px]'
        )}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Procedure
      </Button>

      {/* Emergency Contact Reminder */}
      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white">
            <span className="font-semibold text-white">Important:</span> Ensure all team
            members are familiar with emergency procedures and know the location of first aid
            equipment and emergency exits.
          </p>
        </div>
      </div>
    </div>
  );
};
