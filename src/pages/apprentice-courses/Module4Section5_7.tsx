import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Making Final Fixes to Accessories - Module 4.5.7 | Level 2 Electrical Course";
const DESCRIPTION = "Master professional final fixing techniques for electrical accessories. Learn proper alignment, securing methods, and compliance with BS 7671 for high-quality installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it important to follow manufacturer torque settings on terminals?",
    options: ["To save time", "To prevent over-tightening damage and ensure secure connections", "To use less tools", "To reduce material costs"],
    correctIndex: 1,
    explanation: "Manufacturer torque settings ensure optimal connection security without damaging terminals or conductors, preventing both loose connections and over-tightening damage."
  },
  {
    id: 2,
    question: "Name one way to ensure accessories are level when fixed.",
    options: ["Use measuring tape", "Use spirit level", "Use plumb line", "Visual estimation"],
    correctIndex: 1,
    explanation: "A spirit level is the standard tool for ensuring accessories are properly aligned and level during installation."
  },
  {
    id: 3,
    question: "What precaution should you take when handling decorative faceplates?",
    options: ["Use power tools", "Wear clean gloves", "Work quickly", "Use maximum force"],
    correctIndex: 1,
    explanation: "Clean gloves prevent fingerprints, scratches, and contamination on decorative faceplates, maintaining their appearance and finish quality."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main purpose of final fixing?",
    options: [
      "To run new cables",
      "To secure and align electrical accessories",
      "To design the wiring layout",
      "To test circuit breakers"
    ],
    correctAnswer: 1,
    explanation: "Final fixing is the process of securely mounting and aligning electrical accessories in their final positions."
  },
  {
    id: 2,
    question: "True or False: Over-tightening screws on accessories can cause damage.",
    options: [
      "True",
      "False",
      "Only on plastic accessories",
      "Only on metal accessories"
    ],
    correctAnswer: 0,
    explanation: "True - Over-tightening can crack faceplates, strip threads, distort mounting boxes, and damage internal components."
  },
  {
    id: 3,
    question: "Why should gloves be worn when handling decorative faceplates?",
    options: [
      "For electrical safety",
      "To avoid fingerprints and scratches",
      "To improve grip",
      "To prevent static discharge"
    ],
    correctAnswer: 1,
    explanation: "Clean gloves prevent fingerprints, scratches, and contamination that would affect the appearance of decorative finishes."
  },
  {
    id: 4,
    question: "What tool can be used to ensure a socket is level?",
    options: [
      "Multimeter",
      "Spirit level",
      "Screwdriver",
      "Wire strippers"
    ],
    correctAnswer: 1,
    explanation: "A spirit level ensures accessories are properly aligned and level during installation."
  },
  {
    id: 5,
    question: "Which regulation covers the correct mounting heights for accessible installations?",
    options: [
      "BS 7671",
      "Building Regulations Part M",
      "BS EN 60309",
      "BS 5839"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Part M specifies accessibility requirements including mounting heights for switches and sockets."
  },
  {
    id: 6,
    question: "What should you check on all earth connections before final fixing?",
    options: [
      "Voltage level",
      "Current capacity",
      "That they are continuous and secure",
      "Wire colour"
    ],
    correctAnswer: 2,
    explanation: "Earth connections must be continuous and secure to provide effective protection in fault conditions."
  },
  {
    id: 7,
    question: "Name one method of correcting uneven mounting surfaces.",
    options: [
      "Use spacers or shims",
      "Force the accessory flat",
      "Use longer screws",
      "Ignore the problem"
    ],
    correctAnswer: 0,
    explanation: "Spacers or shims allow accessories to be mounted flush and level on uneven surfaces."
  },
  {
    id: 8,
    question: "Why is double-checking terminal tightness after fixing important?",
    options: [
      "To test the circuit",
      "Handling during fixing can loosen screws",
      "To check polarity",
      "To verify colour coding"
    ],
    correctAnswer: 1,
    explanation: "Movement and handling during the fixing process can cause terminals to loosen, requiring re-checking and re-tightening."
  }
];

const Module4Section5_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.7</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Making Final Fixes to Accessories
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master professional final fixing techniques to ensure electrical accessories are securely fitted, correctly aligned, and meet all safety and aesthetic requirements.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Final fixing secures accessories in place with correct alignment and positioning</li>
                  <li>Proper technique ensures safety, reliability, and professional appearance</li>
                  <li>Compliance with BS 7671 and Building Regulations is essential for certification</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Mounting boxes, accessory types, alignment requirements</li>
                  <li><strong>Use:</strong> Correct tools, proper techniques, manufacturer specifications</li>
                  <li><strong>Check:</strong> Secure fixing, level alignment, tight terminations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed list-disc pl-6">
              <li>Prepare accessories and mounting boxes systematically for professional final fixing procedures</li>
              <li>Securely fit and align electrical accessories to manufacturer specifications and industry standards</li>
              <li>Ensure all terminations are tight and conductors are correctly positioned for long-term reliability</li>
              <li>Avoid damage to accessories during installation while maintaining quality and appearance standards</li>
              <li>Follow manufacturer instructions and relevant standards including BS 7671 and Building Regulations</li>
            </ul>
          </section>

          {/* Preparation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Systematic Preparation for Final Fixing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Thorough preparation ensures efficient final fixing and professional results:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">First-fix Completion Check</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>All cabling installed and tested for continuity and polarity</li>
                  <li>Containment systems (conduit, trunking, tray) properly installed and secured</li>
                  <li>Back boxes mounted flush, level, and at correct centres</li>
                  <li>Wall finishes completed with no damage to electrical installations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Work Area Preparation</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Clean and dust-free environment to prevent contamination</li>
                  <li>Adequate lighting for detailed work and quality inspection</li>
                  <li>Temperature controlled to prevent condensation in accessories</li>
                  <li>Protect finished surfaces from damage during installation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Accessory Verification</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Correct type, rating, and finish as per specification</li>
                  <li>No damage from transport or storage</li>
                  <li>All mounting hardware and fixings included</li>
                  <li>Compliance markings and certifications present</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="preparation-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Termination Standards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Professional Termination Standards and Verification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Correct termination techniques ensure electrical safety and long-term reliability:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Stripping Length Verification</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Follow manufacturer specifications for each accessory type</li>
                  <li>Typically 10-12mm for standard terminals, verify in documentation</li>
                  <li>No bare copper visible outside terminal when properly inserted</li>
                  <li>Use appropriate wire strippers to avoid conductor damage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Conductor Integrity Assessment</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>No nicked or damaged strands that reduce current capacity</li>
                  <li>Clean, bright copper with no corrosion or oxidation</li>
                  <li>Proper conductor identification and colour coding maintained</li>
                  <li>CPC conductors properly sleeved with green/yellow identification</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Terminal Tightening Procedures</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Use calibrated torque drivers where specified (typically 0.8-1.2Nm)</li>
                  <li>For non-specified values, tighten firmly without over-stressing</li>
                  <li>Check all terminals systematically, not just primary connections</li>
                  <li>Perform gentle tug test to verify mechanical security</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="alignment-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Alignment and Securing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Professional Alignment and Securing Techniques
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Precise alignment and secure fixing ensure professional appearance and long-term performance:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Spirit Level Application</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Use quality spirit level appropriate for accessory size</li>
                  <li>Check both horizontal and vertical alignment where applicable</li>
                  <li>Maintain consistent alignment across multiple accessories</li>
                  <li>Account for building settlement and structural variations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Screw Tightening Technique</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Progressive tightening in stages to maintain alignment</li>
                  <li>Avoid over-tightening that cracks faceplates or strips threads</li>
                  <li>Use correct screwdriver size to prevent head damage</li>
                  <li>Apply even pressure across all fixing points</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Box Type Considerations</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Plastic boxes: Monitor for thread stripping, use appropriate torque</li>
                  <li>Metal boxes: Verify earth continuity maintenance during fixing</li>
                  <li>Adjustable lugs: Set to correct depth before final tightening</li>
                  <li>Box extenders: Ensure secure connection and proper alignment</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="handling-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Compliance and Standards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Regulatory Compliance and Standards Application
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-2">BS 7671 Connection Requirements</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Secure mechanical and electrical connections for all conductors</li>
                  <li>Proper earthing arrangements for all metallic components</li>
                  <li>Appropriate protection against mechanical damage</li>
                  <li>Correct identification of all conductors and circuits</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Building Regulations Part M</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Switch mounting heights: 750mm-1200mm from finished floor level</li>
                  <li>Socket outlet heights: 450mm-1200mm in accessible areas</li>
                  <li>Contrast requirements for visually impaired users</li>
                  <li>Clear access space around all accessories</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step-by-Step Procedures */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Systematic Installation Procedures
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Standard Socket Outlet Installation</p>
                <ol className="text-sm space-y-1 list-decimal pl-4">
                  <li>Verify circuit isolation and test conductors for correct polarity and continuity</li>
                  <li>Check mounting box is flush, level, and free from debris or damage</li>
                  <li>Prepare conductors to correct strip length as per manufacturer specification</li>
                  <li>Insert conductors into appropriate terminals: Live (L), Neutral (N), Earth (E)</li>
                  <li>Tighten terminals to specified torque, typically 0.8-1.2Nm</li>
                  <li>Fold conductors neatly into box ensuring no stress on terminations</li>
                  <li>Position accessory flush against wall using spirit level for alignment</li>
                  <li>Insert and tighten fixing screws progressively to maintain alignment</li>
                  <li>Check earth continuity where metal faceplate is used</li>
                  <li>Test operation and record installation details for certification</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Light Switch Installation Procedure</p>
                <ol className="text-sm space-y-1 list-decimal pl-4">
                  <li>Confirm circuit design and switching arrangement requirements</li>
                  <li>Verify isolation and check conductor identification at switch position</li>
                  <li>Install appropriate sleeving on switched live conductors if required</li>
                  <li>Connect conductors according to switching circuit requirements</li>
                  <li>For two-way switching, verify common and strappers are correctly identified</li>
                  <li>Ensure no neutral conductors are switched in any switching arrangement</li>
                  <li>Position switch mechanism checking orientation and alignment</li>
                  <li>Test switching operation in all positions before completing installation</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2">Summary</h2>
              <p className="text-white/80 leading-relaxed">
                Final fixing ensures that electrical accessories are securely fitted, correctly aligned, and meet all safety and aesthetic requirements. Care, precision, and compliance with standards at this stage make the difference between a professional installation and one that appears rushed or unfinished. Proper technique prevents failures, reduces callbacks, and demonstrates the electrician's commitment to quality and safety standards.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Quiz (8 Questions)</h2>
            <p className="text-white/70 mb-6">Test your understanding of final fixing techniques and requirements.</p>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Testing for Polarity and Continuity
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-8">
                Next: Common Faults and How to Correct Them
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_7;
