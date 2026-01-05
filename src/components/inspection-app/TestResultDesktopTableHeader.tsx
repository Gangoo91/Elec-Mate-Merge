import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TestResultDesktopTableHeaderProps {
  showRegulationStatus?: boolean;
}

const TestResultDesktopTableHeader: React.FC<TestResultDesktopTableHeaderProps> = ({
  showRegulationStatus = false
}) => {
  return (
    <TableHeader className="bg-neutral-100 sticky top-0 z-30">
      <TableRow className="hover:bg-neutral-100">
        {/* Row Number Column - Sticky Left */}
        <TableHead className="w-12 sticky left-0 z-50 bg-neutral-100 text-xs font-semibold text-primary text-center">
          #
        </TableHead>

        {/* Circuit Details Group - Blue tint */}
        <TableHead className="w-12 sticky left-[48px] z-45 bg-blue-50 text-xs font-semibold text-primary px-1">Cct</TableHead>
        <TableHead className="w-10 text-xs font-semibold text-primary px-1 bg-blue-50/40">Phase</TableHead>
        <TableHead className="w-40 sticky left-[108px] z-40 text-xs font-semibold text-primary px-1 bg-blue-50">Description</TableHead>
        <TableHead className="w-16 text-xs font-semibold text-primary px-1 bg-blue-50/40">Ref</TableHead>
        <TableHead className="w-12 text-xs font-semibold text-primary px-1 bg-blue-50/40">Points</TableHead>
        
        {/* Conductor Details Group - Green tint */}
        <TableHead className="w-16 text-xs font-semibold text-primary px-1 bg-green-50/40">Live (mm²)</TableHead>
        <TableHead className="w-16 text-xs font-semibold text-primary px-1 bg-green-50/40">CPC (mm²)</TableHead>
        
        {/* Protective Device Group - Amber tint */}
        <TableHead className="w-24 text-xs font-semibold text-primary px-1 bg-amber-50/40">Device Type</TableHead>
        <TableHead className="w-12 text-xs font-semibold text-primary px-1 bg-amber-50/40">Curve</TableHead>
        <TableHead className="w-12 text-xs font-semibold text-primary px-1 bg-amber-50/40">Rating (A)</TableHead>
        <TableHead className="w-12 text-xs font-semibold text-primary px-1 bg-amber-50/40">kA</TableHead>
        <TableHead className="w-24 text-xs font-semibold text-primary px-1 bg-amber-50/40">BS EN</TableHead>
        
        {/* Continuity Tests Group - Purple tint */}
        <TableHead className="w-18 text-xs font-semibold text-primary px-1 bg-purple-50/40">R₁+R₂ (Ω)</TableHead>
        <TableHead className="w-14 text-xs font-semibold text-primary px-1 bg-purple-50/40">r1 (Ω)</TableHead>
        <TableHead className="w-14 text-xs font-semibold text-primary px-1 bg-purple-50/40">rn (Ω)</TableHead>
        <TableHead className="w-14 text-xs font-semibold text-primary px-1 bg-purple-50/40">r2 (Ω)</TableHead>
        <TableHead className="w-18 text-xs font-semibold text-primary px-1 bg-purple-50/40">Ring L (Ω)</TableHead>
        <TableHead className="w-18 text-xs font-semibold text-primary px-1 bg-purple-50/40">Ring N (Ω)</TableHead>
        
        {/* Insulation Tests Group - Rose tint */}
        <TableHead className="w-14 text-xs font-semibold text-primary px-1 text-center bg-rose-50/40">Test V</TableHead>
        <TableHead className="w-18 text-xs font-semibold text-primary px-1 text-center bg-rose-50/40">Insul (MΩ)</TableHead>
        
        {/* Other Tests Group - Cyan tint */}
        <TableHead className="w-10 text-xs font-semibold text-primary px-1 text-center bg-cyan-50/40">Pol</TableHead>
        <TableHead className="w-16 text-xs font-semibold text-primary px-1 text-center bg-cyan-50/40">Zs (Ω)</TableHead>
        <TableHead className="w-18 text-xs font-semibold text-primary px-1 text-center bg-cyan-50/40">Max Zs (Ω)</TableHead>
        
        {/* RCD Tests Group - Indigo tint */}
        <TableHead className="w-16 text-xs font-semibold text-primary px-1 text-center bg-indigo-50/40">RCD (mA)</TableHead>
        <TableHead className="w-16 text-xs font-semibold text-primary px-1 text-center bg-indigo-50/40">1×In (ms)</TableHead>
        <TableHead className="w-10 text-xs font-semibold text-primary px-1 text-center bg-indigo-50/40">Btn</TableHead>
        
        {/* AFDD Test - Violet tint */}
        <TableHead className="w-10 text-xs font-semibold text-primary px-1 text-center bg-violet-50/40">AFDD</TableHead>
        
        {/* PFC and Final Group - Emerald tint */}
        <TableHead className="w-16 text-xs font-semibold text-primary px-1 text-center bg-emerald-50/40">PFC (kA)</TableHead>
        <TableHead className="w-18 text-xs font-semibold text-primary px-1 text-center bg-emerald-50/40">Func</TableHead>
        
        {/* Regulation Status Column */}
        {showRegulationStatus && (
          <TableHead className="w-20 font-semibold text-primary bg-neutral-50">BS 7671</TableHead>
        )}

        {/* Actions Column - Sticky Right */}
        <TableHead className="w-16 sticky right-0 z-40 bg-neutral-100 font-semibold text-primary text-center">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TestResultDesktopTableHeader;
