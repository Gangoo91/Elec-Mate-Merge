
import React from 'react';
import { TrendingUp } from 'lucide-react';

const TemperatureEffectsDiagram = () => (
  <div className="bg-background p-4 rounded-lg border border-border">
    <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
      <TrendingUp className="h-4 w-4 text-blue-400" />
      Temperature Effects on Insulation
    </h4>
    <div className="bg-card p-4 rounded">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm">
        <div className="border border-blue-400 p-3 rounded min-h-[100px] flex flex-col justify-center">
          <div className="text-blue-400 font-medium text-sm sm:text-base">Cold (0°C)</div>
          <div className="text-foreground text-lg sm:text-xl font-bold">2× Higher</div>
          <div className="text-white/80 text-xs sm:text-sm">Resistance increases</div>
        </div>
        <div className="border border-green-400 p-3 rounded min-h-[100px] flex flex-col justify-center">
          <div className="text-green-400 font-medium text-sm sm:text-base">Standard (20°C)</div>
          <div className="text-foreground text-lg sm:text-xl font-bold">Baseline</div>
          <div className="text-white/80 text-xs sm:text-sm">Reference temp</div>
        </div>
        <div className="border border-red-400 p-3 rounded min-h-[100px] flex flex-col justify-center">
          <div className="text-red-400 font-medium text-sm sm:text-base">Hot (40°C)</div>
          <div className="text-foreground text-lg sm:text-xl font-bold">½× Lower</div>
          <div className="text-white/80 text-xs sm:text-sm">Resistance decreases</div>
        </div>
      </div>
      <div className="mt-4 text-center bg-muted rounded p-3">
        <div className="text-yellow-400 text-sm sm:text-base font-medium">7% change per °C</div>
        <div className="text-white/80 text-xs sm:text-sm mt-2 font-mono break-all">
          Formula: R₂₀ = R_measured × 1.07^(20-T_measured)
        </div>
      </div>
    </div>
  </div>
);

export default TemperatureEffectsDiagram;
