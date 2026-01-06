import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, HardHat, Eye, Hand, Footprints, Ear, Zap } from 'lucide-react';
import type { PPEItem } from '@/types/rams';

interface PPEGridViewProps {
  ppeDetails?: PPEEtem[];
  requiredPPE?: string[];
}

const getPPEIcon = (ppeType: string) => {
  const type = ppeType.toLowerCase();
  if (type.includes('helmet') || type.includes('hat')) return HardHat;
  if (type.includes('eye') || type.includes('goggles') || type.includes('glasses')) return Eye;
  if (type.includes('glove')) return Hand;
  if (type.includes('boot') || type.includes('footwear')) return Footprints;
  if (type.includes('ear') || type.includes('hearing')) return Ear;
  if (type.includes('insulated')) return Zap;
  return ShieldCheck;
};

export const PPEGridView: React.FC<PPEGridViewProps> = ({ ppeDetails, requiredPPE }) => {
  const items = ppeDetails && ppeDetails.length > 0 
    ? ppeDetails 
    : requiredPPE?.map((ppe, idx) => ({
        id: 'ppe-' + idx,
        itemNumber: idx + 1,
        ppeType: ppe,
        standard: 'BS EN Standard',
        mandatory: true,
        purpose: 'Required for safety'
      })) || [];

  if (items.length === 0) {
    return (
      <div className="py-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
          </div>
          <h4 className="font-semibold text-white">Required PPE</h4>
        </div>
        <p className="text-sm text-white/50">No PPE requirements specified</p>
      </div>
    );
  }

  return (
    <div className="py-6 border-t border-white/5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
          </div>
          <h4 className="font-semibold text-white">Required PPE</h4>
        </div>
        <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
          {items.length} items
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const Icon = getPPEIcon(item.ppeType);
          return (
            <div
              key={item.id}
              className={[
                'inline-flex items-center gap-2 px-3 py-2 rounded-full border transition-all',
                item.mandatory 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-white/[0.03] border-white/10 text-white/70'
              ].join(' ')}
            >
              <Icon className="h-4 hw-4" />
              <span className="text-sm font-medium">{item.ppeType}</span>
              {item.mandatory && (
                <span className="text-xs bg-red-500/20 px-1.5 py-0.5 rounded-full">Required</span>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};