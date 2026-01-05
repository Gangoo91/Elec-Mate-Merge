import React from 'react';
import { Wrench, Play, CheckCircle2, AlertTriangle, Settings, Target, Zap, Shield, Clock, Calculator } from 'lucide-react';

const HowToTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Essential Test Equipment</h4>
      </div>
      <div className="space-y-4 text-xs sm:text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Primary Test Equipment:</p>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-medium text-foreground">Dedicated PFC Tester:</p>
                <p>• Kewtech KT64, Megger MFT1741, Fluke 1664FC</p>
                <p>• Measurement range: 10A to 25kA typical</p>
                <p>• Accuracy: ±5% of reading ±2 digits</p>
                <p>• CAT III 600V safety rating minimum</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Multifunction Tester:</p>
                <p>• Combines multiple test functions</p>
                <p>• PFC, Ze, Zs, insulation, continuity</p>
                <p>• Cost-effective for smaller contractors</p>
                <p>• Requires regular calibration</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Supporting Equipment:</p>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-medium text-foreground">Test Leads and Probes:</p>
                <p>• Heavy duty test leads (minimum 10A rating)</p>
                <p>• Fused test probes for safety</p>
                <p>• Crocodile clips for secure connections</p>
                <p>• Proving unit for test equipment verification</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Live Working Safety Equipment:</p>
                <p>• Voltage indicator and proving unit</p>
                <p>• Insulated tools and barriers</p>
                <p>• PPE appropriate for live working</p>
                <p>• Warning notices for live circuit work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-red-400">CRITICAL: PFC Testing Requires Live Circuits</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-red-400 mb-3">Why PFC Testing Must Be Performed Live:</p>
          <div className="space-y-2 text-xs">
            <p>• PFC testing measures the actual fault current available from the supply</p>
            <p>• Dead circuit testing cannot provide meaningful PFC values</p>
            <p>• Supply impedance and transformer characteristics only exist when energised</p>
            <p>• BS 7671 requires measurement of actual prospective fault current</p>
            <p>• Unlike other electrical tests, PFC testing CANNOT be performed safely on isolated circuits</p>
          </div>
        </div>
        
        <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
          <p className="font-medium text-red-400 mb-2">⚠️ Live Working Safety Notice:</p>
          <p className="text-xs text-gray-300">
            PFC testing involves working on or near live electrical circuits. This presents significant risks of electric shock, 
            burns, and arc flash. Only competent persons with appropriate training, equipment, and authorisation should perform PFC testing.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Play className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Live Circuit PFC Testing Procedure</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-blue-400 mb-3">Step-by-Step Live Testing Procedure:</p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Risk Assessment and Preparation</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Complete live working risk assessment</p>
                  <p>• Ensure appropriate competency and training</p>
                  <p>• Obtain permission for live working if required</p>
                  <p>• Check test equipment calibration certificates</p>
                  <p>• Verify all PPE is suitable for live working</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Live Working Safety Setup</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Don appropriate PPE for live working</p>
                  <p>• Establish barriers and warning notices</p>
                  <p>• Ensure emergency procedures are understood</p>
                  <p>• Have rescue equipment readily available</p>
                  <p>• Brief all personnel on live working hazards</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Circuit Load Disconnection</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Disconnect all loads from the circuit whilst keeping it energised</p>
                  <p>• Remove lamps from lighting circuits</p>
                  <p>• Unplug all equipment from socket circuits</p>
                  <p>• Ensure no parallel paths through connected equipment</p>
                  <p>• Circuit must remain live at distribution board</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Live Circuit Test Connection</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Use insulated tools and maintain safe working distances</p>
                  <p>• Connect test leads at circuit origin (live terminals)</p>
                  <p>• Phase conductor to earth terminal for L-E PFC</p>
                  <p>• Phase conductor to neutral terminal for L-N PFC</p>
                  <p>• Ensure secure connections to avoid arcing</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">5</div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Live Measurement and Recording</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Perform phase-earth PFC test on live circuit</p>
                  <p>• Record reading immediately and note any warnings</p>
                  <p>• Perform phase-neutral PFC test if required</p>
                  <p>• Keep exposure time to absolute minimum</p>
                  <p>• Monitor for any signs of overheating or arcing</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">6</div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Safe Disconnection and Restoration</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Carefully disconnect test equipment using insulated tools</p>
                  <p>• Reconnect all loads and equipment</p>
                  <p>• Test circuit operation after restoration</p>
                  <p>• Remove barriers and warning notices</p>
                  <p>• Complete test documentation immediately</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-3">
          <p className="font-medium text-blue-400 mb-2">Live Testing Critical Points:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Where to Test:</p>
              <p>• At the origin of each circuit (live protective device terminals)</p>
              <p>• Consumer unit, distribution board, or local isolator</p>
              <p>• Circuit must remain energised from supply</p>
              <p>• Use insulated barriers to prevent accidental contact</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">What to Measure on Live Circuits:</p>
              <p>• Phase-Earth PFC (most critical for safety)</p>
              <p>• Phase-Neutral PFC (for discrimination/selectivity)</p>
              <p>• Three-phase systems: each phase individually whilst live</p>
              <p>• All measurements require live circuit conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Calculation Method (Design Stage Only)</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-purple-400 mb-2">When to Use Calculated Method:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Appropriate Situations:</p>
              <p>• Design stage calculations before installation</p>
              <p>• When live measurement is not safe or practical</p>
              <p>• Verification of measured values (comparison)</p>
              <p>• Complex installations with multiple parallel paths</p>
              <p>• New installations before first energisation</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Limitations:</p>
              <p>• Less accurate than live circuit measurement</p>
              <p>• Doesn't account for actual connection resistances</p>
              <p>• Supply impedance variations not considered</p>
              <p>• Cannot replace live testing for verification</p>
              <p>• Requires validation by live measurement when possible</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-purple-400 mb-3">Calculation Formulas and Method:</p>
          <div className="space-y-3">
            <div className="bg-muted rounded p-3">
              <p className="font-medium text-foreground mb-2">Basic PFC Formula:</p>
              <div className="font-mono text-sm bg-accent p-2 rounded">
                PFC = Uo / Zs
              </div>
              <div className="text-xs mt-2 space-y-1">
                <p><strong>Where:</strong></p>
                <p>• PFC = Prospective Fault Current (Amperes)</p>
                <p>• Uo = Nominal voltage to earth (230V single phase, 400V three phase)</p>
                <p>• Zs = Earth fault loop impedance (Ze + R1 + R2)</p>
              </div>
            </div>

            <div className="bg-muted rounded p-3">
              <p className="font-medium text-foreground mb-2">Component Values Required:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <p><strong>Ze - External Earth Fault Loop Impedance:</strong></p>
                  <p>• Measured at supply intake</p>
                  <p>• Provided by DNO or measured</p>
                  <p>• Varies with supply transformer and network</p>
                  <p>• Typical values: 0.2-0.8Ω for TN systems</p>
                </div>
                <div>
                  <p><strong>R1 + R2 - Circuit Conductor Resistances:</strong></p>
                  <p>• R1 = Phase conductor resistance</p>
                  <p>• R2 = Protective conductor resistance</p>
                  <p>• Calculated from cable length and conductor size</p>
                  <p>• Temperature correction may be required</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded p-3">
              <p className="font-medium text-foreground mb-2">Worked Example - Kitchen Ring Circuit:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <p><strong>Given Data:</strong></p>
                  <p>• Ze = 0.35Ω (TN-C-S supply)</p>
                  <p>• Ring circuit length = 30m</p>
                  <p>• Cable: 2.5mm² T&E (twin and earth)</p>
                  <p>• R1+R2 end-to-end = 0.96Ω (from tables)</p>
                  <p>• Ring factor = 0.25 (quarter end-to-end)</p>
                </div>
                <div>
                  <p><strong>Calculation:</strong></p>
                  <p>• Zs = Ze + (R1+R2)/4</p>
                  <p>• Zs = 0.35 + 0.96/4</p>
                  <p>• Zs = 0.35 + 0.24 = 0.59Ω</p>
                  <p>• PFC = 230V / 0.59Ω</p>
                  <p>• <strong>PFC = 390A</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Advanced Live Testing Techniques</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Three-Phase Live System Testing:</p>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-medium text-foreground">Phase-Earth Testing (Live):</p>
                <p>• Test L1-E, L2-E, L3-E individually on live system</p>
                <p>• Values should be similar (within 10%)</p>
                <p>• Large differences indicate supply problems</p>
                <p>• Use lowest value for assessment</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Phase-Neutral Testing (Live):</p>
                <p>• Test L1-N, L2-N, L3-N individually on live system</p>
                <p>• Important for discrimination analysis</p>
                <p>• Usually higher than phase-earth values</p>
                <p>• Essential for protective device coordination</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Phase-Phase Testing (Live):</p>
                <p>• Test L1-L2, L2-L3, L3-L1 on live system if required</p>
                <p>• Relevant for motor circuits and three-phase loads</p>
                <p>• Higher fault current than single phase</p>
                <p>• Critical for discrimination studies</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Special Installation Live Testing:</p>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-medium text-foreground">TT System Installations:</p>
                <p>• PFC limited by earth electrode resistance</p>
                <p>• Typically much lower values (50-200A) when live</p>
                <p>• RCD protection becomes critical</p>
                <p>• Earth electrode condition affects live results</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Generator-Fed Circuits:</p>
                <p>• Different fault characteristics when running</p>
                <p>• Generator impedance affects live PFC</p>
                <p>• Must be tested with generator operational</p>
                <p>• Consider generator earthing arrangements</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Solar PV Installations:</p>
                <p>• Test AC side circuits live normally</p>
                <p>• DC side requires special live testing procedures</p>
                <p>• Isolator positions affect live measurements</p>
                <p>• Consider inverter earthing arrangements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Critical Live Working Safety Precautions</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-red-400 mb-2">Pre-Live Working Safety Checks:</p>
            <div className="space-y-1 text-xs">
              <p>• Verify competency for live working activities</p>
              <p>• Complete comprehensive risk assessment</p>
              <p>• Check test equipment calibration and condition</p>
              <p>• Inspect test leads for damage or deterioration</p>
              <p>• Ensure appropriate PPE for live working is available</p>
              <p>• Confirm emergency procedures and rescue arrangements</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-red-400 mb-2">During Live Working Safety:</p>
            <div className="space-y-1 text-xs">
              <p>• Maintain safe working distances from live parts</p>
              <p>• Keep test duration to absolute minimum</p>
              <p>• Monitor test equipment for overheating</p>
              <p>• Be aware of high current transients and arcing risks</p>
              <p>• Stop immediately if unusual readings or sparking occur</p>
              <p>• Maintain barriers to prevent unauthorised access</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-red-400 mb-3">High-Risk Live Working Scenarios:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Arc Flash Risks:</p>
              <p>• High test currents can cause arcing</p>
              <p>• Poor connections increase arc risk</p>
              <p>• Ensure secure, low-resistance connections</p>
              <p>• Use appropriate arc-rated PPE</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Electric Shock Hazards:</p>
              <p>• Direct contact with live conductors</p>
              <p>• Induced voltages in nearby circuits</p>
              <p>• Use insulated tools and barriers</p>
              <p>• Maintain safe working practices</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Equipment Overheating:</p>
              <p>• High currents generate significant heat</p>
              <p>• Test leads and connections can overheat</p>
              <p>• Monitor temperature during testing</p>
              <p>• Allow cooling between repeated tests</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-teal-400" />
        <h4 className="font-medium text-teal-400">Live Test Result Analysis and Validation</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-teal-400 mb-2">Live Circuit Result Assessment:</p>
            <div className="space-y-1 text-xs">
              <p>• Compare with protective device minimum requirements</p>
              <p>• Check consistency between similar live circuits</p>
              <p>• Verify readings are technically reasonable for live systems</p>
              <p>• Cross-reference with calculated values if available</p>
              <p>• Consider supply characteristics and live variations</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-teal-400 mb-2">Live Testing Quality Assurance:</p>
            <div className="space-y-1 text-xs">
              <p>• Repeat tests if live readings appear inconsistent</p>
              <p>• Check test equipment battery and calibration</p>
              <p>• Verify live test connections are secure and safe</p>
              <p>• Ensure proper live working procedures maintained</p>
              <p>• Document any live testing anomalies or safety concerns</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-teal-400 mb-3">Documentation Requirements:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Test Data Recording:</p>
              <p>• Circuit identification and location</p>
              <p>• Protective device type and rating</p>
              <p>• Phase-Earth PFC measurement</p>
              <p>• Phase-Neutral PFC if measured</p>
              <p>• Test method used (direct/calculated)</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Equipment Information:</p>
              <p>• Test instrument make and model</p>
              <p>• Calibration certificate reference</p>
              <p>• Test lead specifications</p>
              <p>• Environmental conditions</p>
              <p>• Date and time of testing</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Assessment and Actions:</p>
              <p>• Pass/fail against requirements</p>
              <p>• Safety margin calculations</p>
              <p>• Any remedial work required</p>
              <p>• Recommendations for future testing</p>
              <p>• Tester signature and certification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HowToTestSection;
