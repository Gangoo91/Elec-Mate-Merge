import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="space-y-4">
      {/* DB Reference, Zdb, Ipf */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-white/80 block mb-1">DB Reference</label>
          <Input
            value={data.dbReference}
            onChange={(e) => onUpdate('dbReference', e.target.value)}
            placeholder="Main DB"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </div>
        <div>
          <label className="text-xs text-white/80 block mb-1">Zdb (Ω)</label>
          <Input
            value={data.zdb}
            onChange={(e) => onUpdate('zdb', e.target.value)}
            placeholder="0.25"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            inputMode="decimal"
          />
        </div>
        <div>
          <label className="text-xs text-white/80 block mb-1">Ipf (kA)</label>
          <Input
            value={data.ipf}
            onChange={(e) => onUpdate('ipf', e.target.value)}
            placeholder="1.2"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            inputMode="decimal"
          />
        </div>
      </div>

      {/* Verification */}
      <div>
        <label className="text-xs text-white/80 block mb-2">Verification</label>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2.5 h-11 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer touch-manipulation">
            <Checkbox
              checked={data.confirmedCorrectPolarity}
              onCheckedChange={(checked) => onUpdate('confirmedCorrectPolarity', checked === true)}
              className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-sm text-white">Polarity</span>
          </label>
          <label className="flex items-center gap-2.5 h-11 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer touch-manipulation">
            <Checkbox
              checked={data.confirmedPhaseSequence}
              onCheckedChange={(checked) => onUpdate('confirmedPhaseSequence', checked === true)}
              className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-sm text-white">Phase Seq</span>
          </label>
        </div>
      </div>

      {/* SPD */}
      <div>
        <label className="text-xs text-white/80 block mb-2">Surge Protection (SPD)</label>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2.5 h-11 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer touch-manipulation">
            <Checkbox
              checked={data.spdOperationalStatus}
              onCheckedChange={(checked) => onUpdate('spdOperationalStatus', checked === true)}
              disabled={data.spdNA}
              className="border-white/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            <span className={`text-sm ${data.spdNA ? 'text-white/30' : 'text-white'}`}>SPD OK</span>
          </label>
          <label className="flex items-center gap-2.5 h-11 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer touch-manipulation">
            <Checkbox
              checked={data.spdNA}
              onCheckedChange={(checked) => {
                onUpdate('spdNA', checked === true);
                if (checked) onUpdate('spdOperationalStatus', false);
              }}
              className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-sm text-white">N/A</span>
          </label>
        </div>

        {/* SPD Details */}
        {!data.spdNA && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white/80 block mb-1">SPD Type</label>
                <Select value={data.spdType || ''} onValueChange={(v) => onUpdate('spdType', v)}>
                  <SelectTrigger className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Type 1">Type 1</SelectItem>
                    <SelectItem value="Type 2">Type 2</SelectItem>
                    <SelectItem value="Type 3">Type 3</SelectItem>
                    <SelectItem value="Type 1+2">Type 1+2</SelectItem>
                    <SelectItem value="Type 2+3">Type 2+3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-white/80 block mb-1">Location</label>
                <Input
                  value={data.spdLocation || ''}
                  onChange={(e) => onUpdate('spdLocation', e.target.value)}
                  placeholder="Main DB"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-white/80 block mb-1">Make</label>
                <Input
                  value={data.spdMake || ''}
                  onChange={(e) => onUpdate('spdMake', e.target.value)}
                  placeholder="Hager"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </div>
              <div>
                <label className="text-xs text-white/80 block mb-1">Model</label>
                <Input
                  value={data.spdModel || ''}
                  onChange={(e) => onUpdate('spdModel', e.target.value)}
                  placeholder="SPN115"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </div>
              <div>
                <label className="text-xs text-white/80 block mb-1">kA</label>
                <Input
                  value={data.spdRatedCurrentKa || ''}
                  onChange={(e) => onUpdate('spdRatedCurrentKa', e.target.value)}
                  placeholder="12.5"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                  inputMode="decimal"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionBoardVerificationSection;
