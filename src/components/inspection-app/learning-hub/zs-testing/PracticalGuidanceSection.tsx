
import React from 'react';
import { Target, CheckCircle2, AlertTriangle, Wrench, Zap, Settings, BookOpen } from 'lucide-react';

const PracticalGuidanceSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Test Equipment Selection and Setup</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
        <div>
          <p className="font-medium text-foreground mb-2">Dedicated loop impedance testers:</p>
          <ul className="space-y-1">
            <li>• Most accurate results for Zs testing</li>
            <li>• Purpose-built for fault loop measurements</li>
            <li>• High test current capability (15-25A)</li>
            <li>• Automatic temperature compensation</li>
            <li>• Built-in RCD compatibility modes</li>
            <li>• Typically ±2% accuracy or better</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">Multifunction testers:</p>
          <ul className="space-y-1">
            <li>• Convenient for comprehensive testing</li>
            <li>• May have slightly lower accuracy</li>
            <li>• Test current varies by model</li>
            <li>• Check Zs capability before use</li>
            <li>• Some models limited to 10A test current</li>
            <li>• Verify calibration for Zs function</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 bg-card rounded p-3">
        <p className="font-medium text-foreground mb-2">Pre-test equipment verification:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-orange-400">Before each use check:</p>
            <p>• Battery condition and charge level</p>
            <p>• Test lead continuity and insulation</p>
            <p>• Calibration certificate validity</p>
            <p>• Function test on known circuit</p>
          </div>
          <div>
            <p className="font-medium text-orange-400">Setting verification:</p>
            <p>• Correct voltage setting (230V single-phase)</p>
            <p>• Temperature compensation enabled</p>
            <p>• RCD settings appropriate</p>
            <p>• Display resolution adequate (0.01Ω)</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Testing Best Practices and Techniques</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Socket outlet testing methodology:</p>
          <p className="ml-4">• <strong>Plug insertion:</strong> Ensure tester plug makes full contact in socket</p>
          <p className="ml-4">• <strong>Socket selection:</strong> Always test furthest socket from origin on each circuit</p>
          <p className="ml-4">• <strong>Ring circuits:</strong> Test multiple sockets to identify highest Zs reading</p>
          <p className="ml-4">• <strong>Spur identification:</strong> Test sockets on spurs separately - often highest readings</p>
          <p className="ml-4">• <strong>Double sockets:</strong> Test both outlets if accessible</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Terminal testing for fixed circuits:</p>
          <p className="ml-4">• <strong>Clean connections:</strong> Ensure terminal surfaces are clean and tight</p>
          <p className="ml-4">• <strong>Probe contact:</strong> Maintain firm, stable contact during test</p>
          <p className="ml-4">• <strong>Safety isolation:</strong> Consider dead testing if live access is hazardous</p>
          <p className="ml-4">• <strong>Terminal identification:</strong> Verify phase and earth connections before testing</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Reading interpretation and recording:</p>
          <p className="ml-4">• <strong>Stabilisation:</strong> Allow reading to stabilise before recording</p>
          <p className="ml-4">• <strong>Multiple tests:</strong> Take several readings if results seem inconsistent</p>
          <p className="ml-4">• <strong>Highest value:</strong> Always record the highest stable reading obtained</p>
          <p className="ml-4">• <strong>Temperature recording:</strong> Note ambient temperature at time of test</p>
          <p className="ml-4">• <strong>Conditions:</strong> Document any unusual test conditions or observations</p>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Troubleshooting Common Issues</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">High Zs readings - systematic approach:</p>
          <div className="ml-4 space-y-2">
            <p>• <strong>Step 1:</strong> Verify test equipment calibration and function</p>
            <p>• <strong>Step 2:</strong> Check supply voltage is within normal range (207-253V)</p>
            <p>• <strong>Step 3:</strong> Inspect main earthing conductor at origin</p>
            <p>• <strong>Step 4:</strong> Check earth electrode condition and connections</p>
            <p>• <strong>Step 5:</strong> Verify CPC continuity throughout circuit</p>
            <p>• <strong>Step 6:</strong> Examine all earth connections at accessories</p>
            <p>• <strong>Step 7:</strong> Consider parallel earth paths that may be disconnected</p>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Inconsistent or erratic readings:</p>
          <p className="ml-4">• <strong>Connection issues:</strong> Poor contact between test probes and terminals</p>
          <p className="ml-4">• <strong>Supply variation:</strong> Voltage fluctuations during test period</p>
          <p className="ml-4">• <strong>Load effects:</strong> Other equipment operating during test</p>
          <p className="ml-4">• <strong>Temperature changes:</strong> Conductor temperature varying during test</p>
          <p className="ml-4">• <strong>Intermittent faults:</strong> Loose connections in the fault loop path</p>
        </div>
        <div>
          <p className="font-medium text-foreground">RCD tripping during test:</p>
          <p className="ml-4">• <strong>Tester incompatibility:</strong> Use tester with RCD hold facility</p>
          <p className="ml-4">• <strong>RCD sensitivity:</strong> Very sensitive RCDs (≤10mA) may always trip</p>
          <p className="ml-4">• <strong>Type AC vs Type A:</strong> Different RCD types respond differently</p>
          <p className="ml-4">• <strong>Alternative methods:</strong> Calculate Zs = Ze + (R1+R2) when necessary</p>
          <p className="ml-4">• <strong>Temporary measures:</strong> RCD bypass during testing (competent persons only)</p>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Settings className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Circuit-Specific Testing Strategies</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">Ring Final Circuits</div>
            <ul className="space-y-1 text-sm">
              <li>• Test multiple socket outlets around the ring</li>
              <li>• Identify the socket with highest Zs reading</li>
              <li>• Check spur outlets separately</li>
              <li>• Zs should be roughly half that of equivalent radial</li>
              <li>• High readings may indicate ring discontinuity</li>
              <li>• Cross-reference with R1+R2 continuity results</li>
            </ul>
          </div>
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">Radial Socket Circuits</div>
            <ul className="space-y-1 text-sm">
              <li>• Test at the last socket outlet on circuit</li>
              <li>• Consider cable length and conductor CSA</li>
              <li>• Account for any spurs or branches</li>
              <li>• Higher readings expected vs ring circuits</li>
              <li>• Check all outlets if circuit layout unclear</li>
              <li>• Verify circuit protection is appropriate</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">Lighting Circuits</div>
            <ul className="space-y-1 text-sm">
              <li>• Test at furthest light switch or ceiling rose</li>
              <li>• May require access to ceiling voids</li>
              <li>• Consider two-way and intermediate switching</li>
              <li>• Test both switch wire and permanent live</li>
              <li>• Emergency lighting circuits tested separately</li>
              <li>• Note any parallel CPC arrangements</li>
            </ul>
          </div>
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">Three-Phase Circuits</div>
            <ul className="space-y-1 text-sm">
              <li>• Test all three phases to earth individually</li>
              <li>• Record the highest reading obtained</li>
              <li>• Consider phase imbalance effects on readings</li>
              <li>• Account for neutral-earth voltage if present</li>
              <li>• Test at motor starter contactors where accessible</li>
              <li>• Verify star point earthing arrangements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">Remedial Actions for Non-Compliance</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Immediate actions for high Zs readings:</p>
          <p className="ml-4">• <strong>Safety assessment:</strong> Determine if installation can remain energised</p>
          <p className="ml-4">• <strong>Circuit isolation:</strong> Isolate non-compliant circuits if safety risk exists</p>
          <p className="ml-4">• <strong>User notification:</strong> Inform responsible person of findings</p>
          <p className="ml-4">• <strong>Temporary measures:</strong> Consider RCD protection as interim solution</p>
          <p className="ml-4">• <strong>Documentation:</strong> Record all findings and actions taken</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Long-term solutions by category:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-medium text-orange-400 mb-1">Earthing system improvements:</p>
              <p>• Upgrade main earthing conductor size</p>
              <p>• Install additional earth electrodes</p>
              <p>• Improve earth electrode connections</p>
              <p>• Consider TN-C-S supply conversion</p>
            </div>
            <div>
              <p className="font-medium text-orange-400 mb-1">Circuit modifications:</p>
              <p>• Install larger CPC conductors</p>
              <p>• Upgrade to lower impedance cables</p>
              <p>• Reduce circuit length where possible</p>
              <p>• Split long circuits into shorter sections</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Alternative protection strategies:</p>
          <p className="ml-4">• <strong>RCD protection:</strong> 30mA RCDs for additional shock protection (not a substitute for ADS)</p>
          <p className="ml-4">• <strong>Protective device changes:</strong> Higher sensitivity MCBs or different characteristics</p>
          <p className="ml-4">• <strong>RCBO installation:</strong> Combined overcurrent and RCD protection</p>
          <p className="ml-4">• <strong>Voltage optimisation:</strong> Ensure supply voltage optimised for protection</p>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Documentation and Record Keeping</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Essential information to record:</p>
          <p className="ml-4">• <strong>Circuit identification:</strong> Clear reference to tested circuit</p>
          <p className="ml-4">• <strong>Test location:</strong> Specific point where test was performed</p>
          <p className="ml-4">• <strong>Measured value:</strong> Raw Zs reading from test instrument</p>
          <p className="ml-4">• <strong>Ambient temperature:</strong> Temperature at time of test</p>
          <p className="ml-4">• <strong>Corrected value:</strong> Temperature-corrected Zs value</p>
          <p className="ml-4">• <strong>Maximum permitted:</strong> Relevant limit from BS 7671 Appendix 3</p>
          <p className="ml-4">• <strong>Compliance status:</strong> Pass/fail against requirements</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Additional notes should include:</p>
          <p className="ml-4">• Test equipment used and calibration status</p>
          <p className="ml-4">• Any RCD tripping or unusual behaviour</p>
          <p className="ml-4">• Parallel paths disconnected during testing</p>
          <p className="ml-4">• Supply conditions and voltage levels</p>
          <p className="ml-4">• Recommendations for remedial work</p>
          <p className="ml-4">• Future testing requirements</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Quality Assurance Checks:</p>
          <p className="text-sm text-white">
            Cross-reference Zs results with R1+R2 continuity tests and Ze measurements. 
            The relationship Zs ≈ Ze + (R1+R2) should be approximately maintained, 
            allowing for measurement tolerances and circuit conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PracticalGuidanceSection;
