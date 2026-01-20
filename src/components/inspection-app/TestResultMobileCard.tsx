/**
 * TestResultMobileCard - Mobile-optimised test result card
 *
 * Redesigned for native mobile app feel with:
 * - Clear visual hierarchy
 * - Test completion status at a glance
 * - Grouped sections with expandable details
 * - Proper touch targets
 */

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Trash2, ChevronRight, CheckCircle2, AlertCircle, Zap,
  Cable, Shield, Activity, Settings2
} from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { circuitTypes } from '@/types/circuitTypes';
import {
  protectiveDeviceTypeOptions,
  protectiveDeviceRatingOptions,
  bsStandardOptions,
  protectiveDeviceCurveOptions,
  rcdBsStandardOptions,
  bsStandardRequiresCurve
} from '@/types/protectiveDeviceTypes';
import { cableSizeOptions, referenceMethodOptions } from '@/types/cableTypes';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { wiringTypeOptions, rcdTypeOptions } from '@/types/wiringTypes';
import CircuitAutoFillButton from './CircuitAutoFillButton';
import { cn } from '@/lib/utils';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';

interface TestResultMobileCardProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  allResults: TestResult[];
}

// Section data for expandable groups
const SECTIONS = [
  { id: 'circuit', label: 'Circuit Details', icon: Zap, color: 'bg-blue-500' },
  { id: 'conductors', label: 'Conductors', icon: Cable, color: 'bg-green-500' },
  { id: 'device', label: 'Protective Device', icon: Shield, color: 'bg-orange-500' },
  { id: 'rcd', label: 'RCD Details', icon: Settings2, color: 'bg-red-500' },
  { id: 'tests', label: 'Test Results', icon: Activity, color: 'bg-purple-500' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

const TestResultMobileCard: React.FC<TestResultMobileCardProps> = ({
  result,
  onUpdate,
  onRemove,
  allResults
}) => {
  const [expandedSection, setExpandedSection] = useState<SectionId | null>(null);

  // Determine if curve selector should be shown
  const showCurveSelector = bsStandardRequiresCurve(result.bsStandard || '');

  // Calculate completion status
  const completionStatus = useMemo(() => {
    const checks = {
      circuit: !!(result.circuitDesignation && result.circuitDescription),
      conductors: !!(result.liveSize && result.cpcSize),
      device: !!(result.bsStandard && result.protectiveDeviceRating),
      rcd: true, // Optional for many circuits
      tests: !!(result.r1r2 || result.insulationLiveEarth) && !!(result.polarity || result.zs),
    };

    const completed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;

    return {
      checks,
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
      isComplete: completed === total,
    };
  }, [result]);

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

    const needsCurve = bsStandardRequiresCurve(bsStandard);
    if (needsCurve && !curve) return;

    const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, rating);
    if (maxZs !== null) {
      onUpdate(result.id, 'maxZs', maxZs.toString());
    }
  };

  const handleBsStandardChange = (value: string) => {
    onUpdate(result.id, 'bsStandard', value);
    autoFillMaxZs(value, result.protectiveDeviceCurve || '', result.protectiveDeviceRating || '');
  };

  const handleCurveChange = (value: string) => {
    onUpdate(result.id, 'protectiveDeviceCurve', value);
    autoFillMaxZs(result.bsStandard || '', value, result.protectiveDeviceRating || '');
  };

  const handleRatingChange = (value: string) => {
    onUpdate(result.id, 'protectiveDeviceRating', value);
    autoFillMaxZs(result.bsStandard || '', result.protectiveDeviceCurve || '', value);
  };

  const toggleSection = (sectionId: SectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      result.sourceCircuitId && "border-blue-400/50",
      completionStatus.isComplete && "border-green-500/30 bg-green-500/5"
    )}>
      {/* Card Header - Always visible */}
      <div className="p-3 border-b border-border/30">
        <div className="flex items-start justify-between gap-3">
          {/* Circuit info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm",
              completionStatus.isComplete
                ? "bg-green-500/20 text-green-400"
                : "bg-elec-yellow/20 text-elec-yellow"
            )}>
              {result.circuitDesignation || '#'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground truncate">
                  {result.circuitDescription || 'New Circuit'}
                </h3>
                {result.phaseType === '3P' && (
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-purple-500/50 text-purple-400 flex-shrink-0">
                    3PH
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                {result.protectiveDeviceType && <span>{result.protectiveDeviceType}</span>}
                {result.protectiveDeviceRating && <span>{result.protectiveDeviceRating}A</span>}
                {result.liveSize && <span>{result.liveSize}mm²</span>}
              </div>
            </div>
          </div>

          {/* Status and delete */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                completionStatus.isComplete
                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                  : completionStatus.percentage >= 50
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-muted text-muted-foreground border-border"
              )}
            >
              {completionStatus.percentage}%
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(result.id)}
              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Auto-Fill */}
        <div className="mt-3">
          <CircuitAutoFillButton
            result={result}
            onUpdate={handleBulkUpdate}
          />
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="divide-y divide-border/30">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          const isComplete = completionStatus.checks[section.id];

          return (
            <div key={section.id}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-3 py-2.5 flex items-center gap-3 touch-manipulation hover:bg-muted/30 transition-colors"
              >
                <div className={cn("w-1 h-6 rounded-full", section.color)} />
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-left text-sm font-medium">{section.label}</span>
                {isComplete && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                <ChevronRight className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  isExpanded && "rotate-90"
                )} />
              </button>

              {/* Section content */}
              {isExpanded && (
                <div className="px-3 pb-4 pt-2 space-y-3 bg-muted/10">
                  {section.id === 'circuit' && (
                    <CircuitDetailsSection result={result} onUpdate={onUpdate} />
                  )}
                  {section.id === 'conductors' && (
                    <ConductorsSection result={result} onUpdate={onUpdate} />
                  )}
                  {section.id === 'device' && (
                    <ProtectiveDeviceSection
                      result={result}
                      onUpdate={onUpdate}
                      showCurveSelector={showCurveSelector}
                      onBsStandardChange={handleBsStandardChange}
                      onCurveChange={handleCurveChange}
                      onRatingChange={handleRatingChange}
                    />
                  )}
                  {section.id === 'rcd' && (
                    <RcdSection result={result} onUpdate={onUpdate} />
                  )}
                  {section.id === 'tests' && (
                    <TestResultsSection result={result} onUpdate={onUpdate} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// Circuit Details Section
const CircuitDetailsSection: React.FC<{
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ result, onUpdate }) => (
  <>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Designation</Label>
        <Input
          value={result.circuitDesignation || ''}
          onChange={(e) => onUpdate(result.id, 'circuitDesignation', e.target.value)}
          placeholder="e.g., C1"
          className="h-10 text-sm touch-manipulation"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Points Served</Label>
        <Input
          value={result.pointsServed || ''}
          onChange={(e) => onUpdate(result.id, 'pointsServed', e.target.value)}
          placeholder="e.g., 10"
          type="number"
          className="h-10 text-sm touch-manipulation"
        />
      </div>
    </div>
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">Description</Label>
      <Input
        value={result.circuitDescription || ''}
        onChange={(e) => onUpdate(result.id, 'circuitDescription', e.target.value)}
        placeholder="e.g., Ground Floor Lighting"
        className="h-10 text-sm touch-manipulation"
      />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Wiring Type</Label>
        <MobileSelectPicker
          value={result.typeOfWiring || ''}
          onValueChange={(value) => onUpdate(result.id, 'typeOfWiring', value)}
          options={wiringTypeOptions}
          placeholder="Select"
          title="Type of Wiring"
          triggerClassName="h-10 text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Ref. Method</Label>
        <MobileSelectPicker
          value={result.referenceMethod || ''}
          onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
          options={referenceMethodOptions}
          placeholder="Select"
          title="Reference Method"
          triggerClassName="h-10 text-sm"
        />
      </div>
    </div>
  </>
);

// Conductors Section
const ConductorsSection: React.FC<{
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ result, onUpdate }) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">Live Size (mm²)</Label>
      <MobileSelectPicker
        value={result.liveSize || ''}
        onValueChange={(value) => onUpdate(result.id, 'liveSize', value)}
        options={cableSizeOptions}
        placeholder="Select"
        title="Live Conductor Size"
        triggerClassName="h-10 text-sm"
      />
    </div>
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">CPC Size (mm²)</Label>
      <MobileSelectPicker
        value={result.cpcSize || ''}
        onValueChange={(value) => onUpdate(result.id, 'cpcSize', value)}
        options={cableSizeOptions}
        placeholder="Select"
        title="CPC Size"
        triggerClassName="h-10 text-sm"
      />
    </div>
  </div>
);

// Protective Device Section
const ProtectiveDeviceSection: React.FC<{
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  showCurveSelector: boolean;
  onBsStandardChange: (value: string) => void;
  onCurveChange: (value: string) => void;
  onRatingChange: (value: string) => void;
}> = ({ result, onUpdate, showCurveSelector, onBsStandardChange, onCurveChange, onRatingChange }) => (
  <>
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">BS (EN) Standard</Label>
      <MobileSelectPicker
        value={result.bsStandard || ''}
        onValueChange={onBsStandardChange}
        options={bsStandardOptions}
        placeholder="Select standard"
        title="BS (EN) Standard"
        triggerClassName="h-10 text-sm"
      />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">
          Curve {!showCurveSelector && <span className="text-[10px]">(N/A)</span>}
        </Label>
        <MobileSelectPicker
          value={result.protectiveDeviceCurve || ''}
          onValueChange={onCurveChange}
          options={protectiveDeviceCurveOptions}
          placeholder="Select"
          title="Device Curve"
          triggerClassName="h-10 text-sm"
          disabled={!showCurveSelector}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Rating (A)</Label>
        <MobileSelectPicker
          value={result.protectiveDeviceRating || ''}
          onValueChange={onRatingChange}
          options={protectiveDeviceRatingOptions}
          placeholder="Select"
          title="Device Rating"
          triggerClassName="h-10 text-sm"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">kA Rating</Label>
        <Input
          value={result.protectiveDeviceKaRating || ''}
          onChange={(e) => onUpdate(result.id, 'protectiveDeviceKaRating', e.target.value)}
          placeholder="e.g., 6"
          type="number"
          step="0.5"
          className="h-10 text-sm touch-manipulation"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Max Zs (Ω)</Label>
        <Input
          value={result.maxZs || ''}
          onChange={(e) => onUpdate(result.id, 'maxZs', e.target.value)}
          placeholder="Auto"
          type="number"
          step="0.01"
          className="h-10 text-sm touch-manipulation"
        />
      </div>
    </div>
  </>
);

// RCD Section
const RcdSection: React.FC<{
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ result, onUpdate }) => (
  <>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">RCD Standard</Label>
        <MobileSelectPicker
          value={result.rcdBsStandard || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdBsStandard', value)}
          options={rcdBsStandardOptions}
          placeholder="Select"
          title="RCD BS Standard"
          triggerClassName="h-10 text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">RCD Type</Label>
        <MobileSelectPicker
          value={result.rcdType || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdType', value)}
          options={rcdTypeOptions}
          placeholder="Select"
          title="RCD Type"
          triggerClassName="h-10 text-sm"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">IΔn (mA)</Label>
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
          placeholder="Select"
          title="RCD Rating (mA)"
          triggerClassName="h-10 text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Current (A)</Label>
        <Input
          value={result.rcdRatingA || ''}
          onChange={(e) => onUpdate(result.id, 'rcdRatingA', e.target.value)}
          placeholder="e.g., 40"
          type="number"
          className="h-10 text-sm touch-manipulation"
        />
      </div>
    </div>
  </>
);

// Test Results Section
const TestResultsSection: React.FC<{
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}> = ({ result, onUpdate }) => (
  <div className="space-y-4">
    {/* Continuity */}
    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
      <h4 className="text-xs font-medium text-blue-400 uppercase mb-2">Continuity</h4>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">r₁ (Ω)</Label>
          <Input
            value={result.ringR1 || ''}
            onChange={(e) => onUpdate(result.id, 'ringR1', e.target.value)}
            placeholder="r₁"
            type="number"
            step="0.001"
            className="h-9 text-xs touch-manipulation"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">rₙ (Ω)</Label>
          <Input
            value={result.ringRn || ''}
            onChange={(e) => onUpdate(result.id, 'ringRn', e.target.value)}
            placeholder="rₙ"
            type="number"
            step="0.001"
            className="h-9 text-xs touch-manipulation"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">r₂ (Ω)</Label>
          <Input
            value={result.ringR2 || ''}
            onChange={(e) => onUpdate(result.id, 'ringR2', e.target.value)}
            placeholder="r₂"
            type="number"
            step="0.001"
            className="h-9 text-xs touch-manipulation"
          />
        </div>
      </div>
      <div className="mt-2">
        <Label className="text-[10px] text-muted-foreground">R₁+R₂ (Ω)</Label>
        <Input
          value={result.r1r2 || ''}
          onChange={(e) => onUpdate(result.id, 'r1r2', e.target.value)}
          placeholder="e.g., 0.5"
          type="number"
          step="0.001"
          className="h-9 text-xs touch-manipulation mt-1"
        />
      </div>
    </div>

    {/* Insulation */}
    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
      <h4 className="text-xs font-medium text-green-400 uppercase mb-2">Insulation Resistance</h4>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Test Voltage</Label>
          <MobileSelectPicker
            value={result.insulationTestVoltage || ''}
            onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
            options={insulationTestVoltageOptions}
            placeholder="Select"
            title="Test Voltage"
            triggerClassName="h-9 text-xs"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">L-L (MΩ)</Label>
            <Input
              value={result.insulationLiveNeutral || ''}
              onChange={(e) => onUpdate(result.id, 'insulationLiveNeutral', e.target.value)}
              placeholder=">1.0"
              type="number"
              step="0.1"
              className="h-9 text-xs touch-manipulation"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">L-E (MΩ)</Label>
            <Input
              value={result.insulationLiveEarth || ''}
              onChange={(e) => onUpdate(result.id, 'insulationLiveEarth', e.target.value)}
              placeholder=">1.0"
              type="number"
              step="0.1"
              className="h-9 text-xs touch-manipulation"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Polarity & Zs */}
    <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
      <h4 className="text-xs font-medium text-amber-400 uppercase mb-2">Polarity & Earth Loop</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Polarity</Label>
          <MobileSelectPicker
            value={result.polarity || ''}
            onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
            options={[
              { value: '✓', label: '✓ Correct' },
              { value: '✗', label: '✗ Reversed' },
            ]}
            placeholder="Select"
            title="Polarity"
            triggerClassName="h-9 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Zs (Ω)</Label>
          <Input
            value={result.zs || ''}
            onChange={(e) => onUpdate(result.id, 'zs', e.target.value)}
            placeholder="e.g., 0.5"
            type="number"
            step="0.01"
            className="h-9 text-xs touch-manipulation"
          />
        </div>
      </div>
      {/* Phase Type Selector */}
      <div className="mt-2 space-y-1">
        <Label className="text-[10px] text-muted-foreground">Phase Type</Label>
        <MobileSelectPicker
          value={result.phaseType || '1P'}
          onValueChange={(value) => onUpdate(result.id, 'phaseType', value)}
          options={[
            { value: '1P', label: 'Single Phase (1P)' },
            { value: '3P', label: 'Three Phase (3P)' },
          ]}
          placeholder="Select"
          title="Phase Type"
          triggerClassName="h-9 text-xs"
        />
      </div>
    </div>

    {/* Three-Phase Section - Only shown when phaseType is 3P */}
    {result.phaseType === '3P' && (
      <div className="bg-purple-600/10 rounded-lg p-3 border border-purple-500/20">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-medium text-purple-400 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Three-Phase Readings
          </h4>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-purple-500/50 text-purple-400">
            3PH
          </Badge>
        </div>

        {/* Phase Rotation */}
        <div className="space-y-1 mb-3">
          <Label className="text-[10px] text-muted-foreground">Phase Sequence</Label>
          <MobileSelectPicker
            value={result.phaseRotation || ''}
            onValueChange={(value) => onUpdate(result.id, 'phaseRotation', value)}
            options={[
              { value: 'L1-L2-L3 ✓', label: 'L1-L2-L3 ✓ (Clockwise)' },
              { value: 'L1-L3-L2', label: 'L1-L3-L2 (Anti-clockwise)' },
            ]}
            placeholder="Select"
            title="Phase Rotation"
            triggerClassName="h-9 text-xs"
          />
        </div>

        {/* L-L Voltage */}
        <div className="space-y-1 mb-3">
          <Label className="text-[10px] text-muted-foreground">L-L Voltage (V)</Label>
          <Input
            value={result.lineToLineVoltage || ''}
            onChange={(e) => onUpdate(result.id, 'lineToLineVoltage', e.target.value)}
            placeholder="e.g., 400"
            type="number"
            className="h-9 text-xs touch-manipulation"
          />
        </div>

        {/* Load Balance L1/L2/L3 */}
        <div className="space-y-2">
          <Label className="text-[10px] text-muted-foreground">Load Balance (A)</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-[9px] text-center block text-purple-300">L1</Label>
              <Input
                value={result.phaseBalanceL1 || ''}
                onChange={(e) => onUpdate(result.id, 'phaseBalanceL1', e.target.value)}
                placeholder="L1"
                type="number"
                step="0.1"
                className="h-8 text-[11px] text-center touch-manipulation"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] text-center block text-purple-300">L2</Label>
              <Input
                value={result.phaseBalanceL2 || ''}
                onChange={(e) => onUpdate(result.id, 'phaseBalanceL2', e.target.value)}
                placeholder="L2"
                type="number"
                step="0.1"
                className="h-8 text-[11px] text-center touch-manipulation"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] text-center block text-purple-300">L3</Label>
              <Input
                value={result.phaseBalanceL3 || ''}
                onChange={(e) => onUpdate(result.id, 'phaseBalanceL3', e.target.value)}
                placeholder="L3"
                type="number"
                step="0.1"
                className="h-8 text-[11px] text-center touch-manipulation"
              />
            </div>
          </div>
        </div>
      </div>
    )}

    {/* RCD Tests */}
    <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
      <h4 className="text-xs font-medium text-purple-400 uppercase mb-2">RCD Tests</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">1×IΔn (ms)</Label>
          <Input
            value={result.rcdOneX || ''}
            onChange={(e) => onUpdate(result.id, 'rcdOneX', e.target.value)}
            placeholder="e.g., 28"
            type="number"
            className="h-9 text-xs touch-manipulation"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Test Button</Label>
          <MobileSelectPicker
            value={result.rcdTestButton || ''}
            onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
            options={[
              { value: 'Pass', label: 'Pass' },
              { value: 'Fail', label: 'Fail' },
              { value: 'N/A', label: 'N/A' },
            ]}
            placeholder="Select"
            title="RCD Test Button"
            triggerClassName="h-9 text-xs"
          />
        </div>
      </div>
    </div>

    {/* Other Tests */}
    <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
      <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Other Tests</h4>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">AFDD</Label>
          <MobileSelectPicker
            value={result.afddTest || ''}
            onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
            options={[
              { value: '✓', label: '✓' },
              { value: '✗', label: '✗' },
              { value: 'N/A', label: 'N/A' },
            ]}
            placeholder="-"
            title="AFDD Test"
            triggerClassName="h-9 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">PFC (kA)</Label>
          <Input
            value={result.pfc || ''}
            onChange={(e) => onUpdate(result.id, 'pfc', e.target.value)}
            placeholder="kA"
            type="number"
            step="0.1"
            className="h-9 text-xs touch-manipulation"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-muted-foreground">Func.</Label>
          <MobileSelectPicker
            value={result.functionalTesting || ''}
            onValueChange={(value) => onUpdate(result.id, 'functionalTesting', value)}
            options={[
              { value: '✓', label: '✓' },
              { value: '✗', label: '✗' },
              { value: 'N/A', label: 'N/A' },
            ]}
            placeholder="-"
            title="Functional Test"
            triggerClassName="h-9 text-xs"
          />
        </div>
      </div>
    </div>

    {/* Notes */}
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">Notes / Remarks</Label>
      <Input
        value={result.notes || ''}
        onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
        placeholder="Any additional notes..."
        className="h-10 text-sm touch-manipulation"
      />
    </div>
  </div>
);

export default TestResultMobileCard;
