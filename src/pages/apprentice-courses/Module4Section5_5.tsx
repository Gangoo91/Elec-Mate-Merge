import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dressing Cables Neatly Within Boxes and Enclosures - Module 4.5.5 | Level 2 Electrical Course";
const DESCRIPTION = "Master professional cable dressing techniques for boxes, enclosures, and distribution boards. Learn layout planning, securing methods, and BS 7671 compliance for safe, accessible installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Name one reason why neat cable dressing is important beyond appearance.",
    options: ["It looks professional", "Improves airflow and reduces heat build-up", "It saves money", "It reduces material costs"],
    correctIndex: 1,
    explanation: "Neat cable dressing improves airflow, reduces heat build-up, prevents strain on terminations, and makes maintenance easier - all critical safety and operational benefits."
  },
  {
    id: 2,
    question: "What must be avoided when using cable ties?",
    options: ["Using too many ties", "Over-tightening that crushes insulation", "Using different colours", "Cutting them too short"],
    correctIndex: 1,
    explanation: "Over-tightening cable ties can crush cable insulation, potentially causing short circuits and reducing the cable's current-carrying capacity."
  },
  {
    id: 3,
    question: "Why should ELV and mains cables be separated?",
    options: ["For colour coding", "To reduce electromagnetic interference and safety", "To save space", "For easier identification"],
    correctIndex: 1,
    explanation: "ELV and mains cables must be separated to prevent electromagnetic interference and ensure safety by avoiding voltage transfer between systems."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which is NOT a benefit of neat cable dressing?",
    options: [
      "Reduced heat build-up",
      "Improved fault finding",
      "Increased voltage drop",
      "Enhanced accessibility"
    ],
    correctAnswer: 2,
    explanation: "Neat cable dressing reduces voltage drop by avoiding sharp bends and overcrowding, rather than increasing it."
  },
  {
    id: 2,
    question: "True or False: Over-tightening cable ties is acceptable if it holds cables securely.",
    options: [
      "True",
      "False",
      "Only for small cables",
      "Only in dry locations"
    ],
    correctAnswer: 1,
    explanation: "False - Over-tightening cable ties can crush insulation, damage conductors, and create safety hazards."
  },
  {
    id: 3,
    question: "Name one tool or accessory used to secure cables inside enclosures.",
    options: [
      "Cable ties",
      "Cable clamps",
      "Adhesive clips",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Cable ties, clamps, and adhesive clips are all suitable for securing cables inside enclosures when properly rated."
  },
  {
    id: 4,
    question: "Why should cables be grouped by function?",
    options: [
      "For logical routing and easier maintenance",
      "To save money",
      "To reduce cable length",
      "For colour coordination"
    ],
    correctAnswer: 0,
    explanation: "Grouping by function enables logical routing, easier fault finding, and simplified maintenance procedures."
  },
  {
    id: 5,
    question: "What should be avoided to prevent blocking access to other terminals?",
    options: [
      "Using cable ties",
      "Crossing over terminals",
      "Colour coding cables",
      "Securing cables"
    ],
    correctAnswer: 1,
    explanation: "Crossing over terminals blocks access to other connections, making maintenance and testing difficult or impossible."
  },
  {
    id: 6,
    question: "Which regulation covers the requirement for avoiding undue stress on terminations?",
    options: [
      "BS 5839",
      "BS 7671",
      "BS EN 50172",
      "BS 6701"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires that wiring in enclosures is arranged to avoid undue stress on terminations and conductors."
  },
  {
    id: 7,
    question: "Why is a final visual inspection before closing the enclosure important?",
    options: [
      "To ensure neatness, compliance, and accessibility",
      "To count the cables",
      "To check cable colours",
      "To measure cable length"
    ],
    correctAnswer: 0,
    explanation: "Final inspection ensures neatness, BS 7671 compliance, accessibility for future work, and professional standards."
  },
  {
    id: 8,
    question: "Give one method for identifying cables inside an enclosure.",
    options: [
      "Numbered cable markers",
      "Colour-coded sleeving",
      "Cable labelling",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Numbered markers, colour coding, and labelling are all effective methods for cable identification in enclosures."
  }
];

const Module4Section5_5 = () => {
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
              <span className="text-white/60">Section 5.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Dressing Cables Neatly Within Boxes and Enclosures
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master professional cable dressing techniques for safe, accessible, and compliant installations in all types of electrical enclosures.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Cable dressing arranges conductors neatly and logically inside enclosures</li>
                  <li>Good dressing improves safety, accessibility, and compliance with BS 7671</li>
                  <li>Poor dressing leads to overcrowding, heat build-up, and unsafe connections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Cable entry points, circuit groupings, space constraints</li>
                  <li><strong>Use:</strong> Logical routing, proper securing, adequate support systems</li>
                  <li><strong>Check:</strong> No stress on terminations, clear access, professional appearance</li>
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
              <li>Explain why neat cable dressing is essential for safety, efficiency, and professional standards</li>
              <li>Arrange conductors in a logical and accessible manner inside boxes and enclosures of all types</li>
              <li>Use appropriate fixing and securing methods for different cable types and installation environments</li>
              <li>Avoid common cable dressing mistakes that compromise safety, accessibility, or compliance</li>
              <li>Apply BS 7671 and manufacturer recommendations for cable management inside enclosures</li>
            </ul>
          </section>

          {/* Purpose and Benefits */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Purpose and Benefits of Professional Cable Dressing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Professional cable dressing provides multiple safety, operational, and maintenance benefits:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Heat Management</p>
                <p className="text-sm mb-2">Improves airflow and reduces heat build-up in enclosures.</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Prevents hotspots that can cause insulation degradation</li>
                  <li>Maintains current-carrying capacity by avoiding thermal de-rating</li>
                  <li>Reduces risk of fire from overheated connections</li>
                  <li>Allows proper operation of thermal protection devices</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Mechanical Protection</p>
                <p className="text-sm mb-2">Prevents strain on terminations and conductor damage.</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Eliminates stress on terminal connections from cable weight</li>
                  <li>Prevents conductor fatigue from vibration and movement</li>
                  <li>Protects against physical damage during maintenance</li>
                  <li>Maintains integrity of protective earthing connections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Maintenance Efficiency</p>
                <p className="text-sm mb-2">Enables quick identification and safe working.</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Rapid fault location and circuit tracing</li>
                  <li>Safe access to all termination points</li>
                  <li>Clear visibility for visual inspections</li>
                  <li>Reduced time for testing and certification</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="purpose-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Planning and Layout */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Planning and Layout Strategy
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Systematic planning ensures efficient use of space and logical cable arrangements:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Pre-installation Planning</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Study wiring diagrams and circuit allocation schedules</li>
                  <li>Identify cable entry points and optimal routing paths</li>
                  <li>Plan for future additions and modifications</li>
                  <li>Consider maintenance access requirements from day one</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Functional Grouping Principles</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Group lighting circuits together for easy identification</li>
                  <li>Separate power circuits by load type (socket, dedicated equipment)</li>
                  <li>Keep control and instrumentation cables in designated areas</li>
                  <li>Maintain logical sequence matching circuit numbering</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Space Allocation Strategy</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Allow 25% spare capacity for future circuits</li>
                  <li>Reserve space for testing equipment access</li>
                  <li>Plan cable slack for re-termination during maintenance</li>
                  <li>Ensure compliance with manufacturer space requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Planning tip:</strong> Sketch the layout before installation to identify potential issues early.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="cable-ties-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Securing Methods */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Securing Methods and Cable Separation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proper securing and separation ensure safety, compliance, and optimal performance:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Cable Tie Selection and Application</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Nylon ties: Standard indoor applications up to 85°C</li>
                  <li>Stainless steel ties: High temperature and corrosive environments</li>
                  <li>Releasable ties: Where frequent access is required</li>
                  <li>Correct tension: Firm but not crushing - should slide with resistance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Alternative Securing Methods</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Cable clamps: For heavy cables requiring robust support</li>
                  <li>Adhesive clips: Clean appearance in visible installations</li>
                  <li>Cable trunking: Where multiple cables need organised routing</li>
                  <li>Conduit systems: For maximum mechanical protection</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Voltage Separation Requirements</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Maintain minimum 50mm separation or use barriers between ELV and mains</li>
                  <li>Use separate cable routes where possible</li>
                  <li>Apply segregated trunking for mixed installations</li>
                  <li>Route power and data cables at 90° when crossing</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Critical rule:</strong> Support cables independently - never rely on terminations for mechanical support.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="separation-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Common Problems */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Avoiding Common Problems and Ensuring Compliance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2">Common Dressing Problems to Avoid</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Overcrowding enclosures making access difficult or impossible</li>
                  <li>Excessive slack creating untidy loops that waste space</li>
                  <li>Sharp bends exceeding cable minimum bend radius specifications</li>
                  <li>Crossing over terminals blocking access to other connections</li>
                  <li>Inadequate support allowing cables to hang on terminations</li>
                  <li>Mixed voltage levels without proper separation or barriers</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-2">BS 7671 and Manufacturer Compliance</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Wiring must be arranged to avoid undue stress on terminations</li>
                  <li>Conductors must be protected against mechanical damage</li>
                  <li>Different voltage systems require appropriate separation</li>
                  <li>Access for inspection, testing, and maintenance must be maintained</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Enclosure-Specific Techniques */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Enclosure-Specific Dressing Techniques
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Consumer Units and Distribution Boards</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Use manufacturer-specified cable routes and entry points</li>
                  <li>Group circuits by type: lighting, sockets, dedicated loads</li>
                  <li>Route neutral conductors directly to neutral bar without crossing</li>
                  <li>Keep CPC conductors together in neat bundles with green/yellow sleeving</li>
                  <li>Allow working space for MCB operation and meter connections</li>
                  <li>Label all circuits clearly at both ends for easy identification</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Back Boxes and Accessory Enclosures</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Keep cables at sides of box, leaving centre clear for accessory</li>
                  <li>Form gentle loops to accommodate accessory fitting</li>
                  <li>Ensure adequate conductor length for termination (150mm minimum)</li>
                  <li>Protect cables from sharp edges using grommets or protective sleeves</li>
                  <li>Check no cables are trapped when fitting accessory faceplate</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Control Panels and Industrial Enclosures</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Use designated cable trunking and routing channels</li>
                  <li>Segregate power, control, and instrumentation cables</li>
                  <li>Apply systematic numbering matching circuit documentation</li>
                  <li>Use cable glands rated for environmental conditions</li>
                  <li>Maintain access corridors for maintenance and modifications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quality Assurance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Quality Assurance and Inspection Checklist
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Safety Compliance</p>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>No stress on any termination points</li>
                    <li>All cables properly supported</li>
                    <li>Voltage separation maintained</li>
                    <li>No damaged insulation visible</li>
                    <li>CPC conductors properly sleeved</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Professional Standards</p>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>Neat and logical arrangement</li>
                    <li>Clear access to all terminations</li>
                    <li>Proper cable identification</li>
                    <li>Compliance with manufacturer specs</li>
                    <li>Ready for testing and inspection</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Documentation:</strong> Photograph completed installations for quality records and future reference.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2">Summary</h2>
              <p className="text-white/80 leading-relaxed">
                Neat cable dressing is about safety, compliance, and professional efficiency. Logical routing, proper securing, and adherence to BS 7671 standards make installations easier to inspect, maintain, and troubleshoot — while leaving a lasting impression of quality workmanship. Professional cable dressing reflects technical competence and commitment to electrical safety standards.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Quiz (8 Questions)</h2>
            <p className="text-white/70 mb-6">Test your understanding of cable dressing techniques and requirements.</p>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Using Ferrules, Sleeving, Glands, and Crimps
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-6">
                Next: Testing for Polarity and Continuity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_5;
