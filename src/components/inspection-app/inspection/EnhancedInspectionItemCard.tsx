import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, XCircle, AlertCircle, FileText, Eye } from 'lucide-react';
import { InspectionItem as BaseInspectionItem } from '@/data/bs7671ChecklistData';
import EnhancedInspectionOutcomeSelect from './EnhancedInspectionOutcomeSelect';

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

const commonNoteTemplates = [
  'Item requires attention to comply with BS 7671 current edition',
  'Installation not accessible for inspection',
  'Further investigation required by qualified person',
  'Remedial work recommended at earliest opportunity'
];

const EnhancedInspectionItemCard: React.FC<EnhancedInspectionItemCardProps> = ({ 
  sectionItem, 
  inspectionItem, 
  onUpdateItem, 
  onOutcomeChange,
  onNavigateToObservations 
}) => {
  const [localNotes, setLocalNotes] = React.useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  
  const currentOutcome = inspectionItem?.outcome || '';
  const isInspected = inspectionItem?.inspected || false;
  
  React.useEffect(() => {
    setLocalNotes(inspectionItem?.notes || '');
  }, [inspectionItem?.notes]);
  
  const handleNotesChange = (value: string) => {
    setLocalNotes(value);
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

  // Get outcome styling - matching observation card design
  const getOutcomeIcon = () => {
    switch (currentOutcome) {
      case 'satisfactory': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'C1': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'C2': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'C3': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'limitation': return <FileText className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
  };

  const getBorderColor = () => {
    switch (currentOutcome) {
      case 'satisfactory': return 'border-l-green-500';
      case 'C1': return 'border-l-red-500';
      case 'C2': return 'border-l-orange-500';
      case 'C3': return 'border-l-amber-500';
      case 'limitation': return 'border-l-purple-500';
      case 'not-applicable': return 'border-l-gray-500';
      default: return 'border-l-border';
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
  const isC1OrC2 = currentOutcome === 'C1' || currentOutcome === 'C2';
  
  return (
    <Card className={`border-l-4 ${getBorderColor()} shadow-sm hover:shadow-md transition-shadow mb-2 md:mb-3`}>
      <div className="p-3 md:p-4 space-y-3 md:space-y-4">
        {/* Header with Outcome Badge */}
        <div className="flex items-start md:items-center justify-between gap-2">
          <h4 className="font-semibold flex items-start md:items-center gap-1.5 md:gap-2 text-foreground text-xs md:text-sm leading-tight flex-1">
            <span className="flex-shrink-0 mt-0.5 md:mt-0">{getOutcomeIcon()}</span>
            <span className="break-words">{sectionItem.number}. {sectionItem.item}</span>
          </h4>
          <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
            <Checkbox
              checked={isInspected}
              onCheckedChange={(checked) => 
                onUpdateItem(sectionItem.id, 'inspected', checked)
              }
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 border-2 bg-card h-4 w-4 md:h-5 md:w-5"
            />
            <Label className="text-[10px] md:text-xs whitespace-nowrap">Inspected</Label>
          </div>
        </div>

        {/* Stacked Layout - Mobile Optimised */}
        <div className="space-y-3 md:space-y-4">
          {/* Regulation Reference */}
          <div>
            <Label className="text-xs md:text-sm font-medium">BS 7671 Clause</Label>
            {sectionItem.clause ? (
              <Badge 
                variant="outline" 
                className={`mt-1 text-[10px] md:text-xs font-mono px-1.5 md:px-2 py-0.5 ${
                  sectionItem.clause.includes('Visual') || sectionItem.clause.includes('Reserved')
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                    : sectionItem.clause.includes('Part') || sectionItem.clause.includes('Chapter')
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-muted/50'
                }`}
              >
                {sectionItem.clause.includes('Visual') || sectionItem.clause.includes('Reserved') || 
                 sectionItem.clause.includes('Part') || sectionItem.clause.includes('Chapter')
                  ? sectionItem.clause
                  : `BS 7671:${sectionItem.clause}`}
              </Badge>
            ) : (
              <Badge variant="secondary" className="mt-1 text-[10px] md:text-xs font-mono px-1.5 md:px-2 py-0.5 bg-gray-500/10 border-gray-500/30 text-gray-400">
                No Specific Reg
              </Badge>
            )}
          </div>

          {/* Outcome Selection */}
          <div>
            <Label className="text-xs md:text-sm font-medium">Outcome</Label>
            <div className="mt-1">
              <EnhancedInspectionOutcomeSelect
                itemId={sectionItem.id}
                currentOutcome={currentOutcome}
                onOutcomeChange={onOutcomeChange}
              />
            </div>
          </div>

          {/* Description */}
          {sectionItem.description && (
            <div>
              <Label className="text-xs md:text-sm font-medium">Item Description</Label>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
                {sectionItem.description}
              </p>
            </div>
          )}

          {/* Notes - with Suggestions */}
          <div className="relative">
            <Label className="text-xs md:text-sm font-medium">Notes / Comments</Label>
            <Textarea
              placeholder="Add inspection notes, observations, or additional details..."
              value={localNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                if (localNotes.length > 0 && localNotes.length < 10) {
                  setShowSuggestions(true);
                }
              }}
              rows={2}
              className="mt-1 text-xs md:text-sm md:rows-3"
            />
            
            {/* Smart Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-32 md:max-h-40 overflow-y-auto">
                {commonNoteTemplates
                  .filter(template => 
                    template.toLowerCase().includes(localNotes.toLowerCase())
                  )
                  .slice(0, 3)
                  .map((template, index) => (
                    <button
                      key={index}
                      onClick={() => applySuggestion(template)}
                      className="w-full text-left px-2 md:px-3 py-1.5 md:py-2 text-[10px] md:text-xs hover:bg-muted/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {template}
                    </button>
                  ))
                }
              </div>
            )}
          </div>
        </div>

        {/* Critical Outcome Actions */}
        {isCriticalOutcome && (
          <div className="pt-3 md:pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToObservations}
              className={`w-full text-xs md:text-sm h-8 md:h-9 ${
                isC1OrC2 
                  ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20'
              }`}
            >
              <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1.5 md:mr-2" />
              View Full Details
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EnhancedInspectionItemCard;