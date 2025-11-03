import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, HardHat, Eye, Hand, Footprints, Ear, Zap } from 'lucide-react';
import type { PPEItem } from '@/types/rams';

interface PPEGridViewProps {
  ppeDetails?: PPEItem[];
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
  // Use ppeDetails if available, otherwise fall back to requiredPPE
  const items = ppeDetails && ppeDetails.length > 0 
    ? ppeDetails 
    : requiredPPE?.map((ppe, idx) => ({
        id: `ppe-${idx}`,
        itemNumber: idx + 1,
        ppeType: ppe,
        standard: 'BS EN Standard',
        mandatory: true,
        purpose: 'Required for safety'
      })) || [];

  if (items.length === 0) {
    return (
      <Card className="bg-card border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-elec-light flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
            Required PPE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-elec-light/60">No PPE requirements specified</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-elec-yellow/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-elec-light flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-elec-yellow" />
          Required PPE ({items.length} items)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item) => {
            const Icon = getPPEIcon(item.ppeType);
            return (
              <div
                key={item.id}
                className="relative bg-gradient-to-br from-elec-gray to-elec-gray/80 rounded-xl p-4 border border-elec-yellow/30 hover:border-elec-yellow/60 transition-all hover:scale-105 group"
              >
                {/* Item Number Badge */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-elec-yellow/20 text-elec-yellow rounded-full flex items-center justify-center text-xs font-bold border border-elec-yellow/40">
                  {item.itemNumber}
                </div>

                {/* Icon */}
                <div className="mb-3">
                  <div className="w-12 h-12 bg-elec-yellow/10 rounded-lg flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors">
                    <Icon className="h-6 w-6 text-elec-yellow" />
                  </div>
                </div>

                {/* PPE Name */}
                <h4 className="font-bold text-elec-light mb-2 text-sm">
                  {item.ppeType}
                </h4>

                {/* Standard Badge */}
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs mb-2">
                  {item.standard}
                </Badge>

                {/* Mandatory/Recommended Badge */}
                <div className="mb-2">
                  <Badge className={item.mandatory 
                    ? "bg-red-500/20 text-red-400 border-red-500/40 text-xs" 
                    : "bg-gray-500/20 text-gray-400 border-gray-500/40 text-xs"
                  }>
                    {item.mandatory ? 'MANDATORY' : 'Recommended'}
                  </Badge>
                </div>

                {/* Purpose */}
                <p className="text-xs text-elec-light/70 leading-relaxed">
                  {item.purpose}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
