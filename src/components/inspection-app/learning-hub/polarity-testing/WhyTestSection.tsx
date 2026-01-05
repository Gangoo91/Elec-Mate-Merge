
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

const WhyTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-red-500/10 border border-red-500/20 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-red-400">Why Polarity Testing is Critical</h4>
      </div>
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <p>• <strong>Safety:</strong> Incorrect polarity can make normally safe parts live and dangerous</p>
        <p>• <strong>Protection:</strong> Single-pole devices must interrupt the phase conductor, not neutral</p>
        <p>• <strong>Standards:</strong> BS 7671 requires correct polarity throughout the installation</p>
        <p>• <strong>Functionality:</strong> Some equipment relies on correct phase/neutral identification</p>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Common Polarity Hazards</h4>
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <p>• <strong>Socket outlets:</strong> Reversed connections can energise equipment cases</p>
        <p>• <strong>Light switches:</strong> Neutral switching leaves lamp holders permanently live</p>
        <p>• <strong>Edison screw fittings:</strong> Outer contact becomes live if phase/neutral reversed</p>
        <p>• <strong>Isolator switches:</strong> May not isolate properly if neutral is switched</p>
      </div>
    </div>
  </div>
);

export default WhyTestSection;
