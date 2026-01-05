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

      <CardContent className="space-y-8 pt-6">
        {/* DB Reference */}
        <div className="space-y-3">
          <Label htmlFor="db-reference-verify" className="text-sm text-neutral-300">
            DB reference
          </Label>
          <Input
            id="db-reference-verify"
            value={data.dbReference}
            onChange={(e) => onUpdate('dbReference', e.target.value)}
            placeholder="Enter DB reference"
            className="h-12"
          />
        </div>

        {/* Zdb */}
        <div className="space-y-3">
          <Label htmlFor="zdb" className="text-sm text-neutral-300">
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
              className="h-12 pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
              Ω
            </span>
          </div>
        </div>

        {/* Ipf */}
        <div className="space-y-3">
          <Label htmlFor="ipf" className="text-sm text-neutral-300">
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
              className="h-12 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
              kA
            </span>
          </div>
        </div>

        {/* Confirmed Section */}
        <div className="space-y-3 pt-2">
          <Label className="text-sm font-semibold text-foreground">Confirmed</Label>
          
          <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-card/50 transition-colors">
            <Checkbox
              id="correct-polarity"
              checked={data.confirmedCorrectPolarity}
              onCheckedChange={(checked) => onUpdate('confirmedCorrectPolarity', checked === true)}
            />
            <Label htmlFor="correct-polarity" className="text-base text-neutral-300 cursor-pointer leading-relaxed">
              Correct polarity
            </Label>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-card/50 transition-colors">
            <Checkbox
              id="phase-sequence"
              checked={data.confirmedPhaseSequence}
              onCheckedChange={(checked) => onUpdate('confirmedPhaseSequence', checked === true)}
            />
            <Label htmlFor="phase-sequence" className="text-base text-neutral-300 cursor-pointer leading-relaxed">
              Phase sequence
            </Label>
          </div>
        </div>

        {/* SPD Section */}
        <div className="space-y-3 pt-2">
          <Label className="text-sm font-semibold text-foreground">SPD</Label>
          
          <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-card/50 transition-colors">
            <Checkbox
              id="spd-operational"
              checked={data.spdOperationalStatus}
              onCheckedChange={(checked) => onUpdate('spdOperationalStatus', checked === true)}
            />
            <Label htmlFor="spd-operational" className="text-base text-neutral-300 cursor-pointer leading-relaxed">
              Operational status confirmed
            </Label>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-card/50 transition-colors">
            <Checkbox
              id="spd-na"
              checked={data.spdNA}
              onCheckedChange={(checked) => onUpdate('spdNA', checked === true)}
            />
            <Label htmlFor="spd-na" className="text-base text-neutral-300 cursor-pointer leading-relaxed">
              N/A
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributionBoardVerificationSection;
