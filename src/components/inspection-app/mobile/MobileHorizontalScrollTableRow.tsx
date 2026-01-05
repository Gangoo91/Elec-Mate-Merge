import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const inputClassName = "h-11 text-sm border border-input bg-background text-foreground focus:ring-2 focus:ring-primary text-center touch-manipulation";
  const selectTriggerClassName = "h-11 text-sm border border-input bg-background focus:ring-2 focus:ring-primary touch-manipulation";

  return (
    <TableRow className={cn("hover:bg-muted/50 border-b border-border", getBorderColor())}>
      {/* Circuit Details Group */}
      <TableCell className="sticky left-0 z-10 border-r-[3px] border-primary/40 p-1 font-bold text-center whitespace-nowrap bg-elec-gray-light min-w-[70px]">
        <Input
          value={result.circuitDesignation}
          onChange={(e) => onUpdate(result.id, 'circuitDesignation', e.target.value)}
          className={inputClassName}
          placeholder="C1"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border bg-elec-gray min-w-[200px]">
        <Input
          value={result.circuitDescription}
          onChange={(e) => onUpdate(result.id, 'circuitDescription', e.target.value)}
          className={cn(inputClassName, "whitespace-normal")}
          placeholder="Description"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Select
          value={result.typeOfWiring || ''}
          onValueChange={(value) => onUpdate(result.id, 'typeOfWiring', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Type">
              {result.typeOfWiring || "Type"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {wiringTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[100px]">
        <Select
          value={result.referenceMethod || ''}
          onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Method">
              {result.referenceMethod || "Method"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {referenceMethodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[80px]">
        <Input
          value={result.pointsServed || ''}
          onChange={(e) => onUpdate(result.id, 'pointsServed', e.target.value)}
          className={inputClassName}
          placeholder="0"
          type="number"
          min="0"
        />
      </TableCell>

      {/* Conductor Details Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[80px]">
        <Select
          value={result.liveSize || ''}
          onValueChange={(value) => onUpdate(result.id, 'liveSize', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {cableSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[80px]">
        <Select
          value={result.cpcSize || ''}
          onValueChange={(value) => onUpdate(result.id, 'cpcSize', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="CPC" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {cableSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      {/* Protection Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Select
          value={result.bsStandard || ''}
          onValueChange={handleBsStandardChange}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="BS" />
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            {bsStandardOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[85px]">
        <Select
          value={result.protectiveDeviceCurve || ''}
          onValueChange={handleCurveChange}
          disabled={!bsStandardRequiresCurve(result.bsStandard || '')}
        >
          <SelectTrigger className={selectTriggerClassName}>
          <SelectValue placeholder="Type">
            {result.protectiveDeviceCurve || "Type"}
          </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {protectiveDeviceCurveOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Select
          value={result.protectiveDeviceRating || ''}
          onValueChange={handleRatingChange}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Rating">
              {result.protectiveDeviceRating || "Rating"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {protectiveDeviceRatingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[75px]">
        <Input
          value={result.protectiveDeviceKaRating}
          onChange={(e) => onUpdate(result.id, 'protectiveDeviceKaRating', e.target.value)}
          className={inputClassName}
          placeholder="6kA"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Input
          value={result.maxZs || ''}
          onChange={(e) => onUpdate(result.id, 'maxZs', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.01"
        />
      </TableCell>

      {/* RCD Details Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 min-w-[120px]">
        <Select
          value={result.rcdBsStandard || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdBsStandard', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="BS">
              {result.rcdBsStandard || "BS"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            {rcdBsStandardOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 min-w-[120px]">
        <Select
          value={result.rcdType || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdType', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Type">
              {result.rcdType || "Type"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {rcdTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 min-w-[120px]">
        <Select
          value={result.rcdRating || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdRating', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="mA" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="10" className="text-xs py-2">10mA</SelectItem>
            <SelectItem value="30" className="text-xs py-2">30mA</SelectItem>
            <SelectItem value="100" className="text-xs py-2">100mA</SelectItem>
            <SelectItem value="300" className="text-xs py-2">300mA</SelectItem>
            <SelectItem value="500" className="text-xs py-2">500mA</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r-2 border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 min-w-[120px]">
        <Input
          value={result.rcdRatingA || ''}
          onChange={(e) => onUpdate(result.id, 'rcdRatingA', e.target.value)}
          className={inputClassName}
          placeholder="A"
        />
      </TableCell>

      {/* Continuity Tests Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Input
          value={result.ringR1 || ''}
          onChange={(e) => onUpdate(result.id, 'ringR1', e.target.value)}
          className={inputClassName}
          placeholder="r1"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Input
          value={result.ringRn || ''}
          onChange={(e) => onUpdate(result.id, 'ringRn', e.target.value)}
          className={inputClassName}
          placeholder="rn"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[100px]">
        <div className="flex items-center gap-0.5">
          <Input
            value={result.ringR2 || ''}
            onChange={(e) => onUpdate(result.id, 'ringR2', e.target.value)}
            className={inputClassName}
            placeholder="r2"
            type="number"
            step="0.001"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 p-0"
            onClick={handleCalculateR1R2}
            title="Calculate R1+R2"
          >
            <Calculator className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[95px]">
        <Input
          value={result.r1r2}
          onChange={(e) => onUpdate(result.id, 'r1r2', e.target.value)}
          className={inputClassName}
          placeholder="0.5"
          type="number"
          step="0.01"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Input
          value={result.ringContinuityLive || ''}
          onChange={(e) => onUpdate(result.id, 'ringContinuityLive', e.target.value)}
          className={inputClassName}
          placeholder="R₂"
          type="number"
          step="0.001"
        />
      </TableCell>

      {/* Insulation Tests Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[90px]">
        <Select
          value={result.insulationTestVoltage || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Voltage" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            {insulationTestVoltageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[80px]">
        <Input
          value={result.insulationLiveNeutral || ''}
          onChange={(e) => onUpdate(result.id, 'insulationLiveNeutral', e.target.value)}
          className={inputClassName}
          placeholder="L-L"
          type="number"
          step="0.1"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[80px]">
        <Input
          value={result.insulationLiveEarth || ''}
          onChange={(e) => onUpdate(result.id, 'insulationLiveEarth', e.target.value)}
          className={inputClassName}
          placeholder="L-E"
          type="number"
          step="0.1"
        />
      </TableCell>

      {/* Earth Fault Tests Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[95px]">
        <Select
          value={result.polarity || ''}
          onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Polarity" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="Correct" className="text-xs py-2">Correct</SelectItem>
            <SelectItem value="Incorrect" className="text-xs py-2">Incorrect</SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[85px]">
        <Input
          value={result.zs}
          onChange={(e) => onUpdate(result.id, 'zs', e.target.value)}
          className={inputClassName}
          placeholder="0.5"
          type="number"
          step="0.01"
        />
      </TableCell>

      {/* RCD Tests Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[85px]">
        <Input
          value={result.rcdOneX}
          onChange={(e) => onUpdate(result.id, 'rcdOneX', e.target.value)}
          className={inputClassName}
          placeholder="28"
          type="number"
        />
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[85px]">
        <Select
          value={result.rcdTestButton || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Btn" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="✓" className="text-xs py-2">✓ Pass</SelectItem>
            <SelectItem value="✗" className="text-xs py-2">✗ Fail</SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* AFDD Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[85px]">
        <Select
          value={result.afddTest || ''}
          onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="AFDD" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="✓" className="text-xs py-2 text-green-600">✓ Pass</SelectItem>
            <SelectItem value="✗" className="text-xs py-2 text-red-600">✗ Fail</SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Functional Group */}
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[95px]">
        <Select
          value={result.functionalTesting || ''}
          onValueChange={(value) => onUpdate(result.id, 'functionalTesting', value)}
        >
          <SelectTrigger className={cn(selectTriggerClassName,
            result.functionalTesting === '✓' && 'text-green-600',
            result.functionalTesting === '✗' && 'text-red-600'
          )}>
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="✓" className="text-sm py-2 text-green-600">✓ Satisfactory</SelectItem>
            <SelectItem value="✗" className="text-sm py-2 text-red-600">✗ Unsatisfactory</SelectItem>
            <SelectItem value="N/A" className="text-sm py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-1 border-r border-border whitespace-nowrap bg-elec-gray min-w-[150px]">
        <Input
          value={result.notes || ''}
          onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
          className={inputClassName}
          placeholder="Remarks"
        />
      </TableCell>

      {/* Actions Column */}
      <TableCell className="border-l border-border p-1 whitespace-nowrap bg-elec-gray min-w-[70px]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(result.id)}
          className="h-11 w-11 text-destructive hover:bg-destructive/10 touch-manipulation"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
