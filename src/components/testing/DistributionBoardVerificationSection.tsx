import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

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
    <div className="space-y-4">
      {/* DB Reference - Full Width */}
      <div className="space-y-2">
        <Label htmlFor="db-reference-verify" className="text-xs font-medium text-white/70 uppercase tracking-wide">
          DB Reference
        </Label>
        <Input
          id="db-reference-verify"
          value={data.dbReference}
          onChange={(e) => onUpdate('dbReference', e.target.value)}
          placeholder="e.g. Main CU, Sub-DB1"
          className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50"
        />
      </div>

      {/* Zdb and Ipf - Two Column */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="zdb" className="text-xs font-medium text-white/70 uppercase tracking-wide">
            Z<sub className="text-[10px]">db</sub> (Ω)
          </Label>
          <div className="relative">
            <Input
              id="zdb"
              type="number"
              step="0.01"
              value={data.zdb}
              onChange={(e) => onUpdate('zdb', e.target.value)}
              placeholder="0.00"
              className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50 pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">Ω</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ipf" className="text-xs font-medium text-white/70 uppercase tracking-wide">
            I<sub className="text-[10px]">pf</sub> (kA)
          </Label>
          <div className="relative">
            <Input
              id="ipf"
              type="number"
              step="0.1"
              value={data.ipf}
              onChange={(e) => onUpdate('ipf', e.target.value)}
              placeholder="0.0"
              className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">kA</span>
          </div>
        </div>
      </div>

      {/* Confirmed & SPD - Compact Checkboxes */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        {/* Confirmed Section */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-white/70 uppercase tracking-wide">Confirmed</Label>
          <div className="space-y-1">
            <label
              htmlFor="correct-polarity"
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5 active:scale-[0.98]",
                data.confirmedCorrectPolarity && "bg-green-500/10 border border-green-500/20"
              )}
            >
              <Checkbox
                id="correct-polarity"
                checked={data.confirmedCorrectPolarity}
                onCheckedChange={(checked) => onUpdate('confirmedCorrectPolarity', checked === true)}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <span className="text-sm text-white/80">Polarity</span>
            </label>

            <label
              htmlFor="phase-sequence"
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5 active:scale-[0.98]",
                data.confirmedPhaseSequence && "bg-green-500/10 border border-green-500/20"
              )}
            >
              <Checkbox
                id="phase-sequence"
                checked={data.confirmedPhaseSequence}
                onCheckedChange={(checked) => onUpdate('confirmedPhaseSequence', checked === true)}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <span className="text-sm text-white/80">Phase sequence</span>
            </label>
          </div>
        </div>

        {/* SPD Section */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-white/70 uppercase tracking-wide">SPD Status</Label>
          <div className="space-y-1">
            <label
              htmlFor="spd-operational"
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5 active:scale-[0.98]",
                data.spdOperationalStatus && "bg-green-500/10 border border-green-500/20"
              )}
            >
              <Checkbox
                id="spd-operational"
                checked={data.spdOperationalStatus}
                onCheckedChange={(checked) => onUpdate('spdOperationalStatus', checked === true)}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <span className="text-sm text-white/80">Operational</span>
            </label>

            <label
              htmlFor="spd-na"
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                "hover:bg-white/5 active:scale-[0.98]",
                data.spdNA && "bg-white/5 border border-white/10"
              )}
            >
              <Checkbox
                id="spd-na"
                checked={data.spdNA}
                onCheckedChange={(checked) => onUpdate('spdNA', checked === true)}
              />
              <span className="text-sm text-white/80">N/A</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionBoardVerificationSection;
