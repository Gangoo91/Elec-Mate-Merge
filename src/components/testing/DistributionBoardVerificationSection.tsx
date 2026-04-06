import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';

interface DistributionBoardVerificationData {
  dbReference: string;
  zdb: string;
  ipf: string;
  confirmedCorrectPolarity: boolean;
  confirmedPhaseSequence: boolean;
  spdOperationalStatus: boolean;
  spdNA: boolean;
  spdType?: string;
  spdLocation?: string;
  spdMake?: string;
  spdModel?: string;
  spdRatedCurrentKa?: string;
}

interface DistributionBoardVerificationSectionProps {
  data: DistributionBoardVerificationData;
  onUpdate: (field: keyof DistributionBoardVerificationData, value: string | boolean) => void;
}

const DistributionBoardVerificationSection: React.FC<DistributionBoardVerificationSectionProps> = ({
  data,
  onUpdate,
}) => {
  return (
    <Card className="bg-gradient-to-r from-elec-gray/10 to-elec-gray/5 border-elec-yellow/30 shadow-lg">
      <CardHeader className="pb-4 bg-elec-gray/5 border-b border-elec-yellow/20">
        <CardTitle className="text-base flex items-center gap-2 text-elec-gray">
          <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
          Distribution Board Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* DB Reference, Zdb, Ipf */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">DB Reference</Label>
            <Input
              value={data.dbReference}
              onChange={(e) => onUpdate('dbReference', e.target.value)}
              placeholder="e.g. Main DB"
              className="h-11 text-base touch-manipulation"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Zdb (Ω)</Label>
            <Input
              value={data.zdb}
              onChange={(e) => onUpdate('zdb', e.target.value)}
              placeholder="e.g. 0.25"
              className="h-11 text-base touch-manipulation"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Ipf (kA)</Label>
            <Input
              value={data.ipf}
              onChange={(e) => onUpdate('ipf', e.target.value)}
              placeholder="e.g. 1.2"
              className="h-11 text-base touch-manipulation"
            />
          </div>
        </div>

        {/* Polarity & Phase */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Verification</Label>
          <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="correct-polarity"
                checked={data.confirmedCorrectPolarity}
                onCheckedChange={(checked) =>
                  onUpdate('confirmedCorrectPolarity', checked === true)
                }
              />
              <span className="text-sm text-muted-foreground">Correct polarity</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="phase-sequence"
                checked={data.confirmedPhaseSequence}
                onCheckedChange={(checked) => onUpdate('confirmedPhaseSequence', checked === true)}
              />
              <span className="text-sm text-muted-foreground">Phase sequence</span>
            </label>
          </div>
        </div>

        {/* SPD Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Surge Protection Device (SPD)</Label>
          <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="spd-operational"
                checked={data.spdOperationalStatus}
                onCheckedChange={(checked) => onUpdate('spdOperationalStatus', checked === true)}
                disabled={data.spdNA}
              />
              <span className="text-sm text-muted-foreground">Operational status confirmed</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer touch-manipulation">
              <Checkbox
                id="spd-na-checkbox"
                checked={data.spdNA}
                onCheckedChange={(checked) => {
                  onUpdate('spdNA', checked === true);
                  if (checked) onUpdate('spdOperationalStatus', false);
                }}
                className="h-5 w-5 border-elec-yellow/50 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <span className="text-sm text-foreground">SPD N/A</span>
            </label>
          </div>

          {/* SPD Details — shown when SPD is present (not N/A) */}
          {!data.spdNA && (
            <div className="space-y-3 p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">SPD Type</Label>
                  <Select
                    value={data.spdType || ''}
                    onValueChange={(v) => onUpdate('spdType', v)}
                  >
                    <SelectTrigger className="h-11 text-base touch-manipulation">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Type 1">Type 1</SelectItem>
                      <SelectItem value="Type 2">Type 2</SelectItem>
                      <SelectItem value="Type 3">Type 3</SelectItem>
                      <SelectItem value="Type 1+2">Type 1+2 (combined)</SelectItem>
                      <SelectItem value="Type 2+3">Type 2+3 (combined)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Location</Label>
                  <Input
                    value={data.spdLocation || ''}
                    onChange={(e) => onUpdate('spdLocation', e.target.value)}
                    placeholder="e.g. Main DB"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Make</Label>
                  <Input
                    value={data.spdMake || ''}
                    onChange={(e) => onUpdate('spdMake', e.target.value)}
                    placeholder="e.g. Hager"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Model</Label>
                  <Input
                    value={data.spdModel || ''}
                    onChange={(e) => onUpdate('spdModel', e.target.value)}
                    placeholder="e.g. SPN115"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Rated Current (kA)</Label>
                  <Input
                    value={data.spdRatedCurrentKa || ''}
                    onChange={(e) => onUpdate('spdRatedCurrentKa', e.target.value)}
                    placeholder="e.g. 12.5"
                    className="h-11 text-base touch-manipulation"
                    inputMode="decimal"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributionBoardVerificationSection;
