
import React from 'react';
import { Eye } from 'lucide-react';

const InsulationBreakdownDiagram = () => (
  <div className="bg-background p-4 rounded-lg border border-border">
    <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
      <Eye className="h-4 w-4 text-red-400" />
      Understanding Insulation Breakdown
    </h4>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-card p-4 rounded">
        <div className="text-green-400 font-medium mb-2">✓ Good Insulation</div>
        <div className="border-2 border-green-400 p-3 rounded">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
            <span className="text-red-400 text-sm font-medium">Live</span>
            <span className="text-green-400 text-xs sm:text-sm text-center">Good Insulation (&gt;1MΩ)</span>
            <span className="text-blue-400 text-sm font-medium">Neutral</span>
          </div>
          <div className="text-center text-xs text-white/80 mt-2">
            Current flow: &lt;1μA (negligible)
          </div>
        </div>
        <div className="text-xs text-white/80 mt-2">
          High resistance prevents current flow
        </div>
      </div>
      <div className="bg-card p-4 rounded">
        <div className="text-red-400 font-medium mb-2">✗ Poor Insulation</div>
        <div className="border-2 border-red-400 p-3 rounded">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
            <span className="text-red-400 text-sm font-medium">Live</span>
            <span className="text-red-400 text-xs sm:text-sm text-center">Poor Insulation (&lt;1MΩ)</span>
            <span className="text-blue-400 text-sm font-medium">Neutral</span>
          </div>
          <div className="text-center text-xs text-white/80 mt-2">
            Current flow: &gt;1mA (dangerous)
          </div>
        </div>
        <div className="text-xs text-red-400 mt-2">
          Low resistance allows leakage current
        </div>
      </div>
    </div>
  </div>
);

export default InsulationBreakdownDiagram;
