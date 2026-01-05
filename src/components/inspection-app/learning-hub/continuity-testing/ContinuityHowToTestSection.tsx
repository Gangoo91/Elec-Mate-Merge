
import React from 'react';
import { TestTube2, Zap, Settings, AlertTriangle, CheckCircle2, Calculator } from 'lucide-react';

const ContinuityHowToTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <TestTube2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Test Equipment Requirements</h4>
      </div>
      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Approved Test Instruments:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Low resistance ohmmeter</strong> (preferred method)</p>
              <p>• <strong>Continuity tester</strong> with adequate test current</p>
              <p>• <strong>Multimeter</strong> with low resistance capability</p>
              <p>• <strong>Insulation and continuity tester</strong> (combined unit)</p>
              <p>• <strong>Calibration certificate</strong> must be current</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Technical Specifications:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Test current:</strong> Minimum 200mA DC for protective conductors</p>
              <p>• <strong>Resolution:</strong> 0.01Ω or better for accurate readings</p>
              <p>• <strong>Accuracy:</strong> ±2% of reading or better</p>
              <p>• <strong>Test voltage:</strong> 4-24V DC (varies by manufacturer)</p>
              <p>• <strong>Safety category:</strong> CAT III 300V minimum</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Test Lead Considerations:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Lead Resistance:</p>
              <p>• Must be known and recorded</p>
              <p>• Subtracted from test readings</p>
              <p>• Typically 0.01-0.05Ω per lead</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Lead Quality:</p>
              <p>• Robust construction essential</p>
              <p>• Good contact with test probes</p>
              <p>• Adequate current carrying capacity</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Lead Safety:</p>
              <p>• Insulated for working voltage</p>
              <p>• Finger guards on probes</p>
              <p>• Regular visual inspection</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">R1+R2 Test Method (Preferred)</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Step-by-step R1+R2 testing procedure:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-green-400 mb-2">Preparation Phase:</p>
              <div className="space-y-1 text-xs">
                <p><strong>1.</strong> Ensure circuit is safely isolated and locked off</p>
                <p><strong>2.</strong> Remove all lamps, equipment, and accessories</p>
                <p><strong>3.</strong> Identify phase and CPC at distribution board</p>
                <p><strong>4.</strong> Check test instrument calibration and leads</p>
                <p><strong>5.</strong> Measure and record test lead resistance</p>
              </div>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-green-400 mb-2">Testing Phase:</p>
              <div className="space-y-1 text-xs">
                <p><strong>6.</strong> Connect test leads to phase and CPC at board</p>
                <p><strong>7.</strong> Go to furthest point of circuit</p>
                <p><strong>8.</strong> Connect phase and CPC terminals together</p>
                <p><strong>9.</strong> Take reading on test instrument</p>
                <p><strong>10.</strong> Subtract test lead resistance from reading</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="font-medium text-blue-400 mb-2">Why R1+R2 Method is Preferred:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Practical Advantages:</p>
              <p>• Tests complete fault path (phase + protective conductor)</p>
              <p>• No temporary links required at distribution board</p>
              <p>• Directly measures impedance for fault calculations</p>
              <p>• Suitable for all circuit types and configurations</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Safety Benefits:</p>
              <p>• Minimal disturbance to distribution board</p>
              <p>• Reduces risk of incorrect reconnection</p>
              <p>• Clear indication of complete circuit integrity</p>
              <p>• Easier to identify and locate faults</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">R2 Test Method (Alternative)</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Alternative R2 testing procedure when R1+R2 is not practical:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-purple-400 mb-2">Setup Phase:</p>
              <div className="space-y-1 text-xs">
                <p><strong>1.</strong> Ensure circuit is safely isolated</p>
                <p><strong>2.</strong> Install temporary link between phase and CPC at board</p>
                <p><strong>3.</strong> Ensure good electrical connection</p>
                <p><strong>4.</strong> Verify link is secure and safe</p>
                <p><strong>5.</strong> Prepare test equipment and leads</p>
              </div>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-purple-400 mb-2">Testing Phase:</p>
              <div className="space-y-1 text-xs">
                <p><strong>6.</strong> Go to circuit end point</p>
                <p><strong>7.</strong> Connect test leads between phase and CPC terminals</p>
                <p><strong>8.</strong> Take resistance reading (this is R2)</p>
                <p><strong>9.</strong> Return to board and remove temporary link</p>
                <p><strong>10.</strong> Calculate R1+R2 if required for design verification</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
          <p className="font-medium text-orange-400 mb-2">When to Use R2 Method:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Suitable Situations:</p>
              <p>• Ring circuits where R1+R2 method is complex</p>
              <p>• Circuits with multiple cable types</p>
              <p>• When phase conductor access is limited</p>
              <p>• Existing installations with unknown cable types</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Limitations:</p>
              <p>• Only tests protective conductor</p>
              <p>• Requires calculation for R1+R2 value</p>
              <p>• Additional steps and temporary connections</p>
              <p>• Potential for reconnection errors</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Ring Circuit Testing Procedure</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Comprehensive ring circuit continuity verification:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-cyan-400 mb-2">Phase 1: Ring Continuity</p>
              <div className="space-y-1 text-xs">
                <p><strong>1.</strong> Identify ring circuit conductors at board</p>
                <p><strong>2.</strong> Test between phase conductors (should be ~R1)</p>
                <p><strong>3.</strong> Test between neutral conductors (should be ~R1)</p>
                <p><strong>4.</strong> Test between CPC conductors (should be ~R2)</p>
                <p><strong>5.</strong> Record all readings for comparison</p>
              </div>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-cyan-400 mb-2">Phase 2: End-to-End Testing</p>
              <div className="space-y-1 text-xs">
                <p><strong>6.</strong> Cross-connect phase and neutral at board</p>
                <p><strong>7.</strong> Test at each socket outlet on ring</p>
                <p><strong>8.</strong> All readings should be approximately equal</p>
                <p><strong>9.</strong> Significant variation indicates ring break</p>
                <p><strong>10.</strong> Repeat for CPC with appropriate cross-connection</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Ring Circuit Expected Results:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Leg-to-Leg Tests:</p>
              <p>• Phase leg-to-leg: ~R1 value</p>
              <p>• Neutral leg-to-leg: ~R1 value</p>
              <p>• CPC leg-to-leg: ~R2 value</p>
              <p>• Values should be approximately equal</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">End-to-End Tests:</p>
              <p>• All socket outlets: (R1+R2)/4</p>
              <p>• Consistent readings around ring</p>
              <p>• Maximum deviation: ±0.05Ω</p>
              <p>• Total R1+R2 must be ≤1.67Ω</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Fault Indications:</p>
              <p>• Infinite reading: broken conductor</p>
              <p>• Very high reading: poor connection</p>
              <p>• Inconsistent readings: ring not intact</p>
              <p>• Zero reading: short circuit</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Common Testing Errors and Solutions</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-red-400 mb-2">Common Errors:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Inadequate test current:</strong> Using basic multimeter</p>
              <p>• <strong>Parallel paths:</strong> Not isolating all connections</p>
              <p>• <strong>Test lead resistance:</strong> Not compensating for lead resistance</p>
              <p>• <strong>Poor connections:</strong> Inadequate probe contact</p>
              <p>• <strong>Wrong terminals:</strong> Testing incorrect conductors</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Solutions:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Use approved instruments:</strong> Minimum 200mA test current</p>
              <p>• <strong>Proper isolation:</strong> Remove all parallel paths</p>
              <p>• <strong>Measure lead resistance:</strong> Null or compensate readings</p>
              <p>• <strong>Ensure good contact:</strong> Clean terminals and probes</p>
              <p>• <strong>Verify connections:</strong> Double-check conductor identification</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Troubleshooting High Resistance Readings:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Potential Causes:</p>
              <p>• Loose terminal connections</p>
              <p>• Corroded or damaged conductors</p>
              <p>• Inadequate cable sizing</p>
              <p>• Poor crimped connections</p>
              <p>• Damaged cable during installation</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Investigation Steps:</p>
              <p>• Visual inspection of all connections</p>
              <p>• Test individual cable sections</p>
              <p>• Check for mechanical damage</p>
              <p>• Verify cable specification</p>
              <p>• Test at multiple points along route</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContinuityHowToTestSection;
