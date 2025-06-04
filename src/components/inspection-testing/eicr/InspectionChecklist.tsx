
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { ReportType } from './DigitalEICRForm';

interface InspectionItem {
  id: string;
  category: string;
  item: string;
  requirement: string;
  isRequired: boolean;
  checked: boolean;
  nonCompliant: boolean;
  notes: string;
}

interface InspectionChecklistProps {
  reportType: ReportType;
  onComplete: () => void;
}

const InspectionChecklist = ({ reportType, onComplete }: InspectionChecklistProps) => {
  const [inspectionItems, setInspectionItems] = useState<InspectionItem[]>([]);
  const [showNonCompliantOnly, setShowNonCompliantOnly] = useState(false);

  useEffect(() => {
    // Initialize inspection items based on report type
    const baseItems: Omit<InspectionItem, 'checked' | 'nonCompliant' | 'notes'>[] = [
      // Consumer Unit / Distribution Board
      {
        id: 'cu-condition',
        category: 'Consumer Unit',
        item: 'General condition and suitability',
        requirement: 'BS 7671 Regulation 421.1.201',
        isRequired: true,
      },
      {
        id: 'cu-enclosure',
        category: 'Consumer Unit',
        item: 'Enclosure condition and IP rating',
        requirement: 'BS 7671 Section 416',
        isRequired: true,
      },
      {
        id: 'cu-labelling',
        category: 'Consumer Unit',
        item: 'Circuit labelling and identification',
        requirement: 'BS 7671 Regulation 514.8',
        isRequired: true,
      },
      
      // Protective Devices
      {
        id: 'pd-mcbs',
        category: 'Protective Devices',
        item: 'MCB/RCBO condition and ratings',
        requirement: 'BS 7671 Chapter 43',
        isRequired: true,
      },
      {
        id: 'pd-rcds',
        category: 'Protective Devices',
        item: 'RCD presence and ratings',
        requirement: 'BS 7671 Regulation 411.3.3',
        isRequired: true,
      },
      {
        id: 'pd-coordination',
        category: 'Protective Devices',
        item: 'Protective device coordination',
        requirement: 'BS 7671 Chapter 53',
        isRequired: true,
      },

      // Earthing and Bonding
      {
        id: 'eb-earth-electrode',
        category: 'Earthing & Bonding',
        item: 'Earth electrode connection',
        requirement: 'BS 7671 Regulation 542.3',
        isRequired: true,
      },
      {
        id: 'eb-main-bonding',
        category: 'Earthing & Bonding',
        item: 'Main protective bonding',
        requirement: 'BS 7671 Regulation 411.3.1.2',
        isRequired: true,
      },
      {
        id: 'eb-supplementary',
        category: 'Earthing & Bonding',
        item: 'Supplementary bonding (where required)',
        requirement: 'BS 7671 Regulation 415.2',
        isRequired: false,
      },

      // Wiring Systems
      {
        id: 'ws-cable-condition',
        category: 'Wiring Systems',
        item: 'Cable condition and support',
        requirement: 'BS 7671 Chapter 52',
        isRequired: true,
      },
      {
        id: 'ws-cable-routing',
        category: 'Wiring Systems',
        item: 'Cable routing and protection',
        requirement: 'BS 7671 Section 522',
        isRequired: true,
      },
      {
        id: 'ws-connections',
        category: 'Wiring Systems',
        item: 'Connection integrity',
        requirement: 'BS 7671 Section 526',
        isRequired: true,
      },

      // Accessories and Equipment
      {
        id: 'ae-sockets',
        category: 'Accessories',
        item: 'Socket outlet condition and suitability',
        requirement: 'BS 7671 Section 553',
        isRequired: true,
      },
      {
        id: 'ae-switches',
        category: 'Accessories',
        item: 'Switch and control gear condition',
        requirement: 'BS 7671 Section 537',
        isRequired: true,
      },
      {
        id: 'ae-luminaires',
        category: 'Accessories',
        item: 'Luminaire fixings and condition',
        requirement: 'BS 7671 Section 559',
        isRequired: true,
      },

      // Safety and Protection
      {
        id: 'sp-isolation',
        category: 'Safety',
        item: 'Means of isolation and switching',
        requirement: 'BS 7671 Chapter 46',
        isRequired: true,
      },
      {
        id: 'sp-barriers',
        category: 'Safety',
        item: 'Barriers and enclosures',
        requirement: 'BS 7671 Section 416',
        isRequired: true,
      },
      {
        id: 'sp-warning-labels',
        category: 'Safety',
        item: 'Warning labels and notices',
        requirement: 'BS 7671 Section 514',
        isRequired: true,
      },
    ];

    // Add report-specific items
    if (reportType === 'initial-verification') {
      baseItems.push(
        {
          id: 'iv-design-verification',
          category: 'Design Verification',
          item: 'Design calculations and documentation',
          requirement: 'BS 7671 Chapter 31',
          isRequired: true,
        },
        {
          id: 'iv-installation-method',
          category: 'Installation Method',
          item: 'Installation method compliance',
          requirement: 'BS 7671 Appendix 4',
          isRequired: true,
        }
      );
    }

    setInspectionItems(
      baseItems.map(item => ({
        ...item,
        checked: false,
        nonCompliant: false,
        notes: '',
      }))
    );
  }, [reportType]);

  const updateItem = (id: string, field: keyof InspectionItem, value: any) => {
    setInspectionItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const getProgress = () => {
    const requiredItems = inspectionItems.filter(item => item.isRequired);
    const completedRequired = requiredItems.filter(item => item.checked);
    return {
      completed: completedRequired.length,
      total: requiredItems.length,
      percentage: (completedRequired.length / requiredItems.length) * 100,
    };
  };

  const getNonCompliantCount = () => {
    return inspectionItems.filter(item => item.nonCompliant).length;
  };

  const canComplete = () => {
    const progress = getProgress();
    return progress.completed === progress.total;
  };

  const filteredItems = showNonCompliantOnly
    ? inspectionItems.filter(item => item.nonCompliant)
    : inspectionItems;

  const groupedItems = filteredItems.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, InspectionItem[]>);

  const progress = getProgress();
  const nonCompliantCount = getNonCompliantCount();

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-elec-yellow" />
              Visual Inspection Progress
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">
                {progress.completed}/{progress.total} Required Items
              </Badge>
              {nonCompliantCount > 0 && (
                <Badge variant="destructive">
                  {nonCompliantCount} Non-Compliant
                </Badge>
              )}
            </div>
          </div>
          <div className="w-full bg-elec-dark rounded-full h-2">
            <div
              className="bg-elec-yellow h-2 rounded-full transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={showNonCompliantOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowNonCompliantOnly(!showNonCompliantOnly)}
            >
              {showNonCompliantOnly ? 'Show All Items' : 'Show Non-Compliant Only'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Items by Category */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <Card key={category} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`border rounded-lg transition-all ${
                  item.nonCompliant
                    ? 'border-red-500/50 bg-red-500/5'
                    : item.checked
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-elec-yellow/20 bg-elec-dark/50'
                }`}
              >
                {/* Header Section */}
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-base mb-1">{item.item}</h4>
                      <p className="text-sm text-muted-foreground">{item.requirement}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {item.isRequired && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                      {item.checked && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                      {item.nonCompliant && (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>

                  {/* Checkbox Controls */}
                  <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${item.id}-checked`}
                        checked={item.checked}
                        onCheckedChange={(checked) =>
                          updateItem(item.id, 'checked', checked)
                        }
                        className="h-4 w-4"
                      />
                      <label 
                        htmlFor={`${item.id}-checked`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        Inspected
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${item.id}-non-compliant`}
                        checked={item.nonCompliant}
                        onCheckedChange={(checked) =>
                          updateItem(item.id, 'nonCompliant', checked)
                        }
                        className="h-4 w-4 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                      <label 
                        htmlFor={`${item.id}-non-compliant`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        Non-Compliant
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="px-4 pb-4">
                  <Textarea
                    placeholder="Add inspection notes..."
                    value={item.notes}
                    onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                    className="bg-elec-dark/80 border-elec-yellow/20 text-sm min-h-[80px] resize-none focus:border-elec-yellow/50 transition-colors"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Completion Actions */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          {nonCompliantCount > 0 && (
            <Alert className="mb-4 bg-red-500/10 border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>{nonCompliantCount} non-compliant items detected.</strong> These will be automatically
                flagged in the EICR with appropriate fault codes.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                {canComplete() 
                  ? 'Visual inspection complete - ready to proceed to testing'
                  : `${progress.total - progress.completed} required items remaining`
                }
              </p>
              <p className="text-sm text-muted-foreground">
                All inspection items will be included in the final report
              </p>
            </div>
            <Button
              onClick={onComplete}
              disabled={!canComplete()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
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
