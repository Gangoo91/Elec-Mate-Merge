import { ArrowLeft, ArrowRight, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module3Section2 = () => {
  useSEO(
    "Power Circuits - Ring, Radial, Cooker, Motor | AM2 Module 3 Section 2",
    "Master power circuit installation for AM2 assessment - ring finals, radials, cooker circuits, and motor controls with professional workmanship standards"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "ring-open-consequence",
      question: "What happens if a ring final circuit is left open (one leg disconnected)?",
      options: [
        "It still works safely as designed",
        "It becomes an unprotected radial circuit",
        "The MCB will trip immediately",
        "Only half the sockets will work"
      ],
      correctIndex: 1,
      explanation: "An open ring becomes a radial circuit but is still protected by a 32A MCB, which exceeds the safe rating for 2.5mm² cable (20A max). This is a major safety issue and automatic fail."
    },
    {
      id: "cooker-workmanship",
      question: "Why do many candidates lose marks on cooker circuits?",
      options: [
        "Using wrong cable size",
        "Incorrect MCB rating",
        "Over-stripping cable sheath leaving bare conductors visible",
        "Poor earth connections"
      ],
      correctIndex: 2,
      explanation: "The most common error is over-stripping the cable sheath, leaving bare conductors visible at the outlet plate. The sheath must enter the accessory to maintain protection."
    },
    {
      id: "swa-gland-check",
      question: "What does the assessor specifically check at an SWA gland?",
      options: [
        "Cable entry angle only",
        "Gland tightness only", 
        "Mechanical strength and earth continuity",
        "Cable identification"
      ],
      correctIndex: 2,
      explanation: "The assessor checks both mechanical strength (proper gland tightening) and earth continuity through the SWA armour to ensure both physical and electrical protection."
    },
    {
      id: "safety-vs-neatness",
      question: "In AM2 assessment, which is worse - messy work or unsafe work?",
      options: [
        "Both are equally bad",
        "Messy work - it shows poor professionalism",
        "Unsafe work - messy loses marks, unsafe means fail",
        "Neither affects the result"
      ],
      correctIndex: 2,
      explanation: "Unsafe work results in immediate failure regardless of other factors. Messy work loses marks but doesn't automatically fail the assessment. Safety is always the priority."
    },
    {
      id: "testing-requirement",
      question: "Can you energise a power circuit before completing all required tests?",
      options: [
        "Yes, if continuity is confirmed",
        "Yes, for basic function testing",
        "No - that's unsafe and results in failure",
        "Only with assessor permission"
      ],
      correctIndex: 2,
      explanation: "All required tests (continuity, polarity, insulation resistance, loop impedance) must be completed before energisation. Energising untested circuits is unsafe practice and results in immediate failure."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What cable size is typically specified for a ring final circuit in AM2?",
      options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
      correctAnswer: 1,
      explanation: "Ring final circuits typically use 2.5mm² twin & earth cable with a 32A MCB protection."
    },
    {
      id: 2,
      question: "What's the consequence of leaving one leg disconnected in a ring final?",
      options: [
        "Circuit works normally",
        "Half the sockets stop working", 
        "It becomes an unprotected radial circuit",
        "The RCD will trip"
      ],
      correctAnswer: 2,
      explanation: "A disconnected ring becomes a radial circuit still protected by 32A, exceeding the 20A safe rating for 2.5mm² cable."
    },
    {
      id: 3,
      question: "Which protective device rating is typically used for a cooker circuit?",
      options: ["20A MCB", "32A MCB", "32-40A MCB", "50A MCB"],
      correctAnswer: 2,
      explanation: "Cooker circuits typically use 32-40A MCB depending on the cooker load and cable size specified."
    },
    {
      id: 4,
      question: "Why must the cable sheath enter the cooker outlet plate?",
      options: [
        "For better appearance",
        "To prevent moisture entry",
        "To protect bare conductors from damage",
        "To meet cable bend radius requirements"
      ],
      correctAnswer: 2,
      explanation: "The sheath must enter the outlet plate to ensure no bare conductors are visible and maintain mechanical protection."
    },
    {
      id: 5,
      question: "What device must be correctly set in a motor circuit?",
      options: ["Timer relay", "Contactor", "Overload protection", "Phase monitor"],
      correctAnswer: 2,
      explanation: "The overload protection device must be set correctly for the motor's full load current to provide proper protection."
    },
    {
      id: 6,
      question: "What's the purpose of a banjo washer in SWA glanding?",
      options: [
        "Weatherproofing",
        "Cable strain relief",
        "Earth continuity connection",
        "Cable identification"
      ],
      correctAnswer: 2,
      explanation: "The banjo washer provides earth continuity between the SWA armour and the equipment earth terminal."
    },
    {
      id: 7,
      question: "True or false: You must calculate cable sizes in AM2.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. In AM2, you follow the specification exactly as given - no calculations are required or expected."
    },
    {
      id: 8,
      question: "What's the difference between a radial and a broken ring?",
      options: [
        "No difference in function",
        "Radial is designed as one-way feed, broken ring is faulty two-way feed",
        "Radial uses smaller cable",
        "Broken ring has lower impedance"
      ],
      correctAnswer: 1,
      explanation: "A radial is designed as a one-way feed with appropriate protection. A broken ring is a fault condition where a two-way circuit becomes one-way but retains inappropriate protection."
    },
    {
      id: 9,
      question: "Give an example of poor workmanship in power circuits.",
      options: [
        "Using correct cable size",
        "Over-tightening terminals damaging insulation",
        "Following the specification exactly",
        "Completing all required tests"
      ],
      correctAnswer: 1,
      explanation: "Over-tightening terminals can damage cable insulation, creating safety hazards and demonstrating poor workmanship."
    },
    {
      id: 10,
      question: "What happens if you energise before completing all required tests?",
      options: [
        "Minor marks deduction",
        "Warning from assessor",
        "Immediate failure for unsafe practice",
        "No consequence if circuit works"
      ],
      correctAnswer: 2,
      explanation: "Energising circuits before completing all required tests is unsafe practice and results in immediate failure."
    },
    {
      id: 11,
      question: "Which test confirms ring circuit integrity?",
      options: [
        "Insulation resistance only",
        "End-to-end continuity of all conductors",
        "Loop impedance only",
        "Polarity check only"
      ],
      correctAnswer: 1,
      explanation: "End-to-end continuity testing of line, neutral, and CPC conductors confirms the ring is complete and unbroken."
    },
    {
      id: 12,
      question: "What must be done to CPCs in all power circuits?",
      options: [
        "Twisted together",
        "Left bare",
        "Sleeved and properly connected",
        "Painted for identification"
      ],
      correctAnswer: 2,
      explanation: "All CPCs must be sleeved with green/yellow sleeving and properly connected to maintain earth continuity and meet standards."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Title Section */}
        <div className="space-y-4">
          <Badge variant="secondary" className="bg-elec-yellow text-black font-medium">
            Module 3 – Section 2
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Power Circuits – Ring, Radial, Cooker, Motor
          </h1>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">~30 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Advanced Level</span>
            </div>
          </div>
        </div>

        {/* Critical Warning */}
        <Card className="border-red-500/50 ">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Critical Assessment Area</h3>
                <p className="text-white leading-relaxed">
                  Power circuits are where most AM2 candidates lose marks or fail. You must demonstrate not just technical knowledge but competent, safe, and workmanlike installation. The assessor watches for accuracy to specification, safe practices, and professional workmanship. Incorrect cable selection, incomplete testing, or poor workmanship will result in failure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
            <p className="text-white mb-4">By the end of this section, you should be able to:</p>
            <ul className="space-y-2 text-white">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Install ring, radial, cooker, and motor circuits as per AM2 drawings and specifications
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Terminate cables neatly, with CPCs correctly sleeved and connected
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Carry out required tests before energisation according to NET standards
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Recognise common candidate errors in each type of circuit
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Apply strategies to work efficiently under time pressure without sacrificing safety
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-elec-blue mt-2 flex-shrink-0"></span>
                Understand what the assessor is checking for in each circuit type
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Ring Final Circuit */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">1. Ring Final Circuit</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Typical Specification</h3>
                <p className="text-white">2.5mm² twin & earth cable, 32A MCB protection. Must form a complete closed loop.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Critical Testing Requirements</h3>
                <ul className="space-y-1 text-white">
                  <li>• End-to-end continuity (Line, Neutral, CPC)</li>
                  <li>• Cross connections for r₁ + rₙ and r₁ + r₂</li>
                  <li>• Polarity checks at all outlets</li>
                  <li>• Insulation resistance between conductors</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Assessor Focus Points</h3>
                <ul className="space-y-1 text-white">
                  <li>• Ring continuity completely intact</li>
                  <li>• All terminations correct and secure</li>
                  <li>• CPCs sleeved with green/yellow and properly connected</li>
                  <li>• Socket outlets installed level and to drawing heights</li>
                  <li>• No "broken ring" scenarios</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Radial Circuit */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">2. Radial Circuit</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Typical Specifications</h3>
                <ul className="space-y-1 text-white">
                  <li>• 2.5mm² on 20A MCB for standard loads</li>
                  <li>• 4mm² on 32A MCB for higher loads</li>
                  <li>• Simple end-to-end wiring, no loop back to origin</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Assessor Focus Points</h3>
                <ul className="space-y-1 text-white">
                  <li>• Correct cable size as specified on drawings</li>
                  <li>• Neat terminations at final point</li>
                  <li>• Protective device rating matches specification</li>
                  <li>• No exposed copper or over-stripped insulation</li>
                  <li>• Clear marking where radial terminates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cooker Circuit */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">3. Cooker Circuit</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Typical Specification</h3>
                <p className="text-white">6mm² twin & earth cable, 32-40A MCB, connected through cooker control unit and outlet plate.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Assessor Focus Points</h3>
                <ul className="space-y-1 text-white">
                  <li>• Correct cable size as per specification</li>
                  <li>• Secure terminations (large conductors need proper clamping)</li>
                  <li>• Cable sheath enters accessory - no bare conductors visible</li>
                  <li>• CPC properly sleeved and connected</li>
                  <li>• Control unit and outlet plate correctly wired</li>
                </ul>
              </div>

              <div className="bg-transparent border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-white">
                  <strong>Common Error:</strong> Over-stripping cable sheath leaving bare conductors visible at outlet plate. This is the most frequent reason for losing marks on cooker circuits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Motor Circuit */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">4. Motor Circuit</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Typical Configuration</h3>
                <p className="text-white">Usually wired in SWA or flex, feeding a DOL (Direct-On-Line) starter. May include start/stop control circuit.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Assessor Focus Points</h3>
                <ul className="space-y-1 text-white">
                  <li>• Correct SWA gland termination with earth continuity</li>
                  <li>• Proper polarity at starter and motor terminals</li>
                  <li>• Overload protection device set appropriately for motor FLC</li>
                  <li>• Start/stop controls wired correctly and functional</li>
                  <li>• Banjo washer fitted for earth continuity</li>
                  <li>• Cable gland mechanically secure</li>
                </ul>
              </div>

              <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
                <p className="text-sm text-white">
                  <strong>Professional Tip:</strong> Practice SWA glanding until it's second nature. Use a checklist: gland tight, banjo fitted, earth continuous, cable strain relief adequate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* General Assessor Expectations */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">5. General Assessor Expectations (All Power Circuits)</h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-medium text-white mb-3">Technical Requirements</h3>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Specification compliance:</strong> Cable sizes, routes, protective devices exactly as shown</li>
                  <li>• <strong>Safety:</strong> CPC sleeved and connected, no exposed copper</li>
                  <li>• <strong>Testing:</strong> All tests completed before energisation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-3">Workmanship Standards</h3>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Installation quality:</strong> Straight runs, level accessories, neat terminations</li>
                  <li>• <strong>Professional finish:</strong> Conduits/trunking aligned, cables not twisted</li>
                  <li>• <strong>Protection integrity:</strong> No damage to cable insulation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Candidate Errors */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">6. Common Candidate Errors (NET Guidance)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-3 border border-red-500/20 rounded-lg">
                  <h4 className="font-medium text-white text-sm">Critical Errors (Fail)</h4>
                  <ul className="text-sm text-white mt-2 space-y-1">
                    <li>• Wrong cable size installed</li>
                    <li>• Ring finals left open (broken)</li>
                    <li>• CPC unsleeved or not terminated</li>
                    <li>• Energising before testing complete</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 border border-amber-500/20 rounded-lg">
                  <h4 className="font-medium text-white text-sm">Workmanship Issues (Marks Lost)</h4>
                  <ul className="text-sm text-white mt-2 space-y-1">
                    <li>• Cooker cable sheath not fully enclosed</li>
                    <li>• Poor SWA glanding technique</li>
                    <li>• Over-tightened terminals damaging insulation</li>
                    <li>• Motor overload not set correctly</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[3].id}
          question={quickCheckQuestions[3].question}
          options={quickCheckQuestions[3].options}
          correctIndex={quickCheckQuestions[3].correctIndex}
          explanation={quickCheckQuestions[3].explanation}
        />

        {/* Practical Guidance */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">7. Practical Guidance</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Time Management Strategies</h3>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Ring circuits:</strong> Lay out both ends before terminating to ensure continuity</li>
                  <li>• <strong>Radials:</strong> Mark clearly where the circuit ends to avoid confusion</li>
                  <li>• <strong>Cooker circuits:</strong> Pre-shape large cables before termination</li>
                  <li>• <strong>Motors:</strong> Have SWA glanding checklist ready</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Professional Techniques</h3>
                <ul className="space-y-2 text-white">
                  <li>• Record test results as you perform them - don't leave until the end</li>
                  <li>• Treat every installation as show home quality</li>
                  <li>• Double-check ring continuity before final termination</li>
                  <li>• Use appropriate tools for large cable termination</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-World Examples */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">8. Real-World Examples</h2>
            <div className="grid gap-4">
              <div className="p-4 border border-red-500/20 rounded-lg">
                <h4 className="font-medium text-white mb-2">Example 1: Ring Final Failure</h4>
                <p className="text-white text-sm">Candidate installed ring final but left one leg disconnected in consumer unit. Failed continuity test → section fail. Always verify complete loop before termination.</p>
              </div>
              
              <div className="p-4 border border-red-500/20 rounded-lg">
                <h4 className="font-medium text-white mb-2">Example 2: Cooker Circuit Workmanship</h4>
                <p className="text-white text-sm">Cooker circuit wired with sheath stripped back too far. Exposed cable insulation visible at outlet plate = significant marks lost for poor workmanship.</p>
              </div>

              <div className="p-4 border border-amber-500/20 rounded-lg">
                <h4 className="font-medium text-white mb-2">Example 3: Motor Circuit Incomplete</h4>
                <p className="text-white text-sm">Motor circuit wired correctly but overload protection not set for motor FLC. Assessor flagged incomplete installation - lost marks for attention to detail.</p>
              </div>

              <div className="p-4 border border-amber-500/20 rounded-lg">
                <h4 className="font-medium text-white mb-2">Example 4: Terminal Damage</h4>
                <p className="text-white text-sm">Candidate over-tightened terminals on 6mm² cooker cable, crushing insulation. Lost significant workmanship marks for poor technique.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">9. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Q1: Do I need to calculate cable sizes in AM2?</h3>
                <p className="text-white">No - follow the AM2 specification exactly as provided. No calculations are required or expected.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Q2: Will the assessor open socket outlets and accessories?</h3>
                <p className="text-white">Yes - expect sample inspections of terminations, so ensure all connections are neat and secure.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Q3: Can I energise a circuit before completing all tests?</h3>
                <p className="text-white">No - that's unsafe practice and results in immediate failure. All tests must be completed first.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Q4: What if I accidentally damage cable insulation?</h3>
                <p className="text-white">Replace the cable section - tape repairs are not acceptable and will result in failure.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Q5: How important is neatness compared to correctness?</h3>
                <p className="text-white">Both matter significantly: correctness is essential for safety, neatness is heavily marked for professionalism.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[4].id}
          question={quickCheckQuestions[4].question}
          options={quickCheckQuestions[4].options}
          correctIndex={quickCheckQuestions[4].correctIndex}
          explanation={quickCheckQuestions[4].explanation}
        />

        {/* Summary */}
        <Card className="bg-transparent border-green-500/20">
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">10. Summary</h2>
            <p className="text-white mb-4">
              In AM2, power circuits must be installed to specification, neatly, and safely. Assessors check:
            </p>
            <ul className="space-y-2 text-white">
              <li>• <strong>Technical accuracy:</strong> Ring continuity, correct radial wiring, proper cooker cable termination</li>
              <li>• <strong>Motor circuits:</strong> Overloads set correctly, SWA glanded properly with earth continuity</li>
              <li>• <strong>Professional standards:</strong> CPCs sleeved, terminations secure, accessories level</li>
              <li>• <strong>Safety compliance:</strong> No unsafe shortcuts, circuits tested fully before energisation</li>
            </ul>
            <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg border">
              <p className="text-sm font-medium text-white">
                Remember: Unsafe = Fail | Untidy = Marks Lost | Accurate + Neat + Safe = Pass
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
            <p className="text-white mb-6">
              Complete this comprehensive quiz to test your understanding of power circuit installation and assessment requirements.
            </p>
            <Quiz questions={quizQuestions} title="Power Circuits Assessment Quiz" />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="../section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Selection & Containment
            </Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link to="../section3">
              Next: Testing & Verification
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module3Section2;