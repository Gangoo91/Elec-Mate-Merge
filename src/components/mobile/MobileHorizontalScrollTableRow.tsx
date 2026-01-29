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

const MobileHorizontalScrollTableRowComponent: React.FC<MobileHorizontalScrollTableRowProps> = ({
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
    <TableRow className={cn("hover:bg-muted/50 border-b border-border", getBorderColor())} style={{ contentVisibility: 'auto', containIntrinsicSize: '0 48px' }}>
      {/* Circuit Details Group */}
      <TableCell className="sticky left-0 z-10 border-r-[3px] border-primary/40 p-0.5 font-bold text-center whitespace-nowrap bg-elec-gray-light w-[72px] min-w-[72px] max-w-[72px]">
        <Input
          value={result.circuitDesignation}
          onChange={(e) => onUpdate(result.id, 'circuitDesignation', e.target.value)}
          className={inputClassName}
          placeholder="C1"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border bg-elec-gray w-[132px] min-w-[132px] max-w-[132px]">
        <Input
          value={result.circuitDescription}
          onChange={(e) => onUpdate(result.id, 'circuitDescription', e.target.value)}
          className={cn(inputClassName, "truncate")}
          placeholder="Desc"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Select
          value={result.typeOfWiring || ''}
          onValueChange={(value) => onUpdate(result.id, 'typeOfWiring', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Ty">
              {result.typeOfWiring || "Ty"}
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <Select
          value={result.referenceMethod || ''}
          onValueChange={(value) => onUpdate(result.id, 'referenceMethod', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Mth">
              {result.referenceMethod || "Mth"}
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[72px] min-w-[72px] max-w-[72px]">
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Select
          value={result.liveSize || ''}
          onValueChange={(value) => onUpdate(result.id, 'liveSize', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="mm²" />
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Select
          value={result.cpcSize || ''}
          onValueChange={(value) => onUpdate(result.id, 'cpcSize', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="mm²" />
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <Select
          value={result.protectiveDeviceCurve || ''}
          onValueChange={handleCurveChange}
          disabled={!bsStandardRequiresCurve(result.bsStandard || '')}
        >
          <SelectTrigger className={selectTriggerClassName}>
          <SelectValue placeholder="Ty">
            {result.protectiveDeviceCurve || "Ty"}
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Select
          value={result.protectiveDeviceRating || ''}
          onValueChange={handleRatingChange}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="A">
              {result.protectiveDeviceRating || "A"}
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[72px] min-w-[72px] max-w-[72px]">
        <Input
          value={result.protectiveDeviceKaRating}
          onChange={(e) => onUpdate(result.id, 'protectiveDeviceKaRating', e.target.value)}
          className={inputClassName}
          placeholder="kA"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[96px] min-w-[96px] max-w-[96px]">
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[80px] min-w-[80px] max-w-[80px]">
        <Select
          value={result.rcdType || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdType', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Ty">
              {result.rcdType || "Ty"}
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[80px] min-w-[80px] max-w-[80px]">
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
      <TableCell className="p-0.5 border-r-2 border-border whitespace-nowrap bg-red-50/30 dark:bg-red-950/20 w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.rcdRatingA || ''}
          onChange={(e) => onUpdate(result.id, 'rcdRatingA', e.target.value)}
          className={inputClassName}
          placeholder="A"
        />
      </TableCell>

      {/* Continuity Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.ringR1 || ''}
          onChange={(e) => onUpdate(result.id, 'ringR1', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.ringRn || ''}
          onChange={(e) => onUpdate(result.id, 'ringRn', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <div className="flex items-center gap-0">
          <Input
            value={result.ringR2 || ''}
            onChange={(e) => onUpdate(result.id, 'ringR2', e.target.value)}
            className={cn(inputClassName, "flex-1")}
            placeholder="Ω"
            type="number"
            step="0.001"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 p-0"
            onClick={handleCalculateR1R2}
            title="Calc"
          >
            <Calculator className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Input
          value={result.r1r2}
          onChange={(e) => onUpdate(result.id, 'r1r2', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.01"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.ringContinuityLive || ''}
          onChange={(e) => onUpdate(result.id, 'ringContinuityLive', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.001"
        />
      </TableCell>

      {/* Insulation Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Select
          value={result.insulationTestVoltage || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="V" />
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
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Select
          value={result.insulationLiveNeutral || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationLiveNeutral', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="MΩ" />
          </SelectTrigger>
          <SelectContent className="z-[100] min-w-[140px]">
            <SelectItem value=">200" className="py-3 text-base touch-manipulation">&gt;200 MΩ</SelectItem>
            <SelectItem value=">999" className="py-3 text-base touch-manipulation">&gt;999 MΩ</SelectItem>
            <SelectItem value="N/A" className="py-3 text-base touch-manipulation">N/A</SelectItem>
            <SelectItem value="LIM" className="py-3 text-base touch-manipulation">LIM</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Select
          value={result.insulationLiveEarth || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationLiveEarth', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="MΩ" />
          </SelectTrigger>
          <SelectContent className="z-[100] min-w-[140px]">
            <SelectItem value=">200" className="py-3 text-base touch-manipulation">&gt;200 MΩ</SelectItem>
            <SelectItem value=">999" className="py-3 text-base touch-manipulation">&gt;999 MΩ</SelectItem>
            <SelectItem value="N/A" className="py-3 text-base touch-manipulation">N/A</SelectItem>
            <SelectItem value="LIM" className="py-3 text-base touch-manipulation">LIM</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Earth Fault Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <Select
          value={result.polarity || ''}
          onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Pol" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="Correct" className="text-xs py-2">✓</SelectItem>
            <SelectItem value="Incorrect" className="text-xs py-2">✗</SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[96px] min-w-[96px] max-w-[96px]">
        <Input
          value={result.zs}
          onChange={(e) => onUpdate(result.id, 'zs', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.01"
        />
      </TableCell>

      {/* RCD Tests Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[80px] min-w-[80px] max-w-[80px]">
        <Input
          value={result.rcdOneX}
          onChange={(e) => onUpdate(result.id, 'rcdOneX', e.target.value)}
          className={inputClassName}
          placeholder="ms"
          type="number"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <Select
          value={result.rcdTestButton || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="✓" className="text-xs py-2">✓</SelectItem>
            <SelectItem value="✗" className="text-xs py-2">✗</SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* AFDD Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
        <Select
          value={result.afddTest || ''}
          onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent className="z-[100]">
            <SelectItem value="✓" className="text-xs py-2 text-green-600">✓</SelectItem>
            <SelectItem value="✗" className="text-xs py-2 text-red-600">✗</SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Functional Group */}
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[66px] min-w-[66px] max-w-[66px]">
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
            <SelectItem value="✓" className="text-xs py-2 text-green-600">✓</SelectItem>
            <SelectItem value="✗" className="text-xs py-2 text-red-600">✗</SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">N/A</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-border whitespace-nowrap bg-elec-gray w-[132px] min-w-[132px] max-w-[132px]">
        <Input
          value={result.notes || ''}
          onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
          className={cn(inputClassName, "truncate")}
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

// Memoize the row component to prevent unnecessary re-renders when other rows change
export const MobileHorizontalScrollTableRow = React.memo(MobileHorizontalScrollTableRowComponent);
