import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye } from 'lucide-react';
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

const commonNoteTemplates = [
  'Item requires attention to comply with BS 7671 current edition',
  'Installation not accessible for inspection',
  'Further investigation required by qualified person',
  'Remedial work recommended at earliest opportunity',
  'Documentation required to verify compliance'
];

const EnhancedInspectionItemRow: React.FC<EnhancedInspectionItemRowProps> = ({ 
  sectionItem, 
  inspectionItem, 
  onUpdateItem, 
  onOutcomeChange,
  onNavigateToObservations 
}) => {
  const rowRef = React.useRef<HTMLTableRowElement>(null);
  const [localNotes, setLocalNotes] = React.useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  
  const currentOutcome = inspectionItem?.outcome || '';
  const isInspected = inspectionItem?.inspected || false;
  
  // Sync local notes when inspection item changes
  React.useEffect(() => {
    setLocalNotes(inspectionItem?.notes || '');
  }, [inspectionItem?.notes]);
  
  // Handle notes input with debouncing and smart suggestions
  const handleNotesChange = (value: string) => {
    setLocalNotes(value);
    
    // Show suggestions if typing
    setShowSuggestions(value.length > 0 && value.length < 10);
    
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    const newTimer = setTimeout(() => {
      onUpdateItem(sectionItem.id, 'notes', value);
    }, 300);
    
    setDebounceTimer(newTimer);
  };
  
  const applySuggestion = (template: string) => {
    setLocalNotes(template);
    setShowSuggestions(false);
    onUpdateItem(sectionItem.id, 'notes', template);
  };
  
  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);
  
  const getOutcomeClass = (outcome: string) => {
    switch (outcome) {
      case 'satisfactory': return 'inspection-row-satisfactory';
      case 'C1': return 'inspection-row-c1';
      case 'C2': return 'inspection-row-c2';
      case 'C3': return 'inspection-row-c3';
      case 'FI': return 'inspection-row-fi';
      case 'not-applicable': return 'inspection-row-na';
      default: return '';
    }
  };
  
  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);
  
  return (
    <TableRow
      ref={rowRef}
      className={cn(
        'group transition-all duration-200 border-b border-border/30 hover:bg-muted/30 relative h-16',
        getOutcomeClass(currentOutcome),
        isFocused && 'ring-2 ring-elec-yellow/20',
        isInspected && 'border-l-4 border-l-elec-yellow'
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!rowRef.current?.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
          setShowSuggestions(false);
        }
      }}
      onMouseDown={(e) => {
        const el = e.target as HTMLElement;
        if (!el.closest('input, textarea, select, button, [role="button"], [role="menuitem"], .prevent-shortcuts')) {
          rowRef.current?.focus();
        }
      }}
      tabIndex={0}
      role="row"
      aria-label={`Inspection item: ${sectionItem.item}`}
    >
      <TableCell className="relative text-center py-2">
        <Checkbox
          checked={isInspected}
          onCheckedChange={(checked) => 
            onUpdateItem(sectionItem.id, 'inspected', checked)
          }
          className="mx-auto data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 border-2 bg-card w-5 h-5"
          aria-label={`Mark ${sectionItem.item} as inspected`}
        />
      </TableCell>
      
      <TableCell className="max-w-xs py-2 align-middle">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm font-medium text-foreground truncate cursor-help">
                {sectionItem.number}. {sectionItem.item}
              </p>
            </TooltipTrigger>
            {sectionItem.description && (
              <TooltipContent className="max-w-sm">
                <p className="text-xs">{sectionItem.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      
      <TableCell className="py-2 align-middle">
        {sectionItem.clause ? (
          <Badge 
            variant="outline" 
            className={`text-[11px] font-normal font-mono w-fit py-0.5 ${
              sectionItem.clause.includes('Visual') || sectionItem.clause.includes('Reserved')
                ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                : sectionItem.clause.includes('Part') || sectionItem.clause.includes('Chapter')
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-muted/50'
            }`}
          >
            {sectionItem.clause}
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-[11px] font-normal font-mono w-fit py-0.5 bg-white/5 border-white/20 text-white/70">
            No Specific Reg
          </Badge>
        )}
      </TableCell>
      
      <TableCell className="relative py-2 align-middle">
        <EnhancedInspectionOutcomeSelect
          itemId={sectionItem.id}
          currentOutcome={currentOutcome}
          onOutcomeChange={onOutcomeChange}
        />
      </TableCell>
      
      <TableCell className="relative py-2 align-middle">
        <div className="space-y-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  placeholder="Add notes or..."
                  value={localNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="text-sm bg-muted/20 border-border/50"
                  aria-label={`Notes for ${sectionItem.item}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-xs">Add inspection notes or observations</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Smart Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-lg shadow-xl max-h-40 overflow-y-auto">
              {commonNoteTemplates
                .filter(template => 
                  template.toLowerCase().includes(localNotes.toLowerCase())
                )
                .slice(0, 3)
                .map((template, index) => (
                  <button
                    key={index}
                    onClick={() => applySuggestion(template)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-muted/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {template}
                  </button>
                ))
              }
            </div>
          )}
        </div>
      </TableCell>
      
      <TableCell className="py-2 align-middle">
        <div className="flex items-center gap-2">
          {isCriticalOutcome && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToObservations}
              className="text-xs h-8 bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20 transition-all duration-200"
              aria-label={`View details for critical outcome ${currentOutcome}`}
            >
              <Eye className="h-3 w-3 mr-1" />
              Details
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EnhancedInspectionItemRow;