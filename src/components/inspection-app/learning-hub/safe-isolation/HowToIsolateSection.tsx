
import React from 'react';
import { Shield, Zap, AlertTriangle, Clock, CheckCircle2, Settings, Activity, Eye, Lock } from 'lucide-react';

const HowToIsolateSection = () => (
  <div className="space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">The Six-Step Safe Isolation Procedure</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500 text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
            <h5 className="font-medium text-foreground">Switch Off at Origin</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="font-medium text-green-400">Procedure:</p>
            <ul className="space-y-1 ml-4">
              <li>• Identify the correct supply source for the circuit</li>
              <li>• Inform all personnel of impending power interruption</li>
              <li>• Switch off at the distribution board or main isolator</li>
              <li>• Verify switch position visually - ensure it's fully OFF</li>
              <li>• For 3-phase supplies, ensure ALL phases are switched off</li>
            </ul>
            <p className="font-medium text-yellow-400 mt-2">Critical Points:</p>
            <ul className="space-y-1 ml-4">
              <li>• Never assume a switch is off - verify visually</li>
              <li>• Be aware of multiple supply sources (generators, UPS, etc.)</li>
              <li>• Consider equipment that may have stored energy (capacitors)</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500 text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
            <h5 className="font-medium text-foreground">Isolate Using Appropriate Device</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="font-medium text-green-400">Suitable Isolation Devices:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
              <div>
                <p className="font-medium text-foreground">Acceptable:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Isolator switches with visible break</li>
                  <li>• Circuit breakers (MCBs, RCBOs)</li>
                  <li>• Fused switches with removable fuses</li>
                  <li>• Plug and socket (for portable equipment)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground">Not Acceptable:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Emergency stop buttons</li>
                  <li>• Control switches or contactors</li>
                  <li>• Semiconductor switches (thyristors, etc.)</li>
                  <li>• Single-pole switches on 3-phase supplies</li>
                </ul>
              </div>
            </div>
            <p className="font-medium text-yellow-400 mt-2">Verification Requirements:</p>
            <ul className="space-y-1 ml-4">
              <li>• Device must have visible break or clear position indication</li>
              <li>• All live conductors must be isolated simultaneously</li>
              <li>• Device rating must be suitable for the circuit</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500 text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
            <h5 className="font-medium text-foreground">Secure the Isolation</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="font-medium text-green-400">Physical Security Methods:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
              <div>
                <p className="font-medium text-foreground">Locking Systems:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Personal safety padlocks (unique key)</li>
                  <li>• Lockout hasps for multiple workers</li>
                  <li>• MCB lockout devices</li>
                  <li>• Isolator switch locks</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground">Warning Systems:</p>
                <ul className="space-y-1 text-xs">
                  <li>• "DANGER - DO NOT SWITCH ON" labels</li>
                  <li>• Personal identification tags</li>
                  <li>• Date and time of isolation</li>
                  <li>• Contact details of person responsible</li>
                </ul>
              </div>
            </div>
            <p className="font-medium text-red-400 mt-2">Golden Rules:</p>
            <ul className="space-y-1 ml-4">
              <li>• Each person working must apply their own lock</li>
              <li>• Only you can remove your own lock</li>
              <li>• Last person to finish removes the final lock</li>
              <li>• Never remove someone else's lock without permission</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500 text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
            <h5 className="font-medium text-foreground">Test the Isolation Device</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="font-medium text-green-400">Testing Procedure:</p>
            <ul className="space-y-1 ml-4">
              <li>• Use GS38 compliant voltage indicator</li>
              <li>• Test across each pole of the isolation device</li>
              <li>• Verify no voltage across the contacts</li>
              <li>• For 3-phase systems, test all three phases + neutral</li>
              <li>• Record any voltage readings found</li>
            </ul>
            <p className="font-medium text-yellow-400 mt-2">Equipment Requirements:</p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 ml-4">
              <p className="font-medium text-blue-400 mb-1">GS38 Compliance:</p>
              <ul className="space-y-1 text-xs">
                <li>• Fused test leads (500mA max)</li>
                <li>• Finger guards on test probes</li>
                <li>• 4mm maximum exposed probe tip</li>
                <li>• Insulated test leads in good condition</li>
                <li>• Clear voltage indication (LED/LCD display)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500 text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
            <h5 className="font-medium text-foreground">Test the Installation Dead</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="font-medium text-green-400">Critical Testing Sequence:</p>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3 ml-4">
              <p className="font-medium text-orange-400 mb-2">EARTH-FIRST TESTING METHOD:</p>
              <ol className="space-y-1 text-xs">
                <li>1. <strong>Establish earth reference:</strong> Connect one probe to earth/CPC</li>
                <li>2. <strong>Test each live conductor to earth:</strong> L1-E, L2-E, L3-E</li>
                <li>3. <strong>Test neutral to earth:</strong> N-E (if neutral present)</li>
                <li>4. <strong>Test between live conductors:</strong> L1-L2, L2-L3, L3-L1</li>
                <li>5. <strong>Test live to neutral:</strong> L1-N, L2-N, L3-N</li>
              </ol>
            </div>
            <p className="font-medium text-red-400 mt-2">Acceptance Criteria:</p>
            <ul className="space-y-1 ml-4">
              <li>• All readings must be ZERO volts</li>
              <li>• Any reading above 50V indicates danger</li>
              <li>• Consider induced voltages in long cable runs</li>
              <li>• Be aware of capacitive coupling effects</li>
            </ul>
            <p className="font-medium text-yellow-400 mt-2">Testing Locations:</p>
            <ul className="space-y-1 ml-4">
              <li>• Test at the actual point where work will be carried out</li>
              <li>• Not just at the isolator or distribution board</li>
              <li>• Test all accessible conductors in the work area</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500 text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">6</div>
            <h5 className="font-medium text-foreground">Re-test the Voltage Indicator</h5>
          </div>
          <div className="ml-11 space-y-2">
            <p className="font-medium text-green-400">Proving Process:</p>
            <ul className="space-y-1 ml-4">
              <li>• Test on the same known live source used initially</li>
              <li>• Use identical voltage range and function settings</li>
              <li>• Confirm the indicator shows voltage presence correctly</li>
              <li>• If tester fails to respond, repeat dead testing with alternative device</li>
            </ul>
            <p className="font-medium text-red-400 mt-2">Critical Importance:</p>
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3 ml-4">
              <p className="text-sm">
                This step validates that your voltage indicator was working correctly during the dead testing phase. 
                A faulty tester giving false "dead" readings could lead to a fatal accident. Never skip this final verification step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Advanced Isolation Techniques</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Complex Supply Systems:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Multiple Supply Sources:</p>
              <ul className="space-y-1 text-xs">
                <li>• Main supply and emergency generator backup</li>
                <li>• UPS systems maintaining critical supplies</li>
                <li>• Solar PV systems with battery storage</li>
                <li>• Interconnected distribution networks</li>
                <li>• Supplies from different electrical companies</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Special Considerations:</p>
              <ul className="space-y-1 text-xs">
                <li>• Capacitor banks with stored energy</li>
                <li>• Motor back-EMF during run-down</li>
                <li>• Induced voltages from adjacent circuits</li>
                <li>• Cross-connected neutral conductors</li>
                <li>• IT system earthing arrangements</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">High Voltage Considerations:</p>
          <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
            <p className="font-medium text-red-400 mb-2">Additional Safety Measures for HV:</p>
            <ul className="space-y-1 text-sm">
              <li>• Permit-to-work systems mandatory</li>
              <li>• Earth and short circuit application</li>
              <li>• Designated competent person supervision</li>
              <li>• Specialist HV test equipment required</li>
              <li>• Extended safety clearance distances</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Visual Verification Techniques</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">What to look for during isolation:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-purple-400 mb-2">Switch/Isolator Position:</p>
              <ul className="space-y-1 text-xs">
                <li>• Handle in full OFF position (not intermediate)</li>
                <li>• Visible break in contacts (where applicable)</li>
                <li>• Status indicators showing OFF state</li>
                <li>• All poles open simultaneously</li>
                <li>• No burning or arcing damage visible</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-purple-400 mb-2">Secondary Verification:</p>
              <ul className="space-y-1 text-xs">
                <li>• Equipment stops running/lights go out</li>
                <li>• Voltage indicators show no supply</li>
                <li>• Contactors drop out audibly</li>
                <li>• Status lights extinguish</li>
                <li>• Motor run-down sounds cease</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Don't Trust Your Eyes Alone:</p>
          <p className="text-sm text-gray-300">
            Visual indication is useful but never sufficient on its own. Always use proper test equipment to verify isolation. 
            Some equipment may continue running on alternative supplies, and voltage can be present even when equipment appears off.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Lockout/Tagout (LOTO) Systems</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Professional LOTO Implementation:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-orange-400 mb-2">Lock Selection:</p>
              <ul className="space-y-1 text-xs">
                <li>• Unique keying - no duplicate keys</li>
                <li>• Durable construction for industrial use</li>
                <li>• Weather resistant for outdoor applications</li>
                <li>• Colour coding for identification</li>
                <li>• Company standardisation preferred</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-orange-400 mb-2">Tag Information:</p>
              <ul className="space-y-1 text-xs">
                <li>• Worker name and contact details</li>
                <li>• Date and time of isolation</li>
                <li>• Reason for isolation/work description</li>
                <li>• Expected completion time</li>
                <li>• Supervisor contact information</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Group Lockout Procedures:</p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Multiple Worker Protocol:</p>
            <ul className="space-y-1 text-sm">
              <li>• Each worker applies their own personal lock</li>
              <li>• Use group lockout hasps for multiple locks</li>
              <li>• Designated person controls master procedure</li>
              <li>• Written permit-to-work documentation</li>
              <li>• Clear communication protocols established</li>
              <li>• Final verification before work commencement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Common Isolation Failures</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-red-400 mb-2">Procedural Failures:</p>
            <ul className="space-y-1 text-xs">
              <li>• Skipping steps under time pressure</li>
              <li>• Inadequate identification of supply sources</li>
              <li>• Failure to test voltage indicator proving</li>
              <li>• Wrong circuit isolated due to poor labelling</li>
              <li>• Removal of others' locks without permission</li>
            </ul>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-red-400 mb-2">Equipment Failures:</p>
            <ul className="space-y-1 text-xs">
              <li>• Faulty voltage indicators giving false readings</li>
              <li>• Defective isolation devices not fully opening</li>
              <li>• Inadequate locks easily broken or bypassed</li>
              <li>• Non-GS38 compliant test equipment used</li>
              <li>• Damaged test leads with internal breaks</li>
            </ul>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Prevention Strategies:</p>
          <ul className="space-y-1 text-sm">
            <li>• Regular equipment calibration and testing</li>
            <li>• Comprehensive training and competency assessment</li>
            <li>• Clear written procedures and checklists</li>
            <li>• Regular safety audits and observations</li>
            <li>• Culture of challenging unsafe practices</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default HowToIsolateSection;
