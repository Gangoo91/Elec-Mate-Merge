
import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

const PracticalGuidanceSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">What to Check - Socket Outlets</h4>
      </div>
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <p>• <strong>Phase terminal:</strong> Right-hand terminal when viewed from front</p>
        <p>• <strong>Neutral terminal:</strong> Left-hand terminal when viewed from front</p>
        <p>• <strong>Earth terminal:</strong> Top terminal (correct by design)</p>
        <p>• <strong>Fused connection units:</strong> Phase must connect to fuse</p>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">What to Check - Lighting</h4>
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <p>• <strong>Switch connections:</strong> Phase conductor switched, not neutral</p>
        <p>• <strong>Edison screw fittings:</strong> Phase to centre contact, neutral to thread</p>
        <p>• <strong>Bayonet fittings:</strong> Phase to centre contact</p>
        <p>• <strong>Two-way switching:</strong> Common terminal receives phase</p>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 border-l-4 border-l-yellow-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-yellow-400">What to Check - Isolators & Protection</h4>
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <p>• <strong>Single-pole MCBs:</strong> Connected in phase conductor only</p>
        <p>• <strong>Isolator switches:</strong> Break phase conductor, not neutral</p>
        <p>• <strong>Fused spurs:</strong> Fuse in phase conductor</p>
        <p>• <strong>Emergency switches:</strong> Interrupt phase supply</p>
      </div>
    </div>
  </div>
);

export default PracticalGuidanceSection;
