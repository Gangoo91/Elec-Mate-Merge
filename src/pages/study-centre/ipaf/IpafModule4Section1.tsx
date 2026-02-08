import { ArrowLeft, Eye, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "When should a pre-use visual check be carried out on a mobile access tower?",
    options: [
      "Once a week on Monday mornings",
      "Before each use or at the start of every shift",
      "Only after the tower has been moved",
      "Monthly as part of a maintenance schedule",
    ],
    correctAnswer: 1,
    explanation:
      "Pre-use visual checks must be carried out before each use or at the start of every working shift. This ensures any defects or changes since last use are identified before anyone climbs the tower.",
  },
  {
    id: 2,
    question: "What should you do if you discover a bent frame member during a pre-use check?",
    options: [
      "Continue using the tower if it seems stable",
      "Straighten the frame with a mallet",
      "Take the tower out of service immediately and report the defect",
      "Only replace it at the next formal inspection",
    ],
    correctAnswer: 2,
    explanation:
      "Any bent, damaged, or deformed frame member means the tower must be taken out of service immediately. Bent frames compromise structural integrity and cannot be safely straightened on site.",
  },
  {
    id: 3,
    question: "Why is it important to check for graffiti or paint on tower components?",
    options: [
      "It looks unprofessional on site",
      "Paint can make components slippery",
      "Graffiti and paint can mask underlying cracks, dents, or corrosion",
      "It adds extra weight to the tower",
    ],
    correctAnswer: 2,
    explanation:
      "Graffiti, paint, stickers, or any coating can mask underlying defects such as cracks, dents, corrosion, or weld failures. All components should be clean enough that their surface condition can be fully assessed.",
  },
  {
    id: 4,
    question: "What is the correct procedure for checking castor brake engagement?",
    options: [
      "Visually confirm the brake lever is down",
      "Apply the brake and attempt to push the tower to verify it does not roll",
      "Spin each wheel to see if it stops quickly",
      "Check the brake once during the formal inspection only",
    ],
    correctAnswer: 1,
    explanation:
      "Each castor brake should be applied and then tested by attempting to push the tower. The tower should not roll or move when all brakes are properly engaged. Visual checks alone are insufficient.",
  },
  {
    id: 5,
    question: "Which of the following is NOT part of a pre-use visual check?",
    options: [
      "Checking guardrail heights with a tape measure",
      "Calculating the tower's maximum permissible height",
      "Confirming stabilisers are correctly positioned",
      "Checking the platform for damage or missing trapdoor springs",
    ],
    correctAnswer: 1,
    explanation:
      "Calculating the maximum permissible height is part of the planning and assembly process, not the pre-use check. Pre-use checks focus on verifying that an already-assembled tower remains safe to use.",
  },
  {
    id: 6,
    question: "What ground condition change might make a tower unsafe since its last use?",
    options: [
      "The grass has grown slightly longer",
      "Overnight rain has softened the ground beneath the base plates",
      "The temperature has dropped by 2 degrees",
      "A nearby skip has been emptied",
    ],
    correctAnswer: 1,
    explanation:
      "Rain, flooding, or thawing can soften the ground, causing the tower to sink unevenly and become unstable. Ground conditions must be reassessed at the start of each shift, especially after adverse weather.",
  },
  {
    id: 7,
    question: "How does a pre-use check differ from a formal inspection?",
    options: [
      "There is no difference; they are the same thing",
      "A pre-use check is more detailed than a formal inspection",
      "A pre-use check is a quick visual assessment; a formal inspection is a thorough documented examination",
      "A formal inspection is done by the tower user; a pre-use check by a manager",
    ],
    correctAnswer: 2,
    explanation:
      "A pre-use check is a quick visual assessment carried out by the user before climbing. A formal inspection is a more thorough, documented examination carried out by a competent person at defined intervals under the Work at Height Regulations.",
  },
  {
    id: 8,
    question: "Where should the manufacturer's instruction manual be kept?",
    options: [
      "In the site office filing cabinet",
      "At the manufacturer's premises",
      "On site and accessible to tower users at all times",
      "With the health and safety manager only",
    ],
    correctAnswer: 2,
    explanation:
      "The manufacturer's instruction manual must be available on site and accessible to all tower users. It contains critical information about assembly, maximum heights, loading limits, and safe use.",
  },
];

const quickCheckQuestions = [
  {
    id: "pre-use-frequency",
    question:
      "How often should a pre-use visual check be carried out on a mobile access tower?",
    options: [
      "Once a week",
      "Before every use or at the start of each shift",
      "Only after the tower has been assembled",
      "Every 7 days",
    ],
    correctIndex: 1,
    explanation:
      "Pre-use checks must be carried out before every use or at the start of each working shift. This is separate from — and additional to — the formal 7-day inspection requirement.",
  },
  {
    id: "castor-brake-test",
    question:
      "What is the correct way to verify that castor brakes are working properly?",
    options: [
      "Visual check that the levers are in the locked position",
      "Spin each wheel and see how quickly it stops",
      "Apply the brakes and physically attempt to push the tower",
      "Ask a colleague to confirm the brakes look engaged",
    ],
    correctIndex: 2,
    explanation:
      "You must apply each brake and physically attempt to push the tower. The tower should not roll or move. A purely visual check cannot confirm that the brake mechanism is actually gripping the wheel.",
  },
  {
    id: "unauthorised-mods",
    question:
      "You notice that someone has tied a scaffold board to the outside of the tower to create an extra platform. What should you do?",
    options: [
      "Check it is tied securely and then use the tower",
      "Remove the modification, report it, and carry out a full pre-use check before use",
      "Ignore it as long as it does not affect stability",
      "Add more ties to make it safer",
    ],
    correctIndex: 1,
    explanation:
      "Any unauthorised modification must be removed immediately. The tower should then be fully checked before use. Unauthorised modifications can compromise stability and may exceed the tower's safe working load.",
  },
];

const faqs = [
  {
    question: "Can an apprentice carry out a pre-use visual check?",
    answer:
      "Any tower user who has received appropriate training can carry out a pre-use visual check. However, they must know what to look for and understand when to report defects. If they are not confident in identifying issues, they should seek guidance from a more experienced colleague or supervisor before using the tower.",
  },
  {
    question: "Is a pre-use check required if the tower has not been moved overnight?",
    answer:
      "Yes. Even if the tower has remained in position, conditions may have changed overnight — wind, rain, frost, ground settlement, or interference by others. A fresh pre-use check at the start of each shift is always required.",
  },
  {
    question:
      "Do I need to write down the results of a pre-use check?",
    answer:
      "There is no legal requirement to record pre-use checks, but many employers and principal contractors require it as good practice. A simple checklist signed by the user can provide valuable evidence that checks were carried out. Formal inspections, by contrast, must always be recorded in writing.",
  },
  {
    question: "What should I do if the weather has changed since the tower was last used?",
    answer:
      "Reassess wind speed, visibility, rain, ice, and ground conditions. If wind exceeds the manufacturer's maximum (typically 17 m/s or 38 mph for normal use), the tower must not be used. Rain and frost can make platforms and rungs slippery, and softened ground can cause instability.",
  },
];

export default function IpafModule4Section1() {
  useSEO({
    title: "Pre-Use Visual Checks | Module 4 Section 1 | IPAF Mobile Scaffold",
    description:
      "Daily pre-use visual checks for mobile access towers — component damage, missing parts, castor brakes, stabilisers, guardrails, ground conditions, and weather assessment.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <Eye className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 4.1
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pre-Use Visual Checks
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            Daily checks that every tower user must carry out before each use — your first line of defence against tower-related incidents
          </p>
        </header>

        {/* Section 01: Quick Summary Boxes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            At a Glance
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li><strong>When:</strong> Before every use / start of each shift</li>
                <li><strong>Who:</strong> Any trained tower user</li>
                <li><strong>Duration:</strong> 2-5 minutes typically</li>
                <li><strong>Record:</strong> Not legally required but recommended</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li><strong>Check:</strong> Frames, braces, platforms, guardrails</li>
                <li><strong>Test:</strong> Castor brakes, locking clips, stabilisers</li>
                <li><strong>Assess:</strong> Ground, weather, surroundings</li>
                <li><strong>Confirm:</strong> Manual on site, no modifications</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why pre-use checks are essential before every use",
              "List the key components to check on a mobile access tower",
              "Demonstrate correct castor brake engagement testing",
              "Distinguish between pre-use checks and formal inspections",
              "Identify environmental factors that affect tower safety",
              "Recognise unauthorised modifications and know the correct response",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 03: Why Pre-Use Checks Matter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why Pre-Use Checks Matter
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A pre-use visual check is the <strong>first line of defence</strong> against tower-related accidents. It is a quick but systematic assessment carried out by the tower user before every use or at the start of each working shift. The purpose is to confirm that the tower remains safe since it was last used or inspected.
              </p>
              <p>
                Conditions can change overnight or between shifts due to <strong>weather, ground movement, interference by others, accidental impact, or theft of components</strong>. A tower that was safe at 5 pm may not be safe at 7 am the following morning.
              </p>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white/60 mb-2">Key Principle</p>
                <p className="text-white">
                  The Work at Height Regulations 2005 require that work equipment for work at height is <strong className="text-elec-yellow">inspected at suitable intervals</strong> and that no work equipment is used unless it has been inspected. A pre-use check fulfils part of this obligation.
                </p>
              </div>
              <p>
                Pre-use checks are <strong>not a substitute</strong> for formal inspections under Schedule 7 of the Work at Height Regulations — they are an additional, complementary measure. Think of them as a quick health check before you trust the tower with your safety.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Structural Component Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Structural Component Checks
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Begin your check at ground level and work upwards systematically. Look at each component category in turn.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Frames and Braces</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Dents and bends</strong> — Run your eye along every vertical standard and horizontal brace. Any visible bowing, kinking, or deformation means the component must be replaced.</li>
                  <li><strong>Cracks</strong> — Check weld points and joints for hairline cracks. Aluminium fatigue cracks can be difficult to spot — look for discolouration or fine lines radiating from stress points.</li>
                  <li><strong>Corrosion</strong> — Aluminium does not rust but it does corrode. White powdery deposits (aluminium oxide) indicate surface corrosion. Pitting corrosion weakens the metal and is cause for rejection.</li>
                  <li><strong>Missing spigot pins or gravity locks</strong> — Every frame-to-frame connection must be fully engaged. Check that spigot pins are present and that gravity locks have dropped into position.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Horizontal Braces and Diagonal Braces</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>All braces present</strong> — Count the braces and compare with the assembly instruction. Missing braces drastically reduce stability.</li>
                  <li><strong>Clips fully engaged</strong> — Each brace end should be clipped onto the frame rung with the locking mechanism fully closed. A partially engaged clip can disengage under load.</li>
                  <li><strong>No bowing or bending</strong> — Braces must be straight. A bent brace cannot provide its designed bracing force.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Guardrails and Toeboards</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>All guardrails in place</strong> — Top guardrail, mid guardrail, and toeboards must be fitted on all open sides of the platform.</li>
                  <li><strong>Correct heights</strong> — Top guardrail at minimum 950 mm above platform level. Toeboard at least 150 mm high. Mid guardrail positioned so no gap exceeds 470 mm.</li>
                  <li><strong>Secure connections</strong> — All guardrail clips must be fully engaged. Push each guardrail to check for excessive play or looseness.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Base, Castors, and Stabilisers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Base, Castors, and Stabilisers
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The base of the tower is critical to stability. Problems here affect the entire structure above.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Castor Wheels</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Wheel condition</strong> — Check for flat spots, cracks, chunks missing from the tyre, or excessive wear. Damaged wheels can cause the tower to rock or roll unexpectedly.</li>
                  <li><strong>Swivel mechanism</strong> — Each castor should rotate freely when the brake is off. A seized swivel can make the tower difficult to move and may indicate internal damage.</li>
                  <li><strong>Attachment to frame</strong> — The castor stem must be fully inserted into the base of the frame leg and the locking pin must be in place. A castor that pulls out under load will cause the tower to collapse.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Castor Brake Engagement Test</p>
                <p className="text-sm text-white mb-3">
                  This is one of the most important parts of the pre-use check. Follow this procedure for each castor:
                </p>
                <ol className="text-sm text-white space-y-2 ml-4 list-decimal list-inside">
                  <li>Apply the brake using the foot-operated lever or hand lever.</li>
                  <li>Confirm the brake lever is in the fully locked position (usually indicated by a red marker or detent).</li>
                  <li>Attempt to push the tower firmly in each direction.</li>
                  <li>The tower should <strong>not roll, slide, or creep</strong> in any direction.</li>
                  <li>If any movement is detected, take the tower out of service and report the defective castor.</li>
                </ol>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Stabilisers and Outriggers</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Correct position</strong> — Stabilisers must be deployed in the configuration specified by the manufacturer's instruction manual. Incorrect positioning reduces the stabilising effect.</li>
                  <li><strong>Firm ground contact</strong> — Each stabiliser foot must be in firm contact with the ground. Use base plates on soft ground. Stabilisers resting on loose rubble or uneven surfaces are ineffective.</li>
                  <li><strong>Locking mechanisms</strong> — All stabiliser clamps and adjusting nuts must be tight. A stabiliser that slips during use offers no protection against overturning.</li>
                  <li><strong>No damage</strong> — Check for bent stabiliser arms, cracked welds, and worn threads on adjusting screws.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Missing Parts Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Missing Parts Checklist
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A missing component is just as dangerous as a damaged one. During your pre-use check, systematically confirm that <strong>every part required by the manufacturer's configuration is present and in position</strong>. Missing parts are often the result of theft, borrowing for another tower, accidental displacement during site activities, or careless dismantling and re-assembly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Parts Commonly Found Missing</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Diagonal braces</strong> — Often removed to create more internal space and not replaced. The tower cannot resist lateral forces without all braces in place.</li>
                  <li><strong>Locking clips and R-pins</strong> — Small and easily lost. Check every connection point.</li>
                  <li><strong>Toeboards</strong> — Frequently removed to allow materials to be passed onto the platform. All toeboards must be refitted before use.</li>
                  <li><strong>Stabilisers</strong> — Sometimes removed by other workers who need the space around the tower base. All required stabilisers must be in position.</li>
                  <li><strong>Castor locking pins</strong> — Small R-clips or split pins that secure castors to frame legs. Without them, a castor can detach.</li>
                  <li><strong>Base plates or sole boards</strong> — If the tower is on adjustable legs rather than castors, base plates may have been displaced by ground works.</li>
                </ul>
              </div>

              <p>
                If any component is missing and a replacement is not immediately available, the tower <strong>must not be used</strong>. Never assemble or use a tower with fewer components than specified in the manufacturer's instructions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 07: Platform and Access */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Platform and Access
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The working platform and access route are where you spend your time on the tower. Defects here directly affect your safety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Platform Condition</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Surface integrity</strong> — Check for cracks, splits, holes, or excessive wear on the platform surface. Plywood decks can delaminate, and aluminium decks can develop fatigue cracks.</li>
                  <li><strong>Trapdoor operation</strong> — Open and close the trapdoor several times. It must open freely and close securely. Check that the return spring is functioning — a trapdoor that does not close automatically is a fall hazard.</li>
                  <li><strong>Secure seating</strong> — The platform must be correctly located on its support hooks or ledger tubes. Push down firmly on each corner to check it does not lift, rock, or slide.</li>
                  <li><strong>Wind locks</strong> — If fitted, platform wind locks must be engaged to prevent the platform from lifting in high winds.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Internal Ladder / Climb Path</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Rungs present and secure</strong> — Every rung in the climbing path must be intact. Missing or loose rungs mean the tower must not be used.</li>
                  <li><strong>Clear path</strong> — The internal ladder must be clear of tools, materials, and debris. Items left on rungs or inside the tower are trip and fall hazards.</li>
                  <li><strong>No slippery surfaces</strong> — Check for oil, grease, mud, ice, or wet paint on rungs and frames used for climbing.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 08: Environmental Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Environmental Assessment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                External conditions change constantly on construction sites and in outdoor environments. Part of every pre-use check is a brief reassessment of the conditions around the tower.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Weather Conditions</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Wind speed</strong> — Most manufacturers specify a maximum wind speed for normal use of <strong>17 m/s (38 mph, Beaufort Force 7)</strong>. If in doubt, use an anemometer or check a weather app. Gusting conditions are more dangerous than steady wind.</li>
                  <li><strong>Rain and ice</strong> — Wet or icy platforms, rungs, and frames are slip hazards. Consider whether non-slip matting or deferring the work is appropriate.</li>
                  <li><strong>Lightning</strong> — Aluminium towers are excellent conductors. Do not use towers during thunderstorms or when lightning is forecast.</li>
                  <li><strong>Visibility</strong> — Poor visibility (fog, heavy rain, darkness without adequate lighting) increases risk. Ensure adequate lighting if working in low-light conditions.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Ground Conditions Since Last Use</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Softening</strong> — Rain, flooding, or thawing can soften the ground beneath base plates, causing uneven settlement.</li>
                  <li><strong>Excavation</strong> — Check whether any trenches, pits, or holes have been dug near the tower base since it was last used. Proximity to excavations can undermine the bearing capacity of the ground.</li>
                  <li><strong>Vehicle movements</strong> — Heavy vehicles driving close to the tower can compact or disturb the ground surface.</li>
                  <li><strong>Level check</strong> — Use a spirit level on the base frame to confirm the tower is still plumb and level. Settlement of even a few millimetres can reduce stability.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Surroundings</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Overhead hazards</strong> — Check for overhead power lines, moving cranes, or suspended loads that may have been introduced since the tower was last used.</li>
                  <li><strong>Vehicle routes</strong> — Confirm that barriers, signage, or exclusion zones are still in place to prevent vehicles striking the tower.</li>
                  <li><strong>Public access</strong> — If the public can access the area, ensure unauthorised climbing prevention measures are in place (removing lower access, signage, fencing).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Checking for Graffiti, Paint, and Surface Masking */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Checking for Graffiti, Paint, and Surface Masking
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One often-overlooked aspect of the pre-use check is examining whether the surfaces of tower components have been <strong>obscured by paint, graffiti, stickers, tape, or other coatings</strong>. This is surprisingly common on construction sites where multiple trades are working in close proximity.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Why Surface Masking Is Dangerous</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Hidden cracks</strong> — Paint or filler applied over a weld can mask a developing fatigue crack that would otherwise be visible during inspection.</li>
                  <li><strong>Concealed corrosion</strong> — Spray paint or primer applied to an aluminium frame can hide pitting corrosion that is eating into the wall thickness.</li>
                  <li><strong>Concealed dents</strong> — Thick coatings of paint, plaster splash, or concrete can fill in small dents and deformations, making them difficult to see or feel.</li>
                  <li><strong>False confidence</strong> — A freshly painted tower looks new and well-maintained, which can create a false sense of security about its structural condition.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">What to Look For</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Overspray from painting</strong> — Check whether someone has been spray-painting near the tower, coating components in the process.</li>
                  <li><strong>Plaster and render splash</strong> — Plasterers working nearby may have coated frames and braces with wet plaster, which dries hard and conceals the surface beneath.</li>
                  <li><strong>Stickers and tape</strong> — Warning stickers, cable routing tape, or advertising materials stuck to frames can conceal damage beneath.</li>
                  <li><strong>Graffiti</strong> — Marker pen, spray paint, or scratched markings may be cosmetic but can also mask defects, especially if applied thickly.</li>
                </ul>
              </div>

              <p>
                If you find components with significant surface masking, they should be cleaned before use so that the underlying condition can be properly assessed. If cleaning is not practical on site, the component should be taken out of service until it can be cleaned and inspected.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: Unauthorised Modifications and Manual */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Unauthorised Modifications and the Instruction Manual
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important things to check is whether anyone has <strong>modified the tower without authorisation</strong> since it was last used. Unauthorised modifications are surprisingly common on busy construction sites.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Common Unauthorised Modifications</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Additional platforms</strong> — Scaffold boards, plywood sheets, or planks tied to the tower to create extra working levels.</li>
                  <li><strong>Removed guardrails</strong> — Guardrails taken off one or more sides to allow materials to be passed in more easily.</li>
                  <li><strong>Added loading</strong> — Hoists, pulleys, or heavy equipment attached to the tower that exceed its safe working load.</li>
                  <li><strong>Mixed components</strong> — Parts from different tower systems or manufacturers used as replacements. Tower components are <strong>not interchangeable</strong> between different systems.</li>
                  <li><strong>Sheeting or netting</strong> — Debris netting, tarpaulins, or banners attached to the tower, which massively increase wind loading.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Critical Rule</p>
                    <p className="text-sm text-white">
                      If you discover <strong>any unauthorised modification</strong>, the tower must be taken out of service. Remove the modification, carry out a full pre-use check, and report the modification to your supervisor. Do not use the tower until you are satisfied it is safe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Instruction Manual</p>
                <p className="text-sm text-white mb-2">
                  The manufacturer's instruction manual must be on site and accessible to all tower users at all times. During your pre-use check, confirm:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>The manual is present and relates to the specific tower model in use.</li>
                  <li>It is legible and complete (not torn, water-damaged, or missing pages).</li>
                  <li>The tower has been assembled in accordance with the manual's instructions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 11: Pre-Use vs Formal Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Pre-Use Check vs Formal Inspection
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                It is important to understand the distinction between a <strong>pre-use visual check</strong> and a <strong>formal inspection</strong>. They serve different purposes and have different legal requirements.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <p className="text-elec-yellow font-semibold text-sm mb-2">Pre-Use Visual Check</p>
                  <ul className="text-xs text-white space-y-1">
                    <li><strong>When:</strong> Before every use / start of shift</li>
                    <li><strong>By whom:</strong> Any trained tower user</li>
                    <li><strong>Scope:</strong> Quick visual assessment</li>
                    <li><strong>Duration:</strong> 2-5 minutes</li>
                    <li><strong>Record:</strong> Not legally required</li>
                    <li><strong>Purpose:</strong> Confirm nothing has changed since last use</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-purple-400 font-semibold text-sm mb-2">Formal Inspection</p>
                  <ul className="text-xs text-white space-y-1">
                    <li><strong>When:</strong> After assembly, then every 7 days</li>
                    <li><strong>By whom:</strong> Competent person</li>
                    <li><strong>Scope:</strong> Thorough documented examination</li>
                    <li><strong>Duration:</strong> 15-30 minutes+</li>
                    <li><strong>Record:</strong> Written report required by law</li>
                    <li><strong>Purpose:</strong> Statutory compliance check</li>
                  </ul>
                </div>
              </div>

              <p>
                Both checks are necessary. A formal inspection every 7 days does not remove the need for pre-use checks on the other days, and pre-use checks do not replace the requirement for formal inspections.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12: Tower Levelness and Plumb Check */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Tower Levelness and Plumb Check
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A tower that is not level or plumb has reduced stability and may be at risk of overturning. Even small amounts of settlement — a few millimetres — can affect the distribution of load through the tower structure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">How to Check</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Visual assessment</strong> — Stand back from the tower and sight along the vertical standards from ground level. Any visible lean indicates the tower is out of plumb.</li>
                  <li><strong>Spirit level</strong> — Place a spirit level on the base frame horizontally and on a vertical standard. The bubble should be centred in both planes.</li>
                  <li><strong>Adjustable legs</strong> — If the tower has adjustable legs, check that the correct adjustment has been maintained and that locking nuts have not loosened.</li>
                  <li><strong>Ground comparison</strong> — Compare the current ground contact with the original setup. Has the ground settled, softened, or been disturbed on one side?</li>
                </ul>
              </div>

              <p>
                If the tower is noticeably out of level or plumb, do not attempt to correct it while anyone is on the platform. Evacuate the tower, apply all brakes, and then adjust the base using the methods described in the manufacturer's instructions.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Developing a Routine</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always start at the bottom and work upwards — base, castors, frames, braces, platform, guardrails</li>
                <li>Use a consistent route around the tower so you do not miss any side</li>
                <li>Touch as well as look — push guardrails, test brakes, wiggle braces</li>
                <li>Carry a simple checklist card in your pocket until the routine is second nature</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assuming the tower is safe because it was fine yesterday</li>
                <li>Rushing the check because you are under time pressure</li>
                <li>Only checking the sides of the tower you can see from your approach</li>
                <li>Ignoring minor defects — small problems can rapidly become serious</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Reporting Defects</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Never ignore a defect, no matter how minor it appears</li>
                <li>Tag defective towers with a clear "DO NOT USE" sign</li>
                <li>Report to your supervisor verbally and in writing</li>
                <li>Do not attempt repairs unless you are competent and authorised to do so</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Checklist Summary</h3>
              <p className="text-sm text-white/70 mb-2">Use this as a mental walkthrough each time you approach a tower:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Ground conditions — soft, uneven, excavations, drainage?</li>
                <li>Base plates and sole boards — firm contact, level?</li>
                <li>Castors — wheels intact, brakes tested under load, locking pins present?</li>
                <li>Frames — straight, no cracks, all connections engaged?</li>
                <li>Braces — all present, fully clipped, no bowing?</li>
                <li>Stabilisers — correct position, firm contact, clamps tight?</li>
                <li>Platform — secure, no damage, trapdoor spring working?</li>
                <li>Guardrails — all in place, correct heights, toeboards fitted?</li>
                <li>Surroundings — overhead hazards, vehicle routes, public access?</li>
                <li>Weather — wind speed, rain, ice, lightning risk?</li>
                <li>Instruction manual — present and applicable to this tower?</li>
                <li>Unauthorised modifications — none present?</li>
              </ol>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Refuse to Use a Tower</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Any structural damage to frames, braces, or guardrails</li>
                <li>Castor brakes that do not hold the tower stationary</li>
                <li>Missing components that compromise the tower's configuration</li>
                <li>Wind speed exceeding the manufacturer's maximum (typically 17 m/s)</li>
                <li>Ground conditions that cannot adequately support the tower</li>
                <li>Any unauthorised modification to the tower structure</li>
                <li>Absence of the manufacturer's instruction manual on site</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation Footer */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            disabled
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Section
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4-section-2">
              Next: Formal Inspections
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
