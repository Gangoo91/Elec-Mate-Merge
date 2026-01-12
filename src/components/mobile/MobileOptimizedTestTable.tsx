import React, { useState, useCallback, useMemo, memo, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { circuitTypes } from '@/types/circuitTypes';
import { protectiveDeviceTypeOptions, protectiveDeviceRatingOptions, bsStandardOptions, protectiveDeviceCurveOptions, rcdBsStandardOptions, bsStandardRequiresCurve } from '@/types/protectiveDeviceTypes';
import { cableSizeOptions, referenceMethodOptions } from '@/types/cableTypes';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { wiringTypeOptions, rcdTypeOptions } from '@/types/wiringTypes';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';


// Memoized FormField component defined OUTSIDE to prevent recreation on every render
const FormField = memo(({ 
  label, 
  id, 
  value, 
  onChange, 
  type = 'input',
  options = [],
  placeholder = ''
}: { 
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'input' | 'select';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange for inputs only
  const handleInputChange = useCallback((newValue: string) => {
    setLocalValue(newValue);
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  }, [onChange]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      {type === 'input' ? (
        <Input
          id={id}
          value={localValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 text-base touch-manipulation"
        />
      ) : (
        <div 
          className="relative" 
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="h-12 text-base touch-manipulation">
              <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-popover max-w-[calc(100vw-2rem)] w-auto z-[100]" position="popper">
              {options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value} 
                  className="text-base py-3 whitespace-normal break-words"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

interface MobileOptimizedTestTableProps {
  testResults: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
}

const MobileOptimizedTestTable: React.FC<MobileOptimizedTestTableProps> = ({
  testResults,
  onUpdate,
  onRemove,
  onBulkUpdate
}) => {
  const [expandedCircuits, setExpandedCircuits] = useState<Set<string>>(new Set([testResults[0]?.id]));
  const [expandedSections, setExpandedSections] = useState<Record<string, Set<string>>>({});

  // Auto-fill maxZs when device details change
  const autoFillMaxZs = (resultId: string, bsStandard: string, curve: string, rating: string) => {
    if (!bsStandard || !rating) return;
    
    // For fuses, curve is not needed
    const needsCurve = bsStandardRequiresCurve(bsStandard);
    if (needsCurve && !curve) return;
    
    const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, rating);
    if (maxZs !== null) {
      onUpdate(resultId, 'maxZs', maxZs.toString());
    }
  };

  // Handle BS Standard change
  const handleBsStandardChange = (resultId: string, value: string, result: TestResult) => {
    onUpdate(resultId, 'bsStandard', value);
    autoFillMaxZs(resultId, value, result.protectiveDeviceCurve || '', result.protectiveDeviceRating || '');
  };

  // Handle Curve change
  const handleCurveChange = (resultId: string, value: string, result: TestResult) => {
    onUpdate(resultId, 'protectiveDeviceCurve', value);
    autoFillMaxZs(resultId, result.bsStandard || '', value, result.protectiveDeviceRating || '');
  };

  // Handle Rating change
  const handleRatingChange = (resultId: string, value: string, result: TestResult) => {
    onUpdate(resultId, 'protectiveDeviceRating', value);
    autoFillMaxZs(resultId, result.bsStandard || '', result.protectiveDeviceCurve || '', value);
  };

  const toggleCircuit = (id: string) => {
    const newExpanded = new Set(expandedCircuits);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCircuits(newExpanded);
  };

  const toggleSection = (circuitId: string, section: string) => {
    const circuitSections = expandedSections[circuitId] || new Set(['circuit']);
    const newSections = new Set(circuitSections);
    if (newSections.has(section)) {
      newSections.delete(section);
    } else {
      newSections.add(section);
    }
    setExpandedSections({
      ...expandedSections,
      [circuitId]: newSections
    });
  };

  const isSectionExpanded = useCallback((circuitId: string, section: string) => {
    return expandedSections[circuitId]?.has(section) || section === 'circuit';
  }, [expandedSections]);

  const getBorderColor = useCallback((result: TestResult) => {
    if (result.sourceCircuitId) return 'border-l-blue-500';
    if (result.autoFilled) return 'border-l-elec-yellow';
    return 'border-l-border';
  }, []);

  // Calculate circuit completion percentage
  const getCircuitCompletion = useCallback((result: TestResult) => {
    const keyFields = [
      result.circuitDescription,
      result.typeOfWiring,
      result.liveSize,
      result.cpcSize,
      result.bsStandard,
      result.protectiveDeviceRating,
      result.zs,
      result.polarity,
      result.insulationLiveEarth
    ];
    const filledCount = keyFields.filter(f => f && f.trim() !== '').length;
    return Math.round((filledCount / keyFields.length) * 100);
  }, []);

  // RCD Quick Fill handlers
  const handleFillAllRcdBsStandard = (value: string) => {
    testResults.forEach(result => {
      onUpdate(result.id, 'rcdBsStandard', value);
    });
  };

  const handleFillAllRcdType = (value: string) => {
    testResults.forEach(result => {
      onUpdate(result.id, 'rcdType', value);
    });
  };

  const handleFillAllRcdRating = (value: string) => {
    testResults.forEach(result => {
      onUpdate(result.id, 'rcdRating', value);
    });
  };

  const handleFillAllRcdRatingA = (value: string) => {
    testResults.forEach(result => {
      onUpdate(result.id, 'rcdRatingA', value);
    });
  };

  const SectionHeader = ({ 
    circuitId, 
    section, 
    title, 
    icon 
  }: { 
    circuitId: string; 
    section: string; 
    title: string; 
    icon?: string; 
  }) => (
    <button
      onClick={() => toggleSection(circuitId, section)}
      className="w-full flex items-center justify-between p-4 bg-accent/5 hover:bg-accent/10 transition-colors touch-manipulation rounded-sm"
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="font-semibold text-sm">{title}</span>
      </div>
      {isSectionExpanded(circuitId, section) ? (
        <ChevronUp className="h-5 w-5 text-foreground" />
      ) : (
        <ChevronDown className="h-5 w-5 text-foreground" />
      )}
    </button>
  );

  return (
    <div className="space-y-4">
      {testResults.map((result) => (
        <Card 
          key={result.id} 
          className={`border-l-4 ${getBorderColor(result)} overflow-hidden bg-card shadow-sm`}
          data-circuit-id={result.id}
        >
          {/* Circuit Header - Always Visible */}
          <CardHeader className="p-0 bg-gradient-to-r from-accent/5 to-transparent">
            <button
              onClick={() => toggleCircuit(result.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-accent/10 transition-colors touch-manipulation"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-foreground">
                    {result.circuitDesignation || `Circuit ${result.circuitNumber || 'New'}`}
                  </span>
                  {/* Completion indicator */}
                  {(() => {
                    const completion = getCircuitCompletion(result);
                    return (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        completion === 100
                          ? 'bg-green-500/20 text-green-500'
                          : completion >= 50
                            ? 'bg-amber-500/20 text-amber-500'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {completion}%
                      </span>
                    );
                  })()}
                </div>
                <span className="text-sm text-muted-foreground font-medium line-clamp-2 sm:line-clamp-1 max-w-[140px] sm:max-w-[200px] break-words">
                  {result.circuitDescription || 'No description'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {expandedCircuits.has(result.id) ? (
                  <ChevronUp className="h-6 w-6 text-foreground" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-foreground" />
                )}
              </div>
            </button>
          </CardHeader>

          {/* Expandable Content */}
          {expandedCircuits.has(result.id) && (
            <CardContent className="p-0">
              {/* Circuit Details Section */}
              <div className="border-t border-border/50">
                <SectionHeader circuitId={result.id} section="circuit" title="Circuit Details" icon="⚡" />
                {isSectionExpanded(result.id, 'circuit') && (
                  <div className="p-4 space-y-4 bg-card">
                    <FormField
                      label="Circuit Designation"
                      id={`circuitDesignation-${result.id}`}
                      value={result.circuitDesignation}
                      onChange={(val) => onUpdate(result.id, 'circuitDesignation', val)}
                      placeholder="e.g., C1"
                    />
                    <FormField
                      label="Circuit Description"
                      id={`circuitDescription-${result.id}`}
                      value={result.circuitDescription}
                      onChange={(val) => onUpdate(result.id, 'circuitDescription', val)}
                      placeholder="e.g., Downstairs Lights"
                    />
                    <FormField
                      label="Type of Wiring"
                      id={`typeOfWiring-${result.id}`}
                      value={result.typeOfWiring || ''}
                      onChange={(val) => onUpdate(result.id, 'typeOfWiring', val)}
                      type="select"
                      options={wiringTypeOptions}
                    />
                    <FormField
                      label="Reference Method"
                      id={`referenceMethod-${result.id}`}
                      value={result.referenceMethod || ''}
                      onChange={(val) => onUpdate(result.id, 'referenceMethod', val)}
                      type="select"
                      options={referenceMethodOptions}
                    />
                    <FormField
                      label="Number of Points Served"
                      id={`pointsServed-${result.id}`}
                      value={result.pointsServed || ''}
                      onChange={(val) => onUpdate(result.id, 'pointsServed', val)}
                      placeholder="e.g., 10"
                    />
                  </div>
                )}
              </div>

              {/* Conductor Details Section */}
              <div className="border-t border-border/50">
                <SectionHeader circuitId={result.id} section="conductors" title="Conductor Details" icon="🔌" />
                {isSectionExpanded(result.id, 'conductors') && (
                  <div className="p-4 space-y-4 bg-card">
                    <FormField
                      label="Live (mm²)"
                      id={`liveSize-${result.id}`}
                      value={result.liveSize}
                      onChange={(val) => onUpdate(result.id, 'liveSize', val)}
                      type="select"
                      options={cableSizeOptions}
                    />
                    <FormField
                      label="cpc (mm²)"
                      id={`cpcSize-${result.id}`}
                      value={result.cpcSize}
                      onChange={(val) => onUpdate(result.id, 'cpcSize', val)}
                      type="select"
                      options={cableSizeOptions}
                    />
                  </div>
                )}
              </div>

              {/* Protective Device Section */}
              <div className="border-t border-border/50 bg-amber-50/20">
                <SectionHeader circuitId={result.id} section="protection" title="Overcurrent Protective Device" icon="🛡️" />
                {isSectionExpanded(result.id, 'protection') && (
                  <div className="p-4 space-y-4 bg-card">
                    <FormField
                      label="BS (EN) Standard"
                      id={`bsStandard-${result.id}`}
                      value={result.bsStandard || ''}
                      onChange={(val) => handleBsStandardChange(result.id, val, result)}
                      type="select"
                      options={bsStandardOptions}
                    />
                    <FormField
                      label="Type (Curve)"
                      id={`protectiveDeviceCurve-${result.id}`}
                      value={result.protectiveDeviceCurve || ''}
                      onChange={(val) => handleCurveChange(result.id, val, result)}
                      type="select"
                      options={protectiveDeviceCurveOptions}
                    />
                    <FormField
                      label="Rating (A)"
                      id={`protectiveDeviceRating-${result.id}`}
                      value={result.protectiveDeviceRating}
                      onChange={(val) => handleRatingChange(result.id, val, result)}
                      type="select"
                      options={protectiveDeviceRatingOptions}
                    />
                    <FormField
                      label="Breaking Capacity (kA)"
                      id={`protectiveDeviceKaRating-${result.id}`}
                      value={result.protectiveDeviceKaRating}
                      onChange={(val) => onUpdate(result.id, 'protectiveDeviceKaRating', val)}
                      placeholder="e.g., 6"
                    />
                    <div className="space-y-1">
                      <FormField
                        label="Maximum Permitted Zs (Ω)"
                        id={`maxZs-${result.id}`}
                        value={result.maxZs || ''}
                        onChange={(val) => onUpdate(result.id, 'maxZs', val)}
                        placeholder="e.g., 1.44"
                      />
                      <p className="text-xs text-muted-foreground pl-1">
                        * Auto-filled at 80% (BS 7671 Reg. 411.4.4)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* RCD Details Section */}
              <div className="border-t border-border/50 bg-red-50/20">
                <SectionHeader circuitId={result.id} section="rcd" title="RCD Details" icon="⚡" />
                {isSectionExpanded(result.id, 'rcd') && (
                  <div className="p-4 space-y-4 bg-card">
                    <FormField
                      label="BS (EN) Standard"
                      id={`rcdBsStandard-${result.id}`}
                      value={result.rcdBsStandard || ''}
                      onChange={(val) => onUpdate(result.id, 'rcdBsStandard', val)}
                      type="select"
                      options={rcdBsStandardOptions}
                    />
                    <FormField
                      label="RCD Type"
                      id={`rcdType-${result.id}`}
                      value={result.rcdType || ''}
                      onChange={(val) => onUpdate(result.id, 'rcdType', val)}
                      type="select"
                      options={rcdTypeOptions}
                    />
                    <FormField
                      label="IΔn (mA)"
                      id={`rcdRating-${result.id}`}
                      value={result.rcdRating || ''}
                      onChange={(val) => onUpdate(result.id, 'rcdRating', val)}
                      placeholder="e.g., 30"
                    />
                    <FormField
                      label="Rating (A)"
                      id={`rcdRatingA-${result.id}`}
                      value={result.rcdRatingA || ''}
                      onChange={(val) => onUpdate(result.id, 'rcdRatingA', val)}
                      placeholder="e.g., 40"
                    />
                  </div>
                )}
              </div>

              {/* Test Results Section */}
              <div className="border-t border-border/50">
                <SectionHeader circuitId={result.id} section="tests" title="Continuity (Ω)" icon="📊" />
                {isSectionExpanded(result.id, 'tests') && (
                  <div className="p-4 space-y-4 bg-card">
                    {/* Ring Final Circuit Continuity */}
                    <div className="space-y-3 rounded-md">
                      <h4 className="font-medium text-sm text-muted-foreground">Ring Final Circuit Continuity</h4>
                      <FormField
                        label="r₁ (line) (Ω)"
                        id={`ringR1-${result.id}`}
                        value={result.ringR1 || ''}
                        onChange={(val) => onUpdate(result.id, 'ringR1', val)}
                        placeholder="e.g., 0.3"
                      />
                      <FormField
                        label="rₙ (neutral) (Ω)"
                        id={`ringRn-${result.id}`}
                        value={result.ringRn || ''}
                        onChange={(val) => onUpdate(result.id, 'ringRn', val)}
                        placeholder="e.g., 0.3"
                      />
                      <FormField
                        label="r₂ (cpc) (Ω)"
                        id={`ringR2-${result.id}`}
                        value={result.ringR2 || ''}
                        onChange={(val) => onUpdate(result.id, 'ringR2', val)}
                        placeholder="e.g., 0.4"
                      />
                    </div>

                    {/* Continuity */}
                    <div className="space-y-3 rounded-md mt-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Continuity</h4>
                      <FormField
                        label="(R₁ + R₂) (Ω)"
                        id={`r1r2-${result.id}`}
                        value={result.r1r2 || ''}
                        onChange={(val) => onUpdate(result.id, 'r1r2', val)}
                        placeholder="e.g., 0.5"
                      />
                      <FormField
                        label="R₂ (Ω)"
                        id={`ringContinuityLive-${result.id}`}
                        value={result.ringContinuityLive || ''}
                        onChange={(val) => onUpdate(result.id, 'ringContinuityLive', val)}
                        placeholder="e.g., 0.3"
                      />
                    </div>

                    {/* Insulation Resistance */}
                    <div className="space-y-3 rounded-md mt-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Insulation Resistance</h4>
                      <FormField
                        label="Test Voltage (V)"
                        id={`insulationTestVoltage-${result.id}`}
                        value={result.insulationTestVoltage}
                        onChange={(val) => onUpdate(result.id, 'insulationTestVoltage', val)}
                        type="select"
                        options={insulationTestVoltageOptions}
                      />
                      <FormField
                        label="Live - Live (MΩ)"
                        id={`insulationLiveNeutral-${result.id}`}
                        value={result.insulationLiveNeutral || ''}
                        onChange={(val) => onUpdate(result.id, 'insulationLiveNeutral', val)}
                        placeholder="e.g., >200"
                      />
                      <FormField
                        label="Live - Earth (MΩ)"
                        id={`insulationLiveEarth-${result.id}`}
                        value={result.insulationLiveEarth || ''}
                        onChange={(val) => onUpdate(result.id, 'insulationLiveEarth', val)}
                        placeholder="e.g., >200"
                      />
                    </div>

                    {/* Polarity & Zs */}
                    <div className="space-y-3 rounded-md mt-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Polarity & Zs</h4>
                      <FormField
                        label="Polarity"
                        id={`polarity-${result.id}`}
                        value={result.polarity || ''}
                        onChange={(val) => onUpdate(result.id, 'polarity', val)}
                        type="select"
                        options={[
                          { value: 'Correct', label: 'Correct' },
                          { value: 'Incorrect', label: 'Incorrect' },
                          { value: 'N/A', label: 'N/A' }
                        ]}
                      />
                      <FormField
                        label="Zs Maximum Measured (Ω)"
                        id={`zs-${result.id}`}
                        value={result.zs || ''}
                        onChange={(val) => onUpdate(result.id, 'zs', val)}
                        placeholder="e.g., 0.5"
                      />
                    </div>

                    {/* RCD Tests */}
                    <div className="space-y-3 rounded-md mt-3">
                      <h4 className="font-medium text-sm text-muted-foreground">RCD Tests</h4>
                      <FormField
                        label="Disconnection Time at 1×IΔn (ms)"
                        id={`rcdOneX-${result.id}`}
                        value={result.rcdOneX || ''}
                        onChange={(val) => onUpdate(result.id, 'rcdOneX', val)}
                        placeholder="e.g., 28"
                      />
                      <FormField
                        label="Test Button Operation"
                        id={`rcdTestButton-${result.id}`}
                        value={result.rcdTestButton || ''}
                        onChange={(val) => onUpdate(result.id, 'rcdTestButton', val)}
                        type="select"
                        options={[
                          { value: '✓', label: '✓ Pass' },
                          { value: '✗', label: '✗ Fail' },
                          { value: 'N/A', label: 'N/A' }
                        ]}
                      />
                    </div>

                    {/* AFDD Test */}
                    <div className="space-y-3 rounded-md mt-3">
                      <h4 className="font-medium text-sm text-muted-foreground">AFDD Test</h4>
                      <FormField
                        label="Manual Test Button Operation"
                        id={`afddTest-${result.id}`}
                        value={result.afddTest || ''}
                        onChange={(val) => onUpdate(result.id, 'afddTest', val)}
                        type="select"
                        options={[
                          { value: '✓', label: '✓ Pass' },
                          { value: '✗', label: '✗ Fail' },
                          { value: 'N/A', label: 'N/A' }
                        ]}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Functional Test Section */}
              <div className="border-t border-border/50">
                <SectionHeader circuitId={result.id} section="functional" title="Functional Test" icon="✓" />
                {isSectionExpanded(result.id, 'functional') && (
                  <div className="p-4 space-y-4 bg-card">
                    <FormField
                      label="Functional Testing"
                      id={`functionalTesting-${result.id}`}
                      value={result.functionalTesting || ''}
                      onChange={(val) => onUpdate(result.id, 'functionalTesting', val)}
                      type="select"
                      options={[
                        { value: '✓', label: '✓ Satisfactory' },
                        { value: '✗', label: '✗ Unsatisfactory' },
                        { value: 'N/A', label: 'N/A' }
                      ]}
                    />
                  </div>
                )}
              </div>

              {/* Remarks Section */}
              <div className="border-t border-border/50">
                <SectionHeader circuitId={result.id} section="notes" title="Remarks" icon="📝" />
                {isSectionExpanded(result.id, 'notes') && (
                  <div className="p-4 space-y-4 bg-card">
                    <FormField
                      label="Remarks (including details of vulnerable equipment, T3 SPD info, etc.)"
                      id={`notes-${result.id}`}
                      value={result.notes || ''}
                      onChange={(val) => onUpdate(result.id, 'notes', val)}
                      placeholder="Additional notes..."
                    />
                    <Button
                      variant="destructive"
                      className="w-full h-12 gap-2 touch-manipulation"
                      onClick={() => onRemove(result.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                      Remove Circuit
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default MobileOptimizedTestTable;
