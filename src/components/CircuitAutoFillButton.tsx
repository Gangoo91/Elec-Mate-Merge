import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Lightbulb,
  Plug,
  ChefHat,
  Droplets,
  Car,
  Flame,
  Home,
  Building2,
  Tv,
} from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { getAutoFillSuggestions } from '@/types/autoFillTypes';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import RegulationWarningDialog from './RegulationWarningDialog';
import { presetsByCategory } from '@/constants/circuitPresets';

interface CircuitAutoFillButtonProps {
  result: TestResult;
  onUpdate: (id: string, updates: Partial<TestResult>) => void;
  /**
   * System earthing arrangement (TT, TN-S, TN-C-S) from the cert. When 'TT'
   * the Zs validator uses RCD-based limits (Reg 411.5.3) instead of MCB tables.
   * Without this, TT installs with legitimately high Zs were flagged unsat.
   */
  earthingArrangement?: string;
}

// Enhanced circuit types with more specific options
// Presets come from `@/constants/circuitPresets` — one list, shared with the
// add-circuit sheet, the compact autofill and the description type-ahead. The
// copy that lived here was the sparsest of the three: four fields per circuit,
// no device standard and no curve, so a circuit created from it could not be
// checked against a maximum Zs at all.
//
// Icons, labels and colours stay local; only the electrical data is shared.
const OPTION_STYLE: Record<string, { icon: typeof Lightbulb; label: string; color: string }> = {
  'Downstairs Lights': { icon: Lightbulb, label: 'Downstairs', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
  'Upstairs Lights': { icon: Lightbulb, label: 'Upstairs', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
  'Kitchen Lights': { icon: Lightbulb, label: 'Kitchen', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
  'Outdoor Lights': { icon: Lightbulb, label: 'Outdoor', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
  'Downstairs Ring': { icon: Plug, label: 'Down Ring', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
  'Upstairs Ring': { icon: Plug, label: 'Up Ring', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
  'Kitchen Ring': { icon: Plug, label: 'Kitchen', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
  'Utility Radial': { icon: Zap, label: 'Utility', color: 'bg-green-100 hover:bg-green-200 text-green-800' },
  'Electric Cooker': { icon: ChefHat, label: 'Cooker', color: 'bg-orange-100 hover:bg-orange-200 text-orange-800' },
  'Electric Shower': { icon: Droplets, label: 'Shower', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800' },
  'Instantaneous Water Heater': { icon: Droplets, label: 'Water Heater', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800' },
  'Immersion Heater': { icon: Droplets, label: 'Immersion', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800' },
  'Garage DB': { icon: Building2, label: 'Garage DB', color: 'bg-slate-100 hover:bg-slate-200 text-slate-800' },
  'Outside Shed DB': { icon: Building2, label: 'Shed DB', color: 'bg-slate-100 hover:bg-slate-200 text-slate-800' },
  'EV Charging Point': { icon: Car, label: 'EV Charge', color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800' },
  'Heat Pump': { icon: Home, label: 'Heat Pump', color: 'bg-teal-100 hover:bg-teal-200 text-teal-800' },
  'Solar PV': { icon: Building2, label: 'Solar PV', color: 'bg-sky-100 hover:bg-sky-200 text-sky-800' },
  'Central Heating': { icon: Flame, label: 'Heating', color: 'bg-red-100 hover:bg-red-200 text-red-800' },
  'Fire Alarm': { icon: Flame, label: 'Fire Alarm', color: 'bg-red-100 hover:bg-red-200 text-red-800' },
  'Security System': { icon: Building2, label: 'Security', color: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
  'Door Entry': { icon: Home, label: 'Door Entry', color: 'bg-gray-100 hover:bg-gray-200 text-gray-800' },
  'TV/Data': { icon: Tv, label: 'TV/Data', color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' }
};

const enhancedCircuitTypes = presetsByCategory().map(({ category, options }) => ({
  category,
  options: options.map((preset) => ({
    type: preset.type,
    icon: OPTION_STYLE[preset.type]?.icon ?? Lightbulb,
    label: OPTION_STYLE[preset.type]?.label || preset.type,
    color: OPTION_STYLE[preset.type]?.color ?? 'bg-elec-gray hover:bg-elec-gray-light text-foreground',
    suggestions: preset.suggestions,
  })),
}));

const CircuitAutoFillButton: React.FC<CircuitAutoFillButtonProps> = ({
  result,
  onUpdate,
  earthingArrangement,
}) => {
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<Partial<TestResult> | null>(null);
  const [pendingWarnings, setPendingWarnings] = useState<any[]>([]);

  const handleAutoFill = (circuitType: string, suggestions: Partial<TestResult>) => {
    const updatedResult = {
      ...result,
      ...suggestions,
      circuitDescription: circuitType,
      type: circuitType,
    };

    // Check for regulation compliance — pass earthing so TT systems use the
    // correct RCD-based Zs limits (ELE-830 follow-up).
    const complianceCheck = checkRegulationCompliance(updatedResult, earthingArrangement);

    if (complianceCheck.warnings.length > 0) {
      // Show warning dialog
      setPendingUpdate({
        ...suggestions,
        circuitDescription: circuitType,
        type: circuitType,
      });
      setPendingWarnings(complianceCheck.warnings);
      setShowWarningDialog(true);
    } else {
      // Apply update directly
      onUpdate(result.id, {
        ...suggestions,
        circuitDescription: circuitType,
        type: circuitType,
      });
    }
  };

  const handleWarningApprove = () => {
    if (pendingUpdate) {
      onUpdate(result.id, pendingUpdate);
    }
    setShowWarningDialog(false);
    setPendingUpdate(null);
    setPendingWarnings([]);
  };

  const handleWarningReject = () => {
    setShowWarningDialog(false);
    setPendingUpdate(null);
    setPendingWarnings([]);
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-3 bg-gray-50 rounded border-t">
        <span className="text-xs font-medium text-gray-700 mb-1">Quick Fill Circuit Types:</span>

        {enhancedCircuitTypes.map((category) => (
          <div key={category.category} className="space-y-2">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              {category.category}
            </span>
            <div className="flex flex-wrap gap-1">
              {category.options.map((option) => (
                <Button
                  key={option.type}
                  size="sm"
                  variant="outline"
                  onClick={() => handleAutoFill(option.type, option.suggestions)}
                  className={`h-7 px-2 text-xs ${option.color} border-0`}
                  title={`Auto-fill ${option.type} circuit configuration`}
                >
                  <option.icon className="h-3 w-3 mr-1" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        ))}

        <div className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 rounded border-l-2 border-blue-200">
          💡 <strong>Auto-Reg Checker:</strong> Configurations are automatically checked against BS
          7671 regulations. Any issues will be highlighted for your review.
        </div>
      </div>

      <RegulationWarningDialog
        open={showWarningDialog}
        onOpenChange={setShowWarningDialog}
        warnings={pendingWarnings}
        circuitDescription={pendingUpdate?.circuitDescription}
        onApprove={handleWarningApprove}
        onReject={handleWarningReject}
      />
    </>
  );
};

export default CircuitAutoFillButton;
