import { ArrowLeft, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section4_3 = () => {
  useSEO(
    "Confirming Polarity of Switches and Accessories - Level 2 Electrical Testing & Inspection",
    "Essential polarity testing procedures to ensure correct wiring and electrical safety"
  );


  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What does polarity testing confirm?",
      options: ["Correct connection of line, neutral, and CPC", "Earth loop impedance values", "Insulation resistance"],
      correctAnswer: 0,
      explanation: "Polarity testing confirms the correct connection of line, neutral, and CPC conductors to their intended terminals."
    },
    {
      id: 2,
      question: "Which conductor must always be switched?",
      options: ["Neutral", "Line", "CPC"],
      correctAnswer: 1,
      explanation: "The line conductor must always be switched to ensure proper isolation when the switch is in the off position."
    },
    {
      id: 3,
      question: "What tool is used to confirm polarity safely?",
      options: ["Socket tester", "Two-pole voltage tester", "Clamp meter"],
      correctAnswer: 1,
      explanation: "A two-pole voltage tester is the proper instrument for safely confirming polarity in electrical installations."
    },
    {
      id: 4,
      question: "What is the risk if the switch interrupts the neutral instead of the line?",
      options: ["No risk if CPC is present", "The circuit remains live, even if switched off", "Overheating only"],
      correctAnswer: 1,
      explanation: "If a switch interrupts the neutral instead of line, the circuit remains live even when switched off, creating a serious shock hazard."
    },
    {
      id: 5,
      question: "When must polarity testing be carried out?",
      options: ["Only during EICR inspections", "During initial verification, alterations, and fault-finding", "Only if sockets fail"],
      correctAnswer: 1,
      explanation: "Polarity testing is required during initial verification, after alterations or additions, and during fault-finding procedures."
    },
    {
      id: 6,
      question: "What happens if line and neutral are reversed at a socket?",
      options: ["Appliances won't work", "Appliances work but safety devices won't disconnect properly", "It has no effect"],
      correctAnswer: 1,
      explanation: "Reversed polarity means appliances may function but internal fuses and safety devices won't operate correctly during faults."
    },
    {
      id: 7,
      question: "Which test instrument can measure low resistance for polarity checks?",
      options: ["Insulation tester", "Low resistance ohmmeter", "Clamp meter"],
      correctAnswer: 1,
      explanation: "A low resistance ohmmeter is used for continuity checks to confirm polarity in electrical installations."
    },
    {
      id: 8,
      question: "Why is a socket tester not sufficient for polarity?",
      options: ["It is illegal to use them", "It only gives a basic indication, not full verification", "They cannot detect CPC"],
      correctAnswer: 1,
      explanation: "Socket testers only provide basic indication and are not a substitute for formal polarity testing with calibrated instruments."
    },
    {
      id: 9,
      question: "Which part of a lampholder must always be connected to neutral?",
      options: ["The shell (outer contact)", "The centre pin", "Both can be live"],
      correctAnswer: 0,
      explanation: "The lampholder shell (outer contact) must always be connected to neutral to prevent shock hazards when changing bulbs."
    },
    {
      id: 10,
      question: "What should be done if incorrect polarity is discovered?",
      options: ["Record it only", "Immediately rectify the fault before energising", "Ignore it if CPC is present"],
      correctAnswer: 1,
      explanation: "Incorrect polarity must be immediately rectified before energising as it poses serious safety risks regardless of CPC connection."
    }
  ];

  const faqs = [
    {
      question: "Can I rely on a plug-in socket tester for polarity?",
      answer: "No. Socket testers give a quick indication but do not replace formal polarity tests with calibrated instruments required for proper verification and certification."
    },
    {
      question: "Is polarity testing needed after replacing a light switch?",
      answer: "Yes, to ensure the switch is correctly interrupting the line conductor and not the neutral. This is essential for safety and compliance."
    },
    {
      question: "If polarity is wrong but CPC is connected, is it safe?",
      answer: "No — incorrect polarity is always unsafe and must be corrected regardless of CPC connection. The CPC doesn't mitigate polarity hazards."
    },
    {
      question: "How can I tell if polarity is correct just by looking?",
      answer: "Visual inspection alone cannot confirm polarity. Proper electrical testing with calibrated instruments is required to verify correct connections."
    },
    {
      question: "Do all circuits need polarity testing?",
      answer: "Yes, all final circuits must have polarity verified during initial verification, after modifications, and during periodic inspection and testing."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.4.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Confirming Polarity of Switches and Accessories
          </h1>
          <p className="text-white">
            Essential polarity testing procedures to ensure correct wiring and electrical safety
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-3">In 30 seconds</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Switches must break line conductors only</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Line, neutral, CPC must connect correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Wrong polarity = safety hazard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Test at sockets, switches, lights</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Reversed connections, wrong switching, incorrect lampholder wiring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Two-pole voltage tester, low-resistance ohmmeter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> All sockets, switches, lighting points</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Polarity testing ensures that electrical accessories such as sockets, switches, and lighting points are wired correctly, with line, neutral, and CPC conductors connected to their intended terminals. Incorrect polarity can make switches ineffective, energise exposed parts, or leave appliances permanently live, posing serious shock risks.
          </p>
          <p className="text-base text-white">
            Confirming polarity is therefore essential for compliance with BS 7671 and overall electrical safety.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Define polarity and its importance in electrical installations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Describe how to test polarity at outlets, switches, and distribution points</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise incorrect polarity faults and their consequences</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Use test instruments to confirm correct wiring</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand when polarity testing must be carried out in the installation process</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Importance of Polarity */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Importance of Polarity in Electrical Safety</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Switch Operation and Safety:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Ensures switches break the line conductor, not the neutral, providing true isolation when off</li>
                           <li>Prevents circuits remaining live when switch appears to be in off position</li>
                           <li>Critical for maintenance safety - workers expect switched-off circuits to be dead</li>
                           <li>Single-pole switches must interrupt line conductor to comply with BS 7671 requirements</li>
                           <li>Incorrect switching of neutral creates false sense of security during maintenance</li>
                           <li>Emergency isolation depends on switches actually disconnecting the energised conductor</li>
                           <li>Light switches controlling neutral instead of line leave lampholders permanently live</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Protection Against Electric Shock:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Prevents exposed metal parts from becoming live during normal operation</li>
                           <li>Ensures lampholder shells connected to neutral, reducing shock risk during bulb changes</li>
                           <li>Correct polarity enables proper operation of Class I appliance safety features</li>
                           <li>Internal appliance protection depends on correct line/neutral identification</li>
                           <li>Fuses and switches in appliances designed to interrupt line conductor only</li>
                           <li>Reversed polarity can energise appliance cases through internal wiring faults</li>
                            <li>RCD protection effectiveness reduced with incorrect polarity connections</li>
                          </ul>
                        </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Appliance and Equipment Safety:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Ensures appliances and accessories operate safely according to design specifications</li>
                           <li>Internal appliance protective devices (fuses, switches) only interrupt line conductor</li>
                           <li>Heating elements and motor windings designed with specific line/neutral arrangements</li>
                           <li>Electronic equipment requires correct polarity for internal safety circuits</li>
                           <li>LED drivers and switch-mode power supplies depend on proper polarity</li>
                           <li>Surge protection devices require correct line/neutral identification</li>
                           <li>Smart home devices and IoT equipment vulnerable to polarity reversal damage</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Regulatory Compliance and Legal Requirements:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>BS 7671:2018+A2:2022 Section 612.6 mandates polarity verification testing</li>
                           <li>Regulation 132.7 requires single-pole devices to break line conductors only</li>
                           <li>Part P Building Regulations compliance depends on correct polarity verification</li>
                           <li>Electricity at Work Regulations 1989 require safe electrical system operation</li>
                           <li>CDM Regulations place duties on electrical contractors for safe installations</li>
                           <li>Insurance validity may depend on proper electrical testing including polarity</li>
                           <li>Professional liability requires demonstration of competent polarity verification</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* 2. Testing Methods and Procedures */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Testing Methods and Procedures</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Testing at Socket Outlets:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Use multifunction tester or continuity test to confirm line, neutral, and CPC connections</li>
                           <li>Verify line conductor connects to right-hand terminal when viewed from front (BS 1363 standard)</li>
                           <li>Confirm neutral connects to left-hand terminal and CPC to top earth terminal</li>
                           <li>Test both sockets in double outlets - each must have correct polarity</li>
                           <li>Check switched socket outlets ensure switch interrupts line, not neutral</li>
                           <li>Verify USB sockets and smart sockets maintain correct polarity internally</li>
                           <li>Test industrial sockets (BS EN 60309) for correct phase sequence and polarity</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Testing at Switches:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Verify that the switch interrupts the line conductor, not neutral</li>
                           <li>Test continuity with switch open and closed to confirm correct conductor switching</li>
                           <li>For single-pole switches: ensure line conductor switched, neutral permanently connected</li>
                           <li>For two-way switching: verify correct strappers and switch line identification</li>
                           <li>Test intermediate switches to confirm proper line conductor control</li>
                           <li>Check dimmer switches maintain line switching even at minimum brightness</li>
                           <li>Smart switches and occupancy sensors must switch line conductor correctly</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Testing at Lighting Points:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Ensure the lampholder shell is connected to neutral, not line conductor</li>
                           <li>Verify centre contact of lampholder connects to switched line</li>
                           <li>Check pendant lights for correct flex colour coding and connections</li>
                           <li>Test ceiling roses for proper line, neutral, and CPC terminations</li>
                           <li>Confirm luminaire terminal blocks maintain correct polarity</li>
                           <li>LED fittings require verification of internal driver polarity</li>
                           <li>Emergency lighting circuits need polarity testing for proper operation</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Instruments and Equipment Used:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Low resistance ohmmeter for continuity checks and circuit identification</li>
                           <li>Two-pole voltage tester for proving live and confirming polarity safely</li>
                           <li>Socket tester (basic tool, but not substitute for formal testing)</li>
                           <li>Multifunction tester with continuity and polarity test functions</li>
                           <li>Installation tester capable of automated polarity verification</li>
                           <li>Non-contact voltage detector for initial safety checks</li>
                           <li>GS38 compliant test leads for safe electrical testing</li>
                          </ul>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* 3. Common Faults and Consequences */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Common Faults and Consequences</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Typical Polarity Faults:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Line and neutral reversed at socket terminals - most common domestic fault</li>
                           <li>Switch installed in the neutral instead of the line conductor</li>
                           <li>CPC not connected, leading to unsafe exposed metalwork</li>
                           <li>Multiway switching circuits incorrectly wired with wrong conductor identification</li>
                           <li>Lampholder shell connected to line instead of neutral</li>
                           <li>Industrial three-phase sockets with incorrect phase rotation</li>
                           <li>Mixed conductor colours from different installation periods</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Safety Consequences and Risks:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Electric shock from supposedly dead circuits that remain live</li>
                           <li>Appliance internal fuses fail to provide protection during fault conditions</li>
                           <li>Exposed metalwork becomes live during appliance internal faults</li>
                           <li>Light fixtures remain energised even when switch is off</li>
                           <li>Increased fire risk from unprotected fault currents</li>
                           <li>RCD devices may not operate correctly with reversed polarity</li>
                           <li>Electronic equipment damage from incorrect supply polarity</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Detection and Diagnosis:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Systematic testing with appropriate instruments during verification</li>
                           <li>Visual inspection of conductor colours and termination positions</li>
                           <li>Functional testing of switches to confirm correct conductor interruption</li>
                           <li>Socket polarity testing using calibrated test equipment</li>
                           <li>Continuity testing to trace conductor paths through installation</li>
                           <li>Voltage testing to confirm live and neutral identification</li>
                           <li>Documentation review to identify installation modifications</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Remedial Actions Required:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Immediate isolation of circuits with incorrect polarity</li>
                           <li>Rewiring of accessories to correct conductor terminations</li>
                           <li>Switch replacement to ensure line conductor interruption</li>
                           <li>Socket outlet rewiring to restore correct terminal connections</li>
                           <li>Lighting circuit modification for proper lampholder polarity</li>
                           <li>Complete retesting after remedial work to confirm corrections</li>
                           <li>Updated certification and documentation reflecting repairs</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>


        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Always isolate and prove dead before connecting test instruments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>When testing sockets, confirm both line and neutral positions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>For switches, check continuity with the switch open and closed to ensure it interrupts the line</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>For lighting, visually confirm wiring at the lampholder before testing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Record polarity results as part of the overall testing documentation</span>
            </li>
          </ul>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example: Commercial Polarity Fault Discovery</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Scenario</h3>
              <p className="text-base text-white mb-4">
                On a commercial project, polarity testing revealed that several socket outlets had line and neutral reversed. While appliances appeared to work, the internal fuses would not have disconnected the fault correctly, leaving equipment live and dangerous. Early polarity testing prevented energisation of a potentially lethal installation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Initial Discovery</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 ml-4 list-disc">
                <li><strong>Location:</strong> New office fit-out with 24 double socket outlets across open plan area</li>
                <li><strong>Symptoms:</strong> All sockets appeared functional during basic testing</li>
                <li><strong>Testing Phase:</strong> Polarity verification as part of initial electrical installation certificate</li>
                <li><strong>Equipment Used:</strong> Calibrated multifunction tester with polarity test function</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Findings and Analysis</h3>
              <div className="space-y-3">
                <div className="p-3 border border-red-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>⚠️ Critical Finding:</strong> 8 out of 24 sockets had reversed line and neutral connections</p>
                </div>
                <div className="p-3 border border-amber-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>🔍 Investigation:</strong> Installation contractor had mixed up conductor identification during termination</p>
                </div>
                <div className="p-3 border border-red-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>🚨 Safety Risk:</strong> Computer equipment internal protection would not operate correctly during faults</p>
                </div>
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>📋 Impact:</strong> Equipment could remain live during internal faults, creating shock hazards</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Immediate Actions and Resolution</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 ml-4 list-disc">
                <li><strong>Installation Halted:</strong> Work stopped immediately until polarity faults rectified</li>
                <li><strong>Client Notification:</strong> Building owner informed of safety issues and remedial requirements</li>
                <li><strong>Remedial Work:</strong> All affected sockets rewired with correct polarity</li>
                <li><strong>Retesting:</strong> Complete polarity verification repeated for entire installation</li>
                <li><strong>Quality Control:</strong> Additional supervision implemented for remaining work</li>
                <li><strong>Certification:</strong> EIC issued only after satisfactory polarity verification</li>
              </ul>
            </div>

            <div className="p-4 bg-transparent border border-green-500/20 rounded">
              <h4 className="font-semibold text-white mb-2">Learning Points</h4>
              <ul className="text-xs sm:text-sm text-white space-y-1 ml-4 list-disc">
                <li>Systematic polarity testing prevented dangerous installation energisation</li>
                <li>Correct polarity essential for equipment internal protection operation</li>
                <li>Early detection saved costly retrofitting after handover</li>
                <li>Proper testing protocols identify faults before they cause harm</li>
                <li>Quality assurance processes must include comprehensive polarity verification</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide</h2>
          <div className="bg-card border border-elec-yellow/20 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Key Takeaways</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• Polarity ensures correct connection of line, neutral, and CPC</li>
                  <li>• Switches must interrupt line conductors only</li>
                  <li>• Test at sockets, switches, and lighting points</li>
                  <li>• Always use proper instruments — not socket testers alone</li>
                  <li>• Record results for certification and compliance</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Critical Points</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• Wrong polarity = safety hazard</li>
                  <li>• Visual inspection is not enough</li>
                  <li>• Test during verification and alterations</li>
                  <li>• Rectify faults before energising</li>
                  <li>• Use calibrated test equipment only</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">What We Learned</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• The meaning and importance of polarity</li>
                <li>• Correct testing procedures at sockets, switches, and lights</li>
                <li>• Common polarity faults and their risks</li>
                <li>• Instruments and safe practices for confirming polarity</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Key Skills Gained</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• Polarity testing using proper instruments</li>
                <li>• Fault identification and risk assessment</li>
                <li>• Safe testing procedures and practices</li>
                <li>• Documentation and certification requirements</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="../4-2" className="flex items-center justify-center text-center">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1">
                <span className="block text-xs text-white">Previous</span>
                <span className="block font-medium">Subsection 4.2</span>
              </span>
            </Link>
          </Button>
          <Button className="flex-1 h-auto py-3 px-4" asChild>
            <Link to=".." className="flex items-center justify-center text-center">
              <span className="flex-1">
                <span className="block text-xs text-primary-foreground/80">Back to</span>
                <span className="block font-medium">Section 4 Overview</span>
              </span>
              <ArrowLeft className="w-4 h-4 ml-2 flex-shrink-0 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section4_3;