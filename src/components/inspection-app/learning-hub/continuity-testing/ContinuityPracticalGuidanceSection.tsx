
import React from 'react';
import { BookOpen, Wrench, AlertTriangle, CheckCircle2, Clock, Target } from 'lucide-react';

const ContinuityPracticalGuidanceSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Best Practice Testing Procedures</h4>
      </div>
      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Pre-Test Preparation:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Document the circuit:</strong> Sketch layout and identify all outlets</p>
              <p>• <strong>Remove parallel paths:</strong> Disconnect all equipment and accessories</p>
              <p>• <strong>Identify conductors:</strong> Use reliable marking and verification</p>
              <p>• <strong>Check test equipment:</strong> Verify calibration and battery condition</p>
              <p>• <strong>Measure lead resistance:</strong> Null function or manual calculation</p>
              <p>• <strong>Plan test sequence:</strong> Logical order to minimise errors</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">During Testing:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Good connections:</strong> Clean terminals and ensure secure contact</p>
              <p>• <strong>Record immediately:</strong> Write down readings as taken</p>
              <p>• <strong>Check for consistency:</strong> Similar circuits should have similar values</p>
              <p>• <strong>Investigate anomalies:</strong> High or low readings need explanation</p>
              <p>• <strong>Use correct range:</strong> Appropriate instrument settings for accuracy</p>
              <p>• <strong>Safety awareness:</strong> Remain alert to potential hazards</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Practical Testing Techniques</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Efficient Test Routing:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Radial circuits:</strong></p>
              <p>• Start at distribution board with connections</p>
              <p>• Work systematically to furthest point</p>
              <p>• Test at final outlet or equipment position</p>
              <p>• Record reading and verify calculation</p>
              <p><strong>Ring circuits:</strong></p>
              <p>• Complete continuity tests first</p>
              <p>• Set up cross-connections methodically</p>
              <p>• Test every outlet on the ring</p>
              <p>• Verify readings are consistent</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Professional Tips:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Use quality test leads:</strong> Low resistance and good durability</p>
              <p>• <strong>Clean probe tips:</strong> Remove oxidation for good contact</p>
              <p>• <strong>Check connections twice:</strong> Verify before and after testing</p>
              <p>• <strong>Label as you go:</strong> Mark tested circuits to avoid confusion</p>
              <p>• <strong>Cross-reference drawings:</strong> Verify actual vs. planned installation</p>
              <p>• <strong>Photo document issues:</strong> Visual record of problems found</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Time-Saving Techniques:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Preparation Phase:</p>
              <p>• Pre-plan test sequence</p>
              <p>• Prepare test sheets in advance</p>
              <p>• Organise tools and equipment</p>
              <p>• Brief assistants on procedures</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Testing Phase:</p>
              <p>• Work systematically, don't jump around</p>
              <p>• Use radio communication for large sites</p>
              <p>• Batch similar tests together</p>
              <p>• Record results immediately</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Completion Phase:</p>
              <p>• Verify all tests completed</p>
              <p>• Check calculations are correct</p>
              <p>• Ensure proper reconnection</p>
              <p>• File results systematically</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Troubleshooting Common Problems</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">High Resistance Readings:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Possible Causes:</strong></p>
              <p>• Loose or corroded connections</p>
              <p>• Damaged conductor (partial break)</p>
              <p>• Poor crimped or soldered joints</p>
              <p>• Undersized conductor for application</p>
              <p>• Parallel resistance affecting reading</p>
              <p><strong>Investigation Steps:</strong></p>
              <p>• Visual inspection of connections</p>
              <p>• Test individual cable sections</p>
              <p>• Check for mechanical damage</p>
              <p>• Verify conductor specification</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Infinite Resistance Readings:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Possible Causes:</strong></p>
              <p>• Complete conductor break</p>
              <p>• Disconnected terminal</p>
              <p>• Blown fuse in circuit</p>
              <p>• Isolation switch still open</p>
              <p>• Test lead failure</p>
              <p><strong>Investigation Steps:</strong></p>
              <p>• Verify test lead continuity</p>
              <p>• Check all isolation points</p>
              <p>• Inspect for obvious damage</p>
              <p>• Test sections systematically</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Inconsistent Ring Circuit Readings:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Symptoms:</p>
              <p>• Readings vary significantly around ring</p>
              <p>• Some outlets show very high resistance</p>
              <p>• End-to-end tests don't correlate</p>
              <p>• Unexpected zero or infinite readings</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Likely Causes:</p>
              <p>• Ring circuit not actually continuous</p>
              <p>• Incorrect wiring (radials from ring)</p>
              <p>• Crossed connections between circuits</p>
              <p>• Interconnections between ring legs</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Quality Assurance and Verification</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Result Verification:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Sanity checks:</strong> Do results make sense for cable type/length?</p>
              <p>• <strong>Comparison:</strong> Similar circuits should have similar values</p>
              <p>• <strong>Calculation verification:</strong> Check arithmetic and formulas</p>
              <p>• <strong>Regulation compliance:</strong> Ensure values meet BS 7671 requirements</p>
              <p>• <strong>Design verification:</strong> Compare with design calculations</p>
              <p>• <strong>Documentation:</strong> Complete and accurate test records</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Professional Standards:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Competency:</strong> Ensure tester has appropriate qualifications</p>
              <p>• <strong>Equipment calibration:</strong> Valid certificates for all instruments</p>
              <p>• <strong>Method compliance:</strong> Follow BS 7671 and IET guidance</p>
              <p>• <strong>Witnessing:</strong> Independent verification where required</p>
              <p>• <strong>Sign-off:</strong> Responsible person validates results</p>
              <p>• <strong>Traceability:</strong> Clear audit trail of all testing</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Record Keeping and Documentation</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Essential Records:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Test results:</strong> All measured values with units</p>
              <p>• <strong>Test conditions:</strong> Temperature, test method, instrument used</p>
              <p>• <strong>Circuit details:</strong> Cable type, length, protective device</p>
              <p>• <strong>Compliance assessment:</strong> Pass/fail against requirements</p>
              <p>• <strong>Remedial actions:</strong> Any work required to achieve compliance</p>
              <p>• <strong>Tester signature:</strong> Qualified person responsible for testing</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Digital Record Keeping:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Electronic forms:</strong> Reduce errors and improve legibility</p>
              <p>• <strong>Photo documentation:</strong> Visual evidence of connections and issues</p>
              <p>• <strong>Cloud storage:</strong> Secure backup and easy access</p>
              <p>• <strong>Integration:</strong> Link with design software and databases</p>
              <p>• <strong>Reporting:</strong> Automated generation of certificates</p>
              <p>• <strong>Audit trails:</strong> Complete history of all changes</p>
            </div>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Long-term Value of Good Records:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Maintenance:</p>
              <p>• Historical performance data</p>
              <p>• Deterioration trends</p>
              <p>• Predictive maintenance</p>
              <p>• Warranty claims</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Compliance:</p>
              <p>• Regulatory inspections</p>
              <p>• Insurance requirements</p>
              <p>• Legal evidence</p>
              <p>• Professional liability</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Business:</p>
              <p>• Quality demonstration</p>
              <p>• Client confidence</p>
              <p>• Repeat business</p>
              <p>• Professional reputation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContinuityPracticalGuidanceSection;
