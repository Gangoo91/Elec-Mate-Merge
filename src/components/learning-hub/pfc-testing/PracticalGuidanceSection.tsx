import React from 'react';
import { AlertTriangle, CheckCircle2, Target, Wrench, Clock, Zap, Shield, TrendingUp, Settings, Users } from 'lucide-react';

const PracticalGuidanceSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Quick Assessment Guidelines</h4>
      </div>
      <div className="space-y-4 text-xs sm:text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-3 w-3 text-green-400" />
              <p className="font-medium text-green-400">Excellent (Pass)</p>
            </div>
            <div className="space-y-1 text-xs">
              <p><strong>PFC &gt; 10× minimum required</strong></p>
              <p>• 32A Type B: &gt;1600A</p>
              <p>• 20A Type B: &gt;1000A</p>
              <p>• 16A Type C: &gt;1600A</p>
              <p>• Excellent safety margins</p>
              <p>• Future-proof installation</p>
              <p>• No action required</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-3 w-3 text-yellow-400" />
              <p className="font-medium text-yellow-400">Acceptable (Pass)</p>
            </div>
            <div className="space-y-1 text-xs">
              <p><strong>PFC = 2-10× minimum required</strong></p>
              <p>• 32A Type B: 320-1600A</p>
              <p>• 20A Type B: 200-1000A</p>
              <p>• 16A Type C: 320-1600A</p>
              <p>• Meets BS 7671 requirements</p>
              <p>• Monitor for changes</p>
              <p>• Consider improvements</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-3 w-3 text-red-400" />
              <p className="font-medium text-red-400">Marginal/Fail</p>
            </div>
            <div className="space-y-1 text-xs">
              <p><strong>PFC &lt; 2× minimum required</strong></p>
              <p>• 32A Type B: &lt;320A</p>
              <p>• 20A Type B: &lt;200A</p>
              <p>• 16A Type C: &lt;320A</p>
              <p>• May not comply with BS 7671</p>
              <p>• Investigate immediately</p>
              <p>• Remedial action required</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Practical Live Testing Tips</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Pre-Live Test Preparation:</p>
            <div className="space-y-1 text-xs">
              <p>• Complete live working risk assessment</p>
              <p>• Remove all loads whilst keeping circuit energised</p>
              <p>• Check test equipment calibration and live working suitability</p>
              <p>• Verify proving unit operation</p>
              <p>• Ensure test leads are rated for live working</p>
              <p>• Brief others about live testing activities and hazards</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">During Live Testing Safety:</p>
            <div className="space-y-1 text-xs">
              <p>• PFC testing MUST be performed on live circuits</p>
              <p>• Test at circuit origin with circuit energised</p>
              <p>• Make secure, low-resistance connections safely</p>
              <p>• Take phase-earth measurement first</p>
              <p>• Record readings immediately</p>
              <p>• Keep live working duration to minimum</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-green-400 mb-3">Common PFC Testing Mistakes to Avoid:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Circuit Preparation Issues:</p>
              <p>• Testing on dead/isolated circuits (WRONG for PFC)</p>
              <p>• Leaving loads connected during testing</p>
              <p>• Poor contact at live terminals</p>
              <p>• Using inappropriate test leads for live work</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Live Working Safety:</p>
              <p>• Inadequate PPE for live working</p>
              <p>• Poor live working technique</p>
              <p>• Insufficient barriers around live parts</p>
              <p>• Wrong circuit identification whilst live</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Recording Errors:</p>
              <p>• Not documenting live test conditions</p>
              <p>• Mixing up circuit references</p>
              <p>• Failing to note live working precautions</p>
              <p>• Illegible handwriting due to live working pressure</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Troubleshooting Low PFC Readings</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Immediate Live Circuit Checks:</p>
            <div className="space-y-1 text-xs">
              <p>• Repeat live test to confirm reading</p>
              <p>• Check test equipment operation on live circuit</p>
              <p>• Verify live test lead connections are secure</p>
              <p>• Ensure circuit remains energised during testing</p>
              <p>• Check for parallel paths through connected equipment</p>
              <p>• Confirm correct live circuit identification</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Live System Investigation Steps:</p>
            <div className="space-y-1 text-xs">
              <p>• Test at supply intake (Ze measurement on live supply)</p>
              <p>• Check main bonding connections with supply live</p>
              <p>• Verify consumer unit earthing with system energised</p>
              <p>• Inspect cable routes and joints</p>
              <p>• Consider cable length and size effects on live system</p>
              <p>• Review installation method and live system performance</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-orange-400 mb-3">Common Causes of Low PFC:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Supply-Related:</p>
              <p>• High external earth fault loop impedance (Ze)</p>
              <p>• Poor DNO earthing arrangements</p>
              <p>• Long supply cable runs</p>
              <p>• Transformer impedance variations</p>
              <p>• Supply voltage fluctuations</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Installation Issues:</p>
              <p>• Undersized circuit conductors</p>
              <p>• Long circuit runs</p>
              <p>• Poor connection quality</p>
              <p>• Corroded terminals or joints</p>
              <p>• High resistance earth paths</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">System Problems:</p>
              <p>• TT system with high earth electrode resistance</p>
              <p>• Missing or damaged bonding</p>
              <p>• Inadequate earthing conductor size</p>
              <p>• Parallel earth paths issues</p>
              <p>• Age-related deterioration</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">When PFC is Inadequate - Action Required</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-red-400 mb-2">Immediate Actions:</p>
            <div className="space-y-1 text-xs">
              <p>• Document the deficiency clearly</p>
              <p>• Advise client of non-compliance</p>
              <p>• Consider temporary RCD protection</p>
              <p>• Restrict circuit use if necessary</p>
              <p>• Plan remedial works programme</p>
              <p>• Set realistic completion timescales</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-red-400 mb-2">Remedial Options:</p>
            <div className="space-y-1 text-xs">
              <p>• Upgrade circuit conductors</p>
              <p>• Install lower-rated protective devices</p>
              <p>• Improve supply earthing arrangements</p>
              <p>• Add supplementary bonding</p>
              <p>• Consider alternative protection methods</p>
              <p>• Request DNO supply upgrade</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-red-400 mb-3">Cost-Effective Solutions by Circuit Type:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Lighting Circuits:</p>
              <p>• Reduce MCB rating (32A → 20A → 16A)</p>
              <p>• Split long circuits into shorter runs</p>
              <p>• Use RCD protection as backup</p>
              <p>• Consider LED lighting to reduce load</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Socket Circuits:</p>
              <p>• Install RCBOs for combined protection</p>
              <p>• Upgrade to larger conductors</p>
              <p>• Split ring into radial circuits</p>
              <p>• Add local distribution points</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">High-Power Circuits:</p>
              <p>• Dedicated supply arrangements</p>
              <p>• Three-phase distribution</p>
              <p>• Local sub-distribution boards</p>
              <p>• Specialist protection devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Settings className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Test Equipment Selection and Use</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Equipment Requirements:</p>
            <div className="space-y-1 text-xs">
              <p>• Measurement range: 10A to 25kA minimum</p>
              <p>• Accuracy: ±5% of reading ±2 digits</p>
              <p>• CAT III 600V safety rating</p>
              <p>• Current calibration certificate</p>
              <p>• Fused test leads and probes</p>
              <p>• Proving unit for verification</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Popular Test Instruments:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Kewtech KT64:</strong> Dedicated PFC tester</p>
              <p>• <strong>Megger MFT1741:</strong> Multifunction capability</p>
              <p>• <strong>Fluke 1664FC:</strong> Advanced features</p>
              <p>• <strong>Metrel MI3152:</strong> Professional range</p>
              <p>• <strong>Socket & See PFCT1:</strong> Budget option</p>
              <p>• All require annual calibration</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-purple-400 mb-3">Test Equipment Care and Maintenance:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Daily Checks:</p>
              <p>• Battery condition and charge level</p>
              <p>• Test lead condition and continuity</p>
              <p>• Display clarity and operation</p>
              <p>• Physical damage inspection</p>
              <p>• Function test with proving unit</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Storage and Transport:</p>
              <p>• Protective carrying case</p>
              <p>• Avoid extreme temperatures</p>
              <p>• Protect from moisture and dust</p>
              <p>• Secure during transport</p>
              <p>• Regular cleaning and maintenance</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Calibration Schedule:</p>
              <p>• Annual calibration certificate</p>
              <p>• Use UKAS accredited laboratory</p>
              <p>• Keep calibration records</p>
              <p>• Plan ahead for calibration due dates</p>
              <p>• Have backup equipment available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-teal-400" />
        <h4 className="font-medium text-teal-400">Documentation and Record Keeping</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-teal-400 mb-2">Essential Test Records:</p>
            <div className="space-y-1 text-xs">
              <p>• Circuit identification and description</p>
              <p>• Protective device type and rating</p>
              <p>• Phase-earth PFC measurement</p>
              <p>• Phase-neutral PFC if measured</p>
              <p>• Test method used (direct/calculated)</p>
              <p>• Environmental conditions</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-teal-400 mb-2">Quality Information:</p>
            <div className="space-y-1 text-xs">
              <p>• Test instrument details and calibration</p>
              <p>• Test lead specifications</p>
              <p>• Date and time of testing</p>
              <p>• Ambient temperature</p>
              <p>• Any anomalies or observations</p>
              <p>• Tester signature and qualification</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-teal-400 mb-3">Professional Documentation Standards:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Legibility:</p>
              <p>• Clear, permanent ink</p>
              <p>• Neat handwriting or printing</p>
              <p>• No correction fluid or rubbing out</p>
              <p>• Single line through errors</p>
              <p>• Initial all corrections</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Completeness:</p>
              <p>• All sections completed</p>
              <p>• No blank cells without explanation</p>
              <p>• Appropriate use of N/A</p>
              <p>• Consistent units throughout</p>
              <p>• All signatures present</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Storage:</p>
              <p>• Secure filing system</p>
              <p>• Protection from damage</p>
              <p>• Easy retrieval system</p>
              <p>• Backup copies where practical</p>
              <p>• Retention in line with regulations</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Real-World Live Testing Examples</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-cyan-400 mb-3">Example 1: Domestic Kitchen Ring Circuit (Live Test)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Live Test Results:</p>
              <div className="space-y-1">
                <p>• Circuit: Kitchen sockets (ring final) - TESTED LIVE</p>
                <p>• Protection: 32A Type B MCB</p>
                <p>• Measured PFC: 420A (L-E) from live supply</p>
                <p>• Required minimum: 160A</p>
                <p>• Safety margin: 420÷160 = 2.6×</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Live Test Assessment:</p>
              <div className="space-y-1">
                <p>• <strong>Result: SATISFACTORY ✓</strong></p>
                <p>• Exceeds minimum requirements when tested live</p>
                <p>• Good safety margin provided</p>
                <p>• Magnetic operation assured with live supply</p>
                <p>• No remedial action required</p>
                <p>• Monitor during future live inspections</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-cyan-400 mb-3">Example 2: Commercial Lighting Circuit (Live Test)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Live Test Results:</p>
              <div className="space-y-1">
                <p>• Circuit: Office lighting (radial) - TESTED LIVE</p>
                <p>• Protection: 20A Type B MCB</p>
                <p>• Measured PFC: 85A (L-E) from live supply</p>
                <p>• Required minimum: 100A</p>
                <p>• Safety margin: 85÷100 = 0.85× ❌</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Live Test Assessment:</p>
              <div className="space-y-1">
                <p>• <strong>Result: UNSATISFACTORY ✗</strong></p>
                <p>• Below minimum requirements even with live supply</p>
                <p>• Magnetic operation not assured</p>
                <p>• Remedial action required</p>
                <p>• Options: reduce MCB to 16A or upgrade cable</p>
                <p>• Consider RCD protection as interim measure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-cyan-400 mb-3">Example 3: Outbuilding Supply (TT System Live Test)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Live Test Results:</p>
              <div className="space-y-1">
                <p>• Circuit: Garage workshop socket - TESTED LIVE</p>
                <p>• Protection: 20A Type B MCB + 30mA RCD</p>
                <p>• Measured PFC: 18A (L-E) from live TT supply</p>
                <p>• Required minimum: 100A</p>
                <p>• Safety margin: 18÷100 = 0.18× ❌</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Live Test Assessment:</p>
              <div className="space-y-1">
                <p>• <strong>MCB protection: INADEQUATE</strong></p>
                <p>• <strong>RCD protection: EFFECTIVE ✓</strong></p>
                <p>• TT system - RCD essential for safety</p>
                <p>• 30mA RCD provides required protection</p>
                <p>• Earth electrode resistance limits live PFC</p>
                <p>• Installation compliant with BS 7671</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-indigo-400" />
        <h4 className="font-medium text-indigo-400">Communication with Clients</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-indigo-400 mb-2">Explaining PFC to Non-Technical Clients:</p>
            <div className="space-y-1 text-xs">
              <p>• "Tests the ability to cut power quickly during faults"</p>
              <p>• "Like checking brakes work properly on a car"</p>
              <p>• "Ensures safety systems operate as designed"</p>
              <p>• "Required by electrical safety regulations"</p>
              <p>• "Prevents electric shock and fire risks"</p>
              <p>• Avoid technical jargon and complex theory</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-indigo-400 mb-2">When Results Are Unsatisfactory:</p>
            <div className="space-y-1 text-xs">
              <p>• Explain the safety implications clearly</p>
              <p>• Provide options with cost estimates</p>
              <p>• Advise on priority and urgency</p>
              <p>• Offer temporary safety measures</p>
              <p>• Document advice given in writing</p>
              <p>• Follow up to ensure action taken</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-indigo-400 mb-3">Professional Advice Templates:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Satisfactory Results:</p>
              <div className="bg-muted rounded p-2">
                <p>"The prospective fault current tests show that your electrical safety devices will operate correctly in the event of a fault. This confirms that your installation meets current safety standards and provides good protection for users."</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Unsatisfactory Results:</p>
              <div className="bg-muted rounded p-2">
                <p>"The tests indicate that some protective devices may not operate quickly enough during electrical faults. This could present a safety risk. I recommend [specific remedial work] to bring the installation up to current safety standards."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PracticalGuidanceSection;
