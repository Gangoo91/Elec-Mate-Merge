import { ArrowLeft, Eye, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_1 = () => {
  useSEO(
    "What to Look for During Visual Checks - Level 2 Electrical Installation",
    "Comprehensive guide to visual inspection procedures and identifying defects in electrical installations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a visual inspection?",
      options: [
        "To test electrical continuity",
        "To identify defects before testing",
        "To measure insulation resistance",
        "To calculate load requirements"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection is carried out first to identify obvious defects, hazards, and poor workmanship before any electrical testing begins."
    },
    {
      id: 2,
      question: "Which regulation outlines cable routing safe zones?",
      options: [
        "BS 5839",
        "BS 7671",
        "Building Regs Part L",
        "BS 6004"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (The IET Wiring Regulations) specifies the safe zones for cable installation in walls, floors, and ceilings."
    },
    {
      id: 3,
      question: "Name two defects to look for on socket outlets.",
      options: [
        "Colour and size",
        "Cracks and scorch marks",
        "Brand and model",
        "Age and warranty"
      ],
      correctAnswer: 1,
      explanation: "Physical damage like cracks and signs of overheating such as scorch marks indicate potential safety hazards that must be addressed."
    },
    {
      id: 4,
      question: "True or False: Minor scratches on accessories must always be recorded.",
      options: [
        "True - all defects must be recorded",
        "False - only safety-affecting defects",
        "True - for insurance purposes",
        "False - scratches are acceptable"
      ],
      correctAnswer: 1,
      explanation: "Only defects that affect safety, functionality, or compliance need to be recorded. Minor cosmetic issues that don't impact safety are not required to be documented."
    },
    {
      id: 5,
      question: "What safety device must be present in bathrooms and outdoor circuits?",
      options: [
        "MCB (Miniature Circuit Breaker)",
        "RCBO (RCD + MCB combined)",
        "RCD (Residual Current Device)",
        "SPD (Surge Protection Device)"
      ],
      correctAnswer: 2,
      explanation: "RCDs are mandatory in bathrooms and outdoor circuits to provide additional protection against electric shock in higher-risk environments."
    },
    {
      id: 6,
      question: "What is a key sign of poor workmanship in trunking installation?",
      options: [
        "Straight alignment",
        "Proper joint connections",
        "Uneven runs or missing fixings",
        "Adequate cable capacity"
      ],
      correctAnswer: 2,
      explanation: "Uneven trunking runs and missing fixings indicate poor installation practices that can lead to mechanical stress and potential failures."
    },
    {
      id: 7,
      question: "Why should earthing conductors be inspected?",
      options: [
        "To check conductor size",
        "To ensure safety and compliance",
        "To verify insulation colour",
        "To measure resistance"
      ],
      correctAnswer: 1,
      explanation: "Earthing conductors are critical for safety, providing a path for fault currents and ensuring effective operation of protective devices."
    },
    {
      id: 8,
      question: "At what stage should visual inspections be carried out?",
      options: [
        "After all testing is complete",
        "Before any testing or energising",
        "Only during commissioning",
        "When faults are suspected"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection must be the first step, carried out before any electrical testing or energising to identify obvious hazards and defects safely."
    },
    {
      id: 9,
      question: "Which locations require IP-rated protection?",
      options: [
        "All domestic locations",
        "Bathrooms and outdoor areas",
        "Only industrial installations",
        "Bedrooms and lounges"
      ],
      correctAnswer: 1,
      explanation: "Locations exposed to moisture, dust, or other environmental factors require appropriate IP-rated equipment for protection against ingress."
    },
    {
      id: 10,
      question: "What tool is essential for ensuring no stage of inspection is missed?",
      options: [
        "Multimeter",
        "Insulation tester",
        "A checklist",
        "RCD tester"
      ],
      correctAnswer: 2,
      explanation: "A systematic checklist ensures all required inspection points are covered and nothing is overlooked during the visual inspection process."
    }
  ];

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
              Back to Section 6.2
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.2.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              What to Look for During Visual Checks
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Comprehensive guide to visual inspection procedures and identifying defects in electrical installations
            </p>
          </header>

          {/* Quick Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-elec-yellow" />
              <h2 className="font-semibold text-white">Spot it in 30 Seconds</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <p className="font-medium text-elec-yellow mb-2">Key Points</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Visual inspection is the first defence in electrical safety</li>
                  <li>Check for damage: cracked sockets, scorched cables, loose accessories</li>
                  <li>Verify cables are in safe zones and properly supported</li>
                  <li>Confirm earthing, bonding, and safety devices are present</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Damaged enclosures, exposed conductors, poor workmanship</li>
                  <li><strong>Use:</strong> Adequate lighting, systematic checklist, BS 7671 requirements</li>
                  <li><strong>Check:</strong> Never assume safety - always verify</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Visual inspection is the first stage of ensuring an electrical installation is safe, compliant, and fit for use. Before any testing is carried out, installers must carefully check for obvious defects, hazards, and poor workmanship.
              </p>
              <p>
                A thorough visual inspection reduces the likelihood of electrical faults, improves safety, and ensures compliance with BS 7671.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p>By the end of this subsection, learners will be able to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identify the main elements to check during a visual inspection</li>
                <li>Recognise unsafe practices such as exposed conductors or damaged insulation</li>
                <li>Understand the importance of checking workmanship quality</li>
                <li>Apply BS 7671 requirements when carrying out visual checks</li>
                <li>Record findings accurately for compliance</li>
              </ul>
            </div>
          </section>

          {/* Section 1: Condition of Equipment */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Condition of Equipment and Accessories
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The first priority during visual inspection is checking the physical condition of all electrical equipment and accessories. This includes examining sockets, switches, distribution boards, and other electrical components.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-3">Equipment Condition Checks:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white mb-1"><strong>Socket Outlets and Switches:</strong></p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Check for cracks, breaks, or damage to the faceplate or mounting box</li>
                      <li>Look for scorch marks or discolouration indicating overheating</li>
                      <li>Ensure mounting is secure with no loose fixings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Enclosures and Distribution Boards:</strong></p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Check for missing covers or damaged enclosure integrity</li>
                      <li>Look for signs of moisture ingress or corrosion</li>
                      <li>Verify proper sealing and gasketing where required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="equipment-condition-check"
                question="What are the main signs of damage to look for on electrical accessories?"
                options={["Age and manufacturer", "Cracks, breaks, and scorch marks", "Colour and style", "Installation date"]}
                correctIndex={1}
                explanation="Physical damage like cracks, breaks, and scorch marks indicate potential safety hazards that require immediate attention."
              />
            </div>
          </section>

          {/* Section 2: Integrity of Cables */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Integrity of Cables and Conductors
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Cable integrity is fundamental to electrical safety. During visual inspection, particular attention must be paid to the condition of cable insulation, sheathing, and mechanical protection.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-3">Cable and Conductor Inspection:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white mb-1"><strong>Cable Condition:</strong></p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Look for cuts, nicks, or damage to cable sheathing or insulation</li>
                      <li>Check for exposed live conductors or damaged protective covering</li>
                      <li>Identify any signs of rodent damage or environmental degradation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Cable Support and Installation:</strong></p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Ensure cables are properly supported at appropriate intervals</li>
                      <li>Check that cables are not under mechanical strain or stress</li>
                      <li>Verify minimum bending radii are maintained</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="cable-integrity-check"
                question="Why is it important to check cable support and strain relief?"
                options={["For aesthetic appearance", "To prevent mechanical damage and maintain electrical integrity", "To comply with building regulations", "To reduce installation costs"]}
                correctIndex={1}
                explanation="Proper cable support prevents mechanical stress that could damage conductors or connections, maintaining both safety and electrical integrity."
              />
            </div>
          </section>

          {/* Section 3: Selection and Installation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Correct Selection and Installation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Visual inspection must verify that all components are correctly selected for their intended application and installed according to manufacturer instructions and BS 7671 requirements.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-3">Selection and Installation Verification:</p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Confirm accessories are correctly rated for their intended current and voltage</li>
                  <li>Verify protective devices match cable ratings and installation methods</li>
                  <li>Check appropriate IP ratings for location (bathrooms, outdoor areas)</li>
                  <li>Ensure proper ventilation and heat dissipation arrangements</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="selection-installation-check"
                question="Which regulation requires specific IP ratings in bathroom zones?"
                options={["BS 5839", "BS 7671", "Building Regulations", "HSE Guidance"]}
                correctIndex={1}
                explanation="BS 7671 specifies IP rating requirements for different zones in locations containing a bath or shower."
              />
            </div>
          </section>

          {/* Section 4: Earthing and Bonding */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Earthing and Bonding
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective earthing and bonding systems are critical for electrical safety. Visual inspection must confirm that all earthing and bonding connections are present, accessible, and properly implemented.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-3">Earthing and Bonding Systems:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white mb-1"><strong>Main Earthing Arrangements:</strong></p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Verify presence and condition of main earthing conductor</li>
                      <li>Check earth electrode connection is secure and accessible</li>
                      <li>Ensure earthing conductor is correctly sized</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Main Equipotential Bonding:</strong></p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Water service pipes - bonding within 600mm of entry</li>
                      <li>Gas installation pipes - bonding at meter position</li>
                      <li>Structural steelwork - bonding to main framework</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="font-medium text-amber-400 mb-2">Critical Safety Point</p>
                <p className="text-sm">
                  Missing or inadequate earthing and bonding can result in dangerous touch voltages during fault conditions. Always verify all required connections are present.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="earthing-bonding-check"
                question="What metallic services require main bonding connections?"
                options={["Only water pipes", "Water, gas, oil, and structural steelwork", "Only gas pipes", "Only central heating pipes"]}
                correctIndex={1}
                explanation="All extraneous-conductive-parts including water, gas, oil pipes and structural steelwork require main equipotential bonding."
              />
            </div>
          </section>

          {/* Section 5: Safe Zones */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Safe Cable Routes and Zones
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                BS 7671 specifies safe zones for cable installation to reduce the risk of inadvertent damage during building work. Visual inspection must verify compliance with these critical safety requirements.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-3">Permitted Safe Zones (BS 7671 Section 522):</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Horizontal Zones:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Within 150mm of top or bottom of wall</li>
                      <li>Within 150mm horizontally from ceiling</li>
                      <li>Within 150mm from internal corner</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Vertical Zones:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Within 150mm of external corners</li>
                      <li>Within 150mm either side of accessories</li>
                      <li>Directly above or below accessories</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="safe-zones-check"
                question="Which zones are permitted for concealed cables in walls?"
                options={["Anywhere in the wall", "150mm from corners and within 150mm of ceiling/floor", "Only in metal conduit", "Only behind socket outlets"]}
                correctIndex={1}
                explanation="BS 7671 allows concealed cables in walls within 150mm of the top, bottom, or corner of the wall or within 150mm of accessories."
              />
            </div>
          </section>

          {/* Section 6: Poor Workmanship */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Signs of Poor Workmanship
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Poor workmanship can compromise both safety and compliance. Visual inspection should identify installation practices that do not meet professional standards.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-3">Workmanship Quality Indicators:</p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Uneven trunking runs with poor alignment</li>
                  <li>Missing fixings or inadequate support spacing</li>
                  <li>Excessive bends that could damage cable insulation</li>
                  <li>Loose accessories or poor mounting</li>
                  <li>Multiple conductors forced into single terminals</li>
                  <li>Poor labelling or missing identification</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="workmanship-check"
                question="What indicates poor workmanship in cable management systems?"
                options={["Perfect alignment", "Uneven runs and missing fixings", "Proper labelling", "Adequate support"]}
                correctIndex={1}
                explanation="Poor workmanship is indicated by uneven trunking runs, missing fixings, loose accessories, and inadequate cable support."
              />
            </div>
          </section>

          {/* Section 7: Safety Devices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Presence of Safety Devices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Modern electrical installations include various safety devices mandated by BS 7671. Visual inspection must confirm these devices are present and correctly installed.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-pink-500/50">
                <p className="font-medium text-white mb-3">RCD Protection Requirements:</p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>All socket outlets rated up to 20A (domestic and similar)</li>
                  <li>All circuits in bathrooms and shower rooms</li>
                  <li>All outdoor circuits and equipment</li>
                  <li>Cables concealed in walls at depth less than 50mm</li>
                  <li>Mobile equipment up to 32A when used outdoors</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h2 className="text-lg font-semibold text-white mb-4">Pocket Guide – Key Visual Checks</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Essential Safety Checks</p>
                  <ul className="space-y-1 text-white/80">
                    <li>✅ Exposed live parts - immediate danger</li>
                    <li>✅ Damaged accessories and equipment</li>
                    <li>✅ Cable damage and strain relief</li>
                    <li>✅ Scorch marks and overheating signs</li>
                    <li>✅ Missing covers and enclosure integrity</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Compliance Verification</p>
                  <ul className="space-y-1 text-white/80">
                    <li>✅ Safe zone compliance (150mm rule)</li>
                    <li>✅ IP ratings for environment</li>
                    <li>✅ RCD protection where required</li>
                    <li>✅ Earthing and bonding connections</li>
                    <li>✅ Circuit identification and labelling</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p><strong>Key Learning Points:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Visual inspections are the foundation of electrical safety - they must be thorough and systematic</li>
                <li>Seven critical areas: equipment condition, cable integrity, selection/installation, earthing/bonding, safe zones, workmanship, safety devices</li>
                <li>Environmental factors significantly affect installation longevity and safety</li>
                <li>Professional competence and systematic approach are essential for effective inspection</li>
              </ul>

              <p className="mt-4"><strong>Critical Safety Messages:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Never energise installations based on visual inspection alone - testing is also required</li>
                <li>Stop immediately if immediate danger is discovered and make the installation safe</li>
                <li>Question everything - if something appears unusual, investigate further</li>
              </ul>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-elec-yellow" />
              <h2 className="text-xl font-semibold text-white">Quiz (10 Questions)</h2>
            </div>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 6.2
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-2">
                Next: Signs of Damage
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section2_1;
