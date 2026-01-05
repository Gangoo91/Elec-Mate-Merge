import { ArrowLeft, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const Module6Section4_4 = () => {
  useSEO(
    "Common Faults Found During Continuity/Polarity Tests - Level 2 Electrical Testing & Inspection",
    "Identifying and understanding common faults discovered during continuity and polarity testing"
  );

  // Quiz questions with 4 options each
  const quizQuestions = [
    {
      id: 1,
      question: "What is an open circuit?",
      options: ["A circuit with too many connections", "A break in continuity of the conductor", "A short circuit", "A perfectly working circuit"],
      correctAnswer: 1,
      explanation: "An open circuit is a break in continuity of the conductor, preventing current flow through the complete circuit path."
    },
    {
      id: 2,
      question: "What does a high resistance joint cause?",
      options: ["Cooling of the conductor", "Overheating and possible fire risk", "Faster current flow", "Better circuit performance"],
      correctAnswer: 1,
      explanation: "High resistance joints cause overheating due to increased I²R losses, creating a significant fire risk."
    },
    {
      id: 3,
      question: "What is the risk of a disconnected CPC?",
      options: ["Equipment may not function", "Exposed parts may become live under fault conditions", "Nothing, as neutral protects the system", "Improved energy efficiency"],
      correctAnswer: 1,
      explanation: "A disconnected CPC means exposed parts may become live under fault conditions, creating a serious shock hazard."
    },
    {
      id: 4,
      question: "What happens if line and neutral are reversed at a socket?",
      options: ["Circuit won't energise", "Appliances work but safety is compromised", "Protective devices trip instantly", "Power consumption increases"],
      correctAnswer: 1,
      explanation: "Appliances may work normally but safety is compromised as protective devices won't disconnect correctly during faults."
    },
    {
      id: 5,
      question: "Which instrument is best for confirming continuity?",
      options: ["Clamp meter", "Low resistance ohmmeter", "Socket tester", "Multimeter on voltage setting"],
      correctAnswer: 1,
      explanation: "A low resistance ohmmeter is specifically designed for accurate continuity measurements in electrical circuits."
    },
    {
      id: 6,
      question: "Why must a switch always interrupt the line conductor?",
      options: ["To reduce energy bills", "To prevent equipment being live when 'off'", "To make neutral visible", "To improve circuit efficiency"],
      correctAnswer: 1,
      explanation: "Switches must interrupt the line conductor to ensure equipment is truly dead when switched off, preventing shock hazards."
    },
    {
      id: 7,
      question: "Which of the following is a common cause of open circuits?",
      options: ["Over-tightened CPC", "Loose terminations or damaged cable", "Correct polarity at sockets", "Proper cable routing"],
      correctAnswer: 1,
      explanation: "Loose terminations or damaged cables are the most common causes of open circuits in electrical installations."
    },
    {
      id: 8,
      question: "What effect can poor workmanship have on polarity?",
      options: ["No effect at all", "Can cause reversed polarity or missing CPC connections", "Can only cause high insulation readings", "Only affects aesthetics"],
      correctAnswer: 1,
      explanation: "Poor workmanship commonly results in reversed polarity or missing CPC connections, compromising installation safety."
    },
    {
      id: 9,
      question: "How should faults be recorded during testing?",
      options: ["Ignored if the circuit works", "Clearly on the test sheet and rectified before energising", "Noted verbally only", "Recorded after energising"],
      correctAnswer: 1,
      explanation: "All faults must be clearly recorded on test sheets and rectified before energising for safety and compliance."
    },
    {
      id: 10,
      question: "What should never be done if a CPC fault is found?",
      options: ["Continue testing other circuits", "Energise the circuit", "Record the fault", "Report to supervisor"],
      correctAnswer: 1,
      explanation: "Never energise a circuit with a known CPC fault as this creates serious shock hazards to users."
    }
  ];

  const faqs = [
    {
      question: "Can appliances still work if polarity is reversed?",
      answer: "Yes, but the installation is unsafe because protective devices may not operate correctly."
    },
    {
      question: "Is a high resistance joint always obvious?",
      answer: "No, often the circuit works normally but generates heat over time, posing a fire risk."
    },
    {
      question: "What should be done if an open circuit is found?",
      answer: "Locate and repair the break or loose connection before the circuit is energised."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg bg-card">
              <CheckCircle className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 6.4.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Common Faults Found During Continuity/Polarity Tests
          </h1>
          <p className="text-muted-foreground">
            Recognise common faults found during continuity and polarity tests
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-3">In 30 seconds</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Open circuits break conductor continuity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>High resistance joints cause overheating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Disconnected CPC = shock hazard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Reversed polarity compromises safety</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Open circuits, loose connections, reversed wiring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Low resistance ohmmeter, two-pole voltage tester</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> All circuits before energising</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Continuity and polarity testing are designed not only to confirm correct wiring but also to identify common faults that compromise safety and functionality. These tests reveal issues such as open circuits, incorrect polarity, high resistance joints, and missing CPCs. If left undetected, these faults can result in electric shock, fire hazards, or premature equipment failure.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-3 text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise common faults found during continuity and polarity tests</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the causes and consequences of each fault</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply test methods to identify and confirm faults</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Record and report faults in line with BS 7671 requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Outline the corrective actions for common test failures</span>
            </li>
          </ul>
        </Card>


        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Common Continuity Faults */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Common Continuity Faults</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Open Circuit Conductors:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Caused by loose terminations at accessories or distribution boards</li>
                           <li>Broken wires due to damage during installation or maintenance</li>
                           <li>Missing links or connections in ring circuits</li>
                           <li>Corroded or damaged cable cores</li>
                           <li>Inadequate termination in connector blocks</li>
                         </ul>
                         <div className="mt-3 space-y-2">
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Prevents current flow through complete circuit path</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Detected by infinite resistance readings during continuity tests</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Confirms parallel earth paths are properly connected and provide redundancy</span>
                           </div>
                         </div>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>High Resistance Joints:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Poor connections due to inadequate tightening of terminals</li>
                           <li>Corroded terminals from moisture ingress or age</li>
                           <li>Oxidation at brass or copper connections</li>
                           <li>Loose connections causing arcing and further deterioration</li>
                           <li>Inadequate surface area contact in crimped connections</li>
                         </ul>
                         <div className="mt-3 space-y-2">
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Causes overheating due to increased I²R losses</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Creates significant fire risk from excessive heat generation</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">May not be obvious during normal operation but degrades over time</span>
                           </div>
                         </div>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Disconnected CPC:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Loss of protective earthing creating severe shock risk</li>
                           <li>Missing earth connections at socket outlets</li>
                           <li>Broken earth continuity in ring circuits</li>
                           <li>Inadequate earth bonding connections</li>
                           <li>Damaged earth cores during cable installation</li>
                         </ul>
                         <div className="mt-3 space-y-2">
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Exposed metalwork may become live under fault conditions</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Protective devices cannot operate effectively without earth path</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                             <span className="text-xs sm:text-sm text-foreground">Creates serious electric shock hazard to users</span>
                           </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* InlineCheck after Section 1 */}
          <div className="mt-6">
            <InlineCheck
              id="continuity-faults-check"
              question="Which reading most strongly indicates an open circuit during continuity testing?"
              options={[
                "Very low resistance",
                "Infinite resistance",
                "230 V present",
                "0 A current"
              ]}
              correctIndex={1}
              explanation="An infinite resistance reading (often displayed as 'OL' or no reading) indicates a complete break in the circuit path, confirming an open circuit."
            />
          </div>

          {/* 2. Common Polarity Faults */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Common Polarity Faults</p>
                    
                    <div className="space-y-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Line and Neutral Reversed:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Appliances may still operate but protective devices won't function correctly</li>
                            <li>Internal fuses and switches in appliances designed to break line conductor only</li>
                            <li>RCD protection effectiveness reduced when polarity is incorrect</li>
                            <li>Creates false sense of security for users and maintenance personnel</li>
                            <li>Socket outlets with reversed connections compromise appliance safety features</li>
                            <li>Class I appliances may have exposed metalwork become live</li>
                            <li>Emergency switches and isolators may not provide true disconnection</li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Switch Wired in Neutral:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Equipment remains permanently live even when switched off</li>
                            <li>Serious shock hazard during maintenance, lamp changes, or cleaning</li>
                            <li>Violates BS 7671 Regulation 132.7 requiring single-pole devices to break line</li>
                            <li>Creates dangerous working conditions for electricians and users</li>
                            <li>Light fittings remain energised when switch appears to be off</li>
                            <li>Smart switches and dimmers may malfunction or become unsafe</li>
                            <li>Emergency lighting circuits compromised when switching neutral instead of line</li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Incorrect Polarity at Multiway Lighting:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Can cause flickering, erratic operation, or premature lamp failure</li>
                            <li>Dangerous energisation of supposedly dead circuits during maintenance</li>
                            <li>Confusion about circuit status when testing or troubleshooting</li>
                            <li>Potential for cross-energisation between different lighting circuits</li>
                            <li>Two-way and intermediate switches may not operate correctly</li>
                            <li>Strappers incorrectly connected causing permanent live conditions</li>
                            <li>Mixed polarity in multi-gang switch plates creating hazardous conditions</li>
                          </ul>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* InlineCheck after Section 2 */}
          <div className="mt-6">
            <InlineCheck
              id="polarity-faults-check"
              question="Why must a single-pole switch break the line conductor rather than the neutral?"
              options={[
                "To reduce energy bills",
                "To ensure equipment isn't live when switched off",
                "To share load on neutrals",
                "To prevent RCD tripping"
              ]}
              correctIndex={1}
              explanation="Single-pole switches must break the line conductor to ensure equipment is truly dead when switched off, preventing shock hazards during maintenance or lamp changes."
            />
          </div>
        </Card>

        {/* Content Card for Section 3 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          {/* 3. Interpretation of Results */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Interpretation of Results</p>
                    
                    <div className="space-y-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Acceptable Values and Limits:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>CPC continuity: should not exceed (R1 + R2) values specified in BS 7671</li>
                            <li>Ring circuit end-to-end resistance: typically 0.05Ω to 1.67Ω depending on cable size</li>
                            <li>Polarity confirmation: correct at all points - no tolerance for incorrect connections</li>
                            <li>High resistance joints: any reading significantly above cable resistance indicates problems</li>
                            <li>Temperature coefficient considerations for different cable materials and ambient conditions</li>
                          </ul>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-foreground">All results must comply with BS 7671 requirements before energisation</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-foreground">Document any readings that appear higher than expected for investigation</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-foreground">Consider cable length, cross-sectional area, and material when evaluating results</span>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* InlineCheck after Section 3 */}
          <div className="mt-6">
            <InlineCheck
              id="results-interpretation-check"
              question="A much higher than expected R1+R2 reading suggests what type of fault?"
              options={[
                "Short circuit",
                "High resistance joint",
                "Correct continuity",
                "Open circuit in CPC"
              ]}
              correctIndex={1}
              explanation="A much higher than expected R1+R2 reading typically indicates a high resistance joint somewhere in the circuit, which could cause overheating and fire risk."
            />
          </div>

          {/* 4. Causes and Testing Methods */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Causes and Testing Methods</p>
                    
                    <div className="space-y-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Common Causes of Continuity and Polarity Faults:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Poor workmanship or inadequate training in electrical installation practices</li>
                            <li>Incorrect reading of circuit drawings, specifications, or installation instructions</li>
                            <li>Physical damage to cables during installation from drilling, crushing, or impact</li>
                            <li>Inadequate inspection and testing procedures before circuit energisation</li>
                            <li>Time pressure and commercial deadlines leading to installation shortcuts</li>
                            <li>Lack of understanding of BS 7671 requirements for polarity and continuity</li>
                            <li>Use of incorrect or damaged installation tools and equipment</li>
                            <li>Poor communication between design engineers and installation teams</li>
                            <li>Inadequate supervision of inexperienced or trainee electricians</li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Test Methods to Confirm and Diagnose Faults:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Low resistance ohmmeter for accurate continuity measurements and CPC verification</li>
                            <li>Two-pole voltage tester for definitive polarity confirmation at accessories</li>
                            <li>Comprehensive visual inspection for physical damage before electrical testing</li>
                            <li>Progressive testing techniques to isolate faults in ring and radial circuits</li>
                            <li>Insulation resistance testing to identify damaged conductors and poor terminations</li>
                            <li>Earth fault loop impedance testing to verify complete earth paths</li>
                            <li>Functional testing of RCDs and other protective devices after fault rectification</li>
                            <li>Thermal imaging to identify high resistance joints and overheating connections</li>
                            <li>Sequence testing in complex installations to methodically identify problem areas</li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Serious Consequences of Undetected Faults:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Increased fire risk from overheating joints causing ignition of surrounding materials</li>
                            <li>Fatal electric shock hazards due to live exposed metalwork and failed protection</li>
                            <li>Nuisance tripping or complete failure of protective devices during fault conditions</li>
                            <li>Costly rework, project delays, and potential legal liability for unsafe installations</li>
                            <li>Equipment damage from incorrect polarity and inadequate earth protection</li>
                            <li>Regulatory non-compliance with Building Regulations and electrical safety standards</li>
                            <li>Insurance claims rejection due to proven electrical defects causing incidents</li>
                            <li>Professional reputation damage and potential removal from competent person schemes</li>
                            <li>HSE investigation and prosecution under Health and Safety at Work Act provisions</li>
                          </ul>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* InlineCheck after Section 4 */}
          <div className="mt-6">
            <InlineCheck
              id="testing-methods-check"
              question="Which tool confirms polarity at a socket outlet most definitively?"
              options={[
                "Clamp meter",
                "Two-pole voltage tester",
                "Non-contact voltage pen",
                "Socket neon tester only"
              ]}
              correctIndex={1}
              explanation="A two-pole voltage tester can definitively confirm polarity by measuring between specific terminals, unlike single-pole testers that only confirm presence of voltage."
            />
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="space-y-3 text-base text-foreground">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Always isolate and prove dead before opening circuits for investigation</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Check all connections are tight, clean, and accessible before testing</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Where faults are suspected, test progressively (e.g., break down ring circuits into halves)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Record faults clearly in test sheets and notify supervisors immediately</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Never energise a circuit with a known polarity or CPC fault</span>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example: Kitchen Circuit Fault</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-emerald-500/20">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Scenario</h3>
                  <p className="text-xs sm:text-sm text-foreground">
                    A domestic kitchen was being rewired with a new 32A ring final circuit to BS 7671 standards. The circuit included 8 socket outlets and was wired with 2.5mm² T&E cable. All installation work appeared complete and ready for testing.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Testing</h3>
                  <p className="text-xs sm:text-sm text-foreground">
                    During initial continuity testing, the electrician measured:
                  </p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1 mt-2">
                    <li>End-to-end line resistance: 0.82Ω (expected ~0.8Ω)</li>
                    <li>End-to-end neutral resistance: 0.84Ω (expected ~0.8Ω)</li>
                    <li>End-to-end CPC resistance: Infinite (∞) - FAULT DETECTED</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Investigation</h3>
                  <p className="text-xs sm:text-sm text-foreground">
                    The open CPC reading triggered immediate investigation. Testing each socket in sequence revealed the fault between sockets 4 and 5. Visual inspection at socket 4 showed the CPC terminal screw was finger-tight only - the cable had pulled out during final fitting.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Corrective Action</h3>
                  <p className="text-xs sm:text-sm text-foreground">
                    The terminal was properly tightened and retested. Final readings: Line 0.82Ω, Neutral 0.84Ω, CPC 0.85Ω - all within acceptable limits. The circuit was then successfully energised after completing insulation resistance and RCD tests.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Lesson</h3>
                  <p className="text-xs sm:text-sm text-foreground">
                    Without proper testing, this kitchen would have been energised with no earth protection on half the ring circuit. Any fault in appliances connected to sockets 5-8 could have made their metalwork live, creating fatal shock risks for users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-primary/50 bg-card p-4 rounded-r-lg">
                <p className="font-medium text-foreground mb-2">{faq.question}</p>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Guide (Key Takeaways)</h2>
          <div className="grid gap-4 text-sm">
            <div className="p-4 rounded-lg bg-card border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-400 mb-2">Common Faults</p>
              <p>Open circuits, reversed polarity, high resistance joints, and disconnected CPCs</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-orange-500/20">
              <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Consequences</p>
              <p>Shock hazards, fire risk, and failure of protective devices</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-emerald-500/20">
              <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Testing</p>
              <p>Use continuity and polarity tests to confirm conductor integrity</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-purple-500/20">
              <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Action</p>
              <p>Always rectify and document faults before energising</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground mb-6">Master the four key areas of fault identification and resolution:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card border border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Know It
              </h3>
              <p className="text-xs sm:text-sm text-foreground">Common faults: open circuits, high resistance joints, disconnected CPCs, and reversed polarity</p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-400 dark:text-emerald-400 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                Spot It
              </h3>
              <p className="text-xs sm:text-sm text-foreground">Visual cues: scorching, loose terminals, incorrect connections, and damaged cables</p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-emerald-500/20">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                Test It
              </h3>
              <p className="text-xs sm:text-sm text-foreground">Measurements: infinite resistance = open circuit, high R1+R2 = poor joints, polarity confirmation</p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-amber-500/20">
              <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                Fix It
              </h3>
              <p className="text-xs sm:text-sm text-foreground">Actions: rectify all faults, document clearly, retest, then safely energise the circuit</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button variant="outline" asChild>
            <Link to="../4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Polarity Testing
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="..">
              Section Overview
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section4_4;