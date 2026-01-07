import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Eye } from 'lucide-react';
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

interface EnhancedInspectionItemCardProps {
  sectionItem: BaseInspectionItem;
  inspectionItem?: InspectionItem;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  onNavigateToObservations?: () => void;
}

const EnhancedInspectionItemCard: React.FC<EnhancedInspectionItemCardProps> = ({
  sectionItem,
  inspectionItem,
  onUpdateItem,
  onOutcomeChange,
  onNavigateToObservations
}) => {
  const [localNotes, setLocalNotes] = React.useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);

  const currentOutcome = inspectionItem?.outcome || '';

  React.useEffect(() => {
    setLocalNotes(inspectionItem?.notes || '');
  }, [inspectionItem?.notes]);

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

  // Get outcome-based styling class
  const getOutcomeClass = () => {
    switch (currentOutcome) {
      case 'satisfactory': return 'eicr-inspection-item-ok';
      case 'C1': return 'eicr-inspection-item-c1';
      case 'C2': return 'eicr-inspection-item-c2';
      case 'C3': return 'eicr-inspection-item-c3';
      case 'limitation': return 'eicr-inspection-item-lim';
      case 'not-verified': return 'eicr-inspection-item-nv';
      case 'not-applicable': return 'eicr-inspection-item-na';
      default: return '';
    }
  };

  React.useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);

  // Format clause for display
  const formatClause = (clause: string | undefined) => {
    if (!clause) return null;
    if (clause.includes('Visual') || clause.includes('Reserved') ||
        clause.includes('Part') || clause.includes('Chapter')) {
      return clause;
    }
    return `Regulation ${clause}`;
  };

  return (
    <div className={cn(
      "eicr-inspection-item",
      getOutcomeClass(),
      "active:scale-[0.995] touch-manipulation transition-transform duration-150"
    )}>
      {/* Section 1: Header - Item Number, Title, Clause */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          {/* Item Number */}
          <span className="flex-shrink-0 text-elec-yellow font-mono text-sm font-semibold mt-0.5">
            {sectionItem.number}
          </span>

          {/* Item Title & Clause */}
          <div className="flex-1 min-w-0">
            <p className="text-base text-white leading-relaxed font-medium">
              {sectionItem.item}
            </p>
            {sectionItem.clause && (
              <span className="text-xs text-white/50 font-mono mt-1 block">
                {formatClause(sectionItem.clause)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Outcome Selection */}
      <div className="px-4 pb-4">
        <p className="eicr-section-label">Outcome</p>
        <EnhancedInspectionOutcomeSelect
          itemId={sectionItem.id}
          currentOutcome={currentOutcome}
          onOutcomeChange={onOutcomeChange}
        />
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/5" />

      {/* Section 3: Notes - Always visible */}
      <div className="p-4">
        <p className="eicr-section-label">Notes</p>
        <Textarea
          placeholder="Add inspection notes..."
          value={localNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          rows={2}
          style={{ fontSize: '16px' }} // Prevent iOS zoom
          className="text-base bg-white/5 border-white/10 focus:border-elec-yellow/50
                     placeholder:text-white/30 resize-none min-h-[80px]"
        />
      </div>

      {/* Section 4: Actions - 44px touch targets */}
      <div className="px-4 pb-4 flex gap-3">
        {/* Photo Button */}
        <Button
          variant="outline"
          className={cn(
            "flex-1 h-11 text-sm font-medium",
            "bg-white/5 border-white/10 text-white/70",
            "hover:bg-white/10 hover:text-white",
            "active:scale-95 touch-manipulation"
          )}
        >
          <Camera className="h-4 w-4 mr-2" />
          Photo
        </Button>

        {/* Observation Button - Only for critical outcomes */}
        {isCriticalOutcome && onNavigateToObservations && (
          <Button
            variant="outline"
            onClick={onNavigateToObservations}
            className={cn(
              "flex-1 h-11 text-sm font-medium",
              "active:scale-95 touch-manipulation",
              currentOutcome === 'C1' && "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20",
              currentOutcome === 'C2' && "bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20",
              currentOutcome === 'C3' && "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
            )}
          >
            <Eye className="h-4 w-4 mr-2" />
            Observation
          </Button>
        )}
      </div>
    </div>
  );
};

export default EnhancedInspectionItemCard;
