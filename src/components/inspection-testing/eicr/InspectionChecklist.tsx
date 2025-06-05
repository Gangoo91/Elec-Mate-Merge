
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardCheck, AlertTriangle } from 'lucide-react';

interface InspectionItem {
  id: string;
  category: string;
  item: string;
  checked: boolean;
  notes: string;
  isCritical: boolean;
}

interface InspectionChecklistProps {
  reportType: string;
  onComplete: () => void;
}

const InspectionChecklist = ({ reportType, onComplete }: InspectionChecklistProps) => {
  const [inspectionItems, setInspectionItems] = useState<InspectionItem[]>([
    // Consumer Unit / Distribution Board
    {
      id: 'cu-1',
      category: 'Consumer Unit',
      item: 'Adequate access and working space around consumer unit',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'cu-2',
      category: 'Consumer Unit',
      item: 'Enclosure suitable for environment and properly secured',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'cu-3',
      category: 'Consumer Unit',
      item: 'All circuits properly identified and labelled',
      checked: false,
      notes: '',
      isCritical: false,
    },
    {
      id: 'cu-4',
      category: 'Consumer Unit',
      item: 'RCD(s) present and properly identified',
      checked: false,
      notes: '',
      isCritical: true,
    },

    // Earthing and Bonding
    {
      id: 'earth-1',
      category: 'Earthing & Bonding',
      item: 'Main earthing conductor present and adequately sized',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'earth-2',
      category: 'Earthing & Bonding',
      item: 'Main bonding conductors present to water and gas services',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'earth-3',
      category: 'Earthing & Bonding',
      item: 'Supplementary bonding present where required',
      checked: false,
      notes: '',
      isCritical: true,
    },

    // Wiring Systems
    {
      id: 'wire-1',
      category: 'Wiring Systems',
      item: 'Cables properly supported and protected from damage',
      checked: false,
      notes: '',
      isCritical: false,
    },
    {
      id: 'wire-2',
      category: 'Wiring Systems',
      item: 'Cables suitable for environmental conditions',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'wire-3',
      category: 'Wiring Systems',
      item: 'Adequate protection against mechanical damage',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'wire-4',
      category: 'Wiring Systems',
      item: 'Joints and connections accessible for inspection',
      checked: false,
      notes: '',
      isCritical: false,
    },

    // Accessories and Equipment
    {
      id: 'acc-1',
      category: 'Accessories',
      item: 'Socket outlets and switches properly secured',
      checked: false,
      notes: '',
      isCritical: false,
    },
    {
      id: 'acc-2',
      category: 'Accessories',
      item: 'Adequate IP rating for location',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'acc-3',
      category: 'Accessories',
      item: 'No damage or deterioration evident',
      checked: false,
      notes: '',
      isCritical: false,
    },

    // Special Locations
    {
      id: 'special-1',
      category: 'Special Locations',
      item: 'Bathroom zones comply with BS 7671 requirements',
      checked: false,
      notes: '',
      isCritical: true,
    },
    {
      id: 'special-2',
      category: 'Special Locations',
      item: 'Kitchen requirements observed (where applicable)',
      checked: false,
      notes: '',
      isCritical: false,
    },
  ]);

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [canComplete, setCanComplete] = useState(false);

  useEffect(() => {
    const checkedItems = inspectionItems.filter(item => item.checked).length;
    const totalItems = inspectionItems.length;
    const percentage = Math.round((checkedItems / totalItems) * 100);
    setCompletionPercentage(percentage);

    // Check if all critical items are checked
    const criticalItems = inspectionItems.filter(item => item.isCritical);
    const checkedCriticalItems = criticalItems.filter(item => item.checked);
    const allCriticalChecked = checkedCriticalItems.length === criticalItems.length;
    
    setCanComplete(allCriticalChecked && percentage >= 80);
  }, [inspectionItems]);

  const updateItem = (id: string, field: 'checked' | 'notes', value: boolean | string) => {
    setInspectionItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleComplete = () => {
    // Save inspection data
    const inspectionData = {
      items: inspectionItems,
      completionPercentage,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('eicr-inspection-data', JSON.stringify(inspectionData));
    onComplete();
  };

  const groupedItems = inspectionItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, InspectionItem[]>);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <ClipboardCheck className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle>Visual Inspection Progress</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {completionPercentage}% complete ({inspectionItems.filter(i => i.checked).length}/{inspectionItems.length} items)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <div className="w-32 h-2 bg-elec-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-elec-yellow transition-all duration-300" 
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Inspection Items */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <Card key={category} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(checked) => updateItem(item.id, 'checked', checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">{item.item}</Label>
                      {item.isCritical && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                          <AlertTriangle className="h-3 w-3 text-red-400" />
                          <span className="text-xs text-red-400">Critical</span>
                        </div>
                      )}
                    </div>
                    <Textarea
                      value={item.notes}
                      onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                      placeholder="Add notes or observations..."
                      className="mt-2 bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Completion Section */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Inspection Completion</h3>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {canComplete ? (
                    <span className="text-green-400">✓ All critical items checked - ready to proceed</span>
                  ) : (
                    <span className="text-yellow-400">⚠ Complete all critical items to proceed</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Critical items must be checked and overall completion should be at least 80%
                </p>
              </div>
            </div>
            <Button
              onClick={handleComplete}
              disabled={!canComplete}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50"
            >
              Complete Inspection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectionChecklist;
