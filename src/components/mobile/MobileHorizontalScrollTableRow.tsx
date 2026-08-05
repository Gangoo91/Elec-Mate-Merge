import React, { useMemo, useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Copy, ChevronUp, ChevronDown } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { referenceMethodOptions } from '@/types/cableTypes';
import { cableSizeOptions } from '@/types/cableTypes';
import {
  protectiveDeviceRatingOptions,
  bsStandardOptions,
  protectiveDeviceCurveOptions,
  rcdBsStandardOptions,
  bsStandardRequiresCurve,
} from '@/types/protectiveDeviceTypes';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { wiringTypeOptions, rcdTypeOptions } from '@/types/wiringTypes';
import { normaliseRcdRating } from '@/utils/rcdRating';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import { cn } from '@/lib/utils';
import { Calculator } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import R1R2Calculator from '@/components/R1R2Calculator';
import { useToast } from '@/hooks/use-toast';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { getIrMaxForVoltage, isBlankReading } from '@/utils/irDefaults';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import EnhancedRegulationWarningDialog from '@/components/EnhancedRegulationWarningDialog';

interface MobileHorizontalScrollTableRowProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

const MobileHorizontalScrollTableRowComponent: React.FC<MobileHorizontalScrollTableRowProps> = ({
  result,
  onUpdate,
  onRemove,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
}) => {
  // ELE-1438/1467 — same one-tap max fill as the desktop cells. This app is
  // used on a phone on site, which is exactly where retyping ">1049" twenty
  // times hurts most, so the mobile row must not be the poor relation.
  const { companyProfile } = useCompanyProfile();
  const irMax = getIrMaxForVoltage(
    companyProfile?.testing_instruments,
    result.insulationTestVoltage
  );

  // ELE-1477 audit — the regulation checker (8 validators, incl. a sourced Zs
  // check that handles TT and TN) ran on the desktop table only. On a
  // mobile-first app used at the board, the people most likely to need a
  // verdict were the only ones never shown one. Same function, same warnings
  // dialog as the desktop row — this was never a missing feature, only a
  // missing call.
  const [showRegWarning, setShowRegWarning] = useState(false);
  const regulationCompliance = useMemo(() => checkRegulationCompliance(result), [result]);

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
        title: 'Missing Values',
        description: 'Please enter r1, rn, and r2 values first.',
        variant: 'destructive',
      });
      return;
    }

    const calculated = (r1 + r2) / 4;
    onUpdate(result.id, 'r1r2', calculated.toFixed(3));

    toast({
      title: 'R1+R2 Calculated',
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

  const inputClassName =
    'h-11 text-sm px-2 bg-white/[0.06] border border-white/[0.10] rounded-lg text-white placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 focus:shadow-none text-center touch-manipulation';
  const selectTriggerClassName =
    'h-11 text-sm px-2 bg-white/[0.06] border border-white/[0.10] rounded-lg text-white focus:border-elec-yellow focus:outline-none focus:ring-0 focus:shadow-none touch-manipulation';
  const comboboxCellClassName =
    'h-11 bg-white/[0.06] border border-white/[0.10] rounded-lg text-sm text-white';

  return (
    <TableRow
      className={cn(
        // No hover tint — touch-first table, and the opaque sticky first cell
        // wouldn't join it anyway (founder no-hover call). Hover colours match
        // the resting tones to neutralise the ui TableRow hover:bg-muted/30.
        'group border-b border-white/[0.06] bg-[hsl(0_0%_10%)] even:bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_10%)] even:hover:bg-[hsl(0_0%_12%)]',
        getBorderColor()
      )}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 48px' }}
    >
      {/* Circuit Details Group */}
      <TableCell className="sticky left-0 z-10 border-r border-white/[0.08] p-0.5 font-bold text-center whitespace-nowrap bg-[hsl(0_0%_10%)] group-even:bg-[hsl(0_0%_12%)] w-[83px] min-w-[83px] max-w-[83px] shadow-[4px_0_8px_-2px_rgba(0,0,0,0.5)]">
        <div className="relative">
          <Input
            value={result.circuitDesignation}
            onChange={(e) => onUpdate(result.id, 'circuitDesignation', e.target.value)}
            className={inputClassName}
            placeholder="Way 1"
          />
          {!regulationCompliance.isCompliant && (
            <button
              type="button"
              onClick={() => setShowRegWarning(true)}
              aria-label={`${regulationCompliance.warnings.length} compliance issue${
                regulationCompliance.warnings.length === 1 ? '' : 's'
              } on this circuit`}
              className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white touch-manipulation"
            >
              !
            </button>
          )}
        </div>
      </TableCell>

      <TableCell className="p-0.5 border-r border-white/[0.08] w-[152px] min-w-[152px] max-w-[152px]">
        <Input
          value={result.circuitDescription}
          onChange={(e) => onUpdate(result.id, 'circuitDescription', e.target.value)}
          className={cn(inputClassName, 'truncate')}
          placeholder="Desc"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        <ComboboxCell
          value={result.typeOfWiring || ''}
          onChange={(v) => onUpdate(result.id, 'typeOfWiring', v)}
          options={wiringTypeOptions}
          title="Wiring type"
          placeholder="Type"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[76px] min-w-[76px] max-w-[76px]">
        <ComboboxCell
          value={result.referenceMethod || ''}
          onChange={(v) => onUpdate(result.id, 'referenceMethod', v)}
          options={referenceMethodOptions}
          title="Reference method"
          placeholder="Ref"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[83px] min-w-[83px] max-w-[83px]">
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
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
        <ComboboxCell
          value={result.liveSize || ''}
          onChange={(v) => onUpdate(result.id, 'liveSize', v)}
          options={cableSizeOptions}
          title="Live conductor size (mm²)"
          placeholder="mm²"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
        <ComboboxCell
          value={result.cpcSize || ''}
          onChange={(v) => onUpdate(result.id, 'cpcSize', v)}
          options={cableSizeOptions}
          title="CPC size (mm²)"
          placeholder="mm²"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>

      {/* Protection Group */}
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
        <ComboboxCell
          value={result.bsStandard || ''}
          onChange={handleBsStandardChange}
          options={bsStandardOptions}
          title="Protective device BS EN"
          placeholder="BS"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[76px] min-w-[76px] max-w-[76px]">
        <Select
          value={result.protectiveDeviceCurve || ''}
          onValueChange={handleCurveChange}
          disabled={!bsStandardRequiresCurve(result.bsStandard || '')}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Ty">{result.protectiveDeviceCurve || 'Ty'}</SelectValue>
          </SelectTrigger>
          <SelectContent className="z-[100] bg-background border border-border">
            {protectiveDeviceCurveOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        <ComboboxCell
          value={result.protectiveDeviceRating || ''}
          onChange={handleRatingChange}
          options={protectiveDeviceRatingOptions}
          title="Device rating (A)"
          placeholder="A"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[83px] min-w-[83px] max-w-[83px]">
        <Input
          value={result.protectiveDeviceKaRating}
          onChange={(e) => onUpdate(result.id, 'protectiveDeviceKaRating', e.target.value)}
          className={inputClassName}
          placeholder="kA"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
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
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
        <ComboboxCell
          value={result.rcdBsStandard || ''}
          onChange={(v) => onUpdate(result.id, 'rcdBsStandard', v)}
          options={rcdBsStandardOptions}
          title="RCD BS EN"
          placeholder="BS"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        <ComboboxCell
          value={result.rcdType || ''}
          onChange={(v) => onUpdate(result.id, 'rcdType', v)}
          options={rcdTypeOptions}
          title="RCD type"
          placeholder="Type"
          compact
          className={comboboxCellClassName}
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        {/* Canonical values carry the unit ('30mA') to match the desktop cell
            Select; normaliseRcdRating maps legacy bare '30' on read so old
            mobile-filled certs still display. */}
        <Select
          value={normaliseRcdRating(result.rcdRating)}
          onValueChange={(value) => onUpdate(result.id, 'rcdRating', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="mA" />
          </SelectTrigger>
          <SelectContent className="z-[100] bg-background border border-border">
            <SelectItem value="10mA" className="text-xs py-2">
              10mA
            </SelectItem>
            <SelectItem value="30mA" className="text-xs py-2">
              30mA
            </SelectItem>
            <SelectItem value="100mA" className="text-xs py-2">
              100mA
            </SelectItem>
            <SelectItem value="300mA" className="text-xs py-2">
              300mA
            </SelectItem>
            <SelectItem value="500mA" className="text-xs py-2">
              500mA
            </SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">
              N/A
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        <Input
          value={result.rcdRatingA || ''}
          onChange={(e) => onUpdate(result.id, 'rcdRatingA', e.target.value)}
          className={inputClassName}
          placeholder="A"
        />
      </TableCell>

      {/* Continuity Tests Group */}
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        <Input
          value={result.ringR1 || ''}
          onChange={(e) => onUpdate(result.id, 'ringR1', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        <Input
          value={result.ringRn || ''}
          onChange={(e) => onUpdate(result.id, 'ringRn', e.target.value)}
          className={inputClassName}
          placeholder="Ω"
          type="number"
          step="0.001"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[132px] min-w-[132px] max-w-[132px]">
        <div className="flex items-center gap-0">
          <Input
            value={result.ringR2 || ''}
            onChange={(e) => onUpdate(result.id, 'ringR2', e.target.value)}
            className={cn(inputClassName, 'min-w-0 flex-1')}
            placeholder="Ω"
            type="number"
            step="0.001"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0 p-0 text-white/80 hover:text-elec-yellow touch-manipulation"
            onClick={handleCalculateR1R2}
            aria-label="Calculate R1+R2 from ring readings"
          >
            <Calculator className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[132px] min-w-[132px] max-w-[132px]">
        <div className="flex items-center gap-0.5">
          <Input
            value={result.r1r2}
            onChange={(e) => onUpdate(result.id, 'r1r2', e.target.value)}
            className={cn(inputClassName, 'min-w-0 flex-1')}
            placeholder="Ω"
            type="number"
            step="0.01"
          />
          {/* ELE-1181 — full R1+R2 calculator (cable length + temp) on the table */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 shrink-0 p-0 text-white/80 hover:text-elec-yellow touch-manipulation"
                aria-label="Open R1+R2 calculator"
              >
                <Calculator className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 border-0 bg-transparent shadow-none">
              <R1R2Calculator
                result={result}
                onUpdate={(field, value) => onUpdate(result.id, field, value)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
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
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
        <Select
          value={result.insulationTestVoltage || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="V" />
          </SelectTrigger>
          <SelectContent className="z-[100] bg-background border border-border">
            {insulationTestVoltageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs py-2">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
        <div className="relative">
          <input
            type="text"
            inputMode="text"
            value={result.insulationLiveNeutral || ''}
            onChange={(e) => onUpdate(result.id, 'insulationLiveNeutral', e.target.value)}
            className="w-full h-11 text-sm text-center bg-white/[0.06] border border-white/[0.10] text-white placeholder:text-white/25 rounded-lg focus:border-elec-yellow focus:outline-none touch-manipulation"
            /* 16px stops iOS zooming the page on focus — matches ui/input */
            style={{ fontSize: '16px' }}
            placeholder=">200"
          />
          {irMax && isBlankReading(result.insulationLiveNeutral) && (
            <button
              type="button"
              onClick={() => onUpdate(result.id, 'insulationLiveNeutral', irMax)}
              aria-label={`Fill with tester maximum ${irMax}`}
              className="absolute inset-y-0 right-0 px-2 text-[11px] font-semibold text-elec-yellow touch-manipulation"
            >
              Max
            </button>
          )}
        </div>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
        <div className="relative">
          <input
            type="text"
            inputMode="text"
            value={result.insulationLiveEarth || ''}
            onChange={(e) => onUpdate(result.id, 'insulationLiveEarth', e.target.value)}
            className="w-full h-11 text-sm text-center bg-white/[0.06] border border-white/[0.10] text-white placeholder:text-white/25 rounded-lg focus:border-elec-yellow focus:outline-none touch-manipulation"
            /* 16px stops iOS zooming the page on focus — matches ui/input */
            style={{ fontSize: '16px' }}
            placeholder=">200"
          />
          {irMax && isBlankReading(result.insulationLiveEarth) && (
            <button
              type="button"
              onClick={() => onUpdate(result.id, 'insulationLiveEarth', irMax)}
              aria-label={`Fill with tester maximum ${irMax}`}
              className="absolute inset-y-0 right-0 px-2 text-[11px] font-semibold text-elec-yellow touch-manipulation"
            >
              Max
            </button>
          )}
        </div>
      </TableCell>
      {/* Earth Fault Tests Group */}
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[76px] min-w-[76px] max-w-[76px]">
        <Select
          value={result.polarity || ''}
          onValueChange={(value) => onUpdate(result.id, 'polarity', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="Pol" />
          </SelectTrigger>
          <SelectContent className="z-[100] bg-background border border-border">
            <SelectItem value="Correct" className="text-xs py-2">
              ✓
            </SelectItem>
            <SelectItem value="Incorrect" className="text-xs py-2">
              ✗
            </SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">
              N/A
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[110px] min-w-[110px] max-w-[110px]">
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
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[92px] min-w-[92px] max-w-[92px]">
        <Input
          value={result.rcdOneX}
          onChange={(e) => onUpdate(result.id, 'rcdOneX', e.target.value)}
          className={inputClassName}
          placeholder="ms"
          type="number"
        />
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[76px] min-w-[76px] max-w-[76px]">
        <Select
          value={result.rcdTestButton || ''}
          onValueChange={(value) => onUpdate(result.id, 'rcdTestButton', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent className="z-[100] bg-background border border-border">
            <SelectItem value="✓" className="text-xs py-2">
              ✓
            </SelectItem>
            <SelectItem value="✗" className="text-xs py-2">
              ✗
            </SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">
              N/A
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* AFDD Group */}
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[76px] min-w-[76px] max-w-[76px]">
        <Select
          value={result.afddTest || ''}
          onValueChange={(value) => onUpdate(result.id, 'afddTest', value)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent className="z-[100] bg-background border border-border">
            <SelectItem value="✓" className="text-xs py-2 text-green-400">
              ✓
            </SelectItem>
            <SelectItem value="✗" className="text-xs py-2 text-red-400">
              ✗
            </SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">
              N/A
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Functional Group */}
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[76px] min-w-[76px] max-w-[76px]">
        <Select
          value={result.functionalTesting || ''}
          onValueChange={(value) => onUpdate(result.id, 'functionalTesting', value)}
        >
          <SelectTrigger
            className={cn(
              selectTriggerClassName,
              result.functionalTesting === '✓' && 'text-green-400',
              result.functionalTesting === '✗' && 'text-red-400'
            )}
          >
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent className="z-[100] bg-background border border-border">
            <SelectItem value="✓" className="text-xs py-2 text-green-400">
              ✓
            </SelectItem>
            <SelectItem value="✗" className="text-xs py-2 text-red-400">
              ✗
            </SelectItem>
            <SelectItem value="N/A" className="text-xs py-2">
              N/A
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="p-0.5 border-r border-white/[0.08] whitespace-nowrap w-[152px] min-w-[152px] max-w-[152px]">
        <Input
          value={result.notes || ''}
          onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
          className={cn(inputClassName, 'truncate')}
          placeholder="Notes"
        />
      </TableCell>

      {/* Actions — right-hand end on mobile (founder call: a 213px frozen zone
          eats too much phone width; desktop's Actions column is first but NOT
          sticky either) */}
      <TableCell className="p-0.5 whitespace-nowrap border-r-0 w-[200px] min-w-[200px] max-w-[200px]">
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMoveUp(result.id)}
              disabled={!canMoveUp}
              className="h-11 w-11 text-white/80 hover:bg-white/10 touch-manipulation disabled:opacity-25"
              aria-label="Move circuit up"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {onMoveDown && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMoveDown(result.id)}
              disabled={!canMoveDown}
              className="h-11 w-11 text-white/80 hover:bg-white/10 touch-manipulation disabled:opacity-25"
              aria-label="Move circuit down"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          {onDuplicate && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDuplicate(result.id)}
              className="h-11 w-11 text-white/80 hover:text-elec-yellow hover:bg-white/10 touch-manipulation"
              aria-label="Duplicate circuit"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
          {/* Delete is destructive — keep it off the end of the duplicate button */}
          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-white/[0.12]" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(result.id)}
            className="h-11 w-11 text-red-400 hover:bg-white/10 touch-manipulation"
            aria-label="Delete circuit"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>

      {/* Same warnings dialog the desktop row uses — one compliance UI. */}
      <EnhancedRegulationWarningDialog
        open={showRegWarning}
        onOpenChange={setShowRegWarning}
        warnings={regulationCompliance.warnings}
      />
    </TableRow>
  );
};

// Memoize the row component to prevent unnecessary re-renders when other rows change
export const MobileHorizontalScrollTableRow = React.memo(MobileHorizontalScrollTableRowComponent);
