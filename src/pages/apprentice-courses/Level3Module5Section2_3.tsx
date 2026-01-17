/**
 * Level 3 Module 5 Section 2.3 - Identification of Non-compliances and Defects
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identification of Non-compliances and Defects - Level 3 Module 5 Section 2.3";
const DESCRIPTION = "Learn to identify, categorise and classify non-compliances and defects during electrical installation inspection according to BS 7671 and the EICR coding system.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the key difference between a non-compliance and a defect?",
    options: [
      "Non-compliances are always more dangerous than defects",
      "A non-compliance breaches regulations; a defect impairs safety or function",
      "Defects only occur in new installations",
      "Non-compliances cannot be recorded on EICRs"
    ],
    correctIndex: 1,
    explanation: "A non-compliance is a departure from the requirements of BS 7671 or other applicable standards. A defect impairs the safety or proper functioning of the installation. Some issues can be both - a missing RCD is both non-compliant and a safety defect."
  },
  {
    id: "check-2",
    question: "During inspection, you find a socket outlet with no earth connection. How should this be categorised?",
    options: [
      "C3 - Improvement recommended",
      "FI - Further investigation required",
      "C2 - Potentially dangerous, remedial action required",
      "C1 - Danger present, immediate action required"
    ],
    correctIndex: 2,
    explanation: "A missing earth connection is potentially dangerous as it removes the primary means of fault protection, but danger is not immediately present unless a fault occurs. This warrants C2 classification requiring remedial action. If exposed live parts were accessible, it would be C1."
  },
  {
    id: "check-3",
    question: "What determines whether an observation is classified as C1 rather than C2?",
    options: [
      "Whether the installation is domestic or commercial",
      "Whether danger is present NOW or only potentially present",
      "The age of the installation",
      "Whether the electrician is competent to repair it"
    ],
    correctIndex: 1,
    explanation: "C1 classification means danger is present NOW - risk of injury exists. C2 means the defect is potentially dangerous but danger is not immediately present. The distinction is critical: C1 requires immediate action to remove the danger, typically before leaving site."
  },
  {
    id: "check-4",
    question: "Which of the following would typically warrant a 'Further Investigation Required' (FI) observation?",
    options: [
      "A broken socket outlet faceplate",
      "Unexpectedly high Zs readings that cannot be explained by visible factors",
      "Missing circuit chart at the distribution board",
      "Incorrectly labelled circuit breakers"
    ],
    correctIndex: 1,
    explanation: "FI is used when inspection or testing reveals an anomaly that requires more extensive investigation to determine the cause and extent of the issue. Unexplained high Zs readings could indicate hidden wiring issues, damaged cables, or incorrect connections requiring further investigation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671, what is the definition of a 'dangerous condition'?",
    options: [
      "Any deviation from the wiring regulations",
      "A condition that could result in electric shock, burn, fire or explosion",
      "Any installation over 25 years old",
      "Installations without RCD protection"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 defines a dangerous condition as one where there is a risk of injury from electric shock, burns, fire or explosion. This clear definition helps inspectors distinguish between serious hazards (C1/C2) and improvements (C3)."
  },
  {
    id: 2,
    question: "During an EICR, you discover cables buried in walls without mechanical protection at less than 50mm depth. The installation was wired in 1995. How should this be classified?",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended",
      "Limitation - unable to inspect concealed wiring"
    ],
    correctAnswer: 2,
    explanation: "Pre-2005 installations were not required to have cables in safe zones at 50mm depth or with RCD protection. While not compliant with current regulations, it was acceptable when installed. This would be C3 - improvement recommended - unless there is evidence of damage or the cable location poses specific risk."
  },
  {
    id: 3,
    question: "What is the primary purpose of the observation coding system (C1, C2, C3, FI)?",
    options: [
      "To determine the cost of remedial works",
      "To prioritise defects and communicate urgency to duty holders",
      "To assign responsibility for repairs",
      "To calculate insurance premiums"
    ],
    correctAnswer: 1,
    explanation: "The coding system provides clear, prioritised communication to duty holders about the nature and urgency of each observation. C1 requires immediate action, C2 requires prompt remedial action, C3 are recommendations for improvement, and FI indicates areas needing further investigation."
  },
  {
    id: 4,
    question: "You are inspecting a TT installation and find the earth electrode resistance is 180 ohms. The main switch is a 100A type AC RCD rated at 30mA. This situation is:",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended",
      "Acceptable - no observation required"
    ],
    correctAnswer: 3,
    explanation: "For a 30mA RCD, the maximum Ra is 1667 ohms (50V/0.03A). At 180 ohms, the touch voltage would be approximately 5.4V in a fault condition, well below 50V. This meets the requirements for a TT system with RCD protection. No observation is required."
  },
  {
    id: 5,
    question: "During visual inspection, you observe discolouration and heat damage at a terminal connection in a consumer unit. What is your immediate action?",
    options: [
      "Note it as C3 and continue inspection",
      "Classify as C2 and complete the EICR",
      "Isolate the circuit, classify as C1 or C2, and inform the client immediately",
      "Take a photograph and complete testing before making any classification"
    ],
    correctAnswer: 2,
    explanation: "Evidence of overheating indicates a potentially dangerous condition that could lead to fire. This requires immediate action - isolating the affected circuit, classifying appropriately (likely C1 if damage is severe), and informing the client. Safety takes priority over completing the inspection."
  },
  {
    id: 6,
    question: "Which of the following observations would NOT typically be recorded on an EICR?",
    options: [
      "Missing warning labels at the consumer unit",
      "RCD protecting socket outlets trips at 28ms at rated current",
      "Earthing conductor cross-sectional area appears adequate but cannot be verified",
      "Smoke detector batteries need replacing"
    ],
    correctAnswer: 3,
    explanation: "EICRs cover the fixed electrical installation only. Smoke detectors, unless hard-wired, are not part of the fixed installation and battery replacement is maintenance, not an electrical defect. The other observations all relate to the fixed installation and its compliance."
  },
  {
    id: 7,
    question: "What distinguishes a 'limitation' from an observation on an EICR?",
    options: [
      "Limitations are less important than observations",
      "Limitations explain why certain parts could not be fully inspected or tested",
      "Limitations do not need to be recorded",
      "Limitations only apply to dangerous conditions"
    ],
    correctAnswer: 1,
    explanation: "Limitations record aspects of the installation that could not be fully inspected or tested - for example, concealed wiring, inaccessible junction boxes, or equipment that could not be isolated. They ensure the client understands the scope of the inspection and any areas of uncertainty."
  },
  {
    id: 8,
    question: "An installation has insulation resistance of 0.8 M-ohms on a circuit. According to BS 7671 Table 6.1, the minimum acceptable value is 1 M-ohm. How should this be classified?",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended",
      "FI - Further investigation required"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance below the minimum 1 M-ohm threshold indicates degraded insulation that could lead to earth faults, electric shock or fire. This is potentially dangerous and requires remedial action - a C2 classification. Values significantly below minimum might warrant C1."
  },
  {
    id: 9,
    question: "You discover that a ring final circuit has been incorrectly wired as a radial. The cable CSA is 2.5mm2 protected by a 32A MCB. What is the correct classification?",
    options: [
      "C1 - The cable is overloaded",
      "C2 - Potentially dangerous overcurrent condition",
      "C3 - Improvement recommended",
      "Acceptable - 2.5mm2 can carry 32A"
    ],
    correctAnswer: 1,
    explanation: "2.5mm2 cable has a current-carrying capacity typically around 20-24A depending on installation method. Protected by a 32A MCB, it could be subjected to sustained overload without the MCB operating. This overcurrent condition is potentially dangerous, warranting C2 classification."
  },
  {
    id: 10,
    question: "When should an inspector issue a 'Danger Present' notification in addition to the EICR?",
    options: [
      "For all C1 and C2 observations",
      "Only when the installation fails overall",
      "When C1 observations are identified and there is risk of injury",
      "For all observations on commercial installations"
    ],
    correctAnswer: 2,
    explanation: "A Danger Present notification (sometimes called a 'Danger Notice') should be issued when C1 observations are identified, particularly if the danger cannot be immediately removed. This formal notification ensures the duty holder is clearly informed of the immediate risk and their responsibility."
  },
  {
    id: 11,
    question: "Which regulation in BS 7671 specifically covers the requirements for initial verification?",
    options: [
      "Part 4 - Protection for Safety",
      "Part 5 - Selection and Erection",
      "Part 6 - Inspection and Testing",
      "Part 7 - Special Installations"
    ],
    correctAnswer: 2,
    explanation: "Part 6 of BS 7671 covers Inspection and Testing, including requirements for initial verification (Chapter 61), periodic inspection and testing (Chapter 62), and reporting (Chapter 63). This is the core regulatory framework for all inspection and testing activities."
  },
  {
    id: 12,
    question: "During inspection, you cannot access a junction box concealed above a fixed ceiling. What is the correct approach?",
    options: [
      "Assume it is compliant and continue",
      "Classify it as C2 due to uncertainty",
      "Record it as a limitation on the EICR",
      "Refuse to complete the inspection"
    ],
    correctAnswer: 2,
    explanation: "When parts of the installation cannot be accessed for inspection, this must be recorded as a limitation on the EICR. The client should be informed that this area was not inspected, and a recommendation made for future access or investigation if concerns exist."
  }
];

const faqs = [
  {
    question: "What is the difference between C1 and C2 classifications?",
    answer: "C1 (Danger Present) means risk of injury exists now and requires immediate action - the danger should be removed before leaving site if possible. C2 (Potentially Dangerous) means the defect could become dangerous but risk is not immediate - remedial action is required but not emergency action. The key question is: 'Is danger present RIGHT NOW?'"
  },
  {
    question: "Can an installation with C2 observations still receive a 'Satisfactory' overall assessment?",
    answer: "No. Any C1 or C2 observation means the installation cannot be assessed as 'Satisfactory'. C2 observations indicate potentially dangerous conditions requiring remedial action. Only installations with no observations, or only C3 (improvement recommended) observations, can be assessed as Satisfactory."
  },
  {
    question: "How do I decide between C2 and C3 for missing RCD protection?",
    answer: "Consider when the installation was completed. Pre-July 2008 installations were not required to have RCD protection on socket outlets. If absent, this is typically C3 - improvement recommended. However, if there are specific risk factors (TT system, bathroom circuits, outdoor circuits) where RCDs have been required longer, C2 may be appropriate."
  },
  {
    question: "Should I record observations for departures that were acceptable when installed?",
    answer: "Yes, record them but consider the appropriate classification. An installation that met the regulations in force when it was completed is not automatically non-compliant. However, if conditions have deteriorated or specific risks exist, appropriate action is needed. Typically, historical departures are C3 unless there is actual or potential danger."
  },
  {
    question: "What should I do if I am unsure about a classification?",
    answer: "When uncertain, err on the side of caution - it is better to over-classify than under-classify a dangerous condition. Consider consulting with colleagues, technical helplines, or referring to IET guidance. Document your reasoning. If genuinely uncertain about the nature of a defect, use 'FI' (Further Investigation Required)."
  },
  {
    question: "How do I handle disagreements with clients about classifications?",
    answer: "Classifications are technical judgements based on BS 7671 and industry guidance - they are not negotiable based on cost or convenience. Explain the basis for your classification and the potential consequences of the defect. Document the conversation. Never downgrade a classification due to client pressure - your professional and legal responsibility is to report accurately."
  }
];

const Level3Module5Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Identification of Non-compliances and Defects
          </h1>
          <p className="text-white/80">
            Categorising observations using the C1, C2, C3 and FI classification system
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>C1:</strong> Danger present - immediate action required</li>
              <li><strong>C2:</strong> Potentially dangerous - remedial action required</li>
              <li><strong>C3:</strong> Improvement recommended</li>
              <li><strong>FI:</strong> Further investigation required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Decision</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ask:</strong> Is danger present RIGHT NOW?</li>
              <li><strong>Yes:</strong> C1 - Immediate action needed</li>
              <li><strong>Could be:</strong> C2 - Remedial action needed</li>
              <li><strong>Upgrade:</strong> C3 - Recommendation only</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between non-compliances and defects",
              "Apply the C1, C2, C3, FI classification system correctly",
              "Identify observations requiring immediate action",
              "Determine appropriate classification for common defects",
              "Record limitations and their impact on reports",
              "Understand the legal implications of observation classifications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Non-compliances and Defects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Non-compliances and Defects
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before classifying observations, you must understand the fundamental difference between non-compliances and defects. A non-compliance is any departure from the requirements of BS 7671 or other applicable regulations. A defect is a condition that impairs the safety or proper functioning of the electrical installation. Many issues are both - but understanding the distinction helps you classify appropriately.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Non-compliance examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Missing circuit identification labels at distribution board (Regulation 514.9.1)</li>
                <li>Cables not adequately supported (Regulation 522.8.5)</li>
                <li>No warning notice for dual supply installation (Regulation 514.15)</li>
                <li>Inadequate IP rating for accessory in bathroom zone (Regulation 701.512.2)</li>
                <li>Bonding conductor CSA less than minimum required (Regulation 544.1)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Defect examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Damaged cable insulation exposing conductors</li>
                <li>Loose connections causing intermittent operation</li>
                <li>Evidence of overheating at terminals</li>
                <li>Water ingress into electrical equipment</li>
                <li>Cracked or broken accessory faceplates exposing live parts</li>
              </ul>
            </div>

            <p>
              Many observations are both non-compliant AND defective. For example, a missing earthing conductor is non-compliant with Regulation 411.3.1.1 and also a defect that impairs the protective measure against electric shock. When classifying, consider both aspects - the regulatory breach and the practical safety impact.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Not all non-compliances are dangerous (missing labels), and not all defects are non-compliances (wear and tear on correctly installed equipment). Focus on safety impact when determining classification severity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The Classification System */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Classification System (C1, C2, C3, FI)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The observation classification system provides a standardised method for communicating the severity and urgency of defects to duty holders. Each classification carries specific implications for action required and overall assessment of the installation. Understanding these classifications is essential for City & Guilds 2391 and professional practice.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/90 mb-2">C1 - Danger Present</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Risk of injury exists immediately</li>
                  <li>Requires immediate action to remove danger</li>
                  <li>May require isolation before leaving site</li>
                  <li>Installation assessed as UNSATISFACTORY</li>
                  <li>Danger notice should be issued</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-400/90 mb-2">C2 - Potentially Dangerous</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Could become dangerous or cause injury</li>
                  <li>Requires remedial action (not emergency)</li>
                  <li>Danger not immediately present</li>
                  <li>Installation assessed as UNSATISFACTORY</li>
                  <li>Urgent but not immediate action needed</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-blue-400/90 mb-2">C3 - Improvement Recommended</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Does not represent a dangerous condition</li>
                  <li>Improvement would enhance safety</li>
                  <li>Often relates to historical regulations</li>
                  <li>Installation can still be SATISFACTORY</li>
                  <li>Action at discretion of duty holder</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-400/90 mb-2">FI - Further Investigation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cannot determine extent or nature of issue</li>
                  <li>More extensive investigation required</li>
                  <li>May need intrusive work or specialist</li>
                  <li>Installation typically UNSATISFACTORY</li>
                  <li>Cannot classify until investigation complete</li>
                </ul>
              </div>
            </div>

            <p>
              The distinction between C1 and C2 hinges on one question: "Is danger present RIGHT NOW?" If touching metalwork could cause a shock NOW, if a fire could start NOW, if an arc flash could occur NOW - that's C1. If the condition could lead to these outcomes but only under specific circumstances (a fault occurring, overload condition, environmental change) - that's C2.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An exposed live terminal is C1 - danger of shock exists now. A missing earth connection is C2 - danger would only occur if a fault developed. Both are serious, but the immediacy differs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Applying Classifications in Practice */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Applying Classifications in Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct classification requires technical knowledge, professional judgement, and consideration of context. The same observation might warrant different classifications depending on the specific circumstances. Always consider the actual risk in the environment where the installation operates.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common C1 (Danger Present) observations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Exposed live conductors accessible without tools</li>
                <li>Severe overheating with immediate fire risk</li>
                <li>Live metalwork (exposed-conductive-parts at dangerous potential)</li>
                <li>Cables with damaged insulation exposing live conductors</li>
                <li>Submerged electrical equipment still energised</li>
                <li>Missing covers on consumer units with live parts accessible</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common C2 (Potentially Dangerous) observations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Missing or disconnected earthing conductor</li>
                <li>Insulation resistance below minimum (less than 1 M-ohm)</li>
                <li>Overcurrent protection inadequate for cable size</li>
                <li>Missing bonding connections in bathroom zones</li>
                <li>RCD not operating within required parameters</li>
                <li>Ze or Zs values exceeding maximum permitted</li>
                <li>Evidence of previous overheating (not currently active)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common C3 (Improvement) observations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Missing circuit identification at distribution board</li>
                <li>No RCD protection on socket circuits (pre-July 2008)</li>
                <li>Main bonding not to current CSA requirements (but adequate)</li>
                <li>Consumer unit not to current BS EN 61439-3 standard</li>
                <li>Missing warning notices (where no immediate risk)</li>
                <li>Lack of surge protection device (SPD) where recommended</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Historical installations must be assessed against the regulations in force when they were installed. A pre-2008 installation without RCD protection on sockets is C3 (improvement), not C2, unless specific additional risk factors exist.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Recording and Reporting Observations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording and Reporting Observations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every observation must be clearly recorded with sufficient detail for the duty holder to understand the issue and for any competent person to locate and address it. Vague descriptions like "wiring issues" or "needs attention" are unprofessional and potentially negligent. Be specific, be clear, be accurate.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Location</p>
                <p className="text-white/90 text-xs">Where is the defect? Circuit reference, room, specific item</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Observation</p>
                <p className="text-white/90 text-xs">What did you find? Technical description of the issue</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Classification</p>
                <p className="text-white/90 text-xs">C1, C2, C3 or FI with clear justification</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Good observation recording:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Poor:</strong> "Socket damaged" - Where? How? What's the risk?</li>
                <li><strong>Good:</strong> "Kitchen socket outlet (Circuit 3, position 2) - cracked faceplate exposing live terminal screws - C2"</li>
                <li><strong>Poor:</strong> "Earth missing" - Which circuit? What conductor?</li>
                <li><strong>Good:</strong> "Ring final circuit Way 2 (kitchen sockets) - protective conductor disconnected at socket position 3 - C2"</li>
              </ul>
            </div>

            <p>
              For C1 observations, a Danger Present notification should be issued in addition to the EICR. This formal document confirms that danger was identified and clearly states what action the duty holder must take. Keep copies of all documentation and consider having the client sign to acknowledge receipt.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Legal note:</strong> Your observations become legal documents. If an incident occurs after your inspection, your report may be examined in court. Accurate, complete documentation protects you professionally and legally.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Classification Decision Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Step 1: Identify the observation - what exactly is wrong?</li>
                <li>Step 2: Determine if it's a non-compliance, defect, or both</li>
                <li>Step 3: Ask "Is danger present RIGHT NOW?" - if yes, C1</li>
                <li>Step 4: Ask "Could this become dangerous?" - if yes, C2</li>
                <li>Step 5: If neither dangerous nor potentially so - C3</li>
                <li>Step 6: If unable to determine - FI (Further Investigation)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Limitations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>List all areas that could not be fully inspected or tested</li>
                <li>Explain why - access issues, could not isolate, insufficient information</li>
                <li>Recommend how to address - "suggest access panel for future inspection"</li>
                <li>Limitations are not defects - they acknowledge incomplete information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Under-classifying due to cost concerns</strong> - Safety is not negotiable</li>
                <li><strong>Applying current regs to old installations</strong> - Consider date of installation</li>
                <li><strong>Vague descriptions</strong> - Be specific about location and nature</li>
                <li><strong>Missing context</strong> - Consider the environment and use of installation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">BS 7671 Part 6 Requirements</p>
                <ul className="space-y-0.5">
                  <li>Chapter 61 - Initial Verification</li>
                  <li>Chapter 62 - Periodic Inspection & Testing</li>
                  <li>Chapter 63 - Reporting</li>
                  <li>Regulation 634.2 - EICR requirements</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Overall Assessment</p>
                <ul className="space-y-0.5">
                  <li>SATISFACTORY = No C1, C2 or FI</li>
                  <li>UNSATISFACTORY = Any C1, C2 or FI</li>
                  <li>C3 observations = Still satisfactory</li>
                  <li>Limitations = Note on extent inspected</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section2-2-4">
              Next: Recording Observations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section2_3;
