import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, FileText, CheckCircle2, AlertTriangle, Target, TrendingUp } from 'lucide-react';

const ScheduleGuideTab = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Test Results Schedule Completion Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-300">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-emerald-400 mb-3">Schedule of Test Results Overview</h4>
          <p className="text-sm mb-3">
            The Schedule of Test Results is a critical component of electrical certificates, providing detailed 
            test measurements for each circuit in the installation. Accurate completion ensures regulatory 
            compliance and installation safety. This document forms the technical backbone of electrical certification, 
            demonstrating that all circuits have been properly tested and meet safety standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Required for:</h5>
              <ul className="space-y-1">
                <li>• Electrical Installation Certificates (EIC) - Mandatory attachment</li>
                <li>• Electrical Installation Condition Reports (EICR) - Sample testing</li>
                <li>• Minor Works Certificates (where applicable) - Limited testing</li>
                <li>• Periodic inspection and testing - Representative circuits</li>
                <li>• Domestic and commercial installations</li>
                <li>• Industrial and special location installations</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Key Information Recorded:</h5>
              <ul className="space-y-1">
                <li>• Circuit identification and description (clear, unambiguous)</li>
                <li>• Protective device ratings and types (MCB, RCBO, RCD)</li>
                <li>• Cable specifications and routing (type, size, method)</li>
                <li>• Test measurements and results (all required tests)</li>
                <li>• Installation conditions and limitations</li>
                <li>• Environmental factors affecting results</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
            <h6 className="font-medium text-blue-400 mb-2">💡 Professional Tip</h6>
            <p className="text-xs">
              The Schedule of Test Results is often the most scrutinised part of electrical certificates. 
              Ensure all values are accurate, within limits, and properly recorded. Any anomalies should 
              be investigated and documented with clear explanations.
            </p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-3">Circuit Information Section - Detailed Guidance</h4>
          <p className="text-sm mb-3">
            The circuit information section must provide clear, unambiguous identification of each circuit. 
            This allows future electricians to understand the installation layout and safely work on the system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Circuit Details - Examples:</h5>
              <ul className="space-y-1">
                <li>• <strong>Circuit Designation:</strong> Clear identification (e.g., "Ground Floor Socket Ring 1")</li>
                <li>• <strong>Circuit Description:</strong> Detailed purpose ("Kitchen sockets, dining room sockets")</li>
                <li>• <strong>Design Current (Ib):</strong> Expected load current in amperes (calculated from load assessment)</li>
                <li>• <strong>MCB/RCBO Rating:</strong> Protective device nominal rating (must be ≥ Ib)</li>
                <li>• <strong>MCB Type:</strong> B (general use), C (motors), or D (heavy industrial)</li>
                <li>• <strong>Breaking Capacity:</strong> kA rating suitable for prospective fault current</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Cable Information - Specifications:</h5>
              <ul className="space-y-1">
                <li>• <strong>Cable Type:</strong> Construction details (e.g., "6242Y Twin and Earth", "SWA")</li>
                <li>• <strong>Cable Size:</strong> Cross-sectional area in mm² (live and earth conductors)</li>
                <li>• <strong>Installation Method:</strong> Reference to BS 7671 Appendix 4 (e.g., "Method C")</li>
                <li>• <strong>Cable Length:</strong> Actual measured length in metres (not estimated)</li>
                <li>• <strong>Voltage Drop:</strong> Calculated value at design current (mV/A/m × Ib × length)</li>
                <li>• <strong>Cable Route:</strong> Description of installation path (for future reference)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
            <h6 className="font-medium text-amber-400 mb-2">⚠️ Common Description Errors</h6>
            <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <strong>Avoid:</strong> "Sockets", "Lights", "Circuit 1"
              </div>
              <div>
                <strong>Use:</strong> "Ground floor socket ring", "Kitchen lighting", "Cooker circuit"
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-amber-400 mb-3">Test Value Recording - Comprehensive Guide</h4>
          <p className="text-sm mb-3">
            Test values must be recorded accurately with appropriate precision. Understanding what each test 
            verifies and typical acceptable values is crucial for proper completion and interpretation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Continuity Tests - Dead Testing:</h5>
              <ul className="space-y-1">
                <li>• <strong>R1 + R2:</strong> Combined line and protective conductor resistance (Ω)</li>
                <li>• <strong>Ring Final Circuits:</strong> End-to-end values (live: ~Ω, neutral: ~Ω, earth: ~Ω)</li>
                <li>• <strong>Cross-connection Test:</strong> (R1+R2)/4 for verification of ring integrity</li>
                <li>• <strong>Main Bonding:</strong> Resistance of equipotential bonding (≤0.05Ω typically)</li>
                <li>• <strong>Supplementary Bonding:</strong> Where required (bathrooms, etc.)</li>
                <li>• <strong>Typical Values:</strong> Lighting circuits 0.5-2.0Ω, socket rings 0.2-1.5Ω</li>
                <li>• <strong>Temperature Correction:</strong> Apply when ambient ≠ 20°C</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Insulation Resistance - Critical Test:</h5>
              <ul className="space-y-1">
                <li>• <strong>Line to Neutral:</strong> Between live conductors (minimum 1.0MΩ)</li>
                <li>• <strong>Line to Earth:</strong> Live conductor to protective conductor (≥1.0MΩ)</li>
                <li>• <strong>Neutral to Earth:</strong> Neutral to protective conductor (≥1.0MΩ)</li>
                <li>• <strong>Test Voltage:</strong> 250V (SELV), 500V (LV), 1000V (where required)</li>
                <li>• <strong>Typical Good Values:</strong> New installations often {'>'}100MΩ</li>
                <li>• <strong>Low Readings:</strong> {'<'}1MΩ requires investigation and remedial action</li>
                <li>• <strong>Environmental Factors:</strong> Humidity, temperature affect readings</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
            <h6 className="font-medium text-blue-400 mb-2">📊 Recording Standards</h6>
            <div className="text-xs grid grid-cols-1 md:grid-cols-3 gap-2">
              <div><strong>Continuity:</strong> Record to 0.01Ω precision</div>
              <div><strong>Insulation:</strong> Record to 0.1MΩ or {'">"'} symbol for high values</div>
              <div><strong>Units:</strong> Always include Ω, MΩ, ms as appropriate</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-purple-400 mb-3">Live Testing Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Earth Fault Loop Impedance (Zs):</h5>
              <ul className="space-y-1">
                <li>• Measured at furthest point of each circuit</li>
                <li>• Value in ohms (Ω) to appropriate precision</li>
                <li>• Must not exceed maximum values in BS 7671</li>
                <li>• Temperature correction may be required</li>
                <li>• Consider parallel earth paths in TN systems</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">RCD Testing:</h5>
              <ul className="space-y-1">
                <li>• <strong>Operating Current:</strong> ½ × IΔn, 1 × IΔn, 5 × IΔn</li>
                <li>• <strong>Operating Time:</strong> Trip times in milliseconds</li>
                <li>• <strong>Test Results:</strong> ✓ for pass, actual time for reference</li>
                <li>• <strong>Test Button:</strong> Verify mechanical test button operation</li>
                <li>• All tests performed at 0° and 180° phase angles</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-red-400 mb-3">Common Schedule Completion Errors</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Recording Errors:</h5>
              <ul className="space-y-1">
                <li>• Incorrect units or decimal places</li>
                <li>• Missing test values or N/A markings</li>
                <li>• Illegible handwriting or corrections</li>
                <li>• Test values exceeding acceptable limits</li>
                <li>• Inconsistent circuit descriptions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Technical Errors:</h5>
              <ul className="space-y-1">
                <li>• Wrong protective device ratings</li>
                <li>• Incorrect cable size specifications</li>
                <li>• Missing RCD test results</li>
                <li>• Temperature correction not applied</li>
                <li>• Polarity test results missing</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-green-400 mb-3">Best Practice Guidelines</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Measurement Accuracy:</h5>
              <ul className="space-y-1">
                <li>• Use calibrated test instruments only</li>
                <li>• Record values to instrument resolution</li>
                <li>• Don't round values unnecessarily</li>
                <li>• Include measurement uncertainty where critical</li>
                <li>• Verify instrument calibration certificates</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Documentation Tips:</h5>
              <ul className="space-y-1">
                <li>• Use clear, legible handwriting</li>
                <li>• Complete all applicable fields</li>
                <li>• Mark N/A for non-applicable tests</li>
                <li>• Include measurement units</li>
                <li>• Sign and date completed schedules</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-400 mb-3">Schedule Completion Checklist</h4>
          <div className="text-sm space-y-2">
            <h5 className="font-medium text-foreground mb-2">Before Finalising:</h5>
            <ul className="space-y-1">
              <li>✓ All circuits are listed and described accurately</li>
              <li>✓ Protective device ratings match installation</li>
              <li>✓ Cable specifications are correctly recorded</li>
              <li>✓ All required tests have been completed</li>
              <li>✓ Test values are within acceptable limits</li>
              <li>✓ Any defects are properly coded and described</li>
              <li>✓ Remedial actions are clearly specified</li>
              <li>✓ Schedule is signed, dated, and properly referenced</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleGuideTab;