import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { EICInspectionItem } from '@/data/bs7671EICChecklistData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
interface EICInspectionChecklistCardProps {
  inspectionItems: EICInspectionItem[];
  onUpdateItem: (id: string, field: keyof EICInspectionItem, value: any) => void;
}
const EICInspectionChecklistCard: React.FC<EICInspectionChecklistCardProps> = ({
  inspectionItems,
  onUpdateItem
}) => {
  const handleOutcomeChange = (id: string, outcome: 'satisfactory' | 'not-applicable') => {
    const currentItem = inspectionItems.find(item => item.id === id);
    if (currentItem?.outcome === outcome) {
      // Toggle off if clicking the same button
      onUpdateItem(id, 'outcome', '');
    } else {
      onUpdateItem(id, 'outcome', outcome);
    }
  };
  return <Card className="border border-border bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Schedule of Inspections
        </CardTitle>
        <p className="text-sm text-muted-foreground">IET Model Forms - BS7671 18th Edition + A3:2024 compliant. For residential and similar premises with up to 100 A supply.</p>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6">
        {inspectionItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No inspection items found. Please refresh the page or contact support.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inspectionItems.map(item => <div key={item.id} className="border border-border rounded-lg p-3 sm:p-4 bg-background/50 space-y-3">
              {/* Item Header */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 sm:w-14">
                  <div className="text-sm font-semibold text-elec-yellow">
                    {item.itemNumber}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.description}</p>
                </div>
              </div>

              {/* Outcome Buttons */}
              <div className="flex items-center gap-2 pl-0 sm:pl-14">
                <Button variant={item.outcome === 'satisfactory' ? 'default' : 'outline'} size="default" onClick={() => handleOutcomeChange(item.id, 'satisfactory')} className={`h-10 touch-manipulation ${item.outcome === 'satisfactory' ? 'bg-green-600 hover:bg-green-700 text-foreground border-green-600' : 'border-border text-foreground hover:bg-card'}`}>
                  ✓ Satisfactory
                </Button>
                <Button variant={item.outcome === 'not-applicable' ? 'default' : 'outline'} size="default" onClick={() => handleOutcomeChange(item.id, 'not-applicable')} className={`h-10 touch-manipulation ${item.outcome === 'not-applicable' ? 'bg-neutral-600 hover:bg-muted text-foreground border-border' : 'border-border text-foreground hover:bg-card'}`}>
                  N/A
                </Button>
              </div>

              {/* Notes Field */}
              {item.outcome && <div className="pl-0 sm:pl-14">
                  <Textarea placeholder="Add notes (optional)" value={item.notes || ''} onChange={e => onUpdateItem(item.id, 'notes', e.target.value)} className="min-h-[60px] text-sm bg-card border-border text-foreground" />
                </div>}
            </div>)}
          </div>
        )}
      </CardContent>
    </Card>;
};
export default EICInspectionChecklistCard;