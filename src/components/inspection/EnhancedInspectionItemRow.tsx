import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Camera, Eye, Check } from 'lucide-react';
import { InspectionItem as BaseInspectionItem } from '@/data/bs7671ChecklistData';
import EnhancedInspectionOutcomeSelect from './EnhancedInspectionOutcomeSelect';
import { cn } from '@/lib/utils';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface EnhancedInspectionItemRowProps {
  sectionItem: BaseInspectionItem;
  inspectionItem?: InspectionItem;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  onNavigateToObservations?: () => void;
}

const EnhancedInspectionItemRow: React.FC<EnhancedInspectionItemRowProps> = ({
  sectionItem,
  inspectionItem,
  onUpdateItem,
  onOutcomeChange,
  onNavigateToObservations
}) => {
  const [localNotes, setLocalNotes] = React.useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);

  const currentOutcome = inspectionItem?.outcome || '';
  const isCompleted = currentOutcome !== '';

  // Sync local notes when inspection item changes
  React.useEffect(() => {
    setLocalNotes(inspectionItem?.notes || '');
  }, [inspectionItem?.notes]);

  // Handle notes input with debouncing
  const handleNotesChange = (value: string) => {
    setLocalNotes(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      onUpdateItem(sectionItem.id, 'notes', value);
    }, 300);

    setDebounceTimer(newTimer);
  };

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Get row highlight color based on outcome
  const getRowBgClass = () => {
    switch (currentOutcome) {
      case 'satisfactory': return 'bg-green-500/5';
      case 'C1': return 'bg-red-500/10';
      case 'C2': return 'bg-orange-500/10';
      case 'C3': return 'bg-yellow-500/5';
      default: return '';
    }
  };

  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);

  return (
    <TableRow
      className={cn(
        "group transition-all duration-200 border-b border-white/5 hover:bg-white/5",
        getRowBgClass()
      )}
    >
      {/* Status Indicator */}
      <TableCell className="w-14 text-center py-4">
        <div className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-colors",
          isCompleted ? "bg-green-500/20" : "bg-white/5 border border-white/10"
        )}>
          {isCompleted && (
            <Check className="h-4 w-4 text-green-400" />
          )}
        </div>
      </TableCell>

      {/* Item Number + Title + Clause */}
      <TableCell className="py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-1">
                <p className="text-sm text-white leading-relaxed">
                  <span className="text-elec-yellow font-mono font-semibold mr-2">
                    {sectionItem.number}
                  </span>
                  {sectionItem.item}
                </p>
                {sectionItem.clause && (
                  <p className="text-xs text-white/40 font-mono">
                    {sectionItem.clause}
                  </p>
                )}
              </div>
            </TooltipTrigger>
            {sectionItem.description && (
              <TooltipContent className="max-w-sm bg-card border-white/10">
                <p className="text-xs text-white/80">{sectionItem.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      {/* Outcome Chips - Compact mode */}
      <TableCell className="w-72 py-4">
        <EnhancedInspectionOutcomeSelect
          itemId={sectionItem.id}
          currentOutcome={currentOutcome}
          onOutcomeChange={onOutcomeChange}
          compact={true}
        />
      </TableCell>

      {/* Notes */}
      <TableCell className="py-4">
        <Input
          placeholder="Add notes..."
          value={localNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          className="text-sm h-9 bg-white/5 border-white/10 focus:border-elec-yellow/50
                     placeholder:text-white/30"
        />
      </TableCell>

      {/* Actions */}
      <TableCell className="w-24 text-center py-4">
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10"
          >
            <Camera className="h-4 w-4" />
          </Button>

          {isCriticalOutcome && onNavigateToObservations && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNavigateToObservations}
              className={cn(
                "h-8 w-8",
                currentOutcome === 'C1' && "text-red-400 hover:text-red-300 hover:bg-red-500/10",
                currentOutcome === 'C2' && "text-orange-400 hover:text-orange-300 hover:bg-orange-500/10",
                currentOutcome === 'C3' && "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
              )}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EnhancedInspectionItemRow;
