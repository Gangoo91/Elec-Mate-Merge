import { ArrowLeft, ArrowDownToLine, CheckCircle, AlertTriangle, Users, ShieldAlert, ListOrdered } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-dismantle-golden-rule",
    question: "What is the golden rule of dismantling a mobile scaffold tower?",
    options: [
      "Always start from the bottom up",
      "Dismantling is always the reverse of the assembly sequence",
      "Remove the platform first to reduce weight",
      "Only the site supervisor needs to be present"
    ],
    correctIndex: 1,
    explanation: "The golden rule of dismantling is that it must always follow the exact reverse of the assembly sequence. Skipping steps or removing components out of order creates serious fall and collapse hazards."
  },
  {
    id: "pasma-dismantle-lowering",
    question: "How should components be transferred from height during dismantling?",
    options: [
      "Thrown down to a catcher at ground level",
      "Dropped onto a crash mat below the tower",
      "Lowered safely by hand-to-hand, rope and bag, or component chute",
      "Left on the platform and removed once the tower is on the ground"
    ],
    correctIndex: 2,
    explanation: "Components must never be thrown from height. They should be lowered safely using controlled methods such as hand-to-hand passing, a rope and bag system, or a dedicated component chute. Thrown components can cause serious head injuries even from low heights."
  },
  {
    id: "pasma-partial-dismantle",
    question: "If a tower is left partially dismantled, what must be in place at the working level?",
    options: [
      "A warning sign only",
      "Guardrails and the tower must be stable",
      "A padlock on the access point",
      "Nothing — partial dismantling is always prohibited"
    ],
    correctIndex: 1,
    explanation: "A partially dismantled tower must remain stable, have guardrails at the working level, and be clearly signed to prevent unauthorised access. Leaving a partially dismantled tower without these precautions creates an immediate fall hazard."
  }
];

const faqs = [
  {
    question: "Can one person dismantle a mobile scaffold tower alone?",
    answer: "No. Dismantling a mobile scaffold tower requires a minimum of two people, and in many cases more depending on the tower size and component weight. One person cannot safely lower components while maintaining their own stability on the tower. The assembly and dismantling instruction manual will specify the minimum crew size required."
  },
  {
    question: "What is the difference between dismantling a 3T tower and an AGR tower?",
    answer: "With a 3T (through-the-trap) tower, guardrails are removed from below through the trapdoor platform before ascending to the next level down. With an AGR (advance guardrail) tower, the guardrails are unlocked and folded down from the platform level above before the operative descends. The sequence is reversed from assembly in both cases, but the specific steps differ because the guardrail systems work differently."
  },
  {
    question: "Can I dismantle a tower in windy conditions?",
    answer: "You should not dismantle a tower in wind speeds above Beaufort Force 4 (approximately 13-18 mph or when small branches start moving). High winds make handling lightweight components dangerous, can affect your balance at height, and increase the risk of components being caught by the wind when being lowered. The site risk assessment should specify the wind speed limit."
  },
  {
    question: "What should I do if I discover damage to a component during dismantling?",
    answer: "Any damaged component found during dismantling must be immediately separated from serviceable components, tagged with a red defect tag, and reported to the supervisor. The damage must be recorded in writing, including the date, component description, and nature of the defect. The damaged component must not be returned to general storage where it could be used again."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the first component to be removed when dismantling a 3T tower from the top?",
    options: [
      "The platform at the top level",
      "The guardrails at the top level",
      "The diagonal braces below the platform",
      "The castors at the base"
    ],
    correctAnswer: 1,
    explanation: "When dismantling a 3T tower, guardrails at the top level are removed first (from below, through the trapdoor), as they were the last components fitted during assembly. Dismantling always follows the exact reverse of the build sequence."
  },
  {
    id: 2,
    question: "Why must components NEVER be thrown from a tower during dismantling?",
    options: [
      "It damages the paintwork on the components",
      "It creates noise that disturbs other workers",
      "Falling components can cause serious head injuries and death",
      "It voids the manufacturer's warranty"
    ],
    correctAnswer: 2,
    explanation: "Thrown components — even lightweight ones like brace clips — can cause serious head injuries or death if they strike someone below. A steel brace dropped from just 3 metres generates enough force to cause a fatal head injury."
  },
  {
    id: 3,
    question: "During AGR tower dismantling, how are the advance guardrails removed?",
    options: [
      "They are cut off with a grinder",
      "They are unlocked and folded down from the platform above",
      "They are removed from below by reaching up",
      "They are left in place and the tower is moved whole"
    ],
    correctAnswer: 1,
    explanation: "AGR (advance guardrail) systems are unlocked and folded down from the platform level. This is the reverse of the assembly process where they are raised and locked into position from below."
  },
  {
    id: 4,
    question: "What should be established on the ground before any dismantling begins?",
    options: [
      "A tea station for the crew",
      "An exclusion zone preventing people from walking beneath the tower",
      "A vehicle for transporting components",
      "A concrete pad for stacking"
    ],
    correctAnswer: 1,
    explanation: "An exclusion zone must be established at the base of the tower before dismantling begins. This prevents anyone on the ground from being struck by a component that is accidentally dropped during the lowering process."
  },
  {
    id: 5,
    question: "When is it acceptable to leave a tower partially dismantled?",
    options: [
      "Never — dismantling must always be completed in one go",
      "When the tower remains stable, has guardrails at the working level, and is clearly signed",
      "Whenever the crew needs a break",
      "Only if the tower is indoors"
    ],
    correctAnswer: 1,
    explanation: "A tower may be left partially dismantled provided it remains stable, has guardrails at the working level, and is clearly signed to prevent unauthorised access. This may be necessary when reducing height for relocation or when work is interrupted."
  },
  {
    id: 6,
    question: "Who is permitted to dismantle a mobile scaffold tower?",
    options: [
      "Any site operative over the age of 18",
      "Only the person who originally assembled the tower",
      "PASMA-trained and competent persons only",
      "The site first aider"
    ],
    correctAnswer: 2,
    explanation: "Only persons who have received appropriate PASMA training and are competent to dismantle the specific type of tower being used may carry out the dismantling. This is a legal requirement under the Work at Height Regulations 2005."
  },
  {
    id: 7,
    question: "What is a common error that creates immediate danger during dismantling?",
    options: [
      "Using gloves while handling components",
      "Removing guardrails and then climbing down without edge protection",
      "Passing components hand to hand",
      "Briefing the team before starting"
    ],
    correctAnswer: 1,
    explanation: "Removing guardrails and then descending without edge protection is extremely dangerous. The operative is exposed to an unprotected edge at height. The 3T method exists specifically to ensure guardrails are only removed from below, keeping the operative protected at all times."
  },
  {
    id: 8,
    question: "What must happen after dismantling is complete?",
    options: [
      "Components are left where they fall for the next crew",
      "The area is immediately released without checks",
      "Components are inspected, sorted, and the completion is handed over to the supervisor",
      "Nothing — the job is done once the last piece is removed"
    ],
    correctAnswer: 2,
    explanation: "After dismantling, all components must be inspected for damage, sorted by type, and prepared for storage or transport. The completion of dismantling should be formally handed over to the supervisor, and any defects found must be reported and recorded."
  }
];

export default function PasmaModule4Section1() {
  useSEO({
    title: "Dismantling Procedure | PASMA Module 4.1",
    description: "Safe mobile scaffold tower dismantling procedures including 3T and AGR methods, component lowering techniques, partial dismantling rules, and supervision requirements.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <ArrowDownToLine className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Dismantling Procedure
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Safe step-by-step dismantling of mobile scaffold towers using 3T and AGR methods, component lowering techniques, and supervision requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Golden rule:</strong> reverse of assembly sequence</li>
              <li><strong>Never throw</strong> components &mdash; always lower safely</li>
              <li><strong>Competence:</strong> must be done by PASMA-trained operatives</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Plan dismantling, check conditions, brief team</li>
              <li><strong>During:</strong> Follow reverse sequence, lower components, maintain edge protection</li>
              <li><strong>After:</strong> Inspect and sort components for storage</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the golden rule of dismantling",
              "Describe the 3T dismantling step-by-step sequence",
              "Describe the AGR dismantling sequence",
              "List safe methods for lowering components from height",
              "Identify common dismantling errors and their consequences",
              "Understand partial dismantling rules and supervision requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Golden Rule: Reverse of Assembly */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Golden Rule: Reverse of Assembly
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single most important principle of dismantling a mobile scaffold tower is that
                it must <strong>always</strong> follow the exact reverse of the assembly sequence.
                The last component fitted during assembly is the first component removed during
                dismantling. There are no shortcuts, no exceptions, and no &ldquo;quick ways&rdquo;
                to take a tower down.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Dismantling is always
                  the exact reverse of assembly. If the manufacturer&rsquo;s instruction manual
                  specifies a build sequence of steps 1 through 20, dismantling proceeds from step
                  20 back to step 1. Never skip steps. Never remove components out of order.
                </p>
              </div>

              <p>
                This principle exists because each component in a mobile tower serves a structural
                role that depends on the components above and below it. Removing a brace before
                the platform it supports has been taken out can cause a sudden structural failure.
                Removing guardrails before descending leaves the operative exposed to an
                unprotected edge at height.
              </p>

              <p>
                Before any dismantling begins, the operative in charge must review the
                manufacturer&rsquo;s instruction manual and confirm the correct reverse sequence.
                If the manual is not available on site, dismantling must not proceed until it is
                obtained. This is a legal requirement under the Work at Height Regulations 2005.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why the Reverse Sequence Matters</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Structural integrity is maintained at every stage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Edge protection remains in place until the operative is below it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Load paths through the tower are preserved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The risk of sudden collapse is minimised</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The operative always has a safe working position</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: 3T Dismantling Step by Step */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            3T Dismantling Step by Step
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 3T (through-the-trap) method uses a trapdoor platform that allows the operative
                to remove guardrails from below while remaining protected. When dismantling, this
                process is reversed &mdash; you work from the top of the tower downwards, removing
                each lift in sequence.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">3T Reverse Sequence (Top Down)</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Step 1:</strong> From the platform level below the top guardrails, reach up through the trapdoor opening and remove the top guardrails. Pass them down to ground level.</p>
                  <p><strong className="text-white">Step 2:</strong> Remove the top platform by lifting it through the trapdoor opening and lowering it safely to the ground.</p>
                  <p><strong className="text-white">Step 3:</strong> Descend to the next level down using the internal ladder or built-in climbing system.</p>
                  <p><strong className="text-white">Step 4:</strong> From this lower level, reach up through the trapdoor and remove the guardrails from the level you have just left.</p>
                  <p><strong className="text-white">Step 5:</strong> Remove the platform from the level above and lower it safely.</p>
                  <p><strong className="text-white">Step 6:</strong> Remove the horizontal braces and diagonal braces from the lift above.</p>
                  <p><strong className="text-white">Step 7:</strong> Remove the frames from the lift above and lower them to the ground.</p>
                  <p><strong className="text-white">Step 8:</strong> Repeat steps 3&ndash;7 for each successive lift until you reach the base.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  At no point during 3T dismantling should the operative be standing at a level
                  where the guardrails have already been removed. The trapdoor method ensures the
                  operative is always one level below the guardrails being taken out. If you find
                  yourself at an unprotected edge, stop work immediately and reassess the sequence.
                </p>
              </div>

              <p>
                Throughout the process, all removed components must be lowered to ground level
                using a controlled method. A ground-level operative should be stationed to receive
                components, stack them by type, and maintain the exclusion zone around the base
                of the tower.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: AGR Dismantling Sequence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            AGR Dismantling Sequence
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The AGR (advance guardrail) system uses guardrails that are raised into position
                from the platform below during assembly, locking automatically at the level above.
                When dismantling, the process is reversed: guardrails are unlocked and folded down
                from the platform level above.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">AGR Reverse Sequence (Top Down)</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Step 1:</strong> Standing on the top platform (with guardrails protecting you), unlock the AGR guardrails at your level using the release mechanism.</p>
                  <p><strong className="text-white">Step 2:</strong> Fold the guardrails down from your platform level. They collapse downward to the level below.</p>
                  <p><strong className="text-white">Step 3:</strong> Remove the top platform and lower it to ground level.</p>
                  <p><strong className="text-white">Step 4:</strong> Descend to the next level down. You are now protected by the guardrails at this level.</p>
                  <p><strong className="text-white">Step 5:</strong> Remove horizontal and diagonal braces from the lift above, then remove the frames from that lift.</p>
                  <p><strong className="text-white">Step 6:</strong> Unlock and fold down the AGR guardrails at your current level.</p>
                  <p><strong className="text-white">Step 7:</strong> Continue descending and repeating until the base is reached.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Difference from 3T Method</p>
                <p className="text-sm text-white/80">
                  With AGR, the operative works from <strong>above</strong> to fold guardrails down,
                  whereas with 3T, the operative works from <strong>below</strong> to remove
                  guardrails through the trapdoor. In both methods, the operative is always
                  protected by guardrails while working. The AGR system is generally faster to
                  dismantle because the guardrail folding mechanism is quicker than manual removal
                  through a trapdoor.
                </p>
              </div>

              <p>
                Always check that the AGR release mechanisms are functioning correctly before
                beginning dismantling. If a guardrail is jammed or the release mechanism is faulty,
                do not force it. Report the defect and seek the manufacturer&rsquo;s guidance before
                proceeding.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Lowering Components Safely */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Lowering Components Safely
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most dangerous aspects of dismantling is transferring components from
                height to ground level. <strong>Components must never be thrown from a tower.</strong>
                Even a small clip or pin dropped from a few metres can cause a serious head
                injury. A steel brace thrown from a standard working height can be fatal.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Zero Tolerance</p>
                </div>
                <p className="text-sm text-white/80">
                  Throwing components from a mobile scaffold tower is a <strong>zero-tolerance
                  offence</strong> on most construction sites. It can result in immediate removal
                  from site, disciplinary action, and potential prosecution under the Health and
                  Safety at Work etc. Act 1974 Section 7 (employee duty of care).
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Approved Lowering Methods</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Hand to hand:</strong> The operative on the tower passes the component down to a colleague stationed at a lower level or on the ground. Suitable for lighter items and lower heights. Requires good coordination and communication.</p>
                  <p><strong className="text-white">Rope and bag:</strong> Components are placed in a canvas bag or tied with a lowering rope and lowered in a controlled manner to the ground. The bag must be rated for the weight being lowered. A tag line prevents swinging.</p>
                  <p><strong className="text-white">Component chute:</strong> A dedicated chute or slide system attached to the tower allows components to be slid down to ground level in a controlled manner. Particularly effective for braces and smaller items.</p>
                </div>
              </div>

              <p>
                An exclusion zone must be established around the base of the tower before any
                dismantling begins. The zone should extend far enough to protect anyone on the
                ground from a component that might be accidentally dropped. Barriers or a banksman
                should prevent anyone from entering the exclusion zone during dismantling operations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Injury Risks from Thrown Components</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Head injuries &mdash; the most common and most severe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fractures to arms, hands, and feet from impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Eye injuries from flying debris or small parts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Bruising and soft tissue damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Psychological harm to witnesses of a struck-by incident</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Common Dismantling Errors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Dismantling Errors
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Investigations into tower-related incidents repeatedly identify the same
                dismantling errors. Knowing these common mistakes helps you recognise dangerous
                situations before they lead to injury or death.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Critical Errors That Cause Incidents</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Removing guardrails before descending:</strong> The operative removes the guardrails at their level and then attempts to climb down without edge protection. This is the leading cause of falls during dismantling.</p>
                  <p><strong className="text-white">Throwing components from height:</strong> Components are tossed over the side instead of being lowered safely. This causes struck-by injuries to ground-level workers.</p>
                  <p><strong className="text-white">Skipping braces during removal:</strong> Diagonal or horizontal braces are left out of the dismantling sequence, compromising the structural integrity of the remaining tower.</p>
                  <p><strong className="text-white">Working alone:</strong> A single operative attempts to dismantle the tower without assistance. This prevents safe component handling and eliminates the safety of a second pair of eyes.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Dismantling in high winds (above Beaufort Force 4) is extremely dangerous.
                  Lightweight components can act as sails, pulling the operative off balance.
                  Braces and platforms caught by the wind can strike other workers. If wind
                  conditions deteriorate during dismantling, stop work immediately and secure
                  the tower in its current state.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Additional Common Errors</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Leaving a partially dismantled tower unattended without signage or barriers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not checking conditions (weather, ground, overhead hazards) before starting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Using damaged or incorrect tools for releasing lock mechanisms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Failing to brief the team on the dismantling sequence before starting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Rushing to finish before the end of the shift</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Partial Dismantling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Partial Dismantling
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are legitimate situations where a tower may need to be partially dismantled
                rather than fully taken down. This includes reducing the height before moving
                the tower, adapting the tower to a new task, or relocating the tower to a
                different part of the site where a lower height is needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">When Partial Dismantling May Be Required</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Reducing height to comply with the maximum moving height (typically 4 metres)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Adapting the tower configuration for a different task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Removing top lifts to pass under an overhead obstruction during relocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>End-of-shift stoppage where full dismantling cannot be completed safely</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> A partially dismantled
                  tower must remain structurally stable at all times. It must have guardrails at
                  the highest working level, must be clearly signed as &ldquo;under
                  construction/dismantling&rdquo;, and must prevent unauthorised access.
                  Partially dismantled towers must never be left overnight without these
                  precautions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Acceptable</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower is stable at reduced height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Guardrails fitted at the new top level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Signed &ldquo;Tower Under Modification&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Access route blocked or controlled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Castors locked, tower level</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Unacceptable</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No guardrails at the top level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower left with braces missing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>No signage indicating partial dismantling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Access not controlled or restricted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower not re-checked for stability</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                If a tower is partially dismantled and left for any period, a fresh inspection
                must be carried out before it is used again or before dismantling continues. The
                inspection should verify that the remaining structure is stable, that no
                components have been disturbed, and that all connections remain secure.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Supervision & Competence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Supervision &amp; Competence
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 require that mobile scaffold towers are only
                dismantled by persons who are competent to do so, or by persons under the direct
                supervision of a competent person. In practice, this means every member of the
                dismantling team must hold a current PASMA certificate for the type of tower
                being dismantled.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Who Can Dismantle a Tower?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>PASMA-trained operatives</strong> who hold a current Towers for Users or Towers for Advanced Users card</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Trainees</strong> who are working under the direct supervision of a PASMA-certified person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The specific PASMA card held must cover the type of tower being dismantled (e.g. standard tower, complex configuration, or linked tower)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Supervision during
                  dismantling means active, on-site oversight &mdash; not a phone call away.
                  The supervisor must be present, must be able to see the work being carried out,
                  and must have the authority to stop work if unsafe practices are observed.
                </p>
              </div>

              <p>
                Effective team communication is critical during dismantling. Before work begins,
                the team leader should conduct a brief covering the dismantling sequence, the
                lowering method, individual roles, the exclusion zone, and what to do if conditions
                change (such as increasing wind). Clear verbal commands should be used throughout
                &mdash; particularly when lowering components.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Handover After Completion</p>
                <p className="text-sm text-white/80 mb-3">
                  Once dismantling is complete, the team leader must formally hand over to the
                  site supervisor or tower coordinator. The handover should confirm:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All components have been removed and accounted for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Components have been inspected for damage during dismantling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Any defects have been reported and defective items quarantined</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The work area is clear and the exclusion zone can be released</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Components are sorted and ready for storage or transport</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4-section-2">
              Next: Moving &amp; Repositioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
