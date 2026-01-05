import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface InstallationStepProps {
  data: Record<string, any>;
  onChange: (updates: Record<string, any>) => void;
  isMobile: boolean;
}

/**
 * Step 2: Installation Type
 * Big touch targets for selection
 */
export const InstallationStep: React.FC<InstallationStepProps> = ({
  data,
  onChange,
  isMobile,
}) => {
  return (
    <div className="space-y-6">
      {/* Supply Type */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Supply Type</h3>
          <p className="text-sm text-muted-foreground">
            Select the type of electrical supply
          </p>

          <div className="grid grid-cols-2 gap-4">
            <SelectionCard
              selected={data.supplyType === '1P'}
              onClick={() => onChange({ supplyType: '1P' })}
              title="Single Phase"
              description="230V, 1 phase"
              isMobile={isMobile}
            />
            <SelectionCard
              selected={data.supplyType === '3P'}
              onClick={() => onChange({ supplyType: '3P' })}
              title="Three Phase"
              description="400V, 3 phase"
              isMobile={isMobile}
            />
          </div>
        </CardContent>
      </Card>

      {/* Earthing Arrangement */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Earthing Arrangement</h3>
          <p className="text-sm text-muted-foreground">
            Select the earthing system type
          </p>

          <div className="grid grid-cols-3 gap-3">
            <SelectionCard
              selected={data.earthingArrangement === 'TN-S'}
              onClick={() => onChange({ earthingArrangement: 'TN-S' })}
              title="TN-S"
              description="Separate earth"
              compact
              isMobile={isMobile}
            />
            <SelectionCard
              selected={data.earthingArrangement === 'TN-C-S'}
              onClick={() => onChange({ earthingArrangement: 'TN-C-S' })}
              title="TN-C-S"
              description="Combined neutral/earth"
              compact
              isMobile={isMobile}
            />
            <SelectionCard
              selected={data.earthingArrangement === 'TT'}
              onClick={() => onChange({ earthingArrangement: 'TT' })}
              title="TT"
              description="Local earth electrode"
              compact
              isMobile={isMobile}
            />
          </div>
        </CardContent>
      </Card>

      {/* Supply Details */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Supply Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplyVoltage">Nominal Voltage</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="supplyVoltage"
                  value={data.supplyVoltage || (data.supplyType === '3P' ? '400' : '230')}
                  onChange={(e) => onChange({ supplyVoltage: e.target.value })}
                  className={cn(isMobile ? 'h-14 text-base' : 'h-12')}
                  inputMode="numeric"
                />
                <span className="text-muted-foreground">V</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplyFrequency">Frequency</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="supplyFrequency"
                  value={data.supplyFrequency || '50'}
                  onChange={(e) => onChange({ supplyFrequency: e.target.value })}
                  className={cn(isMobile ? 'h-14 text-base' : 'h-12')}
                  inputMode="numeric"
                />
                <span className="text-muted-foreground">Hz</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ze">Ze (External Earth Fault Loop Impedance)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="ze"
                  value={data.ze || ''}
                  onChange={(e) => onChange({ ze: e.target.value })}
                  placeholder="0.00"
                  className={cn(isMobile ? 'h-14 text-base' : 'h-12')}
                  inputMode="decimal"
                />
                <span className="text-muted-foreground">Ω</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pscc">PSCC (Prospective Short Circuit Current)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pscc"
                  value={data.pscc || ''}
                  onChange={(e) => onChange({ pscc: e.target.value })}
                  placeholder="0.0"
                  className={cn(isMobile ? 'h-14 text-base' : 'h-12')}
                  inputMode="decimal"
                />
                <span className="text-muted-foreground">kA</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Selection card component for touch-friendly options
 */
interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  compact?: boolean;
  isMobile: boolean;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  selected,
  onClick,
  title,
  description,
  compact = false,
  isMobile,
}) => (
  <button
    onClick={onClick}
    className={cn(
      'relative flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-200 text-center',
      compact
        ? (isMobile ? 'p-3 min-h-[80px]' : 'p-3 min-h-[70px]')
        : (isMobile ? 'p-4 min-h-[100px]' : 'p-4 min-h-[90px]'),
      selected
        ? 'border-primary bg-primary/5 text-primary'
        : 'border-border bg-card hover:border-primary/50 hover:bg-accent'
    )}
  >
    {selected && (
      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary" />
    )}
    <span className={cn('font-semibold', compact ? 'text-base' : 'text-lg')}>
      {title}
    </span>
    {description && (
      <span className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
        {description}
      </span>
    )}
  </button>
);

export default InstallationStep;
