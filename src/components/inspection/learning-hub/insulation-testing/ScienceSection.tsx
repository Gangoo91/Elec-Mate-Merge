
import React from 'react';
import { Activity, Thermometer } from 'lucide-react';

const ScienceSection = () => (
  <div className="space-y-6">
    
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Physics of Insulation Testing</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="border-l-4 border-blue-400 pl-4">
          <p className="font-medium text-foreground mb-1">Ohm's Law Application</p>
          <p className="text-xs sm:text-sm">R = V / I → Higher voltage reveals insulation weaknesses through increased stress</p>
        </div>
        <div className="border-l-4 border-blue-400 pl-4">
          <p className="font-medium text-foreground mb-1">Dielectric Strength</p>
          <p className="text-xs sm:text-sm">Insulation materials break down when electric field exceeds their dielectric strength</p>
        </div>
        <div className="border-l-4 border-blue-400 pl-4">
          <p className="font-medium text-foreground mb-1">Leakage Current</p>
          <p className="text-xs sm:text-sm">Even good insulation allows tiny current flow - we measure this to assess condition</p>
        </div>
        <div className="border-l-4 border-blue-400 pl-4">
          <p className="font-medium text-foreground mb-1">Temperature Coefficient</p>
          <p className="text-xs sm:text-sm">Most insulation materials follow exponential temperature relationship (7% per °C)</p>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Why Temperature Correction Matters</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="flex items-start gap-2">
          <span className="text-green-400 font-bold">•</span>
          <div><strong>Consistent Standards:</strong> BS 7671 specifies minimum values at 20°C reference temperature</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-400 font-bold">•</span>
          <div><strong>Fair Assessment:</strong> Cables tested in winter (cold) naturally show higher resistance</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-400 font-bold">•</span>
          <div><strong>Accurate Diagnosis:</strong> Temperature correction reveals true insulation condition</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-400 font-bold">•</span>
          <div><strong>Trending Analysis:</strong> Allows comparison of test results taken at different times/temperatures</div>
        </div>
      </div>
    </div>
  </div>
);

export default ScienceSection;
