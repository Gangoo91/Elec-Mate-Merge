import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, XCircle, AlertCircle, FileText, Eye } from 'lucide-react';
import InspectionOutcomeSelect from './InspectionOutcomeSelect';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface InspectionSectionItem {
  id: string;
  number: string;
  item: string;
  clause: string;
  description?: string;
}

interface InspectionItemCardProps {
  sectionItem: InspectionSectionItem;
  inspectionItem?: InspectionItem;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  onNavigateToObservations?: () => void;
}

const InspectionItemCard = ({ 
  sectionItem, 
  inspectionItem, 
  onUpdateItem, 
  onOutcomeChange,
  onNavigateToObservations 
}: InspectionItemCardProps) => {
  const [localNotes, setLocalNotes] = React.useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
  
  const currentOutcome = inspectionItem?.outcome || 'not-applicable';
  const isInspected = inspectionItem?.inspected || false;
  
  // Sync local notes when inspection item changes
  React.useEffect(() => {
    setLocalNotes(inspectionItem?.notes || '');
  }, [inspectionItem?.notes]);
  
  // Handle notes input with debouncing
  const handleNotesChange = (value: string) => {
    setLocalNotes(value);
    
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Set new timer for debounced update
    const newTimer = setTimeout(() => {
      onUpdateItem(sectionItem.id, 'notes', value);
    }, 300); // 300ms debounce
    
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
  
  // Distinguish between different critical outcomes
  const isC1OrC2 = currentOutcome === 'C1' || currentOutcome === 'C2';
  const isC3 = currentOutcome === 'C3';
  const isCritical = isC1OrC2 || isC3;

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

  return (
    <Card className={`border-l-4 ${getBorderColor()} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="p-3 md:p-4">
        {/* Header with Outcome Badge */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h4 className="font-semibold flex items-center gap-2 text-foreground">
            {getOutcomeIcon()}
            {sectionItem.number}. {sectionItem.item}
          </h4>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isInspected}
              onCheckedChange={(checked) => 
                onUpdateItem(sectionItem.id, 'inspected', checked)
              }
            />
            <Label>Inspected</Label>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Regulation Reference */}
          <div>
            <Label className="cursor-pointer">BS 7671 Clause</Label>
            {sectionItem.clause ? (
              <Badge 
                variant="outline" 
                className={`mt-1 text-sm md:text-xs font-mono px-3 py-1 ${
                  sectionItem.clause.includes('Visual') || sectionItem.clause.includes('Reserved')
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                    : sectionItem.clause.includes('Part') || sectionItem.clause.includes('Chapter')
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                }`}
              >
                {sectionItem.clause}
              </Badge>
            ) : (
              <Badge variant="secondary" className="mt-1 text-sm md:text-xs font-mono px-3 py-1 bg-gray-500/10 border-gray-500/30 text-gray-400">
                No Specific Reg
              </Badge>
            )}
          </div>

          {/* Outcome Selection */}
          <div>
            <Label>Outcome</Label>
            <InspectionOutcomeSelect
              itemId={sectionItem.id}
              currentOutcome={currentOutcome}
              onOutcomeChange={onOutcomeChange}
            />
          </div>

          {/* Description - Full Width */}
          {sectionItem.description && (
            <div className="md:col-span-2">
              <Label>Item Description</Label>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {sectionItem.description}
              </p>
            </div>
          )}

          {/* Notes - Full Width */}
          <div className="md:col-span-2">
            <Label>Notes / Comments</Label>
            <Textarea
              placeholder="Add inspection notes, observations, or additional details..."
              value={localNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={2}
              className="mt-1 touch-manipulation text-base min-h-[100px] md:min-h-[120px]"
            />
          </div>
        </div>

        {/* Critical Outcome Actions */}
        {isCritical && onNavigateToObservations && (
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t">
            <Button
              variant="outline"
              onClick={onNavigateToObservations}
              className={`w-full h-10 md:h-9 text-sm md:text-xs ${
                isC1OrC2 
                  ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20'
              }`}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Full Details
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default InspectionItemCard;