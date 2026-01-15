import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronDown } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { circuitTypes } from '@/types/circuitTypes';
import { protectiveDeviceTypeOptions, protectiveDeviceRatingOptions, bsStandardOptions, protectiveDeviceCurveOptions, rcdBsStandardOptions, bsStandardRequiresCurve } from '@/types/protectiveDeviceTypes';
import { cableSizeOptions, referenceMethodOptions } from '@/types/cableTypes';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { wiringTypeOptions, rcdTypeOptions } from '@/types/wiringTypes';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import CircuitAutoFillButton from './CircuitAutoFillButton';
import { cn } from '@/lib/utils';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';

interface TestResultMobileCardProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  allResults: TestResult[];
}

const TestResultMobileCard: React.FC<TestResultMobileCardProps> = ({ 
  result, 
  onUpdate, 
  onRemove, 
  allResults 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Determine if curve selector should be shown (only for MCB/RCBO based on BS Standard)
  const showCurveSelector = bsStandardRequiresCurve(result.bsStandard || '');

  const getBorderColor = () => {
    if (result.sourceCircuitId) return 'border-blue-400';
    return 'border-white/10';
  };

  const handleBulkUpdate = (id: string, updates: Partial<TestResult>) => {
    Object.entries(updates).forEach(([field, value]) => {
      if (value !== undefined && value !== null) {
        onUpdate(id, field as keyof TestResult, String(value));
      }
    });
  };

  // Auto-fill maxZs when device details change
  const autoFillMaxZs = (bsStandard: string, curve: string, rating: string) => {
    if (!bsStandard || !rating) return;
    
    // For fuses, curve is not needed
    const needsCurve = bsStandardRequiresCurve(bsStandard);
    if (needsCurve && !curve) return;
    
    const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, rating);
    if (maxZs !== null) {
      onUpdate(result.id, 'maxZs', maxZs.toString());
    }
  };

  // Handle BS Standard change
  const handleBsStandardChange = (value: string) => {
    onUpdate(result.id, 'bsStandard', value);
    autoFillMaxZs(value, result.protectiveDeviceCurve || '', result.protectiveDeviceRating || '');
  };

  // Handle Curve change
  const handleCurveChange = (value: string) => {
    onUpdate(result.id, 'protectiveDeviceCurve', value);
    autoFillMaxZs(result.bsStandard || '', value, result.protectiveDeviceRating || '');
  };

  // Handle Rating change
  const handleRatingChange = (value: string) => {
    onUpdate(result.id, 'protectiveDeviceRating', value);
    autoFillMaxZs(result.bsStandard || '', result.protectiveDeviceCurve || '', value);
  };

  return (
    <Card className={`border-2 ${getBorderColor()}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>
            {result.circuitDesignation || 'New Circuit'}
          </CardTitle>
          <Button variant="destructive" size="icon" onClick={() => onRemove(result.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            Show Details
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-0">
          <CardContent className="pt-0 pb-4">
            {/* Enhanced Circuit Auto-Fill */}
            <CircuitAutoFillButton 
              result={result}
              onUpdate={handleBulkUpdate}
            />

            {/* Accordion Sections Matching Table Column Order */}
            <Accordion type="multiple" defaultValue={["circuit", "conductors", "protective", "rcd", "tests"]} className="w-full">
              
              {/* GROUP 1: Circuit Details (Columns 1-5) */}
              <AccordionItem value="circuit" className="border-b">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded" />
                    <span className="font-semibold">Circuit Details</span>
                    <span className="text-xs text-muted-foreground">(6 fields)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3 pb-4">
                  {/* Field 1: Circuit Designation */}
                  <div className="space-y-2">
                    <Label htmlFor={`circuitDesignation-${result.id}`}>1. Circuit Designation</Label>
                    <Input
                      id={`circuitDesignation-${result.id}`}
                      value={result.circuitDesignation || ''}
                      onChange={(e) => onUpdate(result.id, 'circuitDesignation', e.target.value)}
                      placeholder="e.g., C1"
                    />
                  </div>

                  {/* Field 2: Circuit Description */}
                  <div className="space-y-2">
                    <Label htmlFor={`circuitDescription-${result.id}`}>2. Circuit Description</Label>
                    <Input
                      id={`circuitDescription-${result.id}`}
                      value={result.circuitDescription || ''}
                      onChange={(e) => onUpdate(result.id, 'circuitDescription', e.target.value)}
                      placeholder="e.g., Ground Floor Lighting"
                    />
                  </div>

                  {/* Field 3: Type of Wiring - NEW */}
                  <div className="space-y-2">
                    <Label htmlFor={`typeOfWiring-${result.id}`}>3. Type of Wiring</Label>
                    <MobileSelectPicker
                      value={result.typeOfWiring || ''}
                      onValueChange={(value) => onUpdate(result.id, 'typeOfWiring', value)}
                      options={wiringTypeOptions}
                      placeholder="Select wiring type"
                      title="Type of Wiring"
                    />
                  </div>

                  {/* Field 4: Reference Method */}
                  <div className="space-y-2">
                    <Label htmlFor={`referenceMethod-${result.id}`}>4. Reference Method</Label>
                    <MobileSelectPicker
                      value={result.referenceMethod || ''}
                      onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
                      options={referenceMethodOptions}
                      placeholder="Select method"
                      title="Reference Method"
                    />
                  </div>

                  {/* Field 5: Points Served */}
                  <div className="space-y-2">
                    <Label htmlFor={`pointsServed-${result.id}`}>5. Points Served</Label>
                    <Input
                      id={`pointsServed-${result.id}`}
                      value={result.pointsServed || ''}
                      onChange={(e) => onUpdate(result.id, 'pointsServed', e.target.value)}
                      placeholder="e.g., 10"
                      type="number"
                      min="0"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* GROUP 2: Conductors (Columns 6-7) */}
              <AccordionItem value="conductors" className="border-b">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-green-500 rounded" />
                    <span className="font-semibold">Conductors</span>
                    <span className="text-xs text-muted-foreground">(2 fields)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3 pb-4">
                  {/* Field 6: Live Conductor Size */}
                  <div className="space-y-2">
                    <Label htmlFor={`liveSize-${result.id}`}>6. Live Conductor Size</Label>
                    <MobileSelectPicker
                      value={result.liveSize || ''}
                      onValueChange={(value) => onUpdate(result.id, 'liveSize', value)}
                      options={cableSizeOptions}
                      placeholder="Select size"
                      title="Live Conductor Size"
                    />
                  </div>

                  {/* Field 7: CPC Conductor Size */}
                  <div className="space-y-2">
                    <Label htmlFor={`cpcSize-${result.id}`}>7. CPC Conductor Size</Label>
                    <MobileSelectPicker
                      value={result.cpcSize || ''}
                      onValueChange={(value) => onUpdate(result.id, 'cpcSize', value)}
                      options={cableSizeOptions}
                      placeholder="Select size"
                      title="CPC Conductor Size"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* GROUP 3: Protective Device (Columns 8-13) */}
              <AccordionItem value="protective" className="border-b">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-orange-500 rounded" />
                    <span className="font-semibold">Protective Device</span>
                    <span className="text-xs text-muted-foreground">(6 fields)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3 pb-4">
                  {/* Field 8: BS (EN) Standard - NEW */}
                  <div className="space-y-2">
                    <Label htmlFor={`bsStandard-${result.id}`}>8. BS (EN) Standard</Label>
                    <MobileSelectPicker
                      value={result.bsStandard || ''}
                      onValueChange={handleBsStandardChange}
                      options={bsStandardOptions}
                      placeholder="Select standard"
                      title="BS (EN) Standard"
                    />
                  </div>

                  {/* Field 9: Protective Device Curve Type */}
                  <div className="space-y-2">
                    <Label htmlFor={`protectiveDeviceCurve-${result.id}`}>
                      9. Type {!showCurveSelector && <span className="text-xs text-muted-foreground">(MCB/RCBO only)</span>}
                    </Label>
                    <MobileSelectPicker
                      value={result.protectiveDeviceCurve || ''}
                      onValueChange={handleCurveChange}
                      options={protectiveDeviceCurveOptions}
                      placeholder="Select curve type"
                      title="Protective Device Curve"
                      disabled={!showCurveSelector}
                    />
                  </div>

                  {/* Field 11: Protective Device Rating */}
                  <div className="space-y-2">
                    <Label htmlFor={`protectiveDeviceRating-${result.id}`}>11. Device Rating (A)</Label>
                    <MobileSelectPicker
                      value={result.protectiveDeviceRating || ''}
                      onValueChange={handleRatingChange}
                      options={protectiveDeviceRatingOptions}
                      placeholder="Select rating"
                      title="Device Rating (A)"
                    />
                  </div>

                  {/* Field 12: Breaking Capacity (kA) */}
                  <div className="space-y-2">
                    <Label htmlFor={`protectiveDeviceKaRating-${result.id}`}>12. Breaking Capacity (kA)</Label>
                    <Input
                      id={`protectiveDeviceKaRating-${result.id}`}
                      value={result.protectiveDeviceKaRating || ''}
                      onChange={(e) => onUpdate(result.id, 'protectiveDeviceKaRating', e.target.value)}
                      placeholder="e.g., 6"
                      type="number"
                      step="0.5"
                    />
                  </div>

                  {/* Field 13: Max Zs */}
                  <div className="space-y-2">
                    <Label htmlFor={`maxZs-${result.id}`}>13. Max Zs (Ω)</Label>
                    <Input
                      id={`maxZs-${result.id}`}
                      value={result.maxZs || ''}
                      onChange={(e) => onUpdate(result.id, 'maxZs', e.target.value)}
                      placeholder="e.g., 1.44"
                      type="number"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground">
                      * Auto-filled at 80% (BS 7671 Reg. 411.4.4)
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* GROUP 4: RCD Details (Columns 14-17) */}
              <AccordionItem value="rcd" className="border-b">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-red-500 rounded" />
                    <span className="font-semibold">RCD Details</span>
                    <span className="text-xs text-muted-foreground">(4 fields)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3 pb-4">
                  {/* Field 14: RCD BS (EN) Standard - NEW */}
                  <div className="space-y-2">
                    <Label htmlFor={`rcdBsStandard-${result.id}`}>14. RCD BS (EN) Standard</Label>
                    <MobileSelectPicker
                      value={result.rcdBsStandard || ''}
                      onValueChange={(value) => onUpdate(result.id, 'rcdBsStandard', value)}
                      options={rcdBsStandardOptions}
                      placeholder="Select standard"
                      title="RCD BS (EN) Standard"
                    />
                  </div>

                  {/* Field 15: RCD Type - NEW */}
                  <div className="space-y-2">
                    <Label htmlFor={`rcdType-${result.id}`}>15. RCD Type</Label>
                    <MobileSelectPicker
                      value={result.rcdType || ''}
                      onValueChange={(value) => onUpdate(result.id, 'rcdType', value)}
                      options={rcdTypeOptions}
                      placeholder="Select type"
                      title="RCD Type"
                    />
                  </div>

                  {/* Field 16: RCD IΔn (mA) */}
                  <div className="space-y-2">
                    <Label htmlFor={`rcdRating-${result.id}`}>16. RCD IΔn (mA)</Label>
                    <MobileSelectPicker
                      value={result.rcdRating || ''}
                      onValueChange={(value) => onUpdate(result.id, 'rcdRating', value)}
                      options={[
                        { value: '10mA', label: '10mA' },
                        { value: '30mA', label: '30mA' },
                        { value: '100mA', label: '100mA' },
                        { value: '300mA', label: '300mA' },
                        { value: '500mA', label: '500mA' },
                      ]}
                      placeholder="Select rating"
                      title="RCD Rating (mA)"
                    />
                  </div>

                  {/* Field 17: RCD Rating (A) - NEW */}
                  <div className="space-y-2">
                    <Label htmlFor={`rcdRatingA-${result.id}`}>17. RCD Current Rating (A)</Label>
                    <Input
                      id={`rcdRatingA-${result.id}`}
                      value={result.rcdRatingA || ''}
                      onChange={(e) => onUpdate(result.id, 'rcdRatingA', e.target.value)}
                      placeholder="e.g., 40"
                      type="number"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* GROUP 5-9: Test Results (Columns 18-33) */}
              <AccordionItem value="tests" className="border-b">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-purple-500 rounded" />
                    <span className="font-semibold">Test Results</span>
                    <span className="text-xs text-muted-foreground">(16 fields)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-3 pb-4">
                  {/* Continuity Tests (Fields 18-22) */}
                  <div className="space-y-3 p-3 bg-purple-50/30 rounded-lg border">
                    <h4 className="text-sm font-semibold text-purple-900">Continuity Tests</h4>
                    
                    {/* Ring Final Circuit Tests (Fields 18-20) */}
                    <div className="space-y-2">
                      <Label className="text-sm">18-20. Ring Final Circuit Tests (Ω)</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label htmlFor={`ringR1-${result.id}`} className="text-xs">r₁ (line)</Label>
                          <Input
                            id={`ringR1-${result.id}`}
                            value={result.ringR1 || ''}
                            onChange={(e) => onUpdate(result.id, 'ringR1', e.target.value)}
                            placeholder="r₁"
                            type="number"
                            step="0.001"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ringRn-${result.id}`} className="text-xs">rₙ (neutral)</Label>
                          <Input
                            id={`ringRn-${result.id}`}
                            value={result.ringRn || ''}
                            onChange={(e) => onUpdate(result.id, 'ringRn', e.target.value)}
                            placeholder="rₙ"
                            type="number"
                            step="0.001"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ringR2-${result.id}`} className="text-xs">r₂ (cpc)</Label>
                          <Input
                            id={`ringR2-${result.id}`}
                            value={result.ringR2 || ''}
                            onChange={(e) => onUpdate(result.id, 'ringR2', e.target.value)}
                            placeholder="r₂"
                            type="number"
                            step="0.001"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Field 21: R1 + R2 */}
                    <div className="space-y-2">
                      <Label htmlFor={`r1r2-${result.id}`}>21. R₁ + R₂ (Ω)</Label>
                      <Input
                        id={`r1r2-${result.id}`}
                        value={result.r1r2 || ''}
                        onChange={(e) => onUpdate(result.id, 'r1r2', e.target.value)}
                        placeholder="e.g., 0.5"
                        type="number"
                        step="0.001"
                      />
                    </div>
                  </div>

                  {/* Insulation Resistance Tests (Fields 23-25) */}
                  <div className="space-y-3 p-3 bg-purple-50/30 rounded-lg border">
                    <h4 className="text-sm font-semibold text-purple-900">Insulation Resistance Tests</h4>
                    
                    {/* Field 23: Test Voltage */}
                    <div className="space-y-2">
                      <Label htmlFor={`insulationTestVoltage-${result.id}`}>23. Test Voltage</Label>
                      <MobileSelectPicker
                        value={result.insulationTestVoltage || ''}
                        onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
                        options={insulationTestVoltageOptions}
                        placeholder="Select voltage"
                        title="Test Voltage"
                      />
                    </div>

                    {/* Fields 24-25: Detailed Insulation Results - NEW */}
                    <div className="space-y-2">
                      <Label className="text-sm">24-25. Insulation Resistance (MΩ)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`insulationLiveNeutral-${result.id}`} className="text-xs">Live - Live</Label>
                          <Input
                            id={`insulationLiveNeutral-${result.id}`}
                            value={result.insulationLiveNeutral || ''}
                            onChange={(e) => onUpdate(result.id, 'insulationLiveNeutral', e.target.value)}
                            placeholder=">1.0"
                            type="number"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`insulationLiveEarth-${result.id}`} className="text-xs">Live - Earth</Label>
                          <Input
                            id={`insulationLiveEarth-${result.id}`}
                            value={result.insulationLiveEarth || ''}
                            onChange={(e) => onUpdate(result.id, 'insulationLiveEarth', e.target.value)}
                            placeholder=">1.0"
                            type="number"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Polarity & Zs Tests (Fields 26-27) */}
                  <div className="space-y-3 p-3 bg-yellow-50/30 rounded-lg border">
                    <h4 className="text-sm font-semibold text-yellow-900">Polarity & Earth Fault Loop Impedance</h4>
                    
                    {/* Field 26: Polarity */}
                    <div className="space-y-2">
                      <Label htmlFor={`polarity-${result.id}`}>26. Polarity</Label>
                      <Input
                        id={`polarity-${result.id}`}
                        value={result.polarity || ''}
                        onChange={(e) => onUpdate(result.id, 'polarity', e.target.value)}
                        placeholder="e.g., Pass"
                      />
                    </div>

                    {/* Field 27: Maximum Measured Zs */}
                    <div className="space-y-2">
                      <Label htmlFor={`zs-${result.id}`}>27. Maximum Measured Zs (Ω)</Label>
                      <Input
                        id={`zs-${result.id}`}
                        value={result.zs || ''}
                        onChange={(e) => onUpdate(result.id, 'zs', e.target.value)}
                        placeholder="e.g., 0.5"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* RCD Tests (Fields 28-29) */}
                  <div className="space-y-3 p-3 bg-indigo-50/30 rounded-lg border">
                    <h4 className="text-sm font-semibold text-indigo-900">RCD Tests</h4>
                    
                    {/* Field 28: RCD Disconnection Time */}
                    <div className="space-y-2">
                      <Label htmlFor={`rcdOneX-${result.id}`}>28. RCD Disconnection Time 1×IΔn (ms)</Label>
                      <Input
                        id={`rcdOneX-${result.id}`}
                        value={result.rcdOneX || ''}
                        onChange={(e) => onUpdate(result.id, 'rcdOneX', e.target.value)}
                        placeholder="e.g., 28"
                        type="number"
                      />
                    </div>

                    {/* Field 29: RCD Test Button */}
                    <div className="space-y-2">
                      <Label htmlFor={`rcdTestButton-${result.id}`}>29. RCD Test Button</Label>
                      <MobileSelectPicker
                        value={result.rcdTestButton || ''}
                        onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
                        options={[
                          { value: 'Pass', label: 'Pass' },
                          { value: 'Fail', label: 'Fail' },
                          { value: 'N/A', label: 'N/A' },
                        ]}
                        placeholder="Select result"
                        title="RCD Test Button"
                      />
                    </div>
                  </div>

                  {/* Other Tests (Fields 30-32) */}
                  <div className="space-y-3 p-3 bg-cyan-50/30 rounded-lg border">
                    <h4 className="text-sm font-semibold text-cyan-900">Other Tests</h4>
                    
                    {/* Field 30: AFDD Test */}
                    <div className="space-y-2">
                      <Label htmlFor={`afddTest-${result.id}`}>30. AFDD Test</Label>
                      <MobileSelectPicker
                        value={result.afddTest || ''}
                        onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
                        options={[
                          { value: '✓', label: '✓ Pass' },
                          { value: '✗', label: '✗ Fail' },
                          { value: 'N/A', label: 'N/A' },
                        ]}
                        placeholder="Select result"
                        title="AFDD Test"
                      />
                    </div>

                    {/* Field 31: PFC */}
                    <div className="space-y-2">
                      <Label htmlFor={`pfc-${result.id}`}>31. Prospective Fault Current (kA)</Label>
                      <Input
                        id={`pfc-${result.id}`}
                        value={result.pfc || ''}
                        onChange={(e) => onUpdate(result.id, 'pfc', e.target.value)}
                        placeholder="e.g., 1.2"
                        type="number"
                        step="0.1"
                      />
                    </div>

                    {/* Field 32: Functional Testing */}
                    <div className="space-y-2">
                      <Label htmlFor={`functionalTesting-${result.id}`}>32. Functional Testing</Label>
                      <MobileSelectPicker
                        value={result.functionalTesting || ''}
                        onValueChange={(value) => onUpdate(result.id, 'functionalTesting', value)}
                        options={[
                          { value: '✓', label: '✓ Satisfactory' },
                          { value: '✗', label: '✗ Unsatisfactory' },
                          { value: 'N/A', label: 'N/A' },
                        ]}
                        placeholder="Select result"
                        title="Functional Testing"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Field 33: Remarks/Notes */}
              <AccordionItem value="remarks" className="border-b">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-white/15 rounded" />
                    <span className="font-semibold">Remarks</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-3 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`notes-${result.id}`}>33. Additional Notes</Label>
                    <Input
                      id={`notes-${result.id}`}
                      value={result.notes || ''}
                      onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
                      placeholder="e.g., No issues found"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TestResultMobileCard;
