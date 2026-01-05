
import React from 'react';
import { Target, CheckCircle2, AlertTriangle, Wrench, Settings, BookOpen, TrendingUp } from 'lucide-react';

const PracticalGuidanceSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Testing Strategy and Planning</h4>
      </div>
      <div className="space-y-3 text-xs sm:text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Pre-testing assessment:</p>
          <p className="ml-4">• <strong>Circuit mapping:</strong> Identify all circuits protected by each RCD</p>
          <p className="ml-4">• <strong>Load assessment:</strong> Note critical equipment that will be affected by testing</p>
          <p className="ml-4">• <strong>Access planning:</strong> Ensure safe access to all RCDs requiring testing</p>
          <p className="ml-4">• <strong>Time scheduling:</strong> Plan testing to minimise disruption to occupants</p>
          <p className="ml-4">• <strong>Equipment preparation:</strong> Gather all necessary test equipment and documentation</p>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Systematic testing approach:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-green-400">Testing sequence:</p>
              <p>1. Start with main RCDs (upstream devices)</p>
              <p>2. Work downstream to individual RCBOs</p>
              <p>3. Test discrimination where RCDs are in series</p>
              <p>4. Document results as you progress</p>
              <p>5. Address any failures before proceeding</p>
            </div>
            <div>
              <p className="font-medium text-green-400">Risk mitigation:</p>
              <p>• Warn occupants of planned power interruptions</p>
              <p>• Check UPS systems are functioning</p>
              <p>• Have emergency lighting available</p>
              <p>• Keep mobile phone charged for emergency contact</p>
              <p>• Know location of main isolator</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Common Testing Challenges and Solutions</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Challenge 1: RCD won't reset after testing</p>
          <div className="ml-4 space-y-1">
            <p><strong>Possible causes:</strong></p>
            <p>• Genuine earth fault on protected circuit</p>
            <p>• High background leakage current</p>
            <p>• Damaged RCD mechanism</p>
            <p>• Incorrect wiring connections</p>
            <p><strong>Solutions:</strong></p>
            <p>• Disconnect all loads and attempt reset</p>
            <p>• Measure insulation resistance of protected circuits</p>
            <p>• Check RCD wiring for correct connections</p>
            <p>• Replace RCD if mechanical damage suspected</p>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Challenge 2: Inconsistent trip times</p>
          <div className="ml-4 space-y-1">
            <p><strong>Possible causes:</strong></p>
            <p>• Temperature variations affecting RCD operation</p>
            <p>• Supply voltage fluctuations during test</p>
            <p>• Marginal RCD performance near end of life</p>
            <p>• Test equipment calibration issues</p>
            <p><strong>Solutions:</strong></p>
            <p>• Allow RCD to stabilise at ambient temperature</p>
            <p>• Check supply voltage stability</p>
            <p>• Repeat tests multiple times and average results</p>
            <p>• Verify test equipment calibration</p>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Challenge 3: RCD trips during normal operation</p>
          <div className="ml-4 space-y-1">
            <p><strong>Investigation procedure:</strong></p>
            <p>• Measure background leakage current when RCD is reset</p>
            <p>• Disconnect circuits one by one to isolate source</p>
            <p>• Check for water ingress or damaged cables</p>
            <p>• Consider load characteristics (IT equipment, variable speed drives)</p>
            <p>• Evaluate if RCD type is appropriate for the loads</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-orange-400">Troubleshooting RCD Problems</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Diagnostic flowchart approach:</p>
          <div className="space-y-2">
            <div className="border-l-2 border-orange-400 pl-3">
              <p className="font-medium text-orange-400">Step 1: Test button check</p>
              <p>• Press test button → RCD trips: Proceed to electrical tests</p>
              <p>• Press test button → RCD doesn't trip: Mechanical failure - replace RCD</p>
            </div>
            <div className="border-l-2 border-orange-400 pl-3">
              <p className="font-medium text-orange-400">Step 2: Electrical testing</p>
              <p>• All tests pass: RCD functioning correctly</p>
              <p>• No trip at rated current: RCD failed - replace immediately</p>
              <p>• Slow trip times: Investigate further, consider replacement</p>
            </div>
            <div className="border-l-2 border-orange-400 pl-3">
              <p className="font-medium text-orange-400">Step 3: Nuisance tripping investigation</p>
              <p>• Measure leakage current with clamp meter</p>
              <p>• Systematically isolate circuits to find source</p>
              <p>• Check for appropriate RCD type for loads present</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Advanced diagnostic techniques:</p>
          <p className="ml-4">• <strong>Leakage current measurement:</strong> Use clamp-on earth leakage detector</p>
          <p className="ml-4">• <strong>Harmonic analysis:</strong> Check for high-frequency components affecting Type AC RCDs</p>
          <p className="ml-4">• <strong>Load analysis:</strong> Review connected equipment for compatibility with RCD type</p>
          <p className="ml-4">• <strong>Environmental factors:</strong> Consider temperature, humidity, and contamination effects</p>
          <p className="ml-4">• <strong>Age assessment:</strong> Consider replacement for RCDs &gt;10-15 years old</p>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Settings className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Specialised Applications and Considerations</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">TT System Installations</div>
            <ul className="space-y-1 text-sm">
              <li>• RCD protection mandatory for all circuits</li>
              <li>• Earth electrode resistance affects RCD performance</li>
              <li>• Higher sensitivity RCDs may be required</li>
              <li>• Test earth electrode resistance annually</li>
              <li>• Consider seasonal variations in soil conditions</li>
            </ul>
          </div>
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">Medical Locations</div>
            <ul className="space-y-1 text-sm">
              <li>• Specific RCD requirements for different groups</li>
              <li>• May require 10mA or lower sensitivity</li>
              <li>• Additional monitoring systems needed</li>
              <li>• More frequent testing requirements</li>
              <li>• Backup power considerations</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">EV Charging Points</div>
            <ul className="space-y-1 text-sm">
              <li>• Type B RCD required for AC charging</li>
              <li>• DC fault detection capability essential</li>
              <li>• Higher current ratings typical</li>
              <li>• Additional surge protection considerations</li>
              <li>• Integration with smart charging systems</li>
            </ul>
          </div>
          <div className="bg-card rounded p-3">
            <div className="text-purple-400 font-medium mb-2">Data Centres/IT Environments</div>
            <ul className="space-y-1 text-sm">
              <li>• High levels of background leakage current</li>
              <li>• Type A RCDs typically required minimum</li>
              <li>• Consider 100mA RCDs for distribution</li>
              <li>• Coordination with UPS systems critical</li>
              <li>• 24/7 availability requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">Maintenance and Replacement Guidelines</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Recommended maintenance intervals:</p>
          <p className="ml-4">• <strong>Monthly:</strong> Test button operation by user (recommended)</p>
          <p className="ml-4">• <strong>6 months:</strong> Professional testing in high-risk environments</p>
          <p className="ml-4">• <strong>Annually:</strong> Full electrical testing with calibrated instruments</p>
          <p className="ml-4">• <strong>5 years:</strong> Comprehensive inspection and condition assessment</p>
          <p className="ml-4">• <strong>10-15 years:</strong> Consider replacement regardless of test results</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Replacement indicators:</p>
          <p className="ml-4">• <strong>Age-related:</strong> RCDs &gt;15 years old should be replaced</p>
          <p className="ml-4">• <strong>Performance degradation:</strong> Trip times consistently &gt;200ms at rated current</p>
          <p className="ml-4">• <strong>Mechanical issues:</strong> Test button fails to operate or feels different</p>
          <p className="ml-4">• <strong>Environmental damage:</strong> Signs of overheating, corrosion, or impact damage</p>
          <p className="ml-4">• <strong>Nuisance tripping:</strong> Frequent unexplained trips with no identifiable cause</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Critical Replacement Situations:</p>
          <div className="space-y-1 text-sm">
            <p>• RCD fails to trip at rated current - immediate replacement required</p>
            <p>• Test button doesn't operate RCD - mechanical failure, replace immediately</p>
            <p>• Physical damage to RCD housing or terminals</p>
            <p>• Signs of overheating or burning smell</p>
            <p>• Water ingress or contamination of internal components</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Documentation and Compliance</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Essential record keeping:</p>
          <p className="ml-4">• <strong>Test schedules:</strong> Maintain regular testing calendar</p>
          <p className="ml-4">• <strong>Historical data:</strong> Track performance trends over time</p>
          <p className="ml-4">• <strong>Defect logs:</strong> Record all faults and remedial actions</p>
          <p className="ml-4">• <strong>Replacement records:</strong> Document all RCD replacements with dates and reasons</p>
          <p className="ml-4">• <strong>Training records:</strong> Ensure personnel are competent in RCD testing</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Compliance documentation:</p>
          <p className="ml-4">• Test certificates with calibrated instrument details</p>
          <p className="ml-4">• Non-compliance reports where immediate action required</p>
          <p className="ml-4">• Risk assessments for installations with RCD issues</p>
          <p className="ml-4">• Insurance notifications where required</p>
          <p className="ml-4">• Building control notifications for significant changes</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Best Practice Recommendations:</p>
          <p className="text-sm text-gray-300">
            Maintain a comprehensive RCD register including location, type, rating, installation date, 
            and test history. Use this to plan preventive maintenance and budget for future replacements. 
            Consider upgrading to higher specification RCD types during routine replacements.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-indigo-400" />
        <h4 className="font-medium text-indigo-400">Emerging Technologies and Future Considerations</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Smart RCDs and monitoring systems:</p>
          <p className="ml-4">• <strong>Remote monitoring:</strong> Real-time RCD status and performance data</p>
          <p className="ml-4">• <strong>Predictive maintenance:</strong> Alert systems for degrading performance</p>
          <p className="ml-4">• <strong>Data logging:</strong> Continuous recording of trip events and test results</p>
          <p className="ml-4">• <strong>Integration:</strong> Connection to building management systems</p>
          <p className="ml-4">• <strong>Self-testing:</strong> Automated periodic testing capabilities</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Emerging load challenges:</p>
          <p className="ml-4">• <strong>EV charging:</strong> Increasing DC fault risk requiring Type B RCDs</p>
          <p className="ml-4">• <strong>Solar PV systems:</strong> DC components creating new fault scenarios</p>
          <p className="ml-4">• <strong>Heat pumps:</strong> Variable frequency drives affecting RCD selection</p>
          <p className="ml-4">• <strong>LED lighting:</strong> Switched-mode power supplies creating harmonics</p>
          <p className="ml-4">• <strong>IoT devices:</strong> Proliferation of electronic loads with earth leakage</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="font-medium text-blue-400 mb-2">Planning for the Future:</p>
          <p className="text-sm text-gray-300">
            Consider upgrading to Type A or Type B RCDs during planned maintenance to future-proof installations. 
            Evaluate smart RCD options for critical applications where downtime must be minimised. 
            Plan for increased testing frequency as installations become more complex.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PracticalGuidanceSection;
