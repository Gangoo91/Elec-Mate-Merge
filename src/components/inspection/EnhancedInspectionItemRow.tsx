import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Check } from 'lucide-react';
import { InspectionItem as BaseInspectionItem } from '@/data/bs7671ChecklistData';
import EnhancedInspectionOutcomeSelect from './EnhancedInspectionOutcomeSelect';
import { cn } from '@/lib/utils';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome:
    | 'satisfactory'
    | 'C1'
    | 'C2'
    | 'C3'
    | 'not-applicable'
    | 'not-verified'
    | 'limitation'
    | '';
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
  onNavigateToObservations,
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

  // Colour-coded left edge + subtle tint per outcome — status at a glance
  const getRowAccent = () => {
    switch (currentOutcome) {
      case 'satisfactory':
        return 'border-l-green-500/80 bg-green-500/[0.035]';
      case 'C1':
        return 'border-l-red-500 bg-red-500/[0.07]';
      case 'C2':
        return 'border-l-orange-500 bg-orange-500/[0.06]';
      case 'C3':
        return 'border-l-yellow-500 bg-yellow-500/[0.045]';
      case 'not-verified':
        return 'border-l-slate-400/70';
      case 'limitation':
        return 'border-l-amber-400/70';
      case 'not-applicable':
        return 'border-l-white/20';
      default:
        return 'border-l-transparent';
    }
  };

  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);

  return (
    <TableRow
      className={cn(
        'group transition-colors duration-200 border-b border-white/[0.04] border-l-[3px] hover:bg-white/[0.035]',
        getRowAccent()
      )}
    >
      {/* Item Number + Title + Clause */}
      <TableCell className="py-3.5 pl-4 text-left">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-1 text-left">
                <p className="text-sm text-white leading-relaxed text-left">
                  <span className="text-elec-yellow font-mono font-semibold mr-2">
                    {sectionItem.number}
                  </span>
                  {sectionItem.item}
                </p>
                {sectionItem.clause && (
                  <span className="inline-block text-[10px] text-white/55 font-mono bg-white/[0.05] border border-white/[0.07] rounded px-1.5 py-0.5">
                    {sectionItem.clause}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            {sectionItem.description && (
              <TooltipContent className="max-w-sm bg-card border-white/10">
                <p className="text-xs text-white">{sectionItem.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      {/* Outcome Chips - Compact mode */}
      <TableCell className="w-[440px] py-4">
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
                     placeholder:text-white"
        />
      </TableCell>

      {/* Actions */}
      <TableCell className="w-24 text-center py-4">
        <div className="flex items-center justify-center gap-1">
          {isCriticalOutcome && onNavigateToObservations && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNavigateToObservations}
              className={cn(
                'h-8 w-8',
                currentOutcome === 'C1' && 'text-red-400 hover:text-red-300 hover:bg-red-500/10',
                currentOutcome === 'C2' &&
                  'text-orange-400 hover:text-orange-300 hover:bg-orange-500/10',
                currentOutcome === 'C3' &&
                  'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10'
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
