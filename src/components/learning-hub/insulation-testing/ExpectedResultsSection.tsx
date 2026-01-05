
import React from 'react';
import { Calculator, AlertTriangle, Eye } from 'lucide-react';

const ExpectedResultsSection = () => (
  <div className="space-y-4">
    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Typical Test Results & Interpretation</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <h5 className="text-foreground font-medium">Excellent Results (PASS)</h5>
          <div className="space-y-1 text-gray-300">
            <p>• New installation: &gt;999MΩ</p>
            <p>• Good existing installation: 50-200MΩ</p>
            <p>• Acceptable older installation: 2-10MΩ</p>
            <p>• All readings consistent across phases</p>
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-foreground font-medium">Problem Indicators (INVESTIGATE)</h5>
          <div className="space-y-1 text-gray-300">
            <p>• Below 1MΩ (BS 7671 minimum)</p>
            <p>• Significant variation between phases</p>
            <p>• Readings that change during test</p>
            <p>• Cannot sustain test voltage</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Common Problems & Solutions</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Problem: Low Readings (&lt;1MΩ)</p>
          <p className="ml-4">→ Check for: Moisture ingress, damaged cables, connected equipment, parallel paths</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Problem: Inconsistent Phase Readings</p>
          <p className="ml-4">→ Check for: Single-phase damage, unbalanced loads, neutral-earth faults</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Problem: Readings Decline During Test</p>
          <p className="ml-4">→ Check for: Insulation stress, capacitive effects, contamination</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Problem: Cannot Apply Test Voltage</p>
          <p className="ml-4">→ Check for: Connected equipment, SPDs, electronic devices still connected</p>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Professional Tips</h4>
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <p>• Always start with lowest test voltage and increase gradually</p>
        <p>• Apply test voltage for full 1 minute - readings may stabilise</p>
        <p>• Check test leads for contamination - clean with isopropyl alcohol</p>
        <p>• Test in dry conditions where possible - humidity affects readings</p>
        <p>• Document temperature at time of test for future reference</p>
        <p>• Beware of stored charge in long cables - always discharge safely</p>
      </div>
    </div>
  </div>
);

export default ExpectedResultsSection;
