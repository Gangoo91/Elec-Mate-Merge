/**
 * InspectionsStep - BS7671 Inspection Checklist for EIC
 *
 * Mobile-optimized inspection items with expandable sections
 * Quick-complete features for efficient workflow
 */

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ClipboardCheck,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  MinusCircle,
  AlertTriangle,
  Zap,
  Shield,
  Cable,
  Plug,
  Box,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface InspectionsStepProps {
  data: any;
  onChange: (updates: any) => void;
  isMobile?: boolean;
}

// Inspection item result type
type InspectionResult = 'C' | 'X' | 'NA' | 'LIM' | '';

// Inspection item interface
interface InspectionItem {
  id: string;
  code: string;
  description: string;
  result?: InspectionResult;
}

// Inspection section interface
interface InspectionSection {
  id: string;
  title: string;
  icon: React.ElementType;
  items: InspectionItem[];
}

// BS7671 EIC Inspection sections (simplified for new installation)
const EIC_INSPECTION_SECTIONS: InspectionSection[] = [
  {
    id: 'consumer-unit',
    title: 'Consumer Unit / Distribution Board',
    icon: Box,
    items: [
      { id: 'cu-1', code: '1.1', description: 'Correct type of DB for type of earthing system' },
      { id: 'cu-2', code: '1.2', description: 'DB meets requirements of BS EN 61439-3' },
      { id: 'cu-3', code: '1.3', description: 'Enclosure suitable for external influences' },
      { id: 'cu-4', code: '1.4', description: 'All entries, knockouts, glands correctly fitted' },
      { id: 'cu-5', code: '1.5', description: 'Correct cable entry, adequate space for connections' },
      { id: 'cu-6', code: '1.6', description: 'Cables correctly supported, strain relief provided' },
      { id: 'cu-7', code: '1.7', description: 'Circuits correctly identified at DB' },
      { id: 'cu-8', code: '1.8', description: 'Warning notices and labels fitted correctly' },
      { id: 'cu-9', code: '1.9', description: 'SPD fitted where required (Reg 443)' },
    ],
  },
  {
    id: 'protective-devices',
    title: 'Protective Devices',
    icon: Shield,
    items: [
      { id: 'pd-1', code: '2.1', description: 'Correct type and rating of protective devices' },
      { id: 'pd-2', code: '2.2', description: 'RCDs installed where required' },
      { id: 'pd-3', code: '2.3', description: 'RCD rated at 30mA for socket-outlets ≤32A' },
      { id: 'pd-4', code: '2.4', description: 'AFDDs installed where required' },
      { id: 'pd-5', code: '2.5', description: 'Devices correctly coordinated (discrimination)' },
      { id: 'pd-6', code: '2.6', description: 'Protective devices accessible for operation' },
    ],
  },
  {
    id: 'conductors',
    title: 'Cables & Conductors',
    icon: Cable,
    items: [
      { id: 'cc-1', code: '3.1', description: 'Correct cable type for environment and application' },
      { id: 'cc-2', code: '3.2', description: 'Cables correctly sized for load and protection' },
      { id: 'cc-3', code: '3.3', description: 'Cable routes correctly selected' },
      { id: 'cc-4', code: '3.4', description: 'Cables correctly installed in prescribed zones' },
      { id: 'cc-5', code: '3.5', description: 'Mechanical protection where required' },
      { id: 'cc-6', code: '3.6', description: 'Thermal insulation requirements met' },
      { id: 'cc-7', code: '3.7', description: 'Connections properly made in accessory boxes' },
      { id: 'cc-8', code: '3.8', description: 'Conductor identification correct throughout' },
    ],
  },
  {
    id: 'earthing',
    title: 'Earthing & Bonding',
    icon: Zap,
    items: [
      { id: 'eb-1', code: '4.1', description: 'Earthing conductor connected to MET' },
      { id: 'eb-2', code: '4.2', description: 'Main equipotential bonding to required services' },
      { id: 'eb-3', code: '4.3', description: 'Supplementary bonding where required' },
      { id: 'eb-4', code: '4.4', description: 'Earthing and bonding conductors correctly sized' },
      { id: 'eb-5', code: '4.5', description: 'All earth connections accessible and labelled' },
      { id: 'eb-6', code: '4.6', description: 'Earthing arrangements appropriate for TN/TT/IT' },
    ],
  },
  {
    id: 'accessories',
    title: 'Accessories & Equipment',
    icon: Plug,
    items: [
      { id: 'ae-1', code: '5.1', description: 'Socket-outlets correctly positioned and protected' },
      { id: 'ae-2', code: '5.2', description: 'Switches accessible and correctly rated' },
      { id: 'ae-3', code: '5.3', description: 'Luminaires suitable for location' },
      { id: 'ae-4', code: '5.4', description: 'Equipment suitable for external influences' },
      { id: 'ae-5', code: '5.5', description: 'Fixed equipment correctly connected' },
      { id: 'ae-6', code: '5.6', description: 'Isolation and switching provisions adequate' },
    ],
  },
];

// Result button component
const ResultButton: React.FC<{
  result: InspectionResult;
  currentValue: InspectionResult;
  onClick: () => void;
  label: string;
  color: string;
}> = ({ result, currentValue, onClick, label, color }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex-1 py-2.5 px-2 rounded-lg text-xs font-bold transition-all touch-manipulation',
      'min-h-[44px] flex items-center justify-center gap-1',
      currentValue === result
        ? `${color} text-white shadow-sm`
        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
    )}
  >
    {label}
  </button>
);

// Single inspection item component
const InspectionItemRow: React.FC<{
  item: InspectionItem;
  onChange: (result: InspectionResult) => void;
}> = ({ item, onChange }) => {
  const haptic = useHaptic();

  const handleResultChange = (result: InspectionResult) => {
    haptic.light();
    onChange(result);
  };

  return (
    <div className="py-3 border-b border-border/50 last:border-0">
      <div className="flex items-start gap-3 mb-2">
        <Badge variant="outline" className="text-xs font-mono shrink-0">
          {item.code}
        </Badge>
        <p className="text-sm flex-1">{item.description}</p>
      </div>
      <div className="flex gap-1.5 ml-0 sm:ml-12">
        <ResultButton
          result="C"
          currentValue={item.result || ''}
          onClick={() => handleResultChange('C')}
          label="✓"
          color="bg-green-500"
        />
        <ResultButton
          result="X"
          currentValue={item.result || ''}
          onClick={() => handleResultChange('X')}
          label="✗"
          color="bg-red-500"
        />
        <ResultButton
          result="NA"
          currentValue={item.result || ''}
          onClick={() => handleResultChange('NA')}
          label="N/A"
          color="bg-gray-500"
        />
        <ResultButton
          result="LIM"
          currentValue={item.result || ''}
          onClick={() => handleResultChange('LIM')}
          label="LIM"
          color="bg-amber-500"
        />
      </div>
    </div>
  );
};

// Inspection section component
const InspectionSectionCard: React.FC<{
  section: InspectionSection;
  items: InspectionItem[];
  onItemChange: (itemId: string, result: InspectionResult) => void;
  defaultOpen?: boolean;
}> = ({ section, items, onItemChange, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const haptic = useHaptic();

  const stats = useMemo(() => {
    const complete = items.filter((i) => i.result).length;
    const passed = items.filter((i) => i.result === 'C').length;
    const failed = items.filter((i) => i.result === 'X').length;
    return { complete, total: items.length, passed, failed };
  }, [items]);

  const handleToggle = () => {
    haptic.light();
    setIsOpen(!isOpen);
  };

  const Icon = section.icon;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn(
        'border-border/50 overflow-hidden transition-all',
        stats.complete === stats.total && 'border-green-500/30'
      )}>
        <CollapsibleTrigger asChild>
          <CardHeader
            className="py-4 cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-all touch-manipulation"
            onClick={handleToggle}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'p-2 rounded-lg',
                stats.complete === stats.total ? 'bg-green-500/10' : 'bg-elec-yellow/10'
              )}>
                <Icon className={cn(
                  'h-5 w-5',
                  stats.complete === stats.total ? 'text-green-500' : 'text-elec-yellow'
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base">{section.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Progress
                    value={(stats.complete / stats.total) * 100}
                    className="h-1.5 flex-1 max-w-[100px]"
                  />
                  <span className="text-xs text-muted-foreground">
                    {stats.complete}/{stats.total}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stats.failed > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {stats.failed} fail
                  </Badge>
                )}
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {items.map((item) => (
              <InspectionItemRow
                key={item.id}
                item={item}
                onChange={(result) => onItemChange(item.id, result)}
              />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export const InspectionsStep: React.FC<InspectionsStepProps> = ({
  data,
  onChange,
  isMobile,
}) => {
  const haptic = useHaptic();

  // Initialize inspection items from data or defaults
  const inspectionItems: Record<string, InspectionItem> = data.inspectionItems || {};

  // Get items for a section with current results
  const getSectionItems = (section: InspectionSection): InspectionItem[] => {
    return section.items.map((item) => ({
      ...item,
      result: inspectionItems[item.id]?.result || '',
    }));
  };

  // Handle item result change
  const handleItemChange = (itemId: string, result: InspectionResult) => {
    const updatedItems = {
      ...inspectionItems,
      [itemId]: { ...(inspectionItems[itemId] || {}), result },
    };
    onChange({ inspectionItems: updatedItems });
  };

  // Calculate overall stats
  const overallStats = useMemo(() => {
    const allItems = EIC_INSPECTION_SECTIONS.flatMap((s) => getSectionItems(s));
    const complete = allItems.filter((i) => i.result).length;
    const passed = allItems.filter((i) => i.result === 'C').length;
    const failed = allItems.filter((i) => i.result === 'X').length;
    const limited = allItems.filter((i) => i.result === 'LIM').length;
    const na = allItems.filter((i) => i.result === 'NA').length;
    return { complete, total: allItems.length, passed, failed, limited, na };
  }, [inspectionItems]);

  // Mark all as compliant
  const handleMarkAllCompliant = () => {
    haptic.medium();
    const updatedItems: Record<string, InspectionItem> = {};
    EIC_INSPECTION_SECTIONS.forEach((section) => {
      section.items.forEach((item) => {
        if (!inspectionItems[item.id]?.result) {
          updatedItems[item.id] = { ...item, result: 'C' };
        } else {
          updatedItems[item.id] = inspectionItems[item.id];
        }
      });
    });
    onChange({ inspectionItems: updatedItems });
  };

  // Clear all results
  const handleClearAll = () => {
    haptic.warning();
    onChange({ inspectionItems: {} });
  };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <Card className="border-border/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
              <span className="font-semibold">Inspection Progress</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {overallStats.complete}/{overallStats.total}
            </Badge>
          </div>
          <Progress
            value={(overallStats.complete / overallStats.total) * 100}
            className="h-2 mb-3"
          />
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-lg bg-green-500/10">
              <p className="text-lg font-bold text-green-500">{overallStats.passed}</p>
              <p className="text-xs text-muted-foreground">Pass</p>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <p className="text-lg font-bold text-red-500">{overallStats.failed}</p>
              <p className="text-xs text-muted-foreground">Fail</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <p className="text-lg font-bold text-amber-500">{overallStats.limited}</p>
              <p className="text-xs text-muted-foreground">LIM</p>
            </div>
            <div className="p-2 rounded-lg bg-gray-500/10">
              <p className="text-lg font-bold text-gray-500">{overallStats.na}</p>
              <p className="text-xs text-muted-foreground">N/A</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllCompliant}
          className="flex-1 h-10"
        >
          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
          Mark Remaining ✓
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
          className="h-10"
        >
          <XCircle className="h-4 w-4 mr-1 text-red-500" />
          Clear
        </Button>
      </div>

      {/* Inspection Sections */}
      <div className="space-y-3">
        {EIC_INSPECTION_SECTIONS.map((section, index) => (
          <InspectionSectionCard
            key={section.id}
            section={section}
            items={getSectionItems(section)}
            onItemChange={handleItemChange}
            defaultOpen={index === 0}
          />
        ))}
      </div>

      {/* BS7671 Reference */}
      <div className="text-center text-xs text-muted-foreground">
        <p>Inspection items based on BS 7671:2018+A2:2022</p>
        <p className="mt-1">C = Compliant | X = Non-compliant | NA = Not Applicable | LIM = Limitation</p>
      </div>
    </div>
  );
};

export default InspectionsStep;
