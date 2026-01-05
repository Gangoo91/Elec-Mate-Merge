
import React from 'react';
import { Zap, AlertTriangle, TestTube2, Shield, ThermometerSun, Plug } from 'lucide-react';

const HowToTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Plug className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Socket Outlet Testing (Most Common Method)</h4>
      </div>
      <div className="space-y-3 text-xs sm:text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Standard socket testing procedure:</p>
          <p className="ml-4">• Simply plug the Zs tester directly into the socket outlet</p>
          <p className="ml-4">• Ensure the socket is switched on and energised</p>
          <p className="ml-4">• The tester automatically connects between phase and earth via the socket pins</p>
          <p className="ml-4">• Press the test button and record the reading immediately</p>
          <p className="ml-4">• Test multiple sockets on ring circuits to find the highest reading</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Why this method is preferred:</p>
          <p className="ml-4">• Quick and efficient - no dismantling required</p>
          <p className="ml-4">• Tests the complete installation as used by the end user</p>
          <p className="ml-4">• Includes all connections: socket, back box, and cable terminations</p>
          <p className="ml-4">• Safer than working with exposed terminals</p>
          <p className="ml-4">• Represents real-world fault conditions accurately</p>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Ring Circuit Strategy:</p>
          <p>• Start with sockets closest to the consumer unit (lowest readings)</p>
          <p>• Work outwards to find the socket with the highest Zs reading</p>
          <p>• The highest reading represents the worst-case scenario</p>
          <p>• This socket becomes your recorded test result</p>
          <p>• Typically found at the furthest point or on spurs</p>
        </div>
      </div>
    </div>
    
    <div className="bg-red-500/10 border border-red-500/20 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-red-400">Live Testing Method (BS 7671 Standard Approach)</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Step 1: Safety preparations</p>
          <p className="ml-4">• Use GS38 compliant test leads and voltage indicator</p>
          <p className="ml-4">• Wear appropriate PPE including insulated gloves</p>
          <p className="ml-4">• Ensure test equipment is calibrated and in good condition</p>
          <p className="ml-4">• Verify supply voltage is within normal operating range (207-253V)</p>
          <p className="ml-4">• Check tester battery condition and functional operation</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 2: Test point selection and access</p>
          <p className="ml-4">• <strong>Socket circuits:</strong> Plug tester directly into socket outlets</p>
          <p className="ml-4">• <strong>Lighting circuits:</strong> Test at light switches or ceiling roses</p>
          <p className="ml-4">• <strong>Fixed appliances:</strong> Test at appliance connection points</p>
          <p className="ml-4">• <strong>Distribution boards:</strong> Test at MCB terminals if accessible</p>
          <p className="ml-4">• Always choose the furthest accessible point from the origin</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 3: Perform the test</p>
          <p className="ml-4">• For sockets: Insert tester plug fully and ensure good contact</p>
          <p className="ml-4">• For terminals: Connect between phase and earth with firm contact</p>
          <p className="ml-4">• Activate test and record the stabilised reading</p>
          <p className="ml-4">• Note any RCD tripping or unusual behaviour during test</p>
          <p className="ml-4">• Take multiple readings if results appear inconsistent</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 4: Record and interpret results</p>
          <p className="ml-4">• Record the reading and ambient temperature immediately</p>
          <p className="ml-4">• Apply temperature correction to 70°C conductor operating temperature</p>
          <p className="ml-4">• Compare with maximum values from BS 7671 Appendix 3</p>
          <p className="ml-4">• Document any readings that exceed permitted values</p>
          <p className="ml-4">• Consider remedial action if readings are marginal</p>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Different Circuit Types - Testing Approaches</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <div className="text-blue-400 font-medium mb-2">Socket Outlet Circuits</div>
          <ul className="space-y-1">
            <li>• Use plug-in tester for convenience</li>
            <li>• Test multiple sockets on ring circuits</li>
            <li>• Check both top and bottom outlets on double sockets</li>
            <li>• Pay attention to spur outlets (often highest readings)</li>
            <li>• Consider outdoor sockets separately</li>
          </ul>
        </div>
        <div className="bg-card rounded p-3">
          <div className="text-blue-400 font-medium mb-2">Lighting Circuits</div>
          <ul className="space-y-1">
            <li>• Test at furthest light switch or ceiling rose</li>
            <li>• May require accessing ceiling voids</li>
            <li>• Use probe-type testers for terminal access</li>
            <li>• Consider two-way switching arrangements</li>
            <li>• Emergency lighting circuits need separate testing</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <div className="text-blue-400 font-medium mb-2">Fixed Appliance Circuits</div>
          <ul className="space-y-1">
            <li>• Test at appliance isolator or connection unit</li>
            <li>• Consider appliance disconnection if necessary</li>
            <li>• Immersion heaters, electric showers, cookers</li>
            <li>• Test at both ends for long cable runs</li>
            <li>• Document any high-current appliance connections</li>
          </ul>
        </div>
        <div className="bg-card rounded p-3">
          <div className="text-blue-400 font-medium mb-2">Distribution Circuits</div>
          <ul className="space-y-1">
            <li>• Test at sub-distribution board terminals</li>
            <li>• Consider testing at main switch if accessible</li>
            <li>• Include submain cable impedance</li>
            <li>• Account for parallel earth paths</li>
            <li>• Document supply arrangements clearly</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TestTube2 className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">Dead Testing Method (Alternative When Required)</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">When to use dead testing:</p>
          <p className="ml-4">• When live testing may cause nuisance tripping of RCDs</p>
          <p className="ml-4">• In sensitive electronic environments (hospitals, data centres)</p>
          <p className="ml-4">• Where disconnection would cause significant disruption</p>
          <p className="ml-4">• When protective devices are particularly sensitive (≤10mA RCDs)</p>
          <p className="ml-4">• During fault investigation when live testing is impractical</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Dead testing procedure:</p>
          <p className="ml-4">• Safely isolate the installation using proper lock-off procedures</p>
          <p className="ml-4">• Measure Ze at the origin using earth fault loop impedance tester</p>
          <p className="ml-4">• Measure R1+R2 for each circuit using low-resistance ohmmeter</p>
          <p className="ml-4">• Calculate Zs = Ze + (R1 + R2) for each circuit mathematically</p>
          <p className="ml-4">• Less accurate but acceptable where live testing isn't practical</p>
          <p className="ml-4">• Results typically 10-20% higher than live test readings</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
          <p className="font-medium text-orange-400 mb-2">Dead Testing Accuracy Considerations:</p>
          <p className="text-sm text-gray-300">
            Dead testing doesn't account for parallel earth paths or the load impedance that exists during actual fault conditions. 
            Results are therefore conservative but may not reflect true fault loop impedance under operating conditions.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <ThermometerSun className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Temperature Correction Requirements</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Temperature Correction Formula:</p>
          <p className="text-center text-lg font-mono text-orange-400">
            Zs(corrected) = Zs(measured) × (230 + 70) / (230 + test temperature)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-foreground mb-2">Understanding the factors:</p>
            <p>• <strong>70°C:</strong> Maximum conductor operating temperature for PVC cables</p>
            <p>• <strong>230:</strong> Temperature coefficient constant for copper conductors</p>
            <p>• <strong>Test temperature:</strong> Ambient temperature during testing</p>
            <p>• <strong>Critical requirement:</strong> All readings must be temperature corrected</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">Practical implications:</p>
            <p>• Higher test temperatures = lower corrected values</p>
            <p>• Lower test temperatures = higher corrected values</p>
            <p>• Winter testing often produces higher corrected readings</p>
            <p>• Summer testing may show more favourable results</p>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="font-medium text-blue-400 mb-2">Example Calculations:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground">Winter Testing (5°C):</p>
              <p>• Measured Zs: 1.2Ω at 5°C ambient</p>
              <p>• Corrected: 1.2 × (300 ÷ 235) = 1.53Ω</p>
              <p>• Higher corrected value (worst case scenario)</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Summer Testing (25°C):</p>
              <p>• Measured Zs: 1.2Ω at 25°C ambient</p>
              <p>• Corrected: 1.2 × (300 ÷ 255) = 1.41Ω</p>
              <p>• Lower corrected value (more favourable)</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">RCD Interaction and Testing Considerations</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">RCD behaviour during Zs testing:</p>
          <p className="ml-4">• Zs testers typically produce 15-25A test current</p>
          <p className="ml-4">• This creates earth leakage that may trip sensitive RCDs</p>
          <p className="ml-4">• 30mA RCDs are most commonly affected</p>
          <p className="ml-4">• 100mA RCDs usually allow testing without tripping</p>
          <p className="ml-4">• Type A and Type AC RCDs may respond differently</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Solutions for RCD-protected circuits:</p>
          <p className="ml-4">• Use Zs tester with built-in RCD hold facility</p>
          <p className="ml-4">• Temporarily link out RCD during testing (competent persons only)</p>
          <p className="ml-4">• Use alternative calculation method (Ze + R1+R2)</p>
          <p className="ml-4">• Test upstream of RCD where practical</p>
          <p className="ml-4">• Some modern testers can test through RCDs without tripping</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Important Safety Note:</p>
          <p className="text-sm text-gray-300">
            Never disable RCD protection unless you are competent and have implemented appropriate alternative safety measures. 
            Always restore RCD protection immediately after testing and verify correct operation.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Test Equipment Specifications and Selection</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground mb-2">Essential tester features:</p>
          <ul className="space-y-1">
            <li>• Minimum 15A test current capability</li>
            <li>• Automatic temperature compensation option</li>
            <li>• RCD hold or bypass facility</li>
            <li>• Digital display with 0.01Ω resolution</li>
            <li>• Low voltage indication</li>
            <li>• Socket outlet adapter for plug-testing</li>
            <li>• Probe leads for terminal testing</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">Calibration and maintenance:</p>
          <ul className="space-y-1">
            <li>• Annual calibration by UKAS laboratory</li>
            <li>• Traceable to national standards</li>
            <li>• Typical uncertainty ±5% of reading</li>
            <li>• Regular functional checks before use</li>
            <li>• Battery condition monitoring</li>
            <li>• Lead continuity verification</li>
            <li>• Calibration certificate retention</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
        <p className="font-medium text-yellow-400 mb-2">Popular Zs Tester Models:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <p className="font-medium text-foreground">Dedicated Zs Testers:</p>
            <p>• Megger LTW325</p>
            <p>• Fluke 1623-2</p>
            <p>• Kewtech KT63</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Multifunction Testers:</p>
            <p>• Megger MFT1741</p>
            <p>• Fluke 1664FC</p>
            <p>• Kewtech KT65DL</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Socket Testers:</p>
            <p>• Socket & See SOK-1</p>
            <p>• Martindale EPAT1600</p>
            <p>• Di-Log DL1090</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HowToTestSection;
