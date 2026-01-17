import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Visual Inspection of Installations - Level 3 Module 5 Section 2.1";
const DESCRIPTION = "Comprehensive visual inspection of fabric, wiring systems and protective devices in electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When should visual inspection be carried out in relation to testing?",
    options: [
      "After all electrical tests are complete",
      "Before any testing begins",
      "Only after live tests",
      "At any point during the process"
    ],
    correctIndex: 1,
    explanation: "Visual inspection must always precede testing. This is because inspection can reveal faults or hazards that would affect testing safety, and identifies issues that tests alone would not detect."
  },
  {
    id: "check-2",
    question: "What is the purpose of checking IP ratings during visual inspection?",
    options: [
      "To verify internet connectivity",
      "To confirm equipment is suitable for the environmental conditions",
      "To check the installation date",
      "To verify manufacturer warranty"
    ],
    correctIndex: 1,
    explanation: "IP (Ingress Protection) ratings indicate protection against solid objects and liquids. During inspection, you verify equipment has adequate IP rating for its location - for example, IP44 minimum for bathrooms or IP65 for outdoor use."
  },
  {
    id: "check-3",
    question: "During visual inspection, what should be checked regarding cable entries into enclosures?",
    options: [
      "Only that cables are connected",
      "That entries are properly sealed and glands/grommets are fitted",
      "Cable colour only",
      "Cable manufacturer information"
    ],
    correctIndex: 1,
    explanation: "Cable entries must be properly sealed to maintain the IP rating of the enclosure and prevent ingress of water, dust, or vermin. Correct glands or grommets must be fitted and any unused knockouts blanked off."
  },
  {
    id: "check-4",
    question: "Why is it important to check for presence and adequacy of barriers during visual inspection?",
    options: [
      "For aesthetic appearance",
      "To prevent accidental contact with live parts",
      "To improve ventilation",
      "To reduce installation costs"
    ],
    correctIndex: 1,
    explanation: "Barriers provide protection against direct contact with live parts (basic protection). During inspection, verify that all covers are in place, barriers are secure, and there are no exposed live parts accessible without the use of a tool."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671 Regulation 611.2, inspection shall be carried out:",
    options: [
      "With the supply connected",
      "With the supply disconnected",
      "At any time convenient for the inspector",
      "Only during working hours"
    ],
    correctAnswer: 1,
    explanation: "Regulation 611.2 states that inspection shall precede testing and shall normally be carried out with the supply disconnected. This is essential for safety during the inspection process."
  },
  {
    id: 2,
    question: "What must be verified regarding conductor cross-sectional areas during visual inspection?",
    options: [
      "That they match the cable colour",
      "That they comply with the design and are adequate for the connected load",
      "That they are all the same size",
      "That they are copper only"
    ],
    correctAnswer: 1,
    explanation: "Inspection must verify that conductor sizes match the design specification and are adequate for the connected load, circuit length, and protective device rating. Undersized conductors create fire and overheating risks."
  },
  {
    id: 3,
    question: "During inspection of a consumer unit, what must be checked regarding protective devices?",
    options: [
      "Only that they switch on and off",
      "Type, rating, and suitability for the circuit protected",
      "The manufacturer's logo",
      "Only the colour of the device"
    ],
    correctAnswer: 1,
    explanation: "Protective devices must be verified for correct type (MCB, RCBO, fuse), correct rating for the circuit, correct breaking capacity for the fault level, and correct characteristics (Type B, C, D for MCBs)."
  },
  {
    id: 4,
    question: "What is being checked when inspecting the connection of conductors?",
    options: [
      "Cable colour matching",
      "Secure connections, correct termination methods, and no damage to insulation",
      "Length of exposed conductor",
      "Brand of connector used"
    ],
    correctAnswer: 1,
    explanation: "Connection inspection verifies that terminations are secure, the correct method is used for the cable type, insulation is not damaged during termination, and conductors are correctly identified."
  },
  {
    id: 5,
    question: "Why must the routing of cables be checked during visual inspection?",
    options: [
      "To ensure they look neat",
      "To verify they are in safe zones and protected from damage",
      "To count the number of cables",
      "To check cable colour codes"
    ],
    correctAnswer: 1,
    explanation: "Cable routing must be in safe zones (defined in BS 7671) or adequately protected to prevent accidental damage from nails, screws, or other penetrations. Cables outside safe zones need mechanical protection."
  },
  {
    id: 6,
    question: "When inspecting earthing arrangements, what must be visually confirmed?",
    options: [
      "Only that an earth wire exists",
      "Presence and adequacy of earthing conductor, main bonding, and labels",
      "The colour of the earth wire only",
      "That earthing can be removed easily"
    ],
    correctAnswer: 1,
    explanation: "Earthing inspection verifies the earthing conductor is adequate size and properly connected, main bonding conductors are present to extraneous-conductive-parts, and appropriate warning labels are fitted."
  },
  {
    id: 7,
    question: "What should be checked regarding identification and notices during visual inspection?",
    options: [
      "Only circuit chart presence",
      "Warning notices, circuit identification, and danger notices where required",
      "Company logo placement",
      "Installation date only"
    ],
    correctAnswer: 1,
    explanation: "Inspection verifies presence of warning notices (RCD test quarterly, voltage present), circuit identification (circuit chart), safety electrical connection labels, and any other required notices."
  },
  {
    id: 8,
    question: "During visual inspection of socket outlets, what specific items should be checked?",
    options: [
      "Brand name only",
      "Correct mounting, secure fixing, appropriate for location, shuttered where required",
      "Colour matching with walls",
      "Distance from floor only"
    ],
    correctAnswer: 1,
    explanation: "Socket outlet inspection includes secure fixing, level mounting, appropriate type for location (IP rating), shuttered outlets where accessible to children, and correct height in accessible locations."
  },
  {
    id: 9,
    question: "What must be verified regarding protective device co-ordination during inspection?",
    options: [
      "That all devices are the same brand",
      "That devices are correctly rated and co-ordinated for discrimination",
      "That devices are all the same colour",
      "That devices are equally spaced"
    ],
    correctAnswer: 1,
    explanation: "Inspection verifies protective devices are correctly selected for their circuits and, where important for safety, that discrimination (selectivity) exists so only the device nearest the fault operates."
  },
  {
    id: 10,
    question: "When inspecting wiring in thermal insulation, what must be verified?",
    options: [
      "Insulation colour",
      "Current-carrying capacity has been suitably derated or cable is appropriately rated",
      "Insulation manufacturer",
      "Nothing specific - thermal insulation doesn't affect cables"
    ],
    correctAnswer: 1,
    explanation: "Cables surrounded by thermal insulation cannot dissipate heat effectively. Inspection must verify the installation complies with the derating requirements or the cable rating has been appropriately selected."
  }
];

const faqs = [
  {
    question: "How do I know what to inspect in each type of installation?",
    answer: "The Schedule of Inspections in BS 7671 Appendix 6 lists all items that should be inspected. Use this as a checklist, ticking off each item as you verify it. Not all items apply to every installation - mark N/A where appropriate."
  },
  {
    question: "What should I do if I cannot access part of the installation for inspection?",
    answer: "Record the limitation on the certificate. State clearly what could not be inspected and why. This protects you legally and informs the client that a full inspection was not possible. Never assume concealed work is correct."
  },
  {
    question: "How thorough should visual inspection be?",
    answer: "Inspection should be comprehensive within the agreed extent. For initial verification, all accessible parts of new work should be inspected. For periodic inspection, the agreed scope determines extent, but inspection should still be thorough within that scope."
  },
  {
    question: "What if I find dangerous conditions during visual inspection?",
    answer: "Stop immediately and make the situation safe if possible. Inform the client or responsible person immediately. Do not proceed with testing if there is a risk of injury. Record the finding as a C1 on any condition report."
  },
  {
    question: "Should I inspect behind consumer unit covers?",
    answer: "Yes, absolutely. Inspection inside the consumer unit is essential - you need to verify connections, protective device ratings, conductor identification, and internal wiring condition. This requires the supply to be isolated first."
  }
];

const Level3Module5Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Visual Inspection of Installations
          </h1>
          <p className="text-white/80">
            Comprehensive inspection of fabric, wiring systems and protective devices
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Before testing:</strong> Inspection always precedes testing</li>
              <li><strong>Supply off:</strong> Normally carried out with supply disconnected</li>
              <li><strong>Systematic:</strong> Use Schedule of Inspections as checklist</li>
              <li><strong>Record:</strong> Document all findings and limitations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Defects tests cannot detect</li>
              <li><strong>Use:</strong> Your eyes and judgement</li>
              <li><strong>Apply:</strong> Knowledge of correct installation practice</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "What visual inspection involves and why it matters",
              "Key items to inspect in every installation",
              "How to use the Schedule of Inspections",
              "Recognising defects and non-compliances",
              "Dealing with access limitations",
              "Recording inspection findings correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose and Importance of Visual Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is not a cursory glance - it is a systematic examination of the installation to verify that equipment is correctly selected, installed, and undamaged. Many defects cannot be detected by electrical testing alone; they can only be found by looking.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Visual inspection can detect:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Incorrect equipment selection (wrong IP rating, wrong type)</li>
                <li>Visible damage (cracked enclosures, burnt terminals)</li>
                <li>Poor workmanship (untidy wiring, incorrect cable management)</li>
                <li>Missing components (blanks not fitted, covers missing)</li>
                <li>Incorrect installation (wrong orientation, improper fixing)</li>
                <li>Cable routing outside safe zones without protection</li>
              </ul>
            </div>

            <p>
              A circuit might pass all electrical tests perfectly yet be dangerous due to a defect that only inspection reveals. For example, a cable with damaged sheath might have good insulation resistance, but the damage could lead to future failure.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Tests measure electrical performance. Inspection verifies correct selection, installation, and condition. Both are essential; neither alone is sufficient.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Inspection Items
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 6 provides a comprehensive Schedule of Inspections listing all items that should be checked. These can be grouped into categories for systematic inspection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment and Enclosures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct type and rating</li>
                  <li>Suitable for environmental conditions</li>
                  <li>No visible damage</li>
                  <li>Adequate IP rating for location</li>
                  <li>Correct orientation and mounting</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cables and Conductors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct type for application</li>
                  <li>Adequate size for load</li>
                  <li>Properly supported and protected</li>
                  <li>Correct routing (safe zones)</li>
                  <li>No visible damage to insulation</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connections and Terminations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Secure and correctly made</li>
                  <li>Correct termination method</li>
                  <li>No exposed conductors</li>
                  <li>Correct conductor identification</li>
                  <li>Adequate for fault current</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection and Earthing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Protective devices correct type/rating</li>
                  <li>Earthing conductor adequate and connected</li>
                  <li>Bonding conductors present where required</li>
                  <li>Warning labels fitted</li>
                  <li>Basic protection maintained</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Inspecting a bathroom installation, you would verify socket outlets are at least 3m from the bath (Zone 3), the pull cord switch is suitable for the location, all equipment has appropriate IP rating (minimum IPX4 in Zone 2), and RCD protection is provided.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Inspection of the Consumer Unit
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The consumer unit is the heart of the installation and requires detailed inspection. This must be done with the supply isolated as you will need to remove covers and examine internal wiring.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Consumer unit inspection items:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Enclosure:</strong> Metal or non-combustible material (Regulation 421.1.201)</li>
                <li><strong>Main switch:</strong> Correct rating, isolation capability (double pole for TN-C-S)</li>
                <li><strong>RCDs:</strong> Correct rating, type (A, AC, B, F), sensitivity</li>
                <li><strong>MCBs/RCBOs:</strong> Correct type and rating for each circuit</li>
                <li><strong>Terminations:</strong> Secure, correctly torqued, no damage</li>
                <li><strong>Circuit identification:</strong> Chart complete and accurate</li>
                <li><strong>Spare ways:</strong> Blanks fitted to unused ways</li>
                <li><strong>Warnings:</strong> RCD test notice, voltage warning if applicable</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> From January 2016 (AMD3), consumer units in domestic premises must be metal or non-combustible. Check the enclosure material meets this requirement for new installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording and Documenting Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inspection findings must be recorded systematically. The Schedule of Inspections provides tick boxes for each item - use these consistently to ensure nothing is missed and to provide evidence of what was checked.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Tick</p>
                <p className="text-white/90 text-xs">Item inspected and satisfactory</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">N/A</p>
                <p className="text-white/90 text-xs">Not applicable to this installation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">LIM</p>
                <p className="text-white/90 text-xs">Limited - could not fully inspect</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When recording limitations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>State clearly what could not be inspected</li>
                <li>Explain why (access restricted, concealed, time constraints)</li>
                <li>Record on the certificate extent and limitations section</li>
                <li>Never assume concealed work is correct without evidence</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> "Inspection limited to accessible parts. Cable routes in loft area could not be fully verified due to restricted access and presence of loose-fill insulation. Sample inspection of visible cables showed correct routing and support."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Inspection Approach</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start at the origin (consumer unit) and work outwards</li>
                <li>Use the Schedule of Inspections as your guide</li>
                <li>Inspect each circuit from protective device to final point</li>
                <li>Check both fixed wiring and accessories</li>
                <li>Record findings as you go - don't rely on memory</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Tools for Visual Inspection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Torch - essential for inspecting dark areas</li>
                <li>Mirror - for viewing behind equipment</li>
                <li>Screwdriver - to remove covers (after isolation)</li>
                <li>Camera - to photograph defects or questionable items</li>
                <li>Schedule of Inspections - your checklist</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Defects to Look For</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Overheating signs:</strong> Discolouration, melting, burnt smell</li>
                <li><strong>Mechanical damage:</strong> Cracked enclosures, damaged cable sheath</li>
                <li><strong>Incorrect installation:</strong> Wrong equipment type, poor workmanship</li>
                <li><strong>Missing items:</strong> Blank covers, earth labels, circuit chart</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Equipment Checks</p>
                <ul className="space-y-0.5">
                  <li>Correct type and rating</li>
                  <li>Suitable IP rating for location</li>
                  <li>No visible damage</li>
                  <li>Properly installed and fixed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Cable Checks</p>
                <ul className="space-y-0.5">
                  <li>Correct type and size</li>
                  <li>Safe zone routing or protected</li>
                  <li>Properly supported</li>
                  <li>No damage to sheath/insulation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

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
            <Link to="/study-centre/apprentice/level3-module5-section2-2">
              Next: Compliance Checking
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section2_1;
