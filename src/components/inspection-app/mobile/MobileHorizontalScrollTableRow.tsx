import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { referenceMethodOptions } from '@/types/cableTypes';
import { cableSizeOptions } from '@/types/cableTypes';
import { protectiveDeviceTypeOptions, protectiveDeviceRatingOptions, bsStandardOptions, protectiveDeviceCurveOptions, rcdBsStandardOptions, bsStandardRequiresCurve } from '@/types/protectiveDeviceTypes';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { wiringTypeOptions, rcdTypeOptions } from '@/types/wiringTypes';
import { columnGroups } from '@/utils/mobileTableUtils';
import { cn } from '@/lib/utils';
import { Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';

interface MobileHorizontalScrollTableRowProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
}

export const MobileHorizontalScrollTableRow: React.FC<MobileHorizontalScrollTableRowProps> = ({
  result,
  onUpdate,
  onRemove,
}) => {
  const { toast } = useToast();
  
  const getBorderColor = () => {
    if (result.sourceCircuitId) return 'border-l-4 border-l-blue-500';
    if (result.autoFilled) return 'border-l-4 border-l-elec-yellow';
    return '';
  };

  const handleCalculateR1R2 = () => {
    const r1 = parseFloat(result.ringR1 || '');
    const rn = parseFloat(result.ringRn || '');
    const r2 = parseFloat(result.ringR2 || '');
    
    if (isNaN(r1) || isNaN(rn) || isNaN(r2)) {
      toast({
        title: "Missing Values",
        description: "Please enter r1, rn, and r2 values first.",
        variant: "destructive"
      });
      return;
    }
    
    const calculated = (r1 + r2) / 4;
    onUpdate(result.id, 'r1r2', calculated.toFixed(3));
    
    toast({
      title: "R1+R2 Calculated",
      description: `R1+R2 = ${calculated.toFixed(3)}Ω`,
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

  const inputClassName = "h-11 text-sm px-2 border border-input bg-background text-foreground focus:ring-2 focus:ring-primary text-center touch-manipulation";
  const selectTriggerClassName = "h-11 text-sm px-2 border border-input bg-background focus:ring-2 focus:ring-primary touch-manipulation";

  return (
    <TableRow className={cn("hover:bg-muted/50 border-b border-border", getBorderColor())}>
      {/* Circuit Details Group */}
      <TableCell className="sticky left-0 z-10 border-r-[3px] border-primary/40 p-0.5 font-bold text-center whitespace-nowrap bg-elec-gray-light w-[72px] min-w-[72px] max-w-[72px]">
        <Input
          value={result.circuitDesignation}
          onChange={(e) => onUpdate(result.id, 'circuitDesignation', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="C1"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border bg-elec-gray w-[132px] min-w-[132px] max-w-[132px]">
        <Input
          value={result.circuitDescription}
          onChange={(e) => onUpdate(result.id, 'circuitDescription', e.target.value)}
          className={cn(inputClassName, "truncate text-xs px-1")}
          placeholder="Description"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <MobileSelectPicker
          value={result.typeOfWiring || ''}
          onValueChange={(value) => onUpdate(result.id, 'typeOfWiring', value)}
          options={wiringTypeOptions}
          placeholder="Ty"
          title="Type of Wiring"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <MobileSelectPicker
          value={result.referenceMethod || ''}
          onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
          options={referenceMethodOptions}
          placeholder="M"
          title="Reference Method"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[72px] min-w-[72px] max-w-[72px]">
        <Input
          value={result.pointsServed || ''}
          onChange={(e) => onUpdate(result.id, 'pointsServed', e.target.value)}
          className={cn(inputClassName, "text-xs px-0")}
          placeholder="0"
          type="number"
          min="0"
        />
      </TableCell>

      {/* Conductor Details Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <MobileSelectPicker
          value={result.liveSize || ''}
          onValueChange={(value) => onUpdate(result.id, 'liveSize', value)}
          options={cableSizeOptions}
          placeholder="mm²"
          title="Live Conductor Size"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <MobileSelectPicker
          value={result.cpcSize || ''}
          onValueChange={(value) => onUpdate(result.id, 'cpcSize', value)}
          options={cableSizeOptions}
          placeholder="mm²"
          title="CPC Size"
        />
      </TableCell>

      {/* Protection Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <MobileSelectPicker
          value={result.bsStandard || ''}
          onValueChange={handleBsStandardChange}
          options={bsStandardOptions}
          placeholder="BS"
          title="BS Standard"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <MobileSelectPicker
          value={result.protectiveDeviceCurve || ''}
          onValueChange={handleCurveChange}
          options={protectiveDeviceCurveOptions}
          placeholder="-"
          title="Device Curve"
          disabled={!bsStandardRequiresCurve(result.bsStandard || '')}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <MobileSelectPicker
          value={result.protectiveDeviceRating || ''}
          onValueChange={handleRatingChange}
          options={protectiveDeviceRatingOptions}
          placeholder="A"
          title="Device Rating"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[72px] min-w-[72px] max-w-[72px]">
        <Input
          value={result.protectiveDeviceKaRating}
          onChange={(e) => onUpdate(result.id, 'protectiveDeviceKaRating', e.target.value)}
          className={cn(inputClassName, "text-xs px-0")}
          placeholder="kA"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Input
          value={result.maxZs || ''}
          onChange={(e) => onUpdate(result.id, 'maxZs', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="Zs"
          type="number"
          step="0.01"
        />
      </TableCell>

      {/* RCD Details Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[96px] min-w-[96px] max-w-[96px]">
        <MobileSelectPicker
          value={result.rcdBsStandard || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdBsStandard', value)}
          options={rcdBsStandardOptions}
          placeholder="BS"
          title="RCD BS Standard"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[96px] min-w-[96px] max-w-[96px]">
        <MobileSelectPicker
          value={result.rcdType || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdType', value)}
          options={rcdTypeOptions}
          placeholder="Ty"
          title="RCD Type"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[80px] min-w-[80px] max-w-[80px]">
        <MobileSelectPicker
          value={result.rcdRating || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdRating', value)}
          options={[
            { value: '10', label: '10' },
            { value: '30', label: '30' },
            { value: '100', label: '100' },
            { value: '300', label: '300' },
            { value: '500', label: '500' },
          ]}
          placeholder="mA"
          title="RCD Rating (mA)"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r-2 border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.rcdRatingA || ''}
          onChange={(e) => onUpdate(result.id, 'rcdRatingA', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="A"
        />
      </TableCell>

      {/* Continuity Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.ringR1 || ''}
          onChange={(e) => onUpdate(result.id, 'ringR1', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="r1"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.ringRn || ''}
          onChange={(e) => onUpdate(result.id, 'ringRn', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="rn"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <div className="flex items-center gap-0">
          <Input
            value={result.ringR2 || ''}
            onChange={(e) => onUpdate(result.id, 'ringR2', e.target.value)}
            className={cn(inputClassName, "text-xs px-0.5 flex-1")}
            placeholder="r2"
            type="number"
            step="0.001"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 p-0"
            onClick={handleCalculateR1R2}
            title="Calculate R1+R2"
          >
            <Calculator className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Input
          value={result.r1r2}
          onChange={(e) => onUpdate(result.id, 'r1r2', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="R1+R2"
          type="number"
          step="0.01"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.ringContinuityLive || ''}
          onChange={(e) => onUpdate(result.id, 'ringContinuityLive', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="R₂"
          type="number"
          step="0.001"
        />
      </TableCell>

      {/* Insulation Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <MobileSelectPicker
          value={result.insulationTestVoltage || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
          options={insulationTestVoltageOptions}
          placeholder="V"
          title="Insulation Test Voltage"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Input
          value={result.insulationLiveNeutral || ''}
          onChange={(e) => onUpdate(result.id, 'insulationLiveNeutral', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder=">200"
          type="number"
          step="0.1"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Input
          value={result.insulationLiveEarth || ''}
          onChange={(e) => onUpdate(result.id, 'insulationLiveEarth', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder=">200"
          type="number"
          step="0.1"
        />
      </TableCell>

      {/* Earth Fault Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <MobileSelectPicker
          value={result.polarity || ''}
          onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
          options={[
            { value: 'Correct', label: '✓ Correct' },
            { value: 'Incorrect', label: '✗ Incorrect' },
            { value: 'N/A', label: 'N/A' },
          ]}
          placeholder="✓"
          title="Polarity"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Input
          value={result.zs}
          onChange={(e) => onUpdate(result.id, 'zs', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="Zs"
          type="number"
          step="0.01"
        />
      </TableCell>

      {/* RCD Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.rcdOneX}
          onChange={(e) => onUpdate(result.id, 'rcdOneX', e.target.value)}
          className={cn(inputClassName, "text-xs px-1")}
          placeholder="ms"
          type="number"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <MobileSelectPicker
          value={result.rcdTestButton || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
          options={[
            { value: '✓', label: '✓ Pass' },
            { value: '✗', label: '✗ Fail' },
            { value: 'N/A', label: 'N/A' },
          ]}
          placeholder="✓"
          title="RCD Test Button"
        />
      </TableCell>

      {/* AFDD Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <MobileSelectPicker
          value={result.afddTest || ''}
          onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
          options={[
            { value: '✓', label: '✓ Pass' },
            { value: '✗', label: '✗ Fail' },
            { value: 'N/A', label: 'N/A' },
          ]}
          placeholder="✓"
          title="AFDD Test"
        />
      </TableCell>

      {/* Functional Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <MobileSelectPicker
          value={result.functionalTesting || ''}
          onValueChange={(value) => onUpdate(result.id, 'functionalTesting', value)}
          options={[
            { value: '✓', label: '✓ Satisfactory' },
            { value: '✗', label: '✗ Unsatisfactory' },
            { value: 'N/A', label: 'N/A' },
          ]}
          placeholder="✓"
          title="Functional Testing"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[132px] min-w-[132px] max-w-[132px]">
        <Input
          value={result.notes || ''}
          onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
          className={cn(inputClassName, "truncate text-xs px-1")}
          placeholder="Notes"
        />
      </TableCell>

      {/* Actions Column */}
      <TableCell className="border-l border-border p-0.5 whitespace-nowrap bg-elec-gray w-[72px] min-w-[72px] max-w-[72px]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(result.id)}
          className="h-11 w-11 text-destructive hover:bg-destructive/10 touch-manipulation"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
