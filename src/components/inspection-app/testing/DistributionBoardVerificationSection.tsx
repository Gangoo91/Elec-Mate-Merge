import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface DistributionBoardVerificationData {
  dbReference: string;
  zdb: string;
  ipf: string;
  confirmedCorrectPolarity: boolean;
  confirmedPhaseSequence: boolean;
  spdOperationalStatus: boolean;
  spdNA: boolean;
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
          <CheckCircle2 className="h-5 w-5" />
          Distribution Board Verification
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Input Fields - 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* DB Reference */}
          <div className="space-y-2">
            <Label htmlFor="db-reference-verify" className="text-sm text-muted-foreground">
              DB Reference
            </Label>
            <Input
              id="db-reference-verify"
              value={data.dbReference}
              onChange={(e) => onUpdate('dbReference', e.target.value)}
              placeholder="e.g. DB1"
              className="h-10"
            />
          </div>

          {/* Zdb */}
          <div className="space-y-2">
            <Label htmlFor="zdb" className="text-sm text-muted-foreground">
              Z<sub>db</sub> (Ω)
            </Label>
            <div className="relative">
              <Input
                id="zdb"
                type="number"
                step="0.01"
                value={data.zdb}
                onChange={(e) => onUpdate('zdb', e.target.value)}
                placeholder="0.00"
                className="h-10 pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                Ω
              </span>
            </div>
          </div>

          {/* Ipf */}
          <div className="space-y-2">
            <Label htmlFor="ipf" className="text-sm text-muted-foreground">
              I<sub>pf</sub> (kA)
            </Label>
            <div className="relative">
              <Input
                id="ipf"
                type="number"
                step="0.1"
                value={data.ipf}
                onChange={(e) => onUpdate('ipf', e.target.value)}
                placeholder="0.0"
                className="h-10 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                kA
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation Checkboxes - Horizontal */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Confirmed</Label>
          <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="correct-polarity"
                checked={data.confirmedCorrectPolarity}
                onCheckedChange={(checked) => onUpdate('confirmedCorrectPolarity', checked === true)}
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

        {/* SPD Section - Horizontal */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">SPD Status</Label>
          <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="spd-operational"
                checked={data.spdOperationalStatus}
                onCheckedChange={(checked) => onUpdate('spdOperationalStatus', checked === true)}
              />
              <span className="text-sm text-muted-foreground">Operational status confirmed</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer touch-manipulation">
              <Checkbox
                id="spd-na-checkbox"
                checked={data.spdNA}
                onCheckedChange={(checked) => onUpdate('spdNA', checked === true)}
                className="h-5 w-5 border-elec-yellow/50 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <span className="text-sm text-foreground">SPD N/A</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributionBoardVerificationSection;
