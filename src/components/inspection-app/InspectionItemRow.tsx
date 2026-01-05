import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';
import InspectionOutcomeSelect from './InspectionOutcomeSelect';
import InspectionPhotoUpload from './inspection/InspectionPhotoUpload';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { useParams } from 'react-router-dom';

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

interface InspectionItemRowProps {
  sectionItem: InspectionSectionItem;
  inspectionItem?: InspectionItem;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  onNavigateToObservations?: () => void;
}

const InspectionItemRow = ({ 
  sectionItem, 
  inspectionItem, 
  onUpdateItem, 
  onOutcomeChange,
  onNavigateToObservations 
}: InspectionItemRowProps) => {
  const { id: reportId } = useParams();
  const [localNotes, setLocalNotes] = React.useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [showPhotoUpload, setShowPhotoUpload] = React.useState(false);
  
  const currentOutcome = inspectionItem?.outcome || 'not-applicable';
  const isInspected = inspectionItem?.inspected || false;

  const { photos, isUploading, uploadPhoto } = useInspectionPhotos({
    reportId: reportId || '',
    reportType: 'eicr',
    itemId: sectionItem.id,
  });

  const handlePhotoCapture = async (file: File) => {
    // Upload with fault code if outcome is critical
    const faultCode = ['C1', 'C2', 'C3', 'limitation'].includes(currentOutcome) 
      ? currentOutcome as 'C1' | 'C2' | 'C3' | 'limitation'
      : undefined;
    
    await uploadPhoto(file, faultCode, localNotes);
    setShowPhotoUpload(false);
  };
  
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

  // Determine row styling based on outcome - using proper dark colours for both red and amber
  const getRowStyling = () => {
    if (isC1OrC2) {
      return 'bg-red-600 border-l-4 border-l-red-800 text-foreground';
    }
    if (isC3) {
      return 'bg-amber-600 border-l-4 border-l-amber-800 text-foreground';
    }
    return '';
  };

  // Determine button styling based on outcome
  const getButtonStyling = () => {
    if (isC1OrC2) {
      return 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200';
    }
    if (isC3) {
      return 'bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200';
    }
    return 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100';
  };


  return (
    <TableRow className={getRowStyling()}>
      <TableCell>
        <Checkbox
          checked={isInspected}
          onCheckedChange={(checked) => 
            onUpdateItem(sectionItem.id, 'inspected', checked)
          }
        />
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <p className="text-sm font-medium">{sectionItem.number} {sectionItem.item}</p>
          {sectionItem.clause ? (
            <Badge 
              variant="outline" 
              className={`text-sm md:text-xs font-mono px-2 py-0.5 ${
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
            <Badge variant="secondary" className="text-sm md:text-xs font-mono px-2 py-0.5 bg-gray-500/10 border-gray-500/30 text-gray-400">
              No Specific Reg
            </Badge>
          )}
          {sectionItem.description && (
            <p className={`text-xs ${(isC1OrC2 || isC3) ? 'text-gray-200' : 'text-muted-foreground'}`}>{sectionItem.description}</p>
          )}
        </div>
      </TableCell>
      <TableCell>
        <InspectionOutcomeSelect
          itemId={sectionItem.id}
          currentOutcome={currentOutcome}
          onOutcomeChange={onOutcomeChange}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Notes..."
          value={localNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          className={`text-xs ${isCritical ? 'bg-black text-foreground placeholder-gray-400 border-gray-600' : ''}`}
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          {isCritical && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToObservations}
              className={`text-xs ${getButtonStyling()}`}
            >
              View Details
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPhotoUpload(!showPhotoUpload)}
            className="text-xs"
          >
            <Camera className="h-3 w-3 mr-1" />
            {photos.length > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {photos.length}
              </Badge>
            )}
          </Button>
        </div>
        {showPhotoUpload && (
          <div className="mt-2">
            <InspectionPhotoUpload
              onPhotoCapture={handlePhotoCapture}
              isUploading={isUploading}
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default InspectionItemRow;
